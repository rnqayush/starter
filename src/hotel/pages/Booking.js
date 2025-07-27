import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaLock,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import HotelNavbar from '../components/HotelNavbar';
import HotelFooter from '../components/HotelFooter';
import { getHotelByIdOrSlug, getRoomById, fetchHotelData } from '../../DummyData/hotels';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${theme.spacing.xl};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:hover {
    transform: translateX(-4px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.lg};
    padding: ${theme.spacing.sm} 0;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.3;
  }
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.lg};
  }
`;

const BookingForm = styled.form`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    margin: 0 -${theme.spacing.xs};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.lg};
  }
`;

const BookingSummary = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  height: fit-content;
  position: sticky;
  top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    position: static;
    padding: ${theme.spacing.xl};
    margin: 0 -${theme.spacing.xs};
    order: -1;
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.lg};
  }
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xxl};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.xl};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.md};
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &.error {
    border-color: ${theme.colors.error};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    font-size: 1.1rem;
    border-radius: ${theme.borderRadius.lg};
    border-width: 2px;

    &:focus {
      border-width: 3px;
    }
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    font-size: 1.1rem;
    border-radius: ${theme.borderRadius.lg};
    border-width: 2px;

    &:focus {
      border-width: 3px;
    }
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    font-size: 1.1rem;
    border-radius: ${theme.borderRadius.lg};
    border-width: 2px;
    min-height: 120px;

    &:focus {
      border-width: 3px;
    }
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.8rem;
  margin-top: ${theme.spacing.xs};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const SummaryHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const HotelInfo = styled.div`
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    text-align: center;

    h3 {
      font-size: 1.4rem;
      font-weight: 700;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const BookingDetails = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  font-size: 0.9rem;

  .label {
    color: ${theme.colors.gray600};
  }

  .value {
    font-weight: 600;
    color: ${theme.colors.gray900};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};

    .label {
      font-weight: 600;
    }

    .value {
      font-weight: 700;
    }
  }
`;

const PriceBreakdown = styled.div`
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};

  &.total {
    font-weight: 600;
    font-size: 1.1rem;
    border-top: 1px solid ${theme.colors.gray300};
    padding-top: ${theme.spacing.md};
    margin-top: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.md};

    &.total {
      font-size: 1.3rem;
      font-weight: 700;
      padding-top: ${theme.spacing.lg};
    }
  }
`;

const BookButton = styled.button`
  width: 100%;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

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
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;

    &::before {
      display: none;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    font-size: 1.3rem;
    font-weight: 700;
    border-radius: ${theme.borderRadius.lg};
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 0.8rem;
  margin-top: ${theme.spacing.md};
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Booking = () => {
  const { slug, roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const initialBookingData = location.state?.bookingData || {
    checkIn: '',
    checkOut: '',
    guests: '2',
  };

  const [formData, setFormData] = useState({
    // Guest Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Booking Details
    checkIn: initialBookingData.checkIn,
    checkOut: initialBookingData.checkOut,
    guests: initialBookingData.guests,
    specialRequests: '',
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get hotel data
        let foundHotel = getHotelByIdOrSlug(slug);

        if (foundHotel) {
          // Simulate API call to get updated hotel data
          foundHotel = await fetchHotelData(foundHotel.id);

          // Get room data
          const foundRoom = foundHotel ? getRoomById(foundHotel.id, roomId) : null;

          setHotel(foundHotel);
          setRoom(foundRoom);
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
        setHotel(null);
        setRoom(null);
      }
    };

    fetchData();
  }, [slug, roomId]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'checkIn',
      'checkOut',
      'cardNumber',
      'expiryDate',
      'cvv',
      'cardName',
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      if (checkOut <= checkIn) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const calculateSubtotal = () => {
    return room ? room.price * calculateNights() : 0;
  };

  const calculateTaxes = () => {
    return calculateSubtotal() * 0.12; // 12% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate booking process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create booking object
      const booking = {
        id: Date.now(),

        roomId: parseInt(roomId),
        hotelName: hotel.name,
        roomName: room.name,
        ...formData,
        totalPrice: calculateTotal(),
        status: 'confirmed',
        bookingDate: new Date().toISOString().split('T')[0],
      };

      // Navigate to confirmation
      navigate(`/${slug}/bookingconfirmation`, {
        state: { booking },
      });
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!hotel || !room) {
    return (
      <PageContainer>
        <HotelNavbar />
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Booking not available</h2>
            <p>Please select a valid hotel and room.</p>
          </div>
        </Container>
        <HotelFooter />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HotelNavbar />

      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back to Room
        </BackButton>

        <PageTitle>Complete Your Booking</PageTitle>

        <BookingGrid>
          <BookingForm onSubmit={handleSubmit}>
            <Section>
              <SectionTitle>
                <FaUser />
                Guest Information
              </SectionTitle>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && (
                    <ErrorMessage>{errors.firstName}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && (
                    <ErrorMessage>{errors.lastName}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>
              </FormGrid>
            </Section>

            <Section>
              <SectionTitle>
                <FaCalendarAlt />
                Booking Details
              </SectionTitle>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="checkIn">Check-in Date</Label>
                  <Input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.checkIn ? 'error' : ''}
                  />
                  {errors.checkIn && (
                    <ErrorMessage>{errors.checkIn}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="checkOut">Check-out Date</Label>
                  <Input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn}
                    className={errors.checkOut ? 'error' : ''}
                  />
                  {errors.checkOut && (
                    <ErrorMessage>{errors.checkOut}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Guest{i > 0 ? 's' : ''}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginTop: theme.spacing.lg }}>
                <Label htmlFor="specialRequests">
                  Special Requests (Optional)
                </Label>
                <TextArea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or requests..."
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>
                <FaCreditCard />
                Payment Information
              </SectionTitle>
              <FormGrid>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={errors.cardNumber ? 'error' : ''}
                  />
                  {errors.cardNumber && (
                    <ErrorMessage>{errors.cardNumber}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className={errors.expiryDate ? 'error' : ''}
                  />
                  {errors.expiryDate && (
                    <ErrorMessage>{errors.expiryDate}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
                </FormGroup>

                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={errors.cardName ? 'error' : ''}
                  />
                  {errors.cardName && (
                    <ErrorMessage>{errors.cardName}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </Section>

            <BookButton type="submit" disabled={loading}>
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <FaLock />
                  Complete Booking
                </>
              )}
            </BookButton>

            <SecurityNote>
              <FaLock />
              Your payment information is secure and encrypted
            </SecurityNote>
          </BookingForm>

          <BookingSummary>
            <SummaryHeader>
              <HotelInfo>
                <h3>{hotel.name}</h3>
                <p>{hotel.location}</p>
              </HotelInfo>
            </SummaryHeader>

            <BookingDetails>
              <DetailRow>
                <span className="label">Room:</span>
                <span className="value">{room.name}</span>
              </DetailRow>
              <DetailRow>
                <span className="label">Check-in:</span>
                <span className="value">
                  {formData.checkIn
                    ? new Date(formData.checkIn).toLocaleDateString()
                    : '-'}
                </span>
              </DetailRow>
              <DetailRow>
                <span className="label">Check-out:</span>
                <span className="value">
                  {formData.checkOut
                    ? new Date(formData.checkOut).toLocaleDateString()
                    : '-'}
                </span>
              </DetailRow>
              <DetailRow>
                <span className="label">Guests:</span>
                <span className="value">{formData.guests}</span>
              </DetailRow>
              <DetailRow>
                <span className="label">Nights:</span>
                <span className="value">{calculateNights()}</span>
              </DetailRow>
            </BookingDetails>

            <PriceBreakdown>
              <PriceRow>
                <span>
                  ₹{room.price.toLocaleString()} × {calculateNights()} night
                  {calculateNights() > 1 ? 's' : ''}
                </span>
                <span>₹{calculateSubtotal().toLocaleString()}</span>
              </PriceRow>
              <PriceRow>
                <span>Taxes & fees</span>
                <span>₹{calculateTaxes().toLocaleString()}</span>
              </PriceRow>
              <PriceRow className="total">
                <span>Total</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </PriceRow>
            </PriceBreakdown>
          </BookingSummary>
        </BookingGrid>
      </Container>

      <HotelFooter />
    </PageContainer>
  );
};

export default Booking;
