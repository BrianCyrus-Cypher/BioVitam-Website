#!/bin/bash
# Start both frontend and backend in development mode

echo "🌱 Starting Biovitam development servers..."

# Open two terminals if possible (OS dependent)
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/backend && npm run dev"'
  osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/frontend && npm run dev"'
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  # Windows (Git Bash)
  start "Backend" cmd /c "cd backend && npm run dev & pause"
  start "Frontend" cmd /c "cd frontend && npm run dev & pause"
else
  # Linux
  xterm -e "cd backend && npm run dev" &
  xterm -e "cd frontend && npm run dev" &
fi

echo "✅ Servers starting..."
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
