import React, { useState, useMemo } from "react";
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
  width: 17.5rem;
  height: 100vh;
  background: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray200};
  overflow-y: auto;
  overflow-x: hidden;
  transition: transform 0.3s ease;
  z-index: 20;

  ${media.tabletDown} {
    width: 16rem;
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  }

  ${media.mobile} {
    width: 15rem;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray100};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray300};
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray400};
  }
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};

  ${media.mobile} {
    font-size: 1.25rem;
    gap: ${theme.spacing.xs};
  }

  svg {
    font-size: 1.25rem;

    ${media.mobile} {
      font-size: 1rem;
    }
  }
`;

const SidebarNav = styled.nav`
  padding: ${theme.spacing.lg} 0;

  ${media.mobile} {
    padding: ${theme.spacing.md} 0;
  }
`;

const NavSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }

  ${media.mobile} {
    margin-bottom: ${theme.spacing.md};
  }
`;

const SectionTitle = styled.h3`
  padding: 0 ${theme.spacing.xl} ${theme.spacing.sm};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg} ${theme.spacing.xs};
    font-size: 0.75rem;
  }
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
  font-size: 0.875rem;

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

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    gap: ${theme.spacing.sm};
    font-size: 0.8125rem;
  }
`;

const NavIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  ${media.mobile} {
    width: 1rem;
    height: 1rem;
  }

  svg {
    font-size: 1rem;

    ${media.mobile} {
      font-size: 0.875rem;
    }
  }
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
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  &:active {
    background: ${theme.colors.gray100};
  }

  ${media.tabletDown} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${media.mobile} {
    top: ${theme.spacing.md};
    left: ${theme.spacing.md};
    padding: ${theme.spacing.xs};
  }

  svg {
    font-size: 1rem;

    ${media.mobile} {
      font-size: 0.875rem;
    }
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
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;

  ${media.tabletDown} {
    display: block;
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Extract hotel slug from URL path like "/taj-palace/owner"
  const hotelSlug = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments.length > 0 ? pathSegments[0] : '';
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const navigationItems = useMemo(() => [
    {
      section: "Dashboard",
      items: [
        { path: `/${hotelSlug}/owner`, icon: FaHome, label: "Dashboard Home" },
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
  ], [hotelSlug]);

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
            <NavItem to={`/${hotelSlug}`} onClick={closeSidebar}>
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
