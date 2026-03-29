from pydantic import BaseModel
from typing import List

class TripRequest(BaseModel):
    destination: str
    days: int
    interests: str
    budget: str        # "budget", "mid-range", "luxury"

class Activity(BaseModel):
    time: str          # "9:00 AM"
    place: str         # "Eiffel Tower"
    description: str
    lat: float
    lng: float

class DayPlan(BaseModel):
    day: int
    title: str
    activities: List[Activity]

class ItineraryResponse(BaseModel):
    destination: str
    days: List[DayPlan]