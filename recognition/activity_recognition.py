from __future__ import annotations

"""
Activity recognition (LSTM-style stub).

This module turns lower-level detection events into human-readable,
chronological activities for the timeline and summary.

In a full implementation, you could:
- Encode YOLO detections into feature vectors
- Feed sequences into an LSTM/GRU/Transformer
- Predict activity classes over time
"""

from dataclasses import dataclass
from typing import List

from detection.yolo_pipeline import DetectionEvent


@dataclass
class ActivityItem:
    timestamp: str
    label: str
    type: str  # "normal" | "warning" | "danger"
    confidence: float


def _format_timestamp(seconds: float) -> str:
    seconds = max(0, int(seconds))
    m, s = divmod(seconds, 60)
    return f"{m:02d}:{s:02d}"


def build_activity_timeline(
    detection_events: List[DetectionEvent],
    duration_seconds: float,
) -> List[ActivityItem]:
    """
    Simple rule-based mapping from detection events to activity items.

    This mirrors your example:
      - Entry
      - Loitering
      - Unauthorized Access
      - Theft
      - Exit
    """
    activities: List[ActivityItem] = []

    for event in detection_events:
        label_lower = event.label.lower()
        if "enter" in label_lower:
            a_type = "normal"
        elif "loiter" in label_lower:
            a_type = "warning"
        elif "unauthorized" in label_lower or "access" in label_lower:
            a_type = "danger"
        elif "theft" in label_lower or "object" in label_lower:
            a_type = "danger"
        elif "exit" in label_lower:
            a_type = "normal"
        else:
            a_type = "normal"

        activities.append(
            ActivityItem(
                timestamp=_format_timestamp(event.time_seconds),
                label=event.label,
                type=a_type,
                confidence=event.confidence,
            )
        )

    # If no events were produced, synthesize a generic "Normal activity" item.
    if not activities:
        activities.append(
            ActivityItem(
                timestamp="00:00",
                label="Normal activity detected in surveillance area",
                type="normal",
                confidence=0.9,
            )
        )

    # Ensure activities are sorted by time
    activities.sort(key=lambda a: a.timestamp)
    return activities

