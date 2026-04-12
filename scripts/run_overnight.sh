#!/bin/bash
# Brand Autopsy DB — Overnight Generation Runner
# Usage: ./scripts/run_overnight.sh
#
# This script sets up 4 tmux panes, each running a Claude Code worker.
# Each worker generates 8-layer English brand analyses for its assigned chunk.
#
# To monitor: tmux attach -t brand-autopsy
# To check progress: python3 run_batch.py --status
# To stop all: tmux kill-session -t brand-autopsy

set -e
cd "$(dirname "$0")/.."
PROJECT_DIR="$(pwd)"

SESSION="brand-autopsy"

# Kill existing session if any
tmux kill-session -t "$SESSION" 2>/dev/null || true

# Create new session with first worker
tmux new-session -d -s "$SESSION" -n "workers" -x 200 -y 50

# Worker prompt template
make_prompt() {
    local N=$1
    cat <<PROMPT
Read GENERATION_PROTOCOL.md and .claude/CLAUDE.md first. You are Worker ${N}.
Read your brand list from scripts/chunks/worker${N}.csv.
For each brand in the list (in order), generate all 8 layers following the GENERATION_PROTOCOL.md exactly.
Skip brands that already have English analysis (check for Disclaimer in 01-brand-identity.md).
After each brand, run the legal validator and ensure 8/8 PASS.
Commit every 5 brands with message format: "Add N brand analyses: TICK1, TICK2, ... (sector)".
If one brand fails, create data/brands/{TICKER}_{Name}/FAILED.txt and skip to the next.
Print progress: [DONE] TICKER — name | 8/8 PASS | Worker ${N} | completed/total.
Start now with the first brand in your list.
PROMPT
}

# Auto-restart wrapper for each worker
make_wrapper() {
    local N=$1
    cat <<'WRAPPER'
#!/bin/bash
cd "PROJ_DIR"
WORKER_NUM=NUM
MAX_RETRIES=50
RETRY=0
while [ $RETRY -lt $MAX_RETRIES ]; do
    echo "=== Worker $WORKER_NUM starting (attempt $((RETRY+1))) ==="
    PROMPT=$(cat <<'ENDPROMPT'
PROMPT_TEXT
ENDPROMPT
    )
    claude --print "$PROMPT" 2>&1 | tee -a "scripts/logs/worker${WORKER_NUM}.log"
    EXIT_CODE=$?
    RETRY=$((RETRY+1))
    echo "=== Worker $WORKER_NUM exited ($EXIT_CODE). Restarting in 10s... ==="
    sleep 10
done
echo "=== Worker $WORKER_NUM exhausted retries ==="
WRAPPER
}

# Create log directory
mkdir -p "$PROJECT_DIR/scripts/logs"

# Create wrapper scripts for each worker
for N in 1 2 3 4; do
    PROMPT_TEXT=$(make_prompt $N)
    WRAPPER="$PROJECT_DIR/scripts/worker${N}_run.sh"

    cat > "$WRAPPER" << WEOF
#!/bin/bash
cd "$PROJECT_DIR"
MAX_RETRIES=50
RETRY=0
while [ \$RETRY -lt \$MAX_RETRIES ]; do
    echo "=== Worker ${N} starting (attempt \$((RETRY+1))) ==="
    claude --print "$(echo "$PROMPT_TEXT" | sed 's/"/\\"/g')" 2>&1 | tee -a "scripts/logs/worker${N}.log"
    EXIT_CODE=\$?
    RETRY=\$((RETRY+1))
    echo "=== Worker ${N} exited (\$EXIT_CODE). Restarting in 10s... ==="
    sleep 10
done
echo "=== Worker ${N} exhausted retries ==="
WEOF
    chmod +x "$WRAPPER"
done

# Set up 4 panes in tmux
# First pane is already created with the session
tmux send-keys -t "$SESSION" "bash $PROJECT_DIR/scripts/worker1_run.sh" Enter

# Split horizontally
tmux split-window -h -t "$SESSION"
tmux send-keys -t "$SESSION" "bash $PROJECT_DIR/scripts/worker2_run.sh" Enter

# Split first pane vertically
tmux select-pane -t "$SESSION:0.0"
tmux split-window -v -t "$SESSION"
tmux send-keys -t "$SESSION" "bash $PROJECT_DIR/scripts/worker3_run.sh" Enter

# Split second pane vertically
tmux select-pane -t "$SESSION:0.2"
tmux split-window -v -t "$SESSION"
tmux send-keys -t "$SESSION" "bash $PROJECT_DIR/scripts/worker4_run.sh" Enter

echo ""
echo "============================================"
echo "  Brand Autopsy — Overnight Generation"
echo "============================================"
echo ""
echo "  4 workers launched in tmux session: $SESSION"
echo ""
echo "  Worker 1: 126 brands (pane top-left)"
echo "  Worker 2: 126 brands (pane top-right)"
echo "  Worker 3: 126 brands (pane bottom-left)"
echo "  Worker 4: 125 brands (pane bottom-right)"
echo ""
echo "  Monitor:  tmux attach -t $SESSION"
echo "  Progress: python3 run_batch.py --status"
echo "  Logs:     tail -f scripts/logs/worker{1,2,3,4}.log"
echo "  Stop all: tmux kill-session -t $SESSION"
echo ""
