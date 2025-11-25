import joblib
from sklearn.linear_model import LinearRegression
import numpy as np

# 1. Data sederhana (misalnya, memprediksi output berdasarkan input)
# Input fitur (X) dan target (y)
X_train = np.array([[1], [2], [3], [4], [5], [6], [7]])
y_train = np.array([2, 4, 5, 4, 6, 7, 8]) # Contoh target

# 2. Latih model regresi linear sederhana
model = LinearRegression()
model.fit(X_train, y_train)

# 3. Coba prediksi sederhana (opsional, untuk tes)
test_input = np.array([[8]])
prediction = model.predict(test_input)
print(f"Prediksi untuk input {test_input[0][0]}: {prediction[0]}")

# 4. Simpan model ke file
model_filename = 'simple_linear_regression_model.pkl'
joblib.dump(model, model_filename)
print(f"Model disimpan sebagai {model_filename}")