import React from "react";
import CategoryLanding from "./CategoryLanding";

const AutomobileCategoryLanding = () => {
  const mockups = [
    {
      title: "Car Dealership",
      description: "Professional automotive website showcasing vehicle inventory with advanced search and financing options.",
      image: "https://images.unsplash.com/photo-1560563808-ad6c2aaf7716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      features: [
        "Vehicle inventory showcase",
        "Advanced search filters",
        "Financing calculator",
        "Trade-in value estimator"
      ]
    },
    {
      title: "Auto Rental Service",
      description: "Modern rental platform with real-time availability, flexible booking options, and fleet management.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Real-time availability",
        "Online booking system",
        "Fleet management tools",
        "Customer loyalty program"
      ]
    },
    {
      title: "Auto Repair Shop",
      description: "Service-focused website for auto mechanics with appointment booking and service tracking.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      features: [
        "Service appointment booking",
        "Repair estimates online",
        "Service history tracking",
        "Parts inventory system"
      ]
    }
  ];

  return (
    <CategoryLanding
      category="automobile"
      title="Automobile Websites"
      subtitle="Drive more business with professional automotive websites designed for dealerships, rental services, and repair shops with industry-specific features."
      gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      mockups={mockups}
      demoUrl="/demo-automobile"
      demoButtonText="See Demo Auto Website"
    />
  );
};

export default AutomobileCategoryLanding;
