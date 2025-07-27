import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaBed,
  FaUsers,
  FaWifi,
  FaTv,
  FaCoffee,
  FaWind,
  FaExpand,
  FaHeart,
  FaShare,
  FaImages,
  FaCheckCircle,
  FaStar,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  border: 1px solid ${theme.colors.gray100};
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  ${media.mobile} {
    border-radius: ${theme.borderRadius.lg};

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }
  }

  ${media.tablet} {
    &:hover {
      transform: translateY(-6px);
    }
  }
`;

const CardImage = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'image',
})`
  height: 240px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    transition: background 0.3s ease;
  }

  &:hover::before {
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }

  ${media.mobile} {
    height: 180px;
  }

  ${media.tablet} {
    height: 200px;
  }
`;

const RoomType = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  z-index: 2;

  ${media.mobile} {
    top: ${theme.spacing.sm};
    left: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.7rem;
  }
`;

const ImageActions = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  display: flex;
  gap: ${theme.spacing.sm};
  z-index: 2;

  ${media.mobile} {
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    gap: ${theme.spacing.xs};
  }
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  color: ${theme.colors.gray700};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
    transform: scale(1.1);
  }

  ${media.mobile} {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  left: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 2;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  .icon {
    color: ${theme.colors.primary};
  }

  .text {
    font-size: 0.85rem;
    font-weight: 500;
    color: ${theme.colors.gray700};
  }

  ${media.mobile} {
    bottom: ${theme.spacing.sm};
    left: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    padding: ${theme.spacing.xs};

    .text {
      font-size: 0.75rem;
    }
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.xl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }

  ${media.tablet} {
    padding: ${theme.spacing.xl};
  }
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
  }

  ${media.tablet} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.3;

  ${media.mobile} {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.xs};
  }

  ${media.tablet} {
    font-size: 1.3rem;
  }
`;

const RoomDetails = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  flex-wrap: wrap;

  ${media.mobile} {
    gap: ${theme.spacing.md};
    font-size: 0.85rem;
    margin-bottom: ${theme.spacing.xs};
  }

  ${media.tablet} {
    gap: ${theme.spacing.lg};
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  ${media.mobile} {
    gap: ${theme.spacing.xs};

    svg {
      font-size: 0.8rem;
    }
  }
`;

const PriceContainer = styled.div`
  text-align: right;

  ${media.mobile} {
    text-align: left;
    margin-top: ${theme.spacing.sm};
  }

  ${media.tablet} {
    text-align: right;
    margin-top: 0;
  }
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.xs};

  .currency {
    font-size: 1.2rem;
  }

  ${media.mobile} {
    font-size: 1.5rem;

    .currency {
      font-size: 1rem;
    }
  }

  ${media.tablet} {
    font-size: 1.6rem;

    .currency {
      font-size: 1.1rem;
    }
  }
`;

const PriceUnit = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};

  ${media.mobile} {
    font-size: 0.75rem;
  }
`;

const Description = styled.p`
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.lg};

  ${media.mobile} {
    font-size: 0.85rem;
    margin-bottom: ${theme.spacing.md};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  ${media.tablet} {
    margin-bottom: ${theme.spacing.lg};
  }
`;

const Amenities = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: ${theme.spacing.lg};
  }
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  font-size: 0.85rem;
  padding: ${theme.spacing.xs} 0;

  .icon {
    color: ${theme.colors.success};
    font-size: 0.9rem;
  }

  ${media.mobile} {
    font-size: 0.8rem;
    gap: ${theme.spacing.xs};

    .icon {
      font-size: 0.8rem;
    }
  }
`;

const BookingActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  ${media.mobile} {
    flex-direction: column;
  }
`;

const BookButton = styled(Link)`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryDark}
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  min-height: 3rem;
  flex: 1;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  font-size: 0.95rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: 0.9rem;
    min-height: 2.75rem;

    &:hover {
      transform: translateY(-1px);
    }
  }

  ${media.tablet} {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
  }
`;

const ViewRoomButton = styled(Link)`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  text-decoration: none;
  flex: 0 0 auto;
  min-width: 120px;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-2px);
  }

  ${media.mobile} {
    min-height: 2.75rem;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
    min-width: 100px;

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

const RoomFeatures = styled.div`
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
`;

const FeatureTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  .icon {
    color: ${theme.colors.primary};
  }
`;

const RoomCard = ({ room, hotelId, hotelSlug }) => {
  const [isLiked, setIsLiked] = useState(false);

  const getAmenityIcon = amenity => {
    const iconMap = {
      WiFi: FaWifi,
      TV: FaTv,
      'Mini Bar': FaCoffee,
      'Room Service': FaCoffee,
      AC: FaWind,
      'Ocean View': FaExpand,
      'City View': FaExpand,
      'Mountain View': FaExpand,
      'Heritage Decor': FaStar,
      Balcony: FaExpand,
      'Work Desk': FaTv,
      'Butler Service': FaCoffee,
      'Living Room': FaExpand,
    };
    const IconComponent = iconMap[amenity] || FaCheckCircle;
    return <IconComponent className="icon" />;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: room.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    // alert('Room link copied to clipboard!');
    }
  };

  return (
    <Card>
      <CardImage
        image={
          room.images?.[0] ||
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3'
        }
      >
        <RoomType>{room.type}</RoomType>
        <ImageActions>
          <ActionButton
            onClick={handleLike}
            style={{ color: isLiked ? '#ef4444' : undefined }}
          >
            <FaHeart />
          </ActionButton>
          <ActionButton onClick={handleShare}>
            <FaShare />
          </ActionButton>
        </ImageActions>
        <ImageOverlay>
          <FaImages className="icon" />
          <span className="text">{room.images?.length || 3} Photos</span>
        </ImageOverlay>
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
            <Price>
              <span className="currency">₹</span>
              {room.price.toLocaleString()}
            </Price>
            <PriceUnit>per night</PriceUnit>
          </PriceContainer>
        </RoomHeader>

        <Description>{room.description}</Description>

        <RoomFeatures>
          <FeatureTitle>
            <FaCheckCircle className="icon" />
            Room Features
          </FeatureTitle>
          <Amenities>
            {room.amenities?.slice(0, 6).map((amenity, index) => (
              <AmenityItem key={index}>
                {getAmenityIcon(amenity)}
                {amenity}
              </AmenityItem>
            ))}
          </Amenities>
        </RoomFeatures>

        <BookingActions>
          <BookButton to={`booking/${room.id}`}>Book Now</BookButton>
          <ViewRoomButton to={`${room.id}`}>
            <FaExpand />
            View Room
          </ViewRoomButton>
        </BookingActions>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
