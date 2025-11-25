import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" }); // Clear previous errors

    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
          navigate("/");
        } else if (res.data.Error === "No Email Existed") {
          setErrors((prev) => ({ ...prev, email: "Email belum terdaftar" }));
        } else if (res.data.Error === "Password not matched") {
          setErrors((prev) => ({ ...prev, password: "Kata sandi salah" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            email: "Terjadi kesalahan pada server",
          }));
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        setErrors((prev) => ({ ...prev, email: "Gagal terhubung ke server" }));
        console.log(err);
      });
  };

  const handleInputChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-transparent via-transparent to-green-50 min-h-screen mt-5">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm border border-green-100">
        <div className="flex justify-center mb-5">
          <span className="text-3xl text-green-600 font-bold">🌿</span>
          <h2 className="text-2xl font-semibold text-gray-800 ml-2">Masuk</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan Email"
              name="email"
              value={values.email}
              onChange={handleInputChange("email")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 transition-all duration-200 hover:border-green-300 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
                name="password"
                value={values.password}
                onChange={handleInputChange("password")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 transition-all duration-200 hover:border-green-300 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
          >
            <span className="text-xl">+</span> Masuk
          </button>

          <p className="text-sm text-gray-600 text-center">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium hover:text-green-700 hover:underline transition-colors"
            >
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
