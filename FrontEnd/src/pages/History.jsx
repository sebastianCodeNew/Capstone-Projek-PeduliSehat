import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function History({ isLoggedIn }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/detection-history"
        );
        if (response.data.Status === "Success") {
          setHistory(response.data.history);
        } else {
          setError(response.data.Error || "Failed to fetch history");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Riwayat Deteksi</h1>

      {history.length === 0 ? (
        <p className="text-gray-600">Belum ada riwayat deteksi.</p>
      ) : (
        <div className="grid gap-4">
          {history.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-primary">
                  Hasil Deteksi : {record.detection_result}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(record.created_at).toLocaleString()}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Gejala :</h3>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(record.symptoms)
                    .filter(([_, value]) => value === true)
                    .map(([symptom]) => (
                      <li key={symptom} className="text-gray-700">
                        {symptom.replace(/_/g, " ").toLowerCase()}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
