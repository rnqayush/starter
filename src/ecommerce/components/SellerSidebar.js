import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaHome,
  FaBox,
  FaPlus,
  FaShoppingCart,
  FaEnvelope,
  FaChartLine,
  FaStore,
  FaUser,
  FaTags,
  FaPercent,
  FaCog,
  FaUsers,
  FaFileImport,
  FaPalette,
  FaBars,
  FaTimes,
  FaSave,
  FaUndo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEye,
  FaList,
  FaSort,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';

const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
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
    transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
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

const StoreBranding = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  ${media.mobile} {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
  }
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

  ${media.mobile} {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
`;

const StoreInfo = styled.div`
  flex: 1;
`;

const StoreName = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;

  ${media.mobile} {
    font-size: 1rem;
  }
`;

const StoreType = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
  margin: 0;

  ${media.mobile} {
    font-size: 0.8rem;
  }
`;

const SellerProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};

  ${media.mobile} {
    padding: ${theme.spacing.sm};
    gap: ${theme.spacing.xs};
  }
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

  ${media.mobile} {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0;

  ${media.mobile} {
    font-size: 0.85rem;
  }
`;

const ProfileRole = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.gray600};
  margin: 0;

  ${media.mobile} {
    font-size: 0.7rem;
  }
`;

const Navigation = styled.nav`
  padding: ${theme.spacing.lg} 0;

  ${media.mobile} {
    padding: ${theme.spacing.md} 0;
  }
`;

const NavSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  ${media.mobile} {
    margin-bottom: ${theme.spacing.md};
  }
`;

const NavSectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 ${theme.spacing.md} 0;
  padding: 0 ${theme.spacing.xl};

  ${media.mobile} {
    padding: 0 ${theme.spacing.lg};
    font-size: 0.7rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const NavItem = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${props =>
    props.active ? theme.colors.primary + '10' : 'transparent'};
  border: none;
  border-left: 3px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray700};
  font-size: 0.95rem;
  font-weight: ${props => (props.active ? '600' : '500')};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${props =>
      props.active ? theme.colors.primary + '10' : theme.colors.gray50};
    color: ${props =>
      props.active ? theme.colors.primary : theme.colors.gray900};
  }

  svg {
    font-size: 1.1rem;
    opacity: ${props => (props.active ? '1' : '0.7')};
  }

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    gap: ${theme.spacing.sm};
    font-size: 0.875rem;

    svg {
      font-size: 1rem;
    }
  }
`;

const MobileToggle = styled.button`
  position: fixed;
  top: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  z-index: 1002;
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
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  ${media.tabletDown} {
    display: block;
  }
`;

const SellerSidebar = ({
  activeTab,
  onTabChange,
  vendor,
  hasUnsavedChanges,
  onSave,
  onDiscard
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleTabChange = tabId => {
    onTabChange(tabId);
    closeSidebar();
  };
  const navItems = [
    {
      section: 'Overview',
      items: [{ id: 'dashboard', label: 'Dashboard', icon: FaHome }],
    },
    {
      section: 'Website Sections',
      items: [
        { id: 'section-order', label: 'Section Order', icon: FaHome },
        { id: 'section-hero', label: 'Hero Section', icon: FaHome },
        { id: 'section-categories', label: 'Categories Section', icon: FaTags },
        { id: 'section-featured', label: 'Featured Products', icon: FaBox },
        { id: 'section-special-offers', label: 'Special Offers', icon: FaPercent },
        { id: 'section-footer', label: 'Footer Section', icon: FaCog },
        { id: 'section-custom', label: 'Custom Section', icon: FaPalette },
      ],
    },
    {
      section: 'Catalog',
      items: [
        { id: 'products', label: 'Product Inventory', icon: FaBox },
        { id: 'categories', label: 'Category Management', icon: FaTags },
        { id: 'add-product', label: 'Add New Product', icon: FaPlus },
        { id: 'bulk-import', label: 'Bulk Import', icon: FaFileImport },
      ],
    },
    {
      section: 'Sales & Orders',
      items: [
        { id: 'orders', label: 'Sales & Orders', icon: FaShoppingCart },
        { id: 'enquiries', label: 'Customer Enquiries', icon: FaEnvelope },
        { id: 'discounts', label: 'Discounts & Coupons', icon: FaPercent },
      ],
    },
    {
      section: 'Customers',
      items: [{ id: 'customers', label: 'Customer Management', icon: FaUsers }],
    },
    {
      section: 'Settings & Analytics',
      items: [
        { id: 'settings', label: 'Store Settings', icon: FaCog },
        { id: 'insights', label: 'Analytics & Reports', icon: FaChartLine },
      ],
    },
  ];

  return (
    <>
      <MobileToggle onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>

      <Overlay isOpen={isOpen} onClick={closeSidebar} />

      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <StoreBranding>
            <StoreLogo>
              {vendor?.businessInfo?.logo ? (
                <img
                  src={vendor.businessInfo.logo}
                  alt={vendor?.name || 'Store'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                />
              ) : (
                <FaStore />
              )}
            </StoreLogo>
            <StoreInfo>
              <StoreName>{vendor?.name || 'My Store'}</StoreName>
              <StoreType>{vendor?.category === 'ecommerce' ? 'Ecommerce Store' : 'Premium Seller'}</StoreType>
            </StoreInfo>
          </StoreBranding>

          <SellerProfile>
            <ProfileAvatar>
              <FaUser />
            </ProfileAvatar>
            <ProfileInfo>
              <ProfileName>{vendor?.ownerInfo?.name || 'Store Owner'}</ProfileName>
              <ProfileRole>Store Manager</ProfileRole>
            </ProfileInfo>
          </SellerProfile>

          {hasUnsavedChanges && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fef3c7', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#92400e', fontSize: '0.875rem', fontWeight: '500' }}>
                <FaExclamationTriangle />
                Unsaved Changes
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={onSave}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FaSave />
                  Save
                </button>
                <button
                  onClick={onDiscard}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FaUndo />
                  Discard
                </button>
              </div>
            </div>
          )}
        </SidebarHeader>

        <Navigation>
          {navItems.map((section, sectionIndex) => (
            <NavSection key={sectionIndex}>
              <NavSectionTitle>{section.section}</NavSectionTitle>
              {section.items.map(item => (
                <NavItem
                  key={item.id}
                  active={activeTab === item.id}
                  onClick={() => handleTabChange(item.id)}
                >
                  <item.icon />
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

export default SellerSidebar;
