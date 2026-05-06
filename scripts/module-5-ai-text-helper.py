"""Module 5 companion script: beginner AI text helper.

Usage:
1) Optional: set OPENAI_API_KEY in your environment.
2) Run: python scripts/module-5-ai-text-helper.py
3) Paste text when prompted.

If OPENAI_API_KEY is set, the script will attempt a simple OpenAI Responses API call.
If not, it falls back to local text processing.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from typing import Any


def local_fallback(text: str) -> dict[str, Any]:
    words = text.split()
    cleaned = [w.strip(".,!?;:\"'()[]{}") for w in words if w.strip()]
    return {
        "mode": "local_fallback",
        "word_count": len(cleaned),
        "preview": " ".join(cleaned[:12]),
        "length_label": classify_text_length(len(cleaned)),
    }


def classify_text_length(word_count: int) -> str:
    if word_count < 20:
        return "short"
    if word_count < 80:
        return "medium"
    return "long"


def call_openai_api(api_key: str, text: str) -> str:
    """Calls OpenAI Responses API using urllib from the Python standard library."""
    url = "https://api.openai.com/v1/responses"
    payload = {
        "model": "gpt-4.1-mini",
        "input": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "Summarize this text in 2 concise bullet points and include a 1-line action item:\n\n"
                            f"{text}"
                        ),
                    }
                ],
            }
        ],
    }

    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read().decode("utf-8")
            body = json.loads(raw)
    except urllib.error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="replace") if exc.fp else str(exc)
        raise RuntimeError(f"OpenAI API HTTP error: {exc.code} {details}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error while calling OpenAI API: {exc.reason}") from exc

    text_output = body.get("output_text")
    if isinstance(text_output, str) and text_output.strip():
        return text_output.strip()

    return json.dumps(body, indent=2)


def main() -> int:
    print("Module 5 AI Text Helper")
    print("- Paste text to process")
    print("- Set OPENAI_API_KEY to enable API mode")
    print()

    try:
        user_text = input("Paste text: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nNo input received. Exiting.")
        return 1

    if not user_text:
        print("Please provide some text next time.")
        return 1

    api_key = os.getenv("OPENAI_API_KEY")

    if api_key:
        print("\nAPI key detected. Attempting AI summary...")
        try:
            output = call_openai_api(api_key, user_text)
            print("\nAI Output:\n")
            print(output)
            return 0
        except RuntimeError as exc:
            print(f"\nAPI mode failed: {exc}")
            print("Falling back to local processing...\n")

    result = local_fallback(user_text)
    print("Local Result:")
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
