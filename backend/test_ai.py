from services.ai_service import analyze_resume


sample_resume = """
Software Developer

Skills:
Java, Spring Boot, React, MySQL, Git

Projects:
Built a Hospital Management System using Spring Boot,
MySQL, REST APIs and JWT authentication.

Education:
Bachelor of Engineering in Computer Science.
"""


sample_job_description = """
We are looking for a Junior Java Developer.

Requirements:
- Java
- Spring Boot
- REST APIs
- SQL
- Git
- Docker
- AWS
- Microservices
"""


result = analyze_resume(
    resume_text=sample_resume,
    job_title="Junior Java Developer",
    company_name="Example Company",
    job_description=sample_job_description
)


print("=" * 60)
print("GEMINI ATS ANALYSIS")
print("=" * 60)

print(result)