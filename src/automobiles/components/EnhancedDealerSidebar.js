import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FaHome,
  FaCar,
  FaPlus,
  FaShoppingCart,
  FaEnvelope,
  FaChartLine,
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
  FaImage,
  FaList,
  FaAlignLeft,
  FaSort,
  FaSave,
  FaEye,
  FaUndo,
  FaExclamationTriangle,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  discardTempChanges,
  selectTempChanges,
  selectHasUnsavedChanges,
} from '../store/automobileManagementSlice';
import { theme, media } from '../../styles/GlobalStyle';
import { Button } from '../../components/shared/Button';

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
  display: flex;
  flex-direction: column;

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
  flex: 1;
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
  shouldForwardProp: prop => prop !== 'active',
})`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${props =>
    props.active ? `${theme.colors.primary}15` : 'transparent'};
  border: none;
  border-left: 3px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray700};
  font-size: 0.9rem;
  font-weight: ${props => (props.active ? '600' : '500')};
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

const ChangesPanel = styled.div`
  border-top: 1px solid ${theme.colors.gray200};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  margin-top: auto;
`;

const ChangesPanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
  font-size: 0.875rem;
  color: ${theme.colors.gray900};
`;

const ChangesStatus = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'hasChanges',
})`
  font-size: 0.8rem;
  color: ${props =>
    props.hasChanges ? theme.colors.warning : theme.colors.success};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const ChangesList = styled.div`
  max-height: 120px;
  overflow-y: auto;
  margin-bottom: ${theme.spacing.md};
  font-size: 0.75rem;
`;

const ChangeItem = styled.div`
  padding: ${theme.spacing.xs} 0;
  color: ${theme.colors.gray600};
  border-bottom: 1px solid ${theme.colors.gray200};

  &:last-child {
    border-bottom: none;
  }

  .field {
    font-weight: 600;
    color: ${theme.colors.gray700};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
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
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  ${media.tabletDown} {
    display: block;
  }
`;

const EnhancedDealerSidebar = ({
  activeTab,
  onTabChange,
  vendor,
  hasUnsavedChanges,
  onSave,
  onDiscard,
  syncCheck,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const changes = useSelector(selectTempChanges);
  const hasUnsavedChangesFromRedux = useSelector(selectHasUnsavedChanges);

  const handleTabChange = tab => {
    if (hasUnsavedChangesFromRedux) {
      if (window.confirm('You have unsaved changes. Discard them?')) {
        dispatch(discardTempChanges());
        onTabChange(tab);
        setIsMobileOpen(false);
      }
    } else {
      onTabChange(tab);
      setIsMobileOpen(false);
    }
  };

  const handleBackToDealership = () => {
    if (hasUnsavedChangesFromRedux) {
      if (window.confirm('You have unsaved changes. Discard them?')) {
        onDiscard();
        navigate(`/${vendor.slug}`);
      }
    } else {
      navigate(`/${vendor.slug}`);
    }
  };

  const handleSaveAndGoLive = () => {
    // Use the parent's save handler for API calls
    onSave();
    alert('Changes published to live dealership page successfully!');

    // Navigate to the dealer page with updated data
    navigate(`/${vendor.slug}`);
  };

  const handleSaveChanges = () => {
    onSave();
    alert('Changes saved successfully!');
  };

  const handleDiscardChanges = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      onDiscard();
    }
  };

  const handlePreviewChanges = () => {
    // Open dealer page in new tab to preview changes
    window.open(`/${vendor.slug}`, '_blank');
  };

  const renderChangesList = () => {
    return Object.entries(changes).map(([field, value]) => (
      <ChangeItem key={field}>
        <span className="field">{field}:</span>
        <div
          style={{
            fontSize: '0.7rem',
            color: theme.colors.gray500,
            marginTop: '2px',
          }}
        >
          {typeof value === 'string' && value.length > 30
            ? `${value.substring(0, 30)}...`
            : String(value)}
        </div>
      </ChangeItem>
    ));
  };

  const navItems = [
    {
      section: 'Overview',
      items: [{ id: 'dashboard', label: 'Dashboard', icon: FaHome }],
    },
    {
      section: 'Content Management',
      items: [
        { id: 'section-order', label: 'Section Order', icon: FaSort },
        { id: 'hero-section', label: 'Hero Section', icon: FaImage },
        { id: 'categories-section', label: 'Categories', icon: FaList },
        { id: 'featured-section', label: 'Featured Vehicles', icon: FaCar },
        { id: 'offers-section', label: 'Special Offers', icon: FaTags },
        { id: 'footer-section', label: 'Footer', icon: FaAlignLeft },
        { id: 'custom-section', label: 'Custom Section', icon: FaPlus },
      ],
    },
    {
      section: 'Inventory Management',
      items: [
        { id: 'inventory', label: 'Vehicle Inventory', icon: FaCar },
        { id: 'categories', label: 'Categories', icon: FaList },
        { id: 'add-vehicle', label: 'Add Vehicle', icon: FaPlus },
        { id: 'bulk-import', label: 'Bulk Import', icon: FaFileImport },
      ],
    },
    {
      section: 'Sales & Orders',
      items: [
        { id: 'orders', label: 'Sales & Orders', icon: FaShoppingCart },
        { id: 'enquiries', label: 'Enquiries', icon: FaEnvelope },
        { id: 'customers', label: 'Customers', icon: FaUsers },
      ],
    },
    {
      section: 'Services',
      items: [
        { id: 'financing', label: 'Financing', icon: FaDollarSign },
        { id: 'trade-ins', label: 'Trade-Ins', icon: FaExchangeAlt },
        { id: 'service', label: 'Service Center', icon: FaWrench },
        { id: 'promotions', label: 'Promotions', icon: FaTags },
      ],
    },
    {
      section: 'Analytics & Settings',
      items: [
        { id: 'analytics', label: 'Analytics', icon: FaChartLine },
        { id: 'dealer-settings', label: 'Settings', icon: FaCog },
      ],
    },
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
            {vendor.businessInfo?.logo ? (
              <DealerLogoImage
                src={vendor.businessInfo.logo}
                alt={vendor.name}
              />
            ) : (
              <DealerLogo>{vendor.name.charAt(0)}</DealerLogo>
            )}
            <DealerInfo>
              <DealerName>{vendor.name}</DealerName>
              <DealerRole>Dealer Dashboard</DealerRole>
              {hasUnsavedChangesFromRedux && (
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: theme.colors.yellow600,
                    marginTop: '2px',
                  }}
                >
                  • {Object.keys(changes).length} unsaved changes
                </div>
              )}
              {syncCheck?.needsSync && (
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: theme.colors.orange600,
                    marginTop: '2px',
                  }}
                >
                  • Sync required
                </div>
              )}
            </DealerInfo>
          </DealerBranding>

          <BackToDealership onClick={handleBackToDealership}>
            <FaArrowLeft />
            Back to Dealership
          </BackToDealership>
        </SidebarHeader>

        <Navigation>
          {navItems.map(section => (
            <NavSection key={section.section}>
              <SectionTitle>{section.section}</SectionTitle>
              {section.items.map(item => (
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

        <ChangesPanel>
          <ChangesPanelHeader>
            <FaSave />
            Changes Tracker
          </ChangesPanelHeader>

          <ChangesStatus hasChanges={hasUnsavedChangesFromRedux}>
            {hasUnsavedChangesFromRedux ? (
              <>
                <FaExclamationTriangle />
                {Object.keys(changes).length} unsaved changes
              </>
            ) : (
              <>
                <FaCheckCircle />
                All changes saved
              </>
            )}
          </ChangesStatus>

          {hasUnsavedChangesFromRedux && Object.keys(changes).length > 0 && (
            <ChangesList>{renderChangesList()}</ChangesList>
          )}

          <ActionsContainer>
            {hasUnsavedChangesFromRedux && (
              <>
                <Button
                  size="small"
                  onClick={handleSaveChanges}
                  style={{ width: '100%' }}
                >
                  <FaSave /> Save Changes
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handleDiscardChanges}
                  style={{ width: '100%' }}
                >
                  <FaUndo /> Discard Changes
                </Button>
              </>
            )}

            <Button
              variant="secondary"
              size="small"
              onClick={handlePreviewChanges}
              style={{ width: '100%' }}
            >
              <FaEye /> Preview Changes
            </Button>

            <Button
              variant="primary"
              size="small"
              onClick={handleSaveAndGoLive}
              style={{ width: '100%' }}
            >
              <FaCheckCircle /> Save & Go Live
            </Button>
          </ActionsContainer>
        </ChangesPanel>
      </SidebarContainer>
    </>
  );
};

export default EnhancedDealerSidebar;
