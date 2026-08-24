import {
  BookOpenCheck,
  MessageCircleQuestion,
} from "lucide-react";

function InterviewInsights({
  likelyTopics = [],
  claimsToPrepare = [],
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <BookOpenCheck className="h-5 w-5 text-slate-700" />
        </div>

        <div>

          <h2 className="text-lg font-semibold text-slate-900">
            Interview Preparation
          </h2>

          <p className="text-sm text-slate-500">
            Topics and resume claims you should be ready to discuss
          </p>

        </div>

      </div>


      {/* Two columns */}

      <div className="mt-7 grid gap-8 md:grid-cols-2">


        {/* Likely Topics */}

        <div>

          <div className="mb-4 flex items-center gap-2">

            <MessageCircleQuestion className="h-5 w-5 text-slate-700" />

            <h3 className="font-semibold text-slate-900">
              Likely Interview Topics
            </h3>

          </div>


          {likelyTopics.length > 0 ? (

            <div className="space-y-3">

              {likelyTopics.map((topic, index) => (

                <div
                  key={`${topic}-${index}`}
                  className="flex gap-3 rounded-2xl border border-slate-200 p-4"
                >

                  <span className="text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6 text-slate-600">
                    {topic}
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-400">
              No interview topics were identified.
            </p>

          )}

        </div>


        {/* Claims to Prepare */}

        <div>

          <div className="mb-4 flex items-center gap-2">

            <BookOpenCheck className="h-5 w-5 text-slate-700" />

            <h3 className="font-semibold text-slate-900">
              Resume Claims to Prepare
            </h3>

          </div>


          {claimsToPrepare.length > 0 ? (

            <div className="space-y-3">

              {claimsToPrepare.map((claim, index) => (

                <div
                  key={`${claim}-${index}`}
                  className="flex gap-3 rounded-2xl border border-slate-200 p-4"
                >

                  <span className="text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6 text-slate-600">
                    {claim}
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-400">
              No specific claims require preparation.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default InterviewInsights;