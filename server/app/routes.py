from app import app, response
from app.controllers import PredictionController, UserController, MentalHealthController
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import jsonify


# @app.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():    
#     current_user = get_jwt_identity()
#     return response.success(current_user, "Success")
    
# @app.route('/dosen', methods=['GET', 'POST'])
# # @jwt_required()
# def dosens():
#     if request.method == 'GET':
#         return DosenController.index()
#     else: 
#         return DosenController.save()
    
# #buat route paging
# @app.route('/api/dosen/page', methods=['GET'])
# def paginate():
#     return DosenController.paginate()
    
# @app.route('/upload-file', methods=['POST'])
# def upload():
#     return UserController.upload()

# # @app.route('/createadmin', methods=['POST'])
# # def admin():
# #     return UserController.buatAdmin()

# @app.route('/dosen/<id>', methods=['GET', 'PUT', 'DELETE'])
# def dosen(id):
#     if request.method == 'GET':
#         return DosenController.detail(id)
#     elif request.method == 'PUT':
#         return DosenController.ubah(id)
#     elif request.method == 'DELETE':
#         return DosenController.hapus(id)
    
@app.route('/', methods=['GET'])
def index():
    return 'Hello, World!'

@app.route('/register', methods=['POST'])
def register():
    return UserController.register()

@app.route('/login', methods=['POST'])
def login():
    return UserController.login()

@app.route('/check', methods=['POST'])
@jwt_required()
def check():
    return PredictionController.predict_mental_health()

@app.route('/result/<string:user_id>', methods=['GET'])
def mental_health_results_for_user(user_id):  
    return MentalHealthController.get_mental_health_results_by_user(user_id)





