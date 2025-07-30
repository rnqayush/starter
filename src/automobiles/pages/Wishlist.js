import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaHome, FaTrash } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import BackToTop from '../../ecommerce/components/BackToTop';
import {
  getVehicleById,
  getAutomobileVendorByIdOrSlug as getVendorByIdOrSlug,
} from '../../data';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const BackButton = styled.button`
  position: fixed;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.xl};
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
  z-index: 1000;
  box-shadow: ${theme.shadows.md};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
`;

const WishlistActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const WishlistCount = styled.h2`
  font-size: 1.3rem;
  color: ${theme.colors.gray900};
  font-weight: 600;
`;

const ClearAllButton = styled.button`
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.errorDark || '#dc2626'};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
  }
`;

const VehiclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  .icon {
    font-size: 4rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.lg};
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray900};
  }

  p {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BrowseButton = styled.button`
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
  margin: 0 auto;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const Wishlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [wishlistedVehicles, setWishlistedVehicles] = useState([]);

  useEffect(() => {
    // Get dealer data from URL
    const path = location.pathname;
    let dealer = null;

    if (path !== '/automobiles/wishlist') {
      const pathSegments = path.split('/').filter(Boolean);
      const dealerSlug = pathSegments[0];
      dealer = getVendorByIdOrSlug(dealerSlug);
    }

    if (dealer) {
      setSelectedDealer(dealer);
    } else {
      // If no dealer found, redirect to dealer listing
      navigate('/auto-dealers');
      return;
    }

    // Load wishlist
    loadWishlist();
  }, [location.pathname, navigate]);

  const loadWishlist = () => {
    const wishlist = JSON.parse(
      localStorage.getItem('vehicleWishlist') || '[]'
    );
    const vehicles = wishlist.map(id => getVehicleById(id)).filter(Boolean);
    setWishlistedVehicles(vehicles);
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        'Are you sure you want to remove all vehicles from your wishlist?'
      )
    ) {
      localStorage.setItem('vehicleWishlist', JSON.stringify([]));
      setWishlistedVehicles([]);
    }
  };

  const handleVehicleRemoved = vehicleId => {
    // This will be called when a vehicle is removed from wishlist via VehicleCard
    loadWishlist();
  };

  const handleBackToDealer = () => {
    if (selectedDealer) {
      navigate(`/${selectedDealer.slug}`);
    } else {
      navigate('/auto-dealers');
    }
  };

  if (!selectedDealer) {
    return null; // Will redirect
  }

  const dealerTheme = selectedDealer.theme || {};

  return (
    <PageContainer>
      <BackButton onClick={handleBackToDealer}>
        <FaHome />
        Back to {selectedDealer.name}
      </BackButton>

      <Navbar
        dealerName={selectedDealer.name}
        dealerLogo={selectedDealer.logo}
        dealerSlug={selectedDealer.slug}
        theme={dealerTheme}
      />

      <Container>
        <PageHeader>
          <PageTitle>
            <FaHeart />
            My Wishlist
          </PageTitle>
          <PageSubtitle>
            Keep track of your favorite vehicles from {selectedDealer.name}
          </PageSubtitle>
        </PageHeader>

        {wishlistedVehicles.length > 0 ? (
          <>
            <WishlistActions>
              <WishlistCount>
                {wishlistedVehicles.length} Vehicle
                {wishlistedVehicles.length !== 1 ? 's' : ''} in Wishlist
              </WishlistCount>
              <ClearAllButton onClick={handleClearAll}>
                <FaTrash />
                Clear All
              </ClearAllButton>
            </WishlistActions>

            <VehiclesGrid>
              {wishlistedVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  dealerSlug={selectedDealer.slug}
                  isInWishlist={true}
                  onToggleWishlist={() => handleVehicleRemoved(vehicle.id)}
                />
              ))}
            </VehiclesGrid>
          </>
        ) : (
          <EmptyState>
            <FaHeart className="icon" />
            <h3>Your Wishlist is Empty</h3>
            <p>
              Start browsing our vehicle inventory to add your favorite cars to
              your wishlist. We'll keep them saved here for you!
            </p>
            <BrowseButton
              onClick={() => navigate(`/${selectedDealer.slug}/vehicles`)}
            >
              Browse Vehicles
            </BrowseButton>
          </EmptyState>
        )}
      </Container>

      <Footer
        dealerSlug={selectedDealer.slug}
        dealer={selectedDealer}
        theme={dealerTheme}
      />
      <BackToTop />
    </PageContainer>
  );
};

export default Wishlist;
