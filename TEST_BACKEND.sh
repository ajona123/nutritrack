#!/bin/bash
# Quick test script untuk memverify backend endpoints

echo "🧪 Testing NutriTrack Backend Endpoints"
echo "======================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:8080"

# Test 1: Health Check
echo -e "${BLUE}Test 1: Health Check${NC}"
curl -s "$BASE_URL/api/health" | jq '.' || echo "Health check failed"
echo ""

# Test 2: Get All Sekolah
echo -e "${BLUE}Test 2: Get All Sekolah${NC}"
curl -s "$BASE_URL/api/v1/sekolah" | jq '.' || echo "Get sekolah failed"
echo ""

# Test 3: Get All SPPG
echo -e "${BLUE}Test 3: Get All SPPG${NC}"
curl -s "$BASE_URL/api/v1/sppg" | jq '.' || echo "Get SPPG failed"
echo ""

# Test 4: Get Dashboard Stats
echo -e "${BLUE}Test 4: Get Dashboard Stats${NC}"
curl -s "$BASE_URL/api/v1/dashboard/stats" | jq '.' || echo "Get stats failed"
echo ""

# Test 5: Create New Sekolah
echo -e "${BLUE}Test 5: Create New Sekolah${NC}"
curl -s -X POST "$BASE_URL/api/v1/sekolah" \
  -H "Content-Type: application/json" \
  -d '{
    "npsn": "20104099",
    "nama": "SDN Test Baru",
    "jenjang": "SD",
    "kecamatan": "Test",
    "siswa": 300,
    "sppg": 1,
    "jarak": 3.0,
    "waktu": 15,
    "status": "Layak",
    "lat": -6.4100,
    "lng": 106.8900
  }' | jq '.' || echo "Create sekolah failed"
echo ""

echo -e "${GREEN}✅ Testing complete!${NC}"
echo "Note: Update the BASE_URL if backend running on different port"
