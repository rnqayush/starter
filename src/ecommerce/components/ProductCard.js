import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStar, FaHeart, FaEnvelope } from "react-icons/fa";
import { theme, media } from "../../styles/GlobalStyle";
import EnquiryModal from "./EnquiryModal";

const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
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
  height: 240px;

  ${media.mobile} {
    height: 200px;
  }

  ${media.tablet} {
    height: 220px;
  }
`;

const ProductImage = styled.img`
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
    props.type === "sale" ? theme.colors.error : theme.colors.success};
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

const Category = styled.span`
  color: ${theme.colors.gray500};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${theme.spacing.xs};

  ${media.mobile} {
    font-size: 0.7rem;
  }
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.xs};
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
  font-size: 1.3rem;
  font-weight: 700;
  color: ${theme.colors.primary};

  ${media.mobile} {
    font-size: 1.1rem;
  }

  ${media.tablet} {
    font-size: 1.2rem;
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
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
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
  shouldForwardProp: (prop) => prop !== "inStock",
})`
  color: ${(props) =>
    props.inStock ? theme.colors.success : theme.colors.error};
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};

  ${media.mobile} {
    font-size: 0.7rem;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const ProductCard = ({
  product,
  onToggleWishlist,
  isInWishlist = false,
  storeSlug = "",
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
    onToggleWishlist?.(product);
  };

  const getBaseUrl = () => (storeSlug ? `/${storeSlug}` : "/ecommerce");

  return (
    <Link to={`${getBaseUrl()}/product/${product.id}`}>
      <Card>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.name} />

          {product.onSale && product.originalPrice && (
            <Badge type="sale">Sale</Badge>
          )}

          {product.featured && !product.onSale && (
            <Badge type="featured">Featured</Badge>
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
          <Category>{product.category.replace("-", " ")}</Category>
          <ProductName>{product.name}</ProductName>
          <Description>{product.description}</Description>

          <RatingContainer>
            <StarRating>{renderStars(product.rating)}</StarRating>
            <ReviewCount>({product.reviews} reviews)</ReviewCount>
          </RatingContainer>

          <PriceContainer>
            <CurrentPrice>${product.price}</CurrentPrice>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
                <Discount>
                  -{calculateDiscount(product.originalPrice, product.price)}%
                </Discount>
              </>
            )}
          </PriceContainer>

          <StockIndicator inStock={product.stock > 0}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </StockIndicator>

          <ActionButtons>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <FaShoppingCart />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </AddToCartButton>
          </ActionButtons>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
