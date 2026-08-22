import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types


# Load variables from backend/.env
load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is not configured."
    )


# Create Gemini client
client = genai.Client(
    api_key=GEMINI_API_KEY
)
def analyze_resume(
    resume_text,
    job_title,
    company_name,
    job_description
):
    """
    Analyze a candidate resume against a target job
    using Google Gemini structured output.
    """

    prompt = f"""
You are an expert Technical Recruiter, ATS algorithm,
and resume evaluator.

Your task is to compare a candidate's resume against
a specific job description.

TARGET ROLE:
{job_title}

COMPANY:
{company_name}

JOB DESCRIPTION:
{job_description}

CANDIDATE RESUME:
{resume_text}

Evaluate the candidate objectively.

IMPORTANT RULES:

1. Do not invent skills, experience, certifications,
   technologies, or achievements that are not present
   in the resume.

2. A keyword should be considered matched only when
   the resume demonstrates that keyword or a clearly
   equivalent skill.

3. Missing keywords should represent meaningful
   requirements from the job description that are
   absent or insufficiently demonstrated in the resume.

4. Do not recommend adding a skill to the resume if
   there is no evidence the candidate actually has
   that skill.

5. Actionable improvements must be specific to this
   particular job description.

6. Evaluate measurable achievements and quantify
   impact where the resume already provides evidence.

7. ATS score must be an integer between 0 and 100.

8. Be strict and realistic. Do not give a high score
   simply because the resume contains some matching
   keywords.

9. Return only structured JSON matching the provided schema.
    """

    response_schema = {
        "type": "OBJECT",
        "properties": {
            "ats_score": {
                "type": "INTEGER"
            },

            "score_breakdown": {
                "type": "OBJECT",
                "properties": {
                    "keyword_match": {
                        "type": "INTEGER"
                    },
                    "technical_skills": {
                        "type": "INTEGER"
                    },
                    "experience_fit": {
                        "type": "INTEGER"
                    },
                    "education_match": {
                        "type": "INTEGER"
                    },
                    "project_relevance": {
                        "type": "INTEGER"
                    }
                },
                "required": [
                    "keyword_match",
                    "technical_skills",
                    "experience_fit",
                    "education_match",
                    "project_relevance"
                ]
            },

            "summary_feedback": {
                "type": "STRING"
            },

            "matched_keywords": {
                "type": "ARRAY",
                "items": {
                    "type": "STRING"
                }
            },

            "missing_keywords": {
                "type": "ARRAY",
                "items": {
                    "type": "STRING"
                }
            },

            "strengths": {
                "type": "ARRAY",
                "items": {
                    "type": "STRING"
                }
            },

            "weaknesses": {
                "type": "ARRAY",
                "items": {
                    "type": "STRING"
                }
            },

            "resume_quality": {
                "type": "OBJECT",
                "properties": {
                    "ats_readability": {
                        "type": "INTEGER"
                    },
                    "content_clarity": {
                        "type": "INTEGER"
                    },
                    "achievement_impact": {
                        "type": "INTEGER"
                    },
                    "keyword_optimization": {
                        "type": "INTEGER"
                    }
                },
                "required": [
                    "ats_readability",
                    "content_clarity",
                    "achievement_impact",
                    "keyword_optimization"
                ]
            },

            "ai_feedback": {
                "type": "OBJECT",
                "properties": {
                    "overall": {
                        "type": "STRING"
                    },
                    "priority_improvements": {
                        "type": "ARRAY",
                        "items": {
                            "type": "STRING"
                        }
                    }
                },
                "required": [
                    "overall",
                    "priority_improvements"
                ]
            },

            "actionable_improvements": {
                "type": "ARRAY",
                "items": {
                    "type": "STRING"
                }
            },

            "interview_insights": {
                "type": "OBJECT",
                "properties": {
                    "likely_topics": {
                        "type": "ARRAY",
                        "items": {
                            "type": "STRING"
                        }
                    },
                    "claims_to_prepare": {
                        "type": "ARRAY",
                        "items": {
                            "type": "STRING"
                        }
                    }
                },
                "required": [
                    "likely_topics",
                    "claims_to_prepare"
                ]
            }
        },

        "required": [
            "ats_score",
            "score_breakdown",
            "summary_feedback",
            "matched_keywords",
            "missing_keywords",
            "strengths",
            "weaknesses",
            "resume_quality",
            "ai_feedback",
            "actionable_improvements",
            "interview_insights"
        ]
    }

    response = client.models.generate_content(
       model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.2,
            response_mime_type="application/json",
            response_schema=response_schema
        )
    )

    if not response.text:
        raise RuntimeError(
            "Gemini returned an empty response."
        )

    try:
        result = json.loads(response.text)

    except json.JSONDecodeError as error:
        raise RuntimeError(
            "Gemini returned invalid JSON."
        ) from error

    return result