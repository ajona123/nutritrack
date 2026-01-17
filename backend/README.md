# Backend - WebGIS MBG System

Backend untuk sistem WebGIS MBG menggunakan **Go + Gin Framework**.

## 📁 Struktur Folder

```
backend/
├── main/
│   └── main.go           # Entry point aplikasi
├── handlers/             # API handlers/controllers
├── models/               # Data models
├── middleware/           # Custom middleware
├── config/               # Konfigurasi
├── utils/                # Utility functions
├── go.mod
├── go.sum
└── README.md
```

## 🚀 Setup & Run

### 1. Install Dependencies

```bash
cd backend
go mod tidy
go get github.com/gin-gonic/gin
go get github.com/gin-contrib/cors
```

### 2. Run Backend

```bash
cd backend/main
go run main.go
```

Backend akan berjalan di: `http://localhost:8080`

### 3. Test API

```bash
# Health check
curl http://localhost:8080/api/health

# Get Sekolah List
curl http://localhost:8080/api/v1/sekolah

# Get SPPG List
curl http://localhost:8080/api/v1/sppg

# Get Dashboard Stats
curl http://localhost:8080/api/v1/dashboard/stats
```

## 📡 API Endpoints

### Sekolah Endpoints
- `GET /api/v1/sekolah` - Get all sekolah
- `POST /api/v1/sekolah` - Create sekolah
- `GET /api/v1/sekolah/:id` - Get sekolah by ID
- `PUT /api/v1/sekolah/:id` - Update sekolah
- `DELETE /api/v1/sekolah/:id` - Delete sekolah

### SPPG Endpoints
- `GET /api/v1/sppg` - Get all SPPG
- `POST /api/v1/sppg` - Create SPPG
- `GET /api/v1/sppg/:id` - Get SPPG by ID
- `PUT /api/v1/sppg/:id` - Update SPPG
- `DELETE /api/v1/sppg/:id` - Delete SPPG

### Dashboard Endpoints
- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/charts` - Get dashboard charts data

## 🔗 Frontend Integration

Frontend (React) akan connect ke backend di:
```
http://localhost:8080
```

Pastikan CORS sudah enabled (sudah di-setup di main.go).

## 📦 Next Steps

1. Implementasi handlers dengan business logic
2. Setup database connection (PostgreSQL/MySQL)
3. Implementasi database models dengan GORM
4. Lengkapi error handling
5. Add input validation
