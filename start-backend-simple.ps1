# Simple Backend Starter
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting AI CCTV Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectDir = "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
Set-Location $projectDir

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python not found!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "Found: $pythonVersion" -ForegroundColor Green

# Ensure venv exists
if (-not (Test-Path "venv\Scripts\python.exe")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Start-Sleep -Seconds 3
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
& "venv\Scripts\python.exe" -m pip install -q fastapi uvicorn opencv-python numpy pydantic
Write-Host "Dependencies ready!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Starting backend server..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend URL: http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Keep this window open!" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start server
& "venv\Scripts\python.exe" -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
