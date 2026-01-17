-- Create Sekolah table
CREATE TABLE IF NOT EXISTS sekolah (
    id SERIAL PRIMARY KEY,
    npsn VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    jenjang VARCHAR(50),
    kecamatan VARCHAR(100),
    siswa INTEGER,
    sppg INTEGER,
    jarak FLOAT,
    waktu INTEGER,
    status VARCHAR(50),
    lat FLOAT,
    lng FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create SPPG table
CREATE TABLE IF NOT EXISTS sppg (
    id SERIAL PRIMARY KEY,
    kode VARCHAR(50) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    kecamatan VARCHAR(100),
    alamat TEXT,
    kapasitas INTEGER,
    produksi_harian INTEGER,
    sekolah_dilayani INTEGER,
    total_siswa INTEGER,
    pekerja INTEGER,
    status VARCHAR(50),
    utilisasi FLOAT,
    lat FLOAT,
    lng FLOAT,
    surplus INTEGER,
    jam_operasional VARCHAR(100),
    fasilitas TEXT,
    sertifikat TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_sekolah_npsn ON sekolah(npsn);
CREATE INDEX IF NOT EXISTS idx_sekolah_kecamatan ON sekolah(kecamatan);
CREATE INDEX IF NOT EXISTS idx_sppg_kode ON sppg(kode);
CREATE INDEX IF NOT EXISTS idx_sppg_kecamatan ON sppg(kecamatan);

-- Insert sample data for Sekolah
INSERT INTO sekolah (npsn, nama, jenjang, kecamatan, siswa, sppg, jarak, waktu, status, lat, lng) VALUES
('20500001', 'SD Negeri 1 Surabaya', 'SD', 'Surabaya Pusat', 450, 1, 2.5, 15, 'layak', -7.2504, 112.7499),
('20500002', 'SD Negeri 2 Surabaya', 'SD', 'Surabaya Timur', 380, 2, 5.2, 25, 'layak', -7.2400, 112.7600),
('20500003', 'MI Al-Ikhlas', 'MI', 'Surabaya Barat', 320, 1, 4.1, 20, 'waspada', -7.2600, 112.7300),
('20500004', 'SD Kristen 1', 'SD', 'Surabaya Pusat', 280, 2, 3.0, 18, 'layak', -7.2550, 112.7550),
('20500005', 'SD Negeri 3', 'SD', 'Surabaya Timur', 410, 1, 6.0, 30, 'layak', -7.2300, 112.7700);

-- Insert sample data for SPPG
INSERT INTO sppg (kode, nama, kecamatan, alamat, kapasitas, produksi_harian, sekolah_dilayani, total_siswa, pekerja, status, utilisasi, lat, lng, surplus, jam_operasional, fasilitas, sertifikat) VALUES
('SPPG001', 'Dapur Pusat Surabaya', 'Surabaya Pusat', 'Jl. Raya Pusat No. 1', 1000, 950, 5, 1840, 12, 'operasional', 95.0, -7.2504, 112.7499, 50, '06:00-14:00', 'Oven,Kompor Gas,Kulkas,Meja Kerja', 'BPOM,Halal'),
('SPPG002', 'Dapur Timur Surabaya', 'Surabaya Timur', 'Jl. Raya Timur No. 5', 800, 720, 4, 1620, 10, 'operasional', 90.0, -7.2400, 112.7600, 80, '06:00-14:00', 'Oven,Kompor Gas,Kulkas,Sterilisasi', 'BPOM'),
('SPPG003', 'Dapur Barat Surabaya', 'Surabaya Barat', 'Jl. Raya Barat No. 3', 600, 480, 3, 1200, 8, 'maintenance', 80.0, -7.2600, 112.7300, 120, '06:30-14:30', 'Oven,Kompor Gas,Kulkas', 'BPOM,Halal,ISO');

-- Create VIEW for Dashboard Stats
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM sekolah) as total_sekolah,
    (SELECT SUM(siswa) FROM sekolah) as total_siswa,
    (SELECT COUNT(DISTINCT sppg) FROM sekolah WHERE sppg IS NOT NULL) as total_sppg,
    ROUND(CAST(COUNT(CASE WHEN status = 'layak' THEN 1 END) AS NUMERIC) / 
          CAST(COUNT(*) AS NUMERIC) * 100, 2) as tingkat_kelayakan
FROM sekolah;
