from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import joblib
import os

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:root@localhost:3306/titanic"
)

db = SQLAlchemy()
db.init_app(app) 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_pipeline = joblib.load(os.path.join(BASE_DIR, '../../models/model_package.joblib'))
