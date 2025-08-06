import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaPrint,
  FaDownload,
  FaHotel,
} from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import HotelNavbar from '../components/HotelNavbar';
import HotelFooter from '../components/HotelFooter';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const SuccessCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: ${theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.xl};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .icon {
    font-size: 3rem;
    color: ${theme.colors.white};
  }
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const SuccessMessage = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.6;
`;

const BookingNumber = styled.div`
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
  border-left: 4px solid ${theme.colors.primary};

  .label {
    font-size: 0.9rem;
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.xs};
  }

  .number {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    font-family: monospace;
  }
`;

const BookingDetails = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
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
  border-left: 3px solid ${theme.colors.primary};

  .icon {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    font-size: 1.2rem;
  }

  .title {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }

  .content {
    color: ${theme.colors.gray700};
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
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
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${props =>
      props.primary ? theme.colors.primaryDark : theme.colors.gray50};
    transform: translateY(-1px);
  }
`;

const NextSteps = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const StepsList = styled.ol`
  list-style: none;
  padding: 0;
  counter-reset: step-counter;
`;

const StepItem = styled.li`
  counter-increment: step-counter;
  position: relative;
  padding-left: 3rem;
  margin-bottom: ${theme.spacing.lg};

  &::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .step-title {
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.xs};
  }

  .step-content {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-align: center;

  h3 {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray900};
  }

  .contact-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.gray700};
  }
`;

const ContinueButton = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.md};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking || {
    id: Date.now(),
    hotelName: 'Sample Hotel',
    roomName: 'Sample Room',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    totalPrice: 10000,
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Mock download functionality
    alert('Booking confirmation download would start here');
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <PageContainer>
      <HotelNavbar />

      <Container>
        <SuccessCard>
          <SuccessIcon>
            <FaCheckCircle className="icon" />
          </SuccessIcon>

          <SuccessTitle>Booking Confirmed!</SuccessTitle>
          <SuccessMessage>
            Great news! Your hotel reservation has been successfully confirmed.
            We've sent a confirmation email to {booking.email}.
          </SuccessMessage>

          <BookingNumber>
            <div className="label">Confirmation Number</div>
            <div className="number">HTL-{booking.id}</div>
          </BookingNumber>

          <ActionButtons>
            <ActionButton onClick={handlePrint}>
              <FaPrint />
              Print Confirmation
            </ActionButton>
            <ActionButton onClick={handleDownload}>
              <FaDownload />
              Download PDF
            </ActionButton>
          </ActionButtons>

          <ContinueButton to="/hotels">
            <FaHotel />
            Browse More Hotels
          </ContinueButton>
        </SuccessCard>

        <BookingDetails>
          <SectionTitle>Booking Information</SectionTitle>

          <InfoGrid>
            <InfoCard>
              <FaHotel className="icon" />
              <div className="title">Hotel & Room</div>
              <div className="content">
                <strong>{booking.hotelName}</strong>
                <br />
                {booking.roomName}
              </div>
            </InfoCard>

            <InfoCard>
              <FaCalendarAlt className="icon" />
              <div className="title">Check-in</div>
              <div className="content">
                <strong>{formatDate(booking.checkIn)}</strong>
                <br />
                From 3:00 PM
              </div>
            </InfoCard>

            <InfoCard>
              <FaCalendarAlt className="icon" />
              <div className="title">Check-out</div>
              <div className="content">
                <strong>{formatDate(booking.checkOut)}</strong>
                <br />
                Before 11:00 AM
              </div>
            </InfoCard>

            <InfoCard>
              <FaUsers className="icon" />
              <div className="title">Guest Details</div>
              <div className="content">
                <strong>
                  {booking.firstName} {booking.lastName}
                </strong>
                <br />
                {booking.guests} Guest{booking.guests > 1 ? 's' : ''} •{' '}
                {calculateNights()} Night{calculateNights() > 1 ? 's' : ''}
              </div>
            </InfoCard>
          </InfoGrid>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: theme.spacing.lg,
              borderTop: `1px solid ${theme.colors.gray200}`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: theme.colors.gray600,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Total Amount Paid
              </div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}
              >
                ₹{booking.totalPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </BookingDetails>

        <NextSteps>
          <SectionTitle>What's Next?</SectionTitle>
          <StepsList>
            <StepItem>
              <div className="step-title">Check Your Email</div>
              <div className="step-content">
                We've sent a detailed confirmation to {booking.email} with all
                your booking information.
              </div>
            </StepItem>
            <StepItem>
              <div className="step-title">Prepare for Your Trip</div>
              <div className="step-content">
                Remember to bring a valid ID and the credit card used for
                booking during check-in.
              </div>
            </StepItem>
            <StepItem>
              <div className="step-title">Contact the Hotel</div>
              <div className="step-content">
                If you have any special requests or need to modify your booking,
                contact the hotel directly.
              </div>
            </StepItem>
          </StepsList>

          <ContactInfo>
            <h3>Need Help?</h3>
            <div className="contact-item">
              <FaPhone />
              <span>Customer Support: +91 1800-HOTELS</span>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <span>Email: support@hotelbooker.com</span>
            </div>
          </ContactInfo>
        </NextSteps>
      </Container>

      <HotelFooter />
    </PageContainer>
  );
};

export default BookingConfirmation;
