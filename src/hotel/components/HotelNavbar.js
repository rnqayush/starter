import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaHotel,
  FaUser,
  FaCalendarAlt,
  FaHome,
  FaBars,
  FaTimes,
  FaBed,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import { getHotelByIdOrSlug } from '../../DummyData';

const NavbarContainer = styled.nav`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  ${media.mobile} {
    padding: 0 ${theme.spacing.sm};
    height: 60px;
  }

  ${media.tablet} {
    padding: 0 ${theme.spacing.lg};
    height: 65px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  ${media.mobile} {
    font-size: 1.4rem;
    gap: ${theme.spacing.xs};
  }

  ${media.tablet} {
    font-size: 1.6rem;
  }
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};

  ${media.tabletDown} {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: ${theme.colors.white};
    flex-direction: column;
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.lg};
    transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition: all 0.3s ease;
    z-index: 99;
    gap: ${theme.spacing.lg};
    align-items: stretch;
  }

  ${media.mobile} {
    top: 60px;
    padding: ${theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.gray700};
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.primary};
  }

  &.active {
    color: ${theme.colors.primary};

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${theme.colors.primary};
    }
  }

  ${media.tabletDown} {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    width: 100%;
    text-align: center;
    border-radius: ${theme.borderRadius.md};

    &:hover {
      background: ${theme.colors.gray50};
    }

    &.active::after {
      display: none;
    }

    &.active {
      background: ${theme.colors.primary}10;
    }
  }

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 1.125rem;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  ${media.mobile} {
    gap: ${theme.spacing.sm};
  }

  ${media.tablet} {
    gap: ${theme.spacing.md};
  }
`;

const ActionButton = styled.button`
  background: none;
  color: ${theme.colors.gray700};
  font-size: 1.2rem;
  transition: color 0.2s ease;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  min-width: 2.5rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray100};
  }

  ${media.mobile} {
    font-size: 1rem;
    padding: ${theme.spacing.xs};
    min-width: 2.25rem;
    min-height: 2.25rem;
  }

  ${media.tablet} {
    font-size: 1.1rem;
  }
`;

const BackButton = styled(Link)`
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  border: 2px solid ${theme.colors.gray200};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  ${media.mobile} {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    gap: ${theme.spacing.xs};
    font-size: 0.875rem;
  }

  ${media.tablet} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    gap: ${theme.spacing.sm};
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray700};
  font-size: 1.25rem;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;
  display: none;
  min-width: 2.5rem;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  &:active {
    background: ${theme.colors.gray100};
  }

  ${media.tabletDown} {
    display: flex;
  }

  ${media.mobile} {
    font-size: 1.125rem;
    min-width: 2.25rem;
    min-height: 2.25rem;
  }
`;

const MobileNavActions = styled.div`
  display: none;

  ${media.tabletDown} {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.lg} 0;
    border-top: 1px solid ${theme.colors.gray200};
    margin-top: ${theme.spacing.lg};
    width: 100%;
  }

  ${media.mobile} {
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.md} 0;
  }
`;

const MobileActionButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.gray50};
  color: ${theme.colors.gray700};

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.875rem;
  }
`;

const HotelNavbar = ({ showBackToMain = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get live hotel data from Redux
  const liveHotels = useSelector(state => state.hotelManagement?.liveHotels || []);

  // Extract hotel slug from URL path like "/taj-palace/rooms/101"
  const hotelSlug = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    // For hotel routes, the first segment is usually the hotel slug
    return pathSegments.length > 0 && pathSegments[0] !== 'hotels'
      ? pathSegments[0]
      : '';
  }, [location.pathname]);

  // Get current hotel data
  const currentHotel = useMemo(() => {
    if (!hotelSlug) return null;
    // First try to find in live hotels (updated data)
    const liveHotel = liveHotels.find(h => h.slug === hotelSlug || h.id === parseInt(hotelSlug));
    if (liveHotel) return liveHotel;
    // Fallback to static data
    return getHotelByIdOrSlug(hotelSlug);
  }, [hotelSlug, liveHotels]);

  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <NavbarContainer isScrolled={isScrolled}>
      <NavbarContent>
        <Logo to={currentHotel ? `/${currentHotel.slug}` : '/hotels'}>
          <FaHotel />
          {currentHotel ? currentHotel.name : 'HotelBooker'}
        </Logo>

        <NavLinks isOpen={mobileMenuOpen}>
          <NavLink to={'hoteladmin'} onClick={closeMobileMenu}>
            Admin Panel
          </NavLink>
          <NavLink
            to={currentHotel ? `/${currentHotel.slug}/rooms` : '/hotels'}
            onClick={closeMobileMenu}
          >
            Book Room
          </NavLink>

          <MobileNavActions>
            <MobileActionButton
              to={currentHotel ? `/${currentHotel.slug}/rooms` : '/hotels'}
              onClick={closeMobileMenu}
            >
              <FaBed />
              Book Room
            </MobileActionButton>
          </MobileNavActions>
        </NavLinks>

        <NavActions>
          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavActions>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default HotelNavbar;
