import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import HotelModule from '../modules/hotel';
import EcommerceModule from '../modules/ecommerce';
import AutomobileModule from '../modules/automobiles';
import WeddingModule from '../modules/weddings';
import BusinessModule from '../modules/business';
import {
  getHotelBySlug,
  getVendorBySlug,
  getAutomobileVendorBySlug,
  getVendorById,
  getBusinessTemplate,
} from '../DummyData';
import HotelDetail from '../modules/hotel/pages/HotelDetail';
import EcommerceMain from '../modules/ecommerce/pages/EcommerceMain';

const SmartRouter = () => {
  const { slug } = useParams();
  const location = useLocation();
  const path = location.pathname;

  // Helper function to determine module type based on slug
  const getModuleType = slug => {
    // Check each data source to determine the module type // api call to find type
    const hotel = getHotelBySlug(slug);
    if (hotel) return 'hotel';

    const automobileDealer = getAutomobileVendorBySlug(slug);
    if (automobileDealer) return 'automobile';

    const vendor = getVendorBySlug(slug);
    if (vendor) return 'ecommerce';

    const weddingVendor = getVendorById(slug);
    if (weddingVendor) return 'wedding';

    const businessTemplate = getBusinessTemplate(slug);
    if (businessTemplate) return 'business';

    return null;
  };

  const moduleType = getModuleType(slug);
  console.log('[SmartRouter] Slug detected:', slug, 'Module type:', moduleType);

  // If no module found, show 404
  if (!moduleType) {
    console.log('[SmartRouter] No module found for slug:', slug);
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
