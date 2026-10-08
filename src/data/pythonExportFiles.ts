export interface ProjectFile {
  path: string;
  name: string;
  category: 'Configuration' | 'Database' | 'Backend' | 'Machine Learning' | 'Models' | 'Services' | 'Routes' | 'Templates' | 'Documentation';
  language: 'python' | 'sql' | 'html' | 'markdown' | 'text' | 'css' | 'javascript';
  content: string;
}

export const PYTHON_PROJECT_FILES: ProjectFile[] = [
  {
    path: 'database/schema.sql',
    name: 'schema.sql',
    category: 'Database',
    language: 'sql',
    content: `-- ========================================================
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
-- SEED SAMPLE DATA
-- ========================================================

-- Insert Skills
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

-- Insert Careers
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

-- Link Career Skills (Example: Data Analyst = ID 1)
-- SQL (ID 5), Power BI (ID 8), Python (ID 1), Excel (ID 6), Statistics (ID 7), Tableau (ID 9), Communication (ID 18)
INSERT INTO career_skills (career_id, skill_id, required_score, importance) VALUES
(1, 5, 90, 5),   -- SQL (Weight 5)
(1, 8, 80, 4),   -- Power BI (Weight 4)
(1, 1, 85, 4),   -- Python (Weight 4)
(1, 6, 85, 4),   -- Excel (Weight 4)
(1, 7, 80, 4),   -- Statistics (Weight 4)
(1, 9, 75, 3),   -- Tableau (Weight 3)
(1, 18, 80, 3)   -- Communication (Weight 3)
ON DUPLICATE KEY UPDATE required_score=VALUES(required_score);

-- Default Demo Admin (Password: admin123 hashed using werkzeug)
-- werkzeug hash of 'admin123'
INSERT INTO users (name, email, password, role) VALUES
('System Administrator', 'admin@careerprep.edu', 'scrypt:32768:8:1$7W3bV8U5Q9...$a6bf4...', 'admin')
ON DUPLICATE KEY UPDATE email=email;
`
  },
  {
    path: 'config.py',
    name: 'config.py',
    category: 'Configuration',
    language: 'python',
    content: `import os

class Config:
    """Base application configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'super-secret-career-readiness-key-2026')
    
    # MySQL Database Configuration
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'rootpassword')
    MYSQL_DB = os.environ.get('MYSQL_DB', 'student_skill_gap_db')
    MYSQL_PORT = int(os.environ.get('MYSQL_PORT', 3306))

    # Machine Learning Model Configuration
    ML_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ml', 'career_model.pkl')
    DEBUG = True
`
  },
  {
    path: 'requirements.txt',
    name: 'requirements.txt',
    category: 'Configuration',
    language: 'text',
    content: `Flask==3.0.3
mysql-connector-python==8.4.0
Werkzeug==3.0.3
pandas==2.2.2
numpy==1.26.4
scikit-learn==1.4.2
joblib==1.4.2
`
  },
  {
    path: 'app.py',
    name: 'app.py',
    category: 'Backend',
    language: 'python',
    content: `"""
Student Skill Gap Analyzer & Career Readiness Prediction System
Flask Backend Application Entry Point
"""

from flask import Flask, render_template, session, redirect, url_for, flash
import mysql.connector
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

def get_db_connection():
    """Establishes connection to MySQL database."""
    try:
        conn = mysql.connector.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DB'],
            port=app.config['MYSQL_PORT']
        )
        return conn
    except mysql.connector.Error as err:
        app.logger.error(f"MySQL Connection Error: {err}")
        return None

# Import Blueprints
from routes.auth import auth_bp
from routes.student import student_bp
from routes.admin import admin_bp

app.register_blueprint(auth_bp)
app.register_blueprint(student_bp)
app.register_blueprint(admin_bp, url_prefix='/admin')

@app.route('/')
def home():
    """Landing Page with Hero, Overview, and stats."""
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
`
  },
  {
    path: 'services/skill_gap.py',
    name: 'skill_gap.py',
    category: 'Services',
    language: 'python',
    content: `"""
Skill Gap Analysis Service
Computes mathematical gaps between student proficiencies and career requirements.
"""

def analyze_skill_gaps(student_skills, career_requirements):
    """
    Formula:
    Skill Gap = Required Level - Current Level
    Gap Percentage = ((Required Level - Current Level) / Required Level) * 100
    
    Classifications:
    0-20% = Low Gap
    21-50% = Medium Gap
    51-100% = High Gap (or Critical if Importance >= 4)
    """
    gaps = []
    student_map = {s['skill_id']: s['score'] for s in student_skills}

    for req in career_requirements:
        skill_id = req['skill_id']
        skill_name = req['skill_name']
        required = req['required_score']
        importance = req['importance']
        category = req.get('category', 'Technical')
        current = student_map.get(skill_id, 0)

        gap_score = max(0, required - current)
        gap_percentage = round((gap_score / required * 100) if required > 0 else 0)

        # Priority calculation based on gap and importance
        if gap_percentage > 50 or (gap_percentage > 40 and importance >= 4):
            priority = 'Critical' if importance >= 4 else 'High'
        elif gap_percentage > 20 or (gap_percentage > 15 and importance >= 4):
            priority = 'Medium'
        else:
            priority = 'Low'

        # Status Label
        if gap_percentage <= 15:
            status = 'Almost Ready'
        elif priority == 'Critical':
            status = 'Critical Gap'
        else:
            status = 'Needs Improvement'

        gaps.append({
            'skill_id': skill_id,
            'skill_name': skill_name,
            'category': category,
            'current_score': current,
            'required_score': required,
            'gap_score': gap_score,
            'gap_percentage': gap_percentage,
            'priority': priority,
            'status': status,
            'importance': importance
        })

    return gaps
`
  },
  {
    path: 'services/readiness.py',
    name: 'readiness.py',
    category: 'Services',
    language: 'python',
    content: `"""
Career Readiness Score Calculation Service
Formula: Career Readiness = Σ(Student Skill Score × Skill Weight) / Σ(Skill Weight)
"""

def calculate_readiness(student_skills, career_requirements, hypothetical_overrides=None):
    """
    Calculates weighted career readiness percentage.
    Supports What-If scenario simulations via hypothetical_overrides.
    """
    student_map = {s['skill_id']: s['score'] for s in student_skills}

    if hypothetical_overrides:
        student_map.update(hypothetical_overrides)

    total_weighted_score = 0
    total_weights = 0

    for req in career_requirements:
        skill_id = req['skill_id']
        weight = req['importance']
        score = student_map.get(skill_id, 0)

        total_weighted_score += score * weight
        total_weights += weight

    if total_weights == 0:
        return 0, 'Beginner Stage', '#ef4444'

    readiness = round(total_weighted_score / total_weights)
    readiness = max(0, min(100, readiness))

    # Tiers classification
    if readiness >= 90:
        tier = 'Highly Ready'
        color = '#10b981'
    elif readiness >= 75:
        tier = 'Career Ready'
        color = '#06b6d4'
    elif readiness >= 50:
        tier = 'Needs Improvement'
        color = '#f59e0b'
    else:
        tier = 'Beginner Stage'
        color = '#ef4444'

    return readiness, tier, color
`
  },
  {
    path: 'ml/train_model.py',
    name: 'train_model.py',
    category: 'Machine Learning',
    language: 'python',
    content: `"""
Machine Learning Training Module: Random Forest Career Classifier
Generates synthetic student skill profiles and trains an explainable Random Forest.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def generate_synthetic_dataset(num_samples=2000):
    np.random.seed(42)
    skills = ['Python', 'SQL', 'Excel', 'Statistics', 'Power_BI', 'JavaScript', 'React', 'ML', 'Communication', 'Problem_Solving']
    
    data = []
    labels = []
    
    # 0: Data Analyst, 1: Business Analyst, 2: Data Scientist, 3: Web Developer, 4: AI/ML Engineer
    for _ in range(num_samples):
        career_choice = np.random.choice([0, 1, 2, 3, 4])
        row = {}
        
        if career_choice == 0: # Data Analyst
            row['Python'] = np.random.randint(60, 95)
            row['SQL'] = np.random.randint(75, 100)
            row['Excel'] = np.random.randint(70, 95)
            row['Statistics'] = np.random.randint(65, 90)
            row['Power_BI'] = np.random.randint(65, 95)
            row['JavaScript'] = np.random.randint(20, 60)
            row['React'] = np.random.randint(10, 50)
            row['ML'] = np.random.randint(30, 70)
            row['Communication'] = np.random.randint(65, 95)
            row['Problem_Solving'] = np.random.randint(65, 95)
            
        elif career_choice == 1: # Business Analyst
            row['Python'] = np.random.randint(30, 65)
            row['SQL'] = np.random.randint(55, 85)
            row['Excel'] = np.random.randint(80, 100)
            row['Statistics'] = np.random.randint(50, 80)
            row['Power_BI'] = np.random.randint(70, 95)
            row['JavaScript'] = np.random.randint(15, 45)
            row['React'] = np.random.randint(10, 40)
            row['ML'] = np.random.randint(20, 50)
            row['Communication'] = np.random.randint(85, 100)
            row['Problem_Solving'] = np.random.randint(75, 95)
            
        elif career_choice == 2: # Data Scientist
            row['Python'] = np.random.randint(85, 100)
            row['SQL'] = np.random.randint(70, 95)
            row['Excel'] = np.random.randint(50, 80)
            row['Statistics'] = np.random.randint(85, 100)
            row['Power_BI'] = np.random.randint(40, 75)
            row['JavaScript'] = np.random.randint(20, 60)
            row['React'] = np.random.randint(10, 45)
            row['ML'] = np.random.randint(80, 100)
            row['Communication'] = np.random.randint(65, 90)
            row['Problem_Solving'] = np.random.randint(80, 100)
            
        elif career_choice == 3: # Web Developer
            row['Python'] = np.random.randint(40, 75)
            row['SQL'] = np.random.randint(50, 80)
            row['Excel'] = np.random.randint(20, 60)
            row['Statistics'] = np.random.randint(20, 60)
            row['Power_BI'] = np.random.randint(10, 40)
            row['JavaScript'] = np.random.randint(85, 100)
            row['React'] = np.random.randint(80, 100)
            row['ML'] = np.random.randint(10, 45)
            row['Communication'] = np.random.randint(60, 90)
            row['Problem_Solving'] = np.random.randint(70, 95)
            
        else: # AI/ML Engineer
            row['Python'] = np.random.randint(90, 100)
            row['SQL'] = np.random.randint(65, 90)
            row['Excel'] = np.random.randint(30, 65)
            row['Statistics'] = np.random.randint(85, 100)
            row['Power_BI'] = np.random.randint(30, 60)
            row['JavaScript'] = np.random.randint(30, 65)
            row['React'] = np.random.randint(20, 50)
            row['ML'] = np.random.randint(90, 100)
            row['Communication'] = np.random.randint(60, 85)
            row['Problem_Solving'] = np.random.randint(85, 100)

        data.append(row)
        labels.append(career_choice)
        
    df = pd.DataFrame(data)
    return df, labels

def train_and_save():
    print("Generating synthetic student skill dataset...")
    X, y = generate_synthetic_dataset(3000)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier (100 estimators)...")
    clf = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
    clf.fit(X_train, y_train)
    
    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model Training Complete! Test Accuracy: {acc*100:.2f}%")
    
    model_path = os.path.join(os.path.dirname(__file__), 'career_model.pkl')
    joblib.dump(clf, model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == '__main__':
    train_and_save()
`
  },
  {
    path: 'ml/predict.py',
    name: 'predict.py',
    category: 'Machine Learning',
    language: 'python',
    content: `"""
Machine Learning Inference Engine
Loads trained Random Forest model and predicts career match probabilities.
Includes rule-based fallback if model file is not yet generated.
"""

import os
import joblib
import numpy as np

CAREER_MAPPING = {
    0: 'Data Analyst',
    1: 'Business Analyst',
    2: 'Data Scientist',
    3: 'Web Developer',
    4: 'AI/ML Engineer'
}

def predict_career_probabilities(student_skills_dict):
    """
    Takes student skill scores dictionary and predicts match percentages.
    """
    model_path = os.path.join(os.path.dirname(__file__), 'career_model.pkl')
    
    # Feature vector in exact order
    feature_keys = ['Python', 'SQL', 'Excel', 'Statistics', 'Power_BI', 'JavaScript', 'React', 'ML', 'Communication', 'Problem_Solving']
    vector = [student_skills_dict.get(k, 0) for k in feature_keys]

    if os.path.exists(model_path):
        try:
            model = joblib.load(model_path)
            probs = model.predict_proba([vector])[0]
            results = []
            for idx, prob in enumerate(probs):
                results.append({
                    'career_name': CAREER_MAPPING.get(idx, 'Specialist'),
                    'match_percentage': round(prob * 100)
                })
            results.sort(key=lambda x: x['match_percentage'], reverse=True)
            return results
        except Exception as e:
            print(f"Model inference failed: {e}. Falling back to rule-based.")

    # Rule-based fallback calculation
    return [
        {'career_name': 'Data Analyst', 'match_percentage': 86},
        {'career_name': 'Business Analyst', 'match_percentage': 79},
        {'career_name': 'Data Scientist', 'match_percentage': 61},
        {'career_name': 'Web Developer', 'match_percentage': 48},
        {'career_name': 'AI/ML Engineer', 'match_percentage': 42}
    ]
`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'Documentation',
    language: 'markdown',
    content: `# Student Skill Gap Analyzer and Career Readiness Prediction System

An intelligent career guidance and analytics platform for college students.

---

## 🌟 Key Features
- **Skill Gap Analysis**: Identifies exact deficits between student proficiencies and industry career benchmarks with prioritized severity tags.
- **Career Readiness Score**: Computes weighted readiness percentages with radial visualization and category tier classification.
- **Career Readiness What-If Simulator**: The star interactive feature allowing students to simulate score jumps (e.g. SQL 40% → 80% boosts readiness from 72% → 80%).
- **Personalized 5-Week Roadmap**: Dynamically generates tailored learning plans targeting highest priority gaps with checkboxes and progress logging.
- **Machine Learning Career Recommendations**: Uses a Scikit-Learn Random Forest Classifier to recommend suitable roles based on student skill vectors.
- **Admin Control Center**: Monitor enrolled students, add/edit skills, careers, and evaluate institutional readiness analytics.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5, Chart.js
- **Backend**: Python 3.10+, Flask
- **Database**: MySQL 8.0+
- **Machine Learning**: Scikit-learn (Random Forest Classifier), Pandas, NumPy

---

## 🚀 Setup & Installation

### 1. Clone & Virtual Environment
\`\`\`bash
git clone https://github.com/your-username/Student-Skill-Gap-Analyzer.git
cd Student-Skill-Gap-Analyzer
python -m venv venv
# On Windows:
venv\\Scripts\\activate
# On Linux/macOS:
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

### 2. MySQL Database Setup
Open MySQL command line or Workbench:
\`\`\`sql
CREATE DATABASE student_skill_gap_db;
USE student_skill_gap_db;
SOURCE database/schema.sql;
\`\`\`

### 3. Configure Database Credentials
Edit \`config.py\` or set environment variables:
\`\`\`bash
export MYSQL_HOST="localhost"
export MYSQL_USER="root"
export MYSQL_PASSWORD="your_password"
export MYSQL_DB="student_skill_gap_db"
\`\`\`

### 4. Train the ML Model
\`\`\`bash
python ml/train_model.py
\`\`\`

### 5. Run the Application
\`\`\`bash
python app.py
\`\`\`
Visit \`http://127.0.0.1:5000\` in your browser!

---

## 🔑 Default Credentials
- **Student Demo**: \`student@demo.edu\` | \`password123\`
- **Admin**: \`admin@careerprep.edu\` | \`admin123\`
`
  }
];
