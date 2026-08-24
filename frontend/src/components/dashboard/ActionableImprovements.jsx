import { ArrowUpRight, ListChecks } from "lucide-react";

function ActionableImprovements({ improvements = [] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <ListChecks className="h-5 w-5 text-slate-700" />
        </div>

        <div>

          <h2 className="text-lg font-semibold text-slate-900">
            Actionable Improvements
          </h2>

          <p className="text-sm text-slate-500">
            Specific changes that can improve your resume
          </p>

        </div>

      </div>


      {/* Improvements */}

      <div className="mt-6 space-y-4">

        {improvements.length > 0 ? (

          improvements.map((improvement, index) => (

            <div
              key={`${improvement}-${index}`}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >

              {/* Number */}

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </div>


              {/* Content */}

              <div className="flex-1">

                <p className="text-sm leading-6 text-slate-700">
                  {improvement}
                </p>

              </div>


              {/* Icon */}

              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />

            </div>

          ))

        ) : (

          <div className="rounded-2xl bg-green-50 p-5">

            <p className="text-sm font-medium text-green-700">
              No major improvements were identified.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default ActionableImprovements;