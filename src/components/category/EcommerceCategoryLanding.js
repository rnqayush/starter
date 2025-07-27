import CategoryLanding from './CategoryLanding';

const EcommerceCategoryLanding = () => {
  const mockups = [
    {
      title: 'Fashion Store',
      description:
        'Modern e-commerce design perfect for fashion brands with clean product showcases and smooth checkout.',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      features: [
        'Product catalog with filters',
        'Shopping cart & checkout',
        'Inventory management',
        'Customer reviews & ratings',
      ],
    },
    {
      title: 'Electronics Store',
      description:
        'Technical product showcase with detailed specifications, comparison tools, and trust signals.',
      image:
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1326&q=80',
      features: [
        'Advanced product search',
        'Specification comparisons',
        'Warranty information',
        'Technical support chat',
      ],
    },
    {
      title: 'Handmade Crafts',
      description:
        'Artistic design showcasing unique handmade products with storytelling and artisan profiles.',
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      features: [
        'Artisan story pages',
        'Custom product options',
        'Gift wrapping service',
        'Social media integration',
      ],
    },
  ];

  return (
    <CategoryLanding
      category="e-commerce"
      title="E-commerce Websites"
      subtitle="Build powerful online stores that convert visitors into customers with our feature-rich e-commerce templates and integrated payment solutions."
      gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      mockups={mockups}
      demoUrl="/techmart-downtown"
      demoButtonText="See Demo Store Website"
    />
  );
};

export default EcommerceCategoryLanding;
