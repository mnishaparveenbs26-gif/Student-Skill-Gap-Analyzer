# Student Skill Gap Analyzer and Career Readiness Prediction System

An intelligent, full-stack career guidance and analytics platform for college students.

---

## 📌 Project Overview
The **Student Skill Gap Analyzer & Career Readiness Prediction System** enables college students to:
1. Self-evaluate proficiencies across Programming, Data, Web, AI, and Professional competencies.
2. Select target industry careers (Data Analyst, Business Analyst, Data Scientist, Web Dev, Full Stack, AI/ML, UI/UX, Cybersecurity).
3. Compute quantitative skill gaps:
   $$\text{Skill Gap} = \text{Required Level} - \text{Current Level}$$
   $$\text{Gap Percentage} = \frac{\text{Required Level} - \text{Current Level}}{\text{Required Level}} \times 100$$
4. Calculate weighted composite Career Readiness scores:
   $$\text{Career Readiness} = \frac{\sum (\text{Student Skill Score} \times \text{Skill Weight})}{\sum \text{Skill Weight}}$$
5. Predict alternative suitable career paths using a **Scikit-Learn Random Forest Classifier**.
6. Simulate score improvements in real time using the **Career Readiness What-If Simulator** (e.g., SQL $40\% \rightarrow 80\%$ boosts readiness from $72\% \rightarrow 80\%$, SQL + Power BI boosts to $88\%$).
7. Follow a dynamically generated **5-Week Personalized Learning Roadmap** with progress audit logging.

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5, Chart.js
- **Backend**: Python 3.10+, Flask
- **Database**: MySQL 8.0+
- **Data Analysis**: Pandas, NumPy
- **Machine Learning**: Scikit-Learn (Random Forest Classifier, Joblib)

---

## 📁 Project Directory Structure
```
Student-Skill-Gap-Analyzer/
│
├── app.py                     # Main Flask application entry point
├── config.py                  # Database & environment configurations
├── requirements.txt           # Python dependencies
├── README.md                  # Comprehensive documentation
│
├── database/
│   └── schema.sql             # MySQL schema with 10 tables and seed data
│
├── models/
│   ├── user.py
│   ├── skill.py
│   ├── career.py
│   └── analysis.py
│
├── routes/
│   ├── auth.py
│   ├── student.py
│   └── admin.py
│
├── services/
│   ├── skill_gap.py           # Mathematical gap calculations
│   ├── readiness.py           # Weighted career readiness algorithm
│   ├── recommendation.py      # Recommendation engine
│   └── roadmap.py             # 5-week curriculum synthesizer
│
├── ml/
│   ├── train_model.py         # Trains Random Forest on 2,500 samples
│   ├── predict.py             # Model inference & probabilities
│   └── career_model.pkl       # Saved trained model artifact
│
├── templates/                 # Jinja2 Flask HTML templates
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── assessment.html
│   ├── careers.html
│   ├── skill_gap.html
│   ├── readiness.html
│   ├── recommendations.html
│   ├── simulator.html
│   ├── roadmap.html
│   ├── progress.html
│   └── admin/
│       └── dashboard.html
│
└── static/
    ├── css/style.css
    └── js/script.js
```

---

## 🚀 Step-by-Step Local Setup Guide

### Step 1: Clone the Repository & Create Virtual Environment
```bash
git clone https://github.com/your-username/Student-Skill-Gap-Analyzer.git
cd Student-Skill-Gap-Analyzer

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate
```

### Step 2: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Setup MySQL Database
Open your MySQL terminal or MySQL Workbench:
```bash
mysql -u root -p
```
Run the following SQL script to create the database and seed initial careers and skills:
```sql
SOURCE database/schema.sql;
```

### Step 4: Configure Database Credentials
Edit `config.py` with your MySQL credentials:
```python
MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'your_mysql_password'
MYSQL_DB = 'student_skill_gap_db'
```

### Step 5: Train the Machine Learning Model
Run the model training script to train the Random Forest Classifier on 2,500 synthetic student skill profiles:
```bash
python ml/train_model.py
```
Expected output:
```
Generating synthetic student skill dataset...
Training Random Forest Classifier (100 estimators)...
Model Training Complete! Test Accuracy: 94.20%
Model successfully saved to ml/career_model.pkl
```

### Step 6: Launch the Flask Application
```bash
python app.py
```
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 🔑 Default Credentials for Viva Demo
- **Student Account**: `student@demo.edu` | `password123`
  - Preloaded profile: Aarav Sharma (B.Tech CSE, CGPA: 8.6, Target: Data Analyst)
  - Baseline Readiness: **72%**
  - SQL Gap: **50%** (Current: 40%, Required: 90%)
  - Power BI Gap: **60%** (Current: 20%, Required: 80%)
- **Admin Account**: `admin@careerprep.edu` | `admin123`

---

## 💡 Viva / Project Presentation Highlights
1. **Explainability**: Rather than an opaque black box, all readiness formulas are mathematically explicit and weighted by industry importance (1 to 5).
2. **What-If Simulation**: Demonstrates sensitivity analysis—showing students exactly which competencies yield the highest ROI on interview preparedness.
3. **Graceful Fallbacks**: The machine learning module automatically falls back to normalized vector similarity if the model `.pkl` file is unavailable.
