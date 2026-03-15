
---

## Bước 0 — Setup (1 lần)
### Việc cần làm
- Import thư viện, set seed, load dataset
- Kiểm tra schema (cột, kiểu dữ liệu)

### Output
- Notebook chạy được, dữ liệu load thành công

---

## Bước 1 — EDA (Notebook 01_eda.ipynb)
### Yêu cầu bắt buộc
- ≥ 8 biểu đồ có ý nghĩa
- Correlation (tương quan giữa các biến numeric)
- Outlier detection (phát hiện ngoại lai)
- Phân tích biến mục tiêu (target)

### Thứ tự làm chuẩn
1. Tổng quan dữ liệu: shape, dtype, describe
2. Missing values: tỷ lệ thiếu theo cột
3. Target analysis: phân phối target / mất cân bằng lớp
4. Vẽ ≥ 8 plots + caption (mỗi plot trả lời 1 câu hỏi)
5. Correlation heatmap (numeric)
6. Outlier: boxplot/IQR/z-score cho numeric
7. Kết luận EDA: missing/imbalance/outlier/feature quan trọng

### Output cần có
- 8+ hình + nhận xét
- Đoạn kết luận EDA (5–10 dòng)

---

## Bước 2 — Split data (trước khi preprocess)
### Việc cần làm
- Train/test split (classification dùng stratify=y)

### Output
- X_train, X_test, y_train, y_test

---

## Bước 3 — Preprocessing + Pipeline (Notebook 02_preprocess_fe.ipynb)
### Yêu cầu bắt buộc
- Missing + Encoding + Scaling
- BẮT BUỘC dùng sklearn Pipeline (khuyến nghị kèm ColumnTransformer)

### Thứ tự làm chuẩn
1. Tách cột numeric/categorical
2. Numeric pipeline: Imputer + Scaler
3. Categorical pipeline: Imputer + OneHotEncoder(handle_unknown="ignore")
4. Gộp bằng ColumnTransformer `preprocess`
5. Tạo pipeline tổng: `Pipeline([('preprocess', preprocess), ('model', ...)])`

### Output cần có
- preprocess (ColumnTransformer)
- pipeline chạy được (fit/predict không lỗi)

---

## Bước 4 — Feature Engineering (≥ 2 features) (trong Notebook 02)
### Yêu cầu bắt buộc
- Tạo ≥ 2 feature mới có ý nghĩa
- Giải thích + đánh giá ảnh hưởng

### Thứ tự làm chuẩn
1. Đề xuất 2 feature mới + lý do
2. Tạo feature (ưu tiên nhét vào pipeline bằng FunctionTransformer/custom transformer)
3. Đánh giá ảnh hưởng:
   - baseline CV score (chưa FE)
   - CV score sau FE
   - kết luận FE có giúp không

### Output cần có
- 2 feature mới (mô tả rõ)
- Bảng/metric trước vs sau FE

---

## Bước 5 — Modeling (Notebook 03_modeling.ipynb)
### Yêu cầu bắt buộc
- ≥ 3 models khác loại
- 5-fold CV
- GridSearchCV (hoặc RandomizedSearchCV)
- So sánh, chọn 1 model tốt nhất
- wandb runs

### Thứ tự làm chuẩn
1. Chọn metric chính (vd: ROC-AUC hoặc F1 nếu lệch lớp)
2. Chạy 3 model:
   - Logistic Regression (linear)
   - RandomForest/GradientBoosting (tree-based)
   - SVC/KNN/NB (khác loại)
3. Mỗi model: Pipeline + GridSearchCV(cv=5)
4. Log wandb: params, best_score, best_params, run name theo model
5. Bảng so sánh: CV mean/std + best params

### Output cần có
- Bảng so sánh 3 model
- Best model + best params
- Link wandb

---

## Bước 6 — Evaluation (Notebook 04_evaluation_persistence.ipynb)
### Yêu cầu bắt buộc
- Confusion Matrix / ROC-AUC
- Learning curves
- Feature importance
- So sánh models

### Thứ tự làm chuẩn
1. Fit best model trên train
2. Predict trên test
3. Confusion Matrix + classification report
4. ROC curve + AUC (khuyến nghị thêm PR curve nếu lệch lớp)
5. Learning curve: train vs validation theo số lượng data + kết luận over/underfit
6. Feature importance:
   - Tree: feature_importances_
   - Chung: Permutation Importance (khuyến nghị)

### Output cần có
- Hình: confusion matrix, ROC, learning curve, importance
- Kết luận vì sao chọn model này

---

## Bước 7 — Model Persistence (joblib)
### Yêu cầu bắt buộc
- Lưu full pipeline + metadata
- Demo load và predict

### Thứ tự làm chuẩn
1. Lưu pipeline:
   - `joblib.dump(best_pipeline, "models/pipeline.joblib")`
2. Lưu metadata (models/metadata.json):
   - metric, params, thời gian, features, versions
3. Load lại và predict thử 1–2 dòng

### Output cần có
- models/pipeline.joblib
- models/metadata.json
- Demo load/predict chạy được

---

## Deliverables cuối cùng
- Notebooks (01–04) chạy end-to-end
- File model: `models/pipeline.joblib`
- `models/metadata.json`
- wandb link (có runs + phân tích)
- Báo cáo (PDF) + weekly reports (nếu yêu cầu)