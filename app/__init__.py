from flask import Flask
from flask_cors import CORS
from .database import init_db
from .routes import main

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "dev-secret-key"
    CORS(app)
    app.register_blueprint(main)

    with app.app_context():
        init_db()

    return app
