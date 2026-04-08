from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
app=Flask(__name__)
db=SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:202005@localhost:3306/titanic"
)