from flask import Flask
from .database import init_db
from .routes import main

def create_app():
    app = Flask(__name__, template_folder="../templates", static_folder="../static")
    app.config["SECRET_KEY"] = "dev-secret-key"
    app.register_blueprint(main)

    with app.app_context():
        init_db()

    return app
