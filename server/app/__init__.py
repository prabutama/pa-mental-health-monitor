from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)
app.config.from_object(Config)
db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

from app.models import User, MentalHealthInput, MentalHealthClassification
from app import routes


