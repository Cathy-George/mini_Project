# Career Skill Gap Analyzer - Project Documentation

## 1. Overview
The **Career Skill Gap Analyzer** is a full-stack web application designed to help users understand their readiness for specific job roles. It analyzes a user's current skill set against a target role, identifying missing skills and generating a personalized study plan, project suggestions, and resources.

## 2. Architecture

### Backend
The backend is built with **FastAPI** (Python), designed for high performance and easy API creation.

*   **Entry Point:** `backend/main.py`
*   **Server:** Uvicorn (ASGI server)
*   **AI Integration:** The core logic resides in `backend/services/llm_service.py`. It communicates with **Ollama**, a local LLM runner.
*   **Data Validation:** Uses **Pydantic** models (`AnalysisRequest`, `AnalysisResponse`) to validate incoming requests and outgoing structured responses.

### Frontend
The frontend is a modern Single Page Application (SPA) built with **React** and **Vite**.

*   **Styling:** **Tailwind CSS** for responsive and utility-first styling.
*   **Icons:** **Lucide React** for consistent iconography.
*   **Charts:** **Recharts** for visualizing skill gaps (used in `SkillGapChart`).
*   **Routing:** **React Router** for navigation.

## 3. Models and AI

### AI Model
The application relies on **Llama 3.2** running locally via Ollama.

*   **Model Name:** `llama3.2` (configured in `backend/services/llm_service.py`)
*   **Role:** The AI acts as an "expert career coach".

### Prompting Strategy
The system uses a highly structured prompt to ensure consistent JSON output from the LLM. The prompt mandates:
1.  **Comparison:** Compares user skills to industry standards.
2.  **Classification:** Separates skills into "Strong" (explicit matches) and "Missing".
3.  **Seniority Assessment:** Estimates Junior/Mid/Senior level.
4.  **Actionable Output:** Generates a 30-60-90 day study plan, project ideas, and resources.

### Data Flow
1.  **Input:** User provides `target_role` (e.g., "Full Stack Developer") and `current_skills` (e.g., "HTML, CSS").
2.  **Processing:**
    *   Backend sends a prompt to Ollama (`http://localhost:11434/api/generate`).
    *   Llama 3.2 generates a raw JSON string.
    *   Backend parses this string into a Python dictionary.
3.  **Output:** A unified JSON response containing:
    *   `job_match_analysis`: Match score, seniority, reasoning.
    *   `skill_gap_report`: Strong and missing skills.
    *   `study_plan`: Day 30/60/90 breakdown.
    *   `project_suggestions`: Practical projects to build.
    *   `learning_resources` & `github_repositories`: Curated links.

## 4. Key Files

### Backend
*   `backend/main.py`: Defines the `/analyze` POST endpoint and CORS settings.
*   `backend/services/llm_service.py`: Handles the interaction with Ollama and prompt engineering. Returns structured JSON.

### Frontend
*   `frontend/src/components/Dashboard.jsx`: The main view for displaying results. It renders the analysis, charts, study plans, and recommendations.
*   `frontend/package.json`: Lists dependencies including `lucide-react`, `recharts`, and `tailwindcss`.
