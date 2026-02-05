from __future__ import annotations

"""
Preprocessing utilities for CCTV video.

For the full project you might:
- Extract frames at a fixed FPS
- Perform denoising, resizing, normalization
- Feed frames to a YOLO detector or feature extractor

Here we keep it lightweight and focus on metadata, so the end-to-end
pipeline runs quickly even without heavy models.
"""

from dataclasses import dataclass

import cv2


@dataclass
class VideoMetadata:
    path: str
    fps: float
    frame_count: int
    duration_seconds: float


def extract_video_metadata(path: str) -> VideoMetadata:
    """
    Read basic metadata from a video file using OpenCV.

    If anything goes wrong, fall back to 5 minutes as a safe default
    so that the rest of the pipeline can still operate.
    """
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        # Fallback defaults
        return VideoMetadata(
            path=path, fps=25.0, frame_count=25 * 60 * 5, duration_seconds=300.0
        )

    fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or fps * 60 * 5)
    duration_seconds = frame_count / fps if fps > 0 else 300.0

    cap.release()
    return VideoMetadata(
        path=path,
        fps=fps,
        frame_count=frame_count,
        duration_seconds=duration_seconds,
    )

