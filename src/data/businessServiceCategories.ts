export interface SubService {
  id: string;
  name: string;
  description: string;
  icon: string;
  priceRange?: string;
  demand?: 'High' | 'Medium' | 'Low';
}

export interface BusinessServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subServices: SubService[];
}

export const BUSINESS_SERVICE_CATEGORIES: BusinessServiceCategory[] = [
  {
    id: 'tech_software',
    name: 'Technology & Software',
    description: 'Cutting-edge technology solutions and software development services',
    icon: 'Laptop',
    color: 'from-blue-500 to-cyan-500',
    subServices: [
      {
        id: 'web_dev',
        name: 'Web Development',
        description: 'Custom websites, web applications, and e-commerce solutions',
        icon: 'Globe',
        priceRange: '$50-200/hr',
        demand: 'High'
      },
      {
        id: 'mobile_dev',
        name: 'Mobile App Development',
        description: 'iOS and Android mobile applications',
        icon: 'Smartphone',
        priceRange: '$60-250/hr',
        demand: 'High'
      },
      {
        id: 'software_dev',
        name: 'Software Development',
        description: 'Custom software solutions and enterprise applications',
        icon: 'Code',
        priceRange: '$70-300/hr',
        demand: 'High'
      },
      {
        id: 'ui_ux_design',
        name: 'UI/UX Design',
        description: 'User interface and user experience design',
        icon: 'Palette',
        priceRange: '$40-180/hr',
        demand: 'High'
      },
      {
        id: 'cloud_services',
        name: 'Cloud Services',
        description: 'Cloud migration, setup, and management',
        icon: 'Cloud',
        priceRange: '$80-250/hr',
        demand: 'High'
      },
      {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        description: 'Security audits, penetration testing, and security consulting',
        icon: 'Shield',
        priceRange: '$100-400/hr',
        demand: 'High'
      },
      {
        id: 'data_analytics',
        name: 'Data Analytics & AI',
        description: 'Data analysis, machine learning, and AI solutions',
        icon: 'BarChart3',
        priceRange: '$90-350/hr',
        demand: 'High'
      },
      {
        id: 'devops',
        name: 'DevOps & Infrastructure',
        description: 'CI/CD, containerization, and infrastructure management',
        icon: 'Settings',
        priceRange: '$85-280/hr',
        demand: 'Medium'
      }
    ]
  },
  {
    id: 'healthcare_medical',
    name: 'Healthcare & Medical',
    description: 'Comprehensive healthcare services and medical solutions',
    icon: 'Heart',
    color: 'from-red-500 to-pink-500',
    subServices: [
      {
        id: 'general_practice',
        name: 'General Practice',
        description: 'Primary healthcare and routine medical examinations',
        icon: 'Stethoscope',
        priceRange: '$150-300/visit',
        demand: 'High'
      },
      {
        id: 'telemedicine',
        name: 'Telemedicine',
        description: 'Remote medical consultations and digital health services',
        icon: 'Video',
        priceRange: '$80-200/consultation',
        demand: 'High'
      },
      {
        id: 'mental_health',
        name: 'Mental Health Services',
        description: 'Therapy, counseling, and psychological support',
        icon: 'Brain',
        priceRange: '$100-250/session',
        demand: 'High'
      },
      {
        id: 'dental_care',
        name: 'Dental Care',
        description: 'Dental examinations, cleanings, and treatments',
        icon: 'Smile',
        priceRange: '$100-500/visit',
        demand: 'High'
      },
      {
        id: 'physical_therapy',
        name: 'Physical Therapy',
        description: 'Rehabilitation and physical therapy services',
        icon: 'Activity',
        priceRange: '$80-180/session',
        demand: 'Medium'
      },
      {
        id: 'nutrition_wellness',
        name: 'Nutrition & Wellness',
        description: 'Dietary consultation and wellness coaching',
        icon: 'Apple',
        priceRange: '$75-150/session',
        demand: 'Medium'
      },
      {
        id: 'medical_devices',
        name: 'Medical Device Services',
        description: 'Medical equipment maintenance and consultation',
        icon: 'Wrench',
        priceRange: '$100-300/hr',
        demand: 'Medium'
      }
    ]
  },
  {
    id: 'real_estate',
    name: 'Real Estate',
    description: 'Property services, investment, and real estate solutions',
    icon: 'Home',
    color: 'from-green-500 to-emerald-500',
    subServices: [
      {
        id: 'residential_sales',
        name: 'Residential Sales',
        description: 'Buying and selling residential properties',
        icon: 'Home',
        priceRange: '3-6% commission',
        demand: 'High'
      },
      {
        id: 'commercial_real_estate',
        name: 'Commercial Real Estate',
        description: 'Commercial property sales and leasing',
        icon: 'Building',
        priceRange: '4-8% commission',
        demand: 'Medium'
      },
      {
        id: 'property_management',
        name: 'Property Management',
        description: 'Rental property management and maintenance',
        icon: 'Key',
        priceRange: '8-12% of rent',
        demand: 'High'
      },
      {
        id: 'real_estate_investment',
        name: 'Investment Consulting',
        description: 'Real estate investment advice and analysis',
        icon: 'TrendingUp',
        priceRange: '$150-400/hr',
        demand: 'Medium'
      },
      {
        id: 'property_valuation',
        name: 'Property Valuation',
        description: 'Property appraisal and market analysis',
        icon: 'Calculator',
        priceRange: '$300-800/appraisal',
        demand: 'Medium'
      },
      {
        id: 'real_estate_photography',
        name: 'Real Estate Photography',
        description: 'Professional property photography and virtual tours',
        icon: 'Camera',
        priceRange: '$200-600/shoot',
        demand: 'High'
      },
      {
        id: 'legal_services',
        name: 'Real Estate Legal Services',
        description: 'Legal assistance for property transactions',
        icon: 'Scale',
        priceRange: '$250-500/hr',
        demand: 'Medium'
      }
    ]
  },
  {
    id: 'marketing_advertising',
    name: 'Marketing & Advertising',
    description: 'Digital marketing, branding, and advertising solutions',
    icon: 'Megaphone',
    color: 'from-purple-500 to-violet-500',
    subServices: [
      {
        id: 'digital_marketing',
        name: 'Digital Marketing',
        description: 'SEO, SEM, and online marketing strategies',
        icon: 'Search',
        priceRange: '$75-250/hr',
        demand: 'High'
      },
      {
        id: 'social_media_marketing',
        name: 'Social Media Marketing',
        description: 'Social media strategy and content management',
        icon: 'Share2',
        priceRange: '$50-200/hr',
        demand: 'High'
      },
      {
        id: 'content_marketing',
        name: 'Content Marketing',
        description: 'Content creation, blogging, and copywriting',
        icon: 'PenTool',
        priceRange: '$40-150/hr',
        demand: 'High'
      },
      {
        id: 'brand_design',
        name: 'Brand Design',
        description: 'Logo design, branding, and visual identity',
        icon: 'Paintbrush',
        priceRange: '$500-5000/project',
        demand: 'Medium'
      },
      {
        id: 'email_marketing',
        name: 'Email Marketing',
        description: 'Email campaigns and marketing automation',
        icon: 'Mail',
        priceRange: '$50-180/hr',
        demand: 'Medium'
      },
      {
        id: 'video_marketing',
        name: 'Video Marketing',
        description: 'Video production and marketing content',
        icon: 'Video',
        priceRange: '$100-400/hr',
        demand: 'High'
      },
      {
        id: 'advertising_campaigns',
        name: 'Advertising Campaigns',
        description: 'PPC campaigns and advertising management',
        icon: 'Target',
        priceRange: '$60-220/hr',
        demand: 'High'
      }
    ]
  },
  {
    id: 'finance_accounting',
    name: 'Finance & Accounting',
    description: 'Financial services, accounting, and business consulting',
    icon: 'DollarSign',
    color: 'from-yellow-500 to-orange-500',
    subServices: [
      {
        id: 'bookkeeping',
        name: 'Bookkeeping',
        description: 'Financial record keeping and transaction management',
        icon: 'BookOpen',
        priceRange: '$30-80/hr',
        demand: 'High'
      },
      {
        id: 'tax_preparation',
        name: 'Tax Preparation',
        description: 'Tax filing and planning services',
        icon: 'FileText',
        priceRange: '$200-800/return',
        demand: 'High'
      },
      {
        id: 'financial_planning',
        name: 'Financial Planning',
        description: 'Investment advice and financial strategy',
        icon: 'TrendingUp',
        priceRange: '$150-400/hr',
        demand: 'Medium'
      },
      {
        id: 'business_consulting',
        name: 'Business Consulting',
        description: 'Strategic business advice and planning',
        icon: 'Briefcase',
        priceRange: '$100-350/hr',
        demand: 'Medium'
      },
      {
        id: 'payroll_services',
        name: 'Payroll Services',
        description: 'Employee payroll management and processing',
        icon: 'Users',
        priceRange: '$50-150/hr',
        demand: 'Medium'
      },
      {
        id: 'audit_services',
        name: 'Audit Services',
        description: 'Financial audits and compliance services',
        icon: 'CheckCircle',
        priceRange: '$150-400/hr',
        demand: 'Low'
      }
    ]
  },
  {
    id: 'education_training',
    name: 'Education & Training',
    description: 'Educational services, training, and skill development',
    icon: 'GraduationCap',
    color: 'from-indigo-500 to-blue-500',
    subServices: [
      {
        id: 'online_tutoring',
        name: 'Online Tutoring',
        description: 'One-on-one and group tutoring sessions',
        icon: 'User',
        priceRange: '$25-100/hr',
        demand: 'High'
      },
      {
        id: 'corporate_training',
        name: 'Corporate Training',
        description: 'Professional development and skills training',
        icon: 'Building2',
        priceRange: '$100-300/hr',
        demand: 'Medium'
      },
      {
        id: 'language_learning',
        name: 'Language Learning',
        description: 'Foreign language instruction and coaching',
        icon: 'MessageCircle',
        priceRange: '$30-80/hr',
        demand: 'Medium'
      },
      {
        id: 'course_creation',
        name: 'Course Creation',
        description: 'Educational content and curriculum development',
        icon: 'BookOpen',
        priceRange: '$50-200/hr',
        demand: 'Medium'
      },
      {
        id: 'test_prep',
        name: 'Test Preparation',
        description: 'Standardized test preparation and coaching',
        icon: 'ClipboardCheck',
        priceRange: '$40-120/hr',
        demand: 'Medium'
      },
      {
        id: 'educational_consulting',
        name: 'Educational Consulting',
        description: 'Academic planning and educational strategy',
        icon: 'Lightbulb',
        priceRange: '$75-200/hr',
        demand: 'Low'
      }
    ]
  },
  {
    id: 'creative_design',
    name: 'Creative & Design',
    description: 'Creative services, design, and artistic solutions',
    icon: 'Palette',
    color: 'from-pink-500 to-rose-500',
    subServices: [
      {
        id: 'graphic_design',
        name: 'Graphic Design',
        description: 'Visual design for print and digital media',
        icon: 'Image',
        priceRange: '$40-150/hr',
        demand: 'High'
      },
      {
        id: 'web_design',
        name: 'Web Design',
        description: 'Website design and user interface creation',
        icon: 'Monitor',
        priceRange: '$50-180/hr',
        demand: 'High'
      },
      {
        id: 'photography',
        name: 'Photography',
        description: 'Professional photography services',
        icon: 'Camera',
        priceRange: '$100-400/hr',
        demand: 'Medium'
      },
      {
        id: 'video_production',
        name: 'Video Production',
        description: 'Video creation, editing, and post-production',
        icon: 'Video',
        priceRange: '$75-300/hr',
        demand: 'High'
      },
      {
        id: 'illustration',
        name: 'Illustration',
        description: 'Custom illustrations and artwork',
        icon: 'Brush',
        priceRange: '$50-200/hr',
        demand: 'Medium'
      },
      {
        id: 'animation',
        name: 'Animation & Motion Graphics',
        description: '2D/3D animation and motion graphics',
        icon: 'Play',
        priceRange: '$80-250/hr',
        demand: 'Medium'
      }
    ]
  },
  {
    id: 'legal_services',
    name: 'Legal Services',
    description: 'Legal consultation, representation, and compliance services',
    icon: 'Scale',
    color: 'from-gray-600 to-slate-600',
    subServices: [
      {
        id: 'business_law',
        name: 'Business Law',
        description: 'Corporate legal services and business formation',
        icon: 'Building',
        priceRange: '$200-600/hr',
        demand: 'Medium'
      },
      {
        id: 'contract_law',
        name: 'Contract Law',
        description: 'Contract drafting, review, and negotiation',
        icon: 'FileText',
        priceRange: '$250-500/hr',
        demand: 'Medium'
      },
      {
        id: 'intellectual_property',
        name: 'Intellectual Property',
        description: 'Patents, trademarks, and IP protection',
        icon: 'Shield',
        priceRange: '$300-700/hr',
        demand: 'Low'
      },
      {
        id: 'employment_law',
        name: 'Employment Law',
        description: 'Workplace legal issues and HR compliance',
        icon: 'Users',
        priceRange: '$200-450/hr',
        demand: 'Medium'
      },
      {
        id: 'family_law',
        name: 'Family Law',
        description: 'Divorce, custody, and family legal matters',
        icon: 'Heart',
        priceRange: '$150-400/hr',
        demand: 'Medium'
      },
      {
        id: 'immigration_law',
        name: 'Immigration Law',
        description: 'Visa, citizenship, and immigration services',
        icon: 'Globe',
        priceRange: '$200-500/hr',
        demand: 'Medium'
      }
    ]
  }
];

export const getServiceCategoryById = (id: string): BusinessServiceCategory | undefined => {
  return BUSINESS_SERVICE_CATEGORIES.find(category => category.id === id);
};

export const getSubServiceById = (categoryId: string, subServiceId: string): SubService | undefined => {
  const category = getServiceCategoryById(categoryId);
  return category?.subServices.find(service => service.id === subServiceId);
};