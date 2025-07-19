import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBed, FaUsers, FaWifi, FaTv, FaCoffee } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.gray200};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const RoomType = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const RoomDetails = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const PriceContainer = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const PriceUnit = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const Description = styled.p`
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.lg};
`;

const Amenities = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.8rem;
`;

const BookButton = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  display: block;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const RoomCard = ({ room, hotelId }) => {
  const getAmenityIcon = (amenity) => {
    const iconMap = {
      WiFi: FaWifi,
      TV: FaTv,
      "Mini Bar": FaCoffee,
      "Room Service": FaCoffee,
    };
    const IconComponent = iconMap[amenity];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <Card>
      <CardImage
        image={
          room.images?.[0] ||
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3"
        }
      >
        <RoomType>{room.type}</RoomType>
      </CardImage>

      <CardContent>
        <RoomHeader>
          <RoomInfo>
            <RoomName>{room.name}</RoomName>
            <RoomDetails>
              <Detail>
                <FaBed />
                {room.bedType}
              </Detail>
              <Detail>
                <FaUsers />
                {room.maxGuests} guests
              </Detail>
            </RoomDetails>
          </RoomInfo>

          <PriceContainer>
            <Price>₹{room.price.toLocaleString()}</Price>
            <PriceUnit>per night</PriceUnit>
          </PriceContainer>
        </RoomHeader>

        <Description>{room.description}</Description>

        <Amenities>
          {room.amenities?.slice(0, 6).map((amenity, index) => (
            <AmenityItem key={index}>
              {getAmenityIcon(amenity)}
              {amenity}
            </AmenityItem>
          ))}
        </Amenities>

        <BookButton to={`/booking/${hotelId}/${room.id}`}>Book Now</BookButton>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
