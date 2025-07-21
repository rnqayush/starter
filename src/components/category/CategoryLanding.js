import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import Header from "../shared/Header";
import { Button } from "../shared/Button";
import { theme, media } from "../../styles/GlobalStyle";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }

  ${media.tablet} {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
  }
`;

const BackButton = styled(Button)`
  background: transparent;
  color: ${theme.colors.gray600};
  border: 1px solid ${theme.colors.gray300};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray900};
    border-color: ${theme.colors.gray400};
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const CategoryTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
  background: ${(props) => props.gradient || theme.colors.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${media.mobile} {
    font-size: 2.25rem;
  }

  ${media.tablet} {
    font-size: 2.75rem;
  }
`;

const CategorySubtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.gray600};
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;

  ${media.mobile} {
    font-size: 1.125rem;
  }
`;

const PreviewSection = styled.section`
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};

  ${media.mobile} {
    font-size: 1.75rem;
  }
`;

const MockupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const MockupCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const MockupImage = styled.div`
  height: 250px;
  background: url(${(props) => props.src}) center/cover;
  background-color: ${theme.colors.gray100};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
  }

  ${media.mobile} {
    height: 200px;
  }
`;

const MockupContent = styled.div`
  padding: ${theme.spacing.xl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

const MockupTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const MockupDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const MockupFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.gray700};
    font-size: 0.9rem;
    margin-bottom: ${theme.spacing.xs};

    &::before {
      content: "✓";
      color: ${theme.colors.primary};
      font-weight: bold;
    }
  }
`;

const CTASection = styled.section`
  text-align: center;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray200};

  ${media.mobile} {
    padding: ${theme.spacing.xl};
  }
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};

  ${media.mobile} {
    font-size: 1.75rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const DemoButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const DemoButton = styled(Button)`
  background: ${(props) => props.gradient || theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: ${theme.borderRadius.lg};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  min-width: 200px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
    opacity: 0.9;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
  }
`;

const SecondaryDemoButton = styled(DemoButton)`
  background: ${theme.colors.white};
  color: ${(props) => props.gradient ? theme.colors.primary : theme.colors.primary};
  border: 2px solid ${(props) => props.gradient ? theme.colors.primary : theme.colors.primary};

  &:hover {
    background: ${(props) => props.gradient ? theme.colors.primary : theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const CategoryLanding = ({
  category,
  title,
  subtitle,
  gradient,
  mockups = [],
  demoUrl,
  demoButtonText = "See Demo Website",
  secondaryDemoUrl,
  secondaryDemoButtonText
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleDemoClick = () => {
    navigate(demoUrl);
  };

  const handleSecondaryDemoClick = () => {
    navigate(secondaryDemoUrl);
  };

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <BackButton onClick={handleBack}>
          <FaArrowLeft />
          Back to Home
        </BackButton>

        <HeroSection>
          <CategoryTitle gradient={gradient}>{title}</CategoryTitle>
          <CategorySubtitle>{subtitle}</CategorySubtitle>
        </HeroSection>

        <PreviewSection>
          <SectionTitle>Beautiful Website Examples</SectionTitle>
          <MockupsGrid>
            {mockups.map((mockup, index) => (
              <MockupCard key={index}>
                <MockupImage src={mockup.image} />
                <MockupContent>
                  <MockupTitle>{mockup.title}</MockupTitle>
                  <MockupDescription>{mockup.description}</MockupDescription>
                  <MockupFeatures>
                    {mockup.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </MockupFeatures>
                </MockupContent>
              </MockupCard>
            ))}
          </MockupsGrid>
        </PreviewSection>

        <CTASection>
          <CTATitle>Experience a Live {title} Website</CTATitle>
          <CTADescription>
            See how beautiful and functional your {category} website could be with our professional templates and features.
          </CTADescription>
          <DemoButtonsContainer>
            <DemoButton gradient={gradient} onClick={handleDemoClick}>
              {demoButtonText}
              <FaExternalLinkAlt />
            </DemoButton>
            {secondaryDemoUrl && secondaryDemoButtonText && (
              <SecondaryDemoButton gradient={gradient} onClick={handleSecondaryDemoClick}>
                {secondaryDemoButtonText}
                <FaExternalLinkAlt />
              </SecondaryDemoButton>
            )}
          </DemoButtonsContainer>
        </CTASection>
      </ContentContainer>
    </PageContainer>
  );
};

export default CategoryLanding;
