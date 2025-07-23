import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import EnquiryModal from '../components/EnquiryModal';
import BackToTop from '../../ecommerce/components/BackToTop';
import {
  getVehicleById,
  getFeaturedVehicles,
  getAvailabilityStatus,
  getAvailabilityLabel,
  getAvailabilityColor,
} from '../data/vehicles';
import { getVendorByIdOrSlug } from '../data/vendors';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
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
  const [vehicle, setVehicle] = useState(null);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedVehicles, setRelatedVehicles] = useState([]);

  useEffect(() => {
    // Get vehicle data
    const vehicleData = getVehicleById(parseInt(vehicleId));
    if (!vehicleData) {
      navigate('/auto-dealers');
      return;
    }
    setVehicle(vehicleData);

    // Get dealer data from URL
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const dealerSlug = pathSegments[0];
    const dealer = getVendorByIdOrSlug(dealerSlug);

    if (dealer) {
      setSelectedDealer(dealer);
    } else {
      navigate('/auto-dealers');
      return;
    }

    // Get related vehicles (same category)
    const featured = getFeaturedVehicles().filter(
      v => v.vehicleId !== vehicleData.vehicleId
    );
    setRelatedVehicles(featured.slice(0, 3));

    // Check wishlist status
    const wishlist = JSON.parse(
      localStorage.getItem('vehicleWishlist') || '[]'
    );
    setIsWishlisted(wishlist.includes(vehicleData.vehicleId));
  }, [vehicleId, navigate]);

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
    const wishlist = JSON.parse(
      localStorage.getItem('vehicleWishlist') || '[]'
    );
    let newWishlist;

    if (isWishlisted) {
      newWishlist = wishlist.filter(
        vehicleId => vehicleId !== vehicle.vehicleId
      );
    } else {
      newWishlist = [...wishlist, vehicle.vehicleId];
    }

    localStorage.setItem('vehicleWishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle.name,
        text: `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!vehicle || !selectedDealer) {
    return null;
  }

  const dealerTheme = selectedDealer.theme || {};
  const availabilityStatus = getAvailabilityStatus(vehicle);
  const availabilityLabel = getAvailabilityLabel(availabilityStatus);
  const availabilityColor = getAvailabilityColor(availabilityStatus);

  return (
    <PageContainer>
      <Navbar
        dealerName={selectedDealer.name}
        dealerLogo={selectedDealer.logo}
        dealerSlug={selectedDealer.slug}
        theme={dealerTheme}
      />

      <Container>
        <Breadcrumb>
          <Link to={`/${selectedDealer.slug}`}>Home</Link>
          <span className="separator">›</span>
          <Link to={`/${selectedDealer.slug}/vehicles`}>Vehicles</Link>
          <span className="separator">›</span>
          <span className="current">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </span>
        </Breadcrumb>

        <VehicleDetailContainer>
          <VehicleImages>
            <MainImage>
              <MainImageContainer
                src={
                  vehicle.images
                    ? vehicle.images[currentImageIndex]
                    : vehicle.image
                }
                alt={vehicle.name}
              />
            </MainImage>

            {vehicle.images && vehicle.images.length > 1 && (
              <ImageThumbnails>
                {vehicle.images.map((img, index) => (
                  <Thumbnail
                    key={index}
                    src={img}
                    alt={`${vehicle.name} ${index + 1}`}
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
                {vehicle.year} {vehicle.make} {vehicle.model}
              </VehicleTitle>
              <VehicleSubtitle>
                {vehicle.trim} • {vehicle.condition === 'new' ? 'New' : 'Used'}
              </VehicleSubtitle>
            </VehicleHeader>

            <PriceContainer>
              <CurrentPrice>{formatPrice(vehicle.price)}</CurrentPrice>
              {vehicle.originalPrice &&
                vehicle.originalPrice > vehicle.price && (
                  <>
                    <OriginalPrice>
                      {formatPrice(vehicle.originalPrice)}
                    </OriginalPrice>
                    <Savings>
                      Save{' '}
                      {formatPrice(
                        calculateSavings(vehicle.originalPrice, vehicle.price)
                      )}
                    </Savings>
                  </>
                )}
            </PriceContainer>

            <AvailabilityStatus color={availabilityColor}>
              <FaCheckCircle />
              {availabilityLabel}
              {availabilityStatus === 'in_stock' &&
                vehicle.stock > 0 &&
                ` (${vehicle.stock} available)`}
            </AvailabilityStatus>

            <SpecsGrid>
              <SpecItem>
                <FaCalendar className="icon" />
                <div>
                  <div className="label">Year</div>
                  <div className="value">{vehicle.year}</div>
                </div>
              </SpecItem>
              <SpecItem>
                <FaRoad className="icon" />
                <div>
                  <div className="label">Mileage</div>
                  <div className="value">
                    {vehicle.mileage === 0
                      ? 'New'
                      : `${vehicle.mileage.toLocaleString()} mi`}
                  </div>
                </div>
              </SpecItem>
              <SpecItem>
                <FaCar className="icon" />
                <div>
                  <div className="label">Engine</div>
                  <div className="value">
                    {vehicle.specifications?.engine || 'N/A'}
                  </div>
                </div>
              </SpecItem>
              <SpecItem>
                <FaGasPump className="icon" />
                <div>
                  <div className="label">Fuel Economy</div>
                  <div className="value">
                    {vehicle.specifications?.fuelEconomy ||
                      vehicle.specifications?.range ||
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
                      color: isWishlisted ? theme.colors.error : 'currentColor',
                    }}
                  />
                </IconButton>
                <IconButton onClick={handleShare} title="Share">
                  <FaShare />
                </IconButton>
                <IconButton
                  onClick={() => navigate(`/${selectedDealer.slug}/vehicles`)}
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
            <Description>{vehicle.description}</Description>
          </DetailsSection>

          {vehicle.features && vehicle.features.length > 0 && (
            <DetailsSection>
              <SectionTitle>
                <FaCheckCircle />
                Key Features
              </SectionTitle>
              <FeaturesList>
                {vehicle.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FaCheckCircle className="icon" />
                    {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>
            </DetailsSection>
          )}

          {vehicle.specifications && (
            <DetailsSection>
              <SectionTitle>
                <FaCog />
                Specifications
              </SectionTitle>
              <SpecificationsTable>
                {Object.entries(vehicle.specifications).map(([key, value]) => (
                  <SpecRow key={key}>
                    <SpecLabel>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </SpecLabel>
                    <SpecValue>{value}</SpecValue>
                  </SpecRow>
                ))}
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
                  key={relatedVehicle.vehicleId}
                  vehicle={relatedVehicle}
                  dealerSlug={selectedDealer.slug}
                />
              ))}
            </RelatedGrid>
          </RelatedVehicles>
        )}
      </Container>

      <Footer
        dealerSlug={selectedDealer.slug}
        dealer={selectedDealer}
        theme={dealerTheme}
      />
      <BackToTop />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        vehicle={vehicle}
      />
    </PageContainer>
  );
};

export default VehicleDetail;
