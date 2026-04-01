from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "models", "titanic_svc_model.pkl")
)

model = None
model_error = None

try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    model_error = str(e)

@app.get("/")
def home():
    return jsonify({"Hello": "Hello World!"})


@app.post("/predict")
def predict():
    if model is None:
        return jsonify({"error": "Model None"}), 500

    try:
        data = request.get_json(silent=True)
        if not data or "features" not in data:
            return jsonify({"error": "Missing 'features' in request body"}), 400

        features = data["features"]
        if not isinstance(features, dict):
            return jsonify({"error": "'features mus be an object"}), 400

        X = pd.DataFrame([features])

        pred = model.predict(X)[0]
        pred = int(pred)

        return jsonify({
            "prediction": pred,
            "label": "Survived" if pred == 1 else "Not Survived"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)