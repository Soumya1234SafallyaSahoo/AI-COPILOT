from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from typing import Optional
import io

app = FastAPI()

# CORS for local dev—tighten in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # or ["http://localhost:5500", "http://127.0.0.1:5500"]
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/respond")
async def respond(audio: UploadFile = File(...), return_json: Optional[bool] = False):
    """
    Accepts an uploaded audio file (field name: 'audio') and returns audio.
    - By default, returns raw audio bytes (the frontend will autoplay it).
    - If you call /respond?return_json=true, it returns JSON with a base64 payload.
      (kept for flexibility with other frontends)
    """
    data = await audio.read()
    if not data:
        return JSONResponse({"error": "Empty audio payload"}, status_code=400)

    media_type = audio.content_type or "audio/webm"

    # Return raw audio (recommended; simplest)
    return StreamingResponse(io.BytesIO(data), media_type=media_type)
