import React from 'react';
import { useParams } from 'react-router-dom';
import HotelModule from '../hotel';
import EcommerceModule from '../ecommerce';
import AutomobileModule from '../automobiles';
import WeddingModule from '../weddings';
import BusinessModule from '../business';
import { getHotelBySlug } from '../hotel/data/hotels';
import { getVendorBySlug } from '../ecommerce/data/vendors';
import { getVendorBySlug as getAutomobileVendorBySlug } from '../automobiles/data/vendors';
import { getVendorById } from '../weddings/data/vendors';
import { getBusinessTemplate } from '../business/data/businessTemplates';

const SmartRouter = () => {
  const { slug } = useParams();

  // Helper function to determine module type based on slug
  const getModuleType = slug => {
    // Check each data source to determine the module type // api call to find type
    const hotel = getHotelBySlug(slug);
    if (hotel) return 'hotel';

    const vendor = getVendorBySlug(slug);
    if (vendor) return 'ecommerce';

    const automobileDealer = getAutomobileVendorBySlug(slug);
    if (automobileDealer) return 'automobile';

    const weddingVendor = getVendorById(slug);
    if (weddingVendor) return 'wedding';

    const businessTemplate = getBusinessTemplate(slug);
    if (businessTemplate) return 'business';

    return null;
  };

  const moduleType = getModuleType(slug);

  // If no module found, show 404
  if (!moduleType) {
    return (
      <div
        style={{
          padding: '4rem',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2
          style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}
        >
          Page not found
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          style={{
            color: '#3b82f6',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            border: '1px solid #3b82f6',
            borderRadius: '0.5rem',
          }}
        >
          Go Home
        </a>
      </div>
    );
  }

  // Route to appropriate module based on detected type
  switch (moduleType) {
    case 'hotel':
      return <HotelModule />;
    case 'ecommerce':
      return <EcommerceModule />;
    case 'automobile':
      return <AutomobileModule />;
    case 'wedding':
      return <WeddingModule />;
    case 'business':
      return <BusinessModule />;
    default:
      return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Page not found</h2>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      );
  }
};

export default SmartRouter;
