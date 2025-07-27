import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import {
  FaMapMarkerAlt,
  FaStar,
  FaSwimmingPool,
  FaUtensils,
  FaClock,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaConciergeBell,
  FaUmbrellaBeach,
  FaBusinessTime,
  FaTaxi,
  FaWifi,
  FaParking,
  FaDumbbell,
  FaSpa,
  FaPlay,
  FaChevronRight,
  FaQuoteLeft,
  FaArrowRight,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import HotelNavbar from '../components/HotelNavbar';
import HotelFooter from '../components/HotelFooter';

import {
  fetchHotelById,
  fetchHotelSections,
  fetchHotelReviews,
} from '../../utils/hotelAPI';
import { loadHotelData } from '../../store/slices/hotelManagementSlice';
import hotelJsonData from '../../DummyData/hotels.json';

// Animations
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

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  overflow-x: hidden;
`;

const HeroBanner = styled.section.withConfig({
  shouldForwardProp: prop => prop !== 'image',
})`
  position: relative;
  height: 100vh;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.6) 100%
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
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 80vh;
    background-attachment: scroll;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 100vh;
    background-attachment: scroll;
    background-position: center center;

    &::before {
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.6)
      );
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: ${theme.colors.white};
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px ${theme.spacing.xl} 0;
  width: 100%;
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 100px ${theme.spacing.md} 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 120px);
  }
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  animation: ${fadeInLeft} 1s ease-out 0.3s both;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
    border-radius: 2px;
    animation: ${fadeInLeft} 1s ease-out 0.6s both;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.8rem;
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${theme.colors.white};
    background: none;
    -webkit-text-fill-color: unset;
    text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.95;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  max-width: 700px;
  font-weight: 300;
  line-height: 1.4;
  animation: ${fadeInRight} 1s ease-out 0.5s both;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.4rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.lg};
    max-width: 100%;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ease-out 0.7s both;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    align-items: stretch;
    margin-top: ${theme.spacing.xl};
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border: none;
  border-radius: ${theme.borderRadius.xl};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
    animation: ${pulseGlow} 2s infinite;
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: 1;
      right: 15px;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: ${theme.borderRadius.xl};
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const QuickInfoCard = styled.div`
  background: transparent;
  border: none;
  padding: 0;
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  min-width: auto;
  transition: all 0.3s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: auto;
    padding: 0;
    background: transparent;
    border: none;
    backdrop-filter: none;
    box-shadow: none;
    width: auto;
    max-width: none;
    justify-content: center;
    gap: ${theme.spacing.sm};
  }
`;

const MobileQuickInfoContainer = styled.div`
  display: contents;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    justify-content: center;
    gap: ${theme.spacing.md};
    width: 100%;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const QuickInfoIcon = styled.div`
  font-size: 1.8rem;
  color: #fbbf24;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  animation: ${floatAnimation} 3s ease-in-out infinite;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const QuickInfoText = styled.div`
  .label {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 2px;
    font-weight: 400;
  }
  .value {
    font-size: 1.2rem;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .label {
      font-size: 0.7rem;
      opacity: 0.9;
    }
    .value {
      font-size: 0.9rem;
      font-weight: 700;
    }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: ${floatAnimation} 2s ease-in-out infinite;
  cursor: pointer;
  
  .scroll-text {
    color: ${theme.colors.white};
    font-size: 0.9rem;
    margin-bottom: 10px;
    text-align: center;
    opacity: 0.8;
  }
  
  .scroll-arrow {
    width: 30px;
    height: 30px;
    border: 2px solid ${theme.colors.white};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }
  }
`;

const ContentSection = styled.section.withConfig({
  shouldForwardProp: (prop) => prop !== 'alt',
})`
  padding: calc(${theme.spacing.xxl} * 1.5) 0;
  margin: calc(${theme.spacing.xxl} * 1.5) 0;
  background: ${props => props.alt ?
    'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' :
    theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 200%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${theme.colors.primary}40,
      transparent
    );
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: calc(${theme.spacing.xl} * 1.5) 0;
    margin: calc(${theme.spacing.xl} * 1.2) 0;

    &:first-of-type {
      padding-top: calc(${theme.spacing.xxl} * 1.5);
      margin-top: 0;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: calc(${theme.spacing.xxl} * 1.5);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: calc(${theme.spacing.xl} * 1.3);
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, ${theme.colors.gray900} 0%, ${theme.colors.gray700} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${theme.spacing.md};
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.15rem;
    line-height: 1.7;
    max-width: 100%;
    padding: 0 ${theme.spacing.sm};
  }
`;

const AnimatedSection = styled.div.withConfig({
  shouldForwardProp: (prop) => !['inView', 'delay'].includes(prop),
})`
  opacity: ${props => props.inView ? 1 : 0};
  transform: translateY(${props => props.inView ? '0' : '50px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.delay || '0s'};
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 300;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.15rem;
    line-height: 1.8;
    text-align: left;
    padding: 0 ${theme.spacing.sm};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: calc(${theme.spacing.xl} * 1.5);
  margin: calc(${theme.spacing.xxl} * 1.5) 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: calc(${theme.spacing.lg} * 1.3);
    margin: calc(${theme.spacing.xl} * 1.3) 0;
  }
`;

const FeatureCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${theme.colors.primary}05, ${theme.colors.accent}05);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: ${theme.colors.primary};
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxl};
    border-radius: ${theme.borderRadius.xl};
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.accent}15);
    border-radius: 50%;
    z-index: -1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 3.5rem;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.7;
  font-size: 1.1rem;
  font-weight: 300;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.7;
  }
`;

const GallerySection = styled.div`
  margin: calc(${theme.spacing.xxl} * 1.5) 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(${theme.spacing.lg} * 1.5);

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: calc(${theme.spacing.md} * 1.5);
  }
`;

const GalleryItem = styled.div`
  position: relative;
  height: 300px;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const AmenitiesSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xxl};
  padding: ${theme.spacing.xxl};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.xl};
    margin: 0 -${theme.spacing.sm};
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: calc(${theme.spacing.xl} * 1.5);

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: calc(${theme.spacing.xl} * 1.3);
  }
`;

const AmenityCategory = styled.div`
  background: linear-gradient(135deg, ${theme.colors.gray50} 0%, ${theme.colors.white} 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.primary}40;
  }

  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.lg};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    
    .icon {
      font-size: 1.5rem;
      color: ${theme.colors.primary};
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 1.3rem;
      font-weight: 700;
      padding: ${theme.spacing.md} 0;
      border-bottom: 2px solid ${theme.colors.gray100};
      margin-bottom: ${theme.spacing.lg};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    background: ${theme.colors.gray50};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.gray200};
  }
`;

const AmenityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AmenityItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} 0;
  color: ${theme.colors.gray700};
  font-size: 1.05rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary};
    transform: translateX(5px);
  }

  .icon {
    color: ${theme.colors.success};
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} 0;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const ReviewsSection = styled.div`
  margin: calc(${theme.spacing.xxl} * 1.5) 0;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: calc(${theme.spacing.xl} * 1.5);

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: calc(${theme.spacing.lg} * 1.3);
  }
`;

const ReviewCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s ease;
  border-left: 4px solid ${theme.colors.primary};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
  
  .quote-icon {
    position: absolute;
    top: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    font-size: 2rem;
    color: ${theme.colors.primary}30;
  }
`;

const ReviewText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.lg};
  font-style: italic;
`;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: 1.2rem;
  }
  
  .info {
    .name {
      font-weight: 700;
      color: ${theme.colors.gray900};
      margin-bottom: 2px;
    }
    
    .location {
      color: ${theme.colors.gray600};
      font-size: 0.9rem;
    }
  }
  
  .rating {
    margin-left: auto;
    display: flex;
    gap: 2px;
    
    .star {
      color: #fbbf24;
      font-size: 1.1rem;
    }
  }
`;

const ContactSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xxl};
  padding: calc(${theme.spacing.xxl} * 1.5);
  margin: calc(${theme.spacing.xxl} * 1.5) 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="10" cy="90" r="1" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: calc(${theme.spacing.xl} * 1.3);
    border-radius: ${theme.borderRadius.xl};
    margin: calc(${theme.spacing.xl} * 1.3) -${theme.spacing.sm};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.lg};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
  
  .icon {
    font-size: 2rem;
    color: ${theme.colors.white};
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  .info {
    .label {
      font-size: 0.9rem;
      opacity: 0.9;
      margin-bottom: 4px;
    }
    
    .value {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
`;

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Icon Components
const iconComponents = {
  FaConciergeBell,
  FaMapMarkerAlt,
  FaUtensils,
  FaSpa,
  FaSwimmingPool,
  FaWifi,
  FaParking,
  FaDumbbell,
  FaBusinessTime,
  FaUmbrellaBeach,
  FaTaxi,
  FaClock,
  FaPhone,
  FaEnvelope,
};

const HotelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation refs
  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1 });
  const [aboutRef, aboutInView] = useIntersectionObserver({ threshold: 0.2 });
  const [featuresRef, featuresInView] = useIntersectionObserver({ threshold: 0.1 });
  const [galleryRef, galleryInView] = useIntersectionObserver({ threshold: 0.1 });
  const [amenitiesRef, amenitiesInView] = useIntersectionObserver({ threshold: 0.1 });
  const [reviewsRef, reviewsInView] = useIntersectionObserver({ threshold: 0.1 });
  const [contactRef, contactInView] = useIntersectionObserver({ threshold: 0.1 });

  // Get updated hotel data from Redux if available
  const hotels = useSelector(state => state.hotelManagement?.liveHotels || []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // First check if we have updated hotel data in Redux state
        const updatedHotel = hotels.find(h => h.slug === slug);

        if (updatedHotel) {
          // Use updated hotel data from Redux (includes admin changes)
          setHotel(updatedHotel);
        } else {
          // Fetch from API
          const response = await fetchHotelById(slug);
          if (response.success) {
            setHotel(response.data);
          } else {
            // Fallback to static data
            const staticHotel = hotelJsonData.data.hotel;
            if (staticHotel && staticHotel.slug === slug) {
              setHotel(staticHotel);
            } else {
              setError('Hotel not found');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setError('Failed to load hotel data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, hotels]);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('[data-section="about"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookRoom = () => {
    navigate(`/${hotel.slug}/rooms`);
  };

  if (loading) {
    return (
      <PageContainer>
        <HotelNavbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: theme.colors.gray600
        }}>
          Loading...
        </div>
        <HotelFooter />
      </PageContainer>
    );
  }

  if (error || !hotel) {
    return (
      <PageContainer>
        <HotelNavbar />
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          gap: '20px'
        }}>
          <h2>Hotel not found</h2>
          <p>The hotel you're looking for doesn't exist or couldn't be loaded.</p>
        </div>
        <HotelFooter />
      </PageContainer>
    );
  }

  const heroSection = hotel.sections?.hero || {};
  const aboutSection = hotel.sections?.about || {};
  const featuresSection = hotel.sections?.features || {};
  const gallerySection = hotel.sections?.gallery || {};
  const amenitiesSection = hotel.sections?.amenities || {};
  const reviewsSection = hotel.sections?.testimonials || {};
  const contactSection = hotel.sections?.contact || {};

  return (
    <PageContainer>
      <HotelNavbar />

      {/* Hero Section */}
      <HeroBanner 
        ref={heroRef}
        image={heroSection.backgroundImage || hotel.image}
      >
        <HeroContent>
          <HeroTitle>
            {heroSection.title || hotel.name}
          </HeroTitle>
          
          <HeroSubtitle>
            {heroSection.subtitle || `Experience luxury hospitality in the heart of ${hotel.city}`}
          </HeroSubtitle>

          <MobileQuickInfoContainer>
            {heroSection.quickInfo?.map((info, index) => {
              const IconComponent = iconComponents[info.icon] || FaStar;
              return (
                <QuickInfoCard key={index}>
                  <QuickInfoIcon>
                    <IconComponent />
                  </QuickInfoIcon>
                  <QuickInfoText>
                    <div className="label">{info.label}</div>
                    <div className="value">{info.value}</div>
                  </QuickInfoText>
                </QuickInfoCard>
              );
            })}
          </MobileQuickInfoContainer>

          <HeroActions>
            <CTAButton onClick={handleBookRoom}>
              {heroSection.ctaText || 'Book Your room'}
            </CTAButton>
          </HeroActions>
        </HeroContent>

        <ScrollIndicator onClick={scrollToNextSection}>
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-arrow">
            <FaChevronRight style={{ transform: 'rotate(90deg)' }} />
          </div>
        </ScrollIndicator>
      </HeroBanner>

      {/* About Section */}
      <ContentSection data-section="about">
        <Container>
          <AnimatedSection ref={aboutRef} inView={aboutInView}>
            <SectionHeader>
              <SectionTitle>
                {aboutSection.title || `About ${hotel.name}`}
              </SectionTitle>
              <SectionSubtitle>
                {aboutSection.subtitle || 'A legacy of legendary hospitality and royal elegance'}
              </SectionSubtitle>
            </SectionHeader>

            <Description>
              {aboutSection.content || hotel.description}
            </Description>

            {aboutSection.highlights && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.lg, marginTop: theme.spacing.xl }}>
                {aboutSection.highlights.map((highlight, index) => (
                  <AnimatedSection key={index} inView={aboutInView} delay={`${index * 0.1}s`}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: theme.spacing.md,
                      padding: theme.spacing.lg,
                      background: theme.colors.gray50,
                      borderRadius: theme.borderRadius.lg,
                      border: `1px solid ${theme.colors.gray200}`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    >
                      <FaCheckCircle style={{ color: theme.colors.success, fontSize: '1.2rem' }} />
                      <span style={{ fontSize: '1.1rem', color: theme.colors.gray700 }}>{highlight}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </AnimatedSection>
        </Container>
      </ContentSection>

      {/* Features Section */}
      <ContentSection alt>
        <Container>
          <AnimatedSection ref={featuresRef} inView={featuresInView}>
            <SectionHeader>
              <SectionTitle>
                {featuresSection.title || `Why Choose ${hotel.name}?`}
              </SectionTitle>
              <SectionSubtitle>
                {featuresSection.subtitle || 'Experience the legendary hospitality and world-class amenities'}
              </SectionSubtitle>
            </SectionHeader>

            <FeaturesGrid>
              {(featuresSection.items || []).map((feature, index) => {
                const IconComponent = iconComponents[feature.icon] || FaConciergeBell;
                return (
                  <AnimatedSection key={index} inView={featuresInView} delay={`${index * 0.2}s`}>
                    <FeatureCard>
                      <FeatureIcon>
                        <IconComponent />
                      </FeatureIcon>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                    </FeatureCard>
                  </AnimatedSection>
                );
              })}
            </FeaturesGrid>
          </AnimatedSection>
        </Container>
      </ContentSection>

      {/* Gallery Section */}
      {gallerySection.images && gallerySection.images.length > 0 && (
        <ContentSection>
          <Container>
            <AnimatedSection ref={galleryRef} inView={galleryInView}>
              <SectionHeader>
                <SectionTitle>
                  {gallerySection.title || `${hotel.name} Gallery`}
                </SectionTitle>
                <SectionSubtitle>
                  {gallerySection.subtitle || 'Witness the grandeur and elegance'}
                </SectionSubtitle>
              </SectionHeader>

              <GallerySection>
                <GalleryGrid>
                  {gallerySection.images.map((item, index) => (
                    <AnimatedSection key={index} inView={galleryInView} delay={`${index * 0.1}s`}>
                      <GalleryItem>
                        <img src={item.image} alt={item.title} />
                      </GalleryItem>
                    </AnimatedSection>
                  ))}
                </GalleryGrid>
              </GallerySection>
            </AnimatedSection>
          </Container>
        </ContentSection>
      )}

      {/* Amenities Section */}
      <ContentSection alt>
        <Container>
          <AnimatedSection ref={amenitiesRef} inView={amenitiesInView}>
            <SectionHeader>
              <SectionTitle>World-Class Amenities</SectionTitle>
              <SectionSubtitle>
                Indulge in luxury with our comprehensive range of premium amenities
              </SectionSubtitle>
            </SectionHeader>

            <AmenitiesSection>
              <AmenitiesGrid>
                {(amenitiesSection.categories || []).map((category, index) => (
                  <AnimatedSection key={index} inView={amenitiesInView} delay={`${index * 0.15}s`}>
                    <AmenityCategory>
                      <h4>
                        <span className="icon">
                          {category.title.includes('Recreation') && <FaSwimmingPool />}
                          {category.title.includes('Business') && <FaBusinessTime />}
                          {category.title.includes('Connectivity') && <FaWifi />}
                          {category.title.includes('Wellness') && <FaSpa />}
                          {!['Recreation', 'Business', 'Connectivity', 'Wellness'].some(keyword => 
                            category.title.includes(keyword)) && <FaConciergeBell />}
                        </span>
                        {category.title}
                      </h4>
                      <AmenityList>
                        {category.items.map((item, itemIndex) => (
                          <AmenityItem key={itemIndex}>
                            <FaCheckCircle className="icon" />
                            {item}
                          </AmenityItem>
                        ))}
                      </AmenityList>
                    </AmenityCategory>
                  </AnimatedSection>
                ))}
              </AmenitiesGrid>
            </AmenitiesSection>
          </AnimatedSection>
        </Container>
      </ContentSection>

      {/* Reviews Section */}
      {reviewsSection.reviews && reviewsSection.reviews.length > 0 && (
        <ContentSection>
          <Container>
            <AnimatedSection ref={reviewsRef} inView={reviewsInView}>
              <SectionHeader>
                <SectionTitle>Guest Reviews</SectionTitle>
                <SectionSubtitle>
                  Hear what our guests have to say about their experience
                </SectionSubtitle>
              </SectionHeader>

              <ReviewsSection>
                <ReviewsGrid>
                  {reviewsSection.reviews.slice(0, 3).map((review, index) => (
                    <AnimatedSection key={index} inView={reviewsInView} delay={`${index * 0.2}s`}>
                      <ReviewCard>
                        <FaQuoteLeft className="quote-icon" />
                        <ReviewText>"{review.comment}"</ReviewText>
                        <ReviewAuthor>
                          <div className="avatar">
                            {review.guestName.charAt(0)}
                          </div>
                          <div className="info">
                            <div className="name">{review.guestName}</div>
                            <div className="location">{review.location}</div>
                          </div>
                          <div className="rating">
                            {[...Array(review.rating)].map((_, i) => (
                              <FaStar key={i} className="star" />
                            ))}
                          </div>
                        </ReviewAuthor>
                      </ReviewCard>
                    </AnimatedSection>
                  ))}
                </ReviewsGrid>
              </ReviewsSection>
            </AnimatedSection>
          </Container>
        </ContentSection>
      )}

      {/* Contact Section */}
      <ContentSection>
        <Container>
          <AnimatedSection ref={contactRef} inView={contactInView}>
            <ContactSection>
              <SectionHeader style={{ color: theme.colors.white }}>
                <SectionTitle style={{ color: theme.colors.white, WebkitTextFillColor: theme.colors.white }}>
                  Location & Contact
                </SectionTitle>
                <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Get in touch with us for reservations and inquiries
                </SectionSubtitle>
              </SectionHeader>

              <ContactGrid>
                {(contactSection.info || [
                  { label: 'Address', value: hotel.address, icon: 'FaMapMarkerAlt' },
                  { label: 'Phone', value: hotel.phone, icon: 'FaPhone' },
                  { label: 'Email', value: hotel.email, icon: 'FaEnvelope' },
                  { label: 'Check-in / Check-out', value: `${hotel.checkInTime} / ${hotel.checkOutTime}`, icon: 'FaClock' }
                ]).map((contact, index) => {
                  const IconComponent = iconComponents[contact.icon] || FaMapMarkerAlt;
                  return (
                    <AnimatedSection key={index} inView={contactInView} delay={`${index * 0.1}s`}>
                      <ContactItem>
                        <IconComponent className="icon" />
                        <div className="info">
                          <div className="label">{contact.label}</div>
                          <div className="value">{contact.value}</div>
                        </div>
                      </ContactItem>
                    </AnimatedSection>
                  );
                })}
              </ContactGrid>
            </ContactSection>
          </AnimatedSection>
        </Container>
      </ContentSection>

      <HotelFooter />
    </PageContainer>
  );
};

export default HotelDetail;
