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
} from "react-icons/fa";
import Header from "../shared/Header";
import { Button } from "../shared/Button";
import { theme } from "../../styles/GlobalStyle";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
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
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xxl};
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const ServicesSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};
`;

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
`;

const ServiceCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  box-shadow: ${theme.shadows.md};
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

const ServiceIcon = styled.div`
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

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const ServiceDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`;

const ServiceButton = styled(Button)`
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

  const services = [
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
      id: "automobiles",
      icon: FaCar,
      title: "Automobiles",
      description:
        "Build professional car dealership websites with inventory management, financing options, and test drive booking.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      path: "/automobiles",
    },
    {
      id: "weddings",
      icon: FaRing,
      title: "Weddings",
      description:
        "Design beautiful wedding websites with RSVP systems, photo galleries, and event planning tools.",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      path: "/weddings",
    },
    {
      id: "ecommerce",
      icon: FaShoppingBag,
      title: "Ecommerce",
      description:
        "Launch complete online stores with product catalogs, shopping carts, and secure payment processing.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      path: "/ecommerce",
    },
  ];

  const handleServiceClick = (service) => {
    if (service.id === "hotels") {
      // Navigate to the existing hotel page (keeping the current design)
      navigate("/hotels");
    } else {
      // For other services, show coming soon or navigate to their respective pages
      alert(`${service.title} website builder coming soon!`);
    }
  };

  return (
    <PageContainer>
      <Header />

      <HeroSection>
        <HeroContent>
          <HeroTitle>Launch Your Own Website</HeroTitle>
          <HeroSubtitle>
            For Hotels, Automobiles, Weddings & More — Professional websites
            made simple
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ServicesSection>
        <ServicesContainer>
          <SectionTitle>Choose Your Industry</SectionTitle>
          <SectionSubtitle>
            Select the type of website you want to create. Each comes with
            industry-specific features and templates.
          </SectionSubtitle>

          <ServicesGrid>
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <ServiceCard
                  key={service.id}
                  gradient={service.gradient}
                  onClick={() => handleServiceClick(service)}
                >
                  <ServiceIcon gradient={service.gradient}>
                    <IconComponent />
                  </ServiceIcon>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceButton gradient={service.gradient}>
                    {service.id === "hotels" ? "Explore" : "Coming Soon"}
                    <FaArrowRight />
                  </ServiceButton>
                </ServiceCard>
              );
            })}
          </ServicesGrid>
        </ServicesContainer>
      </ServicesSection>

      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>WebBuilder Pro</h3>
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
            <h3>Services</h3>
            <div>
              <p>Hotel Websites</p>
              <p>Car Dealership Sites</p>
              <p>Wedding Websites</p>
              <p>Ecommerce Stores</p>
            </div>
          </FooterSection>

          <FooterSection>
            <h3>Contact</h3>
            <ContactInfo>
              <FaPhone />
              <span>+1 (555) 123-4567</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>hello@webbuilder.com</span>
            </ContactInfo>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>123 Business St, Tech City</span>
            </ContactInfo>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>&copy; 2024 WebBuilder Pro. All rights reserved.</p>
        </FooterBottom>
      </Footer>
    </PageContainer>
  );
};

export default PlatformHomePage;
