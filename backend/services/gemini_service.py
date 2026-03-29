import httpx
import os
import json
import asyncio
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

USE_MOCK = True   # ← change to False when Gemini quota resets

MOCK_RESPONSE = {
    "destination": "Paris",
    "days": [
        {
            "day": 1,
            "title": "History & Iconic Landmarks",
            "activities": [
                {
                    "time": "9:00 AM",
                    "place": "Eiffel Tower",
                    "description": "Visit the iconic iron lattice tower on the Champ de Mars.",
                    "lat": 48.8584,
                    "lng": 2.2945
                },
                {
                    "time": "1:00 PM",
                    "place": "Louvre Museum",
                    "description": "World's largest art museum, home to the Mona Lisa.",
                    "lat": 48.8606,
                    "lng": 2.3376
                },
                {
                    "time": "7:00 PM",
                    "place": "Le Marais District",
                    "description": "Explore historic streets and enjoy French cuisine.",
                    "lat": 48.8566,
                    "lng": 2.3522
                }
            ]
        },
        {
            "day": 2,
            "title": "Food & Culture",
            "activities": [
                {
                    "time": "9:00 AM",
                    "place": "Montmartre",
                    "description": "Bohemian hilltop neighbourhood with Sacré-Cœur basilica.",
                    "lat": 48.8867,
                    "lng": 2.3431
                },
                {
                    "time": "1:00 PM",
                    "place": "Musée d'Orsay",
                    "description": "Impressionist masterpieces inside a beautiful railway station.",
                    "lat": 48.8600,
                    "lng": 2.3266
                },
                {
                    "time": "7:00 PM",
                    "place": "Seine River Cruise",
                    "description": "Evening boat cruise along the Seine with city views.",
                    "lat": 48.8530,
                    "lng": 2.3499
                }
            ]
        }
    ]
}


async def generate_itinerary(destination: str, days: int, interests: str, budget: str) -> dict:

    if USE_MOCK:
        return MOCK_RESPONSE

    prompt = f"""
    Create a detailed {days}-day travel itinerary for {destination}.
    Traveler interests: {interests}
    Budget level: {budget}

    Return ONLY a valid JSON object in this exact format, no extra text:
    {{
        "destination": "{destination}",
        "days": [
            {{
                "day": 1,
                "title": "Day title here",
                "activities": [
                    {{
                        "time": "9:00 AM",
                        "place": "Place name",
                        "description": "What to do here",
                        "lat": 00.0000,
                        "lng": 00.0000
                    }}
                ]
            }}
        ]
    }}
    Include 3-4 activities per day. Use real coordinates for each place.
    """

    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    max_retries = 3

    for attempt in range(max_retries):
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(GEMINI_URL, json=payload)

            if response.status_code == 429:
                wait_time = 10 * (attempt + 1)
                print(f"Rate limited. Waiting {wait_time}s before retry...")
                await asyncio.sleep(wait_time)
                continue

            response.raise_for_status()
            data = response.json()
            raw_text = data["candidates"][0]["content"]["parts"][0]["text"]

            raw_text = raw_text.strip()
            if raw_text.startswith("```"):
                raw_text = raw_text.split("```")[1]
                if raw_text.startswith("json"):
                    raw_text = raw_text[4:]

            return json.loads(raw_text)

    raise Exception("Gemini rate limit hit after 3 retries. Please wait a minute.")