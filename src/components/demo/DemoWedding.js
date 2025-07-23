import React from 'react';
import DemoWebsite from './DemoWebsite';

const DemoWedding = () => {
  const features = [
    {
      icon: '📸',
      title: 'Portfolio Gallery',
      description:
        'Showcase your best work with stunning photo galleries that capture the magic of every wedding moment.',
    },
    {
      icon: '💍',
      title: 'Wedding Packages',
      description:
        'Display comprehensive wedding packages with transparent pricing and detailed service inclusions.',
    },
    {
      icon: '📅',
      title: 'Booking Calendar',
      description:
        'Real-time availability calendar with easy online booking and consultation scheduling system.',
    },
    {
      icon: '💬',
      title: 'Client Testimonials',
      description:
        'Share heartfelt reviews and testimonials from happy couples to build trust and credibility.',
    },
    {
      icon: '🎬',
      title: 'Video Highlights',
      description:
        'Feature wedding highlight reels and behind-the-scenes videos to showcase your storytelling skills.',
    },
    {
      icon: '📋',
      title: 'Planning Tools',
      description:
        'Provide couples with interactive planning tools, checklists, and timeline management features.',
    },
  ];

  return (
    <DemoWebsite
      title="Eternal Moments Photography"
      subtitle="Capturing your love story with artistic elegance. Professional wedding photography and videography services to preserve your most precious moments forever."
      gradient="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
      features={features}
      categoryPath="/category/wedding"
      ctaText="Book Your Consultation"
    />
  );
};

export default DemoWedding;
