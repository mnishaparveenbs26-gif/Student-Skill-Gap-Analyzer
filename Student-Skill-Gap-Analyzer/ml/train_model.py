"""
Machine Learning Training Module: Random Forest Career Classifier
Generates synthetic student skill profiles and trains an explainable Random Forest.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os

def generate_synthetic_dataset(num_samples=2500):
    np.random.seed(42)
    data = []
    labels = []
    
    # 0: Data Analyst, 1: Business Analyst, 2: Data Scientist, 3: Web Developer, 4: AI/ML Engineer
    for _ in range(num_samples):
        career_choice = np.random.choice([0, 1, 2, 3, 4])
        row = {}
        if career_choice == 0:
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
        elif career_choice == 1:
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
        elif career_choice == 2:
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
        elif career_choice == 3:
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
        else:
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
    X, y = generate_synthetic_dataset(2500)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier (100 estimators)...")
    clf = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
    clf.fit(X_train, y_train)
    
    acc = accuracy_score(y_test, clf.predict(X_test))
    print(f"Model Training Complete! Test Accuracy: {acc*100:.2f}%")
    
    model_path = os.path.join(os.path.dirname(__file__), 'career_model.pkl')
    joblib.dump(clf, model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == '__main__':
    train_and_save()
