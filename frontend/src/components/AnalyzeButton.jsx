import { ArrowRight, Sparkles } from "lucide-react";

function AnalyzeButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Analyzing Resume...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate ATS Report
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export default AnalyzeButton;