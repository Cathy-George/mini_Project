# Career Skill Gap Analyzer

An AI-powered web application that helps users analyze their career skill gaps. It compares your current skills against a target role, identifies missing critical skills, and provides a personalized 30-60-90 day study plan along with project suggestions and learning resources.

## 🚀 Features

-   **Role Match Analysis**: Calculates how well your current skills match your target role.
-   **Skill Gap Report**: Identifies "Strong" (existing) and "Missing" (required) skills.
-   **Visual Dashboard**: Interactive charts to visualize your readiness.
-   **AI Study Plan**: Generates a 30-60-90 day roadmap to bridge the gap.
-   **Project Suggestions**: tailored project ideas to build your portfolio.
-   **Resource Finder**: Suggests GitHub repos and learning materials.
-   **Alternative Roles**: Suggests other career paths based on your current skill set.

## 🛠️ Tech Stack

-   **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Lucide React.
-   **Backend**: Python FastAPI, Uvicorn.
-   **AI/LLM**: Ollama (Llama 3.2 Model).

## 📋 Prerequisites

1.  **Node.js** (v18+)
2.  **Python** (v3.10+)
3.  **Ollama**: Installed and running locally.
    *   Pull the model: `ollama pull llama3.2`
    *   Start service: `ollama serve`

## ⚡ Installation & Setup

### 1. Backend Setup

Navigate to the project root and create a virtual environment:

```bash
cd backend
python -m venv venv
# Windows
..\venv\Scripts\activate
# Linux/Mac
source ../venv/bin/activate
```

Install dependencies:

```bash
pip install fastapi uvicorn pydantic requests python-multipart
```

Start the Backend Server:

```bash
uvicorn main:app --reload --port 8000
```
*The API will run at `http://localhost:8000`*

### 2. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

Start the Frontend Development Server:

```bash
npm run dev
```
*The App will run at `http://localhost:5173`*

## 📖 Usage Guide

1.  Open your browser to `http://localhost:5173`.
2.  **Target Role**: Enter the job title you are aiming for (e.g., "Frontend Developer").
3.  **Current Skills**: Enter your list of technical skills (e.g., "HTML, CSS, JavaScript").
4.  Click **"Generate Analysis"**.
5.  Review your Dashboard:
    *   Check your **Match Score**.
    *   See which skills are **Missing**.
    *   Follow the **Study Plan**.
    *   Explore **Recommended Projects**.

## 📂 Project Structure

```
Mini_Project/
├── backend/
│   ├── main.py              # FastAPI Entry Point
│   ├── requirements.txt     # Python Dependencies
│   └── services/
│       └── llm_service.py   # Ollama AI Integration Logic
├── frontend/
│   ├── src/
│   │   ├── components/      # React Components (Dashboard, Charts, Form)
│   │   ├── App.jsx          # Main App Component
│   │   └── main.jsx         # Entry Point
│   ├── package.json         # Node Dependencies
│   └── tailwind.config.js   # Styling Config
└── README.md                # Project Documentation
```
