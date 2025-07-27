import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { FaArrowRight, FaCar, FaHome, FaSpinner } from 'react-icons/fa';
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
  selectFeaturedVehicles,
  selectOnSaleVehicles,
  selectLoading,
  selectError,
  clearError
} from '../../store/slices/automobileManagementSlice';

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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
      ${props => props.primaryColor || '#1f2937'}dd 0%,
      ${props => props.secondaryColor || '#374151'}dd 100%
    ),
    ${props => (props.heroImage ? `url("${props.heroImage}")` : 'none')};
  background-size: cover;
  background-position: center;
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
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
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
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
  line-height: 1.1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 300;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.md};
  }
`;

const HeroButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
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
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.xl};
  cursor: pointer;
  min-width: 200px;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    background: ${theme.colors.gray50};
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.white};
    border: 2px solid ${theme.colors.white};
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    min-width: 180px;
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${props => props.background || theme.colors.white};

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
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.textColor || theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.75rem;
    margin-bottom: ${theme.spacing.sm};
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

  // Redux selectors
  const vendor = useSelector(selectVendor);
  const categories = useSelector(selectCategories);
  const featuredVehicles = useSelector(selectFeaturedVehicles);
  const onSaleVehicles = useSelector(selectOnSaleVehicles);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [vendorSlug, setVendorSlug] = useState(null);

  const getBaseUrl = () =>
    vendor ? `/${vendor.slug}` : '/automobiles';

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

    // Fetch automobile data for this vendor
    dispatch(fetchAutomobileData(slug));
  }, [location.pathname, navigate, dispatch]);

  const handleBackToDealers = () => {
    navigate('/auto-dealers');
  };

  const handleRetry = () => {
    if (vendorSlug) {
      dispatch(clearError());
      dispatch(fetchAutomobileData(vendorSlug));
    }
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

        <HeroSection
          primaryColor={dealerTheme.primaryColor}
          secondaryColor={dealerTheme.secondaryColor}
          heroImage={vendor.businessInfo.coverImage}
        >
          <HeroContent>
            <DealerHeader>
              <DealerLogo
                src={vendor.businessInfo.logo}
                alt={`${vendor.name} logo`}
              />
              <div>
                <HeroTitle>Welcome to {vendor.name}</HeroTitle>
              </div>
            </DealerHeader>
            <HeroSubtitle>{vendor.businessInfo.description}</HeroSubtitle>
            <HeroActions>
              <HeroButton
                primaryColor={dealerTheme.primaryColor}
                onClick={() => navigate(`${getBaseUrl()}/vehicles`)}
              >
                <FaCar />
                Browse Vehicles
              </HeroButton>
              <HeroButton
                className="secondary"
                onClick={() =>
                  navigate(`${getBaseUrl()}/vehicles?category=luxury-cars`)
                }
              >
                View Categories
                <FaArrowRight />
              </HeroButton>
            </HeroActions>
          </HeroContent>
        </HeroSection>

        <Section>
          <Container>
            <SectionHeader>
              <SectionTitle textColor={dealerTheme.textColor}>
                Browse by Category
              </SectionTitle>
              <SectionSubtitle>
                Explore our diverse range of vehicles across different
                categories
              </SectionSubtitle>
            </SectionHeader>
            <Grid minWidth="280px">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  dealerSlug={vendor.slug}
                />
              ))}
            </Grid>
          </Container>
        </Section>

        <Section
          background={dealerTheme.backgroundColor || theme.colors.gray50}
        >
          <Container>
            <SectionHeader>
              <SectionTitle textColor={dealerTheme.textColor}>
                Featured Vehicles
              </SectionTitle>
              <SectionSubtitle>
                Handpicked vehicles from {vendor.name} that customers
                love the most
              </SectionSubtitle>
            </SectionHeader>
            <Grid>
              {featuredVehicles.slice(0, 4).map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  dealerSlug={vendor.slug}
                />
              ))}
            </Grid>
          </Container>
        </Section>

        {onSaleVehicles.length > 0 && (
          <Section>
            <Container>
              <SectionHeader>
                <SectionTitle textColor={dealerTheme.textColor}>
                  🔥 Special Offers
                </SectionTitle>
                <SectionSubtitle>
                  Limited time deals from {vendor.name} you don't want
                  to miss
                </SectionSubtitle>
              </SectionHeader>
              <Grid>
                {onSaleVehicles.slice(0, 4).map(vehicle => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    dealerSlug={vendor.slug}
                  />
                ))}
              </Grid>
            </Container>
          </Section>
        )}

        <Footer
          dealerSlug={vendor.slug}
          dealer={vendor}
          theme={dealerTheme}
        />
        <BackToTop />
      </PageContainer>
    </>
  );
};

export default AutomobileMain;
