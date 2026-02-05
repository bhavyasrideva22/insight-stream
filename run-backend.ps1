# Simple Backend Startup Script
Write-Host "Starting AI CCTV Backend..." -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
Set-Location $projectPath

# Check if venv exists
if (-not (Test-Path "venv\Scripts\python.exe")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Start-Sleep -Seconds 3
}

# Install dependencies if needed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
& "venv\Scripts\python.exe" -m pip install -q fastapi uvicorn opencv-python numpy pydantic 2>&1 | Out-Null

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Starting backend on http://localhost:8000" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Keep this window open!" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
& "venv\Scripts\python.exe" -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
