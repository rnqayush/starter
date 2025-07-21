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
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { getBusinessTemplate } from "../data/businessTemplates";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
`;

// Navbar Styles
const Navbar = styled.nav`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 40;
  transition: top 0.3s ease;
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    height: auto;
    min-height: 60px;
    padding: ${theme.spacing.sm};
  }
`;

const Logo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${props => props.primaryColor || theme.colors.primary};
  flex: 1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.3rem;
    flex: none;
    width: 100%;
    text-align: center;
    margin-bottom: ${theme.spacing.sm};
  }
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
    white-space: nowrap;

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

const OwnerLink = styled.button`
  background: transparent;
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
  justify-content: flex-end;
  min-height: 44px;

  &:hover {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray400};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: none;
    width: 100%;
    justify-content: center;
    margin-top: ${theme.spacing.sm};
    min-height: 48px;
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
  shouldForwardProp: (prop) => prop !== 'primaryColor' && prop !== 'businessType',
})`
  height: 100vh;
  background: linear-gradient(
    rgba(0, 0, 0, 0.4), 
    rgba(0, 0, 0, 0.6)
  ), url(${props => 
    props.businessType === 'gym' ? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=1200&q=80' :
    props.businessType === 'restaurant' ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=1200&q=80' :
    props.businessType === 'salon' ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&w=1200&q=80' :
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&w=1200&q=80'
  });
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;
  color: ${theme.colors.white};
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.xxl};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  opacity: 0.95;
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

// Gallery Section Styles
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const GalleryCategory = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const GalleryImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.primaryColor + '20'} 0%, ${props => props.primaryColor + '40'} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.primaryColor || theme.colors.primary};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${GalleryCategory}:hover &::after {
    opacity: 1;
  }
`;

const GalleryInfo = styled.div`
  padding: ${theme.spacing.lg};
  text-align: center;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
  }
`;

// Packages Section Styles
const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.xl};
`;

const PackageCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor' && prop !== 'featured',
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.featured ? (props.primaryColor || theme.colors.primary) : theme.colors.gray200};

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${theme.shadows.xl};
  }

  ${props => props.featured && `
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: ${props.primaryColor || theme.colors.primary};
      color: white;
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `}

  .package-name {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.md};
  }

  .package-price {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${props => props.primaryColor || theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  .package-duration {
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.lg};
  }

  .package-description {
    color: ${theme.colors.gray700};
    line-height: 1.6;
    margin-bottom: ${theme.spacing.lg};
  }

  .package-button {
    width: 100%;
    background: ${props => props.primaryColor || theme.colors.primary};
    color: white;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border: none;
    border-radius: ${theme.borderRadius.md};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }
`;

// FAQ Section Styles
const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  border: 1px solid ${theme.colors.gray200};
`;

const FAQQuestion = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  width: 100%;
  padding: ${theme.spacing.lg};
  background: none;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${theme.colors.gray50};
    color: ${props => props.primaryColor || theme.colors.primary};
  }
`;

const FAQAnswer = styled.div`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  line-height: 1.6;
  border-top: 1px solid ${theme.colors.gray200};
`;

// Reviews Section Styles
const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ReviewCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  position: relative;

  .review-header {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.md};

    .avatar {
      width: 50px;
      height: 50px;
      background: ${props => props.primaryColor + '20' || theme.colors.gray200};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: ${props => props.primaryColor || theme.colors.primary};
    }

    .review-info h4 {
      font-weight: 600;
      color: ${theme.colors.gray900};
      margin-bottom: 2px;
    }

    .review-info .date {
      font-size: 0.8rem;
      color: ${theme.colors.gray500};
    }
  }

  .review-rating {
    display: flex;
    gap: 2px;
    margin-bottom: ${theme.spacing.sm};
    color: #fbbf24;
  }

  .review-text {
    color: ${theme.colors.gray700};
    line-height: 1.6;
    font-style: italic;
  }
`;

// Hours Section Styles
const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

// Portfolio Section Styles
const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const PortfolioCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const PortfolioImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  height: 240px;
  background: linear-gradient(135deg, ${props => props.primaryColor + '30'} 0%, ${props => props.primaryColor + '60'} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${props => props.primaryColor || theme.colors.primary};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${PortfolioCard}:hover &::after {
    opacity: 1;
  }
`;

const PortfolioContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  padding: ${theme.spacing.xl};

  .portfolio-category {
    color: ${props => props.primaryColor || theme.colors.primary};
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: ${theme.spacing.sm};
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
    margin-bottom: ${theme.spacing.lg};
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};

    .tech-tag {
      background: ${theme.colors.gray100};
      color: ${theme.colors.gray700};
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      border-radius: ${theme.borderRadius.sm};
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

// Skills Section Styles
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const SkillCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};

  .skill-header {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.md};

    .skill-icon {
      font-size: 1.5rem;
    }

    .skill-info h4 {
      font-weight: 600;
      color: ${theme.colors.gray900};
      margin-bottom: 2px;
    }

    .skill-info .percentage {
      font-size: 0.9rem;
      color: ${props => props.primaryColor || theme.colors.primary};
      font-weight: 600;
    }
  }

  .skill-bar {
    height: 8px;
    background: ${theme.colors.gray200};
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    .skill-progress {
      height: 100%;
      background: linear-gradient(90deg, ${props => props.primaryColor || theme.colors.primary}, ${props => props.primaryColor + 'cc' || theme.colors.primary + 'cc'});
      border-radius: 4px;
      transition: width 2s ease;
    }
  }
`;

// Experience Section Styles
const ExperienceTimeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: ${theme.colors.gray300};

    @media (max-width: ${theme.breakpoints.tablet}) {
      left: 20px;
    }
  }
`;

const ExperienceCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor' && prop !== 'isLeft',
})`
  position: relative;
  width: calc(50% - 20px);
  margin-bottom: ${theme.spacing.xl};
  ${props => props.isLeft ? 'margin-right: auto;' : 'margin-left: auto;'}

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: calc(100% - 50px);
    margin-left: 50px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.isLeft ? 'right: -15px;' : 'left: -15px;'}
    width: 12px;
    height: 12px;
    background: ${props => props.primaryColor || theme.colors.primary};
    border-radius: 50%;
    border: 3px solid ${theme.colors.white};
    box-shadow: ${theme.shadows.sm};

    @media (max-width: ${theme.breakpoints.tablet}) {
      left: -35px;
    }
  }

  .experience-content {
    background: ${theme.colors.white};
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.md};
    border: 1px solid ${theme.colors.gray200};

    .period {
      color: ${props => props.primaryColor || theme.colors.primary};
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: ${theme.spacing.sm};
    }

    h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: ${theme.colors.gray900};
      margin-bottom: ${theme.spacing.xs};
    }

    .company {
      color: ${theme.colors.gray600};
      font-weight: 500;
      margin-bottom: ${theme.spacing.md};
    }

    p {
      color: ${theme.colors.gray700};
      line-height: 1.6;
    }
  }
`;

const HoursCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  text-align: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.primaryColor || theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }

  .hours-list {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};

    .hours-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${theme.spacing.sm};
      background: ${theme.colors.gray50};
      border-radius: ${theme.borderRadius.sm};

      .day {
        font-weight: 500;
        color: ${theme.colors.gray900};
      }

      .time {
        color: ${theme.colors.gray600};
        font-size: 0.9rem;
      }
    }
  }
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

const BusinessWebsitePage = () => {
  const { businessSlug } = useParams();
  const navigate = useNavigate();
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

  const handleOwnerClick = () => {
    navigate(`/business/${businessData.slug}/owner`);
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
          { icon: "✂️", title: "Hair Styling", description: "Professional cuts, colors, and treatments for all hair types", price: "From $45" },
          { icon: "💅", title: "Nail Care", description: "Manicures, pedicures, and nail art by certified technicians", price: "From $25" },
          { icon: "🧴", title: "Spa Treatments", description: "Relaxing facials, massages, and body treatments", price: "From $65" },
          { icon: "💄", title: "Makeup Services", description: "Professional makeup for special occasions and events", price: "From $50" },
          { icon: "🎨", title: "Hair Coloring", description: "Expert color services including highlights and balayage", price: "From $80" },
          { icon: "🌿", title: "Organic Treatments", description: "Natural and organic beauty treatments for sensitive skin", price: "From $55" }
        ],
        team: [
          { name: "Sarah Johnson", role: "Senior Stylist", bio: "15+ years experience in color and cutting", specialties: ["Color Specialist", "Bridal Hair"] },
          { name: "Maria Garcia", role: "Nail Specialist", bio: "Expert in nail art and luxury manicures", specialties: ["Nail Art", "Gel Manicures"] },
          { name: "Emily Chen", role: "Spa Therapist", bio: "Licensed massage therapist and esthetician", specialties: ["Deep Tissue", "Facials"] },
          { name: "Jessica Miller", role: "Makeup Artist", bio: "Professional makeup artist specializing in bridal looks", specialties: ["Bridal Makeup", "Special Events"] }
        ],
        gallery: [
          { category: "Hair Styling", images: 8 },
          { category: "Nail Art", images: 6 },
          { category: "Spa Treatments", images: 5 },
          { category: "Salon Interior", images: 4 }
        ],
        packages: [
          { name: "Bridal Package", description: "Complete bridal beauty package including hair, makeup, and nails", price: "$299", duration: "4 hours" },
          { name: "Spa Day", description: "Full day relaxation with massage, facial, and beauty treatments", price: "$199", duration: "6 hours" },
          { name: "Makeover Package", description: "Complete transformation with cut, color, and styling", price: "$149", duration: "3 hours" }
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
          { icon: "🏋️", title: "Personal Training", description: "One-on-one sessions with certified fitness professionals", price: "From $65/session" },
          { icon: "🏃", title: "Group Classes", description: "High-energy classes including HIIT, yoga, and spin", price: "$20/class" },
          { icon: "💪", title: "Strength Training", description: "Complete weight room with modern equipment", price: "Included" },
          { icon: "🧘", title: "Yoga & Pilates", description: "Mind-body classes for flexibility and core strength", price: "$18/class" },
          { icon: "🏊", title: "Swimming Pool", description: "Olympic-size pool for lap swimming and water aerobics", price: "Included" },
          { icon: "🥊", title: "Boxing Classes", description: "High-intensity boxing and kickboxing training", price: "$25/class" }
        ],
        team: [
          { name: "Mike Thompson", role: "Head Trainer", bio: "Former athlete with 10+ years training experience", specialties: ["Strength Training", "Athletic Performance"] },
          { name: "Lisa Park", role: "Yoga Instructor", bio: "Certified in multiple yoga disciplines", specialties: ["Vinyasa Yoga", "Meditation"] },
          { name: "David Wilson", role: "Nutritionist", bio: "Sports nutrition specialist and wellness coach", specialties: ["Meal Planning", "Weight Management"] },
          { name: "Sarah Adams", role: "Group Fitness", bio: "High-energy instructor specializing in HIIT and cardio", specialties: ["HIIT", "Cardio Classes"] }
        ],
        gallery: [
          { category: "Gym Equipment", images: 12 },
          { category: "Group Classes", images: 8 },
          { category: "Swimming Pool", images: 5 },
          { category: "Facilities", images: 6 }
        ],
        packages: [
          { name: "Premium Membership", description: "Full access to all facilities and unlimited classes", price: "$89/month", duration: "Monthly" },
          { name: "Basic Membership", description: "Gym access with limited class participation", price: "$49/month", duration: "Monthly" },
          { name: "Personal Training Package", description: "8 personal training sessions with meal plan", price: "$399", duration: "1 Month" }
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
          { icon: "🍝", title: "Fine Dining", description: "Authentic Italian dishes made with imported ingredients", price: "$25-45" },
          { icon: "🍷", title: "Wine Selection", description: "Curated collection of Italian and international wines", price: "$8-25/glass" },
          { icon: "🎉", title: "Private Events", description: "Special occasions and corporate events catering", price: "Custom pricing" },
          { icon: "🍕", title: "Wood-Fired Pizza", description: "Traditional Neapolitan pizzas from our wood-fired oven", price: "$18-28" },
          { icon: "🥗", title: "Fresh Salads", description: "Garden-fresh salads with imported Italian ingredients", price: "$12-18" },
          { icon: "🍰", title: "Desserts", description: "Homemade Italian desserts and pastries", price: "$8-12" }
        ],
        team: [
          { name: "Chef Antonio", role: "Executive Chef", bio: "Third-generation chef from Tuscany", specialties: ["Pasta Making", "Traditional Recipes"] },
          { name: "Isabella Rosa", role: "Sommelier", bio: "Wine expert with 12+ years experience", specialties: ["Italian Wines", "Food Pairing"] },
          { name: "Marco Bianchi", role: "Pastry Chef", bio: "Specializes in traditional Italian desserts", specialties: ["Tiramisu", "Cannoli"] },
          { name: "Giuseppe Rossi", role: "Sous Chef", bio: "Expert in regional Italian cuisines", specialties: ["Risotto", "Seafood"] }
        ],
        gallery: [
          { category: "Signature Dishes", images: 15 },
          { category: "Restaurant Interior", images: 8 },
          { category: "Wine Collection", images: 6 },
          { category: "Kitchen", images: 4 }
        ],
        packages: [
          { name: "Chef's Tasting Menu", description: "7-course tasting menu with wine pairings", price: "$95/person", duration: "2.5 hours" },
          { name: "Family Style Dinner", description: "Traditional family-style Italian dinner for groups", price: "$45/person", duration: "2 hours" },
          { name: "Wine Dinner", description: "5-course dinner with premium wine selections", price: "$75/person", duration: "3 hours" }
        ]
      }
    };

        // Special handling for freelancer portfolio
    if (businessType === 'freelancer') {
      return {
        hero: {
          title: "Creative Freelancer Portfolio",
          subtitle: "Transforming ideas into stunning visual experiences. Specialized in design, development, and creative solutions for modern businesses."
        },
        about: {
          title: "About Me",
          description: "I'm a passionate creative professional with 8+ years of experience helping businesses and individuals bring their visions to life through innovative design and development."
        },
        skills: [
          { name: "Web Design", level: 95, icon: "🎨" },
          { name: "UI/UX Design", level: 90, icon: "📱" },
          { name: "Frontend Development", level: 88, icon: "💻" },
          { name: "Graphic Design", level: 92, icon: "🖼️" },
          { name: "Branding", level: 85, icon: "🏷️" },
          { name: "Motion Graphics", level: 80, icon: "🎬" }
        ],
        portfolio: [
          {
            title: "E-commerce Platform",
            category: "Web Development",
            description: "Modern e-commerce platform with custom design and seamless user experience",
            image: "project1",
            technologies: ["React", "Node.js", "MongoDB"]
          },
          {
            title: "Brand Identity Design",
            category: "Branding",
            description: "Complete brand identity including logo, color palette, and brand guidelines",
            image: "project2",
            technologies: ["Illustrator", "Photoshop", "Figma"]
          },
          {
            title: "Mobile App UI",
            category: "UI/UX Design",
            description: "Clean and intuitive mobile app interface for fitness tracking application",
            image: "project3",
            technologies: ["Figma", "Principle", "Sketch"]
          },
          {
            title: "Corporate Website",
            category: "Web Design",
            description: "Professional corporate website with custom animations and responsive design",
            image: "project4",
            technologies: ["HTML/CSS", "JavaScript", "GSAP"]
          },
          {
            title: "Digital Marketing Campaign",
            category: "Graphic Design",
            description: "Social media graphics and digital assets for marketing campaign",
            image: "project5",
            technologies: ["Photoshop", "After Effects", "Illustrator"]
          },
          {
            title: "SaaS Dashboard",
            category: "UI/UX Design",
            description: "Complex dashboard interface for SaaS application with data visualization",
            image: "project6",
            technologies: ["Figma", "React", "D3.js"]
          }
        ],
        services: [
          { icon: "🎨", title: "Web Design", description: "Custom website design tailored to your brand and business goals", price: "From $1,200" },
          { icon: "📱", title: "UI/UX Design", description: "User-centered design for web and mobile applications", price: "From $800" },
          { icon: "💻", title: "Frontend Development", description: "Modern, responsive websites built with latest technologies", price: "From $1,500" },
          { icon: "🏷️", title: "Branding & Identity", description: "Complete brand identity design including logo and guidelines", price: "From $900" },
          { icon: "🖼️", title: "Graphic Design", description: "Print and digital graphics for marketing and business materials", price: "From $300" },
          { icon: "🎬", title: "Motion Graphics", description: "Animated graphics and video content for digital marketing", price: "From $600" }
        ],
        experience: [
          {
            company: "Digital Agency Inc.",
            role: "Senior Creative Designer",
            period: "2020 - Present",
            description: "Lead designer for major client projects, specializing in web design and branding solutions."
          },
          {
            company: "Freelance",
            role: "Independent Designer & Developer",
            period: "2018 - Present",
            description: "Providing creative solutions for startups and established businesses across various industries."
          },
          {
            company: "Tech Startup Co.",
            role: "UI/UX Designer",
            period: "2018 - 2020",
            description: "Designed user interfaces for mobile and web applications, improving user engagement by 40%."
          }
        ],
        testimonials: [
          {
            name: "Sarah Johnson",
            company: "Tech Innovations LLC",
            role: "CEO",
            review: "Outstanding work! The website design exceeded our expectations and perfectly captured our brand vision.",
            rating: 5
          },
          {
            name: "Michael Chen",
            company: "Creative Solutions",
            role: "Marketing Director",
            review: "Professional, creative, and delivers on time. The branding work has significantly improved our market presence.",
            rating: 5
          },
          {
            name: "Emily Rodriguez",
            company: "Startup Hub",
            role: "Founder",
            review: "Incredible attention to detail and excellent communication throughout the project. Highly recommended!",
            rating: 5
          }
        ],
        packages: [
          { name: "Starter Package", description: "Perfect for small businesses getting started online", price: "$1,499", duration: "2-3 weeks", includes: ["Custom Web Design", "Responsive Layout", "Basic SEO", "Contact Forms"] },
          { name: "Professional Package", description: "Comprehensive solution for growing businesses", price: "$2,999", duration: "4-6 weeks", includes: ["Custom Design & Development", "CMS Integration", "Advanced SEO", "Analytics Setup", "Social Media Integration"] },
          { name: "Enterprise Package", description: "Full-scale solution for established companies", price: "$4,999", duration: "6-8 weeks", includes: ["Complete Brand Identity", "Custom Web Application", "E-commerce Integration", "Performance Optimization", "Ongoing Support"] }
        ]
      };
    }

        const defaultContent = baseContent[businessType] || baseContent.salon;

    // Ensure all required properties exist with fallbacks
    return {
      hero: defaultContent.hero || { title: "Business", subtitle: "Welcome to our business" },
      about: defaultContent.about || { title: "About Us", description: "Learn more about our business" },
      services: defaultContent.services || [],
      team: defaultContent.team || [],
      gallery: defaultContent.gallery || [],
      packages: defaultContent.packages || [],
      portfolio: defaultContent.portfolio || [],
      skills: defaultContent.skills || [],
      experience: defaultContent.experience || [],
      testimonials: defaultContent.testimonials || []
    };
  };

    const content = getBusinessContent(businessData.slug);

  // Safety check to ensure content is loaded
  if (!content) {
    return (
      <PageContainer>
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h2>Loading...</h2>
          <p>Please wait while we load the content.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Navbar */}
      <Navbar>
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
            {businessData.slug === 'freelancer' && <a href="#portfolio">Portfolio</a>}
            {businessData.slug === 'freelancer' && <a href="#skills">Skills</a>}
            <a href="#services">Services</a>
            {businessData.slug !== 'freelancer' && <a href="#team">Team</a>}
            {businessData.slug === 'freelancer' && <a href="#experience">Experience</a>}
            {businessData.slug !== 'freelancer' && <a href="#gallery">Gallery</a>}
            {businessData.slug !== 'freelancer' && <a href="#packages">Packages</a>}
            <a href="#contact">Contact</a>
          </NavLinks>
          <OwnerLink onClick={handleOwnerClick}>
            <FaEdit />
            Owner Dashboard
          </OwnerLink>
        </NavContainer>
      </Navbar>

      {/* Hero Section */}
      <HeroSection id="hero" primaryColor={businessData.primaryColor} businessType={businessData.slug}>
        <HeroContent>
          <HeroTitle>{content.hero.title}</HeroTitle>
          <HeroSubtitle>{content.hero.subtitle}</HeroSubtitle>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <HeroCTA primaryColor={businessData.primaryColor}>
              {businessData.slug === 'restaurant' ? 'Reserve Table' : 
               businessData.slug === 'gym' ? 'Start Free Trial' :
               businessData.slug === 'salon' ? 'Book Appointment' : 'Get Started'}
            </HeroCTA>
            <button style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: '600',
              background: 'transparent',
              color: theme.colors.white,
              border: `2px solid ${theme.colors.white}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Learn More
            </button>
          </div>
        </HeroContent>
      </HeroSection>

      {/* About Section */}
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
              {businessData.slug === 'gym' && '��️‍♂️'}
              {businessData.slug === 'restaurant' && '👨‍🍳'}
              {!['salon', 'gym', 'restaurant'].includes(businessData.slug) && '🏢'}
            </AboutImage>
          </AboutGrid>
          
          <StatsGrid>
            <StatCard primaryColor={businessData.primaryColor}>
              <div className="number">
                {businessData.slug === 'restaurant' ? '2,500+' : 
                 businessData.slug === 'gym' ? '1,200+' :
                 businessData.slug === 'salon' ? '850+' : '500+'}
              </div>
              <div className="label">
                {businessData.slug === 'restaurant' ? 'Meals Served' : 
                 businessData.slug === 'gym' ? 'Active Members' :
                 businessData.slug === 'salon' ? 'Services Completed' : 'Happy Clients'}
              </div>
            </StatCard>
            <StatCard primaryColor={businessData.primaryColor}>
              <div className="number">
                {businessData.slug === 'restaurant' ? '15+' : 
                 businessData.slug === 'gym' ? '8+' :
                 businessData.slug === 'salon' ? '12+' : '5+'}
              </div>
              <div className="label">Years Experience</div>
            </StatCard>
            <StatCard primaryColor={businessData.primaryColor}>
              <div className="number">4.9</div>
              <div className="label">★ Average Rating</div>
            </StatCard>
            <StatCard primaryColor={businessData.primaryColor}>
              <div className="number">
                {businessData.slug === 'restaurant' ? '7 Days' : 
                 businessData.slug === 'gym' ? '6AM-11PM' :
                 businessData.slug === 'salon' ? 'Mon-Sat' : '24/7'}
              </div>
              <div className="label">
                {businessData.slug === 'restaurant' ? 'Weekly Service' : 
                 businessData.slug === 'gym' ? 'Operating Hours' :
                 businessData.slug === 'salon' ? 'Open Days' : 'Support'}
              </div>
            </StatCard>
          </StatsGrid>
        </SectionContainer>
      </Section>

            {/* Portfolio Section for Freelancers */}
      {businessData.slug === 'freelancer' && content.portfolio ? (
        <Section id="portfolio">
          <SectionContainer>
            <SectionTitle>My Portfolio</SectionTitle>
            <SectionSubtitle>
              A showcase of my recent work and creative projects across various industries and technologies.
            </SectionSubtitle>
                        <PortfolioGrid>
              {(content.portfolio || []).map((project, index) => (
                <PortfolioCard key={index} primaryColor={businessData.primaryColor}>
                  <PortfolioImage primaryColor={businessData.primaryColor}>
                    🖼️
                  </PortfolioImage>
                  <PortfolioContent primaryColor={businessData.primaryColor}>
                    <div className="portfolio-category">{project.category}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech-stack">
                      {(project.technologies || []).map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </PortfolioContent>
                </PortfolioCard>
              ))}
            </PortfolioGrid>
          </SectionContainer>
        </Section>
      ) : null}

      {/* Skills Section for Freelancers */}
      {businessData.slug === 'freelancer' && content.skills ? (
        <Section id="skills" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>My Skills</SectionTitle>
            <SectionSubtitle>
              Technical expertise and creative skills developed through years of professional experience.
            </SectionSubtitle>
                        <SkillsGrid>
              {(content.skills || []).map((skill, index) => (
                <SkillCard key={index} primaryColor={businessData.primaryColor}>
                  <div className="skill-header">
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="percentage">{skill.level}%</div>
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SectionContainer>
        </Section>
      ) : null}

      {/* Services Section */}
      <Section id="services" background={businessData.slug === 'freelancer' ? theme.colors.white : theme.colors.white}>
        <SectionContainer>
          <SectionTitle>{businessData.slug === 'freelancer' ? 'My Services' : 'Our Services'}</SectionTitle>
          <SectionSubtitle>
            {businessData.slug === 'freelancer'
              ? 'Professional services tailored to help your business succeed in the digital landscape.'
              : 'We offer a comprehensive range of professional services designed to meet your needs and exceed your expectations.'
            }
          </SectionSubtitle>
                    <ServicesGrid>
            {(content.services || []).map((service, index) => (
              <ServiceCard key={index} primaryColor={businessData.primaryColor}>
                <div className="icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.price && (
                  <div style={{
                    marginTop: theme.spacing.md,
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: businessData.primaryColor
                  }}>
                    {service.price}
                  </div>
                )}
              </ServiceCard>
            ))}
          </ServicesGrid>
        </SectionContainer>
      </Section>

      {/* Team Section */}
      <Section id="team" background={theme.colors.gray50}>
        <SectionContainer>
          <SectionTitle>Meet Our Team</SectionTitle>
          <SectionSubtitle>
            Our experienced professionals are passionate about delivering exceptional service and results.
          </SectionSubtitle>
                    <TeamGrid>
            {(content.team || []).map((member, index) => (
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

      {/* Experience Section for Freelancers */}
      {businessData.slug === 'freelancer' && content.experience ? (
        <Section id="experience">
          <SectionContainer>
            <SectionTitle>Professional Experience</SectionTitle>
            <SectionSubtitle>
              My journey in the creative industry, working with diverse clients and challenging projects.
            </SectionSubtitle>
                        <ExperienceTimeline>
              {(content.experience || []).map((exp, index) => (
                <ExperienceCard
                  key={index}
                  primaryColor={businessData.primaryColor}
                  isLeft={index % 2 === 0}
                >
                  <div className="experience-content">
                    <div className="period">{exp.period}</div>
                    <h4>{exp.role}</h4>
                    <div className="company">{exp.company}</div>
                    <p>{exp.description}</p>
                  </div>
                </ExperienceCard>
              ))}
            </ExperienceTimeline>
          </SectionContainer>
        </Section>
      ) : null}

      {/* Testimonials Section */}
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

      {/* Gallery Section */}
      <Section id="gallery">
        <SectionContainer>
          <SectionTitle>Our Gallery</SectionTitle>
          <SectionSubtitle>
            Take a look at our work, facilities, and the experiences we create for our clients.
          </SectionSubtitle>
          <GalleryGrid>
            {content.gallery?.map((category, index) => (
              <GalleryCategory key={index}>
                <GalleryImage primaryColor={businessData.primaryColor}>
                  📸
                </GalleryImage>
                <GalleryInfo>
                  <h3>{category.category}</h3>
                  <p>{category.images} photos</p>
                </GalleryInfo>
              </GalleryCategory>
            ))}
          </GalleryGrid>
        </SectionContainer>
      </Section>

      {/* Packages Section */}
      {content.packages && (
        <Section id="packages" background={theme.colors.gray50}>
          <SectionContainer>
            <SectionTitle>Our Packages</SectionTitle>
            <SectionSubtitle>
              Choose from our specially curated packages designed to give you the best value and experience.
            </SectionSubtitle>
                        <PackagesGrid>
              {(content.packages || []).map((pkg, index) => (
                <PackageCard
                  key={index}
                  primaryColor={businessData.primaryColor}
                  featured={index === 1}
                >
                  <div className="package-name">{pkg.name}</div>
                  <div className="package-price">{pkg.price}</div>
                  <div className="package-duration">{pkg.duration}</div>
                  <div className="package-description">{pkg.description}</div>
                  <button className="package-button">Book Now</button>
                </PackageCard>
              ))}
            </PackagesGrid>
          </SectionContainer>
        </Section>
      )}

      {/* FAQ Section */}
      <Section id="faq">
        <SectionContainer>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionSubtitle>
            Find answers to common questions about our services, booking, and policies.
          </SectionSubtitle>
          <FAQContainer>
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking at least 1-2 weeks in advance, especially for weekends and special occasions. However, we also accept same-day appointments based on availability."
              },
              {
                question: "What is your cancellation policy?",
                answer: "We require at least 24 hours notice for cancellations. Cancellations made less than 24 hours in advance may be subject to a fee."
              },
              {
                question: "Do you offer group discounts?",
                answer: "Yes! We offer special group rates for parties of 3 or more. Contact us for custom group pricing and package options."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, cash, and digital payments including Apple Pay and Google Pay. We also offer financing options for larger packages."
              },
              {
                question: "Are your products organic/natural?",
                answer: "We use a carefully curated selection of premium products, including many organic and natural options. We're happy to discuss specific product ingredients and alternatives for sensitive skin."
              }
            ].map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion primaryColor={businessData.primaryColor}>
                  {faq.question}
                  <span>+</span>
                </FAQQuestion>
                <FAQAnswer>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>
        </SectionContainer>
      </Section>

      {/* Reviews Section */}
      <Section id="reviews" background={theme.colors.gray50}>
        <SectionContainer>
          <SectionTitle>Recent Reviews</SectionTitle>
          <SectionSubtitle>
            See what our recent customers are saying about their experiences with us.
          </SectionSubtitle>
          <ReviewsGrid>
            {[
              {
                name: "Emma Thompson",
                date: "2 weeks ago",
                rating: 5,
                review: "Absolutely amazing experience! The staff was professional, the atmosphere was relaxing, and the results exceeded my expectations. I'll definitely be coming back!"
              },
              {
                name: "Michael Chen",
                date: "1 month ago",
                rating: 5,
                review: "Top-notch service and quality. The attention to detail and customer care is outstanding. Highly recommend to anyone looking for excellence."
              },
              {
                name: "Sarah Williams",
                date: "3 weeks ago",
                rating: 5,
                review: "Best decision I made! The team is knowledgeable, friendly, and really listens to what you want. The facility is clean and modern too."
              },
              {
                name: "David Rodriguez",
                date: "1 week ago",
                rating: 5,
                review: "Fantastic value for money. The package I chose was perfect and included everything I needed. Will be booking again soon!"
              },
              {
                name: "Lisa Park",
                date: "2 months ago",
                rating: 5,
                review: "I've been a customer for over a year now and they never disappoint. Consistent quality and service every single time."
              },
              {
                name: "James Wilson",
                date: "3 days ago",
                rating: 5,
                review: "Exceeded all expectations! From booking to completion, everything was seamless. The results speak for themselves."
              }
            ].map((review, index) => (
              <ReviewCard key={index} primaryColor={businessData.primaryColor}>
                <div className="review-header">
                  <div className="avatar">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="review-info">
                    <h4>{review.name}</h4>
                    <div className="date">{review.date}</div>
                  </div>
                </div>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <div className="review-text">
                  "{review.review}"
                </div>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        </SectionContainer>
      </Section>

      {/* Business Hours Section */}
      <Section id="hours">
        <SectionContainer>
          <SectionTitle>Business Hours & Location</SectionTitle>
          <SectionSubtitle>
            Visit us during our business hours or contact us anytime for appointments and inquiries.
          </SectionSubtitle>
          <HoursGrid>
            <HoursCard primaryColor={businessData.primaryColor}>
              <h4>Operating Hours</h4>
              <div className="hours-list">
                <div className="hours-item">
                  <span className="day">Monday</span>
                  <span className="time">9:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Tuesday</span>
                  <span className="time">9:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Wednesday</span>
                  <span className="time">9:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Thursday</span>
                  <span className="time">9:00 AM - 8:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Friday</span>
                  <span className="time">9:00 AM - 8:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Saturday</span>
                  <span className="time">8:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Sunday</span>
                  <span className="time">10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </HoursCard>

            <HoursCard primaryColor={businessData.primaryColor}>
              <h4>Contact Information</h4>
              <div className="hours-list">
                <div className="hours-item">
                  <span className="day">Phone</span>
                  <span className="time">+1 (555) 123-4567</span>
                </div>
                <div className="hours-item">
                  <span className="day">Email</span>
                  <span className="time">info@{businessData.slug}.com</span>
                </div>
                <div className="hours-item">
                  <span className="day">Address</span>
                  <span className="time">123 Business St</span>
                </div>
                <div className="hours-item">
                  <span className="day">City</span>
                  <span className="time">Your City, ST 12345</span>
                </div>
              </div>
            </HoursCard>
          </HoursGrid>
        </SectionContainer>
      </Section>

      {/* Contact Section */}
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
              <h3>Send us a Message</h3>
              <p style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray600 }}>
                We'd love to hear from you! Whether you have questions about our services, want to book an appointment, or need a custom quote, don't hesitate to reach out.
              </p>
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
