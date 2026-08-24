import { FileCheck2 } from "lucide-react";

function ResumeQuality({ quality }) {

  const metrics = [
    {
      label: "ATS Readability",
      value: quality?.ats_readability ?? 0,
    },
    {
      label: "Content Clarity",
      value: quality?.content_clarity ?? 0,
    },
    {
      label: "Achievement Impact",
      value: quality?.achievement_impact ?? 0,
    },
    {
      label: "Keyword Optimization",
      value: quality?.keyword_optimization ?? 0,
    },
  ];


  const getScoreColor = (value) => {

    if (value < 50) {
      return "bg-red-500";
    }

    if (value <= 75) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };


  const getTextColor = (value) => {

    if (value < 50) {
      return "text-red-600";
    }

    if (value <= 75) {
      return "text-yellow-600";
    }

    return "text-green-600";
  };


  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <FileCheck2 className="h-5 w-5 text-slate-700" />
        </div>

        <div>

          <h2 className="text-lg font-semibold text-slate-900">
            Resume Quality
          </h2>

          <p className="text-sm text-slate-500">
            Quality assessment of your current resume
          </p>

        </div>

      </div>


      {/* Metrics */}

      <div className="mt-7 space-y-6">

        {metrics.map((metric) => (

          <div key={metric.label}>

            <div className="mb-2 flex items-center justify-between">

              <span className="text-sm font-medium text-slate-700">
                {metric.label}
              </span>

              <span
                className={`text-sm font-bold ${getTextColor(
                  metric.value
                )}`}
              >
                {metric.value}%
              </span>

            </div>


            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

              <div
                className={`h-full rounded-full transition-all duration-700 ${getScoreColor(
                  metric.value
                )}`}
                style={{
                  width: `${metric.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ResumeQuality;