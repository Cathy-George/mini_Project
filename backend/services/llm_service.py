import requests
import json
from typing import Dict, Any

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2"

def call_ollama(prompt: str) -> str:
    """Helper to call Ollama API"""
    try:
        payload = {
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False,
            "format": "json"
        }
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        return response.json().get("response", "")
    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return "{}"

def analyze_career_path(target_role: str, current_skills: str) -> Dict[str, Any]:
    """
    Analyzes the career path based on target role and current skills.
    Returns a unified JSON structure with all required data.
    """
    
    prompt = f"""
    You are an expert career coach. Analyze the user's readiness for a target role based strictly on their current skills.

    **Input:**
    - Target Role: "{target_role}"
    - Current Skills: "{current_skills}"

    **Instructions:**
    1. **Compare** the 'Current Skills' against the standard, modern industry requirements for the 'Target Role'.
    2. **Classify** skills into these categories:
        - **Strong Skills**: ONLY list skills that are EXPLICITLY listed in the 'Current Skills' input AND are relevant to the role.
        - **Missing**: List ALL key skills required for the '{target_role}' that are not in the user's list. **Do not stop at just one.** Include:
            - **Languages** (e.g., JavaScript, TypeScript)
            - **Frameworks** (e.g., React, Angular, Vue)
            - **Tools/State** (e.g., Git, Redux, Testing)
    3. **Determine Seniority**: Assess the user's *current* competency level (Junior/Mid/Senior) based on provided skills.
    4. **Generate Plan**: Create a realistic 30-60-90 day plan to learn the **Missing** skills.

    **Output JSON Structure:**
    {{
        "job_match_analysis": {{
            "match_percentage": <integer 0-100>,
            "seniority_level": "<Junior/Mid/Senior> (Calculated based on current skills)",
            "readiness_score": <integer 0-10>,
            "reasoning": "<Briefly explain the gap.>"
        }},
        "skill_gap_report": {{
            "strong": ["<Exact matches from user input>"],
            "missing": ["<Comprehensive list of missing standard requirements>"]
        }},
        "study_plan": {{
            "day_30": ["<Focus on critical missing basics>"],
            "day_60": ["<Intermediate concepts & Frameworks>"],
            "day_90": ["<Advanced topics, Tools & Projects>"]
        }},
        "project_suggestions": [
            {{
                "title": "<title>",
                "description": "<description>",
                "tech_stack": ["<tech1>", "<tech2>"]
            }}
        ],
        "learning_resources": [
            {{
                "name": "<Resource Name>",
                "url": "<URL or brief description>",
                "type": "<Course/Article/Repo>"
            }}
        ],
        "github_repositories": [
             {{
                "name": "<Repo Name>",
                "description": "<What it contains>",
                "search_term": "<Search query to find it>" 
             }}
        ],
        "alternative_roles": [
            {{
                "role": "<Role Name>",
                "match_potential": "<High/Medium>"
            }}
        ]
    }}
    
    RETURN ONLY JSON. DO NOT INCLUDE ANY MARKDOWN formatting like ```json.
    """
    
    response_text = call_ollama(prompt)
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        # Fallback if model fails to return valid json, though 'format': 'json' helps
        print("Failed to parse JSON from LLM")
        return {"error": "Failed to generate analysis", "raw_response": response_text}
