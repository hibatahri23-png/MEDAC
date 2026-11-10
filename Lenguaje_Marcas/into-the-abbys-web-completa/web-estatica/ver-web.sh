#!/bin/sh
# Abre la web en tu navegador. Ejecutar desde dentro de esta carpeta:  sh ver-web.sh
cd "$(dirname "$0")"
PORT="${1:-8080}"
if command -v python3 >/dev/null 2>&1; then
  echo "Web disponible en:  http://localhost:$PORT   (Ctrl+C para parar)"
  python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  echo "Web disponible en:  http://localhost:$PORT   (Ctrl+C para parar)"
  python -m SimpleHTTPServer "$PORT"
else
  echo "No se encontró Python. Alternativa: npx serve ."
  npx serve .
fi
