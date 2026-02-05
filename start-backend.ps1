Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting AI CCTV Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
Write-Host "Checking for Python..." -ForegroundColor Yellow
$pythonCheck = $null
$pythonExitCode = 1
try {
    $pythonCheck = python --version 2>&1
    $pythonExitCode = $LASTEXITCODE
}
catch {
    $pythonCheck = $null
    $pythonExitCode = 1
}

if ($null -eq $pythonCheck -or $pythonExitCode -ne 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR: Python is not installed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.python.org/downloads/" -ForegroundColor Cyan
    Write-Host "2. IMPORTANT: Check 'Add Python to PATH' during installation" -ForegroundColor Yellow
    Write-Host "3. Close and reopen PowerShell after installing" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or see INSTALL_PYTHON.md for detailed instructions" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[OK] Found: $pythonCheck" -ForegroundColor Green

# Check if virtual environment exists
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to create virtual environment" -ForegroundColor Red
        Write-Host "Make sure Python is properly installed" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[OK] Virtual environment created" -ForegroundColor Green
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Check if requirements are installed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
pip show fastapi 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[OK] Dependencies installed" -ForegroundColor Green
}
else {
    Write-Host "[OK] Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend starting on http://localhost:8000" -ForegroundColor Green
Write-Host "API docs: http://localhost:8000/docs" -ForegroundColor Green
Write-Host "Health check: http://localhost:8000/health" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
