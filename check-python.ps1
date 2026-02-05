# Quick Python Check Script
Write-Host "Checking Python installation..." -ForegroundColor Cyan
Write-Host ""

# Try different Python commands
$pythonCommands = @("python", "python3", "py")

$pythonFound = $false
foreach ($cmd in $pythonCommands) {
    try {
        $version = & $cmd --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Found Python: $version" -ForegroundColor Green
            Write-Host "  Command: $cmd" -ForegroundColor Gray
            $pythonFound = $true
            break
        }
    } catch {
        # Continue to next command
    }
}

if (-not $pythonFound) {
    Write-Host "✗ Python not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Python needs to be installed. Options:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.python.org/downloads/" -ForegroundColor Cyan
    Write-Host "2. Install from Microsoft Store (search 'Python')" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "See INSTALL_PYTHON.md for detailed instructions" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "Checking pip..." -ForegroundColor Cyan
try {
    $pipVersion = python -m pip --version 2>&1
    Write-Host "✓ pip is available" -ForegroundColor Green
} catch {
    Write-Host "⚠ pip not found, but Python is installed" -ForegroundColor Yellow
    Write-Host "  Run: python -m ensurepip --upgrade" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Python is ready to use!" -ForegroundColor Green
