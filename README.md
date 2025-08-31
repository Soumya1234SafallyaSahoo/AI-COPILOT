# 🎙️ AI Voice Agent – Conversational Assistant  

Welcome to the repository for the **AI Voice Agent**, built as part of the **30 Days of AI Voice Agents Challenge**.  
This project started as a simple echo bot and evolved into a **fully deployed, browser-based AI assistant** that listens, understands, and responds naturally in real time.  

## 🤖 About AI Voice Agent  
The AI Voice Agent is a **voice-driven conversational assistant** that delivers natural interactions. It can:  
- 🎤 Recognize speech instantly using **Speech-to-Text (STT)**  
- 🧠 Understand queries with **NLP-based processing**  
- 🔊 Respond with **human-like voice** using TTS  
- 💡 Provide **special skills**, including:  
  - Motivational Quotes  
  - Daily Health Tips  
- 🎨 Run directly in the **browser with a clean, interactive UI**  
- 🚀 Be **deployed online** for public access
- 
This repository documents the **full journey of building the AI Voice Agent, day by day**, as part of the challenge.

## 🔍 How it Works
1. **User Speaks** 🎤 – The browser records the voice.
2. **Speech-to-Text** 📝 – Audio is sent to the backend, transcribed using AssemblyAI.
3. **AI Processing** 🤖 – The transcribed text is processed using a Large Language Model (LLM) via the OpenAI API.
4. **Text-to-Speech** 🔊 – AI’s response is converted back into audio.
5. **User Hears Response** 👂 – Played instantly in the browser.

This modular design makes it perfect for **customer support**, **virtual teaching assistants**, or **voice-enabled applications**.

  ✨ Key Features  
- 🎙️ Real-time **speech recognition**  
- 🧠 **NLP-powered response generation**  
- 💡 **Special Skills**  
  - Motivational Quotes  
  - Daily Health Tips  
- 🎨 Clean & **revamped web interface**  
- 🚀 **Deployment-ready** (hosted online for public access)  

---

# 🛠 Tech Stack
| 💡 Component        | 🔧 Technology Used |
|---------------------|--------------------|
| Backend API         | FastAPI (Python) |
| Frontend UI         | HTML, CSS, JavaScript |
| Speech-to-Text      | AssemblyAI API |
| AI Processing       | OpenAI API |
| Text-to-Speech      | gTTS / Murf.ai |
| Server Hosting      | Uvicorn |

🌍 Deployment
The project can be deployed on:
🔹 Render
🔹 Netlify
🔹 Vercel

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

🙌 Acknowledgements

Thanks to Murf and the 30 Days of AI Voice Agents Challenge community for the learning journey and inspiration.

👤 Author
Soumya Safallya Sahoo
