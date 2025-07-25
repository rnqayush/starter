export const businessTemplates = [
  {
    id: 'salon',
    name: 'Beauty Salon',
    category: 'Beauty & Wellness',
    description:
      'Professional salon website with booking system and service gallery',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&w=600',
    slug: 'salon',
    primaryColor: '#e91e63',
    features: [
      'Online Booking',
      'Service Gallery',
      'Staff Profiles',
      'Client Reviews',
    ],
  },
  {
    id: 'gym',
    name: 'Fitness Gym',
    category: 'Health & Fitness',
    description: 'Modern gym website with membership plans and class schedules',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=600',
    slug: 'gym',
    primaryColor: '#ff5722',
    features: [
      'Membership Plans',
      'Class Schedule',
      'Trainer Profiles',
      'Progress Tracking',
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    category: 'Food & Dining',
    description: 'Elegant restaurant website with menu and table reservations',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=600',
    slug: 'restaurant',
    primaryColor: '#8bc34a',
    features: [
      'Digital Menu',
      'Table Reservations',
      'Chef Profiles',
      'Photo Gallery',
    ],
  },
  {
    id: 'coaching',
    name: 'Life Coach',
    category: 'Professional Services',
    description:
      'Professional coaching website with session booking and testimonials',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&w=600',
    slug: 'coaching',
    primaryColor: '#2196f3',
    features: [
      'Session Booking',
      'Program Details',
      'Success Stories',
      'Resources',
    ],
  },
  {
    id: 'digital-agency',
    name: 'Digital Agency',
    category: 'Technology',
    description: 'Modern agency website showcasing services and portfolio',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=600',
    slug: 'digital-agency',
    primaryColor: '#9c27b0',
    features: [
      'Portfolio Gallery',
      'Service Packages',
      'Team Showcase',
      'Case Studies',
    ],
  },
  {
    id: 'consultant',
    name: 'Business Consultant',
    category: 'Professional Services',
    description:
      'Professional consultant website with expertise and case studies',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=600',
    slug: 'consultant',
    primaryColor: '#607d8b',
    features: [
      'Expertise Areas',
      'Case Studies',
      'Consultation Booking',
      'Resources',
    ],
  },
  {
    id: 'freelancer',
    name: 'Freelancer Portfolio',
    category: 'Creative',
    description: 'Creative portfolio website for freelancers and artists',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=600',
    slug: 'freelancer',
    primaryColor: '#ff9800',
    features: [
      'Project Portfolio',
      'Skills Showcase',
      'Client Testimonials',
      'Contact Form',
    ],
  },
  {
    id: 'construction',
    name: 'Construction Company',
    category: 'Construction & Real Estate',
    description:
      'Professional construction website with project gallery and services',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&w=600',
    slug: 'construction',
    primaryColor: '#795548',
    features: [
      'Project Gallery',
      'Service Areas',
      'Team Profiles',
      'Quote Request',
    ],
  },
];

// Utility functions for business
export const getBusinessTemplate = slug => {
  return businessTemplates.find(template => template.slug === slug);
};
