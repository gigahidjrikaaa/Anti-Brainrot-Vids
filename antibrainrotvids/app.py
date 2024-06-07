from flask import Flask
from config import Config
from models import db
from routes import auth_bp, video_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(video_bp, url_prefix='/videos')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
