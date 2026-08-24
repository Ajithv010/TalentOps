const API_BASE_URL =
  "https://talentops-tl0t.onrender.com/api";


// =========================================================
// Analyze Resume
// =========================================================

export async function analyzeResume({
  resumeFile,
  jobTitle,
  companyName,
  jobDescription,
}) {

  const formData = new FormData();

  formData.append(
    "resume",
    resumeFile
  );

  formData.append(
    "job_title",
    jobTitle
  );

  formData.append(
    "company_name",
    companyName
  );

  formData.append(
    "job_description",
    jobDescription
  );


  const response = await fetch(
    `${API_BASE_URL}/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );


  let data;

  try {

    data = await response.json();

  } catch {

    throw new Error(
      "The server returned an invalid response."
    );
  }


  if (!response.ok) {

    throw new Error(
      data.error ||
      "Failed to analyze the resume."
    );
  }


  return data;
}