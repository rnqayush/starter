import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaUsers,
  FaBed,
  FaWifi,
  FaTv,
  FaSnowflake,
} from 'react-icons/fa';
import Header from '../shared/Header';
import { Button } from '../shared/Button';
import { Card, CardContent, Badge } from '../shared/Card';
import { Input, FormGroup, Label, InputGroup } from '../shared/Input';
import { theme } from '../../styles/GlobalStyle';
import { useAppContext } from '../../context/AppContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  text-decoration: none;
  margin-bottom: ${theme.spacing.xl};
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.xl};
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
`;

const ThumbnailRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  overflow-x: auto;
`;

const Thumbnail = styled.img.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  opacity: ${props => (props.active ? 1 : 0.7)};
  border: 2px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const RoomDetails = styled.div``;

const RoomTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const RoomInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  font-weight: 500;
`;

const RoomDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xl};
`;

const AmenitiesSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray900};
`;

const AmenitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const BookingCard = styled(Card)`
  position: sticky;
  top: 100px;
  height: fit-content;
`;

const PriceDisplay = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const PriceUnit = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${theme.colors.gray600};
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const getAmenityIcon = amenity => {
  const icons = {
    WiFi: <FaWifi />,
    TV: <FaTv />,
    AC: <FaSnowflake />,
  };
  return icons[amenity] || <span>✓</span>;
};

const RoomPage = () => {
  const { hotelId, roomId } = useParams();
  const { hotels } = useAppContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
  });

  const hotel = hotels.find(h => h.id === parseInt(hotelId));
  const room = hotel?.rooms.find(r => r.id === parseInt(roomId));

  if (!hotel || !room) {
    return <div>Room not found</div>;
  }

  const handleInputChange = e => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 1;
  };

  const calculateTotal = () => {
    return room.price * calculateNights();
  };

  return (
    <PageContainer>
      <Header />

      <Container>
        <BackButton to={`/${hotel.slug}`}>
          <FaArrowLeft />
          Back to {hotel.name}
        </BackButton>

        <RoomGrid>
          <RoomDetails>
            <ImageCarousel>
              <MainImage
                src={room.images[selectedImageIndex]}
                alt={room.name}
              />
              <ThumbnailRow>
                {room.images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    src={image}
                    alt={`${room.name} ${index + 1}`}
                    active={selectedImageIndex === index}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </ThumbnailRow>
            </ImageCarousel>

            <RoomTitle>{room.name}</RoomTitle>

            <RoomInfo>
              <InfoItem>
                <FaUsers />
                Up to {room.maxGuests} guests
              </InfoItem>
              <InfoItem>
                <FaBed />
                {room.bedType}
              </InfoItem>
            </RoomInfo>

            <RoomDescription>{room.description}</RoomDescription>

            <AmenitiesSection>
              <SectionTitle>Room Amenities</SectionTitle>
              <AmenitiesList>
                {room.amenities.map(amenity => (
                  <Badge key={amenity} variant="primary">
                    {getAmenityIcon(amenity)} {amenity}
                  </Badge>
                ))}
              </AmenitiesList>
            </AmenitiesSection>
          </RoomDetails>

          <BookingCard>
            <CardContent>
              <PriceDisplay>
                <Price>
                  ₹{room.price.toLocaleString()}
                  <PriceUnit>/night</PriceUnit>
                </Price>
              </PriceDisplay>

              <BookingForm>
                <InputGroup columns="1fr 1fr">
                  <FormGroup>
                    <Label>Check-in</Label>
                    <Input
                      type="date"
                      name="checkIn"
                      value={bookingData.checkIn}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Check-out</Label>
                    <Input
                      type="date"
                      name="checkOut"
                      value={bookingData.checkOut}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </InputGroup>

                <FormGroup>
                  <Label>Guests</Label>
                  <Input
                    type="number"
                    name="guests"
                    min="1"
                    max={room.maxGuests}
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                {bookingData.checkIn && bookingData.checkOut && (
                  <div
                    style={{
                      padding: `${theme.spacing.md} 0`,
                      borderTop: `1px solid ${theme.colors.gray200}`,
                      borderBottom: `1px solid ${theme.colors.gray200}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      <span>
                        ₹{room.price.toLocaleString()} x {calculateNights()}{' '}
                        nights
                      </span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        fontSize: '1.125rem',
                      }}
                    >
                      <span>Total</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Button
                  as={Link}
                  to={`/booking/${hotelId}/${roomId}?checkIn=${bookingData.checkIn}&checkOut=${bookingData.checkOut}&guests=${bookingData.guests}`}
                  size="large"
                  disabled={!bookingData.checkIn || !bookingData.checkOut}
                  style={{ width: '100%' }}
                >
                  Book Now
                </Button>
              </BookingForm>
            </CardContent>
          </BookingCard>
        </RoomGrid>
      </Container>
    </PageContainer>
  );
};

export default RoomPage;
