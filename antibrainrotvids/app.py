from flask import Flask
from config import Config
from models import db
from routes import auth_bp, video_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)
CORS(app)  # Add this line to enable CORS

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(video_bp, url_prefix='/videos')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # This line creates the database tables
    app.run(debug=True)
