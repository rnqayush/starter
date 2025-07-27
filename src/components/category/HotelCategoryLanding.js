import CategoryLanding from './CategoryLanding';

const HotelCategoryLanding = () => {
  const mockups = [
    {
      title: 'Luxury Resort Website',
      description:
        'Elegant design showcasing premium accommodations with stunning visuals and seamless booking experience.',
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      features: [
        'Real-time room availability',
        'Integrated payment processing',
        'Guest review system',
        'Mobile-responsive design',
      ],
    },
    {
      title: 'Boutique Hotel Portal',
      description:
        'Intimate and personalized website design perfect for boutique hotels and bed & breakfasts.',
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      features: [
        'Photo gallery showcase',
        'Online booking calendar',
        'Guest communication portal',
        'Local attractions guide',
      ],
    },
    {
      title: 'Modern Hotel Chain',
      description:
        'Professional multi-location website with centralized management and location-specific content.',
      image:
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      features: [
        'Multi-location management',
        'Loyalty program integration',
        'Business travel booking',
        'Group reservation system',
      ],
    },
  ];

  return (
    <CategoryLanding
      category="hotel"
      title="Hotel Websites"
      subtitle="Create stunning hotel websites that drive bookings and showcase your property with professional templates designed for the hospitality industry."
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      mockups={mockups}
      demoUrl="/taj-palace"
      demoButtonText="See Demo Hotel Website"
    />
  );
};

export default HotelCategoryLanding;
