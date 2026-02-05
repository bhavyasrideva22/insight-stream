# 🐍 Python Installation Guide for Windows

## Python is Not Installed

You need to install Python to run the backend. Follow these steps:

---

## Option 1: Install from Python.org (Recommended)

### Step 1: Download Python
1. Go to: https://www.python.org/downloads/
2. Click the big yellow **"Download Python 3.x.x"** button
3. This will download the installer (usually `python-3.x.x-amd64.exe`)

### Step 2: Install Python
1. **Run the installer** you just downloaded
2. **IMPORTANT:** Check the box **"Add Python to PATH"** at the bottom
3. Click **"Install Now"**
4. Wait for installation to complete
5. Click **"Close"**

### Step 3: Verify Installation
Open a **NEW** PowerShell window and run:
```powershell
python --version
```

You should see something like: `Python 3.12.x`

---

## Option 2: Install from Microsoft Store (Easier but slower)

1. Open **Microsoft Store**
2. Search for **"Python 3.12"** or **"Python 3.11"**
3. Click **"Install"**
4. Wait for installation
5. Open a **NEW** PowerShell window
6. Run: `python --version` to verify

---

## Option 3: Use Windows Store Python Launcher

If you see the Microsoft Store prompt, you can:
1. Click it to install Python from the Store
2. Or disable the alias:
   - Go to **Settings** → **Apps** → **Advanced app settings** → **App execution aliases**
   - Turn OFF the Python aliases
   - Then install Python from python.org (Option 1)

---

## After Installing Python

### 1. Close and Reopen PowerShell
**Important:** Close your current PowerShell window and open a new one so it picks up the new Python installation.

### 2. Verify Python Works
```powershell
python --version
```

### 3. Install pip (usually comes with Python)
```powershell
python -m pip --version
```

### 4. Now Start the Backend
```powershell
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
.\start-backend.ps1
```

---

## Troubleshooting

### "Python is not recognized"
- Make sure you checked **"Add Python to PATH"** during installation
- Close and reopen PowerShell after installing
- Try restarting your computer

### "pip is not recognized"
- Python should include pip, but if not:
```powershell
python -m ensurepip --upgrade
```

### Still Having Issues?
1. Check if Python is installed:
   - Search for "Python" in Windows Start menu
   - If you see Python, it's installed but maybe not in PATH

2. Add Python to PATH manually:
   - Find where Python is installed (usually `C:\Users\YourName\AppData\Local\Programs\Python\Python3xx\`)
   - Add that folder to your Windows PATH environment variable

---

## Quick Test

After installing Python, test it:
```powershell
python --version
python -m pip --version
```

Both commands should work without errors.

---

**Once Python is installed, come back and run `.\start-backend.ps1` again!**
