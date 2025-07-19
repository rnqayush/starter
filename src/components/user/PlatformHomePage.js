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
  FaCode,
  FaMobile,
  FaBolt,
  FaPalette,
  FaUserPlus,
  FaEdit,
  FaRocket,
  FaStar,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa";
import Header from "../shared/Header";
import { Button } from "../shared/Button";
import { theme } from "../../styles/GlobalStyle";

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

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ffffff05" points="0,0 1000,300 1000,1000 0,700"/></svg>');
    background-size: cover;
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
  font-size: 4rem;
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
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
  max-width: 600px;
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

const PrimaryCTA = styled(Button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const SecondaryCTA = styled(Button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  background: transparent;
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

// Benefits Section Styles
const BenefitsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.gray50};
`;

const BenefitsContainer = styled.div`
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
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
`;

const BenefitCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
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

// Categories Section Styles
const CategoriesSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};
`;

const CategoriesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
`;

const CategoryCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

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

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CategoryIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.lg};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${theme.colors.white};
  background: ${(props) => props.gradient};
  box-shadow: ${theme.shadows.lg};
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const CategoryDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`;

const CategoryButton = styled(Button)`
  background: ${(props) => props.gradient};
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    opacity: 0.9;
    transform: none;
  }
`;

// How It Works Section Styles
const HowItWorksSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.gray50};
`;

const HowItWorksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  position: relative;
`;

const StepCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  position: relative;
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto ${theme.spacing.lg};
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const StepDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
`;

// Testimonials Section Styles
const TestimonialsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const TestimonialCard = styled.div`
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  position: relative;
`;

const TestimonialQuote = styled.p`
  color: ${theme.colors.gray700};
  font-style: italic;
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-weight: 600;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.p`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: 2px;
`;

const AuthorTitle = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  color: ${theme.colors.primary};
  opacity: 0.3;
  font-size: 2rem;
`;

// Final CTA Section Styles
const FinalCTASection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${theme.colors.white};
  text-align: center;
`;

const FinalCTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FinalCTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const FinalCTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
`;

const FinalCTAButton = styled(Button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  font-size: 1.2rem;
  font-weight: 600;
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
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

  const benefits = [
    {
      icon: FaCode,
      title: "No Coding Required",
      description:
        "Build professional stores without any technical knowledge. Our drag-and-drop interface makes it simple.",
    },
    {
      icon: FaMobile,
      title: "Mobile Optimized",
      description:
        "Every store is automatically optimized for mobile devices, ensuring great experience on all screens.",
    },
    {
      icon: FaBolt,
      title: "Fast & Secure",
      description:
        "Lightning-fast loading times and enterprise-grade security to keep your business safe.",
    },
    {
      icon: FaPalette,
      title: "Theme Customization",
      description:
        "Choose from dozens of beautiful themes and customize them to match your brand perfectly.",
    },
  ];

  const categories = [
    {
      id: "hotels",
      icon: FaHotel,
      title: "Hotels",
      description:
        "Create stunning hotel booking websites with reservation systems, room management, and customer reviews.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      path: "/hotels",
    },
    {
      id: "ecommerce",
      icon: FaShoppingBag,
      title: "Ecommerce",
      description:
        "Launch complete online stores with product catalogs, shopping carts, and secure payment processing.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      path: "/ecommerce-stores",
    },
    {
      id: "weddings",
      icon: FaRing,
      title: "Weddings",
      description:
        "Design beautiful wedding websites with RSVP systems, photo galleries, and event planning tools.",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      path: "/wedding-vendors",
    },
    {
      id: "automobiles",
      icon: FaCar,
      title: "Automobiles",
      description:
        "Build professional car dealership websites with inventory management and financing options.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      path: "/auto-dealers",
    },
  ];

  const steps = [
    {
      number: 1,
      icon: FaUserPlus,
      title: "Sign Up",
      description: "Create your account in seconds and choose your industry",
    },
    {
      number: 2,
      icon: FaPalette,
      title: "Choose Layout",
      description: "Pick from our professionally designed templates",
    },
    {
      number: 3,
      icon: FaEdit,
      title: "Customize",
      description: "Add your content, images, and brand colors",
    },
    {
      number: 4,
      icon: FaRocket,
      title: "Launch",
      description: "Go live with your professional store in minutes",
    },
  ];

  const testimonials = [
    {
      quote:
        "StoreBuilder transformed my small hotel business. I went from taking phone bookings to having a professional online presence in just one day!",
      author: "Sarah Johnson",
      title: "Hotel Owner",
      avatar: "SJ",
    },
    {
      quote:
        "The ecommerce features are incredible. I've increased my sales by 300% since launching my online store with StoreBuilder.",
      author: "Mike Chen",
      title: "Boutique Owner",
      avatar: "MC",
    },
    {
      quote:
        "As a wedding planner, having a beautiful website was crucial. StoreBuilder gave me exactly what I needed without the hassle.",
      author: "Emily Davis",
      title: "Wedding Planner",
      avatar: "ED",
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(category.path);
  };

  const handleCreateStore = () => {
    navigate("/create-store");
  };

  const handleExploreStores = () => {
    // Scroll to categories section
    const categoriesSection = document.getElementById("categories");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageContainer>
      <Header />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Build Your Store. Sell Anything. Anywhere.</HeroTitle>
          <HeroSubtitle>
            Join 10,000+ businesses who started their journey with us.
          </HeroSubtitle>
          <HeroCTAContainer>
            <PrimaryCTA onClick={handleCreateStore}>
              Create Your Store
              <FaArrowRight />
            </PrimaryCTA>
            <SecondaryCTA onClick={handleExploreStores}>
              Explore Stores
            </SecondaryCTA>
          </HeroCTAContainer>
        </HeroContent>
      </HeroSection>

      {/* Why Build with Us Section */}
      <BenefitsSection>
        <BenefitsContainer>
          <SectionTitle>Why Build with Us?</SectionTitle>
          <SectionSubtitle>
            Everything you need to create and grow your online business
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
        </BenefitsContainer>
      </BenefitsSection>

      {/* Category Navigation Section */}
      <CategoriesSection id="categories">
        <CategoriesContainer>
          <SectionTitle>Explore What's Possible</SectionTitle>
          <SectionSubtitle>
            Choose your industry and see what successful stores look like
          </SectionSubtitle>
          <CategoriesGrid>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <CategoryCard
                  key={category.id}
                  gradient={category.gradient}
                  onClick={() => handleCategoryClick(category)}
                >
                  <CategoryIcon gradient={category.gradient}>
                    <IconComponent />
                  </CategoryIcon>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryDescription>
                    {category.description}
                  </CategoryDescription>
                  <CategoryButton gradient={category.gradient}>
                    Explore {category.title}
                    <FaArrowRight />
                  </CategoryButton>
                </CategoryCard>
              );
            })}
          </CategoriesGrid>
        </CategoriesContainer>
      </CategoriesSection>

      {/* How It Works Section */}
      <HowItWorksSection>
        <HowItWorksContainer>
          <SectionTitle>How It Works</SectionTitle>
          <SectionSubtitle>
            Get your professional store up and running in 4 simple steps
          </SectionSubtitle>
          <StepsGrid>
            {steps.map((step) => (
              <StepCard key={step.number}>
                <StepNumber>{step.number}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepCard>
            ))}
          </StepsGrid>
        </HowItWorksContainer>
      </HowItWorksSection>

      {/* Success Stories / Testimonials Section */}
      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle>Success Stories</SectionTitle>
          <SectionSubtitle>
            See what our happy customers have to say about their experience
          </SectionSubtitle>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <QuoteIcon>
                  <FaQuoteLeft />
                </QuoteIcon>
                <TestimonialQuote>"{testimonial.quote}"</TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorAvatar>{testimonial.avatar}</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.author}</AuthorName>
                    <AuthorTitle>{testimonial.title}</AuthorTitle>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>

      {/* Final CTA Section */}
      <FinalCTASection>
        <FinalCTAContainer>
          <FinalCTATitle>Start Selling Today</FinalCTATitle>
          <FinalCTADescription>
            Join thousands of successful businesses. Create your professional
            store in minutes.
          </FinalCTADescription>
          <FinalCTAButton onClick={handleCreateStore}>
            Launch My Store Now
            <FaRocket />
          </FinalCTAButton>
        </FinalCTAContainer>
      </FinalCTASection>

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
            <FooterLink href="/ecommerce-stores">Ecommerce</FooterLink>
            <FooterLink href="/wedding-vendors">Weddings</FooterLink>
            <FooterLink href="/auto-dealers">Automobiles</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Company</h3>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/features">Features</FooterLink>
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
