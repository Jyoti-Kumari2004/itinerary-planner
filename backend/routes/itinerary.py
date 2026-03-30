from fastapi import APIRouter, HTTPException
from models import TripRequest, ItineraryResponse
from services.gorq_services import generate_itinerary

router = APIRouter()

@router.post("/generate", response_model=ItineraryResponse)
async def generate(request: TripRequest):
    try:
        itinerary = await generate_itinerary(
            destination=request.destination,
            days=request.days,
            interests=request.interests,
            budget=request.budget
        )
        return itinerary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")