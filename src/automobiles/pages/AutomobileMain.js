import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaArrowRight, FaCar, FaHome, FaSpinner, FaStar, FaShieldAlt, FaAward } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import CategoryCard from '../components/CategoryCard';
import BackToTop from '../../ecommerce/components/BackToTop';
import {
  fetchAutomobileData,
  selectVendor,
  selectCategories,
  selectVehicles,
  selectFeaturedVehicles,
  selectOnSaleVehicles,
  selectLoading,
  selectError,
  selectPageSections,
  selectHasUnsavedChanges,
  clearError,
} from '../../store/slices/automobileManagementSlice';

// Modern animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shine = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Dynamic theme styles that override global styles
const DynamicGlobalStyle = createGlobalStyle`
  :root {
    --dealer-primary: ${props => props.primaryColor || theme.colors.primary};
    --dealer-secondary: ${props => props.secondaryColor || theme.colors.secondary};
    --dealer-background: ${props => props.backgroundColor || theme.colors.gray50};
    --dealer-text: ${props => props.textColor || theme.colors.gray900};
  }
`;

const PageContainer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'backgroundColor',
})`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.backgroundColor || theme.colors.gray50};
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray50};
  gap: ${theme.spacing.lg};
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${theme.colors.gray200};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  text-align: center;
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.red600};
  margin-bottom: ${theme.spacing.md};
`;

const ErrorText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  max-width: 500px;
`;

const ErrorButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const HeroSection = styled.section.withConfig({
  shouldForwardProp: prop =>
    !['primaryColor', 'secondaryColor', 'heroImage'].includes(prop),
})`
  background:
    linear-gradient(
      135deg,
      ${props => props.primaryColor || '#1e40af'}ee 0%,
      ${props => props.secondaryColor || '#3b82f6'}dd 25%,
      ${props => props.primaryColor || '#1d4ed8'}ee 75%,
      ${props => props.secondaryColor || '#2563eb'}dd 100%
    ),
    ${props => (props.heroImage ? `url("${props.heroImage}")` : 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)')};
  background-size: cover, 400px 400px, 600px 600px;
  background-position: center, 0% 0%, 100% 100%;
  background-attachment: fixed;
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent,
      rgba(255, 255, 255, 0.03),
      transparent,
      rgba(255, 255, 255, 0.03)
    );
    animation: ${float} 8s ease-in-out infinite;
    z-index: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 100vh;
    background-attachment: scroll;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 2;
  width: 100%;
  animation: ${fadeInUp} 1s ease-out;
`;

const FloatingElement = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 2rem;
  animation: ${float} 6s ease-in-out infinite;
  z-index: 1;

  &.floating-icon-1 {
    top: 15%;
    left: 10%;
    animation-delay: -2s;
  }

  &.floating-icon-2 {
    top: 25%;
    right: 15%;
    animation-delay: -4s;
  }

  &.floating-icon-3 {
    bottom: 30%;
    left: 15%;
    animation-delay: -6s;
  }

  &.floating-icon-4 {
    bottom: 20%;
    right: 10%;
    animation-delay: -1s;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const DealerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
    text-align: center;
  }
`;

const DealerLogo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${theme.borderRadius.xl};
  border: 4px solid ${theme.colors.white};
  object-fit: cover;
  box-shadow: ${theme.shadows.xl};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(
    45deg,
    #ffffff 0%,
    #f0f8ff 25%,
    #ffffff 50%,
    #e6f3ff 75%,
    #ffffff 100%
  );
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: -2px;
  line-height: 1.1;
  position: relative;
  animation: ${fadeInUp} 1s ease-out 0.3s both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: translateX(-100%);
    animation: ${shine} 3s ease-in-out infinite;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3.5rem;
    letter-spacing: -1px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
    letter-spacing: -0.5px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.95;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  line-height: 1.7;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  animation: ${fadeInUp} 1s ease-out 0.6s both;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    margin: ${theme.spacing.lg} auto 0;
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.3rem;
    max-width: 600px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    max-width: 100%;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ease-out 0.9s both;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.md};
  }
`;

const TrustIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
  animation: ${fadeInUp} 1s ease-out 1.2s both;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.xl};
  }
`;

const TrustIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;

  .icon {
    color: #fbbf24;
    font-size: 1.2rem;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const HeroButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  background: linear-gradient(
    135deg,
    ${theme.colors.white} 0%,
    rgba(255, 255, 255, 0.95) 100%
  );
  color: ${props => props.primaryColor || theme.colors.primary};
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border: none;
  border-radius: ${theme.borderRadius.xl};
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-width: 220px;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 8px 15px rgba(0, 0, 0, 0.15);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.98) 0%,
      ${theme.colors.gray50} 100%
    );

    &::before {
      left: 100%;
    }
  }

  &.secondary {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    color: ${theme.colors.white};
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(15px);

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.2) 100%
      );
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-4px) scale(1.02);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    min-width: 200px;
    font-size: 1rem;

    &:hover {
      transform: translateY(-2px) scale(1.01);
    }
  }
`;

const Section = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${props => props.background || theme.colors.white};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(30, 64, 175, 0.02) 50%,
      transparent 100%
    );
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl} 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.sm};
  }
`;

const SectionTitle = styled.h2.withConfig({
  shouldForwardProp: prop => prop !== 'textColor',
})`
  font-size: 2.8rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${props => props.textColor || theme.colors.gray900} 0%,
    ${props => props.textColor || theme.colors.primary} 50%,
    ${props => props.textColor || theme.colors.gray800} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${theme.spacing.md};
  position: relative;
  letter-spacing: -1px;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary},
      ${theme.colors.primaryLight}
    );
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: ${theme.spacing.sm};
    letter-spacing: -0.5px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
    max-width: 500px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    max-width: 100%;
    padding: 0 ${theme.spacing.sm};
  }
`;

const Grid = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'minWidth',
})`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${props => props.minWidth || '280px'}, 1fr)
  );
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${theme.spacing.md};
    padding: 0 ${theme.spacing.sm};
  }

  @media (max-width: 320px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.xl};
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  z-index: 1000;
  box-shadow: ${theme.shadows.md};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const Breadcrumb = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.gray100};
`;

const BreadcrumbNav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.primaryDark};
      text-decoration: underline;
    }
  }

  .separator {
    color: ${theme.colors.gray400};
  }

  .current {
    color: ${theme.colors.gray900};
    font-weight: 600;
  }
`;

const AutomobileMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors - single source of truth
  const vendor = useSelector(selectVendor);
  const categories = useSelector(selectCategories);
  const vehicles = useSelector(selectVehicles);
  const featuredVehicles = useSelector(selectFeaturedVehicles);
  const onSaleVehicles = useSelector(selectOnSaleVehicles);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const pageSections = useSelector(selectPageSections);

  const [vendorSlug, setVendorSlug] = useState(null);

  const getBaseUrl = () => (vendor ? `/${vendor.slug}` : '/automobiles');

  // Get hasUnsavedChanges outside the useEffect
  const hasUnsavedChanges = useSelector(selectHasUnsavedChanges);

  useEffect(() => {
    // Get vendor slug from URL
    const path = location.pathname;
    let slug = null;

    if (path !== '/automobiles') {
      const pathSegments = path.split('/').filter(Boolean);
      slug = pathSegments[0];
    }

    // If no vendor slug found, redirect to dealer listing
    if (!slug) {
      navigate('/auto-dealers');
      return;
    }

    setVendorSlug(slug);

    // Only fetch automobile data if we don't have vendor data or if slug changed
    // This prevents overriding real-time updates from dealer dashboard
    // Also check if we have unsaved changes to avoid overriding
    if (!vendor || (vendor.slug !== slug && !hasUnsavedChanges)) {
      dispatch(fetchAutomobileData({ vendorSlug: slug }));
    }
  }, [location.pathname, navigate, dispatch, vendor, hasUnsavedChanges]);

  const handleBackToDealers = () => {
    navigate('/auto-dealers');
  };

  const handleRetry = () => {
    if (vendorSlug) {
      dispatch(clearError());
      dispatch(fetchAutomobileData({ vendorSlug, forceRefresh: true }));
    }
  };

  // Helper function to get sections in order
  const getSortedSections = () => {
    return [...pageSections].sort((a, b) => a.order - b.order);
  };

  // Show loading state
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading dealership information...</LoadingText>
      </LoadingContainer>
    );
  }

  // Show error state
  if (error) {
    return (
      <ErrorContainer>
        <ErrorTitle>Something went wrong</ErrorTitle>
        <ErrorText>{error}</ErrorText>
        <ErrorButton onClick={handleRetry}>
          <FaSpinner />
          Try Again
        </ErrorButton>
      </ErrorContainer>
    );
  }

  // Show fallback if no vendor data
  if (!vendor) {
    return (
      <ErrorContainer>
        <ErrorTitle>Dealer Not Found</ErrorTitle>
        <ErrorText>
          The dealer you're looking for doesn't exist or may have been removed.
        </ErrorText>
        <ErrorButton onClick={handleBackToDealers}>
          <FaCar />
          Browse Dealers
        </ErrorButton>
      </ErrorContainer>
    );
  }

  const dealerTheme = vendor.theme || {};

  return (
    <>
      <DynamicGlobalStyle
        primaryColor={dealerTheme.primaryColor}
        secondaryColor={dealerTheme.secondaryColor}
        backgroundColor={dealerTheme.backgroundColor}
        textColor={dealerTheme.textColor}
      />

      <PageContainer backgroundColor={dealerTheme.backgroundColor}>
        <BackButton onClick={handleBackToDealers}>
          <FaHome />
          Back to Dealers
        </BackButton>

        <Navbar
          dealerName={vendor.name}
          dealerLogo={vendor.businessInfo.logo}
          dealerSlug={vendor.slug}
          theme={dealerTheme}
        />

        <Breadcrumb>
          <BreadcrumbNav>
            <Link to="/auto-dealers">All Dealers</Link>
            <span className="separator">›</span>
            <span className="current">{vendor.name}</span>
          </BreadcrumbNav>
        </Breadcrumb>

        {/* Render sections dynamically based on content management settings */}
        {getSortedSections().map(sectionConfig => {
          if (!sectionConfig.visible) return null;

          switch (sectionConfig.id) {
            case 'hero':
              return (
                <HeroSection
                  key="hero"
                  primaryColor={dealerTheme.primaryColor}
                  secondaryColor={dealerTheme.secondaryColor}
                  heroImage={
                    sectionConfig.backgroundImage ||
                    sectionConfig.content?.backgroundImage
                  }
                >
                  <FloatingElement className="floating-icon-1">
                    <FaCar />
                  </FloatingElement>
                  <FloatingElement className="floating-icon-2">
                    <FaStar />
                  </FloatingElement>
                  <FloatingElement className="floating-icon-3">
                    <FaShieldAlt />
                  </FloatingElement>
                  <FloatingElement className="floating-icon-4">
                    <FaAward />
                  </FloatingElement>

                  <HeroContent>
                    <DealerHeader>
                      <DealerLogo
                        src={vendor.businessInfo.logo}
                        alt={`${vendor.name} logo`}
                      />
                      <div>
                        <HeroTitle>
                          {sectionConfig.title || sectionConfig.content?.title}
                        </HeroTitle>
                      </div>
                    </DealerHeader>
                    <HeroSubtitle>
                      {sectionConfig.subtitle ||
                        sectionConfig.content?.subtitle}
                    </HeroSubtitle>
                    <HeroActions>
                      <HeroButton
                        primaryColor={dealerTheme.primaryColor}
                        onClick={() => navigate(`${getBaseUrl()}/vehicles`)}
                      >
                        <FaCar />
                        {sectionConfig.primaryButtonText ||
                          sectionConfig.content?.primaryButtonText ||
                          'Browse Vehicles'}
                      </HeroButton>
                      <HeroButton
                        className="secondary"
                        onClick={() =>
                          navigate(
                            `${getBaseUrl()}/vehicles?category=${categories[0]?.slug || 'all'}`
                          )
                        }
                      >
                        {sectionConfig.secondaryButtonText ||
                          sectionConfig.content?.secondaryButtonText ||
                          'View Categories'}
                        <FaArrowRight />
                      </HeroButton>
                    </HeroActions>

                    <TrustIndicators>
                      <TrustIndicator>
                        <FaStar className="icon" />
                        <span>Premium Quality</span>
                      </TrustIndicator>
                      <TrustIndicator>
                        <FaShieldAlt className="icon" />
                        <span>Verified Dealers</span>
                      </TrustIndicator>
                      <TrustIndicator>
                        <FaAward className="icon" />
                        <span>Award Winning</span>
                      </TrustIndicator>
                    </TrustIndicators>
                  </HeroContent>
                </HeroSection>
              );

            case 'categories':
              // Use embedded categories if available, otherwise use global categories
              // Check for visibility in both root level and content level
              const visibleCategoryIds =
                sectionConfig.visibleCategories ||
                sectionConfig.content?.visibleCategories;
              const categoriesToShow = visibleCategoryIds
                ? categories.filter(category =>
                    visibleCategoryIds.includes(category.id)
                  )
                : categories;
              return (
                <Section key="categories">
                  <Container>
                    <SectionHeader>
                      <SectionTitle textColor={dealerTheme.textColor}>
                        {sectionConfig.title ||
                          sectionConfig.content?.title ||
                          'Browse by Category'}
                      </SectionTitle>
                      <SectionSubtitle>
                        {sectionConfig.subtitle ||
                          sectionConfig.content?.subtitle ||
                          'Explore our diverse range of vehicles'}
                      </SectionSubtitle>
                    </SectionHeader>
                    <Grid minWidth="280px">
                      {categoriesToShow.map(category => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          dealerSlug={vendor.slug}
                        />
                      ))}
                    </Grid>
                  </Container>
                </Section>
              );

            case 'featured':
              // Use embedded vehicles if available, otherwise use global vehicles
              const featuredVehicleIds =
                sectionConfig.vehicleIds ||
                sectionConfig.content?.vehicleIds ||
                [];
              const featuredVehiclesToShow =
                featuredVehicleIds.length > 0
                  ? vehicles.filter(vehicle =>
                      featuredVehicleIds.includes(vehicle.id)
                    )
                  : featuredVehicles.slice(0, 4);
              return (
                <Section
                  key="featured"
                  background={
                    dealerTheme.backgroundColor || theme.colors.gray50
                  }
                >
                  <Container>
                    <SectionHeader>
                      <SectionTitle textColor={dealerTheme.textColor}>
                        {sectionConfig.title ||
                          sectionConfig.content?.title ||
                          'Featured Vehicles'}
                      </SectionTitle>
                      <SectionSubtitle>
                        {sectionConfig.subtitle ||
                          sectionConfig.content?.subtitle ||
                          'Handpicked vehicles that customers love the most'}
                      </SectionSubtitle>
                    </SectionHeader>
                    <Grid>
                      {featuredVehiclesToShow.map(vehicle => (
                        <VehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          dealerSlug={vendor.slug}
                        />
                      ))}
                    </Grid>
                  </Container>
                </Section>
              );

            case 'special-offers':
              // Use embedded vehicles if available, otherwise use global vehicles
              const specialOfferVehicleIds =
                sectionConfig.vehicleIds ||
                sectionConfig.content?.vehicleIds ||
                [];
              const specialOfferVehicles =
                specialOfferVehicleIds.length > 0
                  ? vehicles.filter(vehicle =>
                      specialOfferVehicleIds.includes(vehicle.id)
                    )
                  : onSaleVehicles.slice(0, 4);
              if (specialOfferVehicles.length === 0) return null;
              return (
                <Section key="special-offers">
                  <Container>
                    <SectionHeader>
                      <SectionTitle textColor={dealerTheme.textColor}>
                        {sectionConfig.title ||
                          sectionConfig.content?.title ||
                          '🔥 Special Offers'}
                      </SectionTitle>
                      <SectionSubtitle>
                        {sectionConfig.subtitle ||
                          sectionConfig.content?.subtitle ||
                          "Limited time deals you don't want to miss"}
                      </SectionSubtitle>
                    </SectionHeader>
                    <Grid>
                      {specialOfferVehicles.map(vehicle => (
                        <VehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          dealerSlug={vendor.slug}
                        />
                      ))}
                    </Grid>
                  </Container>
                </Section>
              );

            case 'footer':
              return (
                <Footer
                  key="footer"
                  dealerSlug={vendor.slug}
                  dealer={vendor}
                  theme={dealerTheme}
                  content={sectionConfig.content || sectionConfig}
                />
              );

            default:
              // Handle custom sections - they should appear before footer
              if (sectionConfig.type === 'custom') {
                return (
                  <Section key={sectionConfig.id}>
                    <Container>
                      <SectionHeader>
                        <SectionTitle textColor={dealerTheme.textColor}>
                          {sectionConfig.name || sectionConfig.content?.title}
                        </SectionTitle>
                        <SectionSubtitle>
                          {sectionConfig.description ||
                            sectionConfig.content?.subtitle}
                        </SectionSubtitle>
                      </SectionHeader>
                      {/* Render selected vehicles for custom section */}
                      {sectionConfig.content?.vehicleIds &&
                      sectionConfig.content.vehicleIds.length > 0 ? (
                        <Grid>
                          {sectionConfig.content.vehicleIds
                            .map(vehicleId =>
                              vehicles.find(v => v.id === vehicleId)
                            )
                            .filter(Boolean)
                            .map(vehicle => (
                              <VehicleCard
                                key={vehicle.id}
                                vehicle={vehicle}
                                dealerSlug={vendor.slug}
                              />
                            ))}
                        </Grid>
                      ) : (
                        <div
                          style={{
                            padding: theme.spacing.xl,
                            background: theme.colors.gray100,
                            borderRadius: theme.borderRadius.md,
                            textAlign: 'center',
                            color: theme.colors.gray600,
                          }}
                        >
                          <p>No vehicles selected for this custom section.</p>
                        </div>
                      )}
                    </Container>
                  </Section>
                );
              }
              return null;
          }
        })}
        <BackToTop />
      </PageContainer>
    </>
  );
};

export default AutomobileMain;
