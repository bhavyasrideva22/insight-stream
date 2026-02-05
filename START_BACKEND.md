# 🚀 Quick Start Guide - Backend Setup

## ✅ Python Installation Verified

Python 3.12.10 is installed and working!

---

## Step-by-Step Backend Setup

### Option 1: Use the Startup Script (Recommended)

```powershell
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
.\start-backend.ps1
```

### Option 2: Manual Setup

**1. Navigate to project folder:**
```powershell
cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
```

**2. Create virtual environment (if not exists):**
```powershell
python -m venv venv
```

**3. Activate virtual environment:**
```powershell
.\venv\Scripts\Activate.ps1
```

**4. Install dependencies:**
```powershell
pip install -r requirements.txt
```

**5. Start the backend:**
```powershell
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

---

## ✅ Verify Backend is Running

Open in your browser:
- **Health Check:** http://localhost:8000/health
- **API Documentation:** http://localhost:8000/docs

You should see `{"status":"ok"}` at the health endpoint.

---

## 🎯 Next Steps

Once the backend is running:

1. **Keep the backend terminal open** (don't close it)

2. **Open a NEW terminal** for the frontend:
   ```powershell
   cd "C:\Users\bhavy\OneDrive\Desktop\project-1\insight-stream"
   npm run dev
   ```

3. **Open your browser** to: http://localhost:8080

4. **Upload a video** using the "Upload & Analyze" button

---

## 🔧 Troubleshooting

### "Port 8000 already in use"
- Another process is using port 8000
- Find and stop it, or change the port in the uvicorn command

### "Module not found"
- Make sure virtual environment is activated: `.\venv\Scripts\Activate.ps1`
- Reinstall dependencies: `pip install -r requirements.txt`

### Backend won't start
- Check Python is working: `python --version`
- Check dependencies: `pip list`
- Check for errors in the terminal output

---

## 📝 Quick Commands Reference

```powershell
# Activate venv
.\venv\Scripts\Activate.ps1

# Check Python
python --version

# Check dependencies
pip list

# Start backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Test backend
curl http://localhost:8000/health
```

---

**Your Python is installed and ready! Just run the startup script or follow the manual steps above.**
