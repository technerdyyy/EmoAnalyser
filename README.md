# EmoAnalyser
A full-stack app where users can write reflections and get real-time emotion analysis using a Python backend and a React frontend.

## Project-Structure
emotion-analyser/
<br>├── frontend/                
<br>├── backend/                 
<br>└── README.md

## Getting Started
Follow these steps to run the app locally on your system.

### ⚙️ Prerequisites
Node.js (v16 or newer) 
Python (v3.8 or newer)
Git (optional, for cloning)

### 🧠 Backend Setup (Python FastAPI)
1. Navigate to the backend folder <br>
   cd backend
   
2. Create a virtual environment <br>
   python -m venv venv
   
3. Activate the environement <br>
   venv\Scripts\activate [Windows] <br>
   source venv/bin/activate [Linux/macOS]
   
4. Install dependencies <br>
   pip install -r requirements.txt
<br> If requirements.txt doesn't exist yet, install manually:
   pip install fastapi uvicorn
<br> Then save:
   pip freeze > requirements.txt
   
5. Run the FastAPI server <br>
   uvicorn main:app --reload --port 8000
   
 You should see the backend running at: <br>
 http://127.0.0.1:8000

### 💻 Frontend Setup (React + Vite)
1. Open a new terminal and navigate to the frontend folder <br>
   cd frontend
   
2. Install dependencies <br>
   npm install
3. Start the development server<br>
   npm run dev
   
Your app should be running at: <br>
http://localhost:5173

### 🔄 API Connection
The frontend sends reflection text to: <br>
POST http://localhost:8000/analyze

The backend responds with: <br>
{
  "emotion": "Happy",
  "confidence": 0.92
}

<b> Make sure both servers (frontend and backend) are running simultaneously.</b>
