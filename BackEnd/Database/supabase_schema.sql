-- Supabase PostgreSQL Schema
-- Converted from MySQL to PostgreSQL
-- Database: Peduli Sehat

-- ========================================
-- Table: login
-- ========================================

DROP TABLE IF EXISTS detection_history CASCADE;
DROP TABLE IF EXISTS login CASCADE;

CREATE TABLE login (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX idx_login_email ON login(email);

-- ========================================
-- Table: detection_history
-- ========================================

CREATE TABLE detection_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  symptoms TEXT NOT NULL,
  detection_result VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES login(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Create index on user_id for faster queries
CREATE INDEX idx_detection_user_id ON detection_history(user_id);

-- Create index on created_at for sorting
CREATE INDEX idx_detection_created_at ON detection_history(created_at DESC);

-- ========================================
-- Sample Data (Optional - for testing)
-- ========================================

-- Insert a test user (password is 'admin123')
INSERT INTO login (name, email, password) VALUES
('Admin Test', 'admin@test.com', '$2b$10$01IgVEzas2kSYZvBTGc9helsvWJxSP8d7QhCpvDfnYj0uTfW1S6Tu');

-- Verify tables created
SELECT 'Tables created successfully!' AS status;
