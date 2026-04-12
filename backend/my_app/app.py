import numpy as np
import pandas as pd
import joblib
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.base import BaseEstimator, TransformerMixin

# --- 1. KHAI BÁO CLASS CUSTOM (Dùng chính code của bạn) ---
class AgeImputer(BaseEstimator, TransformerMixin):
    def __init__(self, group_cols=['Sex', 'Pclass'], target_col='Age'):
        self.group_cols = group_cols
        self.target_col = target_col
        self.group_median_ = None
        self.global_median_ = None

    def fit(self, X, y=None):
        X = X.copy()
        self.group_median_ = X.groupby(self.group_cols)[self.target_col].median()
        self.global_median_ = X[self.target_col].median()
        return self

    def _fill_row(self, row):
        if pd.notna(row[self.target_col]):
            return row[self.target_col]
        key = tuple(row[col] for col in self.group_cols)
        if key in self.group_median_.index:
            val = self.group_median_.loc[key]
            if pd.notna(val): return val
        return self.global_median_

    def transform(self, X):
        X = X.copy()
        X[self.target_col] = X.apply(self._fill_row, axis=1)
        return X

# --- 2. CÁC BIẾN HẰNG SỐ (Từ logic huấn luyện của bạn) ---
TITLE_MAPPING = {'Mlle': 'Miss', 'Ms': 'Miss', 'Mme': 'Mrs'}
RARE_TITLES = ['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona']
# rare_prefixes nên được lấy từ file lưu trữ hoặc định nghĩa lại nếu danh sách ngắn
RARE_PREFIXES = ['A/5', 'A/4', 'A4', 'A5', 'S.O./P.P.', 'CA'] 

# --- 3. KHỞI TẠO APP & LOAD MODEL ---
app = Flask(__name__)
 # Cho phép React gọi API

# Load pipeline (đã lưu ở bước cuối trong Notebook của bạn)
# Đảm bảo đường dẫn chính xác tới file .joblib
model_pipeline = joblib.load('../../models/titanic_model.joblib')

# --- 4. LOGIC XỬ LÝ DỮ LIỆU ---
def preprocess_input(df):
    data = pd.DataFrame([df])
    data['Name'] = data['Name'].apply(lambda x: x if '.' in x else 'Mr. Unknown')
    data['Title'] = data['Name'].str.extract(r' ([A-Za-z]+)\.', expand=False)

    title_mapping = {'Mlle': 'Miss', 'Ms': 'Miss', 'Mme': 'Mrs'}
    rare_titles = ['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona']
    data['Title'] = data['Title'].replace(title_mapping)
    data['Title'] = data['Title'].replace(rare_titles, 'Rare')

    
    data['Cabin'] = data['Cabin'].apply(lambda x: np.nan if x == '1' else x)

    data['Deck'] = data['Cabin'].apply(lambda x: 'U' if pd.isna(x) else str(x)[0])
    
    data['Embarked'] = data['Embarked'].replace('', 'S')
    num_cols = ['Pclass', 'Age', 'Fare', 'SibSp', 'Parch']

    for col in num_cols:
        data[col] = pd.to_numeric(data[col], errors='coerce')
    data['FamilySize'] = data['SibSp'].astype(int) + data['Parch'].astype(int) + 1
    data['IsAlone'] = (data['FamilySize'] == 1).astype(int)
    return data
CORS(app)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df=preprocess_input(data)
    y_pred = model_pipeline.predict(df)
    print(y_pred)
    # print(df)
    # print("RAW INPUT:", request.json)
    return jsonify({
        "result": 1
    })
if __name__ == '__main__':
    app.run(debug=True)