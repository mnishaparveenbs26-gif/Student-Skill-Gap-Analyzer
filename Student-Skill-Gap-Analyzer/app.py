"""
Student Skill Gap Analyzer and Career Readiness Prediction System
Main Flask Application Entry Point
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

def get_db():
    """Connect to MySQL database."""
    try:
        return mysql.connector.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DB'],
            port=app.config['MYSQL_PORT']
        )
    except Exception as e:
        app.logger.warning(f"Database connection error: {e}")
        return None

# ========================================================
# CORE SERVICES / MATH LOGIC
# ========================================================

def calculate_gaps_logic(current_skills_dict, requirements):
    """
    Skill Gap = Required - Current
    Gap % = ((Required - Current) / Required) * 100
    """
    gaps = []
    for req in requirements:
        skill_id = req['skill_id']
        skill_name = req['skill_name']
        required = req['required_score']
        importance = req['importance']
        current = current_skills_dict.get(skill_id, 0)

        gap = max(0, required - current)
        gap_pct = round((gap / required * 100) if required > 0 else 0)

        if gap_pct > 50 or (gap_pct > 40 and importance >= 4):
            priority = 'Critical' if importance >= 4 else 'High'
        elif gap_pct > 20:
            priority = 'Medium'
        else:
            priority = 'Low'

        status = 'Almost Ready' if gap_pct <= 15 else ('Critical Gap' if priority == 'Critical' else 'Needs Improvement')

        gaps.append({
            'skill_id': skill_id,
            'skill_name': skill_name,
            'current_score': current,
            'required_score': required,
            'gap_score': gap,
            'gap_percentage': gap_pct,
            'priority': priority,
            'status': status,
            'importance': importance
        })
    return gaps

def calculate_readiness_logic(current_skills_dict, requirements):
    """
    Readiness = Σ(Student Skill Score × Skill Weight) / Σ(Skill Weight)
    """
    total_weighted = 0
    total_weights = 0
    for req in requirements:
        score = current_skills_dict.get(req['skill_id'], 0)
        weight = req['importance']
        total_weighted += score * weight
        total_weights += weight

    if total_weights == 0:
        return 0, 'Beginner Stage'

    readiness = round(total_weighted / total_weights)
    readiness = max(0, min(100, readiness))

    if readiness >= 90:
        tier = 'Highly Ready'
    elif readiness >= 75:
        tier = 'Career Ready'
    elif readiness >= 50:
        tier = 'Needs Improvement'
    else:
        tier = 'Beginner Stage'

    return readiness, tier

# ========================================================
# ROUTES
# ========================================================

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        session['user_id'] = 1
        session['user_name'] = 'Aarav Sharma'
        session['user_role'] = 'student'
        flash('Welcome back!', 'success')
        return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        flash('Account created successfully!', 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out successfully.', 'info')
    return redirect(url_for('home'))

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/assessment')
def assessment():
    return render_template('assessment.html')

@app.route('/careers')
def careers():
    return render_template('careers.html')

@app.route('/skill-gap')
def skill_gap():
    return render_template('skill_gap.html')

@app.route('/readiness')
def readiness():
    return render_template('readiness.html')

@app.route('/simulator')
def simulator():
    return render_template('simulator.html')

@app.route('/roadmap')
def roadmap():
    return render_template('roadmap.html')

@app.route('/progress')
def progress():
    return render_template('progress.html')

@app.route('/admin/dashboard')
def admin_dashboard():
    return render_template('admin/dashboard.html')

@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
