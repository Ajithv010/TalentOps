import {
  AlertTriangle,
  CheckCircle2,
  MessageSquareText,
} from "lucide-react";

function FeedbackCard({
  strengths = [],
  weaknesses = [],
  aiFeedback,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <MessageSquareText className="h-5 w-5 text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recruiter Feedback
          </h2>

          <p className="text-sm text-slate-500">
            What is working and what needs improvement
          </p>
        </div>
      </div>

      {aiFeedback?.overall && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <p className="text-sm leading-7 text-slate-600">
            {aiFeedback.overall}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <h3 className="font-semibold text-slate-900">
              Strengths
            </h3>
          </div>

          {strengths.length > 0 ? (
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li
                  key={`${strength}-${index}`}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">
              No strengths were identified.
            </p>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />

            <h3 className="font-semibold text-slate-900">
              Areas to Improve
            </h3>
          </div>

          {weaknesses.length > 0 ? (
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <li
                  key={`${weakness}-${index}`}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">
              No major weaknesses were identified.
            </p>
          )}
        </div>

      </div>

    </div>
  );
}

export default FeedbackCard;