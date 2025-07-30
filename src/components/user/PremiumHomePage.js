import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  FaRocket,
  FaShieldAlt,
  FaCrown,
  FaBolt,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaCheck,
  FaGlobe,
  FaMobile,
  FaChartLine,
  FaHeart,
  FaAward,
  FaHotel,
  FaShoppingCart,
  FaRing,
  FaCar,
  FaBriefcase,
  FaQuoteLeft,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import platformData from '../../DummyData/platform.json';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;



const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  background: #000;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #000000 100%);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  text-align: center;
  position: relative;
  z-index: 2;

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg};
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #a8edea 50%, #fed6e3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.1;
  animation: ${fadeInUp} 1s ease-out;

  ${media.tablet} {
    font-size: 3.5rem;
  }

  ${media.mobile} {
    font-size: 2.5rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${theme.spacing.xxl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  animation: ${fadeInUp} 1s ease-out 0.2s both;

  ${media.mobile} {
    font-size: 1.125rem;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};
  animation: ${fadeInUp} 1s ease-out 0.4s both;

  ${media.mobile} {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.6);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xl};
  opacity: 0.7;
  animation: ${fadeInUp} 1s ease-out 0.6s both;

  ${media.mobile} {
    flex-wrap: wrap;
    gap: ${theme.spacing.lg};
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;

  svg {
    color: #10b981;
    font-size: 1rem;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const FloatingIcon = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: ${props => props.size || '2rem'};
  animation: ${float} ${props => props.duration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};

  ${props => props.position && css`
    top: ${props.position.top};
    left: ${props.position.left};
  `}
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: ${theme.spacing.xxl} 0;
  margin: ${theme.spacing.xxl} 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.3), transparent);
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    padding: 0 ${theme.spacing.lg};
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  background: white;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out both;
  animation-delay: ${props => props.delay || '0s'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const StatNumber = styled.h3`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};

  ${media.mobile} {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.p`
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
`;

const FeaturesSection = styled.section`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: ${theme.spacing.xxl} 0;
  margin: ${theme.spacing.xxl} 0;
  position: relative;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  color: #1e293b;
  margin-bottom: ${theme.spacing.xl};
  animation: ${fadeInUp} 0.8s ease-out;

  ${media.mobile} {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  background: white;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out both;
  animation-delay: ${props => props.delay || '0s'};
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.8), transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.3);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.xl};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  font-size: 2rem;
  color: white;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: ${theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    animation: ${rotate} 120s linear infinite;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  position: relative;
  z-index: 2;

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg};
  }
`;

const CTATitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: ${theme.spacing.lg};
  animation: ${fadeInUp} 0.8s ease-out;

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${theme.spacing.xxl};
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const CTAButton = styled(PrimaryButton)`
  background: white;
  color: #667eea;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

// Explore Stores Section
const ExploreSection = styled.section`
  background: white;
  padding: ${theme.spacing.xxl} 0;
  margin: ${theme.spacing.xxl} 0;
  position: relative;
`;

const ExploreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg};
  }
`;

const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
`;

const CategoryCard = styled.div`
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out both;
  animation-delay: ${props => props.delay || '0s'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const CategoryIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
`;

const CategoryDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  background: white;
  padding: ${theme.spacing.xxl} 0;
  margin: ${theme.spacing.xxl} 0;
  position: relative;
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg};
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
`;

const TestimonialCard = styled.div`
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out both;
  animation-delay: ${props => props.delay || '0s'};
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const TestimonialQuote = styled.div`
  position: absolute;
  top: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  color: rgba(102, 126, 234, 0.3);
  font-size: 2rem;
`;

const TestimonialText = styled.p`
  color: #374151;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const AuthorName = styled.h4`
  color: #1e293b;
  font-weight: 600;
  font-size: 1.125rem;
`;

const AuthorRole = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
  color: #fbbf24;
`;

// Footer Section
const FooterSection = styled.footer`
  background: #1e293b;
  padding: ${theme.spacing.xxl} 0 ${theme.spacing.xl} 0;
  margin-top: ${theme.spacing.xxl};
  border-top: 1px solid rgba(148, 163, 184, 0.2);
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg};
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const FooterBrand = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
`;

const BrandName = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
`;

const BrandDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const FooterColumn = styled.div`
  animation: ${fadeInUp} 0.8s ease-out both;
  animation-delay: ${props => props.delay || '0s'};
`;

const FooterTitle = styled.h4`
  color: white;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  font-size: 1.125rem;
`;

const FooterLink = styled.a`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin-bottom: ${theme.spacing.sm};
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #667eea;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: rgba(255, 255, 255, 0.7);
`;

const ContactIcon = styled.div`
  color: #667eea;
  font-size: 1rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${theme.spacing.lg};
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
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
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const PremiumHomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/start-building');
    } else {
      navigate('/register');
    }
  };

  const handleWatchDemo = () => {
    // For now, just show auth modal or navigate to pricing
    navigate('/pricing');
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  // Icon mapping for categories
  const categoryIcons = {
    hotels: FaHotel,
    ecommerce: FaShoppingCart,
    weddings: FaRing,
    automobiles: FaCar,
    'business-websites': FaBriefcase,
  };

  // Icon mapping for contact
  const contactIcons = {
    phone: FaPhoneAlt,
    email: FaEnvelope,
    location: FaMapMarkerAlt,
  };

  return (
    <PageContainer>
      <HeroSection>
        <FloatingElements>
          <FloatingIcon position={{ top: '10%', left: '10%' }} delay="0s" duration="8s">
            <FaRocket />
          </FloatingIcon>
          <FloatingIcon position={{ top: '20%', right: '15%' }} delay="2s" duration="6s">
            <FaStar />
          </FloatingIcon>
          <FloatingIcon position={{ bottom: '30%', left: '5%' }} delay="4s" duration="10s">
            <FaCrown />
          </FloatingIcon>
          <FloatingIcon position={{ bottom: '20%', right: '10%' }} delay="1s" duration="7s" size="1.5rem">
            <FaHeart />
          </FloatingIcon>
          <FloatingIcon position={{ top: '50%', left: '3%' }} delay="3s" duration="9s" size="1.2rem">
            <FaAward />
          </FloatingIcon>
        </FloatingElements>

        <HeroContent>
          <HeroTitle>
            {platformData.hero.title}
          </HeroTitle>
          <HeroSubtitle>
            {platformData.hero.subtitle}
          </HeroSubtitle>
          <CTAContainer>
            <PrimaryButton onClick={handleGetStarted}>
              {platformData.hero.ctaButtons.primary}
              <FaRocket />
            </PrimaryButton>
            <SecondaryButton onClick={handleWatchDemo}>
              <FaPlay />
              {platformData.hero.ctaButtons.secondary}
            </SecondaryButton>
          </CTAContainer>
          <TrustBadges>
            {platformData.hero.trustIndicators.map((indicator, index) => (
              <TrustBadge key={index}>
                <FaCheck />
                {indicator.text}
              </TrustBadge>
            ))}
          </TrustBadges>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsContainer>
          {platformData.stats.map((stat, index) => (
            <StatCard key={index} delay={`${index * 0.1}s`}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </StatsSection>

      <ExploreSection>
        <ExploreContainer>
          <SectionTitle>{platformData.exploreStores.title}</SectionTitle>
          <SectionSubtitle>{platformData.exploreStores.subtitle}</SectionSubtitle>
          <ExploreGrid>
            {platformData.exploreStores.categories.map((category, index) => {
              const IconComponent = categoryIcons[category.id] || FaBriefcase;
              return (
                <CategoryCard
                  key={category.id}
                  gradient={category.gradient}
                  delay={`${index * 0.1}s`}
                  onClick={() => handleCategoryClick(category.path)}
                >
                  <CategoryIcon>
                    <IconComponent />
                  </CategoryIcon>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </CategoryCard>
              );
            })}
          </ExploreGrid>
        </ExploreContainer>
      </ExploreSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>{platformData.whyChooseUs.title}</SectionTitle>
          <SectionSubtitle>{platformData.whyChooseUs.subtitle}</SectionSubtitle>
          <FeaturesGrid>
            {platformData.whyChooseUs.benefits.map((benefit, index) => {
              const icons = [FaBolt, FaShieldAlt, FaGlobe, FaCrown];
              const IconComponent = icons[index] || FaBolt;
              return (
                <FeatureCard key={index} delay={`${index * 0.1}s`}>
                  <FeatureIcon>
                    <IconComponent />
                  </FeatureIcon>
                  <FeatureTitle>{benefit.title}</FeatureTitle>
                  <FeatureDescription>{benefit.description}</FeatureDescription>
                </FeatureCard>
              );
            })}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle>{platformData.testimonials.title}</SectionTitle>
          <SectionSubtitle>{platformData.testimonials.subtitle}</SectionSubtitle>
          <TestimonialsGrid>
            {platformData.testimonials.items.map((testimonial, index) => (
              <TestimonialCard key={index} delay={`${index * 0.1}s`}>
                <TestimonialQuote>
                  <FaQuoteLeft />
                </TestimonialQuote>
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorRole>{testimonial.role}</AuthorRole>
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

      <CTASection>
        <CTAContent>
          <CTATitle>{platformData.ctaBanner.title}</CTATitle>
          <CTASubtitle>
            Join thousands of successful entrepreneurs who chose StoreBuilder to power their dreams
          </CTASubtitle>
          <CTAButton onClick={handleGetStarted}>
            {platformData.ctaBanner.buttonText}
            <FaArrowRight />
          </CTAButton>
        </CTAContent>
      </CTASection>

      <FooterSection>
        <FooterContainer>
          <FooterContent>
            <FooterBrand>
              <BrandName>{platformData.footer.brand.name}</BrandName>
              <BrandDescription>{platformData.footer.brand.description}</BrandDescription>
              <SocialLinks>
                <SocialLink href="#"><FaFacebook /></SocialLink>
                <SocialLink href="#"><FaTwitter /></SocialLink>
                <SocialLink href="#"><FaInstagram /></SocialLink>
                <SocialLink href="#"><FaLinkedin /></SocialLink>
              </SocialLinks>
            </FooterBrand>

            <FooterColumn delay="0.1s">
              <FooterTitle>{platformData.footer.sections.industries.title}</FooterTitle>
              {platformData.footer.sections.industries.links.map((link, index) => (
                <FooterLink key={index} onClick={() => navigate(link.href)}>
                  {link.text}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn delay="0.2s">
              <FooterTitle>{platformData.footer.sections.company.title}</FooterTitle>
              {platformData.footer.sections.company.links.map((link, index) => (
                <FooterLink key={index} onClick={() => navigate(link.href)}>
                  {link.text}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn delay="0.3s">
              <FooterTitle>{platformData.footer.sections.support.title}</FooterTitle>
              {platformData.footer.sections.support.contact.map((contact, index) => {
                const IconComponent = contactIcons[contact.icon] || FaEnvelope;
                return (
                  <ContactInfo key={index}>
                    <ContactIcon>
                      <IconComponent />
                    </ContactIcon>
                    {contact.text}
                  </ContactInfo>
                );
              })}
              {platformData.footer.sections.support.links.map((link, index) => (
                <FooterLink key={index} onClick={() => navigate(link.href)}>
                  {link.text}
                </FooterLink>
              ))}
            </FooterColumn>
          </FooterContent>

          <FooterBottom>
            {platformData.footer.bottomText}
          </FooterBottom>
        </FooterContainer>
      </FooterSection>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </PageContainer>
  );
};

export default PremiumHomePage;
