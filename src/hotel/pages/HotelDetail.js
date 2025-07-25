import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
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
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import HotelNavbar from '../components/HotelNavbar';
import HotelFooter from '../components/HotelFooter';

import { getHotelByIdOrSlug } from '../../DummyData';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const HeroBanner = styled.section.withConfig({
  shouldForwardProp: prop => prop !== 'image',
})`
  position: relative;
  height: 100vh;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
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
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 80vh;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 100vh;
    padding-top: 60px;
    background-attachment: scroll;
    background-position: center center;

    &::before {
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.5)
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
  padding: 0 ${theme.spacing.xl};
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.md};
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 120px);
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
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
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.95;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  max-width: 600px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    align-items: stretch;
    margin-top: ${theme.spacing.xl};
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: ${theme.borderRadius.xl};
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
`;

const QuickInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  min-width: 200px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: auto;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    background: rgba(255, 255, 255, 0.15);
    border-radius: ${theme.borderRadius.md};
    backdrop-filter: blur(15px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: auto;
    max-width: 140px;
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
  font-size: 1.5rem;
  color: #fbbf24;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const QuickInfoText = styled.div`
  .label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 2px;
  }
  .value {
    font-size: 1.1rem;
    font-weight: 600;
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

const ContentSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};

  &.alt {
    background: ${theme.colors.gray50};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl} 0;

    &:first-of-type {
      padding-top: ${theme.spacing.xxl};
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.xl};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.15rem;
    line-height: 1.7;
    max-width: 100%;
    padding: 0 ${theme.spacing.sm};
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.15rem;
    line-height: 1.8;
    text-align: left;
    padding: 0 ${theme.spacing.sm};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing.xxl} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    margin: ${theme.spacing.xl} 0;
  }
`;

const FeatureCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxl};
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.lg};

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 3.5rem;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
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
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.7;
  }
`;

const AmenitiesSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.lg};
    margin: 0 -${theme.spacing.sm};
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const AmenityCategory = styled.div`
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

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
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} 0;
  color: ${theme.colors.gray700};
  font-size: 0.95rem;

  .icon {
    color: ${theme.colors.success};
    font-size: 0.8rem;
  }
`;

const GallerySection = styled.div`
  margin: ${theme.spacing.xxl} 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 300px 300px;
  gap: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 200px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 250px);
    gap: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.lg};
  }
`;

const GalleryItem = styled.div.withConfig({
  shouldForwardProp: prop => !['image', 'span'].includes(prop),
})`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  ${props => props.span && `grid-row: span ${props.span};`}

  &:hover {
    transform: scale(1.02);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease;
  }

  &:hover::before {
    background: rgba(0, 0, 0, 0.3);
  }

  &:first-child {
    grid-row: span 2;
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  left: ${theme.spacing.md};
  color: ${theme.colors.white};
  font-weight: 500;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const TestimonialsSection = styled.div`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.white};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="testimonial-pattern" width="100" height="100" patternUnits="userSpaceOnUse"><circle fill="%23ffffff05" cx="50" cy="50" r="25"/></pattern></defs><rect width="100%" height="100%" fill="url(%23testimonial-pattern)"/></svg>');
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.lg};
    margin: 0 -${theme.spacing.sm};
  }
`;

const TestimonialCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TestimonialQuote = styled.blockquote`
  font-size: 1.3rem;
  line-height: 1.7;
  margin: ${theme.spacing.xl} 0;
  font-style: italic;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.4rem;
    line-height: 1.8;
    margin: ${theme.spacing.lg} 0;
    padding: 0 ${theme.spacing.sm};
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .info {
    text-align: left;

    .name {
      font-weight: 600;
      font-size: 1.1rem;
    }
    .details {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
`;

const LocationSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.lg};
    margin: 0 -${theme.spacing.sm};
  }
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.xxl};
  }
`;

const ContactInfo = styled.div`
  h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.gray100};

  &:last-child {
    border-bottom: none;
  }

  .icon {
    color: ${theme.colors.primary};
    font-size: 1.1rem;
    width: 20px;
  }

  .content {
    .label {
      font-size: 0.9rem;
      color: ${theme.colors.gray500};
      margin-bottom: 2px;
    }
    .value {
      font-weight: 500;
      color: ${theme.colors.gray900};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} 0;

    .icon {
      font-size: 1.3rem;
      width: 24px;
    }

    .content {
      .label {
        font-size: 1rem;
        margin-bottom: 4px;
      }
      .value {
        font-size: 1.1rem;
        font-weight: 600;
      }
    }
  }
`;

const MapPlaceholder = styled.div`
  background: linear-gradient(
    135deg,
    ${theme.colors.gray100},
    ${theme.colors.gray200}
  );
  border-radius: ${theme.borderRadius.lg};
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray500};
  font-size: 1.1rem;
  text-align: center;
  border: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 250px;
    font-size: 1rem;
  }
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: ${theme.shadows.lg};
  transition: all 0.3s ease;
  z-index: 50;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
  }
`;

const HotelDetail = () => {
  const { hotelSlug, slug } = useParams();
  const slugParam = hotelSlug || slug;
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get hotels from Redux store (includes any admin updates)
  const hotelsFromStore = useSelector(state => state.hotelManagement?.hotels);

  useEffect(() => {
    let foundHotel;

    // Try to get hotel from Redux store first (for updated data)
    if (hotelsFromStore && hotelsFromStore.length > 0) {
      foundHotel = hotelsFromStore.find(h => h.slug === slugParam || h.id === parseInt(slugParam));
    }

    // Fallback to original data if not found in store
    if (!foundHotel) {
      foundHotel = getHotelByIdOrSlug(slugParam);
    }

    setHotel(foundHotel);
    setLoading(false);
  }, [slugParam, hotelsFromStore]);

  // Re-render when Redux store updates (for live preview)
  useEffect(() => {
    if (hotelsFromStore && hotel) {
      const updatedHotel = hotelsFromStore.find(h => h.id === hotel.id);
      if (updatedHotel && JSON.stringify(updatedHotel) !== JSON.stringify(hotel)) {
        setHotel(updatedHotel);
      }
    }
  }, [hotelsFromStore, hotel]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <PageContainer>
        <HotelNavbar />
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
        <HotelFooter />
      </PageContainer>
    );
  }

  if (!hotel) {
    return (
      <PageContainer>
        <HotelNavbar />
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Hotel not found</h2>
          <p>The hotel you're looking for doesn't exist.</p>
        </div>
        <HotelFooter />
      </PageContainer>
    );
  }

  // Use dynamic features from hotel data or fallback to defaults
  const features = hotel.features || [
    {
      icon: FaConciergeBell,
      title: '24/7 Concierge',
      description:
        'Our dedicated concierge team is available round-the-clock to assist with all your needs.',
    },
    {
      icon: FaUmbrellaBeach,
      title: 'Luxury Amenities',
      description:
        'Enjoy world-class facilities including spa, pool, and fine dining restaurants.',
    },
    {
      icon: FaBusinessTime,
      title: 'Business Center',
      description:
        'Fully equipped business facilities for meetings and corporate events.',
    },
    {
      icon: FaTaxi,
      title: 'Airport Transfer',
      description: 'Complimentary airport shuttle service for all our guests.',
    },
  ];

  // Use dynamic amenity categories from hotel data or fallback to defaults
  const amenityCategories = hotel.amenityCategories || [
    {
      title: 'Recreation',
      icon: FaSwimmingPool,
      items: [
        'Swimming Pool',
        'Fitness Center',
        'Spa & Wellness',
        'Game Room',
        'Tennis Court',
      ],
    },
    {
      title: 'Dining',
      icon: FaUtensils,
      items: [
        'Fine Dining Restaurant',
        'Rooftop Bar',
        'Room Service',
        'Breakfast Buffet',
        'Coffee Shop',
      ],
    },
    {
      title: 'Business',
      icon: FaBusinessTime,
      items: [
        'Business Center',
        'Meeting Rooms',
        'Conference Hall',
        'Free WiFi',
        'Printing Services',
      ],
    },
    {
      title: 'Services',
      icon: FaConciergeBell,
      items: [
        '24/7 Concierge',
        'Valet Parking',
        'Laundry Service',
        'Airport Transfer',
        'Tour Desk',
      ],
    },
  ];

  // Get the appropriate icon for categories (fallback icons)
  const getCategoryIcon = (title) => {
    const iconMap = {
      'Recreation': FaSwimmingPool,
      'Dining': FaUtensils,
      'Business': FaBusinessTime,
      'Services': FaConciergeBell,
    };
    return iconMap[title] || FaConciergeBell;
  };

  return (
    <PageContainer>
      <HotelNavbar />

      <HeroBanner image={hotel.image}>
        <HeroContent>
          <HeroTitle>{hotel.name}</HeroTitle>
          <HeroSubtitle>
            Experience luxury hospitality in the heart of {hotel.city}
          </HeroSubtitle>
          <HeroActions>
            <MobileQuickInfoContainer>
              <QuickInfoCard>
                <QuickInfoIcon>
                  <FaStar />
                </QuickInfoIcon>
                <QuickInfoText>
                  <div className="label">Rating</div>
                  <div className="value">{hotel.rating}/5</div>
                </QuickInfoText>
              </QuickInfoCard>
              <QuickInfoCard>
                <QuickInfoIcon>
                  <FaMapMarkerAlt />
                </QuickInfoIcon>
                <QuickInfoText>
                  <div className="label">Location</div>
                  <div className="value">{hotel.city}</div>
                </QuickInfoText>
              </QuickInfoCard>
            </MobileQuickInfoContainer>
            <CTAButton onClick={() => navigate(`/${slug}/rooms`)}>
              Book Your Stay
            </CTAButton>
          </HeroActions>
        </HeroContent>
      </HeroBanner>

      <ContentSection>
        <Container>
          <SectionHeader>
            <SectionTitle>About {hotel.name}</SectionTitle>
            <SectionSubtitle>
              Learn more about our heritage, mission, and commitment to
              excellence
            </SectionSubtitle>
          </SectionHeader>
          <Description
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {hotel.name} stands as a beacon of luxury and elegance in the heart
            of {hotel.city}. With our rich heritage of hospitality excellence
            spanning decades, we have been creating unforgettable experiences
            for discerning travelers from around the world. Our commitment to
            impeccable service, combined with our stunning architecture and
            world-class amenities, makes us the preferred choice for those
            seeking the finest in luxury accommodation.
          </Description>
        </Container>
      </ContentSection>

      <ContentSection className="alt">
        <Container>
          <SectionHeader>
            <SectionTitle>Why Choose {hotel.name}?</SectionTitle>
            <SectionSubtitle>
              Discover the perfect blend of luxury, comfort, and exceptional
              service
            </SectionSubtitle>
          </SectionHeader>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>
                  {feature.icon ? <feature.icon /> : <FaConciergeBell />}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </ContentSection>

      <ContentSection>
        <Container>
          <SectionHeader>
            <SectionTitle>Hotel Gallery</SectionTitle>
            <SectionSubtitle>
              Take a virtual tour of our stunning property and amenities
            </SectionSubtitle>
          </SectionHeader>
          <GallerySection>
            <GalleryGrid>
              <GalleryItem image={hotel.images[0]}>
                <GalleryOverlay>Hotel Exterior</GalleryOverlay>
              </GalleryItem>
              <GalleryItem image={hotel.images[1]}>
                <GalleryOverlay>Luxury Rooms</GalleryOverlay>
              </GalleryItem>
              <GalleryItem image={hotel.images[2]}>
                <GalleryOverlay>Dining Experience</GalleryOverlay>
              </GalleryItem>
              <GalleryItem image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3">
                <GalleryOverlay>Swimming Pool</GalleryOverlay>
              </GalleryItem>
              <GalleryItem image="https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3">
                <GalleryOverlay>Spa & Wellness</GalleryOverlay>
              </GalleryItem>
            </GalleryGrid>
          </GallerySection>
        </Container>
      </ContentSection>

      <ContentSection className="alt">
        <Container>
          <SectionHeader>
            <SectionTitle>World-Class Amenities</SectionTitle>
            <SectionSubtitle>
              Everything you need for a perfect stay, all under one roof
            </SectionSubtitle>
          </SectionHeader>
          <AmenitiesSection>
            <AmenitiesGrid>
              {amenityCategories.map((category, index) => (
                <AmenityCategory key={index}>
                  <h4>
                    <category.icon />
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
              ))}
            </AmenitiesGrid>
          </AmenitiesSection>
        </Container>
      </ContentSection>

      <ContentSection>
        <Container>
          <TestimonialsSection>
            <SectionHeader>
              <SectionTitle style={{ color: 'white' }}>
                Guest Reviews
              </SectionTitle>
              <SectionSubtitle style={{ color: 'rgba(255,255,255,0.8)' }}>
                Hear what our valued guests have to say about their experience
              </SectionSubtitle>
            </SectionHeader>
            <TestimonialCard>
              <TestimonialQuote>
                "Absolutely exceptional service and stunning accommodations. The
                staff went above and beyond to make our anniversary celebration
                truly memorable. The attention to detail and luxury amenities
                exceeded all our expectations."
              </TestimonialQuote>
              <TestimonialAuthor>
                <div className="avatar">RS</div>
                <div className="info">
                  <div className="name">Raj & Priya Sharma</div>
                  <div className="details">
                    Anniversary Celebration • Mumbai
                  </div>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsSection>
        </Container>
      </ContentSection>

      <ContentSection className="alt">
        <Container>
          <SectionHeader>
            <SectionTitle>Location & Contact</SectionTitle>
            <SectionSubtitle>
              Perfectly situated in the heart of {hotel.city}
            </SectionSubtitle>
          </SectionHeader>
          <LocationSection>
            <LocationGrid>
              <ContactInfo>
                <h4>Get in Touch</h4>
                <ContactItem>
                  <FaMapMarkerAlt className="icon" />
                  <div className="content">
                    <div className="label">Address</div>
                    <div className="value">{hotel.address}</div>
                  </div>
                </ContactItem>
                <ContactItem>
                  <FaPhone className="icon" />
                  <div className="content">
                    <div className="label">Phone</div>
                    <div className="value">+91 22 6601 1825</div>
                  </div>
                </ContactItem>
                <ContactItem>
                  <FaEnvelope className="icon" />
                  <div className="content">
                    <div className="label">Email</div>
                    <div className="value">reservations@{hotel.slug}.com</div>
                  </div>
                </ContactItem>
                <ContactItem>
                  <FaClock className="icon" />
                  <div className="content">
                    <div className="label">Check-in / Check-out</div>
                    <div className="value">
                      {hotel.checkInTime} / {hotel.checkOutTime}
                    </div>
                  </div>
                </ContactItem>
              </ContactInfo>
              <MapPlaceholder>
                <div>
                  <FaMapMarkerAlt
                    style={{ fontSize: '2rem', marginBottom: '1rem' }}
                  />
                  <div>Interactive Map View</div>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      opacity: 0.7,
                      marginTop: '0.5rem',
                    }}
                  >
                    Prime location in {hotel.city}
                  </div>
                </div>
              </MapPlaceholder>
            </LocationGrid>
          </LocationSection>
        </Container>
      </ContentSection>

      <BackToTop onClick={scrollToTop}>↑</BackToTop>

      <HotelFooter />
    </PageContainer>
  );
};

export default HotelDetail;
