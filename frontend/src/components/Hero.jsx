import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="px-6 pb-10 pt-16 text-center">

      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
        <Sparkles className="h-4 w-4" />
        AI-Powered Resume Analysis
      </div>

      <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
        Know exactly how your resume
        <span className="block text-slate-500">
          matches the job.
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
        Upload your resume, add a target job description, and let
        TalentOps analyze your ATS compatibility with actionable
        feedback.
      </p>

    </section>
  );
}

export default Hero;