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
    padding: 0 ${theme.spacing.sm};
    min-height: 3.5rem;
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

  ${media.mobile} {
    font-size: 1.125rem;
    gap: ${theme.spacing.xs};
  }

  ${media.tablet} {
    font-size: 1.1875rem;
  }

  svg {
    font-size: 1.125rem;

    ${media.mobile} {
      font-size: 1rem;
    }
  }
`;

const Nav = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  ${media.mobileDown} {
    position: fixed;
    top: 3.75rem;
    left: 0;
    right: 0;
    background: ${theme.colors.white};
    flex-direction: column;
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.xl};
    transform: translateY(${(props) => (props.isOpen ? "0" : "-100%")});
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    max-height: calc(100vh - 3.75rem);
    overflow-y: auto;
    gap: ${theme.spacing.md};
    align-items: stretch;
    border-top: 1px solid ${theme.colors.gray200};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    gap: ${theme.spacing.md};
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    gap: ${theme.spacing.lg};
  }

  @media (min-width: 1201px) {
    gap: ${theme.spacing.xl};
  }
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isScrolled",
})`
  color: ${(props) => props.isScrolled ? theme.colors.gray700 : 'rgba(255, 255, 255, 0.9)'};
  font-weight: 500;
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 0.875rem;

  &:hover {
    color: ${(props) => props.isScrolled ? theme.colors.primary : theme.colors.white};
    background: ${(props) => props.isScrolled ? theme.colors.gray50 : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-1px);
  }

  &.active {
    color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.white};
  }

  ${media.mobileDown} {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    width: 100%;
    text-align: center;
    justify-content: center;
    font-size: 1.125rem;
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.gray700};

    &:hover {
      color: ${theme.colors.primary};
      background: ${theme.colors.gray50};
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.8125rem;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.875rem;
  }

  @media (min-width: 1201px) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.875rem;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  ${media.mobileDown} {
    width: 100%;
  }
`;

const DropdownButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isScrolled",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  color: ${(props) => props.isScrolled ? theme.colors.gray700 : 'rgba(255, 255, 255, 0.9)'};
  font-weight: 500;
  background: none;
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.875rem;

  &:hover {
    color: ${(props) => props.isScrolled ? theme.colors.primary : theme.colors.white};
    background: ${(props) => props.isScrolled ? theme.colors.gray50 : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-1px);
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

  ${media.mobileDown} {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    width: 100%;
    font-size: 1.125rem;
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.gray700};

    &:hover {
      color: ${theme.colors.primary};
      background: ${theme.colors.gray50};
    }
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
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.gray200};
  min-width: 12.5rem;
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-0.625rem")});
  transition: all 0.2s ease;

  ${media.mobileDown} {
    position: static;
    box-shadow: none;
    border: none;
    background: ${theme.colors.gray50};
    margin-top: ${theme.spacing.sm};
    opacity: 1;
    visibility: visible;
    transform: none;
    border-radius: ${theme.borderRadius.md};
    width: 100%;
  }

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

  ${media.mobileDown} {
    padding: ${theme.spacing.md};
    text-align: center;
    font-size: 1rem;
    border-bottom: 1px solid ${theme.colors.gray200};

    &:first-child,
    &:last-child {
      border-radius: 0;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-shrink: 0;

  ${media.mobileDown} {
    gap: ${theme.spacing.sm};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    gap: ${theme.spacing.sm};
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    gap: ${theme.spacing.md};
  }

  @media (min-width: 1201px) {
    gap: ${theme.spacing.md};
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

  ${media.mobileDown} {
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

  ${media.mobileDown} {
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
  display: none;
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

  ${media.mobileDown} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const MobileAuthButtons = styled.div`
  display: none;

  ${media.mobileDown} {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.lg} 0;
    border-top: 1px solid ${theme.colors.gray200};
    margin-top: ${theme.spacing.lg};
    width: 100%;
  }
`;

const MobileAuthButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1rem;

  &.login {
    color: ${theme.colors.gray700};
    background: ${theme.colors.gray100};

    &:hover {
      background: ${theme.colors.gray200};
      color: ${theme.colors.primary};
    }
  }

  &.register {
    color: ${theme.colors.white};
    background: ${theme.colors.primary};

    &:hover {
      background: ${theme.colors.primaryDark};
    }
  }
`;



const Header = ({ isOwnerView = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleDropdownItemClick = () => {
    closeDropdown();
    closeMobileMenu();
  };

    return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo
            to={isOwnerView ? "/owner/dashboard" : "/"}
            onClick={closeMobileMenu}
          >
            <FaHotel />
            StoreBuilder
          </Logo>

          <Nav isOpen={mobileMenuOpen}>
            {isOwnerView ? (
              <>
                <NavLink to="/owner/dashboard" onClick={closeMobileMenu}>
                  Dashboard
                </NavLink>
                <NavLink to="/owner/my-hotels" onClick={closeMobileMenu}>
                  My Hotels
                </NavLink>
                <NavLink to="/owner/bookings" onClick={closeMobileMenu}>
                  Bookings
                </NavLink>
                <NavLink to="/owner/profile" onClick={closeMobileMenu}>
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" onClick={closeMobileMenu}>
                  Home
                </NavLink>
                <NavLink to="/pricing" onClick={closeMobileMenu}>
                  Pricing
                </NavLink>
                <DropdownContainer ref={dropdownRef}>
                  <DropdownButton
                    onClick={toggleDropdown}
                    isOpen={dropdownOpen}
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
          </Nav>

          <UserSection>
            <LoginButton to="/login" onClick={closeMobileMenu}>
              Login
            </LoginButton>
            <RegisterButton
              as={Link}
              to="/register"
              onClick={closeMobileMenu}
              style={{ textDecoration: "none" }}
            >
              Register
            </RegisterButton>

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
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
