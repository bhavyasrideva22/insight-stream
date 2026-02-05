# 🚀 How to Start the Backend - FIXED!

## ✅ Quick Start (Easiest Method)

### **Double-click this file:** `START-BACKEND.bat`

That's it! A window will open showing the backend starting.

---

## Alternative Methods

### Method 1: PowerShell Script
```powershell
.\run-backend.ps1
```

### Method 2: Manual PowerShell
```powershell
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
.\venv\Scripts\Activate.ps1
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

---

## ✅ Verify Backend is Running

Open in your browser:
- **http://localhost:8000/health** → Should show `{"status":"ok"}`

---

## 🎯 Complete Setup Steps

### Step 1: Start Backend
**Double-click:** `START-BACKEND.bat`

**OR** run in PowerShell:
```powershell
.\run-backend.ps1
```

**Keep this window open!** Don't close it.

### Step 2: Start Frontend
Open a **NEW** terminal/PowerShell window:

```powershell
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
npm run dev
```

### Step 3: Use the App
1. Open browser: **http://localhost:8080**
2. Click **"Upload & Analyze"**
3. Select a video file
4. Wait for analysis results!

---

## 🔧 Troubleshooting

### Error: "Cannot reach backend"

**Solution:**
1. Make sure backend is running (check for the backend window)
2. Verify: http://localhost:8000/health shows `{"status":"ok"}`
3. If not running, double-click `START-BACKEND.bat`
4. Wait 10-15 seconds after starting
5. Refresh your browser

### Backend window closes immediately

**Possible causes:**
- Python not installed → Install Python 3.12+
- Dependencies missing → The script will install them automatically
- Port 8000 in use → Close other programs using port 8000

### Still having issues?

1. Check Python: `python --version` (should show Python 3.12.x)
2. Check if backend window is open and shows "Uvicorn running"
3. Try accessing http://localhost:8000/docs in browser
4. Check browser console (F12) for errors

---

## 📝 Files Created

- `START-BACKEND.bat` - **Double-click to start backend** ⭐ EASIEST
- `run-backend.ps1` - PowerShell script version
- `start-backend.ps1` - Original script (updated)

---

## ✅ Success Checklist

- [ ] Backend window is open and shows "Uvicorn running on http://0.0.0.0:8000"
- [ ] http://localhost:8000/health shows `{"status":"ok"}`
- [ ] Frontend is running on http://localhost:8080
- [ ] Can upload videos without errors

---

**The easiest way: Just double-click `START-BACKEND.bat`!** 🎯
