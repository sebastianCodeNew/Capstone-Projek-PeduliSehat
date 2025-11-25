import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import axios from "axios";

const Home = lazy(() => import("./pages/Home"));
const DiseaseDetection = lazy(() => import("./pages/DiseaseDetection"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const History = lazy(() => import("./pages/History"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("http://localhost:8081/is-logged-in", {
          withCredentials: true
        });
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/detection"
                element={<DiseaseDetection isLoggedIn={isLoggedIn} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              ></Route>
              <Route
                path="/history"
                element={<History isLoggedIn={isLoggedIn} />}
              ></Route>
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
