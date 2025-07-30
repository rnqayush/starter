import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaEnvelope,
  FaPhone,
  FaCar,
  FaGasPump,
  FaRoad,
  FaCalendar,
  FaCog,
  FaCheckCircle,
  FaStar,
  FaSpinner,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import EnquiryModal from '../components/EnquiryModal';
import BackToTop from '../../ecommerce/components/BackToTop';
import {
  fetchAutomobileData,
  fetchVehicleDetails,
  addToWishlist,
  removeFromWishlist,
  addToRecentlyViewed,
  selectVendor,
  selectSelectedVehicle,
  selectFeaturedVehicles,
  selectVehicleLoading,
  selectLoading,
  selectError,
  selectIsInWishlist,
  clearError,
} from '../store/automobileManagementSlice';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray50};
  gap: ${theme.spacing.lg};
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${theme.colors.gray200};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  text-align: center;
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.red600};
  margin-bottom: ${theme.spacing.md};
`;

const ErrorText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xl};
  max-width: 500px;
`;

const ErrorButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.primaryDark};
    }
  }

  .separator {
    color: ${theme.colors.gray400};
  }

  .current {
    color: ${theme.colors.gray900};
    font-weight: 600;
  }
`;

const VehicleDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 350px;
    gap: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const VehicleImages = styled.div``;

const MainImage = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.lg};
`;

const MainImageContainer = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

const ImageThumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${theme.spacing.sm};
  max-width: 500px;
`;

const Thumbnail = styled.img.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const VehicleInfo = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: ${theme.spacing.xl};
`;

const VehicleHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const VehicleTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.3;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

const VehicleSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
`;

const PriceContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const OriginalPrice = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.gray500};
  text-decoration: line-through;
  margin-bottom: ${theme.spacing.sm};
`;

const Savings = styled.div`
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  display: inline-block;
`;

const AvailabilityStatus = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'color',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: ${props => props.color}20;
  border: 2px solid ${props => props.color};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  color: ${props => props.color};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const PrimaryButton = styled.button`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.primaryDark} 100%
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const IconButton = styled.button`
  background: ${theme.colors.gray100};
  border: none;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.gray200};
  }
`;

const IconButtonsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${theme.spacing.sm};
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};

  .icon {
    color: ${theme.colors.primary};
    font-size: 1.1rem;
  }

  .label {
    font-size: 0.9rem;
    color: ${theme.colors.gray600};
  }

  .value {
    font-weight: 600;
    color: ${theme.colors.gray900};
  }
`;

const VehicleDetails = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
`;

const DetailsSection = styled.div`
  margin-bottom: ${theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Description = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.sm};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.gray700};

  .icon {
    color: ${theme.colors.success};
    font-size: 1rem;
  }
`;

const SpecificationsTable = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray200};

  &:last-child {
    border-bottom: none;
  }
`;

const SpecLabel = styled.span`
  font-weight: 500;
  color: ${theme.colors.gray600};
`;

const SpecValue = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const RelatedVehicles = styled.div`
  margin-top: ${theme.spacing.xxl};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
`;

const VehicleDetail = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const vendor = useSelector(selectVendor);
  const selectedVehicle = useSelector(selectSelectedVehicle);
  const featuredVehicles = useSelector(selectFeaturedVehicles);
  const vehicleLoading = useSelector(selectVehicleLoading);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isInWishlist = useSelector(selectIsInWishlist(parseInt(vehicleId)));

  // Local state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [vendorSlug, setVendorSlug] = useState(null);

  useEffect(() => {
    // Get vendor slug from URL
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const slug = pathSegments[0];
    setVendorSlug(slug);

    if (!slug) {
      navigate('/auto-dealers');
      return;
    }

    // Fetch automobile data if not available
    if (!vendor || vendor.slug !== slug) {
      dispatch(fetchAutomobileData(slug));
    }

    // Fetch vehicle details
    dispatch(
      fetchVehicleDetails({ vehicleId: parseInt(vehicleId), vendorSlug: slug })
    );

    // Add to recently viewed
    dispatch(addToRecentlyViewed(parseInt(vehicleId)));
  }, [vehicleId, dispatch, navigate, vendor]);

  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateSavings = (original, current) => {
    return original - current;
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(parseInt(vehicleId)));
    } else {
      dispatch(addToWishlist(parseInt(vehicleId)));
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedVehicle.name,
        text: `Check out this ${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleRetry = () => {
    if (vendorSlug) {
      dispatch(clearError());
      dispatch(fetchAutomobileData(vendorSlug));
      dispatch(
        fetchVehicleDetails({ vehicleId: parseInt(vehicleId), vendorSlug })
      );
    }
  };

  const getAvailabilityStatus = vehicle => {
    if (!vehicle) return 'unknown';
    if (
      vehicle.availability?.status === 'out_of_stock' ||
      vehicle.availability?.quantity === 0
    ) {
      return 'out_of_stock';
    } else if (
      vehicle.availability?.status === 'limited_stock' ||
      vehicle.availability?.quantity <= 5
    ) {
      return 'limited_stock';
    } else if (vehicle.availability?.status === 'pre_order') {
      return 'pre_order';
    } else {
      return 'in_stock';
    }
  };

  const getAvailabilityLabel = availability => {
    switch (availability) {
      case 'in_stock':
        return 'In Stock';
      case 'out_of_stock':
        return 'Sold Out';
      case 'limited_stock':
        return 'Limited Stock';
      case 'pre_order':
        return 'Pre Order';
      default:
        return 'Unknown';
    }
  };

  const getAvailabilityColor = availability => {
    switch (availability) {
      case 'in_stock':
        return '#10b981';
      case 'out_of_stock':
        return '#ef4444';
      case 'limited_stock':
        return '#f59e0b';
      case 'pre_order':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  // Show loading state
  if (loading || vehicleLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading vehicle details...</LoadingText>
      </LoadingContainer>
    );
  }

  // Show error state
  if (error) {
    return (
      <ErrorContainer>
        <ErrorTitle>Something went wrong</ErrorTitle>
        <ErrorText>{error}</ErrorText>
        <ErrorButton onClick={handleRetry}>
          <FaSpinner />
          Try Again
        </ErrorButton>
      </ErrorContainer>
    );
  }

  // Show fallback if no vehicle or vendor data
  if (!selectedVehicle || !vendor) {
    return (
      <ErrorContainer>
        <ErrorTitle>Vehicle Not Found</ErrorTitle>
        <ErrorText>
          The vehicle you're looking for doesn't exist or may have been sold.
        </ErrorText>
        <ErrorButton onClick={() => navigate('/auto-dealers')}>
          <FaCar />
          Browse Dealers
        </ErrorButton>
      </ErrorContainer>
    );
  }

  const dealerTheme = vendor.theme || {};
  const availabilityStatus = getAvailabilityStatus(selectedVehicle);
  const availabilityLabel = getAvailabilityLabel(availabilityStatus);
  const availabilityColor = getAvailabilityColor(availabilityStatus);

  // Handle different data structures (new JSON vs old JS)
  const vehiclePrice = selectedVehicle.pricing?.price || selectedVehicle.price;
  const vehicleOriginalPrice =
    selectedVehicle.pricing?.originalPrice || selectedVehicle.originalPrice;
  const vehicleImages = selectedVehicle.media?.images || selectedVehicle.images;
  const vehicleMainImage =
    selectedVehicle.media?.mainImage || selectedVehicle.image;
  const vehicleFeatures =
    selectedVehicle.keyFeatures || selectedVehicle.features;
  const vehicleSpecs = selectedVehicle.specifications || {};
  const vehicleStock =
    selectedVehicle.availability?.quantity || selectedVehicle.stock;

  const relatedVehicles = featuredVehicles
    .filter(v => v.id !== selectedVehicle.id)
    .slice(0, 3);

  return (
    <PageContainer>
      <Navbar
        dealerName={vendor.name}
        dealerLogo={vendor.businessInfo?.logo || vendor.logo}
        dealerSlug={vendor.slug}
        theme={dealerTheme}
      />

      <Container>
        <Breadcrumb>
          <Link to={`/${vendor.slug}`}>Home</Link>
          <span className="separator">›</span>
          <Link to={`/${vendor.slug}/vehicles`}>Vehicles</Link>
          <span className="separator">›</span>
          <span className="current">
            {selectedVehicle.year} {selectedVehicle.make}{' '}
            {selectedVehicle.model}
          </span>
        </Breadcrumb>

        <VehicleDetailContainer>
          <VehicleImages>
            <MainImage>
              <MainImageContainer
                src={
                  vehicleImages && vehicleImages.length > 0
                    ? vehicleImages[currentImageIndex]?.url ||
                      vehicleImages[currentImageIndex]
                    : vehicleMainImage
                }
                alt={selectedVehicle.name}
              />
            </MainImage>

            {vehicleImages && vehicleImages.length > 1 && (
              <ImageThumbnails>
                {vehicleImages.map((img, index) => (
                  <Thumbnail
                    key={index}
                    src={img.url || img}
                    alt={`${selectedVehicle.name} ${index + 1}`}
                    active={index === currentImageIndex}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </ImageThumbnails>
            )}
          </VehicleImages>

          <VehicleInfo>
            <VehicleHeader>
              <VehicleTitle>
                {selectedVehicle.year} {selectedVehicle.make}{' '}
                {selectedVehicle.model}
              </VehicleTitle>
              <VehicleSubtitle>
                {selectedVehicle.trim} •{' '}
                {selectedVehicle.condition === 'new' ? 'New' : 'Used'}
              </VehicleSubtitle>
            </VehicleHeader>

            <PriceContainer>
              <CurrentPrice>{formatPrice(vehiclePrice)}</CurrentPrice>
              {vehicleOriginalPrice && vehicleOriginalPrice > vehiclePrice && (
                <>
                  <OriginalPrice>
                    {formatPrice(vehicleOriginalPrice)}
                  </OriginalPrice>
                  <Savings>
                    Save{' '}
                    {formatPrice(
                      calculateSavings(vehicleOriginalPrice, vehiclePrice)
                    )}
                  </Savings>
                </>
              )}
            </PriceContainer>

            <AvailabilityStatus color={availabilityColor}>
              <FaCheckCircle />
              {availabilityLabel}
              {availabilityStatus === 'in_stock' &&
                vehicleStock > 0 &&
                ` (${vehicleStock} available)`}
            </AvailabilityStatus>

            <SpecsGrid>
              <SpecItem>
                <FaCalendar className="icon" />
                <div>
                  <div className="label">Year</div>
                  <div className="value">{selectedVehicle.year}</div>
                </div>
              </SpecItem>
              <SpecItem>
                <FaRoad className="icon" />
                <div>
                  <div className="label">Mileage</div>
                  <div className="value">
                    {selectedVehicle.mileage === 0
                      ? 'New'
                      : `${selectedVehicle.mileage.toLocaleString()} mi`}
                  </div>
                </div>
              </SpecItem>
              <SpecItem>
                <FaCar className="icon" />
                <div>
                  <div className="label">Engine</div>
                  <div className="value">
                    {vehicleSpecs?.engine?.type ||
                      vehicleSpecs?.engine ||
                      'N/A'}
                  </div>
                </div>
              </SpecItem>
              <SpecItem>
                <FaGasPump className="icon" />
                <div>
                  <div className="label">Fuel Economy</div>
                  <div className="value">
                    {vehicleSpecs?.efficiency?.mpgCombined
                      ? `${vehicleSpecs.efficiency.mpgCombined} MPG`
                      : vehicleSpecs?.efficiency?.range
                        ? `${vehicleSpecs.efficiency.range} range`
                        : vehicleSpecs?.fuelEconomy ||
                          vehicleSpecs?.range ||
                          'N/A'}
                  </div>
                </div>
              </SpecItem>
            </SpecsGrid>

            <ActionButtons>
              <PrimaryButton
                onClick={() => setIsEnquiryModalOpen(true)}
                disabled={availabilityStatus === 'out_of_stock'}
              >
                <FaEnvelope />
                {availabilityStatus === 'out_of_stock'
                  ? 'Not Available'
                  : 'Get Quote'}
              </PrimaryButton>

              <SecondaryButton>
                <FaPhone />
                Call Dealer
              </SecondaryButton>

              <IconButtonsRow>
                <IconButton
                  onClick={handleWishlistToggle}
                  title="Add to Wishlist"
                >
                  <FaHeart
                    style={{
                      color: isInWishlist ? theme.colors.error : 'currentColor',
                    }}
                  />
                </IconButton>
                <IconButton onClick={handleShare} title="Share">
                  <FaShare />
                </IconButton>
                <IconButton
                  onClick={() => navigate(`/${vendor.slug}/vehicles`)}
                  title="Back to Vehicles"
                >
                  <FaArrowLeft />
                </IconButton>
              </IconButtonsRow>
            </ActionButtons>
          </VehicleInfo>
        </VehicleDetailContainer>

        <VehicleDetails>
          <DetailsSection>
            <SectionTitle>
              <FaCar />
              Description
            </SectionTitle>
            <Description>{selectedVehicle.description}</Description>
          </DetailsSection>

          {vehicleFeatures && vehicleFeatures.length > 0 && (
            <DetailsSection>
              <SectionTitle>
                <FaCheckCircle />
                Key Features
              </SectionTitle>
              <FeaturesList>
                {vehicleFeatures.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FaCheckCircle className="icon" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>
            </DetailsSection>
          )}

          {vehicleSpecs && Object.keys(vehicleSpecs).length > 0 && (
            <DetailsSection>
              <SectionTitle>
                <FaCog />
                Specifications
              </SectionTitle>
              <SpecificationsTable>
                {Object.entries(vehicleSpecs).map(([key, value]) => {
                  if (typeof value === 'object' && value !== null) {
                    return Object.entries(value).map(([subKey, subValue]) => (
                      <SpecRow key={`${key}-${subKey}`}>
                        <SpecLabel>
                          {subKey.charAt(0).toUpperCase() +
                            subKey.slice(1).replace(/([A-Z])/g, ' $1')}
                        </SpecLabel>
                        <SpecValue>{subValue}</SpecValue>
                      </SpecRow>
                    ));
                  }
                  return (
                    <SpecRow key={key}>
                      <SpecLabel>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </SpecLabel>
                      <SpecValue>{value}</SpecValue>
                    </SpecRow>
                  );
                })}
              </SpecificationsTable>
            </DetailsSection>
          )}
        </VehicleDetails>

        {relatedVehicles.length > 0 && (
          <RelatedVehicles>
            <SectionTitle>
              <FaStar />
              You Might Also Like
            </SectionTitle>
            <RelatedGrid>
              {relatedVehicles.map(relatedVehicle => (
                <VehicleCard
                  key={relatedVehicle.id}
                  vehicle={relatedVehicle}
                  dealerSlug={vendor.slug}
                />
              ))}
            </RelatedGrid>
          </RelatedVehicles>
        )}
      </Container>

      <Footer dealerSlug={vendor.slug} dealer={vendor} theme={dealerTheme} />
      <BackToTop />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        vehicle={selectedVehicle}
      />
    </PageContainer>
  );
};

export default VehicleDetail;
