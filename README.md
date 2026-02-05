# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- FastAPI (Python backend for AI CCTV analysis)
- OpenCV (video preprocessing)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## AI-Based CCTV Incident Narrative Summarization System

This project also includes a Python backend that simulates an end-to-end AI CCTV pipeline:

- **Preprocessing** (`preprocessing/video.py`): reads CCTV video metadata using OpenCV.
- **Object / activity detection (YOLO-style stub)** (`detection/yolo_pipeline.py`): generates plausible detection events over the video.
- **Activity recognition (LSTM-style stub)** (`recognition/activity_recognition.py`): converts detections into high-level activities.
- **Narrative generation (LLM-style stub)** (`summarization/llm_summarizer.py`): produces a human-readable incident summary.
- **Risk assessment & alerts** (`alerts/risk_assessment.py`): assigns a risk level and alert notifications.
- **FastAPI app** (`app.py`): exposes a `/analyze-video` endpoint consumed by the React dashboard.

You can later plug in real YOLO / LSTM / LLM models by replacing the stub logic inside these modules.

### Backend: Installation & Run

1. **Create a virtual environment (recommended)**

```sh
cd insight-stream  # project root
python -m venv venv

# Windows (PowerShell)
venv\Scripts\Activate

# Linux / macOS
source venv/bin/activate
```

2. **Install Python dependencies**

```sh
pip install -r requirements.txt
```

3. **Run the FastAPI backend**

```sh
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`.

You can quickly test it with:

```sh
curl -X POST "http://localhost:8000/analyze-video" ^
  -H "accept: application/json" ^
  -H "Content-Type: multipart/form-data" ^
  -F "file=@data\sample.mp4"
```

> Place your CCTV videos anywhere on disk; the React UI will upload them directly to the backend.

### Frontend: Run the React Dashboard

In a separate terminal:

```sh
cd insight-stream
npm install
npm run dev
```

Vite will typically run on `http://localhost:5173`.

> The React dashboard is already wired to call the FastAPI backend at `http://localhost:8000/analyze-video`.  
> When you click **“Upload & Analyze”** in the video panel and choose a CCTV video file:
>
> - The file is uploaded to the backend.
> - The backend returns:
>   - A chronological **activity timeline** (entry, loitering, unauthorized access, theft, exit).
>   - An AI-style **narrative summary**.
>   - A **risk level** (low / medium / high).
>   - Structured **alerts**.
> - The dashboard updates:
>   - `VideoFeed` shows analysis status.
>   - `ActivityTimeline` shows activities.
>   - `NarrativeSummary` shows the generated summary and labels.
>   - `RiskIndicator` reflects the computed risk level.
>   - `AlertPanel` displays incident alerts.

