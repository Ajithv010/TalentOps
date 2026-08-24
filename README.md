# TalentOps

AI-powered resume analysis platform that compares a candidate's resume against a specific job description and provides ATS scoring, keyword analysis, resume feedback, and interview insights.

## 🚀 Live Demo

**Frontend:** YOUR_VERCEL_URL

**Backend:** https://talentops-tl0t.onrender.com

---

## ✨ Features

- 📄 Resume PDF upload and text extraction
- 🎯 Job-specific resume analysis
- 📊 ATS score from 0–100
- 🛠️ Score breakdown
- 🔑 Matched and missing keywords
- 📋 Resume quality analysis
- 💡 Actionable resume improvements
- 🤖 AI-powered feedback using Google Gemini
- 🎤 Interview topics and claims to prepare
- 🗄️ PostgreSQL-based analysis caching
- 📱 Responsive React interface

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS

### Backend
- Python
- Flask
- REST API
- Gunicorn

### AI
- Google Gemini API
- Structured JSON responses

### Database
- PostgreSQL
- Psycopg 3
- JSONB

### PDF Processing
- PyMuPDF

### Deployment
- Vercel — Frontend
- Render — Backend
- Render PostgreSQL — Database

---

## 🔄 How It Works

```text
Resume PDF
    +
Job Title
    +
Company
    +
Job Description
        ↓
   Flask REST API
        ↓
   Extract PDF Text
        ↓
 Generate Analysis Key
        ↓
   PostgreSQL Cache
        ↓
 ┌──────┴──────┐
 │             │
Cache Hit    Cache Miss
 │             │
 ↓             ↓
Return       Gemini AI
Result          ↓
             Save Result
             PostgreSQL
```

---

## 📊 Analysis Output

TalentOps generates:

```text
ATS Score
Score Breakdown
Matched Keywords
Missing Keywords
Strengths
Weaknesses
Resume Quality
AI Feedback
Actionable Improvements
Interview Insights
```

---

## 🔑 Key Technical Implementation

TalentOps generates a deterministic SHA-256 analysis key using:

```text
Resume Text
+
Job Title
+
Company Name
+
Job Description
```

This key is used to identify previously analyzed resume/job combinations in PostgreSQL.

The AI response is stored as JSONB and reused when the same analysis is requested.

---

## 📂 Project Structure

```text
TalentOps/
│
├── backend/
│   ├── routes/
│   │   └── analysis_routes.py
│   ├── services/
│   │   ├── ai_service.py
│   │   ├── database_service.py
│   │   └── pdf_service.py
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### Clone

```bash
git clone https://github.com/Ajithv010/TalentOps.git
cd TalentOps
```

### Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_url
```

Run:

```powershell
python app.py
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database

Create the analysis cache table:

```sql
CREATE TABLE analysis_cache (
    id SERIAL PRIMARY KEY,
    analysis_key TEXT UNIQUE NOT NULL,
    analysis_result JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Security

Sensitive credentials are stored using environment variables.

```text
GEMINI_API_KEY
DATABASE_URL
```

`.env` files are excluded from Git using `.gitignore`.

---

## 💼 Resume Description

> Built an AI-powered full-stack resume analysis platform using React, Flask, PostgreSQL, and Google Gemini API. Implemented PDF text extraction, ATS scoring, keyword matching, structured AI feedback, actionable improvements, interview insights, and PostgreSQL-based analysis caching. Deployed the frontend on Vercel and backend on Render.

---

## 👨‍💻 Author

**Ajith V**

Computer Science Engineering Graduate

GitHub:  
https://github.com/Ajithv010/TalentOps

---

⭐ If you find TalentOps useful, consider starring the repository.
