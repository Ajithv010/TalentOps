function JobDetailsForm({
  jobTitle,
  companyName,
  jobDescription,
  onJobTitleChange,
  onCompanyNameChange,
  onJobDescriptionChange,
}) {
  return (
    <div className="space-y-6">

      {/* Job Title + Company */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Job Title */}
        <div>
          <label
            htmlFor="job-title"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Job Title
          </label>

          <input
            id="job-title"
            type="text"
            value={jobTitle}
            onChange={(event) =>
              onJobTitleChange(event.target.value)
            }
            placeholder="e.g. Junior Java Developer"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="company-name"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Company Name
          </label>

          <input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(event) =>
              onCompanyNameChange(event.target.value)
            }
            placeholder="e.g. Infosys"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

      </div>

      {/* Job Description */}
      <div>
        <label
          htmlFor="job-description"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Job Description
        </label>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) =>
            onJobDescriptionChange(event.target.value)
          }
          placeholder="Paste the complete job description here..."
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />

        <p className="mt-2 text-xs text-slate-400">
          Paste the full job description for the most accurate analysis.
        </p>
      </div>

    </div>
  );
}

export default JobDetailsForm;