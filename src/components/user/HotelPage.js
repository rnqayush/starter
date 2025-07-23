import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaCar,
  FaUtensils,
  FaDumbbell,
  FaSpa,
} from 'react-icons/fa';
import Header from '../shared/Header';
import { Button } from '../shared/Button';
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardSubtitle,
  Price,
  PriceUnit,
  Badge,
} from '../shared/Card';
import { theme } from '../../styles/GlobalStyle';
import { useAppContext } from '../../context/AppContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const HotelBanner = styled.section`
  position: relative;
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: end;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HotelName = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.125rem;
  margin-bottom: ${theme.spacing.md};
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.125rem;
`;

const TabsContainer = styled.div`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
  position: sticky;
  top: 70px;
  z-index: 10;
`;

const Tabs = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  overflow-x: auto;
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border: none;
  background: none;
  font-weight: 500;
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray600};
  border-bottom: 2px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray900};
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Description = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xl};
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
`;

const InfoCard = styled(Card)`
  height: fit-content;
`;

const InfoSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const InfoText = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.5;
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const RoomCard = styled(Card)`
  cursor: pointer;
`;

const RoomDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomPricing = styled.div`
  text-align: right;
`;

const RoomFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const getAmenityIcon = amenity => {
  const icons = {
    WiFi: <FaWifi />,
    Pool: <FaSwimmingPool />,
    Parking: <FaCar />,
    Restaurant: <FaUtensils />,
    Gym: <FaDumbbell />,
    Spa: <FaSpa />,
  };
  return icons[amenity] || <span>{amenity.charAt(0)}</span>;
};

const HotelPage = () => {
  const { id } = useParams();
  const { hotels } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');

  const hotel = hotels.find(h => h.id === parseInt(id));

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    return stars;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewGrid>
            <div>
              <SectionTitle>About This Hotel</SectionTitle>
              <Description>{hotel.description}</Description>

              <SectionTitle>Amenities</SectionTitle>
              <AmenitiesGrid>
                {hotel.amenities.map(amenity => (
                  <AmenityItem key={amenity}>
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </AmenityItem>
                ))}
              </AmenitiesGrid>
            </div>

            <InfoCard>
              <CardContent>
                <InfoSection>
                  <InfoTitle>Check-in / Check-out</InfoTitle>
                  <InfoText>Check-in: {hotel.checkInTime}</InfoText>
                  <InfoText>Check-out: {hotel.checkOutTime}</InfoText>
                </InfoSection>

                <InfoSection>
                  <InfoTitle>Hotel Policies</InfoTitle>
                  {hotel.policies.map((policy, index) => (
                    <InfoText key={index}>• {policy}</InfoText>
                  ))}
                </InfoSection>

                <InfoSection>
                  <InfoTitle>Contact</InfoTitle>
                  <InfoText>{hotel.address}</InfoText>
                  <InfoText>
                    {hotel.city}, {hotel.pincode}
                  </InfoText>
                </InfoSection>
              </CardContent>
            </InfoCard>
          </OverviewGrid>
        );

      case 'rooms':
        return (
          <div>
            <SectionTitle>Available Rooms</SectionTitle>
            <RoomsGrid>
              {hotel.rooms.map(room => (
                <Link key={room.id} to={`/room/${hotel.id}/${room.id}`}>
                  <RoomCard>
                    <CardImage src={room.images[0]} height="200px" />
                    <CardContent>
                      <RoomDetails>
                        <RoomInfo>
                          <CardTitle>{room.name}</CardTitle>
                          <CardSubtitle>
                            {room.bedType} • Up to {room.maxGuests} guests
                          </CardSubtitle>
                        </RoomInfo>
                        <RoomPricing>
                          <Price>
                            ₹{room.price.toLocaleString()}
                            <PriceUnit>/night</PriceUnit>
                          </Price>
                        </RoomPricing>
                      </RoomDetails>

                      <RoomFeatures>
                        {room.amenities.slice(0, 4).map(amenity => (
                          <Badge key={amenity} variant="primary">
                            {amenity}
                          </Badge>
                        ))}
                        {room.amenities.length > 4 && (
                          <Badge>+{room.amenities.length - 4} more</Badge>
                        )}
                      </RoomFeatures>

                      <Button variant="secondary" style={{ width: '100%' }}>
                        View Room Details
                      </Button>
                    </CardContent>
                  </RoomCard>
                </Link>
              ))}
            </RoomsGrid>
          </div>
        );

      case 'location':
        return (
          <div>
            <SectionTitle>Location</SectionTitle>
            <Card>
              <CardContent>
                <div
                  style={{
                    height: '400px',
                    background: theme.colors.gray200,
                    borderRadius: theme.borderRadius.md,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.colors.gray600,
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <FaMapMarkerAlt
                      size={48}
                      style={{ marginBottom: theme.spacing.md }}
                    />
                    <h3>{hotel.name}</h3>
                    <p>{hotel.address}</p>
                    <p>
                      {hotel.city}, {hotel.pincode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'reviews':
        return (
          <div>
            <SectionTitle>Reviews & Ratings</SectionTitle>
            <Card>
              <CardContent>
                <div
                  style={{ textAlign: 'center', padding: theme.spacing.xxl }}
                >
                  <div
                    style={{ fontSize: '3rem', marginBottom: theme.spacing.md }}
                  >
                    ⭐
                  </div>
                  <h3 style={{ marginBottom: theme.spacing.sm }}>
                    {hotel.rating} out of 5
                  </h3>
                  <p style={{ color: theme.colors.gray600 }}>
                    Based on guest reviews
                  </p>
                  <p
                    style={{
                      color: theme.colors.gray500,
                      marginTop: theme.spacing.lg,
                    }}
                  >
                    Reviews feature coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Header />

      <HotelBanner image={hotel.image}>
        <BannerContent>
          <HotelName>{hotel.name}</HotelName>
          <HotelLocation>
            <FaMapMarkerAlt />
            {hotel.location}
          </HotelLocation>
          <HotelRating>
            {renderStars(hotel.rating)}
            <span>
              {hotel.rating} ({hotel.starRating} star hotel)
            </span>
          </HotelRating>
        </BannerContent>
      </HotelBanner>

      <TabsContainer>
        <Tabs>
          <Tab
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Tab>
          <Tab
            active={activeTab === 'rooms'}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms
          </Tab>
          <Tab
            active={activeTab === 'location'}
            onClick={() => setActiveTab('location')}
          >
            Location
          </Tab>
          <Tab
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </Tab>
        </Tabs>
      </TabsContainer>

      <ContentSection>{renderTabContent()}</ContentSection>
    </PageContainer>
  );
};

export default HotelPage;
