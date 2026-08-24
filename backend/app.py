from flask import Flask, jsonify
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

from routes.analysis_routes import analysis_bp


def create_app():

    app = Flask(__name__)

    # =========================================================
    # FILE UPLOAD LIMIT
    # =========================================================

    # Maximum request size: 10 MB
    app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024


    # =========================================================
    # CORS CONFIGURATION
    # =========================================================

    # Allow the Vercel frontend and other browser clients
    # to communicate with the Flask API.
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": "*"
            }
        }
    )


    # =========================================================
    # FILE SIZE ERROR
    # =========================================================

    @app.errorhandler(RequestEntityTooLarge)
    def handle_file_too_large(error):

        return jsonify({
            "success": False,
            "error": "Uploaded file is too large. Maximum size is 10 MB."
        }), 413


    # =========================================================
    # REGISTER API ROUTES
    # =========================================================

    app.register_blueprint(analysis_bp)


    # =========================================================
    # ROOT ENDPOINT
    # =========================================================

    @app.get("/")
    def home():

        return jsonify({
            "message": "TalentOps API is running",
            "status": "success"
        })


    # =========================================================
    # HEALTH CHECK
    # =========================================================

    @app.get("/api/health")
    def health():

        return jsonify({
            "status": "healthy",
            "service": "TalentOps Backend"
        })


    # =========================================================
    # RETURN APPLICATION
    # =========================================================

    return app


# =============================================================
# CREATE FLASK APPLICATION
# =============================================================

app = create_app()


# =============================================================
# LOCAL DEVELOPMENT
# =============================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )