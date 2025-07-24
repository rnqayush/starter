import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaStar,
  FaHeart,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { getVendorById } from '../data/vendors';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const NavHeader = styled.div`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  border-bottom: 1px solid ${theme.colors.gray200};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    flex-direction: column;
    gap: ${theme.spacing.sm};
    text-align: center;
  }
`;

const BackButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const VendorTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.gray900};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const PageTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  max-width: 600px;
  margin: 0 auto;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const PortfolioCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const PortfolioImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const PortfolioContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const LocationInfo = styled.div``;

const LocationName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const LocationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
`;

const LocationDetail = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const CoupleInfo = styled.div`
  background: ${theme.colors.primary}10;
  color: ${theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
`;

const PortfolioDescription = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const ServicesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const ServiceTag = styled.span`
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 500;
`;

const ViewGalleryButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm};
  }
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
  }
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

const WorkflowSection = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const WorkflowTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const HighlightsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.green50};
  border-radius: ${theme.borderRadius.md};
`;

const HighlightText = styled.span`
  color: ${theme.colors.gray700};
  font-weight: 500;
`;

const GallerySection = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${theme.spacing.sm};
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Image viewer
const ImageViewerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

const ImageViewerContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewerImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${theme.borderRadius.md};
`;

const ImageNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: ${theme.spacing.md};
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: -60px;
  }

  &.next {
    right: -60px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  color: ${theme.colors.gray600};
  font-size: 1.2rem;
`;

const VendorPortfolio = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();

  // Get vendor ID from URL path if not available in params
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const vendorId = vendorSlug || pathSegments[0];

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [imageViewer, setImageViewer] = useState({
    open: false,
    images: [],
    currentIndex: 0,
  });

  useEffect(() => {
    const vendorData = getVendorById(vendorId);
    setVendor(vendorData);
    setLoading(false);
  }, [vendorId]);

  const openPortfolioModal = portfolio => {
    setSelectedPortfolio(portfolio);
  };

  const closePortfolioModal = useCallback(() => {
    setSelectedPortfolio(null);
  }, []);

  const openImageViewer = useCallback((images, startIndex = 0) => {
    setImageViewer({ open: true, images, currentIndex: startIndex });
  }, []);

  const closeImageViewer = useCallback(() => {
    setImageViewer({ open: false, images: [], currentIndex: 0 });
  }, []);

  const nextImage = useCallback(() => {
    setImageViewer(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  }, []);

  const prevImage = useCallback(() => {
    setImageViewer(prev => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0
          ? prev.images.length - 1
          : prev.currentIndex - 1,
    }));
  }, []);

  const handleKeyPress = useCallback(e => {
    if (e.key === 'Escape') {
      if (imageViewer.open) {
        closeImageViewer();
      } else if (selectedPortfolio) {
        closePortfolioModal();
      }
    } else if (imageViewer.open) {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  }, [imageViewer.open, selectedPortfolio, closeImageViewer, closePortfolioModal, prevImage, nextImage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, imageViewer.open, selectedPortfolio]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState>Loading portfolio...</LoadingState>
      </PageContainer>
    );
  }

  if (!vendor) {
    return (
      <PageContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Vendor Not Found</h2>
            <p>The vendor portfolio you're looking for doesn't exist.</p>
            <BackButton onClick={() => navigate('/weddings')}>
              <FaArrowLeft />
              Back to Vendors
            </BackButton>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <NavHeader>
        <NavContent>
          <BackButton onClick={() => navigate(`/${vendorId}`)}>
            <FaArrowLeft />
            Back to {vendor.name}
          </BackButton>
          <VendorTitle>{vendor.name} Portfolio</VendorTitle>
        </NavContent>
      </NavHeader>

      <Container>
        <PageHeader>
          <PageTitle>Our Work & Locations</PageTitle>
          <PageSubtitle>
            Explore our portfolio of beautiful weddings across different venues
            and locations. Each celebration tells a unique story and showcases
            our commitment to creating magical moments.
          </PageSubtitle>
        </PageHeader>

        {vendor.locationPortfolio && vendor.locationPortfolio.length > 0 ? (
          <PortfolioGrid>
            {vendor.locationPortfolio.map(portfolio => (
              <PortfolioCard
                key={portfolio.id}
                onClick={() => openPortfolioModal(portfolio)}
              >
                <PortfolioImage
                  src={portfolio.coverImage}
                  alt={portfolio.location}
                />
                <PortfolioContent>
                  <LocationHeader>
                    <LocationInfo>
                      <LocationName>{portfolio.location}</LocationName>
                      <LocationDetails>
                        <LocationDetail>
                          <FaMapMarkerAlt />
                          {portfolio.city}, {portfolio.state}
                        </LocationDetail>
                        <LocationDetail>
                          <FaCalendarAlt />
                          {portfolio.weddingDate}
                        </LocationDetail>
                      </LocationDetails>
                    </LocationInfo>
                    <CoupleInfo>
                      <FaUsers />
                      {portfolio.coupleNames}
                    </CoupleInfo>
                  </LocationHeader>

                  <PortfolioDescription>
                    {portfolio.description}
                  </PortfolioDescription>

                  <ServicesList>
                    {portfolio.services.slice(0, 3).map((service, index) => (
                      <ServiceTag key={index}>{service}</ServiceTag>
                    ))}
                    {portfolio.services.length > 3 && (
                      <ServiceTag>
                        +{portfolio.services.length - 3} more
                      </ServiceTag>
                    )}
                  </ServicesList>

                  <ViewGalleryButton>
                    View Full Gallery ({portfolio.gallery.length} photos)
                  </ViewGalleryButton>
                </PortfolioContent>
              </PortfolioCard>
            ))}
          </PortfolioGrid>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h3>Portfolio Coming Soon</h3>
            <p>
              We're updating our portfolio with recent work. Check back soon!
            </p>
          </div>
        )}
      </Container>

      {/* Portfolio Detail Modal */}
      {selectedPortfolio && (
        <ModalOverlay onClick={closePortfolioModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedPortfolio.location}</ModalTitle>
              <CloseButton onClick={closePortfolioModal}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                  gap: theme.spacing.xl,
                  marginBottom: theme.spacing.xl,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: `0 0 ${theme.spacing.md} 0`,
                      color: theme.colors.gray900,
                    }}
                  >
                    Wedding Details
                  </h4>
                  <LocationDetails style={{ gap: theme.spacing.sm }}>
                    <LocationDetail>
                      <FaMapMarkerAlt />
                      <strong>
                        {selectedPortfolio.city}, {selectedPortfolio.state}
                      </strong>
                    </LocationDetail>
                    <LocationDetail>
                      <FaCalendarAlt />
                      <strong>{selectedPortfolio.weddingDate}</strong>
                    </LocationDetail>
                    <LocationDetail>
                      <FaHeart style={{ color: theme.colors.error }} />
                      <strong>{selectedPortfolio.coupleNames}</strong>
                    </LocationDetail>
                  </LocationDetails>
                </div>
                <div>
                  <h4
                    style={{
                      margin: `0 0 ${theme.spacing.md} 0`,
                      color: theme.colors.gray900,
                    }}
                  >
                    Services Provided
                  </h4>
                  <ServicesList>
                    {selectedPortfolio.services.map((service, index) => (
                      <ServiceTag key={index}>{service}</ServiceTag>
                    ))}
                  </ServicesList>
                </div>
              </div>

              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  color: theme.colors.gray700,
                  marginBottom: theme.spacing.xl,
                }}
              >
                {selectedPortfolio.description}
              </p>

              <WorkflowSection>
                <WorkflowTitle>
                  <FaCheckCircle style={{ color: theme.colors.green500 }} />
                  Project Highlights
                </WorkflowTitle>
                <HighlightsList>
                  {selectedPortfolio.highlights.map((highlight, index) => (
                    <HighlightItem key={index}>
                      <FaStar
                        style={{
                          color: theme.colors.warning,
                          fontSize: '0.9rem',
                        }}
                      />
                      <HighlightText>{highlight}</HighlightText>
                    </HighlightItem>
                  ))}
                </HighlightsList>
              </WorkflowSection>

              <GallerySection>
                <WorkflowTitle>Wedding Gallery</WorkflowTitle>
                <GalleryGrid>
                  {selectedPortfolio.gallery.map((image, index) => (
                    <GalleryImage
                      key={index}
                      src={image}
                      alt={`${selectedPortfolio.location} ${index + 1}`}
                      onClick={() =>
                        openImageViewer(selectedPortfolio.gallery, index)
                      }
                    />
                  ))}
                </GalleryGrid>
              </GallerySection>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Image Viewer */}
      {imageViewer.open && (
        <ImageViewerOverlay onClick={closeImageViewer}>
          <ImageViewerContent onClick={e => e.stopPropagation()}>
            <ViewerImage
              src={imageViewer.images[imageViewer.currentIndex]}
              alt={`Gallery ${imageViewer.currentIndex + 1}`}
            />

            {imageViewer.images.length > 1 && (
              <>
                <ImageNavButton className="prev" onClick={prevImage}>
                  <FaChevronLeft />
                </ImageNavButton>
                <ImageNavButton className="next" onClick={nextImage}>
                  <FaChevronRight />
                </ImageNavButton>
              </>
            )}

            <ImageCounter>
              {imageViewer.currentIndex + 1} / {imageViewer.images.length}
            </ImageCounter>

            <CloseButton
              onClick={closeImageViewer}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
              }}
            >
              <FaTimes />
            </CloseButton>
          </ImageViewerContent>
        </ImageViewerOverlay>
      )}
    </PageContainer>
  );
};

export default VendorPortfolio;
