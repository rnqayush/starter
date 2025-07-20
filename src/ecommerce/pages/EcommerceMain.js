import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { FaArrowRight, FaShoppingBag, FaHome } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
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
    !["primaryColor", "secondaryColor"].includes(prop),
})`
  background: linear-gradient(
    135deg,
    ${(props) => props.primaryColor || "#667eea"} 0%,
    ${(props) => props.secondaryColor || "#764ba2"} 100%
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;
`;

const StoreHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StoreLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.lg};
  border: 3px solid ${theme.colors.white};
  object-fit: cover;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.xxl};
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const HeroButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "primaryColor",
})`
  background: ${theme.colors.white};
  color: ${(props) => props.primaryColor || theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.lg};
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }

  &.secondary {
    background: transparent;
    color: ${theme.colors.white};
    border: 2px solid ${theme.colors.white};
  }
`;

const Section = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${(props) => props.background || theme.colors.white};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h2.withConfig({
  shouldForwardProp: (prop) => prop !== "textColor",
})`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${(props) => props.textColor || theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  max-width: 600px;
  margin: 0 auto;
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

const EcommerceMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

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

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    alert(`${product.name} added to cart!`);
  };

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
          cartItemsCount={cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )}
          storeName={selectedVendor.name}
          storeLogo={selectedVendor.logo}
          storeSlug={selectedVendor.slug}
          theme={vendorTheme}
        />

        <HeroSection
          primaryColor={vendorTheme.primaryColor}
          secondaryColor={vendorTheme.secondaryColor}
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
              <HeroButton primaryColor={vendorTheme.primaryColor}>
                <FaShoppingBag />
                Shop Now
              </HeroButton>
              <HeroButton className="secondary">
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
                Explore our diverse range of products across different
                categories
              </SectionSubtitle>
            </SectionHeader>
            <Grid minWidth="250px">
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
                  onAddToCart={handleAddToCart}
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
                    onAddToCart={handleAddToCart}
                    storeSlug={selectedVendor.slug}
                  />
                ))}
              </Grid>
            </Container>
          </Section>
        )}

        <Footer storeSlug={selectedVendor.slug} theme={vendorTheme} />
      </PageContainer>
    </>
  );
};

export default EcommerceMain;
