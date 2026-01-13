from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import json
from clustring_model_v3_final import AzerbaijaniAspectClustering  # import your class

# Initialize FastAPI
app = FastAPI(title="Azerbaijani Review Classification API")

# Initialize the clustering model (load SentenceTransformer once)
model = AzerbaijaniAspectClustering()

# Request schema
class CommentRequest(BaseModel):
    comment: str

# Response schema
class ClassificationResponse(BaseModel):
    topic_label: str = None
    confidence: float = 0.0

@app.post("/classify", response_model=ClassificationResponse)
async def classify_comment(request: CommentRequest):
    try:
        comment = request.comment.strip()
        if not comment:
            raise HTTPException(status_code=400, detail="Comment cannot be empty.")

        # Use your detect_primary_aspect method
        aspect_key = model.detect_primary_aspect(comment)
        
        if aspect_key:
            topic_label = model.problem_keywords[aspect_key]["label"]
            confidence = 1.0  # keyword-based has no probability; can return 1 or custom logic
        else:
            topic_label = "Digər"  # "Other" cluster
            confidence = 0.0

        return ClassificationResponse(topic_label=topic_label, confidence=confidence)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
