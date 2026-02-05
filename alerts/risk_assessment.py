from __future__ import annotations

"""
Risk assessment & alert generation.

Takes the high-level activities and decides:
- Overall risk level for the incident
- List of structured alerts for the dashboard
"""

from dataclasses import dataclass
from typing import List, Tuple

from recognition.activity_recognition import ActivityItem


@dataclass
class AlertItem:
    id: str
    title: str
    message: str
    severity: str  # "warning" | "critical"
    timestamp: str
    is_new: bool = True


def assess_risk_and_alerts(activities: List[ActivityItem]) -> Tuple[str, List[AlertItem]]:
    if not activities:
        return "low", []

    has_danger = any(a.type == "danger" for a in activities)
    has_warning = any(a.type == "warning" for a in activities)

    if has_danger:
        risk_level = "high"
    elif has_warning:
        risk_level = "medium"
    else:
        risk_level = "low"

    alerts: List[AlertItem] = []

    # Generate alerts similar to your static dashboard content
    for idx, a in enumerate(activities, start=1):
        if a.type == "danger":
            if "unauthorized" in a.label.lower():
                title = "Unauthorized Access Detected"
                severity = "critical"
            elif "theft" in a.label.lower() or "object" in a.label.lower():
                title = "Theft Activity Detected"
                severity = "critical"
            else:
                title = "High-Risk Activity Detected"
                severity = "critical"
        elif a.type == "warning":
            title = "Suspicious Behavior Detected"
            severity = "warning"
        else:
            # Skip normal items from alerts
            continue

        alerts.append(
            AlertItem(
                id=str(idx),
                title=title,
                message=f"{a.label} at {a.timestamp}",
                severity=severity,
                timestamp=f"{a.timestamp}",
                is_new=True,
            )
        )

    return risk_level, alerts

