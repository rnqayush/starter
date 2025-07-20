import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaClock,
  FaUsers,
  FaAward,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { getBusinessTemplate } from "../data/businessTemplates";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
`;

// Edit Mode Overlay
const EditModeOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isEditing',
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isEditing ? 'rgba(129, 140, 248, 0.15)' : 'transparent'};
  z-index: 50;
  pointer-events: ${props => props.isEditing ? 'auto' : 'none'};
  opacity: ${props => props.isEditing ? 1 : 0};
  transition: all 0.3s ease;
  backdrop-filter: ${props => props.isEditing ? 'blur(1px)' : 'none'};
`;

// Edit Mode Banner
const EditModeBanner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isEditing' && prop !== 'primaryColor',
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, ${props => props.primaryColor || theme.colors.primary} 0%, ${props => props.primaryColor ? props.primaryColor + 'dd' : theme.colors.primaryDark} 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 60;
  transform: translateY(${props => props.isEditing ? '0' : '-100%'});
  transition: transform 0.3s ease;
  box-shadow: ${theme.shadows.lg};

  .edit-instructions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.md};

    .icon {
      animation: pulse 2s infinite;
    }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

// Navbar Styles
const Navbar = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'isEditing',
})`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: ${props => props.isEditing ? '40px' : '0'};
  z-index: 40;
  transition: top 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: between;
  align-items: center;
  height: 70px;
`;

const Logo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${props => props.primaryColor || theme.colors.primary};
  flex: 1;
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  display: flex;
  gap: ${theme.spacing.xl};
  flex: 2;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${theme.colors.gray700};
    font-weight: 500;
    padding: ${theme.spacing.sm} 0;
    position: relative;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.primaryColor || theme.colors.primary};
    }

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background: ${props => props.primaryColor || theme.colors.primary};
      transition: width 0.3s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const EditButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${props => props.primaryColor || theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
  justify-content: flex-end;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const BackToListButton = styled.button`
  background: transparent;
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: ${theme.spacing.md};

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

// Hero Section Styles
const HeroSection = styled.section.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: linear-gradient(
    135deg,
    ${props => props.primaryColor + '20'} 0%,
    ${props => props.primaryColor + '10'} 100%
  );
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23000003" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
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
  font-weight: 800;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const HeroCTA = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${props => props.primaryColor || theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

// Section Styles
const Section = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${props => props.background || theme.colors.white};
`;

const SectionContainer = styled.div`
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
  font-size: 1.1rem;
  text-align: center;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

// About Section Styles
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const AboutContent = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const AboutImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  height: 400px;
  background: ${props => props.primaryColor + '20'};
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${props => props.primaryColor || theme.colors.primary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xxl};
`;

const StatCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};

  .number {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${props => props.primaryColor || theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  .label {
    color: ${theme.colors.gray600};
    font-weight: 500;
  }
`;

// Services Section Styles
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const ServiceCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.gray200};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto ${theme.spacing.lg};
    background: ${props => props.primaryColor || theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: ${theme.colors.white};
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.gray600};
    line-height: 1.6;
  }
`;

// Team Section Styles
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
`;

const TeamCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const TeamPhoto = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  height: 250px;
  background: ${props => props.primaryColor + '30'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.primaryColor || theme.colors.primary};
`;

const TeamInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  padding: ${theme.spacing.xl};

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }

  .role {
    color: ${props => props.primaryColor || theme.colors.primary};
    font-weight: 500;
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

// Testimonials Section Styles
const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const TestimonialCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  position: relative;

  .quote {
    font-size: 2rem;
    color: ${props => props.primaryColor || theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }

  .text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${theme.colors.gray700};
    margin-bottom: ${theme.spacing.lg};
    font-style: italic;
  }

  .author {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info h4 {
      font-weight: 600;
      color: ${theme.colors.gray900};
      margin-bottom: ${theme.spacing.xs};
    }

    .info p {
      color: ${theme.colors.gray600};
      font-size: 0.9rem;
    }

    .rating {
      display: flex;
      gap: 2px;
      color: #fbbf24;
    }
  }
`;

// Contact Section Styles
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  input, textarea {
    padding: ${theme.spacing.md};
    border: 2px solid ${theme.colors.gray200};
    border-radius: ${theme.borderRadius.md};
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.primaryColor || theme.colors.primary};
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  button {
    background: ${props => props.primaryColor || theme.colors.primary};
    color: ${theme.colors.white};
    padding: ${theme.spacing.lg};
    border: none;
    border-radius: ${theme.borderRadius.md};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }
`;

const ContactInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.lg};
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.lg};
    padding: ${theme.spacing.md};
    background: ${theme.colors.gray50};
    border-radius: ${theme.borderRadius.md};

    .icon {
      width: 40px;
      height: 40px;
      background: ${props => props.primaryColor || theme.colors.primary};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.white};
    }

    .text {
      color: ${theme.colors.gray700};
      font-weight: 500;
    }
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
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    color: ${theme.colors.gray300};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const SocialLink = styled.a.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  width: 40px;
  height: 40px;
  background: ${props => props.primaryColor || theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const EditableSection = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isEditing' && prop !== 'primaryColor' && prop !== 'sectionName',
})`
  position: relative;
  outline: ${props => props.isEditing ? `2px dashed ${props.primaryColor || theme.colors.primary}` : 'none'};
  outline-offset: 4px;
  cursor: ${props => props.isEditing ? 'pointer' : 'default'};
  
  &:hover {
    outline: ${props => props.isEditing ? `2px solid ${props.primaryColor || theme.colors.primary}` : 'none'};
  }
`;

const BusinessWebsitePage = () => {
  const { businessSlug } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    const template = getBusinessTemplate(businessSlug);
    if (template) {
      setBusinessData(template);
    }
  }, [businessSlug]);

  if (!businessData) {
    return (
      <PageContainer>
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h2>Business Website Not Found</h2>
          <p>The business website you're looking for doesn't exist.</p>
        </div>
      </PageContainer>
    );
  }

  const handleBackToList = () => {
    navigate("/business-websites");
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSectionClick = (sectionId) => {
    if (isEditing) {
      alert(`Editing ${sectionId} section. In a real application, this would open an editor.`);
    }
  };

  // Sample data based on business type
  const getBusinessContent = (businessType) => {
    const baseContent = {
      salon: {
        hero: {
          title: "Luxury Beauty Salon & Spa",
          subtitle: "Transform your look with our expert stylists and premium beauty treatments in a relaxing atmosphere."
        },
        about: {
          title: "About Our Salon",
          description: "With over 15 years of experience, our luxury salon combines traditional techniques with modern innovation to deliver exceptional beauty services."
        },
        services: [
          { icon: "✂️", title: "Hair Styling", description: "Professional cuts, colors, and treatments for all hair types" },
          { icon: "💅", title: "Nail Care", description: "Manicures, pedicures, and nail art by certified technicians" },
          { icon: "🧴", title: "Spa Treatments", description: "Relaxing facials, massages, and body treatments" }
        ],
        team: [
          { name: "Sarah Johnson", role: "Senior Stylist", bio: "15+ years experience in color and cutting" },
          { name: "Maria Garcia", role: "Nail Specialist", bio: "Expert in nail art and luxury manicures" },
          { name: "Emily Chen", role: "Spa Therapist", bio: "Licensed massage therapist and esthetician" }
        ]
      },
      gym: {
        hero: {
          title: "Elite Fitness Center",
          subtitle: "Achieve your fitness goals with state-of-the-art equipment, expert trainers, and motivating group classes."
        },
        about: {
          title: "About Our Gym",
          description: "We're committed to helping you reach your fitness potential with personalized training programs and a supportive community."
        },
        services: [
          { icon: "🏋️", title: "Personal Training", description: "One-on-one sessions with certified fitness professionals" },
          { icon: "🏃", title: "Group Classes", description: "High-energy classes including HIIT, yoga, and spin" },
          { icon: "💪", title: "Strength Training", description: "Complete weight room with modern equipment" }
        ],
        team: [
          { name: "Mike Thompson", role: "Head Trainer", bio: "Former athlete with 10+ years training experience" },
          { name: "Lisa Park", role: "Yoga Instructor", bio: "Certified in multiple yoga disciplines" },
          { name: "David Wilson", role: "Nutritionist", bio: "Sports nutrition specialist and wellness coach" }
        ]
      },
      restaurant: {
        hero: {
          title: "Bella Vista Restaurant",
          subtitle: "Experience authentic Italian cuisine crafted with fresh ingredients and traditional recipes in an elegant setting."
        },
        about: {
          title: "Our Story",
          description: "Family-owned for three generations, we bring authentic Italian flavors to your table using recipes passed down through our family."
        },
        services: [
          { icon: "🍝", title: "Fine Dining", description: "Authentic Italian dishes made with imported ingredients" },
          { icon: "🍷", title: "Wine Selection", description: "Curated collection of Italian and international wines" },
          { icon: "🎉", title: "Private Events", description: "Special occasions and corporate events catering" }
        ],
        team: [
          { name: "Chef Antonio", role: "Executive Chef", bio: "Third-generation chef from Tuscany" },
          { name: "Isabella Rosa", role: "Sommelier", bio: "Wine expert with 12+ years experience" },
          { name: "Marco Bianchi", role: "Pastry Chef", bio: "Specializes in traditional Italian desserts" }
        ]
      }
    };

    return baseContent[businessType] || baseContent.salon;
  };

  const content = getBusinessContent(businessData.slug);

    return (
    <PageContainer>
      <EditModeOverlay isEditing={isEditing} />
      <EditModeBanner isEditing={isEditing} primaryColor={businessData.primaryColor}>
        <div className="edit-instructions">
          <span className="icon">✏️</span>
          <span>Edit Mode Active - Click on any section to customize</span>
          <span className="icon">👆</span>
        </div>
      </EditModeBanner>
      
            {/* Navbar */}
      <Navbar isEditing={isEditing}>
        <NavContainer>
          <BackToListButton onClick={handleBackToList}>
            <FaArrowLeft />
          </BackToListButton>
          <Logo primaryColor={businessData.primaryColor}>
            {businessData.name}
          </Logo>
          <NavLinks primaryColor={businessData.primaryColor}>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </NavLinks>
          <EditButton 
            primaryColor={businessData.primaryColor}
            onClick={toggleEditMode}
          >
            <FaEdit />
            {isEditing ? 'Exit Edit' : 'Edit Website'}
          </EditButton>
        </NavContainer>
      </Navbar>

      {/* Hero Section */}
      <EditableSection 
                isEditing={isEditing}
        primaryColor={businessData.primaryColor}
        sectionName="Hero Section"
        onClick={() => handleSectionClick('hero')}
      >
        <HeroSection id="home" primaryColor={businessData.primaryColor}>
          <HeroContent>
            <HeroTitle>{content.hero.title}</HeroTitle>
            <HeroSubtitle>{content.hero.subtitle}</HeroSubtitle>
            <HeroCTA primaryColor={businessData.primaryColor}>
              Book Appointment
            </HeroCTA>
          </HeroContent>
        </HeroSection>
      </EditableSection>

      {/* About Section */}
      <EditableSection 
        isEditing={isEditing}
        primaryColor={businessData.primaryColor}
        onClick={() => handleSectionClick('about')}
      >
        <Section id="about" background={theme.colors.gray50}>
          <SectionContainer>
            <AboutGrid>
              <AboutContent>
                <h3>{content.about.title}</h3>
                <p>{content.about.description}</p>
                <p>We pride ourselves on delivering exceptional service and creating memorable experiences for all our clients. Our commitment to excellence has made us a trusted choice in the community.</p>
              </AboutContent>
              <AboutImage primaryColor={businessData.primaryColor}>
                {businessData.slug === 'salon' && '💇‍♀️'}
                {businessData.slug === 'gym' && '🏋️‍♂️'}
                {businessData.slug === 'restaurant' && '👨‍🍳'}
                {!['salon', 'gym', 'restaurant'].includes(businessData.slug) && '🏢'}
              </AboutImage>
            </AboutGrid>
            
            <StatsGrid>
              <StatCard primaryColor={businessData.primaryColor}>
                <div className="number">500+</div>
                <div className="label">Happy Clients</div>
              </StatCard>
              <StatCard primaryColor={businessData.primaryColor}>
                <div className="number">5+</div>
                <div className="label">Years Experience</div>
              </StatCard>
              <StatCard primaryColor={businessData.primaryColor}>
                <div className="number">98%</div>
                <div className="label">Satisfaction Rate</div>
              </StatCard>
              <StatCard primaryColor={businessData.primaryColor}>
                <div className="number">24/7</div>
                <div className="label">Support</div>
              </StatCard>
            </StatsGrid>
          </SectionContainer>
        </Section>
      </EditableSection>

      {/* Services Section */}
      <EditableSection 
        isEditing={isEditing}
        primaryColor={businessData.primaryColor}
        onClick={() => handleSectionClick('services')}
      >
        <Section id="services">
          <SectionContainer>
            <SectionTitle>Our Services</SectionTitle>
            <SectionSubtitle>
              We offer a comprehensive range of professional services designed to meet your needs and exceed your expectations.
            </SectionSubtitle>
            <ServicesGrid>
              {content.services.map((service, index) => (
                <ServiceCard key={index} primaryColor={businessData.primaryColor}>
                  <div className="icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </ServiceCard>
              ))}
            </ServicesGrid>
          </SectionContainer>
        </Section>
      </EditableSection>

      {/* Team Section */}
      <EditableSection 
        isEditing={isEditing}
        primaryColor={businessData.primaryColor}
        onClick={() => handleSectionClick('team')}
      >
        <Section id="team" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>Meet Our Team</SectionTitle>
            <SectionSubtitle>
              Our experienced professionals are passionate about delivering exceptional service and results.
            </SectionSubtitle>
            <TeamGrid>
              {content.team.map((member, index) => (
                <TeamCard key={index}>
                  <TeamPhoto primaryColor={businessData.primaryColor}>
                    👤
                  </TeamPhoto>
                  <TeamInfo primaryColor={businessData.primaryColor}>
                    <h3>{member.name}</h3>
                    <div className="role">{member.role}</div>
                    <p>{member.bio}</p>
                  </TeamInfo>
                </TeamCard>
              ))}
            </TeamGrid>
          </SectionContainer>
        </Section>
      </EditableSection>

      {/* Testimonials Section */}
      <EditableSection 
        isEditing={isEditing}
        primaryColor={businessData.primaryColor}
        onClick={() => handleSectionClick('testimonials')}
      >
        <Section id="testimonials">
          <SectionContainer>
            <SectionTitle>What Our Clients Say</SectionTitle>
            <SectionSubtitle>
              Don't just take our word for it - hear from our satisfied customers about their experiences.
            </SectionSubtitle>
            <TestimonialsGrid>
              {[1, 2, 3].map((_, index) => (
                <TestimonialCard key={index} primaryColor={businessData.primaryColor}>
                  <div className="quote">
                    <FaQuoteLeft />
                  </div>
                  <div className="text">
                    "Outstanding service and professional staff. I couldn't be happier with the results. Highly recommend to anyone looking for quality and excellence."
                  </div>
                  <div className="author">
                    <div className="info">
                      <h4>Client Name</h4>
                      <p>Satisfied Customer</p>
                    </div>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>
          </SectionContainer>
        </Section>
      </EditableSection>

      {/* Contact Section */}
      <EditableSection 
        isEditing={isEditing}
        primaryColor={businessData.primaryColor}
        onClick={() => handleSectionClick('contact')}
      >
        <Section id="contact" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>Get In Touch</SectionTitle>
            <SectionSubtitle>
              Ready to get started? Contact us today to schedule a consultation or learn more about our services.
            </SectionSubtitle>
            <ContactGrid>
              <ContactForm primaryColor={businessData.primaryColor}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="tel" placeholder="Your Phone" />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
              </ContactForm>
              
              <ContactInfo primaryColor={businessData.primaryColor}>
                <h3>Contact Information</h3>
                <div className="contact-item">
                  <div className="icon">
                    <FaPhone />
                  </div>
                  <div className="text">+1 (555) 123-4567</div>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <FaEnvelope />
                  </div>
                  <div className="text">info@{businessData.slug}.com</div>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="text">123 Business Street, City, State 12345</div>
                </div>
              </ContactInfo>
            </ContactGrid>
          </SectionContainer>
        </Section>
      </EditableSection>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <h3>{businessData.name}</h3>
          <p>Follow us on social media for the latest updates and special offers.</p>
          <SocialLinks>
            <SocialLink href="#" primaryColor={businessData.primaryColor}>
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#" primaryColor={businessData.primaryColor}>
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" primaryColor={businessData.primaryColor}>
              <FaInstagram />
            </SocialLink>
            <SocialLink href="#" primaryColor={businessData.primaryColor}>
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
          <p>&copy; 2024 {businessData.name}. All rights reserved.</p>
        </FooterContent>
      </Footer>
    </PageContainer>
  );
};

export default BusinessWebsitePage;
