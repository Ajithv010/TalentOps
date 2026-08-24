import hashlib
import os
import tempfile

from flask import Blueprint, jsonify, request

from services.ai_service import analyze_resume
from services.pdf_service import extract_text_from_pdf

from services.database_service import (
    get_cached_analysis,
    save_analysis,
)


analysis_bp = Blueprint(
    "analysis",
    __name__,
    url_prefix="/api"
)


# =========================================================
# CREATE DETERMINISTIC ANALYSIS KEY
# =========================================================

def create_analysis_key(
    resume_text,
    job_title,
    company_name,
    job_description
):
    """
    Creates a deterministic SHA-256 key.

    Same resume text + same job information
    = same analysis key.
    """

    normalized_data = "\n".join([
        resume_text.strip(),
        job_title.strip(),
        company_name.strip(),
        job_description.strip(),
    ])

    return hashlib.sha256(
        normalized_data.encode("utf-8")
    ).hexdigest()


# =========================================================
# ANALYZE RESUME
# =========================================================

@analysis_bp.post("/analyze")
def analyze_resume_route():

    temporary_path = None

    try:

        print("\n")
        print("=" * 70)
        print("NEW ANALYSIS REQUEST")
        print("=" * 70)


        # =================================================
        # 1. VALIDATE RESUME
        # =================================================

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


        print(
            "Resume filename:",
            resume_file.filename
        )


        # =================================================
        # 2. GET JOB INFORMATION
        # =================================================

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


        # =================================================
        # 3. VALIDATE JOB INFORMATION
        # =================================================

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


        # =================================================
        # 4. DEBUG INPUT INFORMATION
        # =================================================

        print(
            "Job title:",
            repr(job_title)
        )

        print(
            "Company:",
            repr(company_name)
        )

        print(
            "Job description length:",
            len(job_description)
        )


        # =================================================
        # 5. SAVE PDF TEMPORARILY
        # =================================================

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temporary_file:

            resume_file.save(
                temporary_file.name
            )

            temporary_path = temporary_file.name


        # =================================================
        # 6. EXTRACT RESUME TEXT
        # =================================================

        resume_text = extract_text_from_pdf(
            temporary_path
        )


        if not resume_text.strip():

            return jsonify({
                "success": False,
                "error": "Could not extract text from the PDF."
            }), 400


        # =================================================
        # 7. DEBUG EXTRACTED RESUME
        # =================================================

        print(
            "Resume text length:",
            len(resume_text)
        )


        print(
            "Resume text SHA-256:",
            hashlib.sha256(
                resume_text.encode("utf-8")
            ).hexdigest()
        )


        # =================================================
        # 8. CREATE DETERMINISTIC ANALYSIS KEY
        # =================================================

        analysis_key = create_analysis_key(
            resume_text=resume_text,
            job_title=job_title,
            company_name=company_name,
            job_description=job_description
        )


        print(
            "Analysis key:",
            analysis_key
        )


        # =================================================
        # 9. CHECK POSTGRESQL CACHE
        # =================================================

        print(
            "Checking PostgreSQL cache..."
        )


        cached_result = get_cached_analysis(
            analysis_key
        )


        # =================================================
        # 10. CACHE HIT
        # =================================================

        if cached_result is not None:

            print(
                "=" * 70
            )

            print(
                "POSTGRES CACHE HIT"
            )

            print(
                "Analysis key:",
                analysis_key
            )

            print(
                "Returning stored analysis."
            )

            print(
                "=" * 70
            )


            return jsonify({
                "success": True,
                "data": cached_result
            }), 200


        # =================================================
        # 11. CACHE MISS
        # =================================================

        print(
            "=" * 70
        )

        print(
            "POSTGRES CACHE MISS"
        )

        print(
            "Analysis key:",
            analysis_key
        )

        print(
            "Gemini will be called."
        )

        print(
            "=" * 70
        )


        # =================================================
        # 12. CALL GEMINI
        # =================================================

        analysis_result = analyze_resume(

            resume_text=resume_text,

            job_title=job_title,

            company_name=company_name,

            job_description=job_description
        )


        print(
            "Gemini analysis completed."
        )


        # =================================================
        # 13. SAVE TO POSTGRESQL
        # =================================================

        save_analysis(

            analysis_key=analysis_key,

            analysis_result=analysis_result
        )


        print(
            "=" * 70
        )

        print(
            "ANALYSIS SAVED TO POSTGRESQL"
        )

        print(
            "Analysis key:",
            analysis_key
        )

        print(
            "=" * 70
        )


        # =================================================
        # 14. RETURN RESULT
        # =================================================

        return jsonify({

            "success": True,

            "data": analysis_result

        }), 200


    # =====================================================
    # VALIDATION ERRORS
    # =====================================================

    except ValueError as error:

        print(
            "Validation error:",
            error
        )

        return jsonify({

            "success": False,

            "error": str(error)

        }), 400


    # =====================================================
    # DATABASE / GEMINI / SERVER ERRORS
    # =====================================================

    except Exception as error:

        print(
            "=" * 70
        )

        print(
            "ANALYSIS ERROR"
        )

        print(
            repr(error)
        )

        print(
            "=" * 70
        )


        return jsonify({

            "success": False,

            "error": "Failed to analyze the resume."

        }), 500


    # =====================================================
    # DELETE TEMPORARY PDF
    # =====================================================

    finally:

        if (
            temporary_path
            and os.path.exists(
                temporary_path
            )
        ):

            os.remove(
                temporary_path
            )