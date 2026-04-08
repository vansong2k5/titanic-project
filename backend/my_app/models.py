from flask import Flask, request, jsonify
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from __init__ import db
class User(db.Model):
    name=db.Column(db.String(50),nullable=False)
    pclass=db.Column(db.Integer,nullable=False)
    sex=db.Column(db.Integer,nullable=False)
    age=db.Column(db.Integer,nullable=False)
    fare=db.Column(db.Float,nullable=False)
    sibsp=db.Column(db.Integer,nullable=False)
    parch=db.Column(db.Integer,nullable=False)
    ticket=db.Column(db.Integer,nullable=False)
    cabin=db.Column(db.Integer,nullable=False)
    embark=db.Column(db.Char,nullable=False)
    

