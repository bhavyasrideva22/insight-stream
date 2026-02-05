@echo off
echo ========================================
echo Starting AI CCTV Backend Server
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Python...
python --version
if errorlevel 1 (
    echo ERROR: Python not found!
    pause
    exit /b 1
)

echo.
echo Installing dependencies if needed...
python -m pip install -q fastapi uvicorn opencv-python numpy pydantic

echo.
echo ========================================
echo Starting backend on http://localhost:8000
echo ========================================
echo.
echo Keep this window open!
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000

pause
