import joblib
import sys
import json
import numpy as np

def predict_value(input_value):
    # Muat model yang sudah dilatih
    model_filename = 'simple_linear_regression_model.pkl'
    try:
        model = joblib.load(model_filename)
    except FileNotFoundError:
        return {"error": f"Model file '{model_filename}' not found."}
    except Exception as e:
        return {"error": f"Error loading model: {str(e)}"}

    # Lakukan pra-pemrosesan jika perlu (untuk model ini, input adalah numerik tunggal)
    try:
        # Konversi input_value menjadi array numpy 2D seperti saat training
        processed_input = np.array([[float(input_value)]])
    except ValueError:
        return {"error": "Input harus berupa angka."}

    # Lakukan prediksi
    try:
        prediction = model.predict(processed_input)
        # Kembalikan hasil prediksi dalam format JSON
        return {"input_value": input_value, "prediction": prediction[0]}
    except Exception as e:
        return {"error": f"Error during prediction: {str(e)}"}

if __name__ == '__main__':
    # Ambil input dari argumen baris perintah
    if len(sys.argv) > 1:
        input_data = sys.argv[1]
        result = predict_value(input_data)
        print(json.dumps(result)) # Cetak hasil sebagai string JSON
    else:
        # Cetak pesan error jika tidak ada input
        error_message = {"error": "Tidak ada input yang diberikan. Gunakan: python predict.py <nilai_input>"}
        print(json.dumps(error_message))