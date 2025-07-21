import React from "react";
import CategoryLanding from "./CategoryLanding";

const BusinessCategoryLanding = () => {
  const mockups = [
    {
      title: "Professional Services",
      description: "Clean, corporate design perfect for consultants, lawyers, accountants, and professional service providers.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      features: [
        "Service portfolio showcase",
        "Client testimonials",
        "Appointment scheduling",
        "Contact forms & CRM"
      ]
    },
    {
      title: "Restaurant & Dining",
      description: "Appetizing restaurant website with online menus, reservation system, and delivery integration.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Digital menu display",
        "Online reservations",
        "Delivery integration",
        "Event booking system"
      ]
    },
    {
      title: "Fitness & Wellness",
      description: "Energetic design for gyms, yoga studios, and wellness centers with class schedules and membership management.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Class schedule & booking",
        "Membership management",
        "Trainer profiles",
        "Progress tracking tools"
      ]
    }
  ];

  return (
    <CategoryLanding
      category="business"
      title="Business Websites"
      subtitle="Establish your professional online presence with business websites tailored to your industry, from restaurants to consulting firms."
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      mockups={mockups}
      demoUrl="/salon"
      demoButtonText="See Demo Business Website"
    />
  );
};

export default BusinessCategoryLanding;
