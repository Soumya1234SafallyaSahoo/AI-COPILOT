# 🚀 30 Days of AI Voice Agents Challenge – Day 13: Documentation

# 📖 Introduction
The **AI Voice Agent** is an intelligent, interactive voice-based assistant that listens, understands, and responds in real time.  
It combines **speech recognition**, **natural language processing**, and **text-to-speech** to create a smooth and human-like conversational experience.  

💡 This project is built as part of the **30 Days of AI Voice Agents Challenge**.

# 📝 About the Project
This project aims to create a **full-stack AI-powered voice assistant** that works directly in the browser without extra installations.  

## 🔍 How it Works
1. **User Speaks** 🎤 – The browser records the voice.
2. **Speech-to-Text** 📝 – Audio is sent to the backend, transcribed using AssemblyAI.
3. **AI Processing** 🤖 – The transcribed text is processed using a Large Language Model (LLM) via the OpenAI API.
4. **Text-to-Speech** 🔊 – AI’s response is converted back into audio.
5. **User Hears Response** 👂 – Played instantly in the browser.

This modular design makes it perfect for **customer support**, **virtual teaching assistants**, or **voice-enabled applications**.

# 🚀 Key Features
- 🎤 **Voice Input** – Record audio from your browser with one click.
- 🧠 **AI-Powered Responses** – Generates smart, context-aware replies.
- 🎯 **Accurate Transcription** – High-accuracy Speech-to-Text via AssemblyAI.
- 🔊 **Natural Voice Output** – Instant text-to-speech playback.
- 🌐 **Web-Based Interface** – Works directly in the browser.
- ⚡ **Real-Time Performance** – Designed for speed and responsiveness.

---
![image alt](https://github.com/Soumya1234SafallyaSahoo/AI-COPILOT/blob/main/WhatsApp%20Image%202025-08-14%20at%2023.51.00_96f2b202.jpg?raw=trueage)
# 🛠 Tech Stack
| 💡 Component        | 🔧 Technology Used |
|---------------------|--------------------|
| Backend API         | FastAPI (Python) |
| Frontend UI         | HTML, CSS, JavaScript |
| Speech-to-Text      | AssemblyAI API |
| AI Processing       | OpenAI API |
| Text-to-Speech      | gTTS / Murf.ai |
| Server Hosting      | Uvicorn |

# 🏗 Architecture

The AI Voice Agent follows a **client-server architecture** with API-based integrations for transcription, AI processing, and text-to-speech.

**Workflow:**
1. **User Speaks** 🎤 – Audio is captured from the browser using JavaScript.
2. **Frontend Sends Audio** 🌐 – Audio file is sent to the FastAPI backend.
3. **Speech-to-Text** 📝 – AssemblyAI API converts the audio to text.
4. **AI Processing** 🤖 – OpenAI API processes the text and generates a smart response.
5. **Text-to-Speech** 🔊 – gTTS or Murf.ai converts the response into audio.
6. **User Hears Response** 👂 – The frontend plays the generated audio in real time.
7. # ⚙️ Getting Started

## 📋 Prerequisites
Before running the project, make sure you have:

- 🐍 **Python 3.9+** installed  
- 📦 **pip** (Python package manager)  
- 🌐 Stable internet connection  
- 🔑 API keys for:
  - **AssemblyAI** (Speech-to-Text)
  - **OpenAI** (LLM Processing)
  - **Murf.ai** (Text-to-Speech)
- 💻 Any modern web browser (Chrome, Edge, Firefox, etc.)
- 
**API Keys** 🔑  
   You need valid API keys for:
   - **AssemblyAI** – For Speech-to-Text  
     Sign up: [https://www.assemblyai.com](https://www.assemblyai.com)
   - **OpenAI** – For LLM (AI text processing)  
     Sign up: [https://platform.openai.com](https://platform.openai.com)
   - **Murf.ai** – For Text-to-Speech  
     Sign up: [https://murf.ai](https://murf.ai)

   **Code Editor** ✏️  
  - Recommended: **VS Code** for editing and running the project.
⚙️ Installation & Dependencies

Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

Create & activate a virtual environment (optional but recommended)
python -m venv venv
Windows: venv\Scripts\activate
Mac/Linux: source venv/bin/activate

Install dependencies
pip install -r requirements.txt
(Key packages: fastapi, uvicorn, requests, openai, assemblyai, murfpy)

Set up environment variables in a .env file:
OPENAI_API_KEY=your_openai_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
MURF_API_KEY=your_murf_api_key

Run the API server
uvicorn main:app --reload

Open index.html in your browser and start using the AI Voice Agent.
