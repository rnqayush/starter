import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaUsers,
  FaBed,
  FaWifi,
  FaTv,
  FaSnowflake,
  FaShareAlt,
  FaHeart,
  FaCheckCircle,
  FaCoffee,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import HotelNavbar from "../components/HotelNavbar";
import HotelFooter from "../components/HotelFooter";
import { getHotelById, getRoomById } from "../data/hotels";

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

  &:hover {
    transform: translateX(-4px);
  }
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const RoomContent = styled.div``;

const BookingCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  position: sticky;
  top: ${theme.spacing.xl};
  height: fit-content;
`;

const ImageGallery = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.md};
`;

const Thumbnail = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.active ? theme.colors.primary : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const RoomName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const RoomType = styled.div`
  display: inline-block;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.lg};
`;

const RoomDetails = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 1rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xl};
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

const AmenityIcon = styled.div`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;
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
`;

const PriceSummary = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};

  &.total {
    font-weight: 600;
    font-size: 1.1rem;
    border-top: 1px solid ${theme.colors.gray300};
    padding-top: ${theme.spacing.sm};
    margin-top: ${theme.spacing.sm};
  }
`;

const BookButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const RoomDetail = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  useEffect(() => {
    const foundHotel = getHotelById(hotelId);
    const foundRoom = getRoomById(hotelId, roomId);
    setHotel(foundHotel);
    setRoom(foundRoom);
  }, [hotelId, roomId]);

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      WiFi: FaWifi,
      TV: FaTv,
      AC: FaSnowflake,
      "Mini Bar": FaCoffee,
      "Room Service": FaCoffee,
    };
    const IconComponent = iconMap[amenity] || FaCheckCircle;
    return <IconComponent />;
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return room ? room.price * nights : 0;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    navigate(`/booking/${hotelId}/${roomId}`, {
      state: { bookingData },
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${room?.name} at ${hotel?.name}`,
        text: room?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Room link copied to clipboard!");
    }
  };

  if (!hotel || !room) {
    return (
      <PageContainer>
        <HotelNavbar />
        <Container>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Room not found</h2>
            <p>The room you're looking for doesn't exist.</p>
            <Link to="/hotels" style={{ color: theme.colors.primary }}>
              Back to Hotels
            </Link>
          </div>
        </Container>
        <HotelFooter />
      </PageContainer>
    );
  }

  const images = room.images || [room.image];

  return (
    <PageContainer>
      <HotelNavbar />

      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back to Hotel
        </BackButton>

        <RoomGrid>
          <RoomContent>
            <ImageGallery>
              <MainImage src={images[selectedImage]} alt={room.name} />
              {images.length > 1 && (
                <ThumbnailGrid>
                  {images.map((image, index) => (
                    <Thumbnail
                      key={index}
                      src={image}
                      alt={`${room.name} ${index + 1}`}
                      active={selectedImage === index}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </ThumbnailGrid>
              )}
            </ImageGallery>

            <RoomHeader>
              <RoomInfo>
                <RoomName>{room.name}</RoomName>
                <RoomType>{room.type}</RoomType>
                <RoomDetails>
                  <Detail>
                    <FaBed />
                    {room.bedType}
                  </Detail>
                  <Detail>
                    <FaUsers />
                    Up to {room.maxGuests} guests
                  </Detail>
                </RoomDetails>
                <Price>
                  ₹{room.price.toLocaleString()}{" "}
                  <span
                    style={{ fontSize: "1rem", color: theme.colors.gray600 }}
                  >
                    per night
                  </span>
                </Price>
              </RoomInfo>

              <RoomActions>
                <ActionButton onClick={handleShare} title="Share Room">
                  <FaShareAlt />
                </ActionButton>
                <ActionButton title="Add to Wishlist">
                  <FaHeart />
                </ActionButton>
              </RoomActions>
            </RoomHeader>

            <Description>{room.description}</Description>

            <Section>
              <SectionTitle>Room Amenities</SectionTitle>
              <AmenitiesGrid>
                {room.amenities?.map((amenity, index) => (
                  <AmenityItem key={index}>
                    <AmenityIcon>{getAmenityIcon(amenity)}</AmenityIcon>
                    <span>{amenity}</span>
                  </AmenityItem>
                ))}
              </AmenitiesGrid>
            </Section>
          </RoomContent>

          <BookingCard>
            <h3
              style={{
                marginBottom: theme.spacing.lg,
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              Book This Room
            </h3>

            <BookingForm onSubmit={handleBooking}>
              <FormGroup>
                <Label htmlFor="checkIn">Check-in Date</Label>
                <Input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={bookingData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="checkOut">Check-out Date</Label>
                <Input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={bookingData.checkOut}
                  onChange={handleInputChange}
                  min={
                    bookingData.checkIn ||
                    new Date().toISOString().split("T")[0]
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="guests">Number of Guests</Label>
                <Select
                  id="guests"
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleInputChange}
                >
                  {Array.from({ length: room.maxGuests }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              {bookingData.checkIn && bookingData.checkOut && (
                <PriceSummary>
                  <SummaryRow>
                    <span>
                      ₹{room.price.toLocaleString()} × {calculateNights()} night
                      {calculateNights() > 1 ? "s" : ""}
                    </span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </SummaryRow>
                  <SummaryRow className="total">
                    <span>Total</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </SummaryRow>
                </PriceSummary>
              )}

              <BookButton type="submit">Book Now</BookButton>
            </BookingForm>

            <p
              style={{
                fontSize: "0.8rem",
                color: theme.colors.gray500,
                textAlign: "center",
                marginTop: theme.spacing.md,
              }}
            >
              You won't be charged yet
            </p>
          </BookingCard>
        </RoomGrid>
      </Container>

      <HotelFooter />
    </PageContainer>
  );
};

export default RoomDetail;
