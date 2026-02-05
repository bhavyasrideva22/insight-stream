from __future__ import annotations

"""
YOLO-style detection pipeline (stub implementation).

This module is structured so you can later plug in a real YOLO model
from Ultralytics or another implementation. For now, it generates
synthetic detection events spread over the video duration, which keeps
the frontend and backend fully functional for demonstrations.
"""

from dataclasses import dataclass
from typing import List


@dataclass
class DetectionEvent:
    """
    Coarse detection event summarizing what YOLO saw in a time window.
    """

    time_seconds: float
    label: str
    confidence: float


def run_yolo_stub_detection(
    video_path: str,
    duration_seconds: float,
    *,
    num_events: int = 5,
) -> List[DetectionEvent]:
    """
    Stub implementation that returns a fixed set of plausible events
    distributed over the video duration.

    You can later replace this with real YOLO code, for example:
      - Load a YOLO model (ultralytics.YOLO or similar)
      - Sample frames from the video
      - Run detection on each sampled frame
      - Aggregate detections into higher-level DetectionEvent instances
    """
    if duration_seconds <= 0:
        duration_seconds = 300.0

    # Normalized template events similar to your sample output.
    template = [
        ("Person enters building", 0.94),
        ("Loitering near entrance", 0.87),
        ("Unauthorized access attempt", 0.92),
        ("Theft / object removed", 0.89),
        ("Person exits building", 0.96),
    ]

    # Clamp to requested num_events
    template = template[:num_events]
    interval = duration_seconds / max(len(template), 1)

    events: List[DetectionEvent] = []
    for idx, (label, conf) in enumerate(template):
        t = min(duration_seconds, idx * interval)
        events.append(
            DetectionEvent(
                time_seconds=t,
                label=label,
                confidence=conf,
            )
        )

    return events

