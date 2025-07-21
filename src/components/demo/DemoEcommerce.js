import React from "react";
import DemoWebsite from "./DemoWebsite";

const DemoEcommerce = () => {
  const features = [
    {
      icon: "🛍️",
      title: "Product Catalog",
      description: "Beautiful product displays with high-quality images, detailed descriptions, and customer reviews."
    },
    {
      icon: "💳",
      title: "Secure Checkout",
      description: "SSL-encrypted payment processing with multiple payment options including cards, wallets, and COD."
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Track sales, customer behavior, and inventory with detailed analytics and reporting tools."
    },
    {
      icon: "📱",
      title: "Mobile Optimized",
      description: "Responsive design ensures your store looks perfect on all devices and screen sizes."
    },
    {
      icon: "🚚",
      title: "Shipping Integration",
      description: "Automated shipping calculations and tracking integration with major logistics partners."
    },
    {
      icon: "⭐",
      title: "Customer Reviews",
      description: "Build trust with authentic customer reviews and ratings system to boost conversions."
    }
  ];

  return (
    <DemoWebsite
      title="StyleVault Fashion Store"
      subtitle="Discover the latest trends in fashion with our curated collection of premium clothing and accessories. Free shipping on orders over ₹999."
      gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      features={features}
      categoryPath="/category/ecommerce"
      ctaText="Start Your Store Today"
    />
  );
};

export default DemoEcommerce;
