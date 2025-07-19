import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Header from "../shared/Header";
import { Button } from "../shared/Button";
import { Card, CardContent } from "../shared/Card";
import { Input, FormGroup, Label, TextArea, InputGroup } from "../shared/Input";
import { theme } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  background: none;
  border: none;
  margin-bottom: ${theme.spacing.xl};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xxl};
  color: ${theme.colors.gray900};
  text-align: center;
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray900};
`;

const SummaryCard = styled(Card)`
  position: sticky;
  top: 100px;
  height: fit-content;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.gray200};

  &:last-child {
    border-bottom: none;
    font-weight: 600;
    font-size: 1.125rem;
    color: ${theme.colors.primary};
  }
`;

const HotelInfo = styled.div`
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const HotelName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const RoomName = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.sm};
`;

const DateInfo = styled.p`
  color: ${theme.colors.gray700};
  font-size: 0.875rem;
`;

const SuccessModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SuccessContent = styled(Card)`
  max-width: 500px;
  margin: ${theme.spacing.md};
  text-align: center;
`;

const SuccessIcon = styled.div`
  color: ${theme.colors.success};
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
`;

const SuccessTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const SuccessMessage = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const BookingPage = () => {
  const { hotelId, roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { hotels, bookings, setBookings } = useAppContext();

  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.search);
  const checkIn = urlParams.get("checkIn");
  const checkOut = urlParams.get("checkOut");
  const guests = urlParams.get("guests");

  const hotel = hotels.find((h) => h.id === parseInt(hotelId));
  const room = hotel?.rooms.find((r) => r.id === parseInt(roomId));

  if (!hotel || !room || !checkIn || !checkOut) {
    return <div>Invalid booking data</div>;
  }

  const calculateNights = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateTotal = () => {
    return room.price * calculateNights();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(),
      userId: "current-user",
      hotelId: parseInt(hotelId),
      roomId: parseInt(roomId),
      hotelName: hotel.name,
      roomName: room.name,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      totalPrice: calculateTotal(),
      status: "pending",
      bookingDate: new Date().toISOString().split("T")[0],
      guestName: formData.fullName,
      guestEmail: formData.email,
      guestPhone: formData.phone,
      specialRequests: formData.specialRequests,
    };

    setBookings([...bookings, newBooking]);
    setShowSuccess(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/my-bookings");
  };

  return (
    <PageContainer>
      <Header />

      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </BackButton>

        <PageTitle>Complete Your Booking</PageTitle>

        <BookingGrid>
          <Card>
            <CardContent>
              <SectionTitle>Guest Information</SectionTitle>
              <BookingForm onSubmit={handleSubmit}>
                <InputGroup>
                  <FormGroup>
                    <Label>Full Name *</Label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </FormGroup>
                </InputGroup>

                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Special Requests (Optional)</Label>
                  <TextArea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requests or requirements..."
                  />
                </FormGroup>

                <Button type="submit" size="large" style={{ width: "100%" }}>
                  Confirm Booking
                </Button>
              </BookingForm>
            </CardContent>
          </Card>

          <SummaryCard>
            <CardContent>
              <SectionTitle>Booking Summary</SectionTitle>

              <HotelInfo>
                <HotelName>{hotel.name}</HotelName>
                <RoomName>{room.name}</RoomName>
                <DateInfo>
                  {formatDate(checkIn)} - {formatDate(checkOut)}
                </DateInfo>
                <DateInfo>
                  {guests} guest{guests > 1 ? "s" : ""}
                </DateInfo>
              </HotelInfo>

              <SummaryItem>
                <span>
                  ₹{room.price.toLocaleString()} x {calculateNights()} night
                  {calculateNights() > 1 ? "s" : ""}
                </span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </SummaryItem>

              <SummaryItem>
                <span>Total Amount</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </SummaryItem>
            </CardContent>
          </SummaryCard>
        </BookingGrid>
      </Container>

      {showSuccess && (
        <SuccessModal onClick={handleSuccessClose}>
          <SuccessContent onClick={(e) => e.stopPropagation()}>
            <CardContent>
              <SuccessIcon>
                <FaCheckCircle />
              </SuccessIcon>
              <SuccessTitle>Booking Submitted!</SuccessTitle>
              <SuccessMessage>
                Your booking request has been sent to {hotel.name}. You will
                receive a confirmation email once the hotel reviews your
                request.
              </SuccessMessage>
              <Button onClick={handleSuccessClose} size="large">
                View My Bookings
              </Button>
            </CardContent>
          </SuccessContent>
        </SuccessModal>
      )}
    </PageContainer>
  );
};

export default BookingPage;
