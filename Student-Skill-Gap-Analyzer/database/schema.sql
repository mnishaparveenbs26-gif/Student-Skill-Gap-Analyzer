-- ========================================================
-- Database Schema for Student Skill Gap Analyzer
-- Database: student_skill_gap_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS student_skill_gap_db;
USE student_skill_gap_db;

-- 1. Users Table (Role-based authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    department VARCHAR(100) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    year VARCHAR(50) NOT NULL,
    cgpa DECIMAL(4,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Skills Master Table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    category ENUM('Programming', 'Data', 'Web', 'AI/ML', 'Professional') NOT NULL
);

-- 4. Student Assessed Skills
CREATE TABLE IF NOT EXISTS student_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
    proficiency_level INT NOT NULL CHECK (proficiency_level BETWEEN 1 AND 3),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_skill (student_id, skill_id)
);

-- 5. Careers Master Table
CREATE TABLE IF NOT EXISTS careers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    career_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    industry VARCHAR(100) NOT NULL
);

-- 6. Career Required Skills & Weights
CREATE TABLE IF NOT EXISTS career_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    career_id INT NOT NULL,
    skill_id INT NOT NULL,
    required_score INT NOT NULL CHECK (required_score BETWEEN 0 AND 100),
    importance INT NOT NULL CHECK (importance BETWEEN 1 AND 5),
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY unique_career_skill (career_id, skill_id)
);

-- 7. Student Selected Target Careers
CREATE TABLE IF NOT EXISTS student_careers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    career_id INT NOT NULL,
    selected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
);

-- 8. Skill Gap Analysis Cache Table
CREATE TABLE IF NOT EXISTS skill_gap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    career_id INT NOT NULL,
    skill_id INT NOT NULL,
    current_score INT NOT NULL,
    required_score INT NOT NULL,
    gap_score INT NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- 9. Personalized Roadmap Table
CREATE TABLE IF NOT EXISTS roadmap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    recommended_week INT NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- 10. Progress Tracking History Table
CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    old_score INT NOT NULL,
    new_score INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- ========================================================
-- SEED DATA
-- ========================================================

INSERT INTO skills (skill_name, category) VALUES
('Python', 'Programming'),
('Java', 'Programming'),
('C', 'Programming'),
('C++', 'Programming'),
('SQL', 'Data'),
('Excel', 'Data'),
('Statistics', 'Data'),
('Power BI', 'Data'),
('Tableau', 'Data'),
('Pandas', 'Data'),
('HTML', 'Web'),
('CSS', 'Web'),
('JavaScript', 'Web'),
('React', 'Web'),
('Machine Learning', 'AI/ML'),
('Deep Learning', 'AI/ML'),
('NLP', 'AI/ML'),
('Communication', 'Professional'),
('Problem Solving', 'Professional'),
('Teamwork', 'Professional'),
('Leadership', 'Professional'),
('Presentation', 'Professional')
ON DUPLICATE KEY UPDATE skill_name=skill_name;

INSERT INTO careers (career_name, description, industry) VALUES
('Data Analyst', 'Transforms raw datasets into executive dashboards, business reports, and actionable strategic insights.', 'Business Intelligence & Tech'),
('Business Analyst', 'Analyzes organizational operations, workflows, and translates business problems into technical specs.', 'Management Consulting'),
('Data Scientist', 'Builds predictive machine learning models, statistical experiments, and deep algorithmic architectures.', 'Artificial Intelligence'),
('Web Developer', 'Creates responsive, accessible, high-performance client web applications.', 'Software Engineering'),
('Full Stack Developer', 'Architects end-to-end applications including UI components, REST APIs, and database schemas.', 'Software Engineering'),
('AI/ML Engineer', 'Designs, trains, and deploys high-scale neural networks and machine learning production pipelines.', 'Deep Tech & AI'),
('UI/UX Designer', 'Designs human-centered user experiences, wireframes, component design systems, and usability workflows.', 'Product Design'),
('Cybersecurity Analyst', 'Protects systems, networks, and confidential data assets from malicious breaches and cyber vulnerabilities.', 'Information Security')
ON DUPLICATE KEY UPDATE career_name=career_name;

INSERT INTO career_skills (career_id, skill_id, required_score, importance) VALUES
(1, 5, 90, 5),   -- SQL (Weight 5)
(1, 8, 80, 4),   -- Power BI (Weight 4)
(1, 1, 85, 4),   -- Python (Weight 4)
(1, 6, 85, 4),   -- Excel (Weight 4)
(1, 7, 80, 4),   -- Statistics (Weight 4)
(1, 9, 75, 3),   -- Tableau (Weight 3)
(1, 18, 80, 3)   -- Communication (Weight 3)
ON DUPLICATE KEY UPDATE required_score=VALUES(required_score);
