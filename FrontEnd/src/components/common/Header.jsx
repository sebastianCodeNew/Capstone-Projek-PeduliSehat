import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeartbeat, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the user's name

  // Fetch user data when the component mounts or isLoggedIn changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch user name if logged in
    if (isLoggedIn) {
      axios
        .get("http://localhost:8081/is-logged-in", { withCredentials: true })
        .then((res) => {
          if (res.data.Status === "Success") {
            setUserName(res.data.name); // Set the user's name from the server response
            console.log(res.data.name);
          } else {
            setUserName(""); // Clear the name if not authenticated
            setIsLoggedIn(false); // Update login state if token is invalid
          }
        })
        .catch((err) => {
          console.log(err);
          setUserName("");
          setIsLoggedIn(false);
        });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoggedIn, setIsLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setIsLoggedIn(false);
          setUserName(""); // Clear the user's name on logout
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary text-xl font-bold"
          >
            <FaHeartbeat className="text-2xl" />
            <span>Peduli Sehat</span>
          </Link>
          {isLoggedIn && userName ? (
            <span>
              Nama : <strong>{userName}</strong>
            </span>
          ) : (
            <span></span>
          )}

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {[
                "/",
                "/#features",
                "/detection",
                "/#testimonials",
                "/about",
              ].map((path, idx) => (
                <NavLink
                  key={idx}
                  to={path}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : isScrolled
                        ? "text-gray-700 hover:text-primary"
                        : "text-gray-800 hover:text-primary"
                    }`
                  }
                >
                  {
                    [
                      "Beranda",
                      "Fitur",
                      "Deteksi Penyakit",
                      "Testimoni",
                      "Tentang Kami",
                    ][idx]
                  }
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Masuk
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                      Daftar
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            className="md:hidden text-primary text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4 mb-6">
            {["/", "/#features", "/detection", "/#testimonials", "/about"].map(
              (path, idx) => (
                <NavLink
                  key={idx}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-medium py-2 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    }`
                  }
                >
                  {
                    [
                      "Beranda",
                      "Fitur",
                      "Deteksi Penyakit",
                      "Testimoni",
                      "Tentang Kami",
                    ][idx]
                  }
                </NavLink>
              )
            )}
          </nav>

          <div className="flex flex-col space-y-3">
            {isLoggedIn && userName ? (
              <>
                <p className="text-sm text-gray-700 text-center">
                  Pengguna: <strong>{userName}</strong>
                </p>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Masuk
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Daftar
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
