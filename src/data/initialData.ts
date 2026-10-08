import { Career, Skill, StudentProfile, StudentSkill, User } from '../types';

export const INITIAL_SKILLS: Skill[] = [
  // Programming
  { id: 'sk-py', name: 'Python', category: 'Programming', description: 'Core Python, data structures, scripting, OOP, and automation' },
  { id: 'sk-java', name: 'Java', category: 'Programming', description: 'Object-oriented programming, multithreading, collections, JVM concepts' },
  { id: 'sk-c', name: 'C', category: 'Programming', description: 'Low-level systems programming, memory management, pointers, OS primitives' },
  { id: 'sk-cpp', name: 'C++', category: 'Programming', description: 'Modern C++, STL, competitive programming, game & engine development' },

  // Data
  { id: 'sk-sql', name: 'SQL', category: 'Data', description: 'Relational querying, complex joins, subqueries, indexing, schema design' },
  { id: 'sk-excel', name: 'Excel', category: 'Data', description: 'Advanced formulas (XLOOKUP, INDEX/MATCH), pivot tables, financial modeling' },
  { id: 'sk-stats', name: 'Statistics', category: 'Data', description: 'Probability distributions, hypothesis testing, regression analysis, inferential stats' },
  { id: 'sk-pbi', name: 'Power BI', category: 'Data', description: 'Interactive dashboard design, DAX formulas, Power Query ETL, data modeling' },
  { id: 'sk-tab', name: 'Tableau', category: 'Data', description: 'Visual analytics, calculated fields, parameters, interactive executive dashboards' },
  { id: 'sk-pds', name: 'Pandas', category: 'Data', description: 'Data wrangling, cleaning, aggregation, exploratory data analysis with Python' },

  // Web
  { id: 'sk-html', name: 'HTML', category: 'Web', description: 'Semantic markup, modern HTML5 accessibility standards, document structure' },
  { id: 'sk-css', name: 'CSS', category: 'Web', description: 'Responsive layouts, Flexbox, CSS Grid, Tailwind CSS, modern animations' },
  { id: 'sk-js', name: 'JavaScript', category: 'Web', description: 'ES6+ standards, asynchronous JavaScript, DOM APIs, event loop, functional programming' },
  { id: 'sk-react', name: 'React', category: 'Web', description: 'Component architecture, state hooks, effect management, SPA architecture' },

  // AI / ML
  { id: 'sk-ml', name: 'Machine Learning', category: 'AI/ML', description: 'Supervised & unsupervised learning, scikit-learn, cross-validation, feature engineering' },
  { id: 'sk-dl', name: 'Deep Learning', category: 'AI/ML', description: 'Neural network architectures, backprop, PyTorch/TensorFlow, CNNs, RNNs' },
  { id: 'sk-nlp', name: 'NLP', category: 'AI/ML', description: 'Natural Language Processing, tokenization, embeddings, transformer models, LLMs' },

  // Professional
  { id: 'sk-comm', name: 'Communication', category: 'Professional', description: 'Articulating complex technical concepts, stakeholder reporting, active listening' },
  { id: 'sk-ps', name: 'Problem Solving', category: 'Professional', description: 'Algorithmic thinking, root cause analysis, structured analytical troubleshooting' },
  { id: 'sk-team', name: 'Teamwork', category: 'Professional', description: 'Cross-functional collaboration, git version control workflows, agile ceremonies' },
  { id: 'sk-lead', name: 'Leadership', category: 'Professional', description: 'Project ownership, mentoring peers, driving technical initiatives to completion' },
  { id: 'sk-pres', name: 'Presentation', category: 'Professional', description: 'Slide deck synthesis, public delivery, visual data storytelling to executives' }
];

export const INITIAL_CAREERS: Career[] = [
  {
    id: 'car-da',
    name: 'Data Analyst',
    description: 'Transforms raw numbers into actionable business insights using SQL, statistical analysis, and interactive business intelligence dashboards.',
    industry: 'Business Intelligence & Tech',
    demandLevel: 'Very High',
    averageSalary: '$78,000 - $115,000',
    requirements: [
      { skillId: 'sk-sql', requiredScore: 90, importance: 5 },
      { skillId: 'sk-pbi', requiredScore: 80, importance: 4 },
      { skillId: 'sk-py', requiredScore: 85, importance: 4 },
      { skillId: 'sk-excel', requiredScore: 85, importance: 4 },
      { skillId: 'sk-stats', requiredScore: 80, importance: 4 },
      { skillId: 'sk-tab', requiredScore: 75, importance: 3 },
      { skillId: 'sk-comm', requiredScore: 80, importance: 3 }
    ]
  },
  {
    id: 'car-ba',
    name: 'Business Analyst',
    description: 'Bridges the gap between IT systems and business stakeholders, analyzing processes, market trends, and defining functional requirements.',
    industry: 'Consulting & Enterprise',
    demandLevel: 'High',
    averageSalary: '$82,000 - $120,000',
    requirements: [
      { skillId: 'sk-excel', requiredScore: 90, importance: 5 },
      { skillId: 'sk-comm', requiredScore: 95, importance: 5 },
      { skillId: 'sk-pbi', requiredScore: 80, importance: 4 },
      { skillId: 'sk-ps', requiredScore: 90, importance: 4 },
      { skillId: 'sk-pres', requiredScore: 85, importance: 4 },
      { skillId: 'sk-sql', requiredScore: 75, importance: 3 },
      { skillId: 'sk-team', requiredScore: 85, importance: 3 }
    ]
  },
  {
    id: 'car-ds',
    name: 'Data Scientist',
    description: 'Designs sophisticated machine learning models, conducts advanced statistical experiments, and extracts predictive insights from massive datasets.',
    industry: 'Artificial Intelligence & Big Data',
    demandLevel: 'Very High',
    averageSalary: '$110,000 - $165,000',
    requirements: [
      { skillId: 'sk-py', requiredScore: 95, importance: 5 },
      { skillId: 'sk-stats', requiredScore: 90, importance: 5 },
      { skillId: 'sk-ml', requiredScore: 90, importance: 5 },
      { skillId: 'sk-pds', requiredScore: 90, importance: 4 },
      { skillId: 'sk-sql', requiredScore: 85, importance: 4 },
      { skillId: 'sk-dl', requiredScore: 75, importance: 3 },
      { skillId: 'sk-comm', requiredScore: 80, importance: 3 }
    ]
  },
  {
    id: 'car-web',
    name: 'Web Developer',
    description: 'Crafts responsive, accessible, and high-performance client-side web interfaces with modern JavaScript frameworks.',
    industry: 'Software Engineering',
    demandLevel: 'High',
    averageSalary: '$75,000 - $110,000',
    requirements: [
      { skillId: 'sk-html', requiredScore: 90, importance: 5 },
      { skillId: 'sk-css', requiredScore: 90, importance: 5 },
      { skillId: 'sk-js', requiredScore: 90, importance: 5 },
      { skillId: 'sk-react', requiredScore: 85, importance: 4 },
      { skillId: 'sk-ps', requiredScore: 80, importance: 3 },
      { skillId: 'sk-team', requiredScore: 80, importance: 3 }
    ]
  },
  {
    id: 'car-fsd',
    name: 'Full Stack Developer',
    description: 'Architects end-to-end web applications, designing both responsive frontends and resilient backend REST APIs and relational databases.',
    industry: 'Software Engineering & SaaS',
    demandLevel: 'Very High',
    averageSalary: '$95,000 - $145,000',
    requirements: [
      { skillId: 'sk-js', requiredScore: 90, importance: 5 },
      { skillId: 'sk-react', requiredScore: 85, importance: 5 },
      { skillId: 'sk-sql', requiredScore: 85, importance: 4 },
      { skillId: 'sk-py', requiredScore: 80, importance: 4 },
      { skillId: 'sk-html', requiredScore: 85, importance: 3 },
      { skillId: 'sk-css', requiredScore: 85, importance: 3 },
      { skillId: 'sk-ps', requiredScore: 85, importance: 4 }
    ]
  },
  {
    id: 'car-mle',
    name: 'AI/ML Engineer',
    description: 'Develops, deploys, and optimizes scalable machine learning pipelines, deep learning models, and production inference architectures.',
    industry: 'Artificial Intelligence & Deep Tech',
    demandLevel: 'Very High',
    averageSalary: '$120,000 - $180,000',
    requirements: [
      { skillId: 'sk-py', requiredScore: 95, importance: 5 },
      { skillId: 'sk-ml', requiredScore: 95, importance: 5 },
      { skillId: 'sk-dl', requiredScore: 90, importance: 5 },
      { skillId: 'sk-stats', requiredScore: 90, importance: 4 },
      { skillId: 'sk-pds', requiredScore: 90, importance: 4 },
      { skillId: 'sk-sql', requiredScore: 80, importance: 3 },
      { skillId: 'sk-nlp', requiredScore: 80, importance: 3 }
    ]
  },
  {
    id: 'car-uiux',
    name: 'UI/UX Designer',
    description: 'Researches user behaviors and crafts intuitive interfaces, design systems, and wireframes that delight end users.',
    industry: 'Product Design & Creative Tech',
    demandLevel: 'High',
    averageSalary: '$75,000 - $115,000',
    requirements: [
      { skillId: 'sk-pres', requiredScore: 90, importance: 5 },
      { skillId: 'sk-comm', requiredScore: 90, importance: 5 },
      { skillId: 'sk-html', requiredScore: 80, importance: 4 },
      { skillId: 'sk-css', requiredScore: 80, importance: 4 },
      { skillId: 'sk-ps', requiredScore: 85, importance: 4 },
      { skillId: 'sk-team', requiredScore: 85, importance: 3 }
    ]
  },
  {
    id: 'car-cyber',
    name: 'Cybersecurity Analyst',
    description: 'Monitors, investigates, and shields institutional IT infrastructure against vulnerabilities, cyber attacks, and unauthorized intrusions.',
    industry: 'Information Security & Cloud',
    demandLevel: 'Very High',
    averageSalary: '$88,000 - $135,000',
    requirements: [
      { skillId: 'sk-ps', requiredScore: 95, importance: 5 },
      { skillId: 'sk-py', requiredScore: 85, importance: 4 },
      { skillId: 'sk-c', requiredScore: 75, importance: 4 },
      { skillId: 'sk-sql', requiredScore: 80, importance: 4 },
      { skillId: 'sk-comm', requiredScore: 80, importance: 3 },
      { skillId: 'sk-team', requiredScore: 80, importance: 3 }
    ]
  }
];

export const DEMO_STUDENT: User = {
  id: 'usr-student-1',
  name: 'Aarav Sharma',
  email: 'student@demo.edu',
  role: 'student',
  createdAt: '2026-09-15'
};

export const DEMO_STUDENT_PROFILE: StudentProfile = {
  userId: 'usr-student-1',
  department: 'Computer Science & Engineering',
  degree: 'Bachelor of Technology (B.Tech)',
  year: '3rd Year (Semester VI)',
  cgpa: 8.6,
  targetCareerId: 'car-da' // Data Analyst
};

// Precisely calibrated so Data Analyst readiness is ~72%
// When SQL improves 40 -> 80, readiness rises to 80%!
// When SQL 80 + Power BI 75, readiness rises to 88%!
export const DEMO_STUDENT_SKILLS: StudentSkill[] = [
  { skillId: 'sk-py', score: 80, proficiencyLevel: 3 },    // Required: 85 (Gap 5, Low)
  { skillId: 'sk-sql', score: 40, proficiencyLevel: 1 },   // Required: 90 (Gap 50, High)
  { skillId: 'sk-excel', score: 75, proficiencyLevel: 2 }, // Required: 85 (Gap 10, Low)
  { skillId: 'sk-stats', score: 65, proficiencyLevel: 2 }, // Required: 80 (Gap 15, Medium)
  { skillId: 'sk-pbi', score: 20, proficiencyLevel: 1 },   // Required: 80 (Gap 60, Critical)
  { skillId: 'sk-tab', score: 50, proficiencyLevel: 2 },   // Required: 75 (Gap 25, Medium)
  { skillId: 'sk-comm', score: 85, proficiencyLevel: 3 },  // Required: 80 (Gap 0, Ready)
  { skillId: 'sk-ps', score: 75, proficiencyLevel: 2 },
  { skillId: 'sk-team', score: 80, proficiencyLevel: 3 },
  { skillId: 'sk-html', score: 65, proficiencyLevel: 2 },
  { skillId: 'sk-css', score: 60, proficiencyLevel: 2 },
  { skillId: 'sk-js', score: 55, proficiencyLevel: 2 },
  { skillId: 'sk-pds', score: 60, proficiencyLevel: 2 },
  { skillId: 'sk-ml', score: 45, proficiencyLevel: 2 }
];

export const DEMO_ADMIN: User = {
  id: 'usr-admin-1',
  name: 'Dr. Elena Vance',
  email: 'admin@demo.edu',
  role: 'admin',
  createdAt: '2026-01-10'
};
