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
  FaUsers
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
