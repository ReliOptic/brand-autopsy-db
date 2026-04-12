#!/bin/bash
# Quick progress check — run anytime
cd "$(dirname "$0")/.."

echo "============================================"
echo "  Brand Autopsy — Progress Dashboard"
echo "============================================"
echo ""

# Count English-analyzed brands (have Disclaimer in 01-brand-identity.md)
TOTAL=0
ENGLISH=0
KOREAN=0
FAILED=0

for dir in data/brands/*/; do
    TOTAL=$((TOTAL+1))
    identity="$dir/context/01-brand-identity.md"
    failed="$dir/FAILED.txt"

    if [ -f "$failed" ]; then
        FAILED=$((FAILED+1))
    elif [ -f "$identity" ]; then
        if grep -q "Disclaimer\|DISCLAIMER" "$identity" 2>/dev/null; then
            ENGLISH=$((ENGLISH+1))
        else
            KOREAN=$((KOREAN+1))
        fi
    fi
done

REMAINING=$((503 - ENGLISH))
PCT=$((ENGLISH * 100 / 503))

echo "  Total brand folders: $TOTAL"
echo "  English (with disclaimer): $ENGLISH ($PCT%)"
echo "  Korean (legacy): $KOREAN"
echo "  Failed: $FAILED"
echo "  Remaining: $REMAINING"
echo ""

# Per-worker progress (count brands in each chunk that are done)
for N in 1 2 3 4; do
    CHUNK="scripts/chunks/worker${N}.csv"
    if [ -f "$CHUNK" ]; then
        WORKER_TOTAL=$(tail -n +2 "$CHUNK" | wc -l)
        WORKER_DONE=0
        while IFS=, read -r ticker name sector industry; do
            [ "$ticker" = "ticker" ] && continue
            for dir in data/brands/${ticker}_*/; do
                identity="${dir}context/01-brand-identity.md"
                if [ -f "$identity" ] && grep -q "Disclaimer\|DISCLAIMER" "$identity" 2>/dev/null; then
                    WORKER_DONE=$((WORKER_DONE+1))
                fi
                break
            done
        done < "$CHUNK"
        echo "  Worker $N: $WORKER_DONE / $WORKER_TOTAL"
    fi
done

echo ""
echo "  Last log entries:"
for N in 1 2 3 4; do
    LOG="scripts/logs/worker${N}.log"
    if [ -f "$LOG" ]; then
        LAST=$(grep -o '\[DONE\].*' "$LOG" | tail -1)
        if [ -n "$LAST" ]; then
            echo "    W$N: $LAST"
        else
            echo "    W$N: (no completions yet)"
        fi
    fi
done
echo ""
