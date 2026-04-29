#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."

echo "==> Starting Brand Autopsy Dev Servers"
echo "    Backend:  http://localhost:8000"
echo "    Frontend: http://localhost:3000"
echo "    API Docs: http://localhost:8000/docs"
echo ""

# Backend
cd "$ROOT"
PYTHONPATH="$ROOT" .venv/bin/uvicorn src.api.main:app --reload --port 8000 &
BACKEND_PID=$!

# Frontend
cd "$ROOT/web"
npm run dev &
FRONTEND_PID=$!

cleanup() {
  echo ""
  echo "==> Shutting down..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

echo "==> Both servers running. Press Ctrl+C to stop."
wait
