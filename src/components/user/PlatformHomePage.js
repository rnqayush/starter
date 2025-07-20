import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaHotel,
  FaCar,
  FaRing,
  FaShoppingBag,
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHandPaper,
  FaPalette,
  FaMobile,
  FaHeadset,
  FaRocket,
  FaCheck,
  FaStar,
  FaQuoteLeft,
  FaUsers,
  FaStore,
  FaChartLine,
  FaClock,
  FaShield,
  FaCode,
  FaCloud,
} from "react-icons/fa";
import Header from "../shared/Header";
import { Button } from "../shared/Button";
import { theme, media } from "../../styles/GlobalStyle";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
`;

// Hero Section Styles
const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ffffff08" points="0,0 1000,300 1000,1000 0,700"/></svg>');
    background-size: cover;
  }

  ${media.mobile} {
    padding: ${theme.spacing.xl} 0;
    min-height: 70vh;
  }

  ${media.tablet} {
    padding: ${theme.spacing.xxl} 0;
    min-height: 75vh;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;

  ${media.mobile} {
    padding: 0 ${theme.spacing.sm};
  }

  ${media.tablet} {
    padding: 0 ${theme.spacing.lg};
  }

  ${media.desktop} {
    padding: 0 ${theme.spacing.xl};
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;

  ${media.mobile} {
    font-size: 2.5rem;
    margin-bottom: ${theme.spacing.md};
  }

  ${media.tablet} {
    font-size: 3.25rem;
  }

  ${media.desktop} {
    font-size: 4.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const HeroCTAContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${theme.spacing.xl};
`;

const CreateStoreCTA = styled(Button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  background: #10b981;
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const ExploreStoreCTA = styled(Button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  background: #8b5cf6;
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: #7c3aed;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

// Explore Stores Section Styles
const ExploreStoresSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.gray50};
`;

const ExploreStoresContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xxl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const StoreCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
`;

const StoreCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.gradient};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const StoreCardImage = styled.div`
  height: 200px;
  background: ${(props) => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 3rem;
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
`;

const StoreCardContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const StoreCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const StoreCardDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`;

const ViewStoresButton = styled(Button)`
  width: 100%;
  background: ${(props) => props.gradient};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: none;
  }
`;

// Why Choose Us Section Styles
const WhyChooseUsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};
`;

const WhyChooseUsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
`;

const BenefitCard = styled.div`
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.primary};
    background: ${theme.colors.white};
    box-shadow: ${theme.shadows.lg};
  }
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${theme.spacing.lg};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${theme.colors.white};
  background: ${theme.colors.primary};
`;

const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const BenefitDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
`;

// CTA Banner Section Styles
const CTABannerSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: ${theme.colors.white};
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle fill="%23ffffff03" cx="200" cy="200" r="100"/><circle fill="%23ffffff03" cx="800" cy="400" r="150"/><circle fill="%23ffffff03" cx="400" cy="700" r="80"/></svg>');
    background-size: cover;
  }
`;

const CTABannerContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;
`;

const CTABannerTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.2;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const CTABannerButton = styled(Button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  font-size: 1.2rem;
  font-weight: 600;
  background: #10b981;
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

// Footer Styles
const Footer = styled.footer`
  background: ${theme.colors.gray900};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0 ${theme.spacing.xl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.white};
  }
`;

const FooterLink = styled.a`
  display: block;
  color: ${theme.colors.gray300};
  text-decoration: none;
  margin-bottom: ${theme.spacing.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray300};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.gray700};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray700};
  color: ${theme.colors.gray400};
`;

const PlatformHomePage = () => {
  const navigate = useNavigate();

  const storeCategories = [
    {
      id: "hotels",
      icon: FaHotel,
      title: "Hotels",
      description:
        "Boutique hotels, resorts, and bed & breakfasts showcase their rooms and services with stunning booking systems.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      path: "/hotels",
    },
    {
      id: "ecommerce",
      icon: FaShoppingBag,
      title: "Ecommerce",
      description:
        "Fashion brands, electronics stores, and artisan shops sell products with beautiful catalogs and secure checkout.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      path: "/ecommerce",
    },
    {
      id: "weddings",
      icon: FaRing,
      title: "Weddings",
      description:
        "Wedding planners, photographers, and venues share their portfolios and book clients with elegant galleries.",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      path: "/weddings",
    },
    {
      id: "automobiles",
      icon: FaCar,
      title: "Automobiles",
      description:
        "Car dealerships, rental companies, and mechanics display inventory and connect with customers online.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      path: "/automobiles",
    },
  ];

  const benefits = [
    {
      icon: FaHandPaper,
      title: "No Tech Headache",
      description: "Just drag & drop",
    },
    {
      icon: FaPalette,
      title: "Custom Designs",
      description: "Look different, sell better",
    },
    {
      icon: FaMobile,
      title: "Fast Performance",
      description: "Optimized for mobile",
    },
    {
      icon: FaHeadset,
      title: "24x7 Support",
      description: "We grow with you",
    },
  ];

  const handleStoreClick = (store) => {
    navigate(store.path);
  };

  const handleCreateStore = () => {
    navigate("/create-store");
  };

  const handleExploreStores = () => {
    // Scroll to explore stores section
    const exploreSection = document.getElementById("explore-stores");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageContainer>
      <Header />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Launch Your Online Store Without Coding</HeroTitle>
          <HeroSubtitle>
            From hotels to ecommerce, go live in minutes — mobile-ready,
            customizable, and built for growth.
          </HeroSubtitle>
          <HeroCTAContainer>
            <CreateStoreCTA onClick={handleCreateStore}>
              🟢 Create My Store
              <FaRocket />
            </CreateStoreCTA>
            <ExploreStoreCTA onClick={handleExploreStores}>
              🟣 Explore Live Stores
              <FaArrowRight />
            </ExploreStoreCTA>
          </HeroCTAContainer>
        </HeroContent>
      </HeroSection>

      {/* Explore Stores Section */}
      <ExploreStoresSection id="explore-stores">
        <ExploreStoresContainer>
          <SectionTitle>See How Others Are Succeeding</SectionTitle>
          <SectionSubtitle>
            Hotels, fashion, weddings, cars – discover how business owners like
            you have built stunning online storefronts.
          </SectionSubtitle>
          <StoreCardsGrid>
            {storeCategories.map((store) => {
              const IconComponent = store.icon;
              return (
                <StoreCard
                  key={store.id}
                  gradient={store.gradient}
                  onClick={() => handleStoreClick(store)}
                >
                  <StoreCardImage gradient={store.gradient}>
                    <IconComponent />
                  </StoreCardImage>
                  <StoreCardContent>
                    <StoreCardTitle>{store.title}</StoreCardTitle>
                    <StoreCardDescription>
                      {store.description}
                    </StoreCardDescription>
                    <ViewStoresButton gradient={store.gradient}>
                      View {store.title} Stores
                      <FaArrowRight />
                    </ViewStoresButton>
                  </StoreCardContent>
                </StoreCard>
              );
            })}
          </StoreCardsGrid>
        </ExploreStoresContainer>
      </ExploreStoresSection>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection>
        <WhyChooseUsContainer>
          <SectionTitle>Why Smart Sellers Choose Our Platform</SectionTitle>
          <BenefitsGrid>
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <BenefitCard key={index}>
                  <BenefitIcon>
                    <IconComponent />
                  </BenefitIcon>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <BenefitDescription>{benefit.description}</BenefitDescription>
                </BenefitCard>
              );
            })}
          </BenefitsGrid>
        </WhyChooseUsContainer>
      </WhyChooseUsSection>

      {/* CTA Banner Section */}
      <CTABannerSection>
        <CTABannerContainer>
          <CTABannerTitle>
            Don't Just Watch Others Succeed – Be the Next Big Brand
          </CTABannerTitle>
          <CTABannerButton onClick={handleCreateStore}>
            Start My Online Store
            <FaRocket />
          </CTABannerButton>
        </CTABannerContainer>
      </CTABannerSection>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>StoreBuilder</h3>
            <p>
              Empowering businesses to create professional websites with
              industry-specific features and tools.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Industries</h3>
            <FooterLink href="/hotels">Hotels</FooterLink>
            <FooterLink href="/ecommerce">Ecommerce</FooterLink>
            <FooterLink href="/weddings">Weddings</FooterLink>
            <FooterLink href="/automobiles">Automobiles</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Company</h3>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <ContactInfo>
              <FaPhone />
              <span>+1 (555) 123-4567</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>hello@storebuilder.com</span>
            </ContactInfo>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>123 Business St, Tech City</span>
            </ContactInfo>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>&copy; 2024 StoreBuilder. All rights reserved.</p>
        </FooterBottom>
      </Footer>
    </PageContainer>
  );
};

export default PlatformHomePage;
