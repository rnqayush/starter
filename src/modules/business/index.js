import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BusinessWebsitePage from './pages/BusinessWebsitePage';
import FreelancerPortfolioPage from './pages/FreelancerPortfolioPage';
import { detectBusinessType } from '../../utils/businessAPI';

const BusinessModule = () => {
  const [isPersonalPortfolio, setIsPersonalPortfolio] = useState(false);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const location = useLocation();

  useEffect(() => {
    // Determine business type based on URL slug
    const fetchBusinessConfig = () => {
      try {
        // Get the slug from URL params
        const currentSlug = slug || 'salon'; // Default to salon if no slug
        console.log('[BusinessModule] Current slug:', currentSlug);

        // Use the detectBusinessType function to determine the type
        const businessInfo = detectBusinessType(currentSlug);

        if (businessInfo) {
          const isFreelancer = businessInfo.isFreelancer;
          setIsPersonalPortfolio(isFreelancer);
          console.log('[BusinessModule] Business type detected:', {
            slug: currentSlug,
            isFreelancer,
            businessType: businessInfo.businessType,
          });
        } else {
          // Fallback: check for freelancer/personal keywords in slug
          const isFreelancerSlug =
            currentSlug === 'freelancer' || currentSlug === 'personal';
          setIsPersonalPortfolio(isFreelancerSlug);
          console.log('[BusinessModule] Fallback detection used for:', {
            slug: currentSlug,
            isFreelancer: isFreelancerSlug,
          });

          // Force the appropriate page to load even if businessInfo is null
          if (currentSlug === 'salon' || currentSlug === 'business') {
            setIsPersonalPortfolio(false);
          } else if (
            currentSlug === 'freelancer' ||
            currentSlug === 'personal'
          ) {
            setIsPersonalPortfolio(true);
          }
        }
      } catch (error) {
        console.error(
          '[BusinessModule] Error fetching business config:',
          error
        );
        // Fallback: check slug directly
        const isFreelancerSlug = slug === 'freelancer' || slug === 'personal';
        setIsPersonalPortfolio(isFreelancerSlug);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessConfig();
  }, [slug, location.pathname]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.2rem',
        }}
      >
        Loading...
      </div>
    );
  }

  // Render different pages based on the business type detected from slug
  console.log(
    '[BusinessModule] Rendering with isPersonalPortfolio:',
    isPersonalPortfolio
  );

  if (isPersonalPortfolio) {
    console.log('[BusinessModule] Rendering FreelancerPortfolioPage');
    return <FreelancerPortfolioPage />;
  } else {
    console.log('[BusinessModule] Rendering BusinessWebsitePage');
    return <BusinessWebsitePage />;
  }
};

export default BusinessModule;
