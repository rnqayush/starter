import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobeAmericas,
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft,
  FaPlay,
  FaUser,
  FaCalendarAlt,
  FaHeart,
  FaShare,
  FaLocationArrow,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaArrowLeft,
  FaImages
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { getVendorById } from "../data/vendors";
import { AuthContext } from "../../context/AuthContext";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.primaryColor || theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${theme.shadows.lg};
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 70vh;
  }
`;

const HeroMedia = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroVideo = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5));
  z-index: 1;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled.button`
  background: ${props => props.primaryColor || theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${props => props.scrolled ? 'rgba(255,255,255,0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  padding: ${theme.spacing.md} 0;
  transition: all 0.3s ease;
  z-index: 1000;
  border-bottom: ${props => props.scrolled ? `1px solid ${theme.colors.gray200}` : 'none'};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.scrolled ? theme.colors.gray900 : 'white'};
`;

const NavActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.sm};
  }
`;

const NavButton = styled.button`
  background: ${props => props.primary ? (props.primaryColor || theme.colors.primary) : 'transparent'};
  color: ${props => props.primary ? 'white' : (props.scrolled ? theme.colors.gray700 : 'white')};
  border: ${props => props.primary ? 'none' : `2px solid ${props.scrolled ? theme.colors.gray300 : 'white'}`};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

// Section Components
const Section = styled.section`
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  background: ${props => props.backgroundColor || 'white'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
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

// About Section
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

const AboutContent = styled.div``;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.lg};
`;

const AboutStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.primaryColor || theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
`;

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

// Services Section
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ServiceContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const ServiceIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${theme.spacing.sm};
`;

const ServiceName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const ServiceDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
`;

// Gallery Section
const GalleryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const GalleryTab = styled.button`
  background: ${props => props.active ? (props.primaryColor || theme.colors.primary) : 'transparent'};
  color: ${props => props.active ? 'white' : theme.colors.gray700};
  border: 2px solid ${props => props.primaryColor || theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primaryColor || theme.colors.primary};
    color: white;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
`;

const GalleryItem = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Packages Section
const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const PackageCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  text-align: center;
  position: relative;
  border: 3px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.primaryColor || theme.colors.primary};
    transform: translateY(-5px);
  }
`;

const PackageName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const PackagePrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.primaryColor || theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const PackageDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`;

const PackageFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.lg};
`;

const PackageFeature = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray700};

  &:before {
    content: "✓";
    color: ${props => props.primaryColor || theme.colors.primary};
    font-weight: bold;
  }
`;

const PackageButton = styled.button`
  background: ${props => props.primaryColor || theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
`;

// Testimonials Section
const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  position: relative;

  &:before {
    content: """;
    font-size: 4rem;
    color: ${props => props.primaryColor || theme.colors.primary};
    position: absolute;
    top: -10px;
    left: ${theme.spacing.lg};
    font-family: serif;
  }
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: ${theme.colors.gray700};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const AuthorWedding = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
`;

const TestimonialRating = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.warning};
`;

// FAQ Section
const FaqContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FaqItem = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
`;

const FaqQuestion = styled.button`
  width: 100%;
  padding: ${theme.spacing.lg};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 1.1rem;
`;

const FaqAnswer = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  line-height: 1.6;
  display: ${props => props.open ? 'block' : 'none'};
`;

// Contact Section
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FormLabel = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const FormInput = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.primaryColor || theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.primaryColor || theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.primaryColor || theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled.div``;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

const ContactIcon = styled.div`
  background: ${props => props.primaryColor || theme.colors.primary};
  color: white;
  padding: ${theme.spacing.md};
  border-radius: 50%;
  font-size: 1.2rem;
`;

const ContactDetails = styled.div``;

const ContactLabel = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ContactValue = styled.div`
  color: ${theme.colors.gray600};
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  margin-top: ${theme.spacing.lg};
`;

const MapEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const CitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
`;

const CityTag = styled.span`
  background: ${props => props.primaryColor || theme.colors.primary}15;
  color: ${props => props.primaryColor || theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
`;

// Footer
const Footer = styled.footer`
  background: ${theme.colors.gray900};
  color: white;
  padding: ${theme.spacing.xxl} ${theme.spacing.md} ${theme.spacing.lg};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;

const FooterText = styled.p`
  color: ${theme.colors.gray300};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const SocialLink = styled.a`
  background: ${props => props.primaryColor || theme.colors.primary};
  color: white;
  padding: ${theme.spacing.sm};
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const FooterBottom = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray700};
  text-align: center;
  color: ${theme.colors.gray400};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const LoadingSpinner = styled.div`
  animation: spin 1s linear infinite;
  color: ${theme.colors.primary};
  font-size: 2rem;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const VendorPage = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('decor');
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const vendorData = getVendorById(vendorSlug);
    setVendor(vendorData);
    setLoading(false);

    // Pre-fill form if user is logged in
    if (user) {
      setContactForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [vendorSlug, user]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
      setShowBackToTop(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your enquiry! We will get back to you soon.');
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner>
          <FaSpinner />
        </LoadingSpinner>
      </LoadingContainer>
    );
  }

  if (!vendor) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center' }}>
          <h2>Vendor Not Found</h2>
          <p>The vendor you're looking for doesn't exist.</p>
          <NavButton onClick={() => navigate('/weddings')}>
            <FaArrowLeft />
            Back to Vendors
          </NavButton>
        </div>
      </LoadingContainer>
    );
  }

  const primaryColor = vendor.theme?.primaryColor || theme.colors.primary;

  return (
    <PageContainer>
      {/* Navigation */}
      <NavBar scrolled={scrolled}>
        <NavContent>
          <NavLogo scrolled={scrolled}>{vendor.name}</NavLogo>
          <NavActions>
            <NavButton onClick={() => navigate('/weddings')} scrolled={scrolled}>
              <FaArrowLeft />
              Back
            </NavButton>
            <NavButton scrolled={scrolled}>
              <FaHeart />
              Save
            </NavButton>
            <NavButton scrolled={scrolled}>
              <FaShare />
              Share
            </NavButton>
            <NavButton primary primaryColor={primaryColor} onClick={() => scrollToSection('contact')}>
              <FaCalendarAlt />
              Enquire Now
            </NavButton>
          </NavActions>
        </NavContent>
      </NavBar>

      {/* Hero Section */}
      <HeroSection id="hero">
        <HeroMedia>
          {vendor.heroVideo ? (
            <HeroVideo
              src={vendor.heroVideo}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <HeroImage src={vendor.image} alt={vendor.name} />
          )}
        </HeroMedia>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>{vendor.name}</HeroTitle>
          <HeroTagline>{vendor.tagline}</HeroTagline>
          <HeroButton primaryColor={primaryColor} onClick={() => scrollToSection('contact')}>
            <FaCalendarAlt />
            Enquire Now
          </HeroButton>
        </HeroContent>
      </HeroSection>

      {/* About Us Section */}
      <Section id="about" backgroundColor={vendor.theme?.backgroundColor}>
        <Container>
          <SectionTitle>About Us</SectionTitle>
          <AboutGrid>
            <AboutContent>
              <AboutText>{vendor.aboutUs?.text}</AboutText>
              <AboutStats>
                <StatCard>
                  <StatNumber primaryColor={primaryColor}>{vendor.aboutUs?.experience}</StatNumber>
                  <StatLabel>Experience</StatLabel>
                </StatCard>
                <StatCard>
                  <StatNumber primaryColor={primaryColor}>{vendor.aboutUs?.completedWeddings}</StatNumber>
                  <StatLabel>Weddings</StatLabel>
                </StatCard>
                <StatCard>
                  <StatNumber primaryColor={primaryColor}>{vendor.aboutUs?.satisfiedCouples}</StatNumber>
                  <StatLabel>Happy Couples</StatLabel>
                </StatCard>
              </AboutStats>
            </AboutContent>
            {vendor.aboutUs?.videoEmbed && (
              <VideoContainer>
                <VideoEmbed
                  src={vendor.aboutUs.videoEmbed}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </VideoContainer>
            )}
          </AboutGrid>
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <Container>
          <SectionTitle>Services Offered</SectionTitle>
          <SectionSubtitle>
            We provide comprehensive wedding services to make your special day perfect
          </SectionSubtitle>
          <ServicesGrid>
            {vendor.services?.map((service, index) => (
              <ServiceCard key={index}>
                <ServiceImage src={service.image} alt={service.name} />
                <ServiceContent>
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <ServiceName>{service.name}</ServiceName>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </ServiceContent>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery" backgroundColor={theme.colors.gray50}>
        <Container>
          <SectionTitle>Gallery</SectionTitle>
          <SectionSubtitle>
            Browse through our portfolio of beautiful weddings and events
          </SectionSubtitle>
          <GalleryTabs>
            {Object.keys(vendor.gallery || {}).map((category) => (
              <GalleryTab
                key={category}
                active={activeGalleryTab === category}
                primaryColor={primaryColor}
                onClick={() => setActiveGalleryTab(category)}
              >
                <FaImages />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </GalleryTab>
            ))}
          </GalleryTabs>
          <GalleryGrid>
            {vendor.gallery?.[activeGalleryTab]?.map((image, index) => (
              <GalleryItem
                key={index}
                src={image}
                alt={`${vendor.name} ${activeGalleryTab} ${index + 1}`}
              />
            ))}
          </GalleryGrid>
        </Container>
      </Section>

      {/* Packages Section */}
      {vendor.packages && (
        <Section id="packages">
          <Container>
            <SectionTitle>Packages & Pricing</SectionTitle>
            <SectionSubtitle>
              Choose the perfect package for your wedding celebration
            </SectionSubtitle>
            <PackagesGrid>
              {vendor.packages.map((pkg, index) => (
                <PackageCard key={index} primaryColor={primaryColor}>
                  <PackageName>{pkg.name}</PackageName>
                  <PackagePrice primaryColor={primaryColor}>{pkg.price}</PackagePrice>
                  <PackageDescription>{pkg.description}</PackageDescription>
                  <PackageFeatures>
                    {pkg.features.map((feature, featureIndex) => (
                      <PackageFeature key={featureIndex} primaryColor={primaryColor}>
                        {feature}
                      </PackageFeature>
                    ))}
                  </PackageFeatures>
                  <PackageButton primaryColor={primaryColor} onClick={() => scrollToSection('contact')}>
                    Get a Quote
                  </PackageButton>
                </PackageCard>
              ))}
            </PackagesGrid>
          </Container>
        </Section>
      )}

      {/* Testimonials Section */}
      <Section id="testimonials" backgroundColor={vendor.theme?.backgroundColor}>
        <Container>
          <SectionTitle>What Our Couples Say</SectionTitle>
          <SectionSubtitle>
            Real testimonials from couples whose special day we helped create
          </SectionSubtitle>
          <TestimonialsGrid>
            {vendor.testimonials?.map((testimonial, index) => (
              <TestimonialCard key={index} primaryColor={primaryColor}>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorWedding>{testimonial.wedding}</AuthorWedding>
                  </AuthorInfo>
                  <TestimonialRating>
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                  </TestimonialRating>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionSubtitle>
            Find answers to common questions about our services
          </SectionSubtitle>
          <FaqContainer>
            {vendor.faq?.map((item, index) => (
              <FaqItem key={index}>
                <FaqQuestion onClick={() => toggleFaq(index)}>
                  {item.question}
                  {openFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                </FaqQuestion>
                <FaqAnswer open={openFaq === index}>
                  {item.answer}
                </FaqAnswer>
              </FaqItem>
            ))}
          </FaqContainer>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" backgroundColor={theme.colors.gray50}>
        <Container>
          <SectionTitle>Get In Touch</SectionTitle>
          <SectionSubtitle>
            Ready to start planning your dream wedding? Send us a message!
          </SectionSubtitle>
          <ContactGrid>
            <ContactForm onSubmit={handleContactSubmit}>
              <FormGroup>
                <FormLabel>Name *</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                  primaryColor={primaryColor}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email *</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                  primaryColor={primaryColor}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormInput
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  primaryColor={primaryColor}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Message *</FormLabel>
                <FormTextarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your special day..."
                  required
                  primaryColor={primaryColor}
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={submitting} primaryColor={primaryColor}>
                {submitting ? <FaSpinner className="spinning" /> : <FaEnvelope />}
                {submitting ? 'Sending...' : 'Send Enquiry'}
              </SubmitButton>
            </ContactForm>

            <ContactInfo>
              <ContactItem>
                <ContactIcon primaryColor={primaryColor}>
                  <FaPhoneAlt />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel>Phone</ContactLabel>
                  <ContactValue>{vendor.phone}</ContactValue>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon primaryColor={primaryColor}>
                  <FaEnvelope />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue>{vendor.email}</ContactValue>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon primaryColor={primaryColor}>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel>Address</ContactLabel>
                  <ContactValue>{vendor.address}</ContactValue>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon primaryColor={primaryColor}>
                  <FaClock />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel>Business Hours</ContactLabel>
                  <ContactValue>Mon-Fri: 9AM-6PM</ContactValue>
                </ContactDetails>
              </ContactItem>

              <div>
                <ContactLabel>Cities We Cover</ContactLabel>
                <CitiesList>
                  {vendor.citiesCovered?.map((city, index) => (
                    <CityTag key={index} primaryColor={primaryColor}>
                      {city}
                    </CityTag>
                  ))}
                </CitiesList>
              </div>

              {vendor.mapEmbed && (
                <MapContainer>
                  <MapEmbed
                    src={vendor.mapEmbed}
                    allowFullScreen
                    loading="lazy"
                  />
                </MapContainer>
              )}
            </ContactInfo>
          </ContactGrid>
        </Container>
      </Section>

      {/* Footer */}
      <Footer>
        <Container>
          <FooterContent>
            <FooterSection>
              <FooterTitle>{vendor.name}</FooterTitle>
              <FooterText>{vendor.description}</FooterText>
              <SocialLinks>
                {vendor.socialLinks?.instagram && (
                  <SocialLink href={vendor.socialLinks.instagram} primaryColor={primaryColor}>
                    <FaInstagram />
                  </SocialLink>
                )}
                {vendor.socialLinks?.facebook && (
                  <SocialLink href={vendor.socialLinks.facebook} primaryColor={primaryColor}>
                    <FaFacebook />
                  </SocialLink>
                )}
                {vendor.socialLinks?.pinterest && (
                  <SocialLink href={vendor.socialLinks.pinterest} primaryColor={primaryColor}>
                    <FaPinterest />
                  </SocialLink>
                )}
              </SocialLinks>
            </FooterSection>
            
            <FooterSection>
              <FooterTitle>Contact Info</FooterTitle>
              <FooterText>
                {vendor.phone}<br />
                {vendor.email}<br />
                {vendor.address}
              </FooterText>
            </FooterSection>
            
            <FooterSection>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterText>
                <a href="#about" style={{ color: theme.colors.gray300, textDecoration: 'none' }}>About Us</a><br />
                <a href="#services" style={{ color: theme.colors.gray300, textDecoration: 'none' }}>Services</a><br />
                <a href="#gallery" style={{ color: theme.colors.gray300, textDecoration: 'none' }}>Gallery</a><br />
                <a href="#contact" style={{ color: theme.colors.gray300, textDecoration: 'none' }}>Contact</a>
              </FooterText>
            </FooterSection>
          </FooterContent>
          
          <FooterBottom>
            <p>&copy; 2024 {vendor.name}. All rights reserved. | Terms & Conditions | Privacy Policy</p>
          </FooterBottom>
        </Container>
      </Footer>

      {/* Back to Top Button */}
      <BackToTopButton
        visible={showBackToTop}
        primaryColor={primaryColor}
        onClick={scrollToTop}
      >
        ↑
      </BackToTopButton>
    </PageContainer>
  );
};

export default VendorPage;
