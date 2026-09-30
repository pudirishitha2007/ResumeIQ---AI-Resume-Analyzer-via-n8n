import { TargetRoleInfo } from '../types.ts';

export const TARGET_ROLES: TargetRoleInfo[] = [
  {
    id: 'swe',
    title: 'Software Engineering & Architecture',
    category: 'Engineering',
    summary: 'Focuses on systems scalability, algorithm complexity, microservice design, clean testing, and production deployment reliability.',
    criticalKeywords: [
      'System Architecture',
      'Distributed Systems',
      'CI/CD Pipelines',
      'TypeScript / Python / Go',
      'Kubernetes & Docker',
      'Database Optimization (SQL/NoSQL)',
      'API Design (REST/gRPC)',
      'Unit & Integration Testing'
    ],
    commonPitfalls: [
      'Listing tech stacks without attributing them to specific outcomes',
      'Omitting performance metrics (latency reduction, QPS, uptime)',
      'Complex multi-column resumes that fail ATS parsers'
    ],
    benchmarks: [
      { label: 'Quantified System Outcomes', target: '≥ 3 bullet points with % or ms latency metrics', importance: 'Critical' },
      { label: 'Cloud & Infrastructure Stacks', target: 'Explicit cloud tools (AWS, GCP, or Azure)', importance: 'High' },
      { label: 'Production Scale Evidence', target: 'Clear user base or daily transaction figures', importance: 'High' }
    ]
  },
  {
    id: 'pm',
    title: 'Product Management & Growth',
    category: 'Product',
    summary: 'Prioritizes customer discovery, revenue acceleration, cross-functional roadmap execution, and measurable retention impact.',
    criticalKeywords: [
      'Product Discovery',
      'Go-To-Market (GTM) Strategy',
      'KPI & OKR Ownership',
      'Customer Retention & LTV',
      'User Research & A/B Testing',
      'Agile / Scrum Methodologies',
      'Cross-Functional Leadership',
      'Data Analytics (Mixpanel/SQL)'
    ],
    commonPitfalls: [
      'Focusing on feature delivery rather than business KPIs and revenue impact',
      'Vague statements like "managed stakeholders" without tangible deliverables',
      'Absence of user validation methods or experiment results'
    ],
    benchmarks: [
      { label: 'Financial / Conversion Metrics', target: 'Arr, GMV, or conversion rate gains documented', importance: 'Critical' },
      { label: 'User Discovery Cadence', target: 'Explicit user interviews or validation loops', importance: 'High' },
      { label: 'Cross-functional Scope', target: 'Teams coordinated (design, engineering, sales)', importance: 'Medium' }
    ]
  },
  {
    id: 'data',
    title: 'Data Science & Machine Learning',
    category: 'Data & AI',
    summary: 'Evaluates model experimentation rigour, feature engineering, pipeline throughput, and automated workflow integration.',
    criticalKeywords: [
      'Predictive Modeling',
      'PyTorch / TensorFlow / Scikit-learn',
      'Feature Engineering & Pipelines',
      'Model Evaluation (F1, AUC-ROC)',
      'Large Language Models & Embeddings',
      'Data Warehousing (Snowflake/BigQuery)',
      'MLOps & Containerization',
      'Statistical Hypothesis Testing'
    ],
    commonPitfalls: [
      'Listing academic theoretical models without business application context',
      'Missing baseline comparisons for model performance',
      'Failure to specify production deployment environment'
    ],
    benchmarks: [
      { label: 'Model Baseline Comparison', target: 'State precision/recall improvement over baseline', importance: 'Critical' },
      { label: 'Data Scale Context', target: 'Dataset size (GB/TB, millions of records)', importance: 'High' },
      { label: 'MLOps Automation', target: 'Inference pipeline or serving latency metrics', importance: 'High' }
    ]
  },
  {
    id: 'design',
    title: 'Product & UX Design',
    category: 'Design',
    summary: 'Focuses on design systems maturity, user journey optimization, usability testing metrics, and design-to-code collaboration.',
    criticalKeywords: [
      'Design Systems Architecture',
      'Figma & Prototyping',
      'User Research & Usability Testing',
      'Information Architecture (IA)',
      'Design Tokens & Accessibility (WCAG)',
      'Conversion Rate Optimization',
      'Customer Journey Mapping',
      'Developer Handoff Workflows'
    ],
    commonPitfalls: [
      'Submitting heavy graphical PDF portfolios that confuse plain-text ATS parsers',
      'Omitting direct link to interactive portfolio or case studies',
      'Describing visual polish without mentioning user task completion rates'
    ],
    benchmarks: [
      { label: 'Standard ATS-Friendly PDF', target: 'Clean selectable text, zero rasterized typography', importance: 'Critical' },
      { label: 'Usability Improvements', target: 'Task completion or reduction in user friction %', importance: 'High' },
      { label: 'Design System Governance', target: 'Component library adoption or token management', importance: 'Medium' }
    ]
  },
  {
    id: 'marketing',
    title: 'Growth Marketing & Revenue',
    category: 'Marketing',
    summary: 'Evaluates acquisition funnel efficiency, CAC/LTV economics, multichannel campaign scaling, and organic growth flywheels.',
    criticalKeywords: [
      'Customer Acquisition Cost (CAC)',
      'Lifetime Value (LTV:CAC Ratio)',
      'Paid Acquisition (Meta/Google Ads)',
      'SEO & Organic Traffic Strategy',
      'Marketing Automation (HubSpot/Klaviyo)',
      'Conversion Rate Optimization (CRO)',
      'Content Syndication & Attribution',
      'Pipeline Velocity & Lead Scoring'
    ],
    commonPitfalls: [
      'Listing vanity engagement metrics (impressions, clicks) instead of pipeline revenue',
      'Missing budget ownership or ROAS (Return On Ad Spend) indicators',
      'Vague campaign descriptions without attribution models'
    ],
    benchmarks: [
      { label: 'Revenue & Pipeline Attributable', target: 'Dollar or percentage revenue contribution', importance: 'Critical' },
      { label: 'CAC Efficiency', target: 'Customer acquisition cost reduction metrics', importance: 'High' },
      { label: 'Channel Scale', target: 'Monthly spend or inbound volume managed', importance: 'Medium' }
    ]
  }
];
