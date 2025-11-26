import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const salt = 10;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL || "https://your-frontend.vercel.app"
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
// PostgreSQL connection dengan Supabase
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// Test koneksi
db.query("SELECT NOW() AS waktu", (err, result) => {
  if (err) {
    console.error("❌ Gagal connect ke database:", err);
  } else {
    console.log("✅ Berhasil connect ke Supabase!");
    console.log("⏰ Waktu di database:", result.rows[0].waktu);
  }
});
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Anda belum terautentikasi" });
  }
  jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.json({ Error: "Token tidak valid" });
    }
    req.name = decoded.name;
    next();
  });
};
app.get("/is-logged-in", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Status: "Error", Error: "Belum terautentikasi" });
  }
  jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Token tidak valid" });
    }
    const sql = "SELECT name FROM login WHERE name = $1";
    db.query(sql, [decoded.name], (err, result) => {
      if (err || result.rows.length === 0) {
        return res.json({ Status: "Error", Error: "Pengguna tidak ditemukan" });
      }
      return res.json({ Status: "Success", name: result.rows[0].name });
    });
  });
});
app.post("/register", (req, res) => {
  const sql = "INSERT INTO login (name, email, password) VALUES ($1, $2, $3)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error saat mengenkripsi password" });
    const values = [req.body.name, req.body.email, hash];
    db.query(sql, values, (err, result) => {
      if (err) return res.json({ Error: "Error data di Server" });
      return res.json({ Status: "Success" });
    });
  });
});
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = $1";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Error login di Server" });
    if (data.rows.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data.rows[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Error membandingkan password" });
          if (response) {
            const name = data.rows[0].name;
            const token = jwt.sign({ name }, process.env.JWT_SECRET || "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 24 * 60 * 60 * 1000,
            });
            return res.json({ Status: "Success", name: name });
          } else {
            return res.json({ Error: "Password tidak cocok" });
          }
        }
      );
    } else {
      return res.json({ Error: "Email tidak ditemukan" });
    }
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});
const getUserId = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Anda belum terautentikasi" });
  }
  jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.json({ Error: "Token tidak valid" });
    }
    const sql = "SELECT id FROM login WHERE name = $1";
    db.query(sql, [decoded.name], (err, result) => {
      if (err) return res.json({ Error: "Error database" });
      if (result.rows.length === 0) return res.json({ Error: "Pengguna tidak ditemukan" });
      req.userId = result.rows[0].id;
      next();
    });
  });
};
app.post("/save-detection", getUserId, (req, res) => {
  const { symptoms, detection_result } = req.body;
  const sql = "INSERT INTO detection_history (user_id, symptoms, detection_result) VALUES ($1, $2, $3)";
  db.query(
    sql,
    [req.userId, JSON.stringify(symptoms), detection_result],
    (err, result) => {
      if (err) return res.json({ Error: "Error menyimpan riwayat deteksi" });
      return res.json({ Status: "Success", id: result.rows[0]?.id });
    }
  );
});
app.get("/detection-history", getUserId, (req, res) => {
  const sql = "SELECT * FROM detection_history WHERE user_id = $1 ORDER BY created_at DESC";
  db.query(sql, [req.userId], (err, result) => {
    if (err) return res.json({ Error: "Error mengambil riwayat deteksi" });
    const history = result.rows.map((record) => ({
      ...record,
      symptoms: JSON.parse(record.symptoms),
    }));
    return res.json({ Status: "Success", history });
  });
});
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});