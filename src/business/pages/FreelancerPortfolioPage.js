import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
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
  FaBars,
  FaTimes,
  FaExternalLinkAlt,
  FaArrowDown,
  FaCheck,
  FaGithub,
  FaCode,
  FaPalette,
  FaMobile,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { fetchBusinessData } from '../../utils/businessAPI';
import {
  initializeBusinessData,
  setBusinessType,
  setLoading,
  setError,
  clearError,
} from '../../store/slices/businessManagementSlice';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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
  0% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 152, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0);
  }
`;

const gradientShift = keyframes`
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

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
  overflow-x: hidden;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  ${css`animation: ${pulse} 1s linear infinite;`}
  margin-bottom: 2rem;
`;

// Enhanced Navbar with glass morphism effect
const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(-100%)'};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    pointer-events: none;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.sm};
    height: 60px;
  }
`;

const Logo = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${props => props.primaryColor || theme.colors.primary};
  position: relative;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(45deg, ${props => props.primaryColor || theme.colors.primary}, transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  display: flex;
  gap: ${theme.spacing.xl};
  
  a {
    text-decoration: none;
    color: ${theme.colors.gray700};
    font-weight: 500;
    padding: ${theme.spacing.sm} 0;
    position: relative;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      color: ${props => props.primaryColor || theme.colors.primary};
      transform: translateY(-2px);
    }

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 50%;
      background: linear-gradient(45deg, ${props => props.primaryColor || theme.colors.primary}, ${props => props.primaryColor + '80' || theme.colors.primary});
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover:after {
      width: 100%;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor' && prop !== 'variant',
})`
  background: ${props => props.variant === 'outline' ? 'transparent' : (props.primaryColor || theme.colors.primary)};
  color: ${props => props.variant === 'outline' ? (props.primaryColor || theme.colors.primary) : 'white'};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 2px solid ${props => props.primaryColor || theme.colors.primary};
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    ${props => props.variant === 'outline' && css`
      background: ${props.primaryColor || theme.colors.primary};
      color: white;
    `}
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
  }
`;

// Enhanced Hero Section with split layout
const HeroSection = styled.section.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.primaryColor + '10' || theme.colors.primary + '10'}, ${theme.colors.white});
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 120px 0 80px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(135deg,
      ${props => props.primaryColor + '15' || theme.colors.primary + '15'},
      transparent
    );
    pointer-events: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
    padding: 100px 0 60px;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
    text-align: center;
  }
`;

const HeroContent = styled.div`
  ${css`animation: ${fadeInLeft} 1s ease-out;`}

  @media (max-width: ${theme.breakpoints.tablet}) {
    order: 2;
  }
`;

const HeroImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${css`animation: ${fadeInRight} 1s ease-out 0.3s both;`}

  @media (max-width: ${theme.breakpoints.tablet}) {
    order: 1;
  }
`;

const HeroImage = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'image' && prop !== 'primaryColor',
})`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: url(${props => props.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'}) center/cover;
  border: 8px solid ${theme.colors.white};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  }

  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    border: 2px solid ${props => props.primaryColor || theme.colors.primary};
    border-radius: 50%;
    opacity: 0.3;
    ${css`animation: ${pulse} 3s ease-in-out infinite;`}
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 250px;
    height: 250px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.1;
  letter-spacing: -0.02em;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.8rem;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(45deg, #ff9800, #ffb74d);
    border-radius: 2px;
    ${css`animation: ${slideInFromBottom} 1.5s ease-out;`}

    @media (max-width: ${theme.breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.7;
  ${css`animation: ${fadeInLeft} 1s ease-out 0.3s both;`}

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
  ${css`animation: ${fadeInLeft} 1s ease-out 0.6s both;`}

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.colors.gray600};
  ${css`animation: ${float} 2s ease-in-out infinite;`}
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

// Section with enhanced animations and intersection observer
const Section = styled.section.withConfig({
  shouldForwardProp: prop => prop !== 'isVisible' && prop !== 'background' && prop !== 'inView',
})`
  padding: ${theme.spacing.xxl} 0;
  background: ${props => props.background || theme.colors.white};
  position: relative;
  overflow: hidden;
  opacity: ${props => props.inView ? 1 : 0};
  transform: translateY(${props => props.inView ? '0' : '30px'});
  transition: all 0.8s ease-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 1s ease;
  }

  &.in-view:before {
    left: 100%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.xl} 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} 0;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(45deg, #ff9800, #ffb74d);
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

// Enhanced About Section
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const AboutContent = styled.div`
  ${css`animation: ${fadeInLeft} 1s ease-out;`}

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const AboutStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  ${css`animation: ${fadeInRight} 1s ease-out;`}
`;

const StatCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.gray100};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, ${props => props.primaryColor || theme.colors.primary}, ${props => props.primaryColor + '80' || theme.colors.primary});
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .number {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${props => props.primaryColor || theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    display: block;
  }

  .label {
    color: ${theme.colors.gray600};
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

// Enhanced Portfolio Section
const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
`;

const PortfolioCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  }

  &:hover .portfolio-image {
    transform: scale(1.1);
  }

  &:hover .portfolio-overlay {
    opacity: 1;
  }
`;

const PortfolioImage = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'image' && prop !== 'primaryColor',
})`
  height: 250px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-color: ${props => props.primaryColor + '20' || theme.colors.primary + '20'};
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease;
`;

const PortfolioOverlay = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, ${props => props.primaryColor + 'cc' || theme.colors.primary + 'cc'}, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  svg {
    font-size: 2rem;
    color: white;
  }
`;

const PortfolioContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const PortfolioCategory = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.primaryColor || theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.sm};
`;

const PortfolioTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const PortfolioDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.sm};
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const TechTag = styled.span`
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray700};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray200};
    transform: translateY(-1px);
  }
`;

// Timeline Experience Section
const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom,
      ${theme.colors.gray300},
      ${theme.colors.primary},
      ${theme.colors.gray300}
    );

    @media (max-width: ${theme.breakpoints.tablet}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isLeft' && prop !== 'primaryColor',
})`
  display: flex;
  justify-content: ${props => props.isLeft ? 'flex-end' : 'flex-start'};
  padding: ${theme.spacing.lg} 0;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: flex-start;
    padding-left: 80px;
  }
`;

const TimelineContent = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isLeft' && prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.gray100};
  width: 45%;
  position: relative;
  transition: all 0.3s ease;
  margin-${props => props.isLeft ? 'right' : 'left'}: ${theme.spacing.lg};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &:before {
    content: '';
    position: absolute;
    top: 30px;
    ${props => props.isLeft ? 'right: -10px' : 'left: -10px'};
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-${props => props.isLeft ? 'left' : 'right'}-color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: calc(100% - 80px);
    margin-left: 0;
    margin-right: 0;

    &:before {
      left: -10px;
      right: auto;
      border-right-color: ${theme.colors.white};
      border-left-color: transparent;
    }
  }
`;

const TimelineDot = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${props => props.primaryColor || theme.colors.primary};
  border: 4px solid ${theme.colors.white};
  border-radius: 50%;
  box-shadow: 0 0 0 4px ${props => props.primaryColor + '20' || theme.colors.primary + '20'};
  z-index: 2;

  @media (max-width: ${theme.breakpoints.tablet}) {
    left: 30px;
  }
`;

const ExperienceRole = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const ExperienceCompany = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'primaryColor',
})`
  font-size: 1.1rem;
  color: ${props => props.primaryColor || theme.colors.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const ExperiencePeriod = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  font-weight: 500;
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 20px;
  display: inline-block;
  margin-bottom: ${theme.spacing.md};
`;

const ExperienceDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.7;
  font-size: 1rem;
`;

// Enhanced Skills Section
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const SkillCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.gray100};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};

  .skill-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: linear-gradient(135deg, #ff9800, #ffb74d);
    color: white;
  }

  .skill-info {
    flex: 1;

    h4 {
      font-weight: 600;
      margin-bottom: 4px;
      color: ${theme.colors.gray900};
    }

    .skill-percentage {
      font-size: 0.9rem;
      color: #ff9800;
      font-weight: 600;
    }
  }
`;

const SkillProgress = styled.div`
  height: 10px;
  background: ${theme.colors.gray200};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const SkillProgressBar = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'level' && prop !== 'primaryColor',
})`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.primaryColor || '#ff9800'}, ${props => props.primaryColor + 'cc' || '#ffb74d'});
  border-radius: 5px;
  width: ${props => props.level}%;
  transition: width 2s ease-in-out;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    ${css`animation: ${gradientShift} 2s ease-in-out infinite;`}
  }
`;

const FreelancerPortfolioPage = () => {
  const { businessSlug, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState(new Set());
  const [visibleSections, setVisibleSections] = useState(new Set());

  const skillsRef = useRef(null);
  const sectionsRef = useRef([]);

  // Support both businessSlug (legacy routes) and slug (new optimized routes)
  const actualSlug = businessSlug || slug || 'freelancer';

  // Get business data from Redux store
  const {
    businesses,
    editingBusiness,
    businessType,
    businessTypeConfig,
    sectionVisibility,
    loading,
    error,
  } = useSelector(state => state.businessManagement);

  // Get the current business data (prioritize editing business for real-time updates)
  const currentBusiness =
    editingBusiness && editingBusiness.slug === actualSlug
      ? editingBusiness
      : businesses.find(b => b.slug === actualSlug);

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Intersection Observer for skill animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillId = entry.target.dataset.skillId;
            if (skillId) {
              setAnimatedSkills(prev => new Set([...prev, skillId]));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const skillElements = document.querySelectorAll('[data-skill-id]');
    skillElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [currentBusiness]);

  // Intersection Observer for section fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setVisibleSections(prev => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionElements = document.querySelectorAll('[data-section]');
    sectionElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [currentBusiness]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        // For freelancer portfolio, use 'personal' or 'freelancer' slug
        const extractedSlug = 'personal'; // Always load personal/freelancer data

        // Check if we already have business data in Redux
        const existingBusiness = businesses.find(
          b => b.slug === extractedSlug || b.type === 'freelancer'
        );
        if (existingBusiness) {
          console.log(
            'Using existing freelancer business data from Redux:',
            existingBusiness
          );
          dispatch(setLoading(false));
          return;
        }

        // Make API call to get freelancer business data
        console.log(
          `[FreelancerPortfolioPage] Making API call for freelancer: ${extractedSlug}`
        );
        const response = await fetchBusinessData(extractedSlug);

        if (response.success && response.data) {
          const { businessData, businessType, businessTypeConfig } =
            response.data;

          console.log(
            '[FreelancerPortfolioPage] API call successful:',
            response.data
          );

          // Initialize Redux state with business data and type config
          dispatch(
            initializeBusinessData({
              businessData,
              businessTypeConfig,
            })
          );

          dispatch(
            setBusinessType({
              businessType,
              businessTypeConfig,
            })
          );
        } else {
          dispatch(setError('Freelancer portfolio not found'));
        }
      } catch (err) {
        console.error(
          '[FreelancerPortfolioPage] Error fetching freelancer data:',
          err
        );
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [actualSlug, location.pathname, dispatch, businesses]);

  const handleBackToList = () => {
    navigate('/business-websites');
  };

  const handleOwnerClick = () => {
    navigate(`/${actualSlug}/adminpanel`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #ff9800, #ffb74d)',
          color: 'white'
        }}>
          <LoadingSpinner />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Loading Portfolio...</h2>
          <p style={{ opacity: 0.8 }}>Preparing something amazing for you</p>
        </div>
      </PageContainer>
    );
  }

  if (error || !currentBusiness) {
    return (
      <PageContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: theme.colors.gray900 }}>
            Portfolio Not Found
          </h2>
          <p style={{ color: theme.colors.gray600, marginBottom: '2rem' }}>
            {error || "The freelancer portfolio you're looking for doesn't exist."}
          </p>
          <ActionButton onClick={handleBackToList} primaryColor={theme.colors.primary}>
            <FaArrowLeft />
            Back to Business Websites
          </ActionButton>
        </div>
      </PageContainer>
    );
  }

  // Freelancer-specific navigation items
  const getFreelancerNavigationItems = () => {
    return [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Skills', href: '#skills' },
      { name: 'Services', href: '#services' },
      { name: 'Experience', href: '#experience' },
      { name: 'Packages', href: '#packages' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ];
  };

  const navigationItems =
    currentBusiness.navigation?.menuItems || getFreelancerNavigationItems();

  return (
    <PageContainer>
      {/* Enhanced Navbar */}
      <Navbar isVisible={isNavVisible}>
        <NavContainer>
          <ActionButton variant="outline" onClick={handleBackToList} primaryColor={currentBusiness.primaryColor}>
            <FaArrowLeft />
          </ActionButton>
          <Logo primaryColor={currentBusiness.primaryColor}>
            {currentBusiness.navigation?.logo || currentBusiness.name}
          </Logo>
          <NavLinks primaryColor={currentBusiness.primaryColor}>
            {navigationItems.map((item, index) => (
              <a key={index} href={item.href} onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}>
                {item.name}
              </a>
            ))}
          </NavLinks>
          <ActionButton onClick={handleOwnerClick} primaryColor={currentBusiness.primaryColor}>
            <FaEdit />
            Admin Panel
          </ActionButton>
        </NavContainer>
      </Navbar>

      {/* Enhanced Hero Section */}
      {sectionVisibility.hero && (
        <HeroSection
          id="home"
          primaryColor={currentBusiness.primaryColor}
          backgroundImage={currentBusiness.hero?.backgroundImage}
        >
          <HeroContent>
            <HeroTitle>
              {currentBusiness.hero?.title || currentBusiness.name}
            </HeroTitle>
            <HeroSubtitle>
              {currentBusiness.hero?.subtitle ||
                `Welcome to ${currentBusiness.name}`}
            </HeroSubtitle>
            <HeroButtons>
              <ActionButton primaryColor={currentBusiness.primaryColor}>
                {currentBusiness.hero?.ctaText || 'Hire Me'}
              </ActionButton>
              <ActionButton 
                variant="outline" 
                primaryColor="white"
                onClick={() => scrollToSection('#portfolio')}
              >
                View Portfolio
              </ActionButton>
            </HeroButtons>
          </HeroContent>
          <ScrollIndicator onClick={() => scrollToSection('#about')}>
            <span>Scroll Down</span>
            <FaArrowDown />
          </ScrollIndicator>
        </HeroSection>
      )}

      {/* Enhanced About Section */}
      {sectionVisibility['about-us'] && (
        <Section id="about" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>
              {currentBusiness.about?.title || 'About Me'}
            </SectionTitle>
            <AboutGrid>
              <AboutContent>
                <p>
                  {currentBusiness.about?.description ||
                    `Learn more about ${currentBusiness.name}`}
                </p>
                <p>
                  {currentBusiness.about?.extendedDescription ||
                    "I pride myself on delivering exceptional service and creating memorable experiences for all my clients."}
                </p>
              </AboutContent>
              <AboutStats>
                {currentBusiness.about?.stats && currentBusiness.about.stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    primaryColor={currentBusiness.primaryColor}
                  >
                    <span className="number">{stat.number}</span>
                    <span className="label">{stat.label}</span>
                  </StatCard>
                ))}
              </AboutStats>
            </AboutGrid>
          </SectionContainer>
        </Section>
      )}

      {/* Enhanced Portfolio Section */}
      {sectionVisibility.portfolio && currentBusiness.portfolio && (
        <Section id="portfolio">
          <SectionContainer>
            <SectionTitle>My Portfolio</SectionTitle>
            <PortfolioGrid>
              {currentBusiness.portfolio.map((project, index) => (
                <PortfolioCard key={project.id || index}>
                  <PortfolioImage 
                    image={project.image} 
                    primaryColor={currentBusiness.primaryColor}
                    className="portfolio-image"
                  >
                    <PortfolioOverlay 
                      className="portfolio-overlay"
                      primaryColor={currentBusiness.primaryColor}
                    >
                      <FaExternalLinkAlt />
                    </PortfolioOverlay>
                  </PortfolioImage>
                  <PortfolioContent>
                    <PortfolioCategory primaryColor={currentBusiness.primaryColor}>
                      {project.category}
                    </PortfolioCategory>
                    <PortfolioTitle>{project.title}</PortfolioTitle>
                    <PortfolioDescription>
                      {project.description}
                    </PortfolioDescription>
                    {project.technologies && (
                      <TechTags>
                        {project.technologies.map((tech, i) => (
                          <TechTag key={i}>{tech}</TechTag>
                        ))}
                      </TechTags>
                    )}
                  </PortfolioContent>
                </PortfolioCard>
              ))}
            </PortfolioGrid>
          </SectionContainer>
        </Section>
      )}

      {/* Enhanced Skills Section */}
      {sectionVisibility.skills && currentBusiness.skills && (
        <Section id="skills" background={theme.colors.gray50} ref={skillsRef}>
          <SectionContainer>
            <SectionTitle>My Skills</SectionTitle>
            <SkillsGrid>
              {currentBusiness.skills.map((skill, index) => (
                <SkillCard 
                  key={skill.id || index}
                  data-skill-id={skill.id || index}
                >
                  <SkillHeader>
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="skill-percentage">{skill.level}%</div>
                    </div>
                  </SkillHeader>
                  <SkillProgress>
                    <SkillProgressBar
                      level={animatedSkills.has(skill.id || index.toString()) ? skill.level : 0}
                      primaryColor={currentBusiness.primaryColor}
                    />
                  </SkillProgress>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SectionContainer>
        </Section>
      )}

      {/* Enhanced Services Section */}
      {sectionVisibility['services-offered'] && currentBusiness.services && (
        <Section id="services">
          <SectionContainer>
            <SectionTitle>My Services</SectionTitle>
            <PortfolioGrid>
              {currentBusiness.services.map((service, index) => (
                <PortfolioCard key={service.id || index}>
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${currentBusiness.primaryColor}10, ${theme.colors.white})`
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      margin: '0 auto 1.5rem',
                      background: `linear-gradient(135deg, ${currentBusiness.primaryColor}, ${currentBusiness.primaryColor}cc)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      color: 'white',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}>
                      {service.icon || '⚡'}
                    </div>
                    <PortfolioTitle>{service.name}</PortfolioTitle>
                    <PortfolioDescription style={{ marginBottom: '1.5rem' }}>
                      {service.description}
                    </PortfolioDescription>
                    {service.price && (
                      <div style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: currentBusiness.primaryColor,
                        marginBottom: '1rem'
                      }}>
                        {service.price}
                      </div>
                    )}
                    <ActionButton primaryColor={currentBusiness.primaryColor}>
                      Get Started
                    </ActionButton>
                  </div>
                </PortfolioCard>
              ))}
            </PortfolioGrid>
          </SectionContainer>
        </Section>
      )}

      {/* Rest of the sections remain the same but with enhanced styling... */}
      {/* Experience Section */}
      {sectionVisibility.experience && currentBusiness.experience && (
        <Section id="experience" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>My Experience</SectionTitle>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {currentBusiness.experience.map((job, index) => (
                <div
                  key={job.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '2rem',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    marginBottom: '2rem',
                    border: `1px solid ${theme.colors.gray100}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(45deg, ${currentBusiness.primaryColor}, ${currentBusiness.primaryColor}80)`
                  }} />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: '600',
                        color: theme.colors.gray900,
                        marginBottom: '0.5rem'
                      }}>
                        {job.role}
                      </h3>
                      <div style={{
                        fontSize: '1.1rem',
                        color: currentBusiness.primaryColor,
                        fontWeight: '600'
                      }}>
                        {job.company}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: theme.colors.gray600,
                      fontWeight: '500',
                      textAlign: 'right',
                      background: theme.colors.gray50,
                      padding: '0.5rem 1rem',
                      borderRadius: '20px'
                    }}>
                      {job.period}
                    </div>
                  </div>
                  <p style={{ 
                    color: theme.colors.gray600, 
                    lineHeight: '1.7',
                    fontSize: '1rem'
                  }}>
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* Packages Section */}
      {sectionVisibility['packages-pricing'] && currentBusiness.packages && (
        <Section id="packages">
          <SectionContainer>
            <SectionTitle>Service Packages</SectionTitle>
            <PortfolioGrid>
              {currentBusiness.packages.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '2.5rem',
                    borderRadius: '20px',
                    boxShadow: pkg.featured
                      ? '0 25px 50px rgba(0, 0, 0, 0.2)'
                      : '0 10px 30px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    position: 'relative',
                    border: pkg.featured
                      ? `3px solid ${currentBusiness.primaryColor}`
                      : `1px solid ${theme.colors.gray100}`,
                    transform: pkg.featured ? 'scale(1.05)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {pkg.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: `linear-gradient(135deg, ${currentBusiness.primaryColor}, ${currentBusiness.primaryColor}cc)`,
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '25px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                    }}>
                      MOST POPULAR
                    </div>
                  )}
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: theme.colors.gray900
                  }}>
                    {pkg.name}
                  </h3>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: currentBusiness.primaryColor,
                    marginBottom: '0.5rem'
                  }}>
                    {pkg.price}
                  </div>
                  <div style={{
                    color: theme.colors.gray600,
                    marginBottom: '2rem',
                    fontSize: '1rem'
                  }}>
                    {pkg.duration}
                  </div>
                  <p style={{
                    color: theme.colors.gray600,
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                    fontSize: '1rem'
                  }}>
                    {pkg.description}
                  </p>
                  {pkg.features && (
                    <ul style={{ 
                      textAlign: 'left', 
                      marginBottom: '2rem',
                      listStyle: 'none',
                      padding: 0
                    }}>
                      {pkg.features.map((feature, i) => (
                        <li key={i} style={{
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '0.95rem'
                        }}>
                          <FaCheck style={{
                            color: currentBusiness.primaryColor,
                            marginRight: '0.75rem',
                            fontSize: '0.8rem'
                          }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ActionButton
                    primaryColor={currentBusiness.primaryColor}
                    style={{
                      width: '100%',
                      background: pkg.featured
                        ? currentBusiness.primaryColor
                        : 'transparent',
                      color: pkg.featured
                        ? 'white'
                        : currentBusiness.primaryColor,
                    }}
                  >
                    Choose Plan
                  </ActionButton>
                </div>
              ))}
            </PortfolioGrid>
          </SectionContainer>
        </Section>
      )}

      {/* Testimonials Section */}
      {sectionVisibility.testimonials && currentBusiness.testimonials && (
        <Section id="testimonials" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>Client Testimonials</SectionTitle>
            <PortfolioGrid>
              {currentBusiness.testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id || index}
                  style={{
                    background: theme.colors.white,
                    padding: '2.5rem',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    border: `1px solid ${theme.colors.gray100}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <FaQuoteLeft style={{
                    color: currentBusiness.primaryColor,
                    fontSize: '2rem',
                    marginBottom: '1.5rem',
                    opacity: 0.7
                  }} />
                  <p style={{
                    color: theme.colors.gray700,
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                    fontStyle: 'italic',
                    fontSize: '1.1rem'
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{
                        fontWeight: '600',
                        color: theme.colors.gray900,
                        fontSize: '1rem'
                      }}>
                        {testimonial.name}
                      </div>
                      {testimonial.service && (
                        <div style={{
                          fontSize: '0.9rem',
                          color: theme.colors.gray600,
                          marginTop: '0.25rem'
                        }}>
                          {testimonial.service}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <FaStar
                          key={i}
                          style={{ color: '#fbbf24', fontSize: '1.1rem' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </PortfolioGrid>
          </SectionContainer>
        </Section>
      )}

      {/* Enhanced Contact Section */}
      {sectionVisibility.contact && (
        <Section id="contact">
          <SectionContainer>
            <SectionTitle>
              {currentBusiness.contact?.title || "Let's Work Together"}
            </SectionTitle>
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '1.2rem',
                color: theme.colors.gray600,
                marginBottom: '3rem',
                lineHeight: '1.7'
              }}>
                {currentBusiness.contact?.description ||
                  "Have a project in mind? I'd love to hear about it!"}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {currentBusiness.contact?.phone && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    background: theme.colors.white,
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${theme.colors.gray100}`,
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${currentBusiness.primaryColor}, ${currentBusiness.primaryColor}cc)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <FaPhone style={{ color: 'white', fontSize: '1.2rem' }} />
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                      {currentBusiness.contact.phone}
                    </span>
                  </div>
                )}

                {currentBusiness.contact?.email && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    background: theme.colors.white,
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${theme.colors.gray100}`,
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${currentBusiness.primaryColor}, ${currentBusiness.primaryColor}cc)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <FaEnvelope style={{ color: 'white', fontSize: '1.2rem' }} />
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                      {currentBusiness.contact.email}
                    </span>
                  </div>
                )}

                {currentBusiness.contact?.address && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    background: theme.colors.white,
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${theme.colors.gray100}`,
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${currentBusiness.primaryColor}, ${currentBusiness.primaryColor}cc)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <FaMapMarkerAlt style={{ color: 'white', fontSize: '1.2rem' }} />
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                      {currentBusiness.contact.address}
                    </span>
                  </div>
                )}
              </div>

              <ActionButton 
                primaryColor={currentBusiness.primaryColor}
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
              >
                Get In Touch
              </ActionButton>
            </div>
          </SectionContainer>
        </Section>
      )}
    </PageContainer>
  );
};

export default FreelancerPortfolioPage;
