import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobeAmericas,
  FaClock,
  FaHeart,
  FaShare,
  FaCalendarAlt,
  FaUsers,
  FaCamera,
  FaQuoteLeft,
  FaCheckCircle,
  FaInfo,
  FaRing,
  FaGem,
  FaLeaf,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { getVendorById } from "../data/vendors";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const NavHeader = styled.div`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  border-bottom: 1px solid ${theme.colors.gray200};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const BackButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "primary",
})`
  background: ${(props) => props.primary ? theme.colors.primary : theme.colors.white};
  color: ${(props) => props.primary ? theme.colors.white : theme.colors.gray700};
  border: 2px solid ${(props) => props.primary ? theme.colors.primary : theme.colors.gray200};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-1px);
    background: ${(props) => props.primary ? theme.colors.primaryDark : theme.colors.gray50};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

const HeroSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  margin-bottom: ${theme.spacing.xl};
`;

const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const HeroContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const VendorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const VendorInfo = styled.div`
  flex: 1;
`;

const VendorName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const VendorMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.md};
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.warning};
  font-weight: 600;
  font-size: 1.1rem;
`;

const FeaturedBadge = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 600;
`;

const VendorDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.lg};
`;

const SpecialtiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const SpecialtyTag = styled.span`
  background: ${theme.colors.primary}15;
  color: ${theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 0.9rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const ContactCard = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const ContactLabel = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ContactValue = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const Section = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing.sm};
  }
`;

const GalleryItem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ReviewCard = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const ReviewerInfo = styled.div``;

const ReviewerName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ReviewDate = styled.div`
  color: ${theme.colors.gray500};
  font-size: 0.8rem;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.warning};
`;

const ReviewText = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.5;
  position: relative;
  padding-left: ${theme.spacing.lg};
  font-style: italic;

  &:before {
    content: '"';
    position: absolute;
    left: 0;
    top: -5px;
    font-size: 2rem;
    color: ${theme.colors.primary};
    font-family: serif;
  }
`;

const HoursGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
`;

const HourRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.gray200};
  
  &:last-child {
    border-bottom: none;
  }
`;

const Day = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const Hours = styled.span`
  color: ${theme.colors.gray600};
`;

const BookingCard = styled.div`
  background: ${theme.colors.primary}10;
  border: 2px solid ${theme.colors.primary}30;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const BookingTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const BookingDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.5;
`;

const BookingButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const ServiceIcon = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.primary};
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ServiceDescription = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  color: ${theme.colors.gray600};
  font-size: 1.2rem;
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  h2 {
    font-size: 2rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray900};
  }

  p {
    font-size: 1.1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const VendorDetail = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const vendorData = getVendorById(vendorSlug);
    setVendor(vendorData);
    setLoading(false);
  }, [vendorSlug]);

  const handleBooking = () => {
    navigate(`/${vendorSlug}/booking`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vendor.name,
        text: vendor.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const mockReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      text: "Absolutely amazing service! They made our wedding day perfect. The attention to detail was incredible and the team was so professional throughout the entire process.",
    },
    {
      id: 2,
      name: "Michael & Emma",
      rating: 5,
      date: "1 month ago",
      text: "We couldn't have asked for better vendors. From the initial consultation to the final execution, everything was flawless. Highly recommend to any couple planning their special day!",
    },
    {
      id: 3,
      name: "Jennifer Chen",
      rating: 4,
      date: "2 months ago",
      text: "Great experience overall. Very responsive and accommodating to our needs. The quality of work exceeded our expectations and the pricing was fair.",
    },
  ];

  const services = [
    {
      name: "Wedding Planning",
      description: "Complete wedding planning from start to finish",
      icon: FaRing,
    },
    {
      name: "Venue Decoration",
      description: "Beautiful decorations to transform your venue",
      icon: FaLeaf,
    },
    {
      name: "Floral Arrangements",
      description: "Custom bouquets and centerpieces",
      icon: FaLeaf,
    },
    {
      name: "Photography",
      description: "Professional wedding photography services",
      icon: FaCamera,
    },
  ];

  if (loading) {
    return (
      <PageContainer>
        <LoadingState>Loading vendor details...</LoadingState>
      </PageContainer>
    );
  }

  if (!vendor) {
    return (
      <PageContainer>
        <NavHeader>
          <NavContent>
            <BackButton onClick={() => navigate("/weddings")}>
              <FaArrowLeft />
              Back to Vendors
            </BackButton>
          </NavContent>
        </NavHeader>
        <NotFound>
          <h2>Vendor Not Found</h2>
          <p>The vendor you're looking for doesn't exist or may have been removed.</p>
          <ActionButton primary onClick={() => navigate("/weddings")}>
            Back to Vendors
          </ActionButton>
        </NotFound>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <NavHeader>
        <NavContent>
          <BackButton onClick={() => navigate("/weddings")}>
            <FaArrowLeft />
            Back to Vendors
          </BackButton>
          <ActionButtons>
            <ActionButton onClick={() => setIsLiked(!isLiked)}>
              <FaHeart style={{ color: isLiked ? theme.colors.error : 'inherit' }} />
              {isLiked ? 'Liked' : 'Like'}
            </ActionButton>
            <ActionButton onClick={handleShare}>
              <FaShare />
              Share
            </ActionButton>
            <ActionButton primary onClick={handleBooking}>
              <FaCalendarAlt />
              Book Now
            </ActionButton>
          </ActionButtons>
        </NavContent>
      </NavHeader>

      <Container>
        <HeroSection>
          <HeroImage src={vendor.image} alt={vendor.name} />
          <HeroContent>
            <VendorHeader>
              <VendorInfo>
                <VendorName>{vendor.name}</VendorName>
                <VendorMeta>
                  <MetaItem>
                    <FaMapMarkerAlt />
                    {vendor.address}
                  </MetaItem>
                  <Rating>
                    <FaStar />
                    {vendor.rating} ({vendor.reviewCount} reviews)
                  </Rating>
                  <MetaItem>
                    <FaMapMarkerAlt />
                    {vendor.distance}mi away
                  </MetaItem>
                </VendorMeta>
                <VendorDescription>{vendor.description}</VendorDescription>
                <SpecialtiesGrid>
                  {vendor.specialties.map((specialty, index) => (
                    <SpecialtyTag key={index}>{specialty}</SpecialtyTag>
                  ))}
                </SpecialtiesGrid>
              </VendorInfo>
              {vendor.featured && (
                <FeaturedBadge>Featured Vendor</FeaturedBadge>
              )}
            </VendorHeader>

            <ContactGrid>
              <ContactCard>
                <ContactIcon>
                  <FaPhoneAlt />
                </ContactIcon>
                <ContactLabel>Phone</ContactLabel>
                <ContactValue>{vendor.phone}</ContactValue>
              </ContactCard>
              <ContactCard>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>{vendor.email}</ContactValue>
              </ContactCard>
              <ContactCard>
                <ContactIcon>
                  <FaGlobeAmericas />
                </ContactIcon>
                <ContactLabel>Website</ContactLabel>
                <ContactValue>{vendor.website}</ContactValue>
              </ContactCard>
            </ContactGrid>
          </HeroContent>
        </HeroSection>

        <ContentGrid>
          <MainContent>
            <Section>
              <SectionTitle>
                <FaCamera />
                Portfolio Gallery
              </SectionTitle>
              <GalleryGrid>
                {vendor.portfolioImages.map((image, index) => (
                  <GalleryItem key={index} src={image} alt={`${vendor.name} portfolio ${index + 1}`} />
                ))}
              </GalleryGrid>
            </Section>

            <Section>
              <SectionTitle>
                <FaQuoteLeft />
                Customer Reviews
              </SectionTitle>
              {mockReviews.map((review) => (
                <ReviewCard key={review.id}>
                  <ReviewHeader>
                    <ReviewerInfo>
                      <ReviewerName>{review.name}</ReviewerName>
                      <ReviewDate>{review.date}</ReviewDate>
                    </ReviewerInfo>
                    <ReviewRating>
                      {Array.from({ length: review.rating }, (_, i) => (
                        <FaStar key={i} />
                      ))}
                    </ReviewRating>
                  </ReviewHeader>
                  <ReviewText>{review.text}</ReviewText>
                </ReviewCard>
              ))}
            </Section>

            <Section>
              <SectionTitle>
                <FaCheckCircle />
                Services Offered
              </SectionTitle>
              <ServicesList>
                {services.map((service, index) => (
                  <ServiceItem key={index}>
                    <ServiceIcon>
                      <service.icon />
                    </ServiceIcon>
                    <ServiceInfo>
                      <ServiceName>{service.name}</ServiceName>
                      <ServiceDescription>{service.description}</ServiceDescription>
                    </ServiceInfo>
                  </ServiceItem>
                ))}
              </ServicesList>
            </Section>
          </MainContent>

          <Sidebar>
            <BookingCard>
              <BookingTitle>Ready to Book?</BookingTitle>
              <BookingDescription>
                Get in touch with {vendor.name} to discuss your wedding plans and check availability for your special day.
              </BookingDescription>
              <BookingButton onClick={handleBooking}>
                <FaCalendarAlt />
                Request Consultation
              </BookingButton>
            </BookingCard>

            <Section>
              <SectionTitle>
                <FaClock />
                Business Hours
              </SectionTitle>
              <HoursGrid>
                {Object.entries(vendor.hours).map(([day, hours]) => (
                  <HourRow key={day}>
                    <Day>{day.charAt(0).toUpperCase() + day.slice(1)}</Day>
                    <Hours>{hours}</Hours>
                  </HourRow>
                ))}
              </HoursGrid>
            </Section>

            <Section>
              <SectionTitle>
                <FaInfo />
                Quick Info
              </SectionTitle>
              <ServicesList>
                <ServiceItem>
                  <ServiceIcon>
                    <FaMapMarkerAlt />
                  </ServiceIcon>
                  <ServiceInfo>
                    <ServiceName>Location</ServiceName>
                    <ServiceDescription>{vendor.city}, {vendor.state}</ServiceDescription>
                  </ServiceInfo>
                </ServiceItem>
                <ServiceItem>
                  <ServiceIcon>
                    <FaStar />
                  </ServiceIcon>
                  <ServiceInfo>
                    <ServiceName>Rating</ServiceName>
                    <ServiceDescription>{vendor.rating}/5 from {vendor.reviewCount} reviews</ServiceDescription>
                  </ServiceInfo>
                </ServiceItem>
                <ServiceItem>
                  <ServiceIcon>
                    <FaUsers />
                  </ServiceIcon>
                  <ServiceInfo>
                    <ServiceName>Specialties</ServiceName>
                    <ServiceDescription>{vendor.specialties.length} services offered</ServiceDescription>
                  </ServiceInfo>
                </ServiceItem>
              </ServicesList>
            </Section>
          </Sidebar>
        </ContentGrid>
      </Container>
    </PageContainer>
  );
};

export default VendorDetail;
