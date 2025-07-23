import React from 'react';
import DemoWebsite from './DemoWebsite';

const DemoAutomobile = () => {
  const features = [
    {
      icon: '🚗',
      title: 'Vehicle Inventory',
      description:
        'Comprehensive vehicle listings with detailed specifications, multiple photos, and 360° views.',
    },
    {
      icon: '🔍',
      title: 'Advanced Search',
      description:
        'Powerful search and filter system by make, model, year, price range, and features to find the perfect vehicle.',
    },
    {
      icon: '💰',
      title: 'Financing Calculator',
      description:
        'Built-in loan calculator and financing options to help customers understand payment options.',
    },
    {
      icon: '🔄',
      title: 'Trade-In Valuation',
      description:
        "Instant trade-in value estimator to help customers determine their vehicle's worth.",
    },
    {
      icon: '📋',
      title: 'Service Booking',
      description:
        'Online service appointment scheduling with maintenance reminders and service history tracking.',
    },
    {
      icon: '🛡️',
      title: 'Warranty & Insurance',
      description:
        'Comprehensive warranty information and insurance partnership integration for complete peace of mind.',
    },
  ];

  return (
    <DemoWebsite
      title="Premier Auto Dealership"
      subtitle="Your trusted partner for quality vehicles and exceptional service. Explore our extensive inventory of new and certified pre-owned vehicles with competitive financing options."
      gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      features={features}
      categoryPath="/category/automobile"
      ctaText="Browse Our Inventory"
    />
  );
};

export default DemoAutomobile;
