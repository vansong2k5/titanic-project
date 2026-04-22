import numpy as np
import pandas as pd
from flask import request, jsonify
from __init__ import app, model_pipeline, db
from models import Passenger

with app.app_context():
    db.create_all()
    

TITLE_MAPPING = {'Mlle': 'Miss', 'Ms': 'Miss', 'Mme': 'Mrs'}
RARE_TITLES = ['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona']


def preprocess_input(df):
    data = pd.DataFrame([df])
    data['Name'] = data['Name'].apply(lambda x: x if '.' in x else 'Mr. Unknown')
    data['Title'] = data['Name'].str.extract(r' ([A-Za-z]+)\.', expand=False)

    data['Title'] = data['Title'].replace(TITLE_MAPPING)
    data['Title'] = data['Title'].replace(RARE_TITLES, 'Rare')

    
    data['Cabin'] = data['Cabin'].apply(lambda x: np.nan if (x == '' or pd.isna(x)) else x)

    data['Deck'] = data['Cabin'].apply(lambda x: 'U' if pd.isna(x) else str(x)[0])
    
    num_cols = ['Pclass', 'Age', 'Fare', 'SibSp', 'Parch']

    for col in num_cols:
        data[col] = pd.to_numeric(data[col], errors='coerce')
    return data


# Hàm validate
def validate_input(data):
    errors = []
    # --- Họ tên ---
    name = data.get('Name', '').strip()
    if not name:
        errors.append("Name là bắt buộc")
    elif '.' not in name:
        errors.append("Name phải có định dạng 'Họ, Danh hiệu. Tên' (vd: Braund, Mr. Owen)")
    # --- Hạng vé ---
    try:
        pclass = int(data.get('Pclass', ''))
        if pclass not in [1, 2, 3]:
            errors.append("Pclass phải là 1, 2 hoặc 3")
    except (ValueError, TypeError):
        errors.append("Pclass phải là số nguyên (1, 2 hoặc 3)")
    # --- Giới tính ---
    sex = data.get('Sex', '')
    if sex not in ['male', 'female']:
        errors.append("Sex phải là 'male' hoặc 'female'")
    # --- Tuổi ---
    try:
        age = float(data.get('Age', ''))
        if age < 0 or age > 120:
            errors.append("Age phải trong khoảng 0–120")
    except (ValueError, TypeError):
        errors.append("Age phải là số (vd: 22 hoặc 22.5)")
    # --- Giá vé ---
    try:
        fare = float(data.get('Fare', ''))
        if fare < 0:
            errors.append("Fare không được âm")
    except (ValueError, TypeError):
        errors.append("Fare phải là số thực (vd: 7.25)")
    # --- SibSp ---
    try:
        sibsp = int(data.get('SibSp', ''))
        if sibsp < 0 or sibsp > 10:
            errors.append("SibSp phải trong khoảng 0–10")
    except (ValueError, TypeError):
        errors.append("SibSp phải là số nguyên")
    # --- Parch ---
    try:
        parch = int(data.get('Parch', ''))
        if parch < 0 or parch > 10:
            errors.append("Parch phải trong khoảng 0–10")
    except (ValueError, TypeError):
        errors.append("Parch phải là số nguyên")
    # --- Cảng khởi hành ---
    embarked = data.get('Embarked', '')
    if embarked not in ['S', 'C', 'Q']:
        errors.append("Embarked phải là 'S', 'C' hoặc 'Q'")
    # --- Cabin (optional) ---
    cabin = data.get('Cabin', '')
    if cabin and not cabin[0].isalpha():
        errors.append("Cabin phải bắt đầu bằng chữ cái (vd: C85, B20)")
    return errors


def save_to_db(data, survived):
    """Lưu data đã validate vào DB cùng kết quả predict."""
    try:
        passenger = Passenger(
            name     = data['Name'].strip(),
            pclass   = int(data['Pclass']),
            sex      = data['Sex'],
            age      = float(data['Age']),
            fare     = float(data['Fare']),
            sibsp    = int(data['SibSp']),
            parch    = int(data['Parch']),
            ticket   = data.get('Ticket', '').strip() or None,
            cabin    = data.get('Cabin', '').strip() or None,
            embarked = data['Embarked'],
            survived = survived       # 0 hoặc 1
        )
        with app.app_context():
            db.session.add(passenger)
            db.session.commit()
    except Exception as e:
        print(f"[DB ERROR] Không thể lưu: {e}")
        # Không raise để không làm hỏng response predict


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # 1. Validate
    errors = validate_input(data)
    if errors:
        return jsonify({"errors": errors}), 400

    # 2. Preprocess
    df = preprocess_input(data)

    # 3. Predict
    y_pred = model_pipeline.predict(df)
    result = int(y_pred[0])

    # 4. Lưu vào DB
    save_to_db(data, result)

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)