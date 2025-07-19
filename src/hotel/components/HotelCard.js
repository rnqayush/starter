import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaCar,
  FaUtensils,
} from "react-icons/fa";
import { theme, media } from "../../styles/GlobalStyle";

const Card = styled(Link)`
  display: block;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }

  ${media.mobile} {
    border-radius: ${theme.borderRadius.md};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  }

  ${media.tablet} {
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const CardImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "image",
})`
  position: relative;
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  overflow: hidden;

  ${media.mobile} {
    height: 160px;
  }

  ${media.tablet} {
    height: 180px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

const StarRating = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.gray900};

  ${media.mobile} {
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.xs};
    font-size: 0.7rem;
  }
`;

const PriceBadge = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;

  ${media.mobile} {
    bottom: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.875rem;
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};

  ${media.mobile} {
    padding: ${theme.spacing.md};
  }

  ${media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

const HotelName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.3;

  ${media.mobile} {
    font-size: 1.125rem;
    margin-bottom: ${theme.spacing.xs};
  }

  ${media.tablet} {
    font-size: 1.2rem;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.md};

  ${media.mobile} {
    font-size: 0.8rem;
    gap: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const Description = styled.p`
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: 0.8rem;
    margin-bottom: ${theme.spacing.sm};
    -webkit-line-clamp: 3;
  }
`;

const Amenities = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;

  ${media.mobile} {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
  }
`;

const AmenityIcon = styled.div`
  color: ${theme.colors.primary};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.8rem;
  color: ${theme.colors.gray600};

  ${media.mobile} {
    font-size: 0.7rem;
    gap: ${theme.spacing.xs};

    svg {
      font-size: 0.75rem;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;

  ${media.mobile} {
    font-size: 0.8rem;
    gap: ${theme.spacing.xs};
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FaStar).withConfig({
  shouldForwardProp: (prop) => prop !== "filled",
})`
  color: ${(props) => (props.filled ? "#fbbf24" : theme.colors.gray300)};
  font-size: 0.8rem;

  ${media.mobile} {
    font-size: 0.7rem;
  }
`;

const HotelCard = ({ hotel }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= Math.floor(rating)} />);
    }
    return stars;
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      WiFi: FaWifi,
      Pool: FaSwimmingPool,
      Parking: FaCar,
      Restaurant: FaUtensils,
    };
    const IconComponent = iconMap[amenity];
    return IconComponent ? <IconComponent /> : null;
  };

  const topAmenities = hotel.amenities.slice(0, 4);

  return (
    <Card to={`/hotel/${hotel.id}`}>
      <CardImage image={hotel.image}>
        <ImageOverlay />
        <StarRating>
          <FaStar style={{ color: "#fbbf24" }} />
          {hotel.starRating}
        </StarRating>
        <PriceBadge>₹{hotel.startingPrice.toLocaleString()}+</PriceBadge>
      </CardImage>

      <CardContent>
        <HotelName>{hotel.name}</HotelName>

        <Location>
          <FaMapMarkerAlt />
          {hotel.location}
        </Location>

        <Description>{hotel.description}</Description>

        <Amenities>
          {topAmenities.map((amenity, index) => (
            <AmenityIcon key={index}>
              {getAmenityIcon(amenity)}
              {amenity}
            </AmenityIcon>
          ))}
        </Amenities>

        <Rating>
          <RatingStars>{renderStars(hotel.rating)}</RatingStars>
          <span>{hotel.rating}/5</span>
        </Rating>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
