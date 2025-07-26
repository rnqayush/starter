import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaStar, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Header from '../shared/Header';
import {
  pricingPlans,
  pricingFeatures,
  pricingFAQs,
} from '../../DummyData/platform';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const HeroSection = styled.section`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.primaryDark} 100%
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="60" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${theme.colors.white} 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.8rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xxl};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: center;
  }
`;

const StatItem = styled.div`
  text-align: center;

  .number {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.white};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .label {
    font-size: 0.9rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .number {
      font-size: 2rem;
    }
  }
`;

const PricingSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const BillingToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const ToggleContainer = styled.div`
  background: ${theme.colors.gray100};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xs};
  display: flex;
  position: relative;
`;

const ToggleOption = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  background: ${props => (props.active ? theme.colors.white : 'transparent')};
  color: ${props =>
    props.active ? theme.colors.gray900 : theme.colors.gray600};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: ${props => (props.active ? theme.shadows.sm : 'none')};

  &:hover {
    color: ${theme.colors.gray900};
  }
`;

const SaveBadge = styled.div`
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const PricingCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'featured',
})`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${props =>
    props.featured ? '0 20px 60px rgba(59, 130, 246, 0.15)' : theme.shadows.lg};
  border: ${props =>
    props.featured
      ? `3px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.gray200}`};
  position: relative;
  transition: all 0.3s ease;
  transform: ${props => (props.featured ? 'scale(1.05)' : 'scale(1)')};

  &:hover {
    transform: ${props => (props.featured ? 'scale(1.05)' : 'scale(1.02)')};
    box-shadow: ${props =>
      props.featured
        ? '0 25px 70px rgba(59, 130, 246, 0.2)'
        : theme.shadows.xl};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    transform: scale(1);
    padding: ${theme.spacing.xl};

    &:hover {
      transform: scale(1);
    }
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const PlanIcon = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'featured',
})`
  width: 60px;
  height: 60px;
  background: ${props =>
    props.featured
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`
      : theme.colors.gray100};
  color: ${props =>
    props.featured ? theme.colors.white : theme.colors.gray600};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.lg};
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const PlanDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.6;
`;

const PlanPrice = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.xs};

  .currency {
    font-size: 1.5rem;
    color: ${theme.colors.gray600};
  }

  .period {
    font-size: 1rem;
    color: ${theme.colors.gray500};
    font-weight: 500;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;

    .currency {
      font-size: 1.2rem;
    }
  }
`;

const OriginalPrice = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.gray400};
  text-decoration: line-through;
  margin-right: ${theme.spacing.sm};
`;

const PriceNote = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray500};
  margin-bottom: ${theme.spacing.lg};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${theme.spacing.xl} 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  font-size: 0.95rem;
  color: ${theme.colors.gray700};

  .icon {
    color: ${theme.colors.success};
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  &.premium {
    .icon {
      color: ${theme.colors.primary};
    }
  }
`;

const CTAButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'featured',
})`
  width: 100%;
  background: ${props =>
    props.featured
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`
      : theme.colors.white};
  color: ${props =>
    props.featured ? theme.colors.white : theme.colors.primary};
  border: ${props =>
    props.featured ? 'none' : `2px solid ${theme.colors.primary}`};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  box-shadow: ${props =>
    props.featured ? '0 4px 15px rgba(59, 130, 246, 0.3)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props =>
      props.featured
        ? '0 8px 25px rgba(59, 130, 246, 0.4)'
        : '0 4px 15px rgba(59, 130, 246, 0.2)'};
    background: ${props =>
      props.featured
        ? `linear-gradient(135deg, ${theme.colors.primaryDark}, ${theme.colors.primary})`
        : theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.gray50};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FeatureCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto ${theme.spacing.lg};
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
`;

const FAQSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: ${theme.spacing.xxl} auto 0;
`;

const FAQItem = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: ${theme.spacing.lg};
  background: none;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const FAQAnswer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  line-height: 1.6;
  max-height: ${props => (props.isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const CTASection = styled.section`
  background: linear-gradient(
    135deg,
    ${theme.colors.gray900} 0%,
    ${theme.colors.gray800} 100%
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryCTAButton = styled.button`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
`;

const SecondaryCTAButton = styled.button`
  background: transparent;
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.white};
    color: ${theme.colors.gray900};
    transform: translateY(-2px);
  }
`;

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  // Data is now imported from DummyData/platform.js
  const plans = pricingPlans;
  const features = pricingFeatures;
  const faqs = pricingFAQs;

  const toggleFAQ = index => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const getPrice = plan => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getOriginalPrice = plan => {
    return isYearly ? plan.originalYearlyPrice : null;
  };

  return (
    <PageContainer>
      <Header />

      <HeroSection>
        <Container>
          <HeroTitle>Simple, Transparent Pricing</HeroTitle>
          <HeroSubtitle>
            Choose the perfect plan for your business. Start with our free trial
            and scale as you grow.
          </HeroSubtitle>

          <StatsContainer>
            <StatItem>
              <div className="number">50,000+</div>
              <div className="label">Websites Created</div>
            </StatItem>
            <StatItem>
              <div className="number">99.9%</div>
              <div className="label">Uptime Guarantee</div>
            </StatItem>
            <StatItem>
              <div className="number">24/7</div>
              <div className="label">Expert Support</div>
            </StatItem>
          </StatsContainer>
        </Container>
      </HeroSection>

      <PricingSection>
        <Container>
          <SectionTitle>Choose Your Plan</SectionTitle>
          <SectionSubtitle>
            Start with a 14-day free trial. No credit card required. Cancel
            anytime.
          </SectionSubtitle>

          <BillingToggle>
            <ToggleContainer>
              <ToggleOption
                active={!isYearly}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </ToggleOption>
              <ToggleOption active={isYearly} onClick={() => setIsYearly(true)}>
                Yearly
                <SaveBadge>Save 20%</SaveBadge>
              </ToggleOption>
            </ToggleContainer>
          </BillingToggle>

          <PricingGrid>
            {plans.map((plan, index) => (
              <PricingCard key={index} featured={plan.featured}>
                {plan.featured && (
                  <PopularBadge>
                    <FaStar />
                    Most Popular
                  </PopularBadge>
                )}

                <PlanIcon featured={plan.featured}>
                  <plan.icon />
                </PlanIcon>

                <PlanName>{plan.name}</PlanName>
                <PlanDescription>{plan.description}</PlanDescription>

                <PlanPrice>
                  <Price>
                    <span className="currency">₹</span>
                    {getPrice(plan).toLocaleString()}
                    <span className="period">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </Price>
                  {isYearly && getOriginalPrice(plan) && (
                    <PriceNote>
                      <OriginalPrice>
                        ₹{getOriginalPrice(plan).toLocaleString()}
                      </OriginalPrice>
                      Save ₹
                      {(
                        getOriginalPrice(plan) - getPrice(plan)
                      ).toLocaleString()}
                    </PriceNote>
                  )}
                  {!isYearly && (
                    <PriceNote>Billed monthly • Cancel anytime</PriceNote>
                  )}
                </PlanPrice>

                <FeaturesList>
                  {plan.features.map((feature, featureIndex) => (
                    <FeatureItem
                      key={featureIndex}
                      className={plan.featured ? 'premium' : ''}
                    >
                      <FaCheck className="icon" />
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>

                <CTAButton featured={plan.featured}>
                  Start Free Trial
                  <FaArrowRight />
                </CTAButton>
              </PricingCard>
            ))}
          </PricingGrid>
        </Container>
      </PricingSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose StoreBuilder?</SectionTitle>
          <SectionSubtitle>
            Everything you need to build, launch, and grow your online presence
          </SectionSubtitle>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>
                  <feature.icon />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <FAQSection>
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionSubtitle>
            Got questions? We've got answers. Can't find what you're looking
            for? Contact our support team.
          </SectionSubtitle>

          <FAQContainer>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  {openFAQ === index ? <FaMinus /> : <FaPlus />}
                </FAQQuestion>
                <FAQAnswer isOpen={openFAQ === index}>{faq.answer}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>
        </Container>
      </FAQSection>

      <CTASection>
        <Container>
          <CTATitle>Ready to Get Started?</CTATitle>
          <CTASubtitle>
            Join thousands of businesses already using StoreBuilder to create
            stunning websites and grow their online presence.
          </CTASubtitle>

          <CTAButtons>
            <PrimaryCTAButton>Start Your Free Trial</PrimaryCTAButton>
            <SecondaryCTAButton>Talk to Sales</SecondaryCTAButton>
          </CTAButtons>
        </Container>
      </CTASection>
    </PageContainer>
  );
};

export default PricingPage;
