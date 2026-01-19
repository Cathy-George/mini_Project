from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from services.llm_service import analyze_career_path

app = FastAPI(title="Career Skill Gap Analyzer")

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class AnalysisRequest(BaseModel):
    target_role: str
    current_skills: str

class AnalysisResponse(BaseModel):
    job_match_analysis: Dict[str, Any]
    skill_gap_report: Dict[str, Any]
    study_plan: Dict[str, List[str]]
    project_suggestions: List[Dict[str, Any]]
    learning_resources: List[Dict[str, Any]]
    github_repositories: List[Dict[str, Any]]
    alternative_roles: List[Dict[str, Any]]

@app.get("/")
def read_root():
    return {"message": "Career Skill Gap Analyzer API is running"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_skills(request: AnalysisRequest):
    result = analyze_career_path(request.target_role, request.current_skills)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
        
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
