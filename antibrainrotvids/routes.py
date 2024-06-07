from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)
video_bp = Blueprint('video', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "User already exists"}), 400
    
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@auth_bp.route('/preferences', methods=['POST'])
@jwt_required()
def set_preferences():
    user_id = get_jwt_identity()
    data = request.get_json()
    preferences = data.get('preferences')
    
    user = User.query.get(user_id)
    user.preferences = preferences
    db.session.commit()
    
    return jsonify({"msg": "Preferences saved successfully"}), 200

@video_bp.route('/recommend', methods=['GET'])
@jwt_required()
def recommend_videos():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    preferences = user.preferences  # This would be used in the recommendation logic

    # Placeholder for SVD recommendation logic
    recommended_videos = []
    
    return jsonify(recommended_videos), 200
