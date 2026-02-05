"""
AI-Based CCTV Incident Narrative Summarization Backend

FastAPI service that:
- Accepts a CCTV video file upload
- Runs a simplified analysis pipeline:
  - Preprocessing (frame extraction)
  - Object / activity detection (YOLO-style stub)
  - Temporal activity recognition (LSTM-style stub)
  - Narrative generation (LLM-style stub)
  - Risk assessment and alert generation
- Returns structured results for the React dashboard.

This file is intentionally lightweight and uses stubbed logic so that
you can run the full stack end-to-end even without heavy models.
You can later replace the stubbed parts with real YOLO/LSTM/LLM models.
"""

from __future__ import annotations

import os
import shutil
import tempfile
from typing import List

import logging

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

from preprocessing.video import extract_video_metadata
from detection.yolo_pipeline import run_yolo_stub_detection
from recognition.activity_recognition import build_activity_timeline
from summarization.llm_summarizer import generate_narrative_summary
from alerts.risk_assessment import assess_risk_and_alerts


class Activity(BaseModel):
    timestamp: str
    label: str
    type: str  # "normal" | "warning" | "danger"
    confidence: float


class Alert(BaseModel):
    id: str
    title: str
    message: str
    severity: str  # "warning" | "critical"
    timestamp: str
    is_new: bool


class AnalysisResponse(BaseModel):
    video_duration_seconds: float
    activities: List[Activity]
    narrative_summary: str
    risk_level: str  # "low" | "medium" | "high"
    alerts: List[Alert]


app = FastAPI(
    title="AI CCTV Incident Summarization API",
    description=(
        "Backend for AI-based CCTV incident narrative summarization.\n\n"
        "Upload a video and receive structured activities, a narrative summary, "
        "risk level, and alert suggestions."
    ),
    version="1.0.0",
)


# CORS so the Vite React frontend can talk to this API during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:8080",  # Vite dev server port from vite.config.ts
        "http://127.0.0.1:8080",
        "http://[::]:8080",  # IPv6 localhost
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/analyze-video", response_model=AnalysisResponse)
async def analyze_video(file: UploadFile = File(...)) -> AnalysisResponse:
    """
    Main analysis endpoint.

    1. Save uploaded file to a temporary location.
    2. Extract video metadata (duration, fps, etc.).
    3. Run YOLO-style stub detection over coarse frames.
    4. Run LSTM-style temporal reasoning to build an activity timeline.
    5. Generate an LLM-style narrative summary.
    6. Assess risk level and derive alert notifications.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="Uploaded file has no filename.")

    # Persist upload to a temp file so OpenCV / other libs can read it.
    tmp_dir = tempfile.mkdtemp(prefix="cctv_")
    tmp_path = os.path.join(tmp_dir, file.filename or "uploaded_video")

    try:
        logger.info(f"Received video upload: {file.filename} ({file.size or 'unknown'} bytes)")
        
        # Read and save the uploaded file
        with open(tmp_path, "wb") as buffer:
            content = await file.read()
            if not content:
                raise HTTPException(status_code=400, detail="Uploaded file is empty")
            buffer.write(content)
            logger.info(f"Saved video to temporary file: {tmp_path}")

        # Check if file exists and has content
        if not os.path.exists(tmp_path):
            raise HTTPException(status_code=500, detail=f"Failed to save uploaded file to {tmp_path}")
        
        file_size = os.path.getsize(tmp_path)
        if file_size == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty")
        
        logger.info(f"Video file size: {file_size} bytes")

        # Extract video metadata
        try:
            metadata = extract_video_metadata(tmp_path)
            logger.info(f"Video metadata: duration={metadata.duration_seconds}s, fps={metadata.fps}, frames={metadata.frame_count}")
        except Exception as e:
            logger.error(f"Failed to extract video metadata: {e}")
            raise HTTPException(status_code=400, detail=f"Invalid video file or unsupported format: {str(e)}")

        # Step 1: run YOLO-style detection stub (returns coarse detection events)
        try:
            detection_events = run_yolo_stub_detection(
                video_path=tmp_path,
                duration_seconds=metadata.duration_seconds,
            )
            logger.info(f"Generated {len(detection_events)} detection events")
        except Exception as e:
            logger.error(f"Detection failed: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to run detection: {str(e)}")

        # Step 2: build activity timeline (LSTM-style high level activities)
        try:
            activities = build_activity_timeline(
                detection_events=detection_events,
                duration_seconds=metadata.duration_seconds,
            )
            logger.info(f"Generated {len(activities)} activities")
        except Exception as e:
            logger.error(f"Activity recognition failed: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to build activity timeline: {str(e)}")

        # Step 3: generate narrative summary (LLM-style)
        try:
            narrative = generate_narrative_summary(
                activities=activities,
                duration_seconds=metadata.duration_seconds,
            )
            logger.info(f"Generated narrative summary ({len(narrative)} characters)")
        except Exception as e:
            logger.error(f"Summarization failed: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to generate narrative: {str(e)}")

        # Step 4: risk level + alerts
        try:
            risk_level, alerts = assess_risk_and_alerts(activities)
            logger.info(f"Risk level: {risk_level}, Alerts: {len(alerts)}")
        except Exception as e:
            logger.error(f"Risk assessment failed: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to assess risk: {str(e)}")

        # Adapt to response models
        activity_models = [
            Activity(
                timestamp=a.timestamp,
                label=a.label,
                type=a.type,
                confidence=a.confidence,
            )
            for a in activities
        ]

        alert_models = [
            Alert(
                id=alert.id,
                title=alert.title,
                message=alert.message,
                severity=alert.severity,
                timestamp=alert.timestamp,
                is_new=alert.is_new,
            )
            for alert in alerts
        ]

        logger.info("Analysis complete, returning results")
        return AnalysisResponse(
            video_duration_seconds=metadata.duration_seconds,
            activities=activity_models,
            narrative_summary=narrative,
            risk_level=risk_level,
            alerts=alert_models,
        )

    except Exception as e:
        logger.error(f"Analysis error: {e}", exc_info=True)
        raise
    finally:
        try:
            if os.path.exists(tmp_dir):
                shutil.rmtree(tmp_dir)
                logger.info(f"Cleaned up temporary directory: {tmp_dir}")
        except Exception as cleanup_err:
            logger.warning(f"Failed to cleanup temp directory: {cleanup_err}")


if __name__ == "__main__":
    import uvicorn

    logger.info("Starting AI CCTV Incident Summarization API...")
    logger.info("Backend will be available at http://localhost:8000")
    logger.info("API docs available at http://localhost:8000/docs")
    
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )

