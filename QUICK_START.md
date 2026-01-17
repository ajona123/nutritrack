# NUTRITRACK - Quick Start Guide

## 📋 Status Implementasi

### ✅ Selesai
- [x] Frontend Structure - Modular components & pages
- [x] React Router - Navigasi halaman
- [x] Dashboard Page - KPI metrics dengan API integration
- [x] WebGIS Page - Peta interaktif dengan Leaflet & OpenStreetMap
- [x] Sekolah Management - CRUD table dengan search & filter
- [x] SPPG Management - CRUD table dengan search & filter  
- [x] Landing Page - Hero section dengan statistik
- [x] Backend Structure - Go + Gin Framework
- [x] API Contracts - 10 endpoints defined
- [x] Dummy Data - Complete test data

### 🚀 Siap Testing

## 🎯 Mulai di Sini

### 1. **Mulai Frontend (React)**
```bash
cd c:\Users\firma\OneDrive\Documents\SEMESTER 5\PROJEK SINTA 2\dppl\nutritrack
npm start
```
Akan buka di **http://localhost:3000**

### 2. **Mulai Backend (Go)**
```bash
cd c:\Users\firma\OneDrive\Documents\SEMESTER 5\PROJEK SINTA 2\dppl\nutritrack\backend
go run main/main.go
```
Backend akan jalan di **http://localhost:8080**

---

## 🗺️ Navigasi Halaman

### Halaman Utama
| Halaman | URL | Status | Fitur |
|---------|-----|--------|-------|
| **Landing** | / | ✅ Done | Hero section, stats, features |
| **Dashboard** | /dashboard | ✅ Done | KPI metrics, API integration |
| **WebGIS** | /webgis | ✅ Done | Peta Leaflet, layer toggle |
| **Sekolah** | /sekolah | ✅ Done | Table CRUD, search, filter |
| **SPPG** | /sppg | ✅ Done | Table CRUD, search, filter |

### Halaman Lain (Placeholder)
- Laporan Bulanan
- Analisis Kelayakan
- Rekomendasi
- Settings, dll

---

## 🎨 UI/UX Features

### Dashboard Page
- 📊 4 KPI Cards (Total Sekolah, Siswa, SPPG, Tingkat Kelayakan)
- 📈 Status breakdown (Layak, Waspada, Kritis)
- 🔄 Auto-fetch dari backend API
- ⚠️ Fallback ke dummy data jika backend down

### WebGIS Page
- 🗺️ Interactive map dengan Leaflet + OpenStreetMap
- 📍 Markers untuk Sekolah (biru) & SPPG (hijau)
- 🔵 Heatmap circles - ukuran berdasarkan jumlah siswa
- 🎚️ Layer toggle (Sekolah / SPPG / Both)
- ℹ️ Popup info saat klik marker

### Sekolah Management
- 📋 Table dengan kolom: NPSN, Nama, Jenjang, Kecamatan, Siswa, Status
- 🔍 Search real-time
- 🏷️ Filter by Status
- ➕ Modal add new sekolah
- 👁️ Modal view detail
- ✏️ Modal edit  
- 🗑️ Delete dengan confirmation

### SPPG Management
- 📋 Table dengan kolom: Kode, Nama, Kecamatan, Kapasitas, Utilisasi, Status
- 🔍 Search real-time
- 🏷️ Filter by Status
- ➕ Modal add new SPPG
- 👁️ Modal view detail
- ✏️ Modal edit
- 🗑️ Delete dengan confirmation

---

## 🔌 API Integration

### Testing Endpoints

#### 1. Health Check
```bash
curl http://localhost:8080/api/health
```
Response: `{"status":"ok","message":"Server running"}`

#### 2. Get All Sekolah
```bash
curl http://localhost:8080/api/v1/sekolah
```

#### 3. Get All SPPG
```bash
curl http://localhost:8080/api/v1/sppg
```

#### 4. Get Dashboard Stats
```bash
curl http://localhost:8080/api/v1/dashboard/stats
```

**Note:** Backend saat ini return empty objects. Data akan di-implement setelah database setup.

---

## 📁 Project Structure

```
nutritrack/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx ✅
│   │   ├── DashboardPage.jsx ✅
│   │   ├── WebGISPage.jsx ✅ NEW
│   │   ├── SekolahPage.jsx ✅ NEW
│   │   ├── SPPGPage.jsx ✅ NEW
│   │   └── index.js
│   ├── components/
│   │   └── Layout/
│   │       ├── Sidebar.jsx
│   │       └── TopNav.jsx
│   ├── utils/
│   │   ├── api.js (Frontend API client)
│   │   ├── constants.js
│   │   └── dummyData.js
│   └── App.js (Router only - 91 lines)
│
└── backend/
    ├── main/
    │   └── main.go (Gin server with CORS)
    ├── models/
    │   └── models.go (Sekolah, SPPG, DashboardStats)
    ├── handlers/ 📋 (TODO: implement)
    ├── middleware/ 📋 (TODO: implement)
    ├── config/ 📋 (TODO: implement)
    ├── utils/ 📋 (TODO: implement)
    ├── go.mod
    └── go.sum
```

---

## 🎮 Interaction Examples

### Example 1: View Sekolah on Map
1. Open http://localhost:3000/webgis
2. Click "Sekolah" button untuk show layer sekolah
3. Click marker untuk lihat info
4. Circle size menunjukkan student population

### Example 2: Add New Sekolah
1. Go to http://localhost:3000/sekolah
2. Click "+ Tambah Sekolah" button
3. Fill form: NPSN, Nama, Jenjang, Kecamatan, Siswa
4. Click "Tambah Sekolah"
5. New sekolah akan muncul di table

### Example 3: Search & Filter
1. Go to http://localhost:3000/sekolah
2. Type di search bar untuk filter by name/kecamatan
3. Select dropdown untuk filter by status (Layak/Waspada/Kritis)
4. Table otomatis update

### Example 4: Dashboard dengan Real Data
1. Go to http://localhost:3000/dashboard
2. Akan fetch dari backend API
3. Jika backend down → fallback ke dummy data
4. Metrics update automatically

---

## 🔧 Troubleshooting

### ❌ "Cannot find module 'leaflet'"
```bash
npm install leaflet react-leaflet
```

### ❌ "Port 3000 already in use"
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ "Backend not responding"
Pastikan Go backend running:
```bash
cd backend
go run main/main.go
```

### ❌ "CORS error"
Backend sudah enable CORS untuk `localhost:3000`. Pastikan backend running.

---

## 🚀 Next Steps

### Priority 1: Database Setup
- [ ] Setup PostgreSQL / MySQL
- [ ] Write GORM models
- [ ] Create migrations
- [ ] Update handlers to query database

### Priority 2: Implement Handlers
- [ ] handlers/sekolah.go (GetAll, GetById, Create, Update, Delete)
- [ ] handlers/sppg.go (same CRUD)
- [ ] handlers/dashboard.go (stats aggregation)

### Priority 3: Frontend Pages
- [ ] Map integration complete with real data
- [ ] Sekolah page fetch real data
- [ ] SPPG page fetch real data

### Priority 4: Additional Features
- [ ] Authentication
- [ ] Advanced filtering & sorting
- [ ] Export data (PDF, Excel)
- [ ] Real-time notifications

---

## 📚 Tech Stack

**Frontend:**
- React 18+ (Hooks)
- Tailwind CSS
- Lucide React (Icons)
- Leaflet + React-Leaflet (Maps)
- Fetch API (HTTP calls)

**Backend:**
- Go 1.21+
- Gin v1.11.0 (Web framework)
- CORS middleware
- (TODO: PostgreSQL, GORM)

---

## 📞 Support

Jika ada masalah atau pertanyaan, refer ke dokumentasi:
- [Backend README](./backend/README.md)
- [Frontend Components](./src/components/)
- [API Helper](./src/utils/api.js)

Good luck! 🚀
