import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaDirections,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const Card = styled(Link)`
  display: block;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  border: 1px solid ${theme.colors.gray200};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
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
    rgba(0, 0, 0, 0.4) 100%
  );
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const DistanceBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.9);
  color: ${theme.colors.gray900};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
`;

const LogoContainer = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  left: ${theme.spacing.md};
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.white};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const StoreHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const StoreName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.3;
`;

const StoreRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const StarContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FaStar)`
  color: #fbbf24;
  font-size: 0.9rem;
`;

const RatingText = styled.span`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const StoreAddress = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.md};
  line-height: 1.4;
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
`;

const Specialties = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const SpecialtyTag = styled.span`
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 500;
`;

const StoreInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.gray200};
`;

const Hours = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.8rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};

  &:hover {
    background: ${theme.colors.gray100};
    transform: translateX(2px);
  }
`;

const StoreCard = ({ store, category }) => {
  const navigate = useNavigate();

  const handleStoreClick = (e) => {
    e.preventDefault();
    if (category === "ecommerce") {
      // Navigate to /ecommerce with vendor data in state
      navigate("/ecommerce", { state: { selectedVendor: store } });
    } else {
      // For other categories, navigate normally
      navigate(`/${category}/${store.id}`);
    }
  };

  const getStoreLink = () => {
    if (category === "ecommerce") {
      // Return # since we're handling navigation via onClick
      return "#";
    }

    // For other categories, return the original link format
    return `/${category}/${store.id}`;
  };
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} />);
    }
    return stars;
  };

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
    const currentTime = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const todayHours = store.hours[currentDay];

    if (todayHours === "Closed" || todayHours === "By Appointment") {
      return { status: "Closed", text: todayHours };
    }

    // Simple open/closed logic (can be enhanced)
    return {
      status: "Open",
      text: `Open until ${todayHours?.split(" - ")[1] || "9:00 PM"}`,
    };
  };

  const handleDirections = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const address = encodeURIComponent(
      `${store.address}, ${store.city}, ${store.state} ${store.zipCode}`,
    );
    window.open(`https://maps.google.com/maps?q=${address}`, "_blank");
  };

  const handleCall = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`tel:${store.phone}`, "_self");
  };

  const currentStatus = getCurrentStatus();

  return (
    <Card
      to={getStoreLink()}
      onClick={category === "ecommerce" ? handleStoreClick : undefined}
    >
      <CardImage image={store.image}>
        <ImageOverlay />
        {store.featured && <FeaturedBadge>Featured</FeaturedBadge>}
        <DistanceBadge>{store.distance} mi</DistanceBadge>
        <LogoContainer>
          <Logo src={store.logo} alt={`${store.name} logo`} />
        </LogoContainer>
      </CardImage>

      <CardContent>
        <StoreHeader>
          <StoreName>{store.name}</StoreName>
          <StoreRating>
            <StarContainer>{renderStars(store.rating)}</StarContainer>
            <RatingText>
              {store.rating} ({store.reviewCount} reviews)
            </RatingText>
          </StoreRating>
        </StoreHeader>

        <StoreAddress>
          <FaMapMarkerAlt style={{ marginTop: "2px", flexShrink: 0 }} />
          <span>
            {store.address}, {store.city}, {store.state}
          </span>
        </StoreAddress>

        <Description>{store.description}</Description>

        <Specialties>
          {store.specialties.slice(0, 3).map((specialty, index) => (
            <SpecialtyTag key={index}>{specialty}</SpecialtyTag>
          ))}
          {store.specialties.length > 3 && (
            <SpecialtyTag>+{store.specialties.length - 3} more</SpecialtyTag>
          )}
        </Specialties>

        <StoreInfo>
          <Hours>
            <FaClock />
            <span
              style={{
                color:
                  currentStatus.status === "Open"
                    ? theme.colors.success
                    : theme.colors.error,
              }}
            >
              {currentStatus.text}
            </span>
          </Hours>

          <div style={{ display: "flex", gap: theme.spacing.sm }}>
            <ActionButton onClick={handleCall} title="Call Store">
              <FaPhone />
              Call
            </ActionButton>
            <ActionButton onClick={handleDirections} title="Get Directions">
              <FaDirections />
              Directions
            </ActionButton>
          </div>
        </StoreInfo>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
