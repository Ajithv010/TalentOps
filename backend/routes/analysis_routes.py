import hashlib
import json
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


# =========================================================
# CACHE CONFIGURATION
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

CACHE_DIR = os.path.join(
    BASE_DIR,
    "cache"
)

CACHE_FILE = os.path.join(
    CACHE_DIR,
    "analyses.json"
)


# =========================================================
# CREATE CACHE DIRECTORY
# =========================================================

os.makedirs(
    CACHE_DIR,
    exist_ok=True
)


# =========================================================
# LOAD CACHE
# =========================================================

def load_cache():

    if not os.path.exists(CACHE_FILE):

        return {}

    try:

        with open(
            CACHE_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except (
        json.JSONDecodeError,
        OSError
    ):

        return {}


# =========================================================
# SAVE CACHE
# =========================================================

def save_cache(cache):

    temporary_cache_file = (
        CACHE_FILE + ".tmp"
    )

    with open(
        temporary_cache_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            cache,
            file,
            ensure_ascii=False,
            indent=2
        )

    os.replace(
        temporary_cache_file,
        CACHE_FILE
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

    combined_data = "\n".join([
        resume_text.strip(),
        job_title.strip(),
        company_name.strip(),
        job_description.strip()
    ])

    return hashlib.sha256(
        combined_data.encode(
            "utf-8"
        )
    ).hexdigest()


# =========================================================
# ANALYZE RESUME
# =========================================================

@analysis_bp.post("/analyze")
def analyze_resume_route():

    temporary_path = None

    try:

        # =================================================
        # 1. VALIDATE RESUME
        # =================================================

        if "resume" not in request.files:

            return jsonify({
                "success": False,
                "error": "Resume PDF is required."
            }), 400


        resume_file = request.files[
            "resume"
        ]


        if not resume_file.filename:

            return jsonify({
                "success": False,
                "error": "No resume file selected."
            }), 400


        if not resume_file.filename.lower().endswith(
            ".pdf"
        ):

            return jsonify({
                "success": False,
                "error": "Only PDF files are supported."
            }), 400


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
        # 4. SAVE PDF TEMPORARILY
        # =================================================

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temporary_file:

            resume_file.save(
                temporary_file.name
            )

            temporary_path = (
                temporary_file.name
            )


        # =================================================
        # 5. EXTRACT RESUME TEXT
        # =================================================

        resume_text = extract_text_from_pdf(
            temporary_path
        )


        # =================================================
        # 6. CREATE ANALYSIS KEY
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
        # 7. CHECK BACKEND CACHE
        # =================================================

        cache = load_cache()


        if analysis_key in cache:

            print(
                "Existing analysis found. "
                "Returning cached result."
            )

            return jsonify({

                "success": True,

                "data": cache[
                    analysis_key
                ]

            }), 200


        print(
            "No cached analysis found. "
            "Calling Gemini..."
        )


        # =================================================
        # 8. CALL GEMINI
        # =================================================

        analysis_result = analyze_resume(

            resume_text=resume_text,

            job_title=job_title,

            company_name=company_name,

            job_description=job_description
        )


        # =================================================
        # 9. SAVE RESULT TO BACKEND CACHE
        # =================================================

        cache[
            analysis_key
        ] = analysis_result


        save_cache(
            cache
        )


        print(
            "Analysis saved to backend cache."
        )


        # =================================================
        # 10. RETURN RESULT
        # =================================================

        return jsonify({

            "success": True,

            "data": analysis_result

        }), 200


    # =====================================================
    # HANDLE VALIDATION / PDF ERRORS
    # =====================================================

    except ValueError as error:

        return jsonify({

            "success": False,

            "error": str(error)

        }), 400


    # =====================================================
    # HANDLE SERVER / GEMINI ERRORS
    # =====================================================

    except Exception as error:

        print(
            "Analysis error:",
            error
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