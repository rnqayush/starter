// Platform-specific data for the main website
import {
  FaHotel,
  FaCar,
  FaRing,
  FaShoppingBag,
  FaGlobe,
  FaCode,
  FaPalette,
  FaCloud,
  FaLock,
  FaRocket,
  FaCrown,
  FaAward,
  FaShieldAlt,
  FaHeadset,
  FaChartLine,
  FaUsers,
  FaBriefcase,
  FaShoppingCart,
} from 'react-icons/fa';

export const storeCategories = [
  {
    id: 'hotels',
    icon: FaHotel,
    title: 'Hotels',
    description:
      'Boutique hotels, resorts, and bed & breakfasts showcase their rooms and services with stunning booking systems.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    path: '/website-examples/hotel',
  },
  {
    id: 'ecommerce',
    icon: FaShoppingBag,
    title: 'Ecommerce',
    description:
      'Fashion brands, electronics stores, and artisan shops sell products with beautiful catalogs and secure checkout.',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    path: '/website-examples/ecommerce',
  },
  {
    id: 'weddings',
    icon: FaRing,
    title: 'Weddings',
    description:
      'Wedding planners, photographers, and venues share their portfolios and book clients with elegant galleries.',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    path: '/website-examples/wedding',
  },
  {
    id: 'automobiles',
    icon: FaCar,
    title: 'Automobiles',
    description:
      'Car dealerships, rental companies, and mechanics display inventory and connect with customers online.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    path: '/website-examples/automobile',
  },
  {
    id: 'business-websites',
    icon: FaGlobe,
    title: 'Business Websites',
    description:
      'Professional websites for salons, gyms, restaurants, consultants, and more. Showcase services with elegant templates.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    path: '/website-examples/business',
  },
];

export const platformStats = [
  { number: '50K+', label: 'Active Stores' },
  { number: '99.9%', label: 'Uptime' },
  { number: '24/7', label: 'Expert Support' },
  { number: '4.9/5', label: 'Customer Rating' },
];

export const platformBenefits = [
  {
    icon: FaCode,
    title: 'No-Code Platform',
    description:
      'Build professional stores without writing a single line of code. Our drag-and-drop interface makes it simple.',
  },
  {
    icon: FaPalette,
    title: 'Unlimited Customization',
    description:
      'Design freedom with hundreds of templates and complete brand control. Make your store uniquely yours.',
  },
  {
    icon: FaCloud,
    title: 'Enterprise-Grade Infrastructure',
    description:
      'Built on reliable cloud infrastructure with 99.9% uptime and lightning-fast loading speeds.',
  },
  {
    icon: FaLock,
    title: 'Secure & Compliant',
    description:
      'Bank-level security with SSL certificates, PCI compliance, and automated backups included.',
  },
];

export const platformTestimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Hotel Owner',
    text: 'StoreBuilder transformed our booking process. We went from 20% to 85% online bookings in just 3 months.',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'E-commerce Entrepreneur',
    text: 'The platform paid for itself in the first month. Sales increased by 300% with their conversion-optimized templates.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Wedding Planner',
    text: "My clients love the professional portfolio gallery. I've booked more weddings this year than ever before.",
    rating: 5,
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    description:
      'Perfect for individuals and small businesses getting started online',
    icon: FaRocket,
    monthlyPrice: 2000,
    yearlyPrice: 20000,
    originalYearlyPrice: 24000,
    features: [
      'Custom subdomain (yourname.storebuilder.com)',
      'Professional website templates',
      'Mobile-responsive design',
      'Basic SEO optimization',
      'Contact forms & email integration',
      '5GB storage space',
      'Basic analytics dashboard',
      'Email support',
      'SSL certificate included',
      'Social media integration',
    ],
  },
  {
    name: 'Professional',
    description:
      'Ideal for growing businesses that need more features and customization',
    icon: FaCrown,
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    originalYearlyPrice: 60000,
    featured: true,
    features: [
      'Custom domain included (yourname.com)',
      'Everything in Starter plan',
      'Advanced design customization',
      'E-commerce functionality',
      'Payment gateway integration',
      'Advanced SEO tools',
      'Google Analytics integration',
      'Priority email support',
      'Remove branding',
      '50GB storage space',
      'Advanced contact forms',
      'Newsletter integration',
      'Social media management tools',
    ],
  },
  {
    name: 'Enterprise',
    description:
      'For established businesses needing premium features and dedicated support',
    icon: FaAward,
    monthlyPrice: 10000,
    yearlyPrice: 100000,
    originalYearlyPrice: 120000,
    features: [
      'Multiple custom domains',
      'Everything in Professional plan',
      'Advanced e-commerce features',
      'Multi-language support',
      'Advanced security features',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
      'Unlimited storage',
      'Advanced analytics & reporting',
      'API access',
      'White-label solutions',
      'Priority feature requests',
      'Custom training sessions',
    ],
  },
];

export const pricingFeatures = [
  {
    icon: FaCode,
    title: 'No Code Required',
    description:
      'Build professional websites without any technical knowledge. Our drag-and-drop builder makes it easy for anyone.',
  },
  {
    icon: FaGlobe,
    title: 'Global CDN',
    description:
      'Lightning-fast loading speeds worldwide with our global content delivery network and optimized hosting.',
  },
  {
    icon: FaShieldAlt,
    title: 'Advanced Security',
    description:
      'Bank-level security with SSL certificates, regular backups, and protection against malware and attacks.',
  },
  {
    icon: FaHeadset,
    title: 'Expert Support',
    description:
      'Get help when you need it with our dedicated support team available via email, chat, and phone.',
  },
  {
    icon: FaChartLine,
    title: 'Analytics & Insights',
    description:
      'Track your website performance with detailed analytics and insights to grow your business.',
  },
  {
    icon: FaUsers,
    title: 'Team Collaboration',
    description:
      'Work together with your team members and clients with our collaborative editing features.',
  },
];

export const pricingFAQs = [
  {
    question: "What's included in the free trial?",
    answer:
      'You get full access to all features for 14 days, including custom domains, premium templates, and priority support. No credit card required to start.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you'll only pay the prorated difference for the current billing cycle.",
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment in full.",
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No setup fees! The price you see is exactly what you pay. We believe in transparent pricing with no hidden costs.',
  },
  {
    question: 'Can I use my own domain?',
    answer:
      'Absolutely! Professional and Enterprise plans include a free custom domain for the first year. You can also connect an existing domain you own.',
  },
  {
    question: 'How secure is my website?',
    answer:
      'Very secure! All plans include SSL certificates, regular backups, malware protection, and we follow industry best practices for security.',
  },
];

export const websiteTypes = [
  {
    id: 'weddings',
    icon: FaRing,
    title: 'Weddings',
    description: 'Wedding planners & venues',
  },
  {
    id: 'hotels',
    icon: FaHotel,
    title: 'Hotels',
    description: 'Hotels & accommodations',
  },
  {
    id: 'ecommerce',
    icon: FaShoppingCart,
    title: 'Ecommerce',
    description: 'Online stores',
  },
  {
    id: 'automobiles',
    icon: FaCar,
    title: 'Automobiles',
    description: 'Car dealers & rentals',
  },
  {
    id: 'professional',
    icon: FaBriefcase,
    title: 'Professional',
    description: 'Business websites',
  },
];

export const colorOptions = [
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
];
