function normalizeText(value = "") {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}


export async function createAnalysisKey({
  resumeFile,
  jobTitle,
  companyName,
  jobDescription,
}) {

  const fileBuffer =
    await resumeFile.arrayBuffer();


  const normalizedJobTitle =
    normalizeText(jobTitle);

  const normalizedCompanyName =
    normalizeText(companyName);

  const normalizedJobDescription =
    normalizeText(jobDescription);


  const encoder =
    new TextEncoder();


  const jobData = encoder.encode(
    [
      normalizedJobTitle,
      normalizedCompanyName,
      normalizedJobDescription,
    ].join("|")
  );


  const combinedData =
    new Uint8Array(
      fileBuffer.byteLength +
      jobData.byteLength
    );


  combinedData.set(
    new Uint8Array(fileBuffer),
    0
  );

  combinedData.set(
    jobData,
    fileBuffer.byteLength
  );


  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      combinedData
    );


  const hashArray =
    Array.from(
      new Uint8Array(hashBuffer)
    );


  return hashArray
    .map((byte) =>
      byte
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
}