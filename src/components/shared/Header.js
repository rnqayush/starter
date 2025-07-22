import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHotel, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { theme, media } from "../../styles/GlobalStyle";
import { Button } from "./Button";

const HeaderContainer = styled.header.withConfig({
  shouldForwardProp: (prop) => prop !== "isScrolled",
})`
  background: ${(props) => props.isScrolled ? theme.colors.white : 'transparent'};
  box-shadow: ${(props) => props.isScrolled ? theme.shadows.sm : 'none'};
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  transition: all 0.3s ease;
  backdrop-filter: ${(props) => props.isScrolled ? 'none' : 'blur(10px)'};
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.75rem;
  position: relative;

  ${media.mobile} {
    padding: 0 ${theme.spacing.md};
    min-height: 3.75rem;
    gap: ${theme.spacing.sm};
  }

  ${media.tablet} {
    padding: 0 ${theme.spacing.md};
    min-height: 3.625rem;
  }

  ${media.desktop} {
    padding: 0 ${theme.spacing.lg};
    min-height: 3.75rem;
  }

  @media (min-width: 1400px) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const Logo = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isScrolled",
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.isScrolled ? theme.colors.primary : theme.colors.white};
  text-decoration: none;
  flex-shrink: 0;
  transition: color 0.3s ease;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.mobile} {
    font-size: 1.125rem;
    gap: ${theme.spacing.xs};
    max-width: calc(100vw - 140px);
  }

  ${media.tablet} {
    font-size: 1.1875rem;
  }

  svg {
    font-size: 1.125rem;
    flex-shrink: 0;

    ${media.mobile} {
      font-size: 1rem;
    }
  }
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: ${theme.spacing.lg};

  ${media.tabletUp} {
    display: flex;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    gap: ${theme.spacing.md};
  }

  @media (min-width: 1201px) {
    gap: ${theme.spacing.xl};
  }
`;

const MobileNav = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  top: 3.75rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.white};
  flex-direction: column;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  box-shadow: ${theme.shadows.xl};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-100%")});
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  overflow-y: auto;
  gap: ${theme.spacing.sm};
  align-items: stretch;
  border-top: 1px solid ${theme.colors.gray200};
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(${theme.spacing.xl} + env(safe-area-inset-bottom));
  display: flex;

  ${media.tabletUp} {
    display: none;
  }
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isScrolled" && prop !== "isMobile",
})`
  color: ${(props) => 
    props.isMobile 
      ? theme.colors.gray700 
      : props.isScrolled 
        ? theme.colors.gray700 
        : 'rgba(255, 255, 255, 0.9)'
  };
  font-weight: ${(props) => props.isMobile ? '600' : '500'};
  text-decoration: none;
  padding: ${(props) => 
    props.isMobile 
      ? `${theme.spacing.lg} ${theme.spacing.xl}` 
      : `${theme.spacing.xs} ${theme.spacing.sm}`
  };
  border-radius: ${(props) => props.isMobile ? theme.borderRadius.lg : theme.borderRadius.md};
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  position: relative;
  font-size: ${(props) => props.isMobile ? '1.125rem' : '0.875rem'};
  width: ${(props) => props.isMobile ? '100%' : 'auto'};
  text-align: ${(props) => props.isMobile ? 'center' : 'left'};
  justify-content: ${(props) => props.isMobile ? 'center' : 'flex-start'};
  min-height: ${(props) => props.isMobile ? '48px' : 'auto'};

  &:hover {
    color: ${(props) => 
      props.isMobile 
        ? theme.colors.primary 
        : props.isScrolled 
          ? theme.colors.primary 
          : theme.colors.white
    };
    background: ${(props) => 
      props.isMobile 
        ? theme.colors.gray50 
        : props.isScrolled 
          ? theme.colors.gray50 
          : 'rgba(255, 255, 255, 0.1)'
    };
    transform: ${(props) => props.isMobile ? 'none' : 'translateY(-1px)'};
  }

  &.active {
    color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.white};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.8125rem;
  }

  @media (min-width: 1201px) {
    font-size: 0.875rem;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: ${(props) => props.isMobile ? '100%' : 'auto'};
`;

const DropdownButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isScrolled" && prop !== "isMobile",
})`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.isMobile ? 'center' : 'flex-start'};
  gap: ${theme.spacing.xs};
  color: ${(props) => 
    props.isMobile 
      ? theme.colors.gray700 
      : props.isScrolled 
        ? theme.colors.gray700 
        : 'rgba(255, 255, 255, 0.9)'
  };
  font-weight: ${(props) => props.isMobile ? '600' : '500'};
  background: none;
  border: none;
  padding: ${(props) => 
    props.isMobile 
      ? `${theme.spacing.lg} ${theme.spacing.xl}` 
      : `${theme.spacing.xs} ${theme.spacing.sm}`
  };
  border-radius: ${(props) => props.isMobile ? theme.borderRadius.lg : theme.borderRadius.md};
  transition: all 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${(props) => props.isMobile ? '1.125rem' : '0.875rem'};
  width: ${(props) => props.isMobile ? '100%' : 'auto'};
  min-height: ${(props) => props.isMobile ? '48px' : 'auto'};

  &:hover {
    color: ${(props) => 
      props.isMobile 
        ? theme.colors.primary 
        : props.isScrolled 
          ? theme.colors.primary 
          : theme.colors.white
    };
    background: ${(props) => 
      props.isMobile 
        ? theme.colors.gray50 
        : props.isScrolled 
          ? theme.colors.gray50 
          : 'rgba(255, 255, 255, 0.1)'
    };
    transform: ${(props) => props.isMobile ? 'none' : 'translateY(-1px)'};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  svg {
    transition: transform 0.2s ease;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    font-size: 0.875rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: ${theme.spacing.sm};
    font-size: 0.875rem;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
  }

  @media (min-width: 1201px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 1rem;
  }
`;

const DropdownMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isMobile",
})`
  position: ${(props) => props.isMobile ? 'static' : 'absolute'};
  top: ${(props) => props.isMobile ? 'auto' : '100%'};
  left: 0;
  background: ${(props) => props.isMobile ? theme.colors.gray50 : theme.colors.white};
  border-radius: ${(props) => props.isMobile ? theme.borderRadius.md : theme.borderRadius.lg};
  box-shadow: ${(props) => props.isMobile ? 'none' : theme.shadows.xl};
  border: ${(props) => props.isMobile ? 'none' : `1px solid ${theme.colors.gray200}`};
  min-width: ${(props) => props.isMobile ? 'auto' : '12.5rem'};
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) => props.isMobile ? 'none' : `translateY(${props.isOpen ? "0" : "-0.625rem"})`};
  transition: all 0.2s ease;
  margin-top: ${(props) => props.isMobile ? theme.spacing.sm : '0'};
  width: ${(props) => props.isMobile ? '100%' : 'auto'};

  ${media.tablet} {
    min-width: 10rem;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${theme.colors.gray100};
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  &:first-child {
    border-top-left-radius: ${theme.borderRadius.lg};
    border-top-right-radius: ${theme.borderRadius.lg};
  }

  &:last-child {
    border-bottom-left-radius: ${theme.borderRadius.lg};
    border-bottom-right-radius: ${theme.borderRadius.lg};
  }

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
    text-align: center;
    font-size: 1rem;
    border-bottom: 1px solid ${theme.colors.gray200};
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child,
    &:last-child {
      border-radius: 0;
    }

    &:hover, &:focus {
      background: ${theme.colors.gray50};
      color: ${theme.colors.primary};
    }

    &:active {
      background: ${theme.colors.gray100};
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-shrink: 0;
  min-width: 0;

  ${media.mobile} {
    gap: ${theme.spacing.xs};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    gap: ${theme.spacing.sm};
  }
`;

const LoginButton = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isScrolled",
})`
  color: ${(props) => props.isScrolled ? theme.colors.gray700 : 'rgba(255, 255, 255, 0.9)'};
  font-weight: 500;
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) => props.isScrolled ? theme.colors.primary : theme.colors.white};
    background: ${(props) => props.isScrolled ? theme.colors.gray50 : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  ${media.mobile} {
    display: none;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: ${theme.spacing.sm};
    font-size: 0.875rem;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
  }

  @media (min-width: 1201px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 1rem;
  }
`;

const RegisterButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => prop !== "isScrolled",
})`
  background: ${(props) => props.isScrolled ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)'};
  color: ${theme.colors.white};
  border: ${(props) => props.isScrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: ${(props) => props.isScrolled ? theme.shadows.sm : 'none'};
  backdrop-filter: ${(props) => props.isScrolled ? 'none' : 'blur(10px)'};

  &:hover {
    background: ${(props) => props.isScrolled ? theme.colors.primaryDark : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.sm};
  }

  ${media.mobile} {
    display: none;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.875rem;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: 0.9rem;
  }

  @media (min-width: 1201px) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: 1rem;
  }
`;

const MobileMenuButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isScrolled",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${(props) => props.isScrolled ? theme.colors.gray700 : theme.colors.white};
  font-size: 1.25rem;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  touch-action: manipulation;

  &:hover {
    background: ${(props) => props.isScrolled ? theme.colors.gray50 : 'rgba(255, 255, 255, 0.1)'};
    color: ${(props) => props.isScrolled ? theme.colors.primary : theme.colors.white};
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    background: ${(props) => props.isScrolled ? theme.colors.gray100 : 'rgba(255, 255, 255, 0.2)'};
    transform: scale(0.95);
  }

  ${media.tabletUp} {
    display: none;
  }
`;

const MobileAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl} 0;
  border-top: 1px solid ${theme.colors.gray200};
  margin-top: auto;
  width: 100%;
  padding-bottom: calc(${theme.spacing.xl} + env(safe-area-inset-bottom));
`;

const MobileAuthButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1.125rem;
  min-height: 48px;
  touch-action: manipulation;

  &.login {
    color: ${theme.colors.gray700};
    background: ${theme.colors.gray100};

    &:hover, &:focus {
      background: ${theme.colors.gray200};
      color: ${theme.colors.primary};
    }

    &:active {
      background: ${theme.colors.gray300};
    }
  }

  &.register {
    color: ${theme.colors.white};
    background: ${theme.colors.primary};

    &:hover, &:focus {
      background: ${theme.colors.primaryDark};
    }

    &:active {
      background: ${theme.colors.primaryDark};
      transform: scale(0.98);
    }
  }
`;

const MobileMenuOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);

  ${media.tabletUp} {
    display: none;
  }
`;

const Header = ({ isOwnerView = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close mobile menu and dropdown
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        if (mobileMenuOpen) {
          closeMobileMenu();
        }
        if (dropdownOpen) {
          closeDropdown();
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [mobileMenuOpen, dropdownOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Handle scroll detection for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownItemClick = () => {
    closeDropdown();
    closeMobileMenu();
  };

  return (
    <>
      <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
      <HeaderContainer isScrolled={isScrolled}>
        <HeaderContent>
          <Logo
            to={isOwnerView ? "/" : "/"}
            onClick={closeMobileMenu}
            isScrolled={isScrolled}
          >
            <FaHotel />
            StoreBuilder
          </Logo>

          {/* Desktop Navigation */}
          <DesktopNav>
            {isOwnerView ? (
              <>
                <NavLink to="/" isScrolled={isScrolled}>
                  Dashboard
                </NavLink>
                <NavLink to="/owner/my-hotels" isScrolled={isScrolled}>
                  My Hotels
                </NavLink>
                <NavLink to="/owner/bookings" isScrolled={isScrolled}>
                  Bookings
                </NavLink>
                <NavLink to="/owner/profile" isScrolled={isScrolled}>
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" isScrolled={isScrolled}>
                  Home
                </NavLink>
                <NavLink to="/pricing" isScrolled={isScrolled}>
                  Pricing
                </NavLink>
                <DropdownContainer ref={dropdownRef}>
                  <DropdownButton
                    onClick={toggleDropdown}
                    isOpen={dropdownOpen}
                    isScrolled={isScrolled}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    aria-label="Explore Stores menu"
                  >
                    Explore Stores
                    <FaChevronDown />
                  </DropdownButton>
                  <DropdownMenu isOpen={dropdownOpen} role="menu">
                    <DropdownItem
                      to="/hotels"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      🏨 Hotels
                    </DropdownItem>
                    <DropdownItem
                      to="/ecommerce"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      🛍 Ecommerce
                    </DropdownItem>
                    <DropdownItem
                      to="/weddings"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      💍 Weddings
                    </DropdownItem>
                    <DropdownItem
                      to="/automobiles"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      🚗 Automobiles
                    </DropdownItem>
                  </DropdownMenu>
                </DropdownContainer>
              </>
            )}
          </DesktopNav>

          {/* Mobile Navigation */}
          <MobileNav isOpen={mobileMenuOpen}>
            {isOwnerView ? (
              <>
                <NavLink to="/" onClick={closeMobileMenu} isMobile={true}>
                  Dashboard
                </NavLink>
                <NavLink to="/owner/my-hotels" onClick={closeMobileMenu} isMobile={true}>
                  My Hotels
                </NavLink>
                <NavLink to="/owner/bookings" onClick={closeMobileMenu} isMobile={true}>
                  Bookings
                </NavLink>
                <NavLink to="/owner/profile" onClick={closeMobileMenu} isMobile={true}>
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" onClick={closeMobileMenu} isMobile={true}>
                  Home
                </NavLink>
                <NavLink to="/pricing" onClick={closeMobileMenu} isMobile={true}>
                  Pricing
                </NavLink>
                <DropdownContainer isMobile={true}>
                  <DropdownButton
                    onClick={toggleDropdown}
                    isOpen={dropdownOpen}
                    isMobile={true}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    aria-label="Explore Stores menu"
                  >
                    Explore Stores
                    <FaChevronDown />
                  </DropdownButton>
                  <DropdownMenu isOpen={dropdownOpen} isMobile={true} role="menu">
                    <DropdownItem
                      to="/hotels"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      🏨 Hotels
                    </DropdownItem>
                    <DropdownItem
                      to="/ecommerce"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      🛍 Ecommerce
                    </DropdownItem>
                    <DropdownItem
                      to="/weddings"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      💍 Weddings
                    </DropdownItem>
                    <DropdownItem
                      to="/automobiles"
                      onClick={handleDropdownItemClick}
                      role="menuitem"
                    >
                      🚗 Automobiles
                    </DropdownItem>
                  </DropdownMenu>
                </DropdownContainer>
              </>
            )}

            <MobileAuthButtons>
              <MobileAuthButton
                to="/login"
                className="login"
                onClick={closeMobileMenu}
              >
                Login
              </MobileAuthButton>
              <MobileAuthButton
                to="/register"
                className="register"
                onClick={closeMobileMenu}
              >
                Register
              </MobileAuthButton>
            </MobileAuthButtons>
          </MobileNav>

          <UserSection>
            <LoginButton to="/login" onClick={closeMobileMenu} isScrolled={isScrolled}>
              Login
            </LoginButton>
            <RegisterButton
              as={Link}
              to="/register"
              onClick={closeMobileMenu}
              isScrolled={isScrolled}
              style={{ textDecoration: "none" }}
            >
              Register
            </RegisterButton>

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              isScrolled={isScrolled}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </MobileMenuButton>
          </UserSection>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;
