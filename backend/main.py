from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.itinerary import router

app = FastAPI(title="Itinerary Planner API")

# allow React frontend to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://itinerary-planner-peach.vercel.app/",  # paste your exact URL here
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/itinerary")

@app.get("/")
def root():
    return {"status": "Itinerary Planner API is running"}
