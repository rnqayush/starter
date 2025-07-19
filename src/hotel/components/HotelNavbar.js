import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHotel, FaUser, FaCalendarAlt, FaHome } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

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
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.gray700};
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: ${theme.colors.primary};
  }

  &.active {
    color: ${theme.colors.primary};

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${theme.colors.primary};
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const ActionButton = styled.button`
  background: none;
  color: ${theme.colors.gray700};
  font-size: 1.2rem;
  transition: color 0.2s ease;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray100};
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

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const HotelNavbar = ({ showBackToMain = true }) => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo to="/hotels">
          <FaHotel />
          HotelBooker
        </Logo>

        <NavLinks>
          <NavLink to="/hotels">Find Hotels</NavLink>
          <NavLink to="/my-bookings">My Bookings</NavLink>
          <NavLink to="/owner/dashboard">Hotel Owner</NavLink>
        </NavLinks>

        <NavActions>
          {showBackToMain && (
            <BackButton to="/" title="Back to Main Site">
              <FaHome />
              Main Site
            </BackButton>
          )}

          <ActionButton
            title="My Bookings"
            onClick={() => navigate("/my-bookings")}
          >
            <FaCalendarAlt />
          </ActionButton>

          <ActionButton title="User Account">
            <FaUser />
          </ActionButton>
        </NavActions>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default HotelNavbar;
