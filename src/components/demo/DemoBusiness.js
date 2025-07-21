import React from "react";
import DemoWebsite from "./DemoWebsite";

const DemoBusiness = () => {
  const features = [
    {
      icon: "🏢",
      title: "Professional Services",
      description: "Showcase your expertise with detailed service descriptions, case studies, and professional credentials."
    },
    {
      icon: "👥",
      title: "Team Profiles",
      description: "Introduce your team with professional bios, photos, and expertise areas to build trust and credibility."
    },
    {
      icon: "📞",
      title: "Easy Contact & Booking",
      description: "Multiple contact options including online forms, appointment scheduling, and live chat support."
    },
    {
      icon: "📈",
      title: "Business Analytics",
      description: "Track website performance, lead generation, and customer engagement with comprehensive analytics."
    },
    {
      icon: "🌟",
      title: "Client Testimonials",
      description: "Display customer success stories and testimonials to demonstrate your track record of excellence."
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description: "Responsive design optimized for mobile devices to reach customers wherever they are."
    }
  ];

  return (
    <DemoWebsite
      title="Pinnacle Consulting Group"
      subtitle="Strategic business consulting services to help your company achieve sustainable growth. Expert guidance for digital transformation, operations optimization, and strategic planning."
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      features={features}
      categoryPath="/category/business"
      ctaText="Schedule a Consultation"
    />
  );
};

export default DemoBusiness;
