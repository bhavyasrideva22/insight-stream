# 🚀 Quick Start Guide - AI CCTV System

## ⚠️ IMPORTANT: Backend Must Be Running First!

The frontend **requires** the backend to be running. Follow these steps **in order**:

---

## Step 1: Start the Backend (Python FastAPI)

### Option A: Using PowerShell Script (Easiest)
```powershell
# In PowerShell, navigate to project folder
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"

# Run the startup script
.\start-backend.ps1
```

### Option B: Using Batch File (CMD)
```cmd
# In CMD, navigate to project folder
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"

# Run the startup script
start-backend.bat
```

### Option C: Manual Start
```powershell
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Start the server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### ✅ Verify Backend is Running

You should see output like:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**Test it:** Open http://localhost:8000/health in your browser → Should show `{"status":"ok"}`

---

## Step 2: Start the Frontend (React/Vite)

**Open a NEW PowerShell/CMD window** (keep backend running in the first window):

```powershell
# Navigate to project folder
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"

# Install dependencies (first time only)
npm install

# Start the frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network:  http://[::]:8080/
```

**Open:** http://localhost:8080 in your browser

---

## Step 3: Test the System

1. **Open the dashboard** at http://localhost:8080
2. **Click "Upload & Analyze"** button in the video panel
3. **Select a video file** (MP4, AVI, MOV, etc.)
4. **Wait for analysis** - you should see:
   - "Analyzing video (YOLO + LSTM + LLM)" status
   - Timeline updates with activities
   - Narrative summary appears
   - Risk level updates
   - Alerts appear

---

## 🔧 Troubleshooting

### Error: "Cannot reach backend"

**Solution:**
1. ✅ Make sure backend is running (Step 1)
2. ✅ Check backend is on port 8000: http://localhost:8000/health
3. ✅ Check frontend is on port 8080: http://localhost:8080
4. ✅ Make sure both are running in separate terminals

**Test backend manually:**
```powershell
# In a new PowerShell window
python test-backend.py
```

### Error: "Module not found" or Import Errors

**Solution:**
```powershell
# Make sure virtual environment is activated
.\venv\Scripts\Activate.ps1

# Reinstall dependencies
pip install -r requirements.txt
```

### Error: Port Already in Use

**Solution:**
- Backend (port 8000): Find and close the process using port 8000
- Frontend (port 8080): Find and close the process using port 8080

**Windows:**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

## 📁 Project Structure

```
insight-stream/
├── app.py                    # FastAPI backend main file
├── requirements.txt          # Python dependencies
├── start-backend.ps1         # PowerShell startup script
├── start-backend.bat         # CMD startup script
├── test-backend.py           # Backend test script
├── preprocessing/            # Video preprocessing
├── detection/                # YOLO-style detection
├── recognition/              # LSTM-style recognition
├── summarization/            # LLM-style summarization
├── alerts/                   # Risk assessment
└── src/                      # React frontend
```

---

## 🎯 Quick Commands Reference

```powershell
# Backend
.\start-backend.ps1                    # Start backend (PowerShell)
start-backend.bat                      # Start backend (CMD)
python test-backend.py                 # Test backend connection

# Frontend
npm run dev                             # Start frontend dev server
npm run build                           # Build for production
npm run preview                         # Preview production build
```

---

## ✅ Success Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Backend health check works: http://localhost:8000/health
- [ ] Frontend running on http://localhost:8080
- [ ] Can upload video file
- [ ] Analysis completes successfully
- [ ] Dashboard updates with results

---

**Need help?** Check the browser console (F12) and backend terminal for error messages!
