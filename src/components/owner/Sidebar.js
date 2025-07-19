import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FaHome,
  FaPlus,
  FaHotel,
  FaBed,
  FaCalendarCheck,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { theme, media } from "../../styles/GlobalStyle";

const SidebarContainer = styled.aside.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray200};
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 20;

  @media (max-width: ${theme.breakpoints.tablet}) {
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  }
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const SidebarNav = styled.nav`
  padding: ${theme.spacing.lg} 0;
`;

const NavSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  padding: 0 ${theme.spacing.xl} ${theme.spacing.sm};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const NavItem = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.gray700};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
  }

  ${(props) =>
    props.active &&
    `
    background: ${theme.colors.primary}10;
    border-right: 3px solid ${theme.colors.primary};
  `}
`;

const NavIcon = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
`;

const MobileToggle = styled.button`
  position: fixed;
  top: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  z-index: 30;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  cursor: pointer;
  box-shadow: ${theme.shadows.md};
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    {
      section: "Dashboard",
      items: [
        { path: "/owner/dashboard", icon: FaHome, label: "Dashboard Home" },
      ],
    },
    {
      section: "Hotel Management",
      items: [
        { path: "/owner/add-hotel", icon: FaPlus, label: "Add Hotel" },
        { path: "/owner/my-hotels", icon: FaHotel, label: "My Hotels" },
      ],
    },
    {
      section: "Room Management",
      items: [{ path: "/owner/add-room/1", icon: FaBed, label: "Add Rooms" }],
    },
    {
      section: "Bookings",
      items: [
        {
          path: "/owner/bookings",
          icon: FaCalendarCheck,
          label: "Bookings Received",
        },
      ],
    },
    {
      section: "Account",
      items: [
        { path: "/owner/profile", icon: FaUser, label: "Profile Settings" },
      ],
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <MobileToggle onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>

      <Overlay isOpen={isOpen} onClick={closeSidebar} />

      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Logo>
            <FaHotel />
            StayEase
          </Logo>
        </SidebarHeader>

        <SidebarNav>
          {navigationItems.map((section) => (
            <NavSection key={section.section}>
              <SectionTitle>{section.section}</SectionTitle>
              {section.items.map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  active={isActive(item.path)}
                  onClick={closeSidebar}
                >
                  <NavIcon>
                    <item.icon />
                  </NavIcon>
                  {item.label}
                </NavItem>
              ))}
            </NavSection>
          ))}

          <NavSection>
            <NavItem to="/" onClick={closeSidebar}>
              <NavIcon>
                <FaSignOutAlt />
              </NavIcon>
              Back to Customer View
            </NavItem>
          </NavSection>
        </SidebarNav>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
