# TalentOps

> AI-powered resume analysis and job matching platform that evaluates resumes against specific job descriptions and provides ATS scoring, keyword analysis, resume quality feedback, actionable improvements, and interview preparation insights.

---

## 🚀 Live Application

**Frontend:**  
https://talentops.vercel.app/

**Backend API:**  
https://talentops-tl0t.onrender.com/

> The frontend is deployed using Vercel and the backend is deployed using Render.

---

## 📌 Overview

TalentOps is a full-stack AI-powered resume analysis platform designed to help candidates understand how well their resume matches a specific job opportunity.

Instead of evaluating a resume in isolation, TalentOps compares:

- Candidate Resume
- Job Title
- Company
- Job Description

and generates a structured analysis using Google's Gemini API.

The platform provides an ATS-style evaluation along with practical recommendations that candidates can use to improve their resumes and prepare for interviews.

---

## 🎯 Problem Statement

Many candidates apply for jobs without knowing how closely their resume matches the requirements of the position.

Traditional resume review tools often provide generic suggestions without considering the specific job description.

TalentOps solves this problem by performing **job-specific resume analysis**.

For example:

```text
Resume
   +
Job Description
   +
Target Role
   +
Company
        ↓
   TalentOps
        ↓
AI-Powered Analysis
        ↓
ATS Score
Keyword Match
Skill Match
Resume Quality
Improvements
Interview Insights
```

---

# ✨ Key Features

## 1. Resume Upload

Users can upload their resume in PDF format.

TalentOps:

- Validates the uploaded file
- Accepts PDF resumes
- Extracts resume text
- Processes the extracted content for analysis

---

## 2. Job-Specific Analysis

Users provide:

- Job title
- Company name
- Job description
- Resume

TalentOps compares the resume against the specific job requirements rather than providing generic resume feedback.

---

## 3. ATS Score

TalentOps generates an ATS-style score between:

```text
0 – 100
```

The score represents how well the resume aligns with the target position.

---

## 4. Score Breakdown

The overall score is broken down into multiple categories:

- Keyword Match
- Technical Skills
- Experience Fit
- Education Match
- Project Relevance

This helps candidates understand **why** their resume received a particular score.

---

## 5. Keyword Analysis

TalentOps identifies:

### Matched Keywords

Skills and requirements that are already represented in the resume.

### Missing Keywords

Important job-related requirements that are missing or insufficiently demonstrated.

The system is instructed not to recommend skills that the candidate cannot actually support.

---

## 6. Resume Quality Analysis

TalentOps evaluates resume quality across:

- ATS Readability
- Content Clarity
- Achievement Impact
- Keyword Optimization

This provides feedback beyond simple keyword matching.

---

## 7. Strengths & Weaknesses

The system identifies:

### Strengths

Areas where the resume performs well for the target role.

### Weaknesses

Areas that reduce the resume's effectiveness for the specific job.

---

## 8. Actionable Improvements

TalentOps provides practical recommendations based specifically on the supplied job description.

Examples include:

- Improving technical skill visibility
- Strengthening project descriptions
- Adding measurable achievements where evidence exists
- Improving keyword alignment
- Clarifying relevant experience

TalentOps does **not** recommend falsely adding technologies or experience.

---

## 9. AI Feedback

The platform generates:

- Overall resume feedback
- Priority improvements
- Job-specific recommendations

The goal is to provide useful feedback rather than generic AI-generated advice.

---

## 10. Interview Insights

TalentOps also prepares candidates for interviews by identifying:

### Likely Interview Topics

Technical areas that may be relevant to the target position.

### Claims to Prepare

Resume claims that the candidate should be prepared to explain during an interview.

This connects resume optimization with interview preparation.

---

# 🧠 AI Analysis

TalentOps uses Google's Gemini API to analyze the resume.

The AI receives:

```text
Target Role
Company
Job Description
Candidate Resume
```

and produces structured JSON containing:

```text
ATS Score
Score Breakdown
Summary Feedback
Matched Keywords
Missing Keywords
Strengths
Weaknesses
Resume Quality
AI Feedback
Actionable Improvements
Interview Insights
```

The backend uses structured output to ensure that the AI response follows the expected format.

---

# 🔐 Analysis Rules

TalentOps follows several rules during analysis:

1. Do not invent skills.
2. Do not invent experience.
3. Do not invent certifications.
4. Do not invent achievements.
5. Match keywords only when the resume provides evidence.
6. Identify meaningful missing requirements.
7. Provide job-specific improvements.
8. Evaluate measurable achievements where evidence exists.
9. Generate an ATS score between 0 and 100.
10. Maintain a strict and realistic evaluation.

This helps prevent misleading resume recommendations.

---
# ⚙️ Local Development Setup

## Prerequisites

Install the following:

- Python 3.11+
- Node.js
- npm
- PostgreSQL
- Git

---

# 1. Clone Repository

```bash
git clone https://github.com/Ajithv010/TalentOps.git
```

```bash
cd TalentOps
```

---

# 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

---

## Install Python Dependencies

```powershell
pip install -r requirements.txt
```

---

# 3. Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_database_url
```

### Important

Never commit `.env` to GitHub.

The `.gitignore` should contain:

```gitignore
.env
venv/
__pycache__/
*.pyc
```

---

# 4. PostgreSQL Setup

Create a PostgreSQL database.

Then create the analysis cache table:

```sql
CREATE TABLE analysis_cache (
    id SERIAL PRIMARY KEY,
    analysis_key TEXT UNIQUE NOT NULL,
    analysis_result JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 5. Run Backend

From:

```text
backend/
```

run:

```powershell
python app.py
```

The backend will run locally on:

```text
http://127.0.0.1:5000
```

Health endpoint:

```text
http://127.0.0.1:5000/api/health
```

---

# 6. Frontend Setup

Open another terminal.

Navigate to:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Run development server:

```powershell
npm run dev
```

Vite will provide a local development URL.

---

# 🏭 Production Build

To build the frontend:

```powershell
npm run build
```

The production files are generated inside:

```text
frontend/dist/
```

---

# 🚀 Deployment

TalentOps uses:

```text
GitHub
   ↓
Vercel
   ↓
React Frontend


GitHub
   ↓
Render
   ↓
Flask Backend
   ↓
Render PostgreSQL
```

---

# Frontend Deployment — Vercel

1. Open Vercel.
2. Import the GitHub repository.
3. Select the frontend directory if required.
4. Configure the build settings.
5. Deploy.

Typical build command:

```bash
npm run build
```

Output directory:

```text
dist
```

---

# Backend Deployment — Render

Create a Web Service on Render.

Connect the GitHub repository.

Set the backend root directory to:

```text
backend
```

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
gunicorn app:app
```

---

# Render Environment Variables

Configure:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_render_postgresql_database_url
```

Environment variables must be configured inside Render.

Do not commit production secrets to GitHub.

---

# PostgreSQL Deployment

Create a PostgreSQL database through Render.

Use the appropriate Render database connection URL as:

```env
DATABASE_URL=...
```

The Flask backend uses this variable to connect to PostgreSQL.

---

# 🔒 Security Considerations

TalentOps uses environment variables for sensitive configuration.

Sensitive values include:

- Gemini API key
- PostgreSQL credentials
- Database connection strings

These values should never be hardcoded into source code.

---

# 📦 Dependencies

## Backend

Major backend dependencies include:

```text
Flask
Flask-CORS
Google GenAI
PyMuPDF
Psycopg
python-dotenv
Gunicorn
```

## Frontend

Major frontend dependencies include:

```text
React
Vite
Tailwind CSS
```

---

# 🧪 Testing

Before deployment, verify:

### Backend

```text
GET /
```

Expected:

```json
{
  "message": "TalentOps API is running",
  "status": "success"
}
```

### Health Check

```text
GET /api/health
```

Expected:

```json
{
  "status": "healthy",
  "service": "TalentOps Backend"
}
```

### Resume Analysis

Verify:

- PDF upload
- Job title validation
- Company validation
- Job description validation
- PDF extraction
- Gemini analysis
- PostgreSQL caching
- Structured response
- Dashboard rendering

---

# 🧹 Error Handling

TalentOps handles several common errors.

### Missing Resume

```json
{
  "success": false,
  "error": "Resume PDF is required."
}
```

### Invalid File

```json
{
  "success": false,
  "error": "Only PDF files are supported."
}
```

### Missing Job Title

```json
{
  "success": false,
  "error": "Job title is required."
}
```

### Missing Company

```json
{
  "success": false,
  "error": "Company name is required."
}
```

### Missing Job Description

```json
{
  "success": false,
  "error": "Job description is required."
}
```

### Large File

The backend limits uploaded request size to:

```text
10 MB
```

---

# 📈 Future Improvements

Potential future improvements include:

- User authentication
- Resume history
- User dashboards
- Multiple resume versions
- Job application tracking
- Resume editing suggestions
- PDF resume generation
- Interview question generation
- Job recommendation system
- Candidate profile management
- Analytics dashboard
- Role-based access control
- Email notifications
- Cloud file storage
- More advanced ATS scoring algorithms

---

# 🎓 Learning Outcomes

This project demonstrates practical experience with:

- Full-stack web development
- React application architecture
- Flask REST APIs
- PostgreSQL database integration
- JSONB data storage
- PDF text extraction
- Generative AI integration
- Prompt engineering
- Structured AI responses
- API integration
- Error handling
- Environment configuration
- Git and GitHub
- Vercel deployment
- Render deployment
- Production debugging

---

# 💼 Resume Project Description

A concise version for a resume:

> **TalentOps — AI Resume Analysis Platform**  
> Built a full-stack AI-powered resume analysis platform using React, Flask, PostgreSQL, and Google Gemini API. Implemented PDF text extraction, deterministic analysis caching, ATS scoring, keyword matching, resume quality evaluation, actionable recommendations, and interview insights. Deployed the React frontend on Vercel and Flask backend with PostgreSQL on Render.

---

# 👨‍💻 Author

**Ajith V**

Computer Science Engineering Graduate

GitHub:

https://github.com/Ajithv010

---

# 📄 License

This project is intended for educational, portfolio, and demonstration purposes.

Add an appropriate open-source license if you plan to distribute the project publicly.

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
