import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
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

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

const HeroButton = styled(Link)`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.lg};

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

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
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

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  margin-top: ${theme.spacing.xl};
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

const StatsSection = styled.section`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.xl};
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const NewsletterSection = styled.section`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
`;

const NewsletterForm = styled.form`
  max-width: 400px;
  margin: ${theme.spacing.xl} auto 0;
  display: flex;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const NewsletterButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
    setSaleProducts(getOnSaleProducts());
  }, []);

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

    // Show success message or animation
    alert(`${product.name} added to cart!`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert("Thank you for subscribing to our newsletter!");
      e.target.reset();
    }
  };

  return (
    <PageContainer>
      <Navbar
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Amazing Products</HeroTitle>
          <HeroSubtitle>
            Shop the latest trends and timeless classics from top brands at
            unbeatable prices
          </HeroSubtitle>
          <HeroActions>
            <HeroButton to="/ecommerce/products">
              <FaShoppingBag />
              Shop Now
            </HeroButton>
            <HeroButton
              to="/ecommerce/products?sale=true"
              className="secondary"
            >
              View Sale Items
              <FaArrowRight />
            </HeroButton>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle>Shop by Category</SectionTitle>
            <SectionSubtitle>
              Explore our diverse range of products across different categories
            </SectionSubtitle>
          </SectionHeader>
          <Grid minWidth="250px">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Grid>
        </Container>
      </Section>

      <Section background={theme.colors.gray50}>
        <Container>
          <SectionHeader>
            <SectionTitle>Featured Products</SectionTitle>
            <SectionSubtitle>
              Handpicked items that our customers love the most
            </SectionSubtitle>
          </SectionHeader>
          <Grid>
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </Grid>
          <div style={{ textAlign: "center" }}>
            <ViewAllButton to="/ecommerce/products?featured=true">
              View All Featured Products
              <FaArrowRight />
            </ViewAllButton>
          </div>
        </Container>
      </Section>

      {saleProducts.length > 0 && (
        <Section>
          <Container>
            <SectionHeader>
              <SectionTitle>🔥 Hot Deals</SectionTitle>
              <SectionSubtitle>
                Limited time offers you don't want to miss
              </SectionSubtitle>
            </SectionHeader>
            <Grid>
              {saleProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </Grid>
            <div style={{ textAlign: "center" }}>
              <ViewAllButton to="/ecommerce/products?sale=true">
                View All Sale Items
                <FaArrowRight />
              </ViewAllButton>
            </div>
          </Container>
        </Section>
      )}

      <StatsSection>
        <Container>
          <StatsGrid>
            <StatItem>
              <h3>10,000+</h3>
              <p>Happy Customers</p>
            </StatItem>
            <StatItem>
              <h3>5,000+</h3>
              <p>Products</p>
            </StatItem>
            <StatItem>
              <h3>50+</h3>
              <p>Brands</p>
            </StatItem>
            <StatItem>
              <h3>24/7</h3>
              <p>Support</p>
            </StatItem>
          </StatsGrid>
        </Container>
      </StatsSection>

      <NewsletterSection>
        <Container>
          <SectionTitle
            style={{
              color: theme.colors.white,
              marginBottom: theme.spacing.md,
            }}
          >
            Stay in the Loop
          </SectionTitle>
          <p style={{ fontSize: "1.1rem", marginBottom: 0 }}>
            Get the latest updates, exclusive offers, and new arrivals straight
            to your inbox
          </p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </Container>
      </NewsletterSection>

      <Footer />
    </PageContainer>
  );
};

export default Home;
