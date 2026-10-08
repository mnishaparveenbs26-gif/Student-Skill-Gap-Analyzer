import { GapPriority, RoadmapTask, SkillGapItem } from '../types';

interface RoadmapTemplate {
  week: number;
  title: string;
  description: string;
  keyTopics: string[];
  suggestedProject: string;
  hours: number;
  boost: number;
}

const SKILL_ROADMAP_TOPICS: Record<string, RoadmapTemplate[]> = {
  'SQL': [
    {
      week: 1,
      title: 'SQL Basics & Relational Queries',
      description: 'Master core SQL syntax, SELECT filters, GROUP BY aggregations, and subqueries.',
      keyTopics: ['SELECT, WHERE, ORDER BY', 'GROUP BY & HAVING', 'String & Date Formatting functions', 'Database normalization'],
      suggestedProject: 'E-commerce Customer Order Query Suite',
      hours: 10,
      boost: 15
    },
    {
      week: 2,
      title: 'Advanced SQL Joins & Window Functions',
      description: 'Implement complex multi-table joins, CTEs (Common Table Expressions), and analytical partition functions.',
      keyTopics: ['INNER, LEFT, FULL OUTER Joins', 'OVER (PARTITION BY ... ORDER BY)', 'RANK(), DENSE_RANK(), LAG(), LEAD()', 'Indexing & Query Performance Optimization'],
      suggestedProject: 'Cohort Retention & Monthly Active User (MAU) Analyzer',
      hours: 12,
      boost: 25
    }
  ],
  'Power BI': [
    {
      week: 3,
      title: 'Power BI Data Modeling & DAX',
      description: 'Connect heterogeneous data sources, build Star Schemas, and write calculated DAX columns and measures.',
      keyTopics: ['Power Query ETL pipelines', 'Star Schema vs Snowflake Schema', 'CALCULATE(), FILTER(), ALL()', 'Time Intelligence DAX functions'],
      suggestedProject: 'Executive Sales & Revenue KPI Dashboard',
      hours: 12,
      boost: 30
    },
    {
      week: 4,
      title: 'Interactive Visual Storytelling in Power BI',
      description: 'Design drill-through reports, bookmark navigation, role-based security, and dynamic tooltips.',
      keyTopics: ['Custom Visuals & Slicers', 'Drill-through actions & Bookmarks', 'Row-Level Security (RLS)', 'Publishing to Power BI Service'],
      suggestedProject: 'Supply Chain Logistics Live Control Center',
      hours: 10,
      boost: 25
    }
  ],
  'Python': [
    {
      week: 1,
      title: 'Python Scripting & Data Structures',
      description: 'Deepen core OOP mastery, list comprehensions, dictionary mappings, and exception handling.',
      keyTopics: ['List comprehensions & generators', 'Dictionaries & Sets', 'Object-Oriented Design', 'File I/O and JSON parsing'],
      suggestedProject: 'Automated CSV Cleansing & Metric Reporter',
      hours: 8,
      boost: 12
    }
  ],
  'Statistics': [
    {
      week: 3,
      title: 'Applied Business Statistics & Hypothesis Testing',
      description: 'Understand probability distributions, confidence intervals, p-values, and A/B test validation.',
      keyTopics: ['Normal & Binomial distributions', 'Two-sample t-tests & Z-tests', 'P-value interpretation & Type I/II errors', 'Correlation vs Causation'],
      suggestedProject: 'Digital Ad Campaign A/B Test Statistical Significance Report',
      hours: 9,
      boost: 15
    }
  ],
  'Excel': [
    {
      week: 2,
      title: 'Advanced Excel & Financial Modeling',
      description: 'Master XLOOKUP, dynamic array formulas, nested conditional formatting, and Pivot Cache analysis.',
      keyTopics: ['XLOOKUP, INDEX/MATCH', 'Dynamic Arrays (FILTER, UNIQUE, SORT)', 'Multi-level Pivot Tables', 'Macro automation basics'],
      suggestedProject: 'Financial Forecasting & Scenario Sensitivity Model',
      hours: 8,
      boost: 12
    }
  ],
  'Machine Learning': [
    {
      week: 3,
      title: 'Supervised Learning & Model Validation',
      description: 'Implement regression and classification algorithms with Scikit-learn and tune hyperparameters.',
      keyTopics: ['Train/Test Splits & K-Fold Cross Validation', 'Random Forest & Logistic Regression', 'Precision, Recall, ROC-AUC', 'GridSearchCV & Feature Importance'],
      suggestedProject: 'Customer Churn Prediction Engine',
      hours: 14,
      boost: 20
    }
  ],
  'React': [
    {
      week: 2,
      title: 'Modern React Architecture & State Management',
      description: 'Build component trees with custom hooks, context providers, and responsive styling.',
      keyTopics: ['useState, useEffect, useMemo, useCallback', 'Custom React Hooks', 'Context API & Redux Toolkit', 'Tailwind CSS integration'],
      suggestedProject: 'Interactive Real-Time Task Kanban Board',
      hours: 12,
      boost: 20
    }
  ],
  'JavaScript': [
    {
      week: 1,
      title: 'Modern Asynchronous JavaScript & APIs',
      description: 'Master ES6+, Promises, async/await, DOM manipulations, and Fetch API.',
      keyTopics: ['Async/Await & Promises', 'Closures & Scope Chain', 'Event Loop & Microtasks', 'REST API consumption'],
      suggestedProject: 'Weather Forecast & Geolocation Web App',
      hours: 10,
      boost: 18
    }
  ]
};

export function generatePersonalizedRoadmap(gapItems: SkillGapItem[]): RoadmapTask[] {
  // Sort gaps by highest gap score and importance
  const sortedGaps = [...gapItems]
    .filter(g => g.gapScore > 0)
    .sort((a, b) => {
      const priorityWeight: Record<GapPriority, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      const weightDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (weightDiff !== 0) return weightDiff;
      return b.gapScore - a.gapScore;
    });

  const tasks: RoadmapTask[] = [];
  let currentWeek = 1;

  // Process top 3-4 gap skills
  const targetGaps = sortedGaps.slice(0, 4);

  targetGaps.forEach(gap => {
    const templates = SKILL_ROADMAP_TOPICS[gap.skillName];
    if (templates && templates.length > 0) {
      templates.forEach(t => {
        tasks.push({
          id: `task-${gap.skillId}-w${currentWeek}`,
          week: currentWeek,
          skillId: gap.skillId,
          skillName: gap.skillName,
          title: t.title,
          description: t.description,
          priority: gap.priority,
          estimatedHours: t.hours,
          keyTopics: t.keyTopics,
          suggestedProject: t.suggestedProject,
          isCompleted: false,
          scoreBoost: t.boost
        });
        currentWeek++;
      });
    } else {
      // Generic template for other skills
      tasks.push({
        id: `task-${gap.skillId}-w${currentWeek}`,
        week: currentWeek,
        skillId: gap.skillId,
        skillName: gap.skillName,
        title: `${gap.skillName} Core Competency & Applied Practice`,
        description: `Build foundational to intermediate proficiency in ${gap.skillName} targeting ${gap.requiredScore}% industry requirement.`,
        priority: gap.priority,
        estimatedHours: 8,
        keyTopics: [`${gap.skillName} fundamentals`, 'Industry best practices', 'Hands-on debugging', 'Portfolio artifact synthesis'],
        suggestedProject: `${gap.skillName} Practical Evaluation Benchmark`,
        isCompleted: false,
        scoreBoost: Math.min(25, Math.round(gap.gapScore * 0.4))
      });
      currentWeek++;
    }
  });

  // Add Capstone project week if we have tasks
  if (tasks.length > 0) {
    tasks.push({
      id: `task-capstone-w${currentWeek}`,
      week: currentWeek,
      skillId: 'capstone',
      skillName: 'Capstone Project',
      title: 'End-to-End Career Portfolio Project & Mock Interview',
      description: 'Integrate your newly acquired skills into a unified public repository with documentation, live demo, and resume bullet points.',
      priority: 'High',
      estimatedHours: 15,
      keyTopics: ['System architecture documentation', 'GitHub README & CI/CD deployment', 'Technical viva presentation rehearsal', 'Resume skill alignment'],
      suggestedProject: 'Production-Ready Enterprise Portfolio Case Study',
      isCompleted: false,
      scoreBoost: 10
    });
  }

  return tasks;
}
