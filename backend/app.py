from flask import Flask, jsonify
from flask_cors import CORS

from routes.analysis_routes import analysis_bp


def create_app():

    app = Flask(__name__)

    # Allow React frontend to communicate with Flask.
    CORS(app)

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