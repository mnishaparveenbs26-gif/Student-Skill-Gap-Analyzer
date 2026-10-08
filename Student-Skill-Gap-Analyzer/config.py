import os

class Config:
    """Base application configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'career-readiness-secret-key-2026')
    
    # MySQL Database Configuration
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'rootpassword')
    MYSQL_DB = os.environ.get('MYSQL_DB', 'student_skill_gap_db')
    MYSQL_PORT = int(os.environ.get('MYSQL_PORT', 3306))

    # Machine Learning Model Configuration
    ML_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ml', 'career_model.pkl')
    DEBUG = True
