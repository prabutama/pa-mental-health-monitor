from app import app, response
from app.controllers import PredictionController, UserController, MentalHealthController
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import jsonify


@app.route("/", methods=["GET"])
def index():
    return "Hello, World!"


@app.route("/register", methods=["POST"])
def register():
    return UserController.register()


@app.route("/login", methods=["POST"])
def login():
    return UserController.login()


@app.route("/check", methods=["POST"])
@jwt_required()
def check():
    return PredictionController.predict_mental_health()


@app.route("/result/<string:user_id>", methods=["GET"])
def mental_health_results_for_user(user_id):
    return MentalHealthController.get_mental_health_results_by_user(user_id)

@app.route("/result/<string:input_id>", methods=["DELETE"])
@jwt_required()
def delete_mental_health_record(input_id):
    return MentalHealthController.delete_mental_health_record(input_id)

@app.route("/admin/users", methods=["GET"])
@jwt_required()
def get_all_users():
    return UserController.getAllUsers()


@app.route("/admin/users/<string:user_id>", methods=["GET"])
@jwt_required()
def get_user_by_id(user_id):
    return UserController.getUserDetail(user_id)
