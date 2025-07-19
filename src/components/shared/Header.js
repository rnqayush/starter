import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHotel, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";

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

const Nav = styled.nav`
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

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const UserTypeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.gray100};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray200};
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
  const navigate = useNavigate();
  const { userType, setUserType, user } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleUserType = () => {
    const newUserType = userType === "customer" ? "owner" : "customer";
    setUserType(newUserType);

    if (newUserType === "owner") {
      navigate("/owner/dashboard");
    } else {
      navigate("/");
    }
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo
          to={isOwnerView ? "/owner/dashboard" : "/"}
          onClick={closeMobileMenu}
        >
          <FaHotel />
          StayEase
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
              <NavLink to="/my-bookings" onClick={closeMobileMenu}>
                My Bookings
              </NavLink>
            </>
          )}
        </Nav>

        <UserSection>
          <UserTypeToggle onClick={toggleUserType}>
            <FaUser />
            {userType === "customer" ? "Switch to Owner" : "Switch to Customer"}
          </UserTypeToggle>

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
