# Viva Preparation Guide: Career Skill Gap Analyzer

**Project Title:** Career Skill Gap Analyzer using GenAI  
**Tech Stack:** React (Frontend), FastAPI (Backend), Llama 3.2 (AI Model), Ollama (AI Runner)

---

## 1. Top-Level Summary (The 30-Second Pitch)
"This project is a **Career Skill Gap Analyzer** that helps students and professionals bridge the gap between their current skills and their dream job. Unlike static keyword matchers, it uses a **Generative AI (Llama 3.2)** to semantically understand skills (e.g., knowing 'React' implies knowing 'Frontend'). It takes a target role and current skills as input, analyzes them against industry standards, and provides a personalized **30-60-90 day study plan**, **project suggestions**, and **missing skill identification**."

---

## 2. Technical Architecture (The "How it Works")

### **Frontend (The User Interface)**
*   **Framework:** **React (Vite)** – Chosen for speed and component reusability.
*   **Styling:** **Tailwind CSS** – Used for rapid, responsive UI development without writing custom CSS files.
*   **Data Visualization:** **Recharts** – Used to create the visual "Skill Gap Analysis" charts.
*   **State Management:** React `useState` & `useEffect` hooks manage the API data flow.

### **Backend (The Logic Layer)**
*   **Framework:** **FastAPI** –  Chosen because it's asynchronous (fast) and native to Python (the language of AI).
*   **Data Validation:** **Pydantic** – Ensures the data sent to and from the API is valid.
*   **API Structure:**
    *   `POST /analyze`: Receives `{target_role, current_skills}`.
    *   Calls the internal `llm_service`.
    *   Returns a JSON object with the full analysis.

### **The AI Engine (The Brain)**
*   **Model:** **Llama 3.2** – A lightweight but powerful open-source Large Language Model (LLM) by Meta.
*   **Runner:** **Ollama** – A tool that allows us to run LLMs locally on our machine without paying for OpenAI API credits and ensuring data privacy.
*   **Mechanism:** "Prompt Engineering". We don't just ask the AI to "chat". We send a **structured system prompt** that forces the AI to reply in **pure JSON format**.

---

## 3. Key Concepts & Viva Questions

### **Q1: Why did you use Llama 3.2 instead of GPT-4?**
*   **Answer:** "Cost and Privacy. Llama 3.2 runs locally via Ollama, meaning it's free to use and no user data leaves the machine. It's also optimized for speed on consumer hardware compared to larger models."

### **Q2: How does the system ensure the AI returns semantically correct data?**
*   **Answer:** "We use **Structured Prompting**. In `llm_service.py`, we explicitly tell the model: *'Return ONLY JSON based on this schema'*. We also use Pydantic models in the backend to validate that the response matches our expected format before sending it to the frontend."

### **Q3: What happens if I type 'React' but the job requires 'Frontend Development'?**
*   **Answer:** "That's the power of using an LLM over a simple keyword matcher. The LLM understands **semantics**. It knows that 'React' is a subset of 'Frontend Development' and will likely mark that as a match, whereas a simple `if 'React' == 'Frontend'` code would fail."

### **Q4: How would you scale this application?**
*   **Answer:**
    1.  **Backend:** Containerize the FastAPI app using **Docker**.
    2.  **AI:** Move the Ollama instance to a GPU-enabled cloud server (like AWS EC2 or RunPod) because local inference is hard to scale for many users.
    3.  **Database:** Add a database (PostgreSQL) to save user profiles and track progress over time.

### **Q5: What was the hardest part of the project?**
*   **Answer:** (Choose one)
    *   *"Getting the LLM to consistently return valid JSON without extra text."*
    *   *"Connecting the local backend to the frontend and handling CORS issues."*
    *   *"Designing a prompt that accurately identifies 'missing' skills without being too hallucinating."*

---

## 4. Code Flow Walkthrough (Mental Map)

1.  **User** enters "DevOps Engineer" and "Python, Linux" on the frontend.
2.  **Frontend** sends a POST request to `http://localhost:8000/analyze`.
3.  **FastAPI** receives the request and passes it to `analyze_career_path()` function.
4.  **Python Logic** constructs a huge text prompt: *"You are a career coach. Analyze 'Python, Linux' for 'DevOps Engineer'..."*
5.  **Ollama** processes this prompt and generates a JSON string.
6.  **Python Logic** parses the JSON -> Dictionary.
7.  **Backend** sends this immutable data back to the Frontend.
8.  **Frontend** renders the `Dashboard` component, mapping `study_plan` to a list and `skill_gap` to a chart.

---

## 5. Unique Selling Points (USP)
*   **Personalization:** Unlike static roadmaps (e.g., roadmap.sh), this adapts to *your* specific current skills.
*   **Privacy:** Everything runs locally.
*   **Actionable:** Doesn't just say "User bad", it gives a day-by-day plan to get better.
