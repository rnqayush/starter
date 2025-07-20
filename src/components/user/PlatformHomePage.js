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
  FaPalette,
  FaRocket,
  FaCheck,
  FaStar,
  FaQuoteLeft,
  FaCode,
  FaCloud,
  FaLock,
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
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #334155 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23ffffff05" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
  }

  ${media.mobile} {
    padding: ${theme.spacing.xl} 0;
    min-height: 75vh;
  }

  ${media.tablet} {
    padding: ${theme.spacing.xxl} 0;
    min-height: 80vh;
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
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  letter-spacing: -0.02em;

  ${media.mobile} {
    font-size: 2.75rem;
    margin-bottom: ${theme.spacing.md};
  }

  ${media.tablet} {
    font-size: 3.5rem;
  }

  ${media.desktop} {
    font-size: 5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.95;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 400;
  color: #e2e8f0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.15rem;
  }
`;

const TrustIndicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  opacity: 0.8;

  ${media.mobile} {
    gap: ${theme.spacing.lg};
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.95rem;
  color: #cbd5e1;

  svg {
    color: #10b981;
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
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  font-size: 1.15rem;
  font-weight: 600;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
  }
`;

const ExploreStoreCTA = styled(Button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  font-size: 1.15rem;
  font-weight: 600;
  background: transparent;
  color: ${theme.colors.white};
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

// Stats Section Styles
const StatsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.xl};
  text-align: center;
`;

const StatCard = styled.div`
  padding: ${theme.spacing.lg};
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1;

  ${media.mobile} {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${theme.colors.gray600};
  font-weight: 500;
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
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
  letter-spacing: -0.02em;

  ${media.mobile} {
    font-size: 2.2rem;
  }
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
  line-height: 1.7;
  font-size: 1rem;
`;

// Testimonials Section Styles
const TestimonialsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const TestimonialCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray200};
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981);
    border-radius: ${theme.borderRadius.xl};
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const TestimonialQuote = styled.div`
  font-size: 2rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.lg};
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthorInfo = styled.div`
  h4 {
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;

  svg {
    color: #fbbf24;
    font-size: 1.1rem;
  }
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
      path: "/auto-dealers",
    },
  ];

    const stats = [
    { number: "50K+", label: "Active Stores" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Expert Support" },
    { number: "4.9/5", label: "Customer Rating" },
  ];

  const benefits = [
    {
      icon: FaCode,
      title: "No-Code Platform",
      description: "Build professional stores without writing a single line of code. Our drag-and-drop interface makes it simple.",
    },
    {
      icon: FaPalette,
      title: "Unlimited Customization",
      description: "Design freedom with hundreds of templates and complete brand control. Make your store uniquely yours.",
    },
    {
      icon: FaCloud,
      title: "Enterprise-Grade Infrastructure",
      description: "Built on reliable cloud infrastructure with 99.9% uptime and lightning-fast loading speeds.",
    },
        {
      icon: FaLock,
      title: "Secure & Compliant",
      description: "Bank-level security with SSL certificates, PCI compliance, and automated backups included.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Hotel Owner",
      text: "StoreBuilder transformed our booking process. We went from 20% to 85% online bookings in just 3 months.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "E-commerce Entrepreneur",
      text: "The platform paid for itself in the first month. Sales increased by 300% with their conversion-optimized templates.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Wedding Planner",
      text: "My clients love the professional portfolio gallery. I've booked more weddings this year than ever before.",
      rating: 5,
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
          <HeroTitle>Build Professional Online Stores in Minutes</HeroTitle>
          <HeroSubtitle>
            Trusted by 50,000+ businesses worldwide. Create stunning, conversion-optimized
            stores for any industry with our enterprise-grade no-code platform.
          </HeroSubtitle>
          <TrustIndicators>
            <TrustItem>
              <FaCheck />
              <span>No Credit Card Required</span>
            </TrustItem>
            <TrustItem>
              <FaCheck />
              <span>14-Day Free Trial</span>
            </TrustItem>
            <TrustItem>
              <FaCheck />
              <span>24/7 Expert Support</span>
            </TrustItem>
          </TrustIndicators>
          <HeroCTAContainer>
            <CreateStoreCTA onClick={handleCreateStore}>
              Start Building Your Store
              <FaRocket />
            </CreateStoreCTA>
            <ExploreStoreCTA onClick={handleExploreStores}>
              View Live Examples
              <FaArrowRight />
            </ExploreStoreCTA>
          </HeroCTAContainer>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </StatsSection>

      {/* Explore Stores Section */}
      <ExploreStoresSection id="explore-stores">
        <ExploreStoresContainer>
                    <SectionTitle>Industry-Specific Solutions</SectionTitle>
          <SectionSubtitle>
            Explore our specialized templates and features designed for your industry.
            Each solution comes with industry-specific tools and integrations.
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
          <SectionTitle>Why Leading Brands Choose StoreBuilder</SectionTitle>
          <SectionSubtitle>
            Join thousands of successful businesses who trust our platform to power their online growth.
          </SectionSubtitle>
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

      {/* Testimonials Section */}
      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle>Trusted by Industry Leaders</SectionTitle>
          <SectionSubtitle>
            Don't just take our word for it. Here's what our customers say about their success with StoreBuilder.
          </SectionSubtitle>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <TestimonialQuote>
                  <FaQuoteLeft />
                </TestimonialQuote>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  <AuthorInfo>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </AuthorInfo>
                  <StarRating>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </StarRating>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>

      {/* CTA Banner Section */}
      <CTABannerSection>
        <CTABannerContainer>
                  <CTABannerTitle>
            Ready to Transform Your Business?
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
