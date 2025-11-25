import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DetectionForm from "../components/detection/DetectionForm";

const DiseaseDetection = ({ isLoggedIn }) => {
  // State untuk mengelola FAQ accordion
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Apakah sistem ini dapat mendiagnosis semua jenis penyakit?",
      answer:
        "Tidak, sistem ini hanya dilatih untuk mendeteksi penyakit-penyakit umum berdasarkan database yang kami miliki. Saat ini sistem dapat mendeteksi sekitar 30 jenis penyakit umum yang sering ditemui di masyarakat.",
    },
    {
      question: "Bagaimana tingkat akurasi dari sistem deteksi ini?",
      answer:
        "Berdasarkan pengujian yang telah dilakukan, sistem memiliki akurasi sekitar 85% untuk penyakit-penyakit umum. Namun, akurasi ini bergantung pada kelengkapan dan kejelasan gejala yang dimasukkan. Semakin spesifik gejala yang Anda masukkan, semakin akurat hasil prediksinya.",
    },
    {
      question: "Apakah data yang saya masukkan akan disimpan?",
      answer:
        "Ya, data gejala dan hasil deteksi disimpan secara anonim untuk keperluan pengembangan dan peningkatan akurasi sistem. Kami tidak menyimpan data pribadi apapun kecuali Anda membuat akun dan memberikan izin untuk itu. Anda dapat membaca kebijakan privasi kami untuk informasi lebih lanjut.",
    },
  ];

  // Function to handle navigation to /history
  const handleHistoryClick = () => {
    navigate("/history");
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-6">
            Deteksi Penyakit
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Masukkan gejala yang Anda alami untuk mendapatkan prediksi penyakit
            dan rekomendasi tindakan awal. Sistem kami menggunakan algoritma
            machine learning untuk memberikan hasil yang akurat.
          </p>
          {/* Conditionally render History button if isLoggedIn is true */}
          {isLoggedIn && (
            <button
              onClick={handleHistoryClick}
              className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Riwayat Deteksi
            </button>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <DetectionForm isLoggedIn={isLoggedIn} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-text-primary mb-4 pb-3 border-b-2 border-primary">
                Bagaimana Cara Kerjanya?
              </h3>
              <ol className="list-decimal pl-5">
                <li className="mb-3 text-gray-700">
                  Masukkan gejala yang Anda rasakan
                </li>
                <li className="mb-3 text-gray-700">
                  Sistem akan menganalisis gejala dengan algoritma machine
                  learning
                </li>
                <li className="mb-3 text-gray-700">
                  Dapatkan prediksi penyakit beserta rekomendasi tindakan
                </li>
                <li className="mb-3 text-gray-700">
                  Konsultasikan hasil deteksi dengan profesional kesehatan
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-text-primary mb-4 pb-3 border-b-2 border-primary">
                Keterbatasan
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Sistem deteksi penyakit ini hanya bersifat prediksi awal dan
                bukan pengganti diagnosis medis profesional. Hasil yang
                diberikan berdasarkan pada analisis statistik dari data gejala
                dan tidak menjamin keakuratan 100%. Selalu konsultasikan dengan
                dokter atau tenaga medis untuk diagnosis yang akurat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12 relative">
            Pertanyaan Umum
            <span className="absolute w-16 h-1 bg-primary bottom-0 left-1/2 transform -translate-x-1/2 -mb-4"></span>
          </h2>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg mb-4 overflow-hidden shadow-sm"
              >
                <div
                  className="flex justify-between items-center p-5 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4 className="text-lg font-medium text-text-primary">
                    {faq.question}
                  </h4>
                  <span className="text-2xl text-primary transition-transform duration-300 transform">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>

                <div
                  className={`px-5 pb-5 border-t border-gray-200 ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiseaseDetection;
