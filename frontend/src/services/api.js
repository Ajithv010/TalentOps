const API_BASE_URL = "http://127.0.0.1:5000";


export async function analyzeResume({
  resumeFile,
  jobTitle,
  companyName,
  jobDescription,
}) {

  const formData = new FormData();

  formData.append("resume", resumeFile);
  formData.append("job_title", jobTitle);
  formData.append("company_name", companyName);
  formData.append("job_description", jobDescription);


  const response = await fetch(
    `${API_BASE_URL}/api/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );


  const result = await response.json();


  if (!response.ok) {
    throw new Error(
      result.error || "Failed to analyze resume."
    );
  }


  return result;
}