import { FileText } from "lucide-react";

function SummaryCard({ summary }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <FileText className="h-5 w-5 text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recruiter Summary
          </h2>

          <p className="text-sm text-slate-500">
            AI-generated assessment of your fit
          </p>
        </div>

      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">
        {summary}
      </p>

    </div>
  );
}

export default SummaryCard;