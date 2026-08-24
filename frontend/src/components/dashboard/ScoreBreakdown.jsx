import { BarChart3 } from "lucide-react";

function ScoreBreakdown({ breakdown }) {

  const scores = [
    {
      label: "Keyword Match",
      value: breakdown?.keyword_match ?? 0,
    },
    {
      label: "Technical Skills",
      value: breakdown?.technical_skills ?? 0,
    },
    {
      label: "Experience Fit",
      value: breakdown?.experience_fit ?? 0,
    },
    {
      label: "Education Match",
      value: breakdown?.education_match ?? 0,
    },
    {
      label: "Project Relevance",
      value: breakdown?.project_relevance ?? 0,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <BarChart3 className="h-5 w-5 text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Score Breakdown
          </h2>

          <p className="text-sm text-slate-500">
            How your resume performed across key areas
          </p>
        </div>

      </div>


      <div className="mt-6 space-y-5">

        {scores.map((item) => (

          <div key={item.label}>

            <div className="mb-2 flex items-center justify-between">

              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {item.value}
              </span>

            </div>


            <div className="h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-700"
                style={{
                  width: `${item.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ScoreBreakdown;