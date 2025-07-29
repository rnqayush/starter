import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BusinessWebsitePage from './pages/BusinessWebsitePage';
import FreelancerPortfolioPage from './pages/FreelancerPortfolioPage';
import businessData from '../DummyData/business.json';

const BusinessModule = () => {
  const [isPersonalPortfolio, setIsPersonalPortfolio] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the isPersonalPortfolio flag from JSON data
    const fetchBusinessConfig = () => {
      try {
        const config = businessData.data?.isPersonalPortfolio || false;
        setIsPersonalPortfolio(config);
        console.log('[BusinessModule] isPersonalPortfolio:', config);
      } catch (error) {
        console.error('[BusinessModule] Error fetching business config:', error);
        setIsPersonalPortfolio(false); // Default to business
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessConfig();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  // Render different pages based on the isPersonalPortfolio flag
  if (isPersonalPortfolio) {
    return <FreelancerPortfolioPage />;
  } else {
    return <BusinessWebsitePage />;
  }
};

export default BusinessModule;
