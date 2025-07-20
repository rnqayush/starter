import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FaStar,
  FaHeart,
  FaEnvelope,
  FaShare,
  FaArrowLeft,
  FaCheck,
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
  FaUser,
  FaStore,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EnquiryModal from "../components/EnquiryModal";
import { getProductById, products } from "../data/products";
import { getVendorByIdOrSlug } from "../data/vendors";

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

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};

  a {
    color: ${theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${theme.spacing.lg};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const MainImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${theme.spacing.sm};
`;

const Thumbnail = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.active ? theme.colors.primary : theme.colors.gray200)};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ProductInfo = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  height: fit-content;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.3;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FaStar).withConfig({
  shouldForwardProp: (prop) => prop !== "filled",
})`
  color: ${(props) => (props.filled ? "#fbbf24" : theme.colors.gray300)};
  font-size: 1rem;
`;

const ReviewInfo = styled.span`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1.3rem;
  color: ${theme.colors.gray500};
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const Features = styled.div`
  margin-bottom: ${theme.spacing.lg};

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xs};
  font-size: 0.9rem;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: ${theme.colors.success};
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const VariantSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const VariantOptions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const VariantOption = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "selected",
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid
    ${(props) => (props.selected ? theme.colors.primary : theme.colors.gray200)};
  background: ${(props) =>
    props.selected ? theme.colors.primary : theme.colors.white};
  color: ${(props) =>
    props.selected ? theme.colors.white : theme.colors.gray700};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const StockInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "inStock",
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  color: ${(props) =>
    props.inStock ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const QuantityLabel = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: ${theme.colors.gray100};
  border: none;
  padding: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.gray200};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  text-align: center;
  width: 60px;
  font-weight: 600;

  &:focus {
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
  }
`;

const WishlistButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${theme.colors.error};
    color: ${theme.colors.error};
  }
`;

const ShareButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const Guarantees = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
`;

const GuaranteeItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
`;

const RelatedSection = styled.section`
  margin-top: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
`;

const SellerInfo = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

const SellerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const SellerLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const SellerDetails = styled.div`
  flex: 1;
`;

const SellerName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const SellerBadge = styled.span`
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const SellerMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const SellerMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeSlug, setStoreSlug] = useState("");
  const [vendor, setVendor] = useState(null);

  // Detect store slug from URL
  useEffect(() => {
    const path = location.pathname;
    if (path !== `/ecommerce/product/${id}`) {
      // Extract store slug from URL like "/techmart-downtown/product/4"
      const pathSegments = path.split("/").filter(Boolean);
      const slug = pathSegments[0];
      const foundVendor = getVendorByIdOrSlug(slug);
      if (foundVendor) {
        setStoreSlug(foundVendor.slug);
        setVendor(foundVendor);
      }
    }
  }, [location.pathname, id]);

  useEffect(() => {
    setLoading(true);
    const foundProduct = getProductById(id);

    if (foundProduct) {
      setProduct(foundProduct);

      // Get related products from same category
      const related = products
        .filter(
          (p) =>
            p.categoryId === foundProduct.categoryId &&
            p.id !== foundProduct.id,
        )
        .slice(0, 4);
      setRelatedProducts(related);

      // Set default size if available
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    }

    setLoading(false);
  }, [id]);

  const getBaseUrl = () => (storeSlug ? `/${storeSlug}` : "/ecommerce");

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      ...product,
      quantity,
      selectedSize: selectedSize || undefined,
    };

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, cartItem];
    });

    alert(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product?.stock || 1, value));
    setQuantity(newQuantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

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

  if (loading) {
    return (
      <PageContainer>
        <Navbar
          cartItemsCount={cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )}
          storeName={vendor?.name || ""}
          storeLogo={vendor?.logo || ""}
          storeSlug={storeSlug}
          theme={vendor?.theme || {}}
        />
        <LoadingSpinner fullPage text="Loading product..." />
        <Footer storeSlug={storeSlug} theme={vendor?.theme || {}} />
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <Navbar
          cartItemsCount={cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
          )}
          storeName={vendor?.name || ""}
          storeLogo={vendor?.logo || ""}
          storeSlug={storeSlug}
          theme={vendor?.theme || {}}
        />
        <Container>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Product not found</h2>
            <p style={{ margin: "1rem 0", color: theme.colors.gray600 }}>
              The product you're looking for doesn't exist.
            </p>
            <Link
              to={`${getBaseUrl()}/products`}
              style={{ color: theme.colors.primary }}
            >
              Back to Products
            </Link>
          </div>
        </Container>
        <Footer storeSlug={storeSlug} theme={vendor?.theme || {}} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        storeName={vendor?.name || ""}
        storeLogo={vendor?.logo || ""}
        storeSlug={storeSlug}
        theme={vendor?.theme || {}}
      />

      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </BackButton>

        <Breadcrumb>
          <Link to={getBaseUrl()}>Home</Link>
          <span>/</span>
          <Link to={`${getBaseUrl()}/products`}>Products</Link>
          <span>/</span>
          <Link to={`${getBaseUrl()}/products?category=${product.category}`}>
            {product.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </Breadcrumb>

        <ProductContainer>
          <ImageSection>
            <MainImage
              src={
                product.images ? product.images[selectedImage] : product.image
              }
              alt={product.name}
            />

            {product.images && product.images.length > 1 && (
              <ThumbnailContainer>
                {product.images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    active={selectedImage === index}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </ThumbnailContainer>
            )}
          </ImageSection>

          <ProductInfo>
            <ProductName>{product.name}</ProductName>

            <RatingContainer>
              <StarRating>{renderStars(product.rating)}</StarRating>
              <ReviewInfo>
                {product.rating} ({product.reviews} reviews)
              </ReviewInfo>
            </RatingContainer>

            <PriceContainer>
              <CurrentPrice>${product.price}</CurrentPrice>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <>
                    <OriginalPrice>${product.originalPrice}</OriginalPrice>
                    <Discount>
                      -{calculateDiscount(product.originalPrice, product.price)}
                      % OFF
                    </Discount>
                  </>
                )}
            </PriceContainer>

            <Description>{product.description}</Description>

            {product.features && (
              <Features>
                <h3>Key Features:</h3>
                <FeatureList>
                  {product.features.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </FeatureList>
              </Features>
            )}

            {product.sizes && (
              <VariantSection>
                <h3>Size:</h3>
                <VariantOptions>
                  {product.sizes.map((size) => (
                    <VariantOption
                      key={size}
                      selected={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </VariantOption>
                  ))}
                </VariantOptions>
              </VariantSection>
            )}

            <StockInfo inStock={product.stock > 0}>
              <FaCheck />
              {product.stock > 0
                ? `${product.stock} items in stock`
                : "Out of stock"}
            </StockInfo>

            {product.stock > 0 && (
              <QuantitySection>
                <QuantityLabel>Quantity:</QuantityLabel>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    min="1"
                    max={product.stock}
                  />
                  <QuantityButton
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <FaPlus />
                  </QuantityButton>
                </QuantityControls>
              </QuantitySection>
            )}

            <ActionButtons>
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={
                  product.stock === 0 || (product.sizes && !selectedSize)
                }
              >
                <FaShoppingCart />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </AddToCartButton>

              <WishlistButton title="Add to Wishlist">
                <FaHeart />
              </WishlistButton>

              <ShareButton onClick={handleShare} title="Share Product">
                <FaShare />
              </ShareButton>
            </ActionButtons>

            <Guarantees>
              <GuaranteeItem>
                <FaTruck />
                Free shipping over $99
              </GuaranteeItem>
              <GuaranteeItem>
                <FaUndoAlt />
                30-day returns
              </GuaranteeItem>
              <GuaranteeItem>
                <FaShieldAlt />
                2-year warranty
              </GuaranteeItem>
            </Guarantees>
          </ProductInfo>
        </ProductContainer>

        {relatedProducts.length > 0 && (
          <RelatedSection>
            <SectionTitle>Related Products</SectionTitle>
            <RelatedGrid>
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  storeSlug={storeSlug}
                  onAddToCart={() => {
                    setCartItems((prev) => {
                      const existingItem = prev.find(
                        (item) => item.id === relatedProduct.id,
                      );
                      if (existingItem) {
                        return prev.map((item) =>
                          item.id === relatedProduct.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                        );
                      }
                      return [...prev, { ...relatedProduct, quantity: 1 }];
                    });
                    alert(`${relatedProduct.name} added to cart!`);
                  }}
                />
              ))}
            </RelatedGrid>
          </RelatedSection>
        )}
      </Container>

      <Footer storeSlug={storeSlug} theme={vendor?.theme || {}} />
    </PageContainer>
  );
};

export default ProductDetail;
