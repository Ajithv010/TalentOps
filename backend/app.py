from flask import Flask, jsonify
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

from routes.analysis_routes import analysis_bp


def create_app():

    app = Flask(__name__)

    # Maximum request size: 10 MB
    app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024

    # Allow React frontend to communicate with Flask.
    CORS(app)

    # Handle files larger than 10 MB.
    @app.errorhandler(RequestEntityTooLarge)
    def handle_file_too_large(error):
        return jsonify({
            "success": False,
            "error": "Uploaded file is too large. Maximum size is 10 MB."
        }), 413

    # Register API routes.
    app.register_blueprint(analysis_bp)

    @app.get("/")
    def home():
        return jsonify({
            "message": "TalentOps API is running",
            "status": "success"
        })

    @app.get("/api/health")
    def health():
        return jsonify({
            "status": "healthy",
            "service": "TalentOps Backend"
        })

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )