import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../shared/Header";
import { Button } from "../shared/Button";
import { theme, media } from "../../styles/GlobalStyle";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
`;

const DemoHeader = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 3px solid #10b981;
`;

const DemoHeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.mobile} {
    flex-direction: column;
    gap: ${theme.spacing.sm};
    text-align: center;
  }
`;

const DemoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-weight: 600;
  
  &::before {
    content: "🚀";
    font-size: 1.2rem;
  }
`;

const BackToCategoryButton = styled(Button)`
  background: transparent;
  color: ${theme.colors.white};
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const HeroSection = styled.section`
  background: ${(props) => props.gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23ffffff10" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
  }

  ${media.mobile} {
    padding: ${theme.spacing.xl} 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;

  ${media.mobile} {
    padding: 0 ${theme.spacing.sm};
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.md};
  line-height: 1.1;

  ${media.mobile} {
    font-size: 2.25rem;
  }

  ${media.tablet} {
    font-size: 2.75rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  ${media.mobile} {
    font-size: 1.125rem;
  }
`;

const ContentSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.gray50};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  ${media.mobile} {
    padding: 0 ${theme.spacing.sm};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FeatureCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray200};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.lg};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
`;

const CTASection = styled.section`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Button)`
  background: ${(props) => props.gradient || theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
    opacity: 0.9;
  }
`;

const DemoWebsite = ({ 
  title, 
  subtitle, 
  gradient, 
  features = [], 
  categoryPath,
  ctaText = "Get Started Today"
}) => {
  const navigate = useNavigate();

  const handleBackToCategory = () => {
    navigate(categoryPath);
  };

  const handleCTA = () => {
    navigate("/register");
  };

  return (
    <PageContainer>
      <Header />
      
      <DemoHeader>
        <DemoHeaderContent>
          <DemoLabel>
            Demo Website - See it in action
          </DemoLabel>
          <BackToCategoryButton onClick={handleBackToCategory}>
            <FaArrowLeft />
            Back to Category
          </BackToCategoryButton>
        </DemoHeaderContent>
      </DemoHeader>

      <HeroSection gradient={gradient}>
        <HeroContent>
          <HeroTitle>{title}</HeroTitle>
          <HeroSubtitle>{subtitle}</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentContainer>
          <SectionTitle>What Makes Us Special</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </ContentContainer>
      </ContentSection>

      <CTASection>
        <ContentContainer>
          <CTATitle>Ready to Build Your Own?</CTATitle>
          <CTADescription>
            This is just a demo of what your website could look like. Create your own professional website in minutes.
          </CTADescription>
          <CTAButton gradient={gradient} onClick={handleCTA}>
            {ctaText}
          </CTAButton>
        </ContentContainer>
      </CTASection>
    </PageContainer>
  );
};

export default DemoWebsite;
