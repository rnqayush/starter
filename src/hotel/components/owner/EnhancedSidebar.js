import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
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
  FaSave,
  FaEye,
  FaUndo,
  FaExclamationTriangle,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  saveChanges,
  publishChanges,
  discardChanges,
  clearEditingHotel,
} from '../../store/hotelManagementSlice';
import { theme, media } from '../../../styles/GlobalStyle';
import { Button } from '../../../components/shared/Button';

const SidebarContainer = styled.aside.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
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
  display: flex;
  flex-direction: column;

  ${media.tabletDown} {
    width: 16rem;
    transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
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
  flex: 1;

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

const NavItem = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray700};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
  }

  ${props =>
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

const NavLink = styled(Link).withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${props =>
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

  ${props =>
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
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
  display: none;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  ${media.tabletDown} {
    display: block;
  }
`;

const EnhancedSidebar = ({ activeSection, setActiveSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { editingHotel, hasUnsavedChanges, changes } = useSelector(
    state => state.hotelManagement
  );

  // Extract hotel slug from URL path like "/taj-palace/owner"
  const hotelSlug = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments.length > 0 ? pathSegments[0] : '';
  }, [location.pathname]);

  const isActive = sectionKey => activeSection === sectionKey;

  const navigationItems = useMemo(
    () => [
      {
        section: 'Dashboard',
        items: [
          {
            key: 'dashboard',
            icon: FaHome,
            label: 'Dashboard Home',
            action: () => setActiveSection('dashboard'),
          },
        ],
      },
      {
        section: 'Hotel Management',
        items: [
          {
            key: 'my-hotels',
            icon: FaHotel,
            label: 'Manage Hotel Content',
            action: () => setActiveSection('my-hotels'),
          },
        ],
      },
      {
        section: 'Room Management',
        items: [
          {
            key: 'add-room',
            icon: FaBed,
            label: 'Add Room',
            action: () => setActiveSection('add-room'),
          },
          {
            key: 'all-rooms',
            icon: FaHotel,
            label: 'All Rooms',
            action: () => setActiveSection('all-rooms'),
          },
        ],
      },
      {
        section: 'Bookings',
        items: [
          {
            key: 'bookings',
            icon: FaCalendarCheck,
            label: 'Bookings Received',
            action: () => setActiveSection('bookings'),
          },
        ],
      },
      {
        section: 'Account',
        items: [
          {
            key: 'profile',
            icon: FaUser,
            label: 'Profile Settings',
            action: () => setActiveSection('profile'),
          },
        ],
      },
    ],
    [setActiveSection]
  );

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleNavClick = action => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Discard them?')) {
        dispatch(discardChanges());
        action();
        closeSidebar();
      }
    } else {
      action();
      closeSidebar();
    }
  };

  const handleSaveAndExit = () => {
    if (hasUnsavedChanges) {
      // Save changes to draft first
      dispatch(saveChanges());
    }

    // Always publish changes to live data when "Save & Go Live" is clicked
    dispatch(publishChanges());
    console.log('Published changes to live data from sidebar');

    alert('Changes published to live hotel page successfully!');

    if (editingHotel && hotelSlug) {
      // Navigate to the hotel detail page with updated data
      navigate(`/${editingHotel.slug || hotelSlug}`);
    }
  };

  const handleSaveChanges = () => {
    dispatch(saveChanges());
    alert('Changes saved successfully!');
  };

  const handleDiscardChanges = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      dispatch(discardChanges());
    }
  };

  const handlePreviewChanges = () => {
    if (editingHotel) {
      // Open hotel detail page in new tab to preview changes
      window.open(`/${editingHotel.slug || hotelSlug}`, '_blank');
    }
  };

  const renderChangesList = () => {
    return Object.entries(changes).map(([field, change]) => (
      <ChangeItem key={field}>
        <span className="field">{field}:</span>
        <div
          style={{
            fontSize: '0.7rem',
            color: theme.colors.gray500,
            marginTop: '2px',
          }}
        >
          {typeof change.new === 'string' && change.new.length > 30
            ? `${change.new.substring(0, 30)}...`
            : String(change.new)}
        </div>
      </ChangeItem>
    ));
  };

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
            StayEase Admin
          </Logo>
        </SidebarHeader>

        <SidebarNav>
          {navigationItems.map(section => (
            <NavSection key={section.section}>
              <SectionTitle>{section.section}</SectionTitle>
              {section.items.map(item => (
                <NavItem
                  key={item.key}
                  active={isActive(item.key)}
                  onClick={() => handleNavClick(item.action)}
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
            <NavLink to={`/${hotelSlug}`} onClick={closeSidebar}>
              <NavIcon>
                <FaSignOutAlt />
              </NavIcon>
              Back to Customer View
            </NavLink>
          </NavSection>
        </SidebarNav>

        {(editingHotel || hasUnsavedChanges) && (
          <ChangesPanel>
            <ChangesPanelHeader>
              <FaSave />
              Changes Tracker
            </ChangesPanelHeader>

            <ChangesStatus hasChanges={hasUnsavedChanges}>
              {hasUnsavedChanges ? (
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

            {hasUnsavedChanges && Object.keys(changes).length > 0 && (
              <ChangesList>{renderChangesList()}</ChangesList>
            )}

            <ActionsContainer>
              {hasUnsavedChanges && (
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

              {editingHotel && (
                <Button
                  variant="primary"
                  size="small"
                  onClick={handleSaveAndExit}
                  style={{ width: '100%' }}
                  disabled={hasUnsavedChanges}
                >
                  <FaCheckCircle /> Save & Go Live
                </Button>
              )}
            </ActionsContainer>
          </ChangesPanel>
        )}
      </SidebarContainer>
    </>
  );
};

export default EnhancedSidebar;
