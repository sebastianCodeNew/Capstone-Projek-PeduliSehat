# 🚀 Deployment Guide - Peduli Sehat

Panduan lengkap untuk deploy aplikasi Peduli Sehat ke production menggunakan platform gratis.

---

## 📋 Prerequisites

- [x] Akun GitHub (repository sudah ada)
- [ ] Akun Supabase (gratis, no credit card)
- [ ] Akun Railway (gratis, no credit card)
- [ ] Akun Vercel (gratis, no credit card)

---

## Phase 1: Setup Database (Supabase) ⚡

### Step 1.1: Create Supabase Account

1. Buka https://supabase.com
2. Klik **"Start your project"**
3. Sign up dengan GitHub account Anda
4. Verify email jika diminta

### Step 1.2: Create New Project

1. Klik **"New Project"**
2. Isi form:
   - **Name**: `peduli-sehat-db`
   - **Database Password**: Buat password yang kuat (SIMPAN PASSWORD INI!)
   - **Region**: `Southeast Asia (Singapore)` (terdekat dengan Indonesia)
   - **Pricing Plan**: `Free` (sudah terpilih)
3. Klik **"Create new project"**
4. Tunggu ~2 menit sampai database ready

### Step 1.3: Run SQL Schema

1. Di dashboard Supabase, klik **"SQL Editor"** di sidebar kiri
2. Klik **"New query"**
3. Copy seluruh isi file `BackEnd/Database/supabase_schema.sql`
4. Paste ke SQL editor
5. Klik **"Run"** (atau tekan Ctrl+Enter)
6. Anda akan melihat pesan: `Tables created successfully!`

### Step 1.4: Get Connection String

1. Klik **"Settings"** (icon gear) di sidebar kiri
2. Klik **"Database"**
3. Scroll ke bawah ke section **"Connection string"**
4. Pilih tab **"URI"**
5. Copy connection string (format: `postgresql://postgres:[YOUR-PASSWORD]@...`)
6. **PENTING**: Replace `[YOUR-PASSWORD]` dengan password yang Anda buat di Step 1.2

**Contoh Connection String:**
```
postgresql://postgres:your_password_here@db.abcdefghijk.supabase.co:5432/postgres
```

✅ **Checklist:**
- [ ] Supabase project created
- [ ] Tables `login` dan `detection_history` berhasil dibuat
- [ ] Connection string sudah dicopy dan disimpan

---

## Phase 2: Deploy BackEnd to Railway 🚂

### Step 2.1: Create Railway Account

1. Buka https://railway.app
2. Klik **"Login"**
3. Sign in dengan GitHub account
4. Authorize Railway untuk akses GitHub

### Step 2.2: Create New Project for BackEnd

1. Klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository: `sebastianCodeNew/Capstone-Projek-PeduliSehat`
4. Railway akan mendeteksi monorepo Anda

### Step 2.3: Configure BackEnd Service

1. Setelah project dibuat, klik **"Settings"**
2. Scroll ke **"Service Settings"**
3. Set **Root Directory**: `BackEnd`
4. Set **Start Command**: `npm start`
5. Klik **"Save"**

### Step 2.4: Add Environment Variables

1. Klik tab **"Variables"**
2. Klik **"New Variable"** dan tambahkan satu per satu:

```
DATABASE_URL=<paste connection string dari Supabase>
JWT_SECRET=peduli-sehat-secret-key-2025-production
NODE_ENV=production
PORT=8081
```

**CATATAN**: `FRONTEND_URL` akan ditambahkan nanti setelah deploy Vercel

3. Klik **"Deploy"** (Railway akan auto-deploy)

### Step 2.5: Get BackEnd URL

1. Tunggu deployment selesai (~2-3 menit)
2. Klik tab **"Settings"**
3. Scroll ke **"Domains"**
4. Klik **"Generate Domain"**
5. Copy URL yang digenerate (format: `https://xxx.up.railway.app`)
6. **SIMPAN URL INI** - akan digunakan untuk FrontEnd

### Step 2.6: Test BackEnd

Buka browser dan test endpoint:
```
https://your-backend.up.railway.app/is-logged-in
```

Anda harus melihat response JSON (meskipun error karena belum login, ini normal).

✅ **Checklist:**
- [ ] Railway account created
- [ ] BackEnd service deployed
- [ ] Environment variables configured
- [ ] BackEnd URL obtained dan disimpan
- [ ] Test endpoint berhasil

---

## Phase 3: Deploy ML Server to Railway 🤖

### Step 3.1: Add ML Service to Same Project

1. Di Railway project yang sama, klik **"New"**
2. Pilih **"GitHub Repo"**
3. Pilih repository yang sama: `sebastianCodeNew/Capstone-Projek-PeduliSehat`
4. Railway akan membuat service baru

### Step 3.2: Configure ML Service

1. Klik service yang baru dibuat
2. Klik **"Settings"**
3. Set **Root Directory**: `ML`
4. Set **Start Command**: `npm start`
5. Klik **"Save"**

### Step 3.3: Add Environment Variables for ML

1. Klik tab **"Variables"**
2. Tambahkan:

```
NODE_ENV=production
PORT=3000
```

**CATATAN**: `FRONTEND_URL` akan ditambahkan nanti

### Step 3.4: Get ML Server URL

1. Tunggu deployment selesai
2. Klik **"Settings"** → **"Domains"**
3. Klik **"Generate Domain"**
4. Copy URL (format: `https://xxx.up.railway.app`)
5. **SIMPAN URL INI**

### Step 3.5: Test ML Server

Test symptoms endpoint:
```
https://your-ml.up.railway.app/symptoms
```

Anda harus melihat JSON array dengan daftar gejala.

✅ **Checklist:**
- [ ] ML service deployed
- [ ] Environment variables configured
- [ ] ML URL obtained dan disimpan
- [ ] Symptoms endpoint berhasil

---

## Phase 4: Deploy FrontEnd to Vercel 🌐

### Step 4.1: Create Vercel Account

1. Buka https://vercel.com
2. Klik **"Sign Up"**
3. Sign up dengan GitHub account
4. Authorize Vercel

### Step 4.2: Import Project

1. Klik **"Add New..."** → **"Project"**
2. Import repository: `sebastianCodeNew/Capstone-Projek-PeduliSehat`
3. Klik **"Import"**

### Step 4.3: Configure Build Settings

1. **Framework Preset**: Vite (auto-detected)
2. **Root Directory**: Klik **"Edit"** → pilih `FrontEnd`
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `dist` (default)
5. **Install Command**: `npm install` (default)

### Step 4.4: Add Environment Variables

Klik **"Environment Variables"** dan tambahkan:

```
VITE_BACKEND_URL=<paste BackEnd Railway URL dari Phase 2>
VITE_ML_URL=<paste ML Railway URL dari Phase 3>
```

**Contoh:**
```
VITE_BACKEND_URL=https://backend-production-abc123.up.railway.app
VITE_ML_URL=https://ml-production-xyz789.up.railway.app
```

### Step 4.5: Deploy

1. Klik **"Deploy"**
2. Tunggu build selesai (~2-3 menit)
3. Setelah selesai, Vercel akan memberikan URL production
4. Copy URL Vercel Anda (format: `https://xxx.vercel.app`)

✅ **Checklist:**
- [ ] Vercel account created
- [ ] FrontEnd deployed
- [ ] Environment variables configured
- [ ] Vercel URL obtained

---

## Phase 5: Update CORS & Final Configuration 🔧

### Step 5.1: Update BackEnd CORS

1. Kembali ke Railway → BackEnd service
2. Klik **"Variables"**
3. Tambahkan variable baru:

```
FRONTEND_URL=<paste Vercel URL dari Phase 4>
```

4. Service akan auto-redeploy

### Step 5.2: Update ML Server CORS

1. Railway → ML service
2. Klik **"Variables"**
3. Tambahkan:

```
FRONTEND_URL=<paste Vercel URL dari Phase 4>
```

4. Service akan auto-redeploy

### Step 5.3: Wait for Redeployment

Tunggu ~1-2 menit untuk kedua service redeploy dengan CORS settings yang baru.

---

## Phase 6: Testing Complete Flow 🧪

### Test 1: Registration

1. Buka Vercel URL Anda
2. Klik **"Register"** atau **"Daftar"**
3. Isi form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123`
4. Klik Submit
5. ✅ Harus berhasil dan redirect ke login

### Test 2: Login

1. Login dengan credentials yang baru dibuat
2. ✅ Harus berhasil dan redirect ke dashboard/home

### Test 3: Disease Detection

1. Pilih beberapa gejala dari dropdown
2. Klik **"Deteksi"** atau **"Predict"**
3. ✅ Harus muncul hasil prediksi penyakit

### Test 4: History

1. Navigate ke halaman **"History"** atau **"Riwayat"**
2. ✅ Harus melihat hasil deteksi yang baru saja dilakukan

---

## 🎉 Deployment Complete!

Selamat! Aplikasi Peduli Sehat Anda sudah live di production!

### Your Production URLs:

- **FrontEnd**: `https://your-app.vercel.app`
- **BackEnd API**: `https://your-backend.up.railway.app`
- **ML Server**: `https://your-ml.up.railway.app`
- **Database**: Supabase (managed)

### Free Tier Limits:

- **Vercel**: Unlimited bandwidth, 100GB bandwidth/month
- **Railway**: 500 hours/month, $5 credit
- **Supabase**: 500MB database, 2GB bandwidth

---

## 🔧 Troubleshooting

### Issue: CORS Error

**Solution**: Pastikan `FRONTEND_URL` sudah diset di BackEnd dan ML environment variables.

### Issue: Database Connection Failed

**Solution**: 
1. Check connection string di Railway BackEnd variables
2. Pastikan password benar (tidak ada karakter special yang perlu di-encode)
3. Test connection di Supabase SQL Editor

### Issue: ML Prediction Failed

**Solution**:
1. Check Railway ML logs: Railway → ML Service → **"Deployments"** → klik latest deployment → **"View Logs"**
2. Pastikan Python dependencies terinstall
3. Verify model files ada di repository

### Issue: Build Failed on Vercel

**Solution**:
1. Check build logs di Vercel
2. Pastikan `VITE_BACKEND_URL` dan `VITE_ML_URL` sudah diset
3. Verify root directory = `FrontEnd`

---

## 📝 Notes

- Semua services akan auto-deploy saat Anda push ke GitHub branch `main`
- Railway free tier: 500 jam/bulan (cukup untuk 1 app 24/7)
- Jika Railway hours habis, app akan sleep. Upgrade ke $5/month untuk unlimited hours
- Supabase free tier sangat generous untuk development/small apps

---

**Need Help?** Check Railway logs atau Vercel deployment logs untuk error details.
