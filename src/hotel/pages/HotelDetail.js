import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

import {
  fetchHotelById,
  fetchHotelSections,
  fetchHotelReviews,
} from '../../utils/hotelAPI';

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
    const fetchData = async () => {
      setLoading(true);
      try {
        let foundHotel;

        // Try to get hotel from Redux store first (for updated data)
        if (hotelsFromStore && hotelsFromStore.length > 0) {
          foundHotel = hotelsFromStore.find(
            h => h.slug === slugParam || h.id === parseInt(slugParam)
          );
        }

        // Fetch from API if not found in store
        if (!foundHotel) {
          const response = await fetchHotelById(slugParam);
          if (response.success) {
            foundHotel = response.data;
          }
        }

        setHotel(foundHotel);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slugParam, hotelsFromStore]);

  // Re-render when Redux store updates (for live preview)
  useEffect(() => {
    if (hotelsFromStore && hotel) {
      const updatedHotel = hotelsFromStore.find(h => h.id === hotel.id);
      if (
        updatedHotel &&
        JSON.stringify(updatedHotel) !== JSON.stringify(hotel)
      ) {
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

  // Get features from hotel sections data
  const features = hotel.sections?.features?.items || [];

  // Get amenity categories from hotel sections data
  const amenityCategories = hotel.sections?.amenities?.categories || [];

  // Get the appropriate icon for categories (fallback icons)
  const getCategoryIcon = title => {
    const iconMap = {
      Recreation: FaSwimmingPool,
      Dining: FaUtensils,
      Business: FaBusinessTime,
      Services: FaConciergeBell,
    };
    return iconMap[title] || FaConciergeBell;
  };

  return (
    <PageContainer>
      <HotelNavbar />

      <HeroBanner image={hotel.sections?.hero?.backgroundImage || hotel.image}>
        <HeroContent>
          <HeroTitle>{hotel.sections?.hero?.title || hotel.name}</HeroTitle>
          <HeroSubtitle>
            {hotel.sections?.hero?.subtitle ||
              `Experience luxury hospitality in the heart of ${hotel.city}`}
          </HeroSubtitle>
          <HeroActions>
            <MobileQuickInfoContainer>
              {hotel.sections?.hero?.quickInfo?.map((info, index) => {
                const IconComponent =
                  info.icon === 'FaStar' ? FaStar : FaMapMarkerAlt;
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
              }) || (
                <>
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
                </>
              )}
            </MobileQuickInfoContainer>
            <CTAButton onClick={() => navigate(`/${slug}/rooms`)}>
              {hotel.sections?.hero?.ctaText || 'Book Your Stay'}
            </CTAButton>
          </HeroActions>
        </HeroContent>
      </HeroBanner>

      {/* Render sections in custom order - only if visible */}
      {(
        hotel.sectionOrder || [
          'about',
          'features',
          'gallery',
          'amenities',
          'testimonials',
          'contact',
        ]
      )
        .filter(sectionId => {
          // Check if section is visible and exists
          const sectionVisibility = hotel.sectionVisibility || {};
          return (
            sectionVisibility[sectionId] !== false &&
            hotel.sections?.[sectionId]
          );
        })
        .map((sectionId, index) => {
          const isAlt = index % 2 === 1; // Alternate background colors

          switch (sectionId) {
            case 'about':
              return (
                <ContentSection key={sectionId} className={isAlt ? 'alt' : ''}>
                  <Container>
                    <SectionHeader>
                      <SectionTitle>{hotel.sections.about.title}</SectionTitle>
                      <SectionSubtitle>
                        {hotel.sections.about.subtitle}
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
                      {hotel.sections.about.content}
                    </Description>
                    {hotel.sections.about.highlights && (
                      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            maxWidth: '600px',
                            margin: '0 auto',
                          }}
                        >
                          {hotel.sections.about.highlights.map(
                            (highlight, index) => (
                              <li
                                key={index}
                                style={{
                                  padding: '0.5rem 0',
                                  color: theme.colors.gray700,
                                }}
                              >
                                <FaCheckCircle
                                  style={{
                                    color: theme.colors.success,
                                    marginRight: '0.5rem',
                                  }}
                                />
                                {highlight}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </Container>
                </ContentSection>
              );

            case 'features':
              return (
                <ContentSection key={sectionId} className={isAlt ? 'alt' : ''}>
                  <Container>
                    <SectionHeader>
                      <SectionTitle>
                        {hotel.sections.features.title}
                      </SectionTitle>
                      <SectionSubtitle>
                        {hotel.sections.features.subtitle}
                      </SectionSubtitle>
                    </SectionHeader>
                    <FeaturesGrid>
                      {features.map((feature, index) => {
                        // Map icon names to components
                        const getIconComponent = iconName => {
                          const iconMap = {
                            FaConciergeBell: FaConciergeBell,
                            FaUmbrellaBeach: FaUmbrellaBeach,
                            FaBusinessTime: FaBusinessTime,
                            FaTaxi: FaTaxi,
                            FaMountain: FaBusinessTime, // Fallback
                            FaHiking: FaBusinessTime, // Fallback
                            FaLeaf: FaBusinessTime, // Fallback
                            FaFire: FaBusinessTime, // Fallback
                            FaCrown: FaConciergeBell, // Fallback
                            FaMusic: FaConciergeBell, // Fallback
                            FaGem: FaConciergeBell, // Fallback
                            FaCamera: FaConciergeBell, // Fallback
                            FaSpa: FaConciergeBell, // Fallback
                          };
                          return iconMap[iconName] || FaConciergeBell;
                        };

                        const IconComponent = getIconComponent(feature.icon);

                        return (
                          <FeatureCard key={index}>
                            <FeatureIcon>
                              <IconComponent />
                            </FeatureIcon>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>
                              {feature.description}
                            </FeatureDescription>
                          </FeatureCard>
                        );
                      })}
                    </FeaturesGrid>
                  </Container>
                </ContentSection>
              );

            case 'gallery':
              return (
                <ContentSection key={sectionId} className={isAlt ? 'alt' : ''}>
                  <Container>
                    <SectionHeader>
                      <SectionTitle>
                        {hotel.sections.gallery.title}
                      </SectionTitle>
                      <SectionSubtitle>
                        {hotel.sections.gallery.subtitle}
                      </SectionSubtitle>
                    </SectionHeader>
                    <GallerySection>
                      <GalleryGrid>
                        {hotel.sections.gallery.images
                          .slice(0, 5)
                          .map((item, index) => (
                            <GalleryItem key={index} image={item.image}>
                              <GalleryOverlay>{item.title}</GalleryOverlay>
                            </GalleryItem>
                          ))}
                      </GalleryGrid>
                    </GallerySection>
                  </Container>
                </ContentSection>
              );

            case 'amenities':
              return (
                <ContentSection key={sectionId} className={isAlt ? 'alt' : ''}>
                  <Container>
                    <SectionHeader>
                      <SectionTitle>
                        {hotel.sections.amenities.title}
                      </SectionTitle>
                      <SectionSubtitle>
                        {hotel.sections.amenities.subtitle}
                      </SectionSubtitle>
                    </SectionHeader>
                    <AmenitiesSection>
                      <AmenitiesGrid>
                        {amenityCategories.map((category, index) => {
                          const CategoryIcon = getCategoryIcon(category.title);
                          return (
                            <AmenityCategory key={index}>
                              <h4>
                                <CategoryIcon />
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
                          );
                        })}
                      </AmenitiesGrid>
                    </AmenitiesSection>
                  </Container>
                </ContentSection>
              );

            case 'testimonials':
              return (
                <ContentSection key={sectionId} className={isAlt ? 'alt' : ''}>
                  <Container>
                    <TestimonialsSection>
                      <SectionHeader>
                        <SectionTitle style={{ color: 'white' }}>
                          {hotel.sections?.testimonials?.title ||
                            'Guest Reviews'}
                        </SectionTitle>
                        <SectionSubtitle
                          style={{ color: 'rgba(255,255,255,0.8)' }}
                        >
                          {hotel.sections?.testimonials?.subtitle ||
                            'Hear what our valued guests have to say about their experience'}
                        </SectionSubtitle>
                      </SectionHeader>
                      {hotel.sections?.testimonials?.reviews &&
                      hotel.sections.testimonials.reviews.length > 0 ? (
                        <div
                          style={{
                            display: 'grid',
                            gap: theme.spacing.xl,
                            marginBottom: theme.spacing.xl,
                          }}
                        >
                          {hotel.sections.testimonials.reviews
                            .slice(0, 3)
                            .map(review => (
                              <TestimonialCard key={review.id}>
                                <TestimonialQuote>
                                  "{review.comment}"
                                </TestimonialQuote>
                                <TestimonialAuthor>
                                  <div className="avatar">
                                    {review.guestName.charAt(0)}
                                  </div>
                                  <div className="info">
                                    <div className="name">
                                      {review.guestName}
                                      {review.verified && (
                                        <span
                                          style={{
                                            color: '#fbbf24',
                                            fontSize: '0.8rem',
                                            marginLeft: theme.spacing.sm,
                                          }}
                                        >
                                          ✓ Verified Stay
                                        </span>
                                      )}
                                    </div>
                                    <div className="details">
                                      {review.roomType} •{' '}
                                      {new Date(review.date).toLocaleDateString(
                                        'en-US',
                                        {
                                          year: 'numeric',
                                          month: 'short',
                                        }
                                      )}{' '}
                                      • {review.rating}/5 ⭐
                                    </div>
                                  </div>
                                </TestimonialAuthor>
                              </TestimonialCard>
                            ))}
                        </div>
                      ) : (
                        <TestimonialCard>
                          <TestimonialQuote>
                            "Absolutely exceptional service and stunning
                            accommodations. The staff went above and beyond to
                            make our anniversary celebration truly memorable.
                            The attention to detail and luxury amenities
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
                      )}
                    </TestimonialsSection>
                  </Container>
                </ContentSection>
              );

            case 'contact':
              return (
                <ContentSection key={sectionId} className={isAlt ? 'alt' : ''}>
                  <Container>
                    <SectionHeader>
                      <SectionTitle>
                        {hotel.sections.contact.title}
                      </SectionTitle>
                      <SectionSubtitle>
                        {hotel.sections.contact.subtitle}
                      </SectionSubtitle>
                    </SectionHeader>
                    <LocationSection>
                      <LocationGrid>
                        <ContactInfo>
                          <h4>Get in Touch</h4>
                          {hotel.sections.contact.info.map((field, index) => {
                            const getIcon = iconName => {
                              const iconMap = {
                                FaMapMarkerAlt: FaMapMarkerAlt,
                                FaPhone: FaPhone,
                                FaEnvelope: FaEnvelope,
                                FaClock: FaClock,
                              };
                              return iconMap[iconName] || FaMapMarkerAlt;
                            };
                            const IconComponent = getIcon(field.icon);

                            return (
                              <ContactItem key={index}>
                                <IconComponent className="icon" />
                                <div className="content">
                                  <div className="label">{field.label}</div>
                                  <div className="value">{field.value}</div>
                                </div>
                              </ContactItem>
                            );
                          })}
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
              );

            default:
              // Handle custom sections
              const customSection = hotel.customSections?.find(
                cs => cs.id === sectionId
              );
              if (customSection && customSection.isVisible) {
                return (
                  <ContentSection
                    key={sectionId}
                    className={isAlt ? 'alt' : ''}
                  >
                    <Container>
                      <SectionHeader>
                        <SectionTitle>{customSection.title}</SectionTitle>
                      </SectionHeader>
                      {customSection.type === 'text' && (
                        <div>
                          {customSection.content?.map((item, idx) => (
                            <Description
                              key={idx}
                              style={{
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto',
                              }}
                            >
                              {item.content}
                            </Description>
                          ))}
                        </div>
                      )}
                      {customSection.type === 'cards' && (
                        <FeaturesGrid>
                          {customSection.content?.map((card, idx) => (
                            <FeatureCard key={idx}>
                              {card.image && (
                                <img
                                  src={card.image}
                                  alt={card.title}
                                  style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                  }}
                                />
                              )}
                              <FeatureTitle>{card.title}</FeatureTitle>
                              <FeatureDescription>
                                {card.description}
                              </FeatureDescription>
                              {card.link && (
                                <a
                                  href={card.link}
                                  style={{
                                    color: theme.colors.primary,
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    marginTop: '1rem',
                                    display: 'inline-block',
                                  }}
                                >
                                  Learn More →
                                </a>
                              )}
                            </FeatureCard>
                          ))}
                        </FeaturesGrid>
                      )}
                      {customSection.type === 'gallery' && (
                        <GallerySection>
                          <GalleryGrid>
                            {customSection.content
                              ?.slice(0, 5)
                              .map((item, idx) => (
                                <GalleryItem key={idx} image={item.image}>
                                  <GalleryOverlay>{item.title}</GalleryOverlay>
                                </GalleryItem>
                              ))}
                          </GalleryGrid>
                        </GallerySection>
                      )}
                      {customSection.type === 'list' && (
                        <AmenityList
                          style={{ maxWidth: '600px', margin: '0 auto' }}
                        >
                          {customSection.content?.map((item, idx) => (
                            <AmenityItem key={idx}>
                              <FaCheckCircle className="icon" />
                              {item.text}
                            </AmenityItem>
                          ))}
                        </AmenityList>
                      )}
                    </Container>
                  </ContentSection>
                );
              }
              return null;
          }
        })}

      <BackToTop onClick={scrollToTop}>↑</BackToTop>

      <HotelFooter />
    </PageContainer>
  );
};

export default HotelDetail;
