import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaCar,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaEnvelope,
  FaHeart,
  FaTachometerAlt,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const NavbarContainer = styled.nav`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${theme.colors.gray100};
  backdrop-filter: blur(10px);
`;

const NavbarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 70px;
    padding: 0 ${theme.spacing.xs};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 ${theme.spacing.sm};
  }

  @media (min-width: 1025px) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Logo = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;
  white-space: nowrap;
  min-width: 0;
  text-decoration: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.4rem;
    gap: ${theme.spacing.xs};
  }

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.lg};
  object-fit: cover;
  border: 2px solid ${theme.colors.gray200};
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
    border-color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 1024px) {
    width: 45px;
    height: 45px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex: 1;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.gray700};
  font-weight: 500;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  text-decoration: none;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }

  &.active {
    background: ${theme.colors.primary}10;
    color: ${theme.colors.primary};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  margin: 0 ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 2.5rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.sm};
  }
`;

const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.gray700};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.white};
  z-index: 200;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (min-width: ${theme.breakpoints.tablet + 1}px) {
    display: none;
  }
`;

const MobileMenuHeader = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  font-weight: 500;
  border-bottom: 1px solid ${theme.colors.gray100};
  text-decoration: none;

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MobileSearchContainer = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.lg};
`;

const Navbar = ({
  dealerName = "Auto Dealer",
  dealerLogo,
  dealerSlug = "",
  theme: customTheme = {},
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getBaseUrl = () => (dealerSlug ? `/${dealerSlug}` : "/automobiles");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${getBaseUrl()}/vehicles?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <NavbarContent>
          <Logo to={getBaseUrl()} theme={customTheme}>
            {dealerLogo && (
              <LogoImage
                src={dealerLogo}
                alt={`${dealerName} logo`}
                theme={customTheme}
              />
            )}
            <span>{dealerName}</span>
          </Logo>

          <NavLinks>
            <NavLink to={getBaseUrl()}>
              <FaHome />
              Home
            </NavLink>
            <NavLink to={`${getBaseUrl()}/vehicles`}>
              <FaCar />
              Vehicles
            </NavLink>
            <NavLink to={`${getBaseUrl()}/vehicles?category=luxury-cars`}>
              Luxury
            </NavLink>
            <NavLink to={`${getBaseUrl()}/vehicles?category=electric-vehicles`}>
              Electric
            </NavLink>
          </NavLinks>

          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </SearchContainer>

                    <ActionButtons>
            <IconButton
              title="Dealer Dashboard"
              onClick={() => navigate(`${getBaseUrl()}/dealer-dashboard`)}
            >
              <FaTachometerAlt />
            </IconButton>
                        <IconButton
              title="Wishlist"
              onClick={() => navigate(`${getBaseUrl()}/wishlist`)}
            >
              <FaHeart />
            </IconButton>
                        <IconButton title="Contact">
              <FaEnvelope />
            </IconButton>
            <IconButton title="Account">
              <FaUser />
            </IconButton>
          </ActionButtons>

          <MobileMenuButton onClick={handleMobileMenuToggle}>
            <FaBars />
          </MobileMenuButton>
        </NavbarContent>
      </NavbarContainer>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <Logo to={getBaseUrl()} theme={customTheme} onClick={closeMobileMenu}>
            {dealerLogo && (
              <LogoImage
                src={dealerLogo}
                alt={`${dealerName} logo`}
                theme={customTheme}
              />
            )}
            <span>{dealerName}</span>
          </Logo>
          <IconButton onClick={closeMobileMenu}>
            <FaTimes />
          </IconButton>
        </MobileMenuHeader>

        <MobileMenuContent>
          <MobileSearchContainer>
            <form onSubmit={handleSearch}>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </MobileSearchContainer>

          <MobileNavLink to={getBaseUrl()} onClick={closeMobileMenu}>
            <FaHome />
            Home
          </MobileNavLink>
          <MobileNavLink to={`${getBaseUrl()}/vehicles`} onClick={closeMobileMenu}>
            <FaCar />
            All Vehicles
          </MobileNavLink>
          <MobileNavLink to={`${getBaseUrl()}/vehicles?category=luxury-cars`} onClick={closeMobileMenu}>
            <FaCar />
            Luxury Cars
          </MobileNavLink>
          <MobileNavLink to={`${getBaseUrl()}/vehicles?category=electric-vehicles`} onClick={closeMobileMenu}>
            <FaCar />
            Electric Vehicles
          </MobileNavLink>
          <MobileNavLink to={`${getBaseUrl()}/vehicles?category=suvs-trucks`} onClick={closeMobileMenu}>
            <FaCar />
            SUVs & Trucks
          </MobileNavLink>
          <MobileNavLink to={`${getBaseUrl()}/vehicles?category=classic-cars`} onClick={closeMobileMenu}>
            <FaCar />
            Classic Cars
          </MobileNavLink>
                              <MobileNavLink to={`${getBaseUrl()}/dealer-dashboard`} onClick={closeMobileMenu}>
            <FaTachometerAlt />
            Dealer Dashboard
          </MobileNavLink>
                    <MobileNavLink to={`${getBaseUrl()}/wishlist`} onClick={closeMobileMenu}>
            <FaHeart />
            Wishlist
          </MobileNavLink>
          <MobileNavLink to="#" onClick={closeMobileMenu}>
            <FaEnvelope />
            Contact
          </MobileNavLink>
          <MobileNavLink to="#" onClick={closeMobileMenu}>
            <FaUser />
            Account
          </MobileNavLink>
        </MobileMenuContent>
      </MobileMenu>
    </>
  );
};

export default Navbar;
