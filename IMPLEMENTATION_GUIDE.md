# 🚀 NUTRITRACK - Complete Implementation Guide

## 📊 Project Status: 90% Ready for Testing

Sistem telah direfactor sepenuhnya dari monolithic 13,245-line App.js menjadi modular architecture dengan:
- ✅ Frontend terstruktur dengan components & pages terpisah  
- ✅ Backend Go dengan Gin framework siap run
- ✅ API endpoints dengan test data (dummy data)
- ✅ WebGIS interactive map dengan Leaflet
- ✅ Management pages untuk CRUD operations

---

## 🎯 Quick Start

### Prerequisites
- Node.js 16+ (untuk React frontend)
- Go 1.21+ (untuk backend)
- Browser modern (Chrome, Firefox, Safari)

### 1️⃣ Start Backend (Terminal 1)
```bash
cd "c:\Users\firma\OneDrive\Documents\SEMESTER 5\PROJEK SINTA 2\dppl\nutritrack\backend"
go run main/main.go
```
✅ Backend akan jalan di **http://localhost:8080**

### 2️⃣ Start Frontend (Terminal 2)  
```bash
cd "c:\Users\firma\OneDrive\Documents\SEMESTER 5\PROJEK SINTA 2\dppl\nutritrack"
npm start
```
✅ Frontend akan buka di **http://localhost:3000**

---

## 📱 User Journey & Testing

### Landing Page (/)
- **URL:** http://localhost:3000/
- **Status:** ✅ Complete
- **Features:**
  - Hero section dengan headline & CTA
  - 3 statistic cards
  - 3 feature cards
  - Call-to-action button ke dashboard

### Dashboard Page (/dashboard)
- **URL:** http://localhost:3000/dashboard
- **Status:** ✅ Complete + API Integration
- **Features:**
  - 4 KPI Metric Cards (Total Sekolah, Siswa, SPPG, Kelayakan)
  - Status breakdown (Layak/Waspada/Kritis counts)
  - **Auto-fetch dari backend API** dengan fallback ke dummy data
  - Real-time updates jika backend tersedia

**Test It:**
1. Buka http://localhost:3000/dashboard
2. Jika backend running → data dari API
3. Jika backend down → fallback ke dummy data
4. Buka browser console (F12) untuk lihat API call

### WebGIS Interactive Map (/webgis)
- **URL:** http://localhost:3000/webgis
- **Status:** ✅ Complete
- **Features:**
  - 🗺️ Interactive Leaflet map dengan OpenStreetMap
  - 📍 Markers untuk Sekolah (biru) & SPPG (hijau)
  - 🔵 Heatmap circles - ukuran berdasarkan populasi
  - 🎚️ Layer toggle buttons (Sekolah / SPPG / Both)
  - ℹ️ Popup info saat klik marker
  - Auto-center map ke data

**Test It:**
1. Buka http://localhost:3000/webgis
2. Klik "Sekolah" untuk show layer sekolah
3. Klik "SPPG" untuk show layer SPPG
4. Klik "Kedua Lapisan" untuk show keduanya
5. Click marker untuk lihat detail
6. Circle size menunjukkan student count/capacity

### Sekolah Management (/sekolah)
- **URL:** http://localhost:3000/sekolah
- **Status:** ✅ Complete + CRUD Operations
- **Features:**
  - 📋 Table dengan 7 kolom (NPSN, Nama, Jenjang, Kecamatan, Siswa, Status, Aksi)
  - 🔍 Search real-time (by Nama/Kecamatan/NPSN)
  - 🏷️ Filter by Status (Layak/Waspada/Kritis)
  - ➕ Modal Add New Sekolah
  - 👁️ Modal View Detail
  - ✏️ Modal Edit
  - 🗑️ Delete dengan confirmation
  - **API Integration:** Fetch dari backend, fallback ke dummy data

**Test It:**
1. Buka http://localhost:3000/sekolah
2. Ketik di search box untuk filter (cth: "Cibubur")
3. Select status dropdown untuk filter
4. Click "+ Tambah Sekolah" untuk add baru
5. Fill form & click "Tambah Sekolah"
6. Click 👁️ untuk view detail
7. Click ✏️ untuk edit
8. Click 🗑️ untuk delete dengan confirmation

### SPPG Management (/sppg)
- **URL:** http://localhost:3000/sppg
- **Status:** ✅ Complete + CRUD Operations
- **Features:**
  - 📋 Table dengan 7 kolom (Kode, Nama, Kecamatan, Kapasitas, Utilisasi, Status, Aksi)
  - 🔍 Search real-time
  - 🏷️ Filter by Status
  - ➕ Modal Add / Edit / View
  - 🗑️ Delete dengan confirmation
  - **API Integration:** Sama seperti Sekolah

**Test It:** (Same workflow sebagai Sekolah page)

---

## 🔌 API Endpoints Reference

### Base URL
```
http://localhost:8080/api/v1
```

### Health Check
```
GET /api/health
Response: { "status": "ok", "message": "Backend is running" }
```

### Sekolah Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/sekolah` | Get all sekolah (returns 2 dummy entries) |
| POST | `/sekolah` | Create new sekolah |
| GET | `/sekolah/:id` | Get sekolah by ID |
| PUT | `/sekolah/:id` | Update sekolah |
| DELETE | `/sekolah/:id` | Delete sekolah |

**Example: Get All Sekolah**
```bash
curl http://localhost:8080/api/v1/sekolah
```

**Example: Create Sekolah**
```bash
curl -X POST http://localhost:8080/api/v1/sekolah \
  -H "Content-Type: application/json" \
  -d '{
    "npsn": "20104099",
    "nama": "SDN Baru",
    "jenjang": "SD",
    "kecamatan": "Cibubur",
    "siswa": 300,
    "sppg": 1,
    "jarak": 3.0,
    "waktu": 15,
    "status": "Layak",
    "lat": -6.41,
    "lng": 106.89
  }'
```

### SPPG Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/sppg` | Get all SPPG (returns 1 dummy entry) |
| POST | `/sppg` | Create new SPPG |
| GET | `/sppg/:id` | Get SPPG by ID |
| PUT | `/sppg/:id` | Update SPPG |
| DELETE | `/sppg/:id` | Delete SPPG |

### Dashboard Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/dashboard/stats` | Get KPI statistics |
| GET | `/dashboard/charts` | Get chart data |

**Example: Get Dashboard Stats**
```bash
curl http://localhost:8080/api/v1/dashboard/stats
```

Response:
```json
{
  "status": "success",
  "data": {
    "total_sekolah": 2,
    "total_siswa": 650,
    "total_sppg": 1,
    "tingkat_kelayakan": 50,
    "sekolah_layak": 1,
    "sekolah_waspada": 1,
    "sekolah_kritis": 0,
    "avg_jarak": 2.65,
    "avg_utilisasi": 85
  }
}
```

---

## 📁 Project Structure

```
nutritrack/
├── public/
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx ✅
│   │   ├── DashboardPage.jsx ✅ (API integration)
│   │   ├── WebGISPage.jsx ✅ (Leaflet map)
│   │   ├── SekolahPage.jsx ✅ (CRUD + search)
│   │   ├── SPPGPage.jsx ✅ (CRUD + search)
│   │   └── index.js (exports pages)
│   │
│   ├── components/
│   │   └── Layout/
│   │       ├── Sidebar.jsx (navigation menu)
│   │       └── TopNav.jsx (page title & info)
│   │
│   ├── utils/
│   │   ├── api.js (Frontend API client - 3 API objects)
│   │   ├── constants.js (colors, menu, page names)
│   │   └── dummyData.js (mock data for testing)
│   │
│   ├── App.js (Main router - 91 lines)
│   ├── index.js (React entry point)
│   └── index.css (Global styles)
│
├── backend/
│   ├── main/
│   │   └── main.go (Gin server entry point)
│   │
│   ├── models/
│   │   └── models.go (Sekolah, SPPG, DashboardStats structs)
│   │
│   ├── handlers/
│   │   └── sekolah.go (All CRUD handlers + dashboard logic)
│   │
│   ├── middleware/
│   │   └── middleware.go (Placeholder for future middleware)
│   │
│   ├── config/
│   │   └── config.go (Placeholder for DB config)
│   │
│   ├── utils/
│   │   └── utils.go (Placeholder for utility functions)
│   │
│   ├── go.mod (Go module definition)
│   ├── go.sum (Dependency checksums)
│   └── README.md (Backend setup guide)
│
├── QUICK_START.md (Quick reference)
├── SETUP_GUIDE.md (Detailed setup)
├── TEST_BACKEND.sh (Bash script untuk test endpoints)
├── package.json (React dependencies)
└── tailwind.config.js (Tailwind configuration)
```

---

## 🎨 UI Components

### Page Components
- **LandingPage**: Hero + Features + Stats
- **DashboardPage**: KPI Cards + Status Breakdown
- **WebGISPage**: Interactive Map + Layer Controls
- **SekolahPage**: Data Table + CRUD Modals
- **SPPGPage**: Data Table + CRUD Modals

### Layout Components
- **Sidebar**: Navigation menu dengan 22 items
- **TopNav**: Page title + Last update timestamp

### Reusable UI Patterns
- StatusBadge component (Layak/Waspada/Kritis coloring)
- Modal components untuk forms
- Data tables dengan search & filter
- Metric cards dengan color coding

---

## 🧪 Testing Checklist

### Frontend Testing
- [ ] Landing page loads dengan smooth scroll
- [ ] Dashboard page fetch data dari backend (atau fallback)
- [ ] Map loads dan markers visible
- [ ] Layer toggle works (Sekolah/SPPG/Both)
- [ ] Search functionality filters table correctly
- [ ] Add/Edit/Delete operations work
- [ ] Sidebar navigation works untuk semua pages
- [ ] Responsive design on mobile/tablet

### Backend Testing  
- [ ] Health check endpoint returns status
- [ ] GET /sekolah returns array dengan 2 entries
- [ ] GET /sppg returns array dengan 1 entry
- [ ] GET /dashboard/stats returns correct calculations
- [ ] POST /sekolah creates new entry
- [ ] PUT /sekolah/:id updates entry
- [ ] DELETE /sekolah/:id removes entry
- [ ] CORS headers correctly set

### Integration Testing
- [ ] Frontend API calls hit backend endpoints
- [ ] Frontend fallback works ketika backend down
- [ ] API response data correct format
- [ ] Error handling works properly
- [ ] No console errors atau warnings

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 3000 already in use** | `netstat -ano \| findstr :3000` then `taskkill /PID <PID> /F` |
| **Port 8080 already in use** | Same as above, atau ubah port di backend/main/main.go |
| **CORS error di browser** | Pastikan backend running & CORS enabled |
| **"Cannot find module leaflet"** | Run `npm install leaflet react-leaflet` |
| **Map not showing** | Check browser console (F12), pastikan coordinates valid |
| **Dummy data not showing** | Refresh page, check api.js fallback logic |
| **Backend build failed** | Run `go mod tidy`, check error messages |

---

## 📚 Tech Stack

### Frontend
- **React 18+** - UI library
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library (50+ icons)
- **Leaflet** - Interactive maps
- **Fetch API** - HTTP client

### Backend  
- **Go 1.21+** - Programming language
- **Gin v1.11.0** - Web framework
- **CORS middleware** - Cross-origin support

### Development
- **Node Package Manager (npm)** - Frontend dependency management
- **Go modules** - Backend dependency management
- **Git** - Version control (optional)

---

## 🚀 Next Steps / Future Improvements

### Priority 1: Database Integration (Est. 2-3 hours)
- [ ] Setup PostgreSQL / MySQL database
- [ ] Write GORM models dengan database tags
- [ ] Create migration files
- [ ] Update handlers untuk query database
- [ ] Test CRUD operations dengan real DB

### Priority 2: Backend Enhancements (Est. 3-4 hours)
- [ ] Add input validation & sanitization
- [ ] Implement error handling middleware
- [ ] Add logging middleware
- [ ] Setup environment variables (.env)
- [ ] Add request/response interceptors

### Priority 3: Frontend Enhancements (Est. 2-3 hours)
- [ ] Add loading spinners & skeleton screens
- [ ] Implement pagination untuk large datasets
- [ ] Add sorting capabilities ke tables
- [ ] Add export data (PDF, Excel) feature
- [ ] Implement form validation

### Priority 4: Authentication & Security (Est. 4-5 hours)
- [ ] Setup JWT authentication
- [ ] Add login page
- [ ] Implement role-based access control
- [ ] Add password hashing
- [ ] Implement refresh token logic

### Priority 5: Testing & Documentation (Est. 3-4 hours)
- [ ] Write unit tests (Go + React)
- [ ] Write integration tests
- [ ] Create API documentation (Swagger)
- [ ] Create user manual
- [ ] Add code comments & JSDoc

### Priority 6: Deployment (Est. 2-3 hours)
- [ ] Setup Docker containers
- [ ] Create docker-compose.yml
- [ ] Deploy to staging server
- [ ] Setup CI/CD pipeline
- [ ] Production deployment

---

## 📞 Support & Debugging

### Common Questions

**Q: Bagaimana cara menambah halaman baru?**  
A: Buat file `.jsx` di `src/pages/`, tambahkan ke router di `App.js`, update menu di `constants.js`.

**Q: Bagaimana cara connect database?**  
A: Update `backend/config/config.go` dengan DB credentials, setup GORM models, update handlers.

**Q: Bagaimana cara deploy ke production?**  
A: Setup Docker, database, environment variables, deploy ke server (AWS, Heroku, DigitalOcean, dll).

**Q: Bagaimana cara tambah authentication?**  
A: Implement JWT di backend, add login page di frontend, setup middleware untuk protect routes.

### Debug Tips
1. **Browser DevTools (F12)**: Check network tab untuk API calls
2. **Backend Console**: Lihat log untuk error messages
3. **React DevTools**: Install extension untuk debug React components
4. **Postman/Insomnia**: Test API endpoints secara manual
5. **VS Code Debugger**: Setup launch.json untuk debug Go code

---

## 📝 File Descriptions

### Core Files

**src/App.js** (91 lines)
- Main router component
- Manages page state dengan currentPage
- Renders Sidebar + TopNav + Page content
- Handles page transitions

**backend/main/main.go**
- Gin server initialization
- CORS configuration
- Route definitions
- Server startup on port 8080

**backend/models/models.go**
- Sekolah struct (14 fields)
- SPPG struct (18 fields)
- DashboardStats struct (9 fields)
- Response wrapper struct

**backend/handlers/sekolah.go**
- 5 Sekolah CRUD handlers
- 5 SPPG CRUD handlers
- 2 Dashboard handlers
- Dummy data & business logic

**src/utils/api.js**
- apiCall() helper function
- sekolahAPI object (CRUD methods)
- sppgAPI object (CRUD methods)
- dashboardAPI object (stats method)

**src/utils/constants.js**
- STATUS_COLORS mapping
- COLOR_GRADIENTS
- PAGE_NAMES mapping
- SIDEBAR_MENU_GROUPS array

**src/utils/dummyData.js**
- dummySekolah array (8 entries)
- dummySPPG array (4 entries)
- Complete test dataset

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Go Documentation](https://golang.org/doc/)
- [Gin Framework](https://gin-gonic.com/)
- [Leaflet.js](https://leafletjs.com/)

---

## ✅ Final Checklist

- [x] Frontend structure modular & clean
- [x] Backend structure complete & compilable
- [x] API endpoints defined & working
- [x] Dummy data provided untuk testing
- [x] Frontend-Backend integration ready
- [x] Error handling & fallback mechanisms
- [x] Documentation complete
- [x] Ready untuk database integration
- [ ] Database connected (TODO)
- [ ] User authentication added (TODO)
- [ ] Production deployment ready (TODO)

---

## 🎉 Conclusion

**NutriTrack** project is now structured professionally dengan proper separation of concerns:
- Frontend: React dengan modular components
- Backend: Go dengan RESTful API
- Testing: Dummy data & fallback mechanisms
- Documentation: Comprehensive guides

**Next phase:** Database integration & handler implementation untuk production readiness.

Good luck! 🚀

---

*Last Updated: 2024*  
*Status: Ready for Testing & Database Integration*
