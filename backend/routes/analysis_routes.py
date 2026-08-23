import os
import tempfile

from flask import Blueprint, jsonify, request

from services.ai_service import analyze_resume
from services.pdf_service import extract_text_from_pdf


analysis_bp = Blueprint(
    "analysis",
    __name__,
    url_prefix="/api"
)


@analysis_bp.post("/analyze")
def analyze_resume_route():

    temporary_path = None

    try:

        # ====================================================
        # 1. Validate resume PDF
        # ====================================================

        if "resume" not in request.files:
            return jsonify({
                "success": False,
                "error": "Resume PDF is required."
            }), 400

        resume_file = request.files["resume"]

        if not resume_file.filename:
            return jsonify({
                "success": False,
                "error": "No resume file selected."
            }), 400

        if not resume_file.filename.lower().endswith(".pdf"):
            return jsonify({
                "success": False,
                "error": "Only PDF files are supported."
            }), 400

        # ====================================================
        # 2. Get job information
        # ====================================================

        job_title = request.form.get(
            "job_title",
            ""
        ).strip()

        company_name = request.form.get(
            "company_name",
            ""
        ).strip()

        job_description = request.form.get(
            "job_description",
            ""
        ).strip()

        # ====================================================
        # 3. Validate job information
        # ====================================================

        if not job_title:
            return jsonify({
                "success": False,
                "error": "Job title is required."
            }), 400

        if not company_name:
            return jsonify({
                "success": False,
                "error": "Company name is required."
            }), 400

        if not job_description:
            return jsonify({
                "success": False,
                "error": "Job description is required."
            }), 400

        # ====================================================
        # 4. Save PDF temporarily
        # ====================================================

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temporary_file:

            resume_file.save(temporary_file.name)
            temporary_path = temporary_file.name

        # ====================================================
        # 5. Extract resume text
        # ====================================================

        resume_text = extract_text_from_pdf(
            temporary_path
        )

        # ====================================================
        # 6. Send resume + job information to Gemini
        # ====================================================

        analysis_result = analyze_resume(
            resume_text=resume_text,
            job_title=job_title,
            company_name=company_name,
            job_description=job_description
        )

        # ====================================================
        # 7. Return structured ATS result
        # ====================================================

        return jsonify({
            "success": True,
            "data": analysis_result
        }), 200

    # ========================================================
    # Handle validation / PDF extraction errors
    # ========================================================

    except ValueError as error:

        return jsonify({
            "success": False,
            "error": str(error)
        }), 400

    # ========================================================
    # Handle unexpected server / Gemini errors
    # ========================================================

    except Exception as error:

        print("Analysis error:", error)

        return jsonify({
            "success": False,
            "error": "Failed to analyze the resume."
        }), 500

    # ========================================================
    # Always delete temporary PDF
    # ========================================================

    finally:

        if temporary_path and os.path.exists(temporary_path):
            os.remove(temporary_path)