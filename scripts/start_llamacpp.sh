#!/usr/bin/env bash
set -euo pipefail

DEFAULT_MODEL="/home/tjbermant/models/TheDrummer_Cydonia-24B-v4.1-Q5_K_S.gguf"
MODEL_PATH="${1:-$DEFAULT_MODEL}"

if [[ ! -f "$MODEL_PATH" ]]; then
  echo "[start_llamacpp] Model file not found at: $MODEL_PATH" >&2
  echo "Provide the GGUF path as an argument, e.g.:" >&2
  echo "  ./scripts/start_llamacpp.sh /path/to/model.gguf" >&2
  exit 1
fi

if ! command -v llama-server >/dev/null 2>&1; then
  echo "[start_llamacpp] llama-server not found on PATH. Install llama.cpp or add llama-server to PATH." >&2
  exit 1
fi

PORT="8080"
CONTEXT="16384"
GPU_LAYERS="32"

cat <<INFO
Launching llama.cpp server
  Model:        $MODEL_PATH
  Port:         $PORT
  Context:      $CONTEXT tokens
  GPU layers:   $GPU_LAYERS
INFO

echo "Press Ctrl+C to stop."

llama-server \
  -m "$MODEL_PATH" \
  -c "$CONTEXT" \
  --host 0.0.0.0 \
  --port "$PORT" \
  -ngl "$GPU_LAYERS" \
  --chat-template llama3 \
  --timeout 120 \
  --n-gpu-layers -1 \
  --threads 16 --threads-batch 16
