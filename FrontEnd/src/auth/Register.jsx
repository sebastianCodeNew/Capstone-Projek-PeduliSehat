import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (values.password.length < 8) {
      newErrors.password = "Password harus minimal 8 karakter!";
      hasError = true;
    }
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword =
        "Password dan Konfirmasi Password harus sama!";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    axios
      .post("http://localhost:8081/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else if (res.data.Error === "Interesting data Error in Server") {
          setErrors((prev) => ({ ...prev, email: "Email sudah terdaftar" }));
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="flex justify-center items-center bg-gradient-to-b from-transparent via-transparent to-green-50 mt-14"
      style={{ minHeight: "125vh" }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm border border-green-100">
        <div className="flex justify-center mb-5">
          <span className="text-3xl text-green-600 font-bold">🌿</span>
          <h2 className="text-2xl font-semibold text-gray-800 ml-2">Daftar</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium"
            >
              Nama
            </label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              name="name"
              value={values.name}
              onChange={handleInputChange("name")}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 transition-all duration-200 hover:border-green-300"
            />
          </div>

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
                      d="M12 6c3.79 0 7.17 2.13 8.82 5.5a1 1 0 010 1C19.17 15.87 15.79 18 12 18s-7.17-2.13-8.82-5.5a1 1 0 010-1C4.83 8.13 8.21 6 12 6zm0 2a3 3 0 100 6 3 3 0 100-6z"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-medium"
            >
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Kata Sandi"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 transition-all duration-200 hover:border-green-300 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
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
                      d="M12 6c3.79 0 7.17 2.13 8.82 5.5a1 1 0 010 1C19.17 15.87 15.79 18 12 18s-7.17-2.13-8.82-5.5a1 1 0 010-1C4.83 8.13 8.21 6 12 6zm0 2a3 3 0 100 6 3 3 0 100-6z"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
          >
            <span className="text-xl">+</span> Daftar
          </button>

          <p className="text-sm text-gray-600 text-center">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-green-600 font-medium hover:text-green-700 hover:underline transition-colors"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
      <div className="h-48" />
    </div>
  );
}

export default Register;
