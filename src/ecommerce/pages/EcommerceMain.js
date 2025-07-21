import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { FaArrowRight, FaShoppingBag, FaHome } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import BackToTop from "../components/BackToTop";
import {
  categories,
  getFeaturedProducts,
  getOnSaleProducts,
} from "../data/products";
import { getVendorByIdOrSlug } from "../data/vendors";

// Dynamic theme styles that override global styles
const DynamicGlobalStyle = createGlobalStyle`
  :root {
    --vendor-primary: ${(props) => props.primaryColor || theme.colors.primary};
    --vendor-secondary: ${(props) => props.secondaryColor || theme.colors.secondary};
    --vendor-background: ${(props) => props.backgroundColor || theme.colors.gray50};
    --vendor-text: ${(props) => props.textColor || theme.colors.gray900};
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
      ${(props) => props.primaryColor || "#667eea"}dd 0%,
      ${(props) => props.secondaryColor || "#764ba2"}dd 100%),
    ${(props) => props.heroImage ? `url("${props.heroImage}")` : 'none'};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: ${theme.colors.white};
    padding: ${theme.spacing.xl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
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
    min-height: 100vh;
    background-attachment: scroll;
    padding: ${theme.spacing.lg} 0;
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

const StoreHeader = styled.div`
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

const StoreLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.xl};
  border: 3px solid ${theme.colors.white};
  object-fit: cover;
  box-shadow: ${theme.shadows.xl};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 70px;
    height: 70px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.md};
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
  line-height: 1.1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.25rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.875rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 300;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
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

const EcommerceMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

      const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const getBaseUrl = () => selectedVendor ? `/${selectedVendor.slug}` : "/ecommerce";

  useEffect(() => {
    // Get vendor data from URL slug or navigation state (fallback)
    const path = location.pathname;
    let vendor = null;

    if (path !== "/ecommerce") {
      // Extract store slug from URL like "/techmart-downtown"
      const pathSegments = path.split("/").filter(Boolean);
      const storeSlug = pathSegments[0];
      vendor = getVendorByIdOrSlug(storeSlug);
    }

    // Fallback to location state if no vendor found by slug
    if (!vendor) {
      vendor = location.state?.selectedVendor;
    }

    if (vendor) {
      setSelectedVendor(vendor);
    } else {
      // If no vendor found, redirect to store listing
      navigate("/ecommerce-stores");
      return;
    }

    // Load products (these would be filtered by vendor in a real app)
    setFeaturedProducts(getFeaturedProducts());
    setSaleProducts(getOnSaleProducts());
  }, [location.pathname, location.state, navigate]);

  

  const handleBackToStores = () => {
    navigate("/ecommerce-stores");
  };

  // Show fallback if no vendor is selected
  if (!selectedVendor) {
    return (
      <FallbackContainer>
        <FallbackTitle>Please Select a Store</FallbackTitle>
        <FallbackText>
          You need to select a store first to view its products and continue
          shopping.
        </FallbackText>
        <FallbackButton onClick={handleBackToStores}>
          <FaShoppingBag />
          Browse Stores
        </FallbackButton>
      </FallbackContainer>
    );
  }

  const vendorTheme = selectedVendor.theme || {};

  return (
    <>
      <DynamicGlobalStyle
        primaryColor={vendorTheme.primaryColor}
        secondaryColor={vendorTheme.secondaryColor}
        backgroundColor={vendorTheme.backgroundColor}
        textColor={vendorTheme.textColor}
      />

      <PageContainer backgroundColor={vendorTheme.backgroundColor}>
        <BackButton onClick={handleBackToStores}>
          <FaHome />
          Back to Stores
        </BackButton>

                        <Navbar
          storeName={selectedVendor.name}
          storeLogo={selectedVendor.logo}
          storeSlug={selectedVendor.slug}
          theme={vendorTheme}
        />

        <Breadcrumb>
          <BreadcrumbNav>
            <Link to="/ecommerce-stores">All Stores</Link>
            <span className="separator">›</span>
            <span className="current">{selectedVendor.name}</span>
          </BreadcrumbNav>
        </Breadcrumb>

                <HeroSection
          primaryColor={vendorTheme.primaryColor}
          secondaryColor={vendorTheme.secondaryColor}
          heroImage={selectedVendor.image}
        >
          <HeroContent>
            <StoreHeader>
              <StoreLogo
                src={selectedVendor.logo}
                alt={`${selectedVendor.name} logo`}
              />
              <div>
                <HeroTitle>Welcome to {selectedVendor.name}</HeroTitle>
              </div>
            </StoreHeader>
            <HeroSubtitle>{selectedVendor.description}</HeroSubtitle>
            <HeroActions>
              <HeroButton
                primaryColor={vendorTheme.primaryColor}
                onClick={() => navigate(`${getBaseUrl()}/products`)}
              >
                <FaShoppingBag />
                Shop Now
              </HeroButton>
              <HeroButton
                className="secondary"
                onClick={() => navigate(`${getBaseUrl()}/products?category=electronics`)}
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
              <SectionTitle textColor={vendorTheme.textColor}>
                Shop by Category
              </SectionTitle>
              <SectionSubtitle>
                Explore our diverse range of products across different categories
              </SectionSubtitle>
            </SectionHeader>
            <Grid minWidth="280px">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  storeSlug={selectedVendor.slug}
                />
              ))}
            </Grid>
          </Container>
        </Section>

        <Section
          background={vendorTheme.backgroundColor || theme.colors.gray50}
        >
          <Container>
            <SectionHeader>
              <SectionTitle textColor={vendorTheme.textColor}>
                Featured Products
              </SectionTitle>
              <SectionSubtitle>
                Handpicked items from {selectedVendor.name} that customers love
                the most
              </SectionSubtitle>
            </SectionHeader>
                        <Grid>
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  storeSlug={selectedVendor.slug}
                />
              ))}
            </Grid>
          </Container>
        </Section>

        {saleProducts.length > 0 && (
          <Section>
            <Container>
              <SectionHeader>
                <SectionTitle textColor={vendorTheme.textColor}>
                  🔥 Hot Deals
                </SectionTitle>
                <SectionSubtitle>
                  Limited time offers from {selectedVendor.name} you don't want
                  to miss
                </SectionSubtitle>
              </SectionHeader>
                            <Grid>
                {saleProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    storeSlug={selectedVendor.slug}
                  />
                ))}
              </Grid>
            </Container>
          </Section>
        )}

                <Footer storeSlug={selectedVendor.slug} theme={vendorTheme} />
        <BackToTop />
      </PageContainer>
    </>
  );
};

export default EcommerceMain;
