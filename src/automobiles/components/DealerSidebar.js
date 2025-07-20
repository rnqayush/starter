import React, { useState } from "react";
import styled from "styled-components";
import {
  FaHome,
  FaCar,
  FaPlus,
  FaShoppingCart,
  FaEnvelope,
  FaChartLine,
  FaStore,
  FaUsers,
  FaFileImport,
  FaCog,
  FaBars,
  FaTimes,
  FaDollarSign,
  FaExchangeAlt,
  FaWrench,
  FaTags,
  FaArrowLeft,
} from "react-icons/fa";
import { theme, media } from "../../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray200};
  box-shadow: ${theme.shadows.sm};
  z-index: 1000;
  overflow-y: auto;
  transition: transform 0.3s ease;

  ${media.tabletDown} {
    width: 260px;
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
    z-index: 1001;
  }

  ${media.mobile} {
    width: 240px;
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
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

const DealerBranding = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  ${media.mobile} {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
  }
`;

const DealerLogo = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 1.5rem;
  font-weight: 600;

  ${media.mobile} {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
`;

const DealerLogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.lg};
  object-fit: cover;

  ${media.mobile} {
    width: 45px;
    height: 45px;
  }
`;

const DealerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const DealerName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;

const DealerRole = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  margin: 0;
`;

const BackToDealership = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.gray100};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray200};
    color: ${theme.colors.primary};
  }

  ${media.mobile} {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.8rem;
  }
`;

const Navigation = styled.nav`
  padding: ${theme.spacing.lg} 0;
`;

const NavSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 ${theme.spacing.xl} ${theme.spacing.md} ${theme.spacing.xl};

  ${media.mobile} {
    margin: 0 ${theme.spacing.lg} ${theme.spacing.sm} ${theme.spacing.lg};
  }
`;

const NavItem = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${(props) => (props.active ? `${theme.colors.primary}15` : "transparent")};
  border: none;
  border-left: 3px solid ${(props) => (props.active ? theme.colors.primary : "transparent")};
  color: ${(props) => (props.active ? theme.colors.primary : theme.colors.gray700)};
  font-size: 0.9rem;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }

  .icon {
    font-size: 1rem;
    width: 18px;
    flex-shrink: 0;
  }

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    gap: ${theme.spacing.sm};
    font-size: 0.85rem;

    .icon {
      font-size: 0.9rem;
      width: 16px;
    }
  }
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  width: 50px;
  height: 50px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.gray700};
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1002;
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  ${media.tabletDown} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;

  ${media.tabletDown} {
    display: block;
  }
`;

const DealerSidebar = ({ activeTab, onTabChange, dealer }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    onTabChange(tab);
    setIsMobileOpen(false);
  };

  const handleBackToDealership = () => {
    navigate(`/${dealer.slug}`);
  };

  const navItems = [
    {
      section: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: FaHome },
      ]
    },
    {
      section: "Inventory Management",
      items: [
        { id: "inventory", label: "Vehicle Inventory", icon: FaCar },
        { id: "add-vehicle", label: "Add Vehicle", icon: FaPlus },
        { id: "bulk-import", label: "Bulk Import", icon: FaFileImport },
      ]
    },
    {
      section: "Sales & Orders",
      items: [
        { id: "orders", label: "Sales & Orders", icon: FaShoppingCart },
        { id: "enquiries", label: "Enquiries", icon: FaEnvelope },
        { id: "customers", label: "Customers", icon: FaUsers },
      ]
    },
    {
      section: "Services",
      items: [
        { id: "financing", label: "Financing", icon: FaDollarSign },
        { id: "trade-ins", label: "Trade-Ins", icon: FaExchangeAlt },
        { id: "service", label: "Service Center", icon: FaWrench },
        { id: "promotions", label: "Promotions", icon: FaTags },
      ]
    },
    {
      section: "Analytics & Settings",
      items: [
        { id: "analytics", label: "Analytics", icon: FaChartLine },
        { id: "dealer-settings", label: "Settings", icon: FaCog },
      ]
    }
  ];

  return (
    <>
      <MobileToggle onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>

      <Overlay isOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />

      <SidebarContainer isOpen={isMobileOpen}>
        <SidebarHeader>
          <DealerBranding>
            {dealer.logo ? (
              <DealerLogoImage src={dealer.logo} alt={dealer.name} />
            ) : (
              <DealerLogo>
                {dealer.name.charAt(0)}
              </DealerLogo>
            )}
            <DealerInfo>
              <DealerName>{dealer.name}</DealerName>
              <DealerRole>Dealer Dashboard</DealerRole>
            </DealerInfo>
          </DealerBranding>
          
          <BackToDealership onClick={handleBackToDealership}>
            <FaArrowLeft />
            Back to Dealership
          </BackToDealership>
        </SidebarHeader>

        <Navigation>
          {navItems.map((section) => (
            <NavSection key={section.section}>
              <SectionTitle>{section.section}</SectionTitle>
              {section.items.map((item) => (
                <NavItem
                  key={item.id}
                  active={activeTab === item.id}
                  onClick={() => handleTabChange(item.id)}
                >
                  <item.icon className="icon" />
                  {item.label}
                </NavItem>
              ))}
            </NavSection>
          ))}
        </Navigation>
      </SidebarContainer>
    </>
  );
};

export default DealerSidebar;
