import React from "react";
import styled from "styled-components";
import {
  FaHome,
  FaBox,
  FaPlus,
  FaShoppingCart,
  FaChartLine,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const SidebarContainer = styled.div`
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

  @media (max-width: 1024px) {
    transform: translateX(-100%);
  }

  &.mobile-open {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const StoreBranding = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StoreLogo = styled.div`
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
`;

const StoreInfo = styled.div`
  flex: 1;
`;

const StoreName = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const StoreType = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const SellerProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 0.9rem;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const ProfileRole = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const Navigation = styled.nav`
  padding: ${theme.spacing.lg} 0;
`;

const NavSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const NavSectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 ${theme.spacing.md} 0;
  padding: 0 ${theme.spacing.xl};
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${(props) =>
    props.active ? theme.colors.primary + "10" : "transparent"};
  border: none;
  border-left: 3px solid
    ${(props) => (props.active ? theme.colors.primary : "transparent")};
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.gray700};
  font-size: 0.95rem;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${(props) =>
      props.active ? theme.colors.primary + "10" : theme.colors.gray50};
    color: ${(props) =>
      props.active ? theme.colors.primary : theme.colors.gray900};
  }

  svg {
    font-size: 1.1rem;
    opacity: ${(props) => (props.active ? "1" : "0.7")};
  }
`;

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.white};
`;

const UpgradeCard = styled.div`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.white};
  text-align: center;
`;

const UpgradeTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const UpgradeText = styled.p`
  font-size: 0.8rem;
  opacity: 0.9;
  margin: 0 0 ${theme.spacing.md} 0;
`;

const UpgradeButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SellerSidebar = ({ activeTab, onTabChange }) => {
  const navItems = [
    {
      section: "Overview",
      items: [{ id: "dashboard", label: "Dashboard", icon: FaHome }],
    },
    {
      section: "Catalog",
      items: [
        { id: "products", label: "Products", icon: FaBox },
        { id: "add-product", label: "Add Product", icon: FaPlus },
      ],
    },
    {
      section: "Sales",
      items: [
        { id: "orders", label: "Orders", icon: FaShoppingCart },
        { id: "insights", label: "Insights", icon: FaChartLine },
      ],
    },
  ];

  return (
    <SidebarContainer>
      <SidebarHeader>
        <StoreBranding>
          <StoreLogo>
            <FaStore />
          </StoreLogo>
          <StoreInfo>
            <StoreName>My Store</StoreName>
            <StoreType>Premium Seller</StoreType>
          </StoreInfo>
        </StoreBranding>

        <SellerProfile>
          <ProfileAvatar>
            <FaUser />
          </ProfileAvatar>
          <ProfileInfo>
            <ProfileName>John Doe</ProfileName>
            <ProfileRole>Store Owner</ProfileRole>
          </ProfileInfo>
        </SellerProfile>
      </SidebarHeader>

      <Navigation>
        {navItems.map((section, sectionIndex) => (
          <NavSection key={sectionIndex}>
            <NavSectionTitle>{section.section}</NavSectionTitle>
            {section.items.map((item) => (
              <NavItem
                key={item.id}
                active={activeTab === item.id}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon />
                {item.label}
              </NavItem>
            ))}
          </NavSection>
        ))}
      </Navigation>

      <SidebarFooter>
        <UpgradeCard>
          <UpgradeTitle>Upgrade to Pro</UpgradeTitle>
          <UpgradeText>
            Get advanced analytics and unlimited products
          </UpgradeText>
          <UpgradeButton>Upgrade Now</UpgradeButton>
        </UpgradeCard>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default SellerSidebar;
