import { Target } from "lucide-react";

function ATSScore({ score }) {

  const getScoreColor = () => {
    if (score < 50) {
      return "text-red-500";
    }

    if (score <= 75) {
      return "text-yellow-500";
    }

    return "text-green-500";
  };


  const getScoreLabel = () => {
    if (score < 50) {
      return "Needs Improvement";
    }

    if (score <= 75) {
      return "Moderate Match";
    }

    return "Strong Match";
  };


  const getStrokeColor = () => {
    if (score < 50) {
      return "#ef4444";
    }

    if (score <= 75) {
      return "#eab308";
    }

    return "#22c55e";
  };


  const radius = 70;

  const circumference = 2 * Math.PI * radius;

  const progress = (score / 100) * circumference;


  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex flex-col items-center">

        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-slate-600" />

          <h2 className="text-lg font-semibold text-slate-900">
            ATS Match Score
          </h2>
        </div>


        <div className="relative mt-8 h-44 w-44">

          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 180 180"
          >

            {/* Background circle */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />

            {/* Progress circle */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={getStrokeColor()}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - progress
              }
            />

          </svg>


          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span
              className={`text-4xl font-bold ${getScoreColor()}`}
            >
              {score}
            </span>

            <span className="text-sm text-slate-400">
              / 100
            </span>

          </div>

        </div>


        <p
          className={`mt-4 text-sm font-semibold ${getScoreColor()}`}
        >
          {getScoreLabel()}
        </p>

      </div>

    </div>
  );
}

export default ATSScore;