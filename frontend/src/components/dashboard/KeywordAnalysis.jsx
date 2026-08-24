import { Check, Tags, X } from "lucide-react";

function KeywordAnalysis({
  matchedKeywords = [],
  missingKeywords = [],
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Tags className="h-5 w-5 text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Keyword Analysis
          </h2>

          <p className="text-sm text-slate-500">
            Skills and terms compared against the job description
          </p>
        </div>

      </div>


      {/* Keyword Sections */}
      <div className="mt-7 grid gap-6 md:grid-cols-2">

        {/* Matched Keywords */}
        <div>

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
              <Check className="h-4 w-4 text-green-600" />
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
              Keywords Matched
            </h3>

          </div>


          {matchedKeywords.length > 0 ? (

            <div className="flex flex-wrap gap-2">

              {matchedKeywords.map((keyword, index) => (

                <span
                  key={`${keyword}-${index}`}
                  className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700"
                >
                  {keyword}
                </span>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-400">
              No matching keywords found.
            </p>

          )}

        </div>


        {/* Missing Keywords */}
        <div>

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
              <X className="h-4 w-4 text-red-600" />
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
              Keywords Missing
            </h3>

          </div>


          {missingKeywords.length > 0 ? (

            <div className="flex flex-wrap gap-2">

              {missingKeywords.map((keyword, index) => (

                <span
                  key={`${keyword}-${index}`}
                  className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700"
                >
                  {keyword}
                </span>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-400">
              No major missing keywords detected.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default KeywordAnalysis;