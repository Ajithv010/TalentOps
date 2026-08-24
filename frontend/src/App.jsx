import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ResumeUpload from "./components/ResumeUpload";
import JobDetailsForm from "./components/JobDetailsForm";
import AnalyzeButton from "./components/AnalyzeButton";

import ATSScore from "./components/dashboard/ATSScore";
import SummaryCard from "./components/dashboard/SummaryCard";
import ScoreBreakdown from "./components/dashboard/ScoreBreakdown";
import KeywordAnalysis from "./components/dashboard/KeywordAnalysis";
import ResumeQuality from "./components/dashboard/ResumeQuality";
import FeedbackCard from "./components/dashboard/FeedbackCard";
import ActionableImprovements from "./components/dashboard/ActionableImprovements";
import InterviewInsights from "./components/dashboard/InterviewInsights";

import { analyzeResume } from "./services/api";

import { createAnalysisKey } from "./utils/analysisKey";

import {
  findAnalysisByKey,
  saveAnalysisToCache,
} from "./utils/analysisCache";


function App() {

  // =========================================================
  // FORM STATE
  // =========================================================

  const [resumeFile, setResumeFile] = useState(null);

  const [jobTitle, setJobTitle] = useState("");

  const [companyName, setCompanyName] = useState("");

  const [jobDescription, setJobDescription] = useState("");


  // =========================================================
  // APPLICATION STATE
  // =========================================================

  const [loading, setLoading] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(null);

  const [error, setError] = useState(null);


  // =========================================================
  // ANALYZE RESUME
  // =========================================================

  const handleAnalyze = async () => {

    // ---------------------------------------------------------
    // Validate resume
    // ---------------------------------------------------------

    if (!resumeFile) {
      setError("Please upload your resume.");
      return;
    }


    // ---------------------------------------------------------
    // Validate job title
    // ---------------------------------------------------------

    if (!jobTitle.trim()) {
      setError("Please enter the job title.");
      return;
    }


    // ---------------------------------------------------------
    // Validate company
    // ---------------------------------------------------------

    if (!companyName.trim()) {
      setError("Please enter the company name.");
      return;
    }


    // ---------------------------------------------------------
    // Validate job description
    // ---------------------------------------------------------

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }


    try {

      setError(null);

      setLoading(true);


      // =======================================================
      // STEP 1
      // Create fingerprint for this exact analysis
      // =======================================================

      const analysisKey = await createAnalysisKey({
        resumeFile,
        jobTitle,
        companyName,
        jobDescription,
      });


      console.log(
        "Analysis key:",
        analysisKey
      );


      // =======================================================
      // STEP 2
      // Check cache
      // =======================================================

      const existingAnalysis =
        findAnalysisByKey(
          analysisKey
        );


      // =======================================================
      // STEP 3
      // Use cached result if available
      // =======================================================

      if (existingAnalysis) {

        console.log(
          "Existing analysis found. Using cached result."
        );


        setAnalysisResult(
          existingAnalysis
        );


        return;
      }


      // =======================================================
      // STEP 4
      // No cache → call backend/Gemini
      // =======================================================

      console.log(
        "No cached analysis found. Calling AI..."
      );


      const result = await analyzeResume({
        resumeFile,
        jobTitle,
        companyName,
        jobDescription,
      });


      // =======================================================
      // STEP 5
      // Prepare analysis result
      // =======================================================

      const analysis = {

        ...result.data,

        jobTitle,

        companyName,

        analysisKey,
      };


      // =======================================================
      // STEP 6
      // Display result
      // =======================================================

      setAnalysisResult(
        analysis
      );


      // =======================================================
      // STEP 7
      // Save result to cache
      // =======================================================

      saveAnalysisToCache(
        analysisKey,
        analysis
      );


      console.log(
        "Analysis saved to cache."
      );


    } catch (error) {

      console.error(
        "Analysis failed:",
        error
      );


      setError(
        error.message ||
        "Failed to analyze your resume. Please try again."
      );


    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // START NEW ANALYSIS
  // =========================================================

  const handleNewAnalysis = () => {

    setAnalysisResult(null);

    setError(null);

    setResumeFile(null);

    setJobTitle("");

    setCompanyName("");

    setJobDescription("");


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />


      <main id="top">


        {/* ===================================================
            HERO
        =================================================== */}

        <Hero />


        {/* ===================================================
            ANALYSIS FORM
        =================================================== */}

        <section
          id="analyze"
          className="mx-auto max-w-4xl px-6 pb-20"
        >

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="space-y-8">


              {/* Resume Upload */}

              <ResumeUpload
                file={resumeFile}
                onFileChange={setResumeFile}
              />


              {/* Job Details */}

              <JobDetailsForm
                jobTitle={jobTitle}
                companyName={companyName}
                jobDescription={jobDescription}
                onJobTitleChange={setJobTitle}
                onCompanyNameChange={setCompanyName}
                onJobDescriptionChange={setJobDescription}
              />


              {/* Analyze Button */}

              <div className="border-t border-slate-200 pt-6">

                <AnalyzeButton
                  onClick={handleAnalyze}
                  loading={loading}
                  disabled={
                    loading ||
                    !resumeFile ||
                    !jobTitle.trim() ||
                    !companyName.trim() ||
                    !jobDescription.trim()
                  }
                />

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (

          <section className="mx-auto max-w-4xl px-6 pb-12">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                Analyzing your resume...
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                TalentOps is comparing your resume with the
                job description and generating your ATS analysis.
              </p>

            </div>

          </section>

        )}


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && !loading && (

          <section className="mx-auto max-w-4xl px-6 pb-12">

            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">

                  <span className="text-lg text-red-600">
                    !
                  </span>

                </div>


                <div>

                  <h2 className="font-semibold text-red-900">
                    Analysis failed
                  </h2>


                  <p className="mt-1 text-sm leading-6 text-red-700">
                    {error}
                  </p>


                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="mt-4 text-sm font-semibold text-red-800 underline underline-offset-4 hover:text-red-950"
                  >
                    Dismiss
                  </button>

                </div>

              </div>

            </div>

          </section>

        )}


        {/* ===================================================
            ATS ANALYSIS DASHBOARD
        =================================================== */}

        {analysisResult && !loading && (

          <section className="mx-auto max-w-4xl space-y-6 px-6 pb-20">


            {/* ATS SCORE */}

            <ATSScore
              score={
                analysisResult.ats_score
              }
            />


            {/* SUMMARY */}

            <SummaryCard
              summary={
                analysisResult.summary_feedback
              }
            />


            {/* SCORE BREAKDOWN */}

            <ScoreBreakdown
              breakdown={
                analysisResult.score_breakdown
              }
            />


            {/* KEYWORD ANALYSIS */}

            <KeywordAnalysis
              matchedKeywords={
                analysisResult.matched_keywords
              }
              missingKeywords={
                analysisResult.missing_keywords
              }
            />


            {/* RESUME QUALITY */}

            <ResumeQuality
              quality={
                analysisResult.resume_quality
              }
            />


            {/* FEEDBACK */}

            <FeedbackCard
              strengths={
                analysisResult.strengths
              }
              weaknesses={
                analysisResult.weaknesses
              }
              aiFeedback={
                analysisResult.ai_feedback
              }
            />


            {/* ACTIONABLE IMPROVEMENTS */}

            <ActionableImprovements
              improvements={
                analysisResult.actionable_improvements
              }
            />


            {/* INTERVIEW INSIGHTS */}

            <InterviewInsights
              likelyTopics={
                analysisResult
                  .interview_insights
                  ?.likely_topics
              }
              claimsToPrepare={
                analysisResult
                  .interview_insights
                  ?.claims_to_prepare
              }
            />


            {/* =================================================
                START NEW ANALYSIS
            ================================================= */}

            <div className="flex justify-center pt-4">

              <button
                type="button"
                onClick={handleNewAnalysis}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Start New Analysis
              </button>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}


export default App;