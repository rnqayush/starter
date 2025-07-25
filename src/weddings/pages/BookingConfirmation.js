import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaCheck,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRing,
  FaHeart,
  FaHome,
  FaShare,
  FaPrint,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { useGetWeddingServiceByIdQuery } from '../../store/api/weddingApi';
import { FaSpinner } from 'react-icons/fa';

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
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'primary',
})`
  background: ${props =>
    props.primary ? theme.colors.primary : theme.colors.white};
  color: ${props =>
    props.primary ? theme.colors.white : theme.colors.gray700};
  border: 2px solid
    ${props => (props.primary ? theme.colors.primary : theme.colors.gray200)};
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
    background: ${props =>
      props.primary ? theme.colors.primaryDark : theme.colors.gray50};
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const ConfirmationCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
`;

const SuccessHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${theme.colors.success} 0%,
    ${theme.colors.primary} 100%
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl};
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
`;

const SuccessSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: ${theme.spacing.lg};
`;

const BookingNumber = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const ContentSection = styled.div`
  padding: ${theme.spacing.xl};
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const InfoCard = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.primary};
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const InfoValue = styled.div`
  color: ${theme.colors.gray700};
  font-size: 0.95rem;
  line-height: 1.4;
`;

const VendorCard = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.xl};
`;

const VendorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const VendorImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const VendorInfo = styled.div`
  flex: 1;
`;

const VendorName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VendorMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const NextStepsCard = styled.div`
  background: ${theme.colors.info}10;
  border: 2px solid ${theme.colors.info}30;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const NextStepsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const StepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumber = styled.div`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
`;

const StepText = styled.div`
  color: ${theme.colors.gray700};
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'primary' && prop !== 'outline',
})`
  background: ${props =>
    props.primary
      ? theme.colors.primary
      : props.outline
        ? theme.colors.white
        : theme.colors.gray100};
  color: ${props =>
    props.primary
      ? theme.colors.white
      : props.outline
        ? theme.colors.primary
        : theme.colors.gray700};
  border: 2px solid
    ${props =>
      props.primary
        ? theme.colors.primary
        : props.outline
          ? theme.colors.primary
          : theme.colors.gray200};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-1px);
    background: ${props =>
      props.primary
        ? theme.colors.primaryDark
        : props.outline
          ? theme.colors.primary + '10'
          : theme.colors.gray200};
  }
`;

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState(null);


  // RTK Query hook for fetching wedding service details
  const vendorId = searchParams.get("vendor");
  const {
    data: vendorData,
    error,
    isLoading,
    refetch
  } = useGetWeddingServiceByIdQuery(vendorId, {
    skip: !vendorId // Skip query if no vendorId
  });

  const vendor = vendorData?.data;
  useEffect(() => {
    const vendorId = searchParams.get("vendor");
    const bookingId = searchParams.get("booking");

    // Mock booking details - in real app this would come from API
    setBookingDetails({
      bookingNumber: bookingId || "WED-" + Date.now().toString().slice(-6),
      contactName: searchParams.get("name") || "John & Sarah Doe",
      email: searchParams.get("email") || "john.sarah@example.com",
      phone: searchParams.get("phone") || "+1 (555) 123-4567",
      eventDate: searchParams.get("date") || "2024-06-15",
      eventTime: searchParams.get("time") || "3:00 PM",
      guestCount: searchParams.get("guests") || "150",
      eventType: searchParams.get("type") || "Wedding",
      services: searchParams.get("services")?.split(",") || [
    // Mock booking details - in real app this would come from API
    setBookingDetails({
      bookingNumber: bookingId || 'WED-' + Date.now().toString().slice(-6),
      contactName: searchParams.get('name') || 'John & Sarah Doe',
      email: searchParams.get('email') || 'john.sarah@example.com',
      phone: searchParams.get('phone') || '+1 (555) 123-4567',
      eventDate: searchParams.get('date') || '2024-06-15',
      eventTime: searchParams.get('time') || '3:00 PM',
      guestCount: searchParams.get('guests') || '150',
      eventType: searchParams.get('type') || 'Wedding',
      services: searchParams.get('services')?.split(',') || [
        'Wedding Planning',
        'Photography',
      ],
      message:
        searchParams.get('message') ||
        'Looking forward to making our special day perfect!',
    });
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wedding Booking Confirmation',
        text: `Booking confirmed with ${vendor?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <NavHeader>
          <NavContent>
            <Logo>
              <FaRing /> Wedding Bookings
            </Logo>
            <ActionButton primary onClick={() => navigate("/weddings")}>
              <FaHome />
              Back to Vendors
            </ActionButton>
          </NavContent>
        </NavHeader>
        <Container>
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <FaSpinner size={24} style={{ animation: "spin 1s linear infinite", marginRight: "10px" }} />
            Loading confirmation...
          </div>
        </Container>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <NavHeader>
          <NavContent>
            <Logo>
              <FaRing /> Wedding Bookings
            </Logo>
            <ActionButton primary onClick={() => navigate("/weddings")}>
              <FaHome />
              Back to Vendors
            </ActionButton>
          </NavContent>
        </NavHeader>
        <Container>
          <div style={{ textAlign: "center", padding: "4rem", color: theme.colors.error }}>
            <h3>Failed to load vendor information</h3>
            <p>We're having trouble loading the vendor details. Please try again.</p>
            <button
              onClick={() => refetch()}
              style={{
                background: theme.colors.primary,
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Retry
            </button>
          </div>
        </Container>
      </PageContainer>
    );
  }

  if (!vendor || !bookingDetails) {
    return (
      <PageContainer>
        <NavHeader>
          <NavContent>
            <Logo>
              <FaRing /> Wedding Bookings
            </Logo>
            <ActionButton primary onClick={() => navigate("/weddings")}>
              <FaHome />
              Back to Vendors
            </ActionButton>
          </NavContent>
        </NavHeader>
        <Container>
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <h2>Loading confirmation...</h2>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <NavHeader>
        <NavContent>
          <Logo>
            <FaRing /> Wedding Bookings
          </Logo>
          <ActionButtons>
            <ActionButton onClick={handleShare}>
              <FaShare />
              Share
            </ActionButton>
            <ActionButton onClick={handlePrint}>
              <FaPrint />
              Print
            </ActionButton>
            <ActionButton primary onClick={() => navigate('/weddings')}>
              <FaHome />
              Back to Vendors
            </ActionButton>
          </ActionButtons>
        </NavContent>
      </NavHeader>

      <Container>
        <ConfirmationCard>
          <SuccessHeader>
            <SuccessIcon>
              <FaCheck />
            </SuccessIcon>
            <SuccessTitle>Booking Request Confirmed!</SuccessTitle>
            <SuccessSubtitle>
              Your consultation request has been sent successfully
            </SuccessSubtitle>
            <BookingNumber>
              Booking #: {bookingDetails.bookingNumber}
            </BookingNumber>
          </SuccessHeader>

          <ContentSection>
            <VendorCard>
              <VendorHeader>
                <VendorImage src={vendor.image} alt={vendor.name} />
                <VendorInfo>
                  <VendorName>{vendor.name}</VendorName>
                  <VendorMeta>
                    <MetaItem>
                      <FaMapMarkerAlt />
                      {vendor.city}, {vendor.state}
                    </MetaItem>
                    <MetaItem>
                      <FaPhoneAlt />
                      {vendor.phone}
                    </MetaItem>
                    <MetaItem>
                      <FaEnvelope />
                      {vendor.email}
                    </MetaItem>
                  </VendorMeta>
                </VendorInfo>
              </VendorHeader>
            </VendorCard>

            <SectionTitle>
              <FaCalendarAlt />
              Booking Details
            </SectionTitle>
            <InfoGrid>
              <InfoCard>
                <InfoLabel>
                  <FaUser />
                  Contact Information
                </InfoLabel>
                <InfoValue>
                  <div>{bookingDetails.contactName}</div>
                  <div>{bookingDetails.email}</div>
                  <div>{bookingDetails.phone}</div>
                </InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>
                  <FaCalendarAlt />
                  Event Details
                </InfoLabel>
                <InfoValue>
                  <div>
                    {new Date(bookingDetails.eventDate).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </div>
                  <div>{bookingDetails.eventTime}</div>
                  <div>{bookingDetails.guestCount} guests</div>
                  <div>{bookingDetails.eventType}</div>
                </InfoValue>
              </InfoCard>
            </InfoGrid>

            {bookingDetails.services.length > 0 && (
              <>
                <SectionTitle>
                  <FaHeart />
                  Requested Services
                </SectionTitle>
                <InfoCard style={{ marginBottom: theme.spacing.xl }}>
                  <InfoValue>{bookingDetails.services.join(', ')}</InfoValue>
                </InfoCard>
              </>
            )}

            {bookingDetails.message && (
              <>
                <SectionTitle>Additional Information</SectionTitle>
                <InfoCard style={{ marginBottom: theme.spacing.xl }}>
                  <InfoValue>{bookingDetails.message}</InfoValue>
                </InfoCard>
              </>
            )}

            <NextStepsCard>
              <NextStepsTitle>What happens next?</NextStepsTitle>
              <StepsList>
                <StepItem>
                  <StepNumber>1</StepNumber>
                  <StepText>
                    <strong>{vendor.name}</strong> will review your request
                    within 24 hours
                  </StepText>
                </StepItem>
                <StepItem>
                  <StepNumber>2</StepNumber>
                  <StepText>
                    They'll contact you to schedule a consultation at your
                    convenience
                  </StepText>
                </StepItem>
                <StepItem>
                  <StepNumber>3</StepNumber>
                  <StepText>
                    During the consultation, you'll discuss your vision,
                    requirements, and budget
                  </StepText>
                </StepItem>
                <StepItem>
                  <StepNumber>4</StepNumber>
                  <StepText>
                    You'll receive a customized proposal and quote for your
                    wedding
                  </StepText>
                </StepItem>
              </StepsList>
            </NextStepsCard>

            <ButtonGroup>
              <Button primary onClick={() => navigate(`/${vendor.id}`)}>
                <FaRing />
                View Vendor Details
              </Button>
              <Button outline onClick={() => navigate('/weddings')}>
                <FaHome />
                Browse More Vendors
              </Button>
            </ButtonGroup>
          </ContentSection>
        </ConfirmationCard>
      </Container>
    </PageContainer>
  );
};

export default BookingConfirmation;
