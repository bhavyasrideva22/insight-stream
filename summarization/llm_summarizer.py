from __future__ import annotations

"""
Narrative summarization (LLM-style stub).

For a production / research setup you can:
- Call an external LLM API (OpenAI, etc.)
- Or load a local Transformer model via Hugging Face

Here we generate a clear, human-readable narrative using the list of
activities so you get immediate, offline-friendly behavior.
"""

from typing import List

from recognition.activity_recognition import ActivityItem


def generate_narrative_summary(
    activities: List[ActivityItem],
    duration_seconds: float,
) -> str:
    if not activities:
        return (
            "The CCTV footage shows normal activity in the monitored area. "
            "No abnormal or high-risk events were detected during the recording."
        )

    duration_min = max(duration_seconds / 60.0, 0.1)
    intro = (
        f"The analyzed CCTV footage spans approximately {duration_min:.1f} minutes. "
        "The AI system detected the following sequence of activities:"
    )

    lines = []
    for a in activities:
        risk_phrase = {
            "normal": "normal behavior",
            "warning": "potentially suspicious behavior",
            "danger": "high-risk behavior",
        }.get(a.type, "observed behavior")

        lines.append(
            f"- At {a.timestamp}, the system detected '{a.label}' "
            f"({risk_phrase}, confidence {a.confidence * 100:.0f}%)."
        )

    # Simple risk-focused closing sentence
    has_danger = any(a.type == "danger" for a in activities)
    has_warning = any(a.type == "warning" for a in activities)

    if has_danger:
        closing = (
            "Overall, the sequence of events indicates a high-risk incident "
            "involving unauthorized access and possible theft, and immediate "
            "security review is recommended."
        )
    elif has_warning:
        closing = (
            "While no confirmed critical incident was detected, the presence of "
            "suspicious or unusual behavior warrants closer monitoring of this area."
        )
    else:
        closing = (
            "No anomalous activities were identified, and the scene appears to "
            "remain within normal behavioral patterns."
        )

    return "\n\n".join([intro, "\n".join(lines), closing])

