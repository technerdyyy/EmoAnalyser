from fastapi import APIRouter
from app.models import ReflectionRequest, EmotionResponse
import random

router = APIRouter()

@router.post("/analyze", response_model=EmotionResponse)
def analyze_emotion(reflection: ReflectionRequest):
    emotions = ["Anxious", "Excited", "Calm", "Worried", "Hopeful", "Confident", "Nervous", "Happy"]
    return {
        "emotion": random.choice(emotions),
        "confidence": round(random.uniform(0.7, 1.0), 2)
    }
