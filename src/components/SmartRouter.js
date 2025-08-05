import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import HotelModule from '../hotel';
import EcommerceModule from '../ecommerce';
import AutomobileModule from '../automobiles';
import WeddingModule from '../weddings';
import BusinessModule from '../business';
import {
  getHotelBySlug,
  getVendorBySlug,
  getAutomobileVendorBySlug,
  getVendorById,
  getBusinessTemplate,
} from '../DummyData';
import HotelDetail from '../hotel/pages/HotelDetail';
import EcommerceMain from '../ecommerce/pages/EcommerceMain';
import websiteService from '../api/services/websiteService';

const SmartRouter = () => {
  const { slug } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const [moduleType, setModuleType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [websiteData, setWebsiteData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [error, setError] = useState(null);

  // Helper function to determine module type based on slug
  const getModuleTypeFromDummyData = slug => {
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

  // Check for website in backend or localStorage
  useEffect(() => {
    const checkWebsiteExists = async () => {
      setIsLoading(true);
      setError(null);
      setWebsiteData(null);
      setHotelData(null);
      
      try {
        // First, try to get website from backend
        const result = await websiteService.getByName(slug);
        
        if (result.success && result.data) {
          console.log('✅ Found website in backend:', result.data);
          
          // Check if this is a hotel response (has hotel data structure like hotels.json)
          if (result.data.hotel) {
            console.log('✅ Found hotel data in response:', result.data.hotel);
            setHotelData(result.data.hotel);
            setModuleType('hotel');
            setIsLoading(false);
            return;
          }
          
          // Regular website response
          const website = result.data.website || result.data;
          setWebsiteData(website);
          
          // Map backend website types to module types
          const typeMapping = {
            'hotels': 'hotel',
            'ecommerce': 'ecommerce', 
            'automobiles': 'automobile',
            'weddings': 'wedding',
            'professional': 'business'
          };
          
          const detectedType = typeMapping[website.websiteType] || website.websiteType;
          setModuleType(detectedType);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('⚠️ Backend not available, checking localStorage and dummy data');
      }

      // Fallback: Check localStorage for demo websites
      try {
        const demoWebsite = localStorage.getItem(`website_${slug}`);
        if (demoWebsite) {
          const parsedWebsite = JSON.parse(demoWebsite);
          console.log('✅ Found demo website in localStorage:', parsedWebsite);
          setWebsiteData(parsedWebsite);
          
          // Map demo website types to module types
          const typeMapping = {
            'hotels': 'hotel',
            'ecommerce': 'ecommerce',
            'automobiles': 'automobile', 
            'weddings': 'wedding',
            'professional': 'business'
          };
          
          const detectedType = typeMapping[parsedWebsite.websiteType] || parsedWebsite.websiteType;
          setModuleType(detectedType);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('⚠️ Error checking localStorage:', error);
      }

      // Final fallback: Check dummy data
      const dummyDataType = getModuleTypeFromDummyData(slug);
      if (dummyDataType) {
        setModuleType(dummyDataType);
        setIsLoading(false);
      } else {
        // No data found anywhere
        setError('Website not found');
        setIsLoading(false);
      }
    };

    if (slug) {
      checkWebsiteExists();
    }
  }, [slug]);

  // Show loading state while checking for website
  if (isLoading) {
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
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem',
          }}
        ></div>
        <p style={{ color: '#6b7280' }}>Loading your website...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Show error state
  if (error) {
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
        <h1 style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1rem' }}>
          Website Not Found
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          The website "{slug}" doesn't exist or hasn't been published yet.
        </p>
        <a
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: '500',
          }}
        >
          Go Home
        </a>
      </div>
    );
  }

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
      return <HotelModule websiteData={websiteData} hotelData={hotelData} />;
    case 'ecommerce':
      return <EcommerceModule websiteData={websiteData} />;
    case 'automobile':
      return <AutomobileModule websiteData={websiteData} />;
    case 'wedding':
      return <WeddingModule websiteData={websiteData} />;
    case 'business':
      return <BusinessModule websiteData={websiteData} />;
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
