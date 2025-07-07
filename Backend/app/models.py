from pydantic import BaseModel

class ReflectionRequest(BaseModel):
    text: str

class EmotionResponse(BaseModel):
    emotion: str
    confidence: float
