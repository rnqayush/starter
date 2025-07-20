import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { FaArrowRight, FaCar, FaHome } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VehicleCard from "../components/VehicleCard";
import CategoryCard from "../components/CategoryCard";
import BackToTop from "../../ecommerce/components/BackToTop";
import {
  categories,
  getFeaturedVehicles,
  getOnSaleVehicles,
} from "../data/vehicles";
import { getVendorByIdOrSlug } from "../data/vendors";

// Dynamic theme styles that override global styles
const DynamicGlobalStyle = createGlobalStyle`
  :root {
    --dealer-primary: ${(props) => props.primaryColor || theme.colors.primary};
    --dealer-secondary: ${(props) => props.secondaryColor || theme.colors.secondary};
    --dealer-background: ${(props) => props.backgroundColor || theme.colors.gray50};
    --dealer-text: ${(props) => props.textColor || theme.colors.gray900};
  }
`;

const PageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.backgroundColor || theme.colors.gray50};
`;

const HeroSection = styled.section.withConfig({
  shouldForwardProp: (prop) =>
    !["primaryColor", "secondaryColor", "heroImage"].includes(prop),
})`
  background:
    linear-gradient(135deg,
      ${(props) => props.primaryColor || "#1f2937"}dd 0%,
      ${(props) => props.secondaryColor || "#374151"}dd 100%),
    ${(props) => props.heroImage ? `url("${props.heroImage}")` : 'none'};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 50vh;
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
  shouldForwardProp: (prop) => prop !== "primaryColor",
})`
  background: ${theme.colors.white};
  color: ${(props) => props.primaryColor || theme.colors.primary};
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
  background: ${(props) => props.background || theme.colors.white};

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
  shouldForwardProp: (prop) => prop !== "textColor",
})`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${(props) => props.textColor || theme.colors.gray900};
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
  shouldForwardProp: (prop) => prop !== "minWidth",
})`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => props.minWidth || "280px"}, 1fr)
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

const FallbackContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.gray50};
`;

const FallbackTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const FallbackText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  max-width: 500px;
`;

const FallbackButton = styled.button`
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

  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [saleVehicles, setSaleVehicles] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);

  const getBaseUrl = () => selectedDealer ? `/${selectedDealer.slug}` : "/automobiles";

  useEffect(() => {
    // Get dealer data from URL slug or navigation state (fallback)
    const path = location.pathname;
    let dealer = null;

    if (path !== "/automobiles") {
      // Extract dealer slug from URL like "/luxury-auto-gallery"
      const pathSegments = path.split("/").filter(Boolean);
      const dealerSlug = pathSegments[0];
      dealer = getVendorByIdOrSlug(dealerSlug);
    }

    // Fallback to location state if no dealer found by slug
    if (!dealer) {
      dealer = location.state?.selectedDealer;
    }

    if (dealer) {
      setSelectedDealer(dealer);
    } else {
      // If no dealer found, redirect to dealer listing
      navigate("/auto-dealers");
      return;
    }

    // Load vehicles (these would be filtered by dealer in a real app)
    setFeaturedVehicles(getFeaturedVehicles());
    setSaleVehicles(getOnSaleVehicles());
  }, [location.pathname, location.state, navigate]);

  const handleBackToDealers = () => {
    navigate("/auto-dealers");
  };

  // Show fallback if no dealer is selected
  if (!selectedDealer) {
    return (
      <FallbackContainer>
        <FallbackTitle>Please Select a Dealer</FallbackTitle>
        <FallbackText>
          You need to select a dealer first to view their vehicles and continue
          browsing.
        </FallbackText>
        <FallbackButton onClick={handleBackToDealers}>
          <FaCar />
          Browse Dealers
        </FallbackButton>
      </FallbackContainer>
    );
  }

  const dealerTheme = selectedDealer.theme || {};

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
          dealerName={selectedDealer.name}
          dealerLogo={selectedDealer.logo}
          dealerSlug={selectedDealer.slug}
          theme={dealerTheme}
        />

        <Breadcrumb>
          <BreadcrumbNav>
            <Link to="/auto-dealers">All Dealers</Link>
            <span className="separator">›</span>
            <span className="current">{selectedDealer.name}</span>
          </BreadcrumbNav>
        </Breadcrumb>

        <HeroSection
          primaryColor={dealerTheme.primaryColor}
          secondaryColor={dealerTheme.secondaryColor}
          heroImage={selectedDealer.image}
        >
          <HeroContent>
            <DealerHeader>
              <DealerLogo
                src={selectedDealer.logo}
                alt={`${selectedDealer.name} logo`}
              />
              <div>
                <HeroTitle>Welcome to {selectedDealer.name}</HeroTitle>
              </div>
            </DealerHeader>
            <HeroSubtitle>{selectedDealer.description}</HeroSubtitle>
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
                onClick={() => navigate(`${getBaseUrl()}/vehicles?category=luxury-cars`)}
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
                Explore our diverse range of vehicles across different categories
              </SectionSubtitle>
            </SectionHeader>
            <Grid minWidth="280px">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  dealerSlug={selectedDealer.slug}
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
                Handpicked vehicles from {selectedDealer.name} that customers love
                the most
              </SectionSubtitle>
            </SectionHeader>
            <Grid>
              {featuredVehicles.slice(0, 4).map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  dealerSlug={selectedDealer.slug}
                />
              ))}
            </Grid>
          </Container>
        </Section>

        {saleVehicles.length > 0 && (
          <Section>
            <Container>
              <SectionHeader>
                <SectionTitle textColor={dealerTheme.textColor}>
                  🔥 Special Offers
                </SectionTitle>
                <SectionSubtitle>
                  Limited time deals from {selectedDealer.name} you don't want
                  to miss
                </SectionSubtitle>
              </SectionHeader>
              <Grid>
                {saleVehicles.slice(0, 4).map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    dealerSlug={selectedDealer.slug}
                  />
                ))}
              </Grid>
                        </Container>
          </Section>
        )}

                <Footer dealerSlug={selectedDealer.slug} dealer={selectedDealer} theme={dealerTheme} />
        <BackToTop />
      </PageContainer>
    </>
  );
};

export default AutomobileMain;
