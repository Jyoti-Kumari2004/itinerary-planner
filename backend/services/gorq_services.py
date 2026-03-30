import os
from groq import Groq
from dotenv import load_dotenv
import json

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

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
                    "description": "Visit the iconic iron lattice tower.",
                    "lat": 48.8584,
                    "lng": 2.2945
                },
                {
                    "time": "1:00 PM",
                    "place": "Louvre Museum",
                    "description": "World's largest art museum.",
                    "lat": 48.8606,
                    "lng": 2.3376
                }
            ]
        }
    ]
}

async def generate_itinerary(destination: str, days: int, interests: str, budget: str) -> dict:

    # return MOCK_RESPONSE  # uncomment this to test without API

    prompt = f"""
    Create a detailed {days}-day travel itinerary for {destination}.
    Traveler interests: {interests}
    Budget level: {budget}

    Return ONLY a valid JSON object in this exact format, no extra text, no markdown:
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

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a travel expert. Always respond with valid JSON only. No markdown, no extra text."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama-3.3-70b-versatile",  # free, fast, high quality
        temperature=0.7,
    )

    raw_text = chat_completion.choices[0].message.content.strip()

    # clean if model adds markdown anyway
    if raw_text.startswith("```"):
        raw_text = raw_text.split("```")[1]
        if raw_text.startswith("json"):
            raw_text = raw_text[4:]

    return json.loads(raw_text)