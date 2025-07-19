import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHotel, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";
import { Button } from "./Button";

const HeaderContainer = styled.header`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  text-decoration: none;
`;

const Nav = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${theme.colors.white};
    flex-direction: column;
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.lg};
    transform: translateY(${(props) => (props.isOpen ? "0" : "-100%")});
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: all 0.3s ease;
    z-index: 99;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.gray700};
  font-weight: 500;
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
  }

  &.active {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  font-weight: 500;
  background: none;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
  }

  svg {
    transition: transform 0.2s ease;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
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
  min-width: 200px;
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});
  transition: all 0.2s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    position: static;
    box-shadow: none;
    border: none;
    background: ${theme.colors.gray50};
    margin-top: ${theme.spacing.sm};
    opacity: 1;
    visibility: visible;
    transform: none;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${theme.colors.gray700};
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${theme.colors.gray100};

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
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const LoginButton = styled(Link)`
  color: ${theme.colors.gray700};
  font-weight: 500;
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
  }
`;

const RegisterButton = styled(Button)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-1px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.gray700};
  font-size: 1.25rem;
  padding: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
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

  const handleDropdownItemClick = () => {
    closeDropdown();
    closeMobileMenu();
  };

  return (
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
                <DropdownButton onClick={toggleDropdown} isOpen={dropdownOpen}>
                  Explore Stores
                  <FaChevronDown />
                </DropdownButton>
                <DropdownMenu isOpen={dropdownOpen}>
                  <DropdownItem to="/hotels" onClick={handleDropdownItemClick}>
                    🏨 Hotels
                  </DropdownItem>
                  <DropdownItem
                    to="/ecommerce"
                    onClick={handleDropdownItemClick}
                  >
                    🛍 Ecommerce
                  </DropdownItem>
                  <DropdownItem
                    to="/weddings"
                    onClick={handleDropdownItemClick}
                  >
                    💍 Weddings
                  </DropdownItem>
                  <DropdownItem
                    to="/automobiles"
                    onClick={handleDropdownItemClick}
                  >
                    🚗 Automobiles
                  </DropdownItem>
                </DropdownMenu>
              </DropdownContainer>
            </>
          )}
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

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
