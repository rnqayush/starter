import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStar, FaHeart, FaEnvelope, FaCar, FaGasPump, FaRoad } from "react-icons/fa";
import { theme, media } from "../../styles/GlobalStyle";
import EnquiryModal from "./EnquiryModal";
import { getAvailabilityStatus, getAvailabilityLabel, getAvailabilityColor } from "../data/vehicles";

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  transition: all 0.4s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.gray100};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary}20;
  }

  ${media.mobile} {
    border-radius: ${theme.borderRadius.md};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  }

  ${media.tablet} {
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 280px;

  ${media.mobile} {
    height: 240px;
  }

  ${media.tablet} {
    height: 260px;
  }
`;

const VehicleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "type",
})`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: ${(props) =>
    props.type === "sale" ? theme.colors.error : 
    props.type === "featured" ? theme.colors.success :
    props.type === "new" ? theme.colors.primary :
    props.type === "certified" ? theme.colors.warning : theme.colors.gray600};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;

  ${media.mobile} {
    top: ${theme.spacing.sm};
    left: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.xs};
    font-size: 0.7rem;
  }
`;

const ConditionBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.lg + 40}px;
  background: ${(props) => 
    props.condition === "new" ? theme.colors.success :
    props.condition === "used" ? theme.colors.warning :
    props.condition === "certified" ? theme.colors.primary :
    theme.colors.gray600};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;

  ${media.mobile} {
    top: ${theme.spacing.sm};
    right: ${theme.spacing.lg + 36}px;
    font-size: 0.65rem;
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.white};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray400};
  transition: all 0.2s ease;
  opacity: 0;
  border: none;
  cursor: pointer;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    color: ${theme.colors.error};
    transform: scale(1.1);
  }

  ${media.mobile} {
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    width: 32px;
    height: 32px;
    opacity: 1;

    &:hover {
      transform: none;
    }
  }

  ${media.tablet} {
    width: 34px;
    height: 34px;
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    padding: ${theme.spacing.md};
  }

  ${media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

const VehicleHeader = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

const YearMake = styled.span`
  color: ${theme.colors.gray500};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${media.mobile} {
    font-size: 0.8rem;
  }
`;

const VehicleName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: ${theme.spacing.xs} 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: 1.1rem;
  }
`;

const VehicleSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.md} 0;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs};
  }
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.8rem;
  color: ${theme.colors.gray600};

  .icon {
    color: ${theme.colors.primary};
    font-size: 0.9rem;
  }

  ${media.mobile} {
    font-size: 0.75rem;
    
    .icon {
      font-size: 0.8rem;
    }
  }
`;

const Description = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;

  ${media.mobile} {
    font-size: 0.8rem;
    margin-bottom: ${theme.spacing.sm};
    -webkit-line-clamp: 3;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};

  ${media.mobile} {
    gap: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FaStar).withConfig({
  shouldForwardProp: (prop) => prop !== "filled",
})`
  color: ${(props) => (props.filled ? "#fbbf24" : theme.colors.gray300)};
  font-size: 0.8rem;
`;

const ReviewCount = styled.span`
  color: ${theme.colors.gray500};
  font-size: 0.8rem;

  ${media.mobile} {
    font-size: 0.7rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};

  ${media.mobile} {
    gap: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.md};
    flex-wrap: wrap;
  }
`;

const CurrentPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${theme.colors.primary};

  ${media.mobile} {
    font-size: 1.2rem;
  }

  ${media.tablet} {
    font-size: 1.3rem;
  }
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: ${theme.colors.gray500};
  text-decoration: line-through;

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;

const Discount = styled.span`
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.7rem;
  font-weight: 600;

  ${media.mobile} {
    font-size: 0.65rem;
    padding: 1px 4px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  ${media.mobile} {
    gap: ${theme.spacing.xs};
  }
`;

const EnquireButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;

  &:hover {
    background: linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%);
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  ${media.mobile} {
    padding: ${theme.spacing.sm};
    gap: ${theme.spacing.xs};
    font-size: 0.875rem;

    &:hover {
      transform: none;
    }
  }
`;

const StockIndicator = styled.div.withConfig({
  shouldForwardProp: (prop) => !["availability", "color"].includes(prop),
})`
  color: ${(props) => props.color || theme.colors.gray600};
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};

  ${media.mobile} {
    font-size: 0.7rem;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const VehicleCard = ({
  vehicle,
  onToggleWishlist,
  isInWishlist = false,
  dealerSlug = "",
}) => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= Math.floor(rating)} />);
    }
    return stars;
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const handleEnquireClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEnquiryModalOpen(true);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(vehicle);
  };

  const getBaseUrl = () => (dealerSlug ? `/${dealerSlug}` : "/automobiles");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    if (mileage === 0) return "New";
    return new Intl.NumberFormat("en-US").format(mileage) + " miles";
  };

  const availabilityStatus = getAvailabilityStatus(vehicle);
  const availabilityLabel = getAvailabilityLabel(availabilityStatus);
  const availabilityColor = getAvailabilityColor(availabilityStatus);

  return (
    <Link to={`${getBaseUrl()}/vehicle/${vehicle.id}`}>
      <Card>
        <ImageContainer>
          <VehicleImage src={vehicle.image} alt={vehicle.name} />

          {vehicle.onSale && vehicle.originalPrice && (
            <Badge type="sale">Sale</Badge>
          )}

          {vehicle.featured && !vehicle.onSale && (
            <Badge type="featured">Featured</Badge>
          )}

          {vehicle.condition && (
            <ConditionBadge condition={vehicle.condition}>
              {vehicle.condition === "new" ? "New" : 
               vehicle.condition === "certified" ? "Certified" : 
               vehicle.condition === "restored" ? "Restored" : "Used"}
            </ConditionBadge>
          )}

          <WishlistButton
            onClick={handleWishlistToggle}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FaHeart
              style={{
                color: isInWishlist ? theme.colors.error : "currentColor",
              }}
            />
          </WishlistButton>
        </ImageContainer>

        <CardContent>
          <VehicleHeader>
            <YearMake>{vehicle.year} {vehicle.make}</YearMake>
            <VehicleName>{vehicle.model} {vehicle.trim}</VehicleName>
          </VehicleHeader>

          <VehicleSpecs>
            <SpecItem>
              <FaCar className="icon" />
              <span>{vehicle.specifications?.engine || "N/A"}</span>
            </SpecItem>
            <SpecItem>
              <FaGasPump className="icon" />
              <span>{vehicle.specifications?.fuelEconomy || vehicle.specifications?.range || "N/A"}</span>
            </SpecItem>
            <SpecItem>
              <FaRoad className="icon" />
              <span>{formatMileage(vehicle.mileage)}</span>
            </SpecItem>
          </VehicleSpecs>

          <Description>{vehicle.description}</Description>

          <RatingContainer>
            <StarRating>{renderStars(vehicle.rating)}</StarRating>
            <ReviewCount>({vehicle.reviews} reviews)</ReviewCount>
          </RatingContainer>

          <PriceContainer>
            <CurrentPrice>{formatPrice(vehicle.price)}</CurrentPrice>
            {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
              <>
                <OriginalPrice>{formatPrice(vehicle.originalPrice)}</OriginalPrice>
                <Discount>
                  -{calculateDiscount(vehicle.originalPrice, vehicle.price)}%
                </Discount>
              </>
            )}
          </PriceContainer>

          <StockIndicator
            availability={availabilityStatus}
            color={availabilityColor}
          >
            {availabilityStatus === "in_stock" && vehicle.stock > 0
              ? `${vehicle.stock} available`
              : availabilityLabel}
          </StockIndicator>

          <ActionButtons>
            <EnquireButton
              onClick={handleEnquireClick}
              disabled={availabilityStatus === "out_of_stock"}
            >
              <FaEnvelope />
              {availabilityStatus === "out_of_stock" ? "Not Available" : "Get Quote"}
            </EnquireButton>
          </ActionButtons>
        </CardContent>
      </Card>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        vehicle={vehicle}
      />
    </Link>
  );
};

export default VehicleCard;
