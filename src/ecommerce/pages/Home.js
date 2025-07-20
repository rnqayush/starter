import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingBag, FaStore, FaSearch, FaHeart, FaUsers, FaCertificate } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: ${theme.colors.white};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroSection = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: ${theme.spacing.xxl};
  max-width: 600px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  box-shadow: ${theme.shadows.xl};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xxl};
    background: ${theme.colors.gray50};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
  width: 100%;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
  opacity: 0.9;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  opacity: 0.8;
  line-height: 1.6;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xxl};
  padding-top: ${theme.spacing.xxl};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  opacity: 0.8;
  font-size: 1rem;
`;

const EcommerceHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 3 seconds if user doesn't interact
    const timer = setTimeout(() => {
      navigate("/ecommerce-stores");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/ecommerce-stores");
  };

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Title>
            <FaShoppingBag style={{ marginRight: "1rem", fontSize: "3rem" }} />
            ShopMart Marketplace
          </Title>
          <Subtitle>
            Discover amazing products from verified sellers in your area. Browse, enquire, and shop with confidence.
          </Subtitle>
          <CTAButton onClick={handleGetStarted}>
            <FaStore />
            Browse Stores
          </CTAButton>
        </HeroSection>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaStore />
            </FeatureIcon>
            <FeatureTitle>Multiple Stores</FeatureTitle>
            <FeatureDescription>
              Choose from a variety of verified stores, each with their own unique products and specialties.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaSearch />
            </FeatureIcon>
            <FeatureTitle>Easy Discovery</FeatureTitle>
            <FeatureDescription>
              Advanced search and filtering options help you find exactly what you're looking for quickly.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaHeart />
            </FeatureIcon>
            <FeatureTitle>Enquiry System</FeatureTitle>
            <FeatureDescription>
              Connect directly with sellers through our secure enquiry system for personalized service.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaCertificate />
            </FeatureIcon>
            <FeatureTitle>Trusted Sellers</FeatureTitle>
            <FeatureDescription>
              All our sellers are verified and rated by customers for your peace of mind.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>

        <StatsSection>
          <StatItem>
            <StatNumber>500+</StatNumber>
            <StatLabel>Products</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Stores</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>10K+</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>4.8★</StatNumber>
            <StatLabel>Average Rating</StatLabel>
          </StatItem>
        </StatsSection>
      </Container>
    </PageContainer>
  );
};

export default EcommerceHome;
