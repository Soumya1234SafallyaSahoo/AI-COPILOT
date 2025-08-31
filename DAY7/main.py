from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
import shutil
import os

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static & templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
def serve_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/tts/echo")
async def echo_audio(file: UploadFile = File(...)):
    try:
        os.makedirs("static/audio", exist_ok=True)
        file_path = f"static/audio/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Here, Murf AI API integration would go — mocked for now
        murf_audio_url = f"/{file_path}"  # Local file as placeholder

        return JSONResponse({"audio_url": murf_audio_url})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
