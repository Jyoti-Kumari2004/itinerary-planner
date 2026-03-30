# TripAI — AI Itinerary Planner

An AI-powered travel itinerary planner built with FastAPI, React, and Groq AI.

## Live Demo

[itinerary-planner-peach.vercel.app](https://itinerary-planner-peach.vercel.app)

## Features

- AI generates day-by-day travel itineraries
- Interactive map with location pins
- Supports any destination worldwide
- Budget preference selection

## Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Frontend   | React + Vite + Leaflet.js |
| Backend    | FastAPI + Python          |
| AI         | Groq API (LLaMA 3.3 70B)  |
| Map        | OpenStreetMap + Nominatim |
| Deployment | Vercel + Render           |

## Run Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `backend/.env`:

```
GROQ_API_KEY=your_key_here
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:8000
```
