from flask import Blueprint, Flask, request, jsonify
import flask
from __init__ import app
from flask_cors import CORS

CORS(app) 
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    name=data.get("Name")
    pclass =data.get("Pclass")
    sex = int(data.get("Sex"))
    age = data.get("Age")
    ticket=data.get("Ticket")
    fare = data.get("Fare")
    sibsp = data.get("SibSp")
    parch = data.get("Parch")
    Cabin=data.get("Cabin")
    Embark=data.get("Embark")




    if sex == 1:
        result = 1
    else:
        result = 0

    return jsonify({
        "result": result
    })
if __name__ == "__main__":
    app.run(debug=True)