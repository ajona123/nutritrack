package models

import "time"

// Sekolah model untuk database
type Sekolah struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	NPSN      string    `json:"npsn" gorm:"uniqueIndex"`
	Nama      string    `json:"nama" gorm:"index"`
	Jenjang   string    `json:"jenjang"`
	Kecamatan string    `json:"kecamatan" gorm:"index"`
	Siswa     int       `json:"siswa"`
	SPPG      int       `json:"sppg"`
	Jarak     float64   `json:"jarak"`
	Waktu     int       `json:"waktu"` // minutes
	Status    string    `json:"status"` // layak, waspada, kritis
	Lat       float64   `json:"lat"`
	Lng       float64   `json:"lng"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// TableName specify table name for GORM
func (Sekolah) TableName() string {
	return "sekolah"
}

// SPPG model untuk database
type SPPG struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	Kode            string    `json:"kode" gorm:"uniqueIndex"`
	Nama            string    `json:"nama" gorm:"index"`
	Kecamatan       string    `json:"kecamatan" gorm:"index"`
	Alamat          string    `json:"alamat"`
	Kapasitas       int       `json:"kapasitas"`
	ProduksiHarian  int       `json:"produksi_harian"`
	SekolahDilayani int       `json:"sekolah_dilayani"`
	TotalSiswa      int       `json:"total_siswa"`
	Pekerja         int       `json:"pekerja"`
	Status          string    `json:"status"` // operasional, maintenance
	Utilisasi       float64   `json:"utilisasi"`
	Lat             float64   `json:"lat"`
	Lng             float64   `json:"lng"`
	Surplus         int       `json:"surplus"`
	JamOperasional  string    `json:"jam_operasional"`
	Fasilitas       string    `json:"fasilitas" gorm:"type:text"`
	Sertifikat      string    `json:"sertifikat" gorm:"type:text"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// TableName specify table name for GORM
func (SPPG) TableName() string {
	return "sppg"
}

// DashboardStats model
type DashboardStats struct {
	TotalSekolah     int     `json:"total_sekolah"`
	TotalSiswa       int     `json:"total_siswa"`
	TotalSPPG        int     `json:"total_sppg"`
	TingkatKelayakan float64 `json:"tingkat_kelayakan"`
	SekolahLayak     int     `json:"sekolah_layak"`
	SekolahWaspada   int     `json:"sekolah_waspada"`
	SekolahKritis    int     `json:"sekolah_kritis"`
	AvgJarak         float64 `json:"avg_jarak"`
	AvgUtilisasi     float64 `json:"avg_utilisasi"`
}

// Response wrapper
type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}
