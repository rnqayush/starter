import React from "react";
import CategoryLanding from "./CategoryLanding";

const WeddingCategoryLanding = () => {
  const mockups = [
    {
      title: "Wedding Photography Studio",
      description: "Elegant portfolio showcase for wedding photographers with stunning galleries and booking integration.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      features: [
        "Portfolio gallery showcase",
        "Wedding package pricing",
        "Client testimonials",
        "Online consultation booking"
      ]
    },
    {
      title: "Wedding Planning Service",
      description: "Comprehensive wedding planning website with service packages, vendor network, and planning tools.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Service package details",
        "Wedding timeline planner",
        "Vendor recommendations",
        "Budget planning tools"
      ]
    },
    {
      title: "Wedding Venue",
      description: "Beautiful venue showcase with virtual tours, capacity details, and easy booking system.",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Virtual venue tours",
        "Capacity & pricing info",
        "Available date calendar",
        "Catering menu options"
      ]
    }
  ];

  return (
    <CategoryLanding
      category="wedding"
      title="Wedding Websites"
      subtitle="Create breathtaking wedding websites that capture love stories and help couples plan their perfect day with our romantic and elegant templates."
      gradient="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
      mockups={mockups}
      demoUrl="/demo-wedding"
      demoButtonText="See Demo Wedding Website"
    />
  );
};

export default WeddingCategoryLanding;
