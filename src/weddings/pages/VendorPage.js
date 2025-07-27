import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
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
  FaImages,
  FaCog,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { getWeddingVendorById as getVendorById } from '../../DummyData';
import { useAuth } from '../../context/AuthContext';

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

const slideInDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.03) 100%);
    pointer-events: none;
    z-index: -1;
  }
`;

const BackToTopButton = styled.button.withConfig({
  shouldForwardProp: prop => !['primaryColor', 'visible'].includes(prop),
})`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.primaryColor || theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${theme.shadows.lg};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transform: ${props => (props.visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)')};
  backdrop-filter: blur(10px);
  background: ${props => `linear-gradient(135deg, ${props.primaryColor || theme.colors.primary}, ${props.primaryColor || theme.colors.primary}dd)`};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    animation: ${pulse} 1.5s infinite;

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.05);
  }
`;

// Hero Section
const HeroSection = styled.section.withConfig({
  shouldForwardProp: prop => !['backgroundImage'].includes(prop),
})`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props =>
    props.backgroundImage
      ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props.backgroundImage})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(59, 130, 246, 0.1) 0%,
      rgba(147, 51, 234, 0.1) 50%,
      rgba(236, 72, 153, 0.1) 100%
    );
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 100vh;
    background-attachment: scroll;
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
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  z-index: 1;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  animation: ${fadeInUp} 1s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: ${pulse} 3s ease-in-out infinite;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 1.2s ease-out 0.3s both;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    border-radius: 2px;
    animation: ${fadeIn} 1.5s ease-out 1s both;
  }

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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  animation: ${fadeInUp} 1.2s ease-out 0.6s both;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.95;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled.button.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
  background: linear-gradient(135deg, ${props => props.primaryColor || theme.colors.primary}, ${props => props.primaryColor ? `${props.primaryColor}dd` : `${theme.colors.primary}dd`});
  color: white;
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  animation: ${fadeInUp} 1.2s ease-out 0.9s both, ${float} 6s ease-in-out 2s infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.2));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
    animation: ${float} 6s ease-in-out infinite, ${glow} 2s ease-in-out infinite;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;

const NavBar = styled.nav.withConfig({
  shouldForwardProp: prop => !['scrolled'].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${props =>
    props.scrolled ? 'rgba(255,255,255,0.95)' : 'transparent'};
  backdrop-filter: ${props => (props.scrolled ? 'blur(20px)' : 'none')};
  padding: ${theme.spacing.md} 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  border-bottom: ${props =>
    props.scrolled ? `1px solid ${theme.colors.gray200}` : 'none'};
  animation: ${slideInDown} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.scrolled ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' : 'transparent'};
    z-index: -1;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.sm};
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  }
`;

const NavLogo = styled.div.withConfig({
  shouldForwardProp: prop => !['scrolled'].includes(prop),
})`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => (props.scrolled ? theme.colors.gray900 : 'white')};
`;

const MobileMenuButton = styled.button.withConfig({
  shouldForwardProp: prop => !['scrolled'].includes(prop),
})`
  display: none;
  background: none;
  border: none;
  color: ${props => (props.scrolled ? theme.colors.gray700 : 'white')};
  font-size: 1.5rem;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuOverlay = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1001;
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }
`;

const NavActions = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.white};
    flex-direction: column;
    justify-content: center;
    gap: ${theme.spacing.lg};
    z-index: 1002;
    transform: translateX(${props => (props.isOpen ? '0' : '100%')});
    transition: transform 0.3s ease;
    padding: ${theme.spacing.xl};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const MobileCloseButton = styled.button`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    position: absolute;
    top: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    background: none;
    border: none;
    color: ${theme.colors.gray700};
    font-size: 2rem;
    cursor: pointer;
    z-index: 1003;
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.md};
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.gray100};
      color: ${theme.colors.primary};
    }
  }
`;

const NavButton = styled.button.withConfig({
  shouldForwardProp: prop =>
    !['primary', 'primaryColor', 'scrolled'].includes(prop),
})`
  background: ${props =>
    props.primary ? props.primaryColor || theme.colors.primary : 'transparent'};
  color: ${props =>
    props.primary ? 'white' : props.scrolled ? theme.colors.gray700 : 'white'};
  border: ${props =>
    props.primary
      ? 'none'
      : `2px solid ${props.scrolled ? theme.colors.gray300 : 'white'}`};
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
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: 1.1rem;
    justify-content: center;
    min-width: 200px;
    color: ${props => (props.primary ? 'white' : theme.colors.gray700)};
    border-color: ${props => (props.primary ? 'none' : theme.colors.gray300)};
    background: ${props =>
      props.primary
        ? props.primaryColor || theme.colors.primary
        : theme.colors.white};

    &:hover {
      background: ${props =>
        props.primary
          ? props.primaryColor || theme.colors.primary
          : theme.colors.gray50};
      transform: none;
    }
  }
`;

// Section Components
const Section = styled.section.withConfig({
  shouldForwardProp: prop => !['backgroundColor'].includes(prop),
})`
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  background: ${props => props.backgroundColor || 'white'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const StatNumber = styled.div.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.sm};
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: ${theme.spacing.sm};
  }
`;

const GalleryTab = styled.button.withConfig({
  shouldForwardProp: prop => !['active', 'primaryColor'].includes(prop),
})`
  background: ${props =>
    props.active ? props.primaryColor || theme.colors.primary : 'transparent'};
  color: ${props => (props.active ? 'white' : theme.colors.gray700)};
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing.sm};
  }
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

const PackageCard = styled.div.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const PackagePrice = styled.div.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const PackageFeature = styled.li.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray700};

  &:before {
    content: '✓';
    color: ${props => props.primaryColor || theme.colors.primary};
    font-weight: bold;
  }
`;

const PackageButton = styled.button.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const TestimonialCard = styled.div.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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
  display: ${props => (props.open ? 'block' : 'none')};
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

const FormInput = styled.input.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const FormTextarea = styled.textarea.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const SubmitButton = styled.button.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const ContactIcon = styled.div.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const CityTag = styled.span.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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

const SocialLink = styled.a.withConfig({
  shouldForwardProp: prop => !['primaryColor'].includes(prop),
})`
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
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const VendorPage = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get vendor ID from URL path if not available in params
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const vendorId = vendorSlug || pathSegments[pathSegments.length - 1];

  // Get vendor data from Redux store for real-time updates
  const { vendors, editingVendor } = useSelector(
    state => state.weddingManagement
  );

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('decor');
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let vendorData = null;

    // Priority 1: Use editing vendor data for real-time updates during editing
    if (editingVendor && editingVendor.id === vendorId) {
      vendorData = editingVendor;
      console.log(
        'Using editing vendor data for real-time updates:',
        editingVendor
      );
    }
    // Priority 2: Use saved vendor data from Redux vendors array
    else if (vendors && vendors.length > 0) {
      vendorData = vendors.find(v => v.id === vendorId);
      console.log('Using saved vendor data from Redux:', vendorData);
    }
    // Priority 3: Fallback to dummy data
    if (!vendorData) {
      vendorData = getVendorById(vendorId);
      console.log('Using fallback dummy data:', vendorData);
    }

    if (vendorData) {
      setVendor(vendorData);
      console.log('VendorPage: Updated vendor data', vendorData);
    }
    setLoading(false);

    // Pre-fill form if user is logged in
    if (user) {
      setContactForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [vendorId, user, vendors, editingVendor]);

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

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = event => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleContactSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your enquiry! We will get back to you soon.');
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleFaq = index => {
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
      <NavBar scrolled={scrolled}>
        <NavContent>
          <NavLogo scrolled={scrolled}>{vendor.name}</NavLogo>
          <NavActions isOpen={mobileMenuOpen}>
            <MobileCloseButton onClick={closeMobileMenu}>
              <FaTimes />
            </MobileCloseButton>
            <NavButton
              onClick={() => {
                navigate('/weddings');
                closeMobileMenu();
              }}
              scrolled={scrolled}
            >
              <FaArrowLeft />
              Back
            </NavButton>
            <NavButton
              onClick={() => {
                alert('Vendor saved to your favorites!');
                closeMobileMenu();
              }}
              scrolled={scrolled}
            >
              <FaHeart />
              Save
            </NavButton>
            <NavButton
              onClick={() => {
                navigator.share
                  ? navigator.share({
                      title: vendor.name,
                      url: window.location.href,
                    })
                  : alert('Share: ' + window.location.href);
                closeMobileMenu();
              }}
              scrolled={scrolled}
            >
              <FaShare />
              Share
            </NavButton>
            <NavButton
              onClick={() => {
                navigate(`/${vendorId}/portfolio`);
                closeMobileMenu();
              }}
              scrolled={scrolled}
            >
              <FaImages />
              Portfolio
            </NavButton>
            <NavButton
              onClick={() => {
                navigate(`/${vendorId}/weddingadminpanel`);
                closeMobileMenu();
              }}
              scrolled={scrolled}
            >
              <FaCog />
              Dashboard
            </NavButton>
            <NavButton
              primary
              primaryColor={primaryColor}
              onClick={() => {
                scrollToSection('contact');
                closeMobileMenu();
              }}
            >
              <FaCalendarAlt />
              Enquire Now
            </NavButton>
          </NavActions>
          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            scrolled={scrolled}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContent>
      </NavBar>

      {/* Dynamic Sections Based on Order */}
      {(() => {
        const defaultOrder = [
          'hero',
          'about-us',
          'services-offered',
          'recent-work',
          'gallery',
          'packages-pricing',
          'testimonials',
        ];

        const sectionOrder = vendor.sectionOrder || defaultOrder;

        // Combine default sections with custom sections
        const allSections = [...sectionOrder];

        // Add custom sections to the end if not already included
        if (vendor.customSections) {
          vendor.customSections.forEach(customSection => {
            const customId = `custom-${customSection.id}`;
            if (!allSections.includes(customId)) {
              allSections.push(customId);
            }
          });
        }

        return allSections.map(sectionId => {
          // Check if this is a custom section
          if (sectionId.startsWith('custom-')) {
            const customId = sectionId.replace('custom-', '');
            const customSection = vendor.customSections?.find(
              cs => cs.id === customId
            );

            if (!customSection) return null;

            // Check custom section visibility
            if (
              vendor.customSectionVisibility &&
              vendor.customSectionVisibility[customId] === false
            ) {
              return null;
            }

            // Also check the visible field directly on the custom section
            if (customSection.visible === false) {
              return null;
            }

            return (
              <Section
                key={`custom-${customSection.id}`}
                id={`custom-${customSection.id}`}
              >
                <Container>
                  <SectionTitle>{customSection.title}</SectionTitle>
                  {customSection.subtitle && (
                    <SectionSubtitle>{customSection.subtitle}</SectionSubtitle>
                  )}

                  {/* Render custom section content based on type */}
                  {customSection.type === 'text' && customSection.content && (
                    <div
                      style={{
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        color: theme.colors.gray700,
                        textAlign: 'center',
                        maxWidth: '800px',
                        margin: '0 auto',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {customSection.content}
                    </div>
                  )}

                  {customSection.type === 'gallery' &&
                    customSection.images &&
                    customSection.images.length > 0 && (
                      <GalleryGrid>
                        {customSection.images.map((image, idx) => (
                          <GalleryItem
                            key={idx}
                            src={image}
                            alt={`${customSection.title} ${idx + 1}`}
                          />
                        ))}
                      </GalleryGrid>
                    )}

                  {customSection.type === 'cards' &&
                    customSection.cards &&
                    customSection.cards.length > 0 && (
                      <ServicesGrid>
                        {customSection.cards.map((card, idx) => (
                          <ServiceCard key={idx}>
                            {card.image && (
                              <ServiceImage src={card.image} alt={card.title} />
                            )}
                            <ServiceContent>
                              {card.icon && (
                                <ServiceIcon>{card.icon}</ServiceIcon>
                              )}
                              <ServiceName>{card.title}</ServiceName>
                              <ServiceDescription>
                                {card.description}
                              </ServiceDescription>
                            </ServiceContent>
                          </ServiceCard>
                        ))}
                      </ServicesGrid>
                    )}
                </Container>
              </Section>
            );
          }

          // Handle default sections
          // Check section visibility for default sections
          if (
            vendor.sectionVisibility &&
            vendor.sectionVisibility[sectionId] === false
          ) {
            return null;
          }

          switch (sectionId) {
            case 'hero':
              return (
                <HeroSection
                  key="hero"
                  id="hero"
                  backgroundImage={vendor.image}
                >
                  {vendor.heroVideo && (
                    <HeroMedia>
                      <HeroVideo
                        src={vendor.heroVideo}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    </HeroMedia>
                  )}
                  <HeroOverlay />
                  <HeroContent>
                    <HeroTitle>{vendor.name}</HeroTitle>
                    <HeroTagline>{vendor.tagline}</HeroTagline>
                    <HeroButton
                      primaryColor={primaryColor}
                      onClick={() => scrollToSection('contact')}
                    >
                      <FaCalendarAlt />
                      Enquire Now
                    </HeroButton>
                  </HeroContent>
                </HeroSection>
              );

            case 'about-us':
              return (
                <Section
                  key="about"
                  id="about"
                  backgroundColor={vendor.theme?.backgroundColor}
                >
                  <Container>
                    <SectionTitle>About Us</SectionTitle>
                    <AboutGrid>
                      <AboutContent>
                        <AboutText>
                          {vendor.aboutUs?.text || vendor.description}
                        </AboutText>
                        <AboutStats>
                          {vendor.aboutUs?.experienceVisible !== false &&
                            vendor.aboutUs?.experience && (
                              <StatCard>
                                <StatNumber primaryColor={primaryColor}>
                                  {vendor.aboutUs.experience}
                                </StatNumber>
                                <StatLabel>Experience</StatLabel>
                              </StatCard>
                            )}
                          {vendor.aboutUs?.weddingsVisible !== false &&
                            vendor.aboutUs?.completedWeddings && (
                              <StatCard>
                                <StatNumber primaryColor={primaryColor}>
                                  {vendor.aboutUs.completedWeddings}
                                </StatNumber>
                                <StatLabel>Weddings</StatLabel>
                              </StatCard>
                            )}
                          {vendor.aboutUs?.couplesVisible !== false &&
                            vendor.aboutUs?.satisfiedCouples && (
                              <StatCard>
                                <StatNumber primaryColor={primaryColor}>
                                  {vendor.aboutUs.satisfiedCouples}
                                </StatNumber>
                                <StatLabel>Happy Couples</StatLabel>
                              </StatCard>
                            )}
                        </AboutStats>
                      </AboutContent>
                      {(vendor.aboutUs?.aboutImage ||
                        vendor.aboutUs?.videoEmbed) && (
                        <VideoContainer>
                          {vendor.aboutUs?.aboutImage ? (
                            <img
                              src={vendor.aboutUs.aboutImage}
                              alt="About us"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px',
                              }}
                            />
                          ) : vendor.aboutUs?.videoEmbed ? (
                            <VideoEmbed
                              src={vendor.aboutUs.videoEmbed}
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          ) : null}
                        </VideoContainer>
                      )}
                    </AboutGrid>
                  </Container>
                </Section>
              );

            case 'services-offered':
              return (
                <Section key="services" id="services">
                  <Container>
                    <SectionTitle>Services Offered</SectionTitle>
                    <SectionSubtitle>
                      We provide comprehensive wedding services to make your
                      special day perfect
                    </SectionSubtitle>
                    <ServicesGrid>
                      {vendor.services?.map((service, index) => (
                        <ServiceCard key={index}>
                          <ServiceImage
                            src={service.image}
                            alt={service.name}
                          />
                          <ServiceContent>
                            <ServiceIcon>{service.icon}</ServiceIcon>
                            <ServiceName>{service.name}</ServiceName>
                            <ServiceDescription>
                              {service.description}
                            </ServiceDescription>
                          </ServiceContent>
                        </ServiceCard>
                      ))}
                    </ServicesGrid>
                  </Container>
                </Section>
              );

            case 'recent-work':
              return vendor.locationPortfolio &&
                vendor.locationPortfolio.length > 0 ? (
                <Section key="portfolio" id="portfolio">
                  <Container>
                    <SectionTitle>Our Recent Work</SectionTitle>
                    <SectionSubtitle>
                      Explore some of our beautiful weddings across different
                      venues and locations
                    </SectionSubtitle>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: theme.spacing.xl,
                        marginBottom: theme.spacing.xl,
                      }}
                    >
                      {vendor.locationPortfolio.slice(0, 3).map(portfolio => (
                        <div
                          key={portfolio.id}
                          style={{
                            background: theme.colors.white,
                            borderRadius: theme.borderRadius.lg,
                            overflow: 'hidden',
                            boxShadow: theme.shadows.md,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                          }}
                          onClick={() => navigate(`/${vendorId}/portfolio`)}
                        >
                          <img
                            src={portfolio.coverImage}
                            alt={portfolio.location}
                            style={{
                              width: '100%',
                              height: '200px',
                              objectFit: 'cover',
                            }}
                          />
                          <div style={{ padding: theme.spacing.lg }}>
                            <h4
                              style={{
                                margin: `0 0 ${theme.spacing.sm} 0`,
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                color: theme.colors.gray900,
                              }}
                            >
                              {portfolio.location}
                            </h4>
                            <p
                              style={{
                                margin: `0 0 ${theme.spacing.sm} 0`,
                                color: theme.colors.gray600,
                                fontSize: '0.9rem',
                              }}
                            >
                              {portfolio.city}, {portfolio.state} •{' '}
                              {portfolio.weddingDate}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                color: theme.colors.gray700,
                                fontSize: '0.9rem',
                                lineHeight: 1.5,
                              }}
                            >
                              {portfolio.description.substring(0, 120)}...
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => navigate(`/${vendorId}/portfolio`)}
                        style={{
                          background: primaryColor,
                          color: 'white',
                          border: 'none',
                          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                          borderRadius: theme.borderRadius.md,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing.sm,
                          margin: '0 auto',
                        }}
                        onMouseOver={e =>
                          (e.target.style.transform = 'translateY(-2px)')
                        }
                        onMouseOut={e =>
                          (e.target.style.transform = 'translateY(0)')
                        }
                      >
                        <FaImages />
                        View Complete Portfolio
                      </button>
                    </div>
                  </Container>
                </Section>
              ) : null;

            case 'gallery':
              return (
                <Section
                  key="gallery"
                  id="gallery"
                  backgroundColor={theme.colors.gray50}
                >
                  <Container>
                    <SectionTitle>Gallery</SectionTitle>
                    <SectionSubtitle>
                      Browse through our portfolio of beautiful weddings and
                      events
                    </SectionSubtitle>
                    <GalleryTabs>
                      {Object.keys(vendor.gallery || {}).map(category => {
                        const categoryData = vendor.gallery[category];
                        const categoryTitle =
                          categoryData?.title ||
                          category.charAt(0).toUpperCase() + category.slice(1);

                        return (
                          <GalleryTab
                            key={category}
                            active={activeGalleryTab === category}
                            primaryColor={primaryColor}
                            onClick={() => setActiveGalleryTab(category)}
                          >
                            <FaImages />
                            {categoryTitle}
                          </GalleryTab>
                        );
                      })}
                    </GalleryTabs>
                    <GalleryGrid>
                      {(() => {
                        const activeCategory =
                          vendor.gallery?.[activeGalleryTab];
                        const images = Array.isArray(activeCategory)
                          ? activeCategory
                          : activeCategory?.images || [];

                        return images.map((image, index) => (
                          <GalleryItem
                            key={index}
                            src={image}
                            alt={`${vendor.name} ${activeGalleryTab} ${index + 1}`}
                          />
                        ));
                      })()}
                    </GalleryGrid>
                  </Container>
                </Section>
              );

            case 'packages-pricing':
              return vendor.packages ? (
                <Section key="packages" id="packages">
                  <Container>
                    <SectionTitle>Packages & Pricing</SectionTitle>
                    <SectionSubtitle>
                      Choose the perfect package for your wedding celebration
                    </SectionSubtitle>
                    <PackagesGrid>
                      {vendor.packages.map((pkg, index) => (
                        <PackageCard key={index} primaryColor={primaryColor}>
                          <PackageName>{pkg.name}</PackageName>
                          <PackagePrice primaryColor={primaryColor}>
                            {pkg.price}
                          </PackagePrice>
                          <PackageDescription>
                            {pkg.description}
                          </PackageDescription>
                          <PackageFeatures>
                            {pkg.features.map((feature, featureIndex) => (
                              <PackageFeature
                                key={featureIndex}
                                primaryColor={primaryColor}
                              >
                                {feature}
                              </PackageFeature>
                            ))}
                          </PackageFeatures>
                          <PackageButton
                            primaryColor={primaryColor}
                            onClick={() => scrollToSection('contact')}
                          >
                            Get a Quote
                          </PackageButton>
                        </PackageCard>
                      ))}
                    </PackagesGrid>
                  </Container>
                </Section>
              ) : null;

            case 'testimonials':
              return (
                <Section
                  key="testimonials"
                  id="testimonials"
                  backgroundColor={vendor.theme?.backgroundColor}
                >
                  <Container>
                    <SectionTitle>What Our Couples Say</SectionTitle>
                    <SectionSubtitle>
                      Real testimonials from couples whose special day we helped
                      create
                    </SectionSubtitle>
                    <TestimonialsGrid>
                      {vendor.testimonials?.map((testimonial, index) => (
                        <TestimonialCard
                          key={index}
                          primaryColor={primaryColor}
                        >
                          <TestimonialText>{testimonial.text}</TestimonialText>
                          <TestimonialAuthor>
                            <AuthorInfo>
                              <AuthorName>{testimonial.name}</AuthorName>
                              <AuthorWedding>
                                {testimonial.wedding}
                              </AuthorWedding>
                            </AuthorInfo>
                            <TestimonialRating>
                              {Array.from(
                                { length: testimonial.rating },
                                (_, i) => (
                                  <FaStar key={i} />
                                )
                              )}
                            </TestimonialRating>
                          </TestimonialAuthor>
                        </TestimonialCard>
                      ))}
                    </TestimonialsGrid>
                  </Container>
                </Section>
              );

            default:
              return null;
          }
        });
      })()}

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
                <FaqAnswer open={openFaq === index}>{item.answer}</FaqAnswer>
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
              <SubmitButton
                type="submit"
                disabled={submitting}
                primaryColor={primaryColor}
              >
                {submitting ? (
                  <FaSpinner className="spinning" />
                ) : (
                  <FaEnvelope />
                )}
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
      {vendor.sectionVisibility?.footer !== false && (
        <Footer
          style={{
            background: vendor.footerBackgroundColor || theme.colors.gray900,
            color: vendor.footerTextColor || 'white',
          }}
        >
          <Container>
            <FooterContent>
              {/* Company Info Section */}
              <FooterSection>
                <FooterTitle
                  style={{ color: vendor.footerTextColor || 'white' }}
                >
                  {vendor.footerCompanyName || vendor.name}
                </FooterTitle>
                <FooterText
                  style={{
                    color: vendor.footerTextColor || theme.colors.gray300,
                  }}
                >
                  {vendor.footerDescription || vendor.description}
                </FooterText>
                {vendor.socialLinks && (
                  <SocialLinks>
                    {vendor.socialLinks?.instagram && (
                      <SocialLink
                        href={vendor.socialLinks.instagram}
                        primaryColor={primaryColor}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram />
                      </SocialLink>
                    )}
                    {vendor.socialLinks?.facebook && (
                      <SocialLink
                        href={vendor.socialLinks.facebook}
                        primaryColor={primaryColor}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook />
                      </SocialLink>
                    )}
                    {vendor.socialLinks?.pinterest && (
                      <SocialLink
                        href={vendor.socialLinks.pinterest}
                        primaryColor={primaryColor}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaPinterest />
                      </SocialLink>
                    )}
                    {vendor.socialLinks?.twitter && (
                      <SocialLink
                        href={vendor.socialLinks.twitter}
                        primaryColor={primaryColor}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-twitter" />
                      </SocialLink>
                    )}
                    {vendor.socialLinks?.linkedin && (
                      <SocialLink
                        href={vendor.socialLinks.linkedin}
                        primaryColor={primaryColor}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-linkedin" />
                      </SocialLink>
                    )}
                  </SocialLinks>
                )}
              </FooterSection>

              {/* Dynamic Footer Columns */}
              {vendor.footerColumns &&
                vendor.footerColumns.length > 0 &&
                vendor.footerColumns.map((column, index) => (
                  <FooterSection key={index}>
                    <FooterTitle
                      style={{ color: vendor.footerTextColor || 'white' }}
                    >
                      {column.title}
                    </FooterTitle>

                    {/* Links Column */}
                    {column.type === 'links' &&
                      Array.isArray(column.content) && (
                        <FooterText
                          style={{
                            color:
                              vendor.footerTextColor || theme.colors.gray300,
                          }}
                        >
                          {column.content.map((link, linkIndex) => (
                            <React.Fragment key={linkIndex}>
                              <a
                                href={link.url}
                                style={{
                                  color:
                                    vendor.footerTextColor ||
                                    theme.colors.gray300,
                                  textDecoration: 'none',
                                }}
                                onMouseOver={e =>
                                  (e.target.style.color = primaryColor)
                                }
                                onMouseOut={e =>
                                  (e.target.style.color =
                                    vendor.footerTextColor ||
                                    theme.colors.gray300)
                                }
                              >
                                {link.text}
                              </a>
                              {linkIndex < column.content.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </FooterText>
                      )}

                    {/* Contact Info Column */}
                    {column.type === 'contact' &&
                      typeof column.content === 'object' &&
                      !Array.isArray(column.content) && (
                        <FooterText
                          style={{
                            color:
                              vendor.footerTextColor || theme.colors.gray300,
                          }}
                        >
                          {column.content.showPhone && vendor.phone && (
                            <>
                              {vendor.phone}
                              <br />
                            </>
                          )}
                          {column.content.showEmail && vendor.email && (
                            <>
                              {vendor.email}
                              <br />
                            </>
                          )}
                          {column.content.showAddress && vendor.address && (
                            <>
                              {vendor.address}
                              <br />
                            </>
                          )}
                          {column.content.showHours && vendor.hours && (
                            <>
                              Business Hours:
                              <br />
                              Mon-Fri:{' '}
                              {vendor.hours.monday || '9:00 AM - 6:00 PM'}
                            </>
                          )}
                        </FooterText>
                      )}

                    {/* Text Column */}
                    {column.type === 'text' &&
                      typeof column.content === 'string' && (
                        <FooterText
                          style={{
                            color:
                              vendor.footerTextColor || theme.colors.gray300,
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {column.content}
                        </FooterText>
                      )}
                  </FooterSection>
                ))}
            </FooterContent>

            <FooterBottom>
              <p
                style={{
                  color: vendor.footerTextColor || theme.colors.gray400,
                }}
              >
                {vendor.footerCopyright ||
                  `© ${new Date().getFullYear()} ${vendor.name}. All rights reserved.`}
              </p>
            </FooterBottom>
          </Container>
        </Footer>
      )}

      {/* Back to Top Button */}
      <BackToTopButton
        visible={showBackToTop}
        primaryColor={primaryColor}
        onClick={scrollToTop}
      >
        ���
      </BackToTopButton>
    </PageContainer>
  );
};

export default VendorPage;
