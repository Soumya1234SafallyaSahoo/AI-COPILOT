c def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/llm/query")
async def llm_query(file: UploadFile = File(...)):
    try:
        # Save file
        session_id = str(uuid.uuid4())
        audio_path = save_uploaded_file(file, session_id)

        # Step 1: Speech-to-text
        text = transcribe_audio(audio_path)

        # Step 2: LLM query
        llm_response = query_gemini(text)

        # Step 3: Text-to-speech
        output_file = text_to_speech(llm_response, session_id)

        return JSONResponse(content={
            "text": llm_response,
            "audio_file": output_file
        })

    except Exception as e:
        logger.exception("Error in llm_query")
        return JSONResponse(content={"error": str(e)}, status_code=500)