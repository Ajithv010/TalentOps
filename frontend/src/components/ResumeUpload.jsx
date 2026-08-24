import { FileText, Upload } from "lucide-react";

function ResumeUpload({ file, onFileChange }) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    onFileChange(selectedFile);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-800">
        Resume
      </label>

      <label
        htmlFor="resume-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-slate-500 hover:bg-slate-100"
      >
        {file ? (
          <>
            <FileText className="h-10 w-10 text-slate-700" />

            <p className="mt-4 font-semibold text-slate-900">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              PDF selected successfully
            </p>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-slate-500" />

            <p className="mt-4 font-semibold text-slate-900">
              Upload your resume
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Drag and drop or click to browse
            </p>

            <p className="mt-3 text-xs text-slate-400">
              PDF files only · Maximum 10 MB
            </p>
          </>
        )}

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

export default ResumeUpload;