package handlers

import (
	"net/http"
	"nutritrack-backend/config"
	"nutritrack-backend/models"

	"github.com/gin-gonic/gin"
)

// ============ SEKOLAH HANDLERS ============

// GetAllSekolah - GET /api/v1/sekolah
func GetAllSekolah(c *gin.Context) {
	var sekolah []models.Sekolah

	// Get filter parameters
	kecamatan := c.Query("kecamatan")
	status := c.Query("status")

	query := config.DB

	// Apply filters
	if kecamatan != "" {
		query = query.Where("kecamatan = ?", kecamatan)
	}
	if status != "" {
		query = query.Where("status = ?", status)
	}

	// Execute query
	if err := query.Find(&sekolah).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, sekolah)
}

// GetSekolahByID - GET /api/v1/sekolah/:id
func GetSekolahByID(c *gin.Context) {
	id := c.Param("id")
	var sekolah models.Sekolah

	if err := config.DB.First(&sekolah, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sekolah not found"})
		return
	}

	c.JSON(http.StatusOK, sekolah)
}

// CreateSekolah - POST /api/v1/sekolah
func CreateSekolah(c *gin.Context) {
	var sekolah models.Sekolah

	// Bind JSON
	if err := c.BindJSON(&sekolah); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate required fields
	if sekolah.NPSN == "" || sekolah.Nama == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "NPSN and Nama are required"})
		return
	}

	// Save to database
	if err := config.DB.Create(&sekolah).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, sekolah)
}

// UpdateSekolah - PUT /api/v1/sekolah/:id
func UpdateSekolah(c *gin.Context) {
	id := c.Param("id")
	var sekolah models.Sekolah

	// Check if sekolah exists
	if err := config.DB.First(&sekolah, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sekolah not found"})
		return
	}

	// Bind JSON
	if err := c.BindJSON(&sekolah); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update in database
	if err := config.DB.Model(&sekolah).Updates(sekolah).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, sekolah)
}

// DeleteSekolah - DELETE /api/v1/sekolah/:id
func DeleteSekolah(c *gin.Context) {
	id := c.Param("id")
	var sekolah models.Sekolah

	// Check if exists
	if err := config.DB.First(&sekolah, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sekolah not found"})
		return
	}

	// Delete
	if err := config.DB.Delete(&sekolah).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Sekolah deleted successfully"})
}

// ============ SPPG HANDLERS ============

// GetAllSPPG - GET /api/v1/sppg
func GetAllSPPG(c *gin.Context) {
	var sppg []models.SPPG

	// Get filter parameters
	kecamatan := c.Query("kecamatan")
	status := c.Query("status")

	query := config.DB

	// Apply filters
	if kecamatan != "" {
		query = query.Where("kecamatan = ?", kecamatan)
	}
	if status != "" {
		query = query.Where("status = ?", status)
	}

	// Execute query
	if err := query.Find(&sppg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, sppg)
}

// GetSPPGByID - GET /api/v1/sppg/:id
func GetSPPGByID(c *gin.Context) {
	id := c.Param("id")
	var sppg models.SPPG

	if err := config.DB.First(&sppg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "SPPG not found"})
		return
	}

	c.JSON(http.StatusOK, sppg)
}

// CreateSPPG - POST /api/v1/sppg
func CreateSPPG(c *gin.Context) {
	var sppg models.SPPG

	// Bind JSON
	if err := c.BindJSON(&sppg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate required fields
	if sppg.Kode == "" || sppg.Nama == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Kode and Nama are required"})
		return
	}

	// Save to database
	if err := config.DB.Create(&sppg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, sppg)
}

// UpdateSPPG - PUT /api/v1/sppg/:id
func UpdateSPPG(c *gin.Context) {
	id := c.Param("id")
	var sppg models.SPPG

	// Check if sppg exists
	if err := config.DB.First(&sppg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "SPPG not found"})
		return
	}

	// Bind JSON
	if err := c.BindJSON(&sppg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update in database
	if err := config.DB.Model(&sppg).Updates(sppg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, sppg)
}

// DeleteSPPG - DELETE /api/v1/sppg/:id
func DeleteSPPG(c *gin.Context) {
	id := c.Param("id")
	var sppg models.SPPG

	// Check if exists
	if err := config.DB.First(&sppg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "SPPG not found"})
		return
	}

	// Delete
	if err := config.DB.Delete(&sppg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "SPPG deleted successfully"})
}

// ============ DASHBOARD HANDLERS ============

// GetDashboardStats - GET /api/v1/dashboard/stats
func GetDashboardStats(c *gin.Context) {
	var sekolah []models.Sekolah
	var sppg []models.SPPG

	// Get all data
	config.DB.Find(&sekolah)
	config.DB.Find(&sppg)

	// Calculate stats
	totalSekolah := len(sekolah)
	totalSiswa := 0
	layak := 0
	waspada := 0
	kritis := 0

	for _, s := range sekolah {
		totalSiswa += s.Siswa
		switch s.Status {
		case "layak":
			layak++
		case "waspada":
			waspada++
		case "kritis":
			kritis++
		}
	}

	stats := models.DashboardStats{
		TotalSekolah:     totalSekolah,
		TotalSiswa:       totalSiswa,
		TotalSPPG:        len(sppg),
		TingkatKelayakan: float64((layak * 100) / totalSekolah),
	}

	c.JSON(http.StatusOK, stats)
}

// GetDashboardCharts - GET /api/v1/dashboard/charts
func GetDashboardCharts(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Chart data endpoint - to be implemented",
	})
}
