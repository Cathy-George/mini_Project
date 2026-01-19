# Career Skill Gap Analyzer Documentation

## Overview
The **Career Skill Gap Analyzer** is an intelligent career coaching tool. It leverages local Large Language Models (LLMs) via Ollama to provide instant, personalized career advice.

## Key Capabilities
- **Analysis**: Real-time comparison of user skills vs. market demands.
- **Visualization**: Clean, easy-to-read charts showing match percentage and readiness.
- **Actionable Plans**: Detailed day-by-day study schedules.
- **Resource Curation**: Automatic suggestion of relevant GitHub repositories and learning materials.

## System Architecture

### Frontend (User Interface)
- **Framework**: React 18 built with Vite for speed.
- **Styling**: Tailwind CSS for a modern, dark-themed responsive design.
- **Components**:
    - `InputForm`: captures user goals.
    - `Dashboard`: displays the analysis results.
    - `SkillGapChart`: visualizes the data using SVGs.

### Backend (API Layer)
- **Framework**: FastAPI (Python) for high-performance handling of requests.
- **AI Engine**: Connects to a local Ollama instance running `llama3.2`.
- **Endpoints**:
    - `POST /analyze`: Receives `{target_role, current_skills}` and returns a JSON comprehensive report.

## Setup Instructions

### Prerequisites
- **Ollama**: Must be running locally (`ollama serve`).
- **Data Model**: Ensure you have pulled the model: `ollama pull llama3.2`.

### Running the Application
1. **Start Backend**:
   `uvicorn main:app --reload` (runs on port 8000)
   
2. **Start Frontend**:
   `npm run dev` (runs on port 5173)

3. **Access**:
   Go to `http://localhost:5173` in your browser.

## Troubleshooting
- **Frontend Error "Network Error"**: Ensure the backend python server is running.
- **AI Analysis Failed**: Ensure Ollama is running and the `llama3.2` model is installed.
