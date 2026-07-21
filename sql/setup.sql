CREATE DATABASE IF NOT EXISTS care_for_all;
USE care_for_all;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  phone VARCHAR(20),
  specialties VARCHAR(255),
  rating DECIMAL(2,1)
);

-- Seed Data for Jodhpur Hospitals
INSERT INTO hospitals (name, address, latitude, longitude, phone, specialties, rating) VALUES
('AIIMS Jodhpur', 'Basni Industrial Area, Phase-2, Jodhpur', 26.2408, 73.0043, '0291-2742223', 'Multi-specialty, Research, Trauma', 4.8),
('MDM Hospital', 'Shastri Nagar, Jodhpur', 26.2667, 73.0058, '0291-2431488', 'General, Surgery, Emergency', 4.2),
('Goyal Hospital & Research Centre', '11/3 Residency Road, Shastri Nagar', 26.2694, 73.0135, '0291-2432144', 'Cardiology, Orthopedics, Neurology', 4.5),
('Medipulse Hospital', 'E-4, MIA, Basni II Phase, Opp. AIIMS', 26.2396, 73.0039, '082393-45678', 'Cardiology, Oncology, Critical Care', 4.6),
('Shri Ram Hospital', 'Pal Road, Jodhpur', 26.2458, 72.9922, '0291-2747111', 'General Medicine, Maternity', 4.1);