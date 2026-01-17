# 🎯 NUTRITRACK - Start Here!

## ⚡ Fastest Way to Test

### Terminal 1: Start Backend
```powershell
cd "c:\Users\firma\OneDrive\Documents\SEMESTER 5\PROJEK SINTA 2\dppl\nutritrack\backend"
go run main/main.go
```

### Terminal 2: Start Frontend
```powershell
cd "c:\Users\firma\OneDrive\Documents\SEMESTER 5\PROJEK SINTA 2\dppl\nutritrack"
npm start
```

**Wait for browser to open at http://localhost:3000** ✅

---

## 🗺️ Navigation

| Page | URL | What to Test |
|------|-----|--------------|
| 🏠 Landing | http://localhost:3000 | Hero + Features |
| 📊 Dashboard | http://localhost:3000/dashboard | KPI Cards + API fetch |
| 🗺️ WebGIS | http://localhost:3000/webgis | Interactive map |
| 🏫 Sekolah | http://localhost:3000/sekolah | Table CRUD + search |
| 🏢 SPPG | http://localhost:3000/sppg | Table CRUD + search |

---

## ✨ Key Features Implemented

✅ **Frontend**
- React modular structure (pages + components)
- Dashboard dengan API integration
- Interactive Leaflet map
- CRUD tables dengan search & filter
- Responsive design dengan Tailwind CSS

✅ **Backend**
- Go + Gin framework
- 10+ API endpoints
- Dummy data untuk testing
- CORS enabled untuk frontend

✅ **Integration**
- Frontend ↔ Backend API calls
- Fallback ke dummy data jika backend down
- Error handling & loading states

---

## 🧪 Quick Test Cases

### Test 1: Check Frontend
1. Open http://localhost:3000
2. Navigate ke semua pages (gunakan sidebar)
3. Verify UI renders correctly

### Test 2: Check Backend
1. Open terminal & run:
```bash
curl http://localhost:8080/api/health
curl http://localhost:8080/api/v1/sekolah
curl http://localhost:8080/api/v1/dashboard/stats
```

### Test 3: Check Map
1. Go to http://localhost:3000/webgis
2. See markers di map
3. Click markers untuk lihat info
4. Toggle layers (Sekolah/SPPG)

### Test 4: Check CRUD
1. Go to http://localhost:3000/sekolah
2. Try search, filter, add, edit, delete

---

## 📚 Documentation Files

- **QUICK_START.md** - Quick reference
- **IMPLEMENTATION_GUIDE.md** - Comprehensive guide (THIS FILE)
- **backend/README.md** - Backend setup details

---

## ⚠️ Common Issues

| Issue | Fix |
|-------|-----|
| **npm start fails** | Run `npm install` first |
| **go run fails** | Check Go is installed (`go version`) |
| **Port 3000 in use** | Kill process: `taskkill /PID <PID> /F` |
| **Map not showing** | Refresh page, check browser console (F12) |

---

## 🎓 What's Built

### Frontend (src/)
- **pages/**: LandingPage, DashboardPage, WebGISPage, SekolahPage, SPPGPage
- **components/Layout/**: Sidebar, TopNav
- **utils/**: api.js (API client), constants.js, dummyData.js

### Backend (backend/)
- **main/main.go**: Gin server + routes
- **models/models.go**: Sekolah, SPPG, DashboardStats structs
- **handlers/sekolah.go**: All CRUD operations + business logic

---

## 🚀 Next: Database Integration

Untuk connect database (SQL):
1. Setup PostgreSQL/MySQL
2. Update backend/config/config.go
3. Implement GORM models
4. Update handlers untuk query database
5. Test dengan real data

---

## 💬 Remember

- Frontend runs at **http://localhost:3000**
- Backend API at **http://localhost:8080/api/v1**
- Dummy data ada di `src/utils/dummyData.js`
- API helper di `src/utils/api.js`

---

**Ready? Let's go!** 🚀

Start both terminals & open http://localhost:3000 - you'll see the NutriTrack dashboard! 

For more details, see **IMPLEMENTATION_GUIDE.md**
