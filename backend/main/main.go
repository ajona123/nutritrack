package main

import (
	"log"
	"nutritrack-backend/config"
	"nutritrack-backend/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	config.InitDatabase()

	router := gin.Default()

	// CORS middleware untuk allow frontend
	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:    []string{"Content-Type", "Authorization"},
	}))

	// Health check
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "message": "Backend is running"})
	})

	// API Routes
	apiV1 := router.Group("/api/v1")
	{
		// Sekolah endpoints
		apiV1.GET("/sekolah", handlers.GetAllSekolah)
		apiV1.POST("/sekolah", handlers.CreateSekolah)
		apiV1.GET("/sekolah/:id", handlers.GetSekolahByID)
		apiV1.PUT("/sekolah/:id", handlers.UpdateSekolah)
		apiV1.DELETE("/sekolah/:id", handlers.DeleteSekolah)

		// SPPG endpoints
		apiV1.GET("/sppg", handlers.GetAllSPPG)
		apiV1.POST("/sppg", handlers.CreateSPPG)
		apiV1.GET("/sppg/:id", handlers.GetSPPGByID)
		apiV1.PUT("/sppg/:id", handlers.UpdateSPPG)
		apiV1.DELETE("/sppg/:id", handlers.DeleteSPPG)

		// Dashboard endpoints
		apiV1.GET("/dashboard/stats", handlers.GetDashboardStats)
		apiV1.GET("/dashboard/charts", handlers.GetDashboardCharts)
	}

	log.Println("🚀 Backend running on http://localhost:8080")
	router.Run(":8080")
}
