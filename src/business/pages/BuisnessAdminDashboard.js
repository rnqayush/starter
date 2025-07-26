import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaUser,
  FaImages,
  FaCog,
  FaServicestack,
  FaBriefcase,
  FaAddressCard,
  FaQuestionCircle,
  FaComments,
  FaDollarSign,
  FaUpload,
  FaTrash,
  FaPlus,
  FaEdit,
  FaSave,
  FaTimes,
  FaExternalLinkAlt,
  FaEye,
  FaCamera,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaChevronRight,
  FaCheck,
  FaBars,
  FaLock,
  FaGripHorizontal,
  FaTextHeight,
  FaList,
  FaQuoteLeft,
  FaUndo,
  FaCheckCircle,
  FaVideo,
  FaEyeSlash,
  FaFileImage,
  FaLink,
  FaCopy,
  FaUsers,
  FaChartBar,
  FaPalette,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { getBusinessTemplate } from '../../DummyData';
import { useAuth } from '../../context/AuthContext';
import {
  setEditingBusiness,
  initializeBusiness,
  updateBusinessField,
  updateBusinessImage,
  updateBusinessGallery,
  updateBusinessServices,
  updateBusinessTestimonials,
  updateBusinessPackages,
  updateBusinessPortfolio,
  updateBusinessSkills,
  updateBusinessExperience,
  updateBusinessTeam,
  updateBusinessCustomSections,
  saveBusinessChanges,
  discardBusinessChanges,
  toggleBusinessSectionVisibility,
} from '../../store/slices/businessManagementSlice';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
  display: flex;
`;

const MobileSidebarCloseButton = styled.button`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    position: absolute;
    top: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1001;
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.md};
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Sidebar = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'mobileOpen',
})`
  width: 280px;
  background: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray200};
  box-shadow: ${theme.shadows.md};
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 260px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(${props => (props.mobileOpen ? '0' : '-100%')});
    transition: transform 0.3s ease;
    overflow-y: auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.primary};
  color: white;
`;

const BusinessName = styled.h2`
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: 1.3rem;
  font-weight: 700;
`;

const BusinessRole = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const SidebarNav = styled.nav`
  padding: ${theme.spacing.lg} 0;
  flex: 1;
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const NavSectionTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 ${theme.spacing.lg};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const NavItem = styled.button.withConfig({
  shouldForwardProp: prop => !['active'].includes(prop),
})`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray700};
  background: ${props =>
    props.active ? theme.colors.primary + '10' : 'transparent'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  border-left: 3px solid
    ${props => (props.active ? theme.colors.primary : 'transparent')};

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  svg {
    font-size: 1rem;
  }
`;

const SidebarFooter = styled.div`
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  margin-top: auto;
`;

const SaveActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SaveButton = styled.button.withConfig({
  shouldForwardProp: prop => !['variant', 'disabled', 'saved'].includes(prop),
})`
  background: ${props => {
    if (props.disabled) {
      return props.saved ? theme.colors.success : theme.colors.gray300;
    }
    return props.variant === 'primary'
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`
      : props.variant === 'secondary'
        ? theme.colors.gray300
        : theme.colors.white;
  }};
  color: ${props => {
    if (props.disabled) {
      return props.saved ? 'white' : theme.colors.gray500;
    }
    return props.variant === 'primary'
      ? 'white'
      : props.variant === 'secondary'
        ? theme.colors.gray700
        : theme.colors.gray700;
  }};
  border: ${props =>
    props.variant === 'primary'
      ? 'none'
      : `2px solid ${props.disabled && props.saved ? theme.colors.success : theme.colors.gray300}`};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
  width: 100%;

  &:hover {
    transform: ${props => (props.disabled ? 'none' : 'translateY(-1px)')};
    box-shadow: ${props => (props.disabled ? 'none' : theme.shadows.md)};
  }
`;

const ChangesIndicator = styled.div`
  color: ${theme.colors.warning};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.85rem;
  margin-bottom: ${theme.spacing.sm};
  justify-content: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  z-index: 1001;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: ${theme.shadows.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileSidebarOverlay = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: ${theme.spacing.xl};
  min-height: 100vh;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 260px;
    padding: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: 0;
    padding: ${theme.spacing.md};
    padding-top: 4rem;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: 0;
  flex: 1;
`;

const PageActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
  background: ${props =>
    props.variant === 'primary'
      ? theme.colors.primary
      : props.variant === 'success'
        ? theme.colors.green500
        : props.variant === 'danger'
          ? theme.colors.error
          : theme.colors.white};
  color: ${props =>
    props.variant === 'primary' ||
    props.variant === 'success' ||
    props.variant === 'danger'
      ? 'white'
      : theme.colors.gray700};
  border: 2px solid
    ${props =>
      props.variant === 'primary'
        ? theme.colors.primary
        : props.variant === 'success'
          ? theme.colors.green500
          : props.variant === 'danger'
            ? theme.colors.error
            : theme.colors.gray200};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: 0.9rem;
    gap: ${theme.spacing.xs};
    white-space: nowrap;

    &:hover {
      transform: none;
    }
  }
`;

const ContentSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.md};
  }
`;

const BuisnessAdminDashboard = () => {
  const { businessSlug, slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();

  // Support both businessSlug (legacy routes) and slug (new optimized routes)
  const actualSlug = businessSlug || slug;

  // Redux state
  const { editingBusiness, hasUnsavedChanges, originalBusiness } = useSelector(
    state => state.businessManagement
  );

  // Get business ID from URL path
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const businessId = actualSlug || pathSegments[0];

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const navigationItems = [
    {
      id: 'hero',
      label: 'Hero Section',
      icon: FaImages,
      section: 'Content Management',
    },
    {
      id: 'about-us',
      label: 'About Us',
      icon: FaUser,
      section: 'Content Management',
    },
    {
      id: 'services-offered',
      label: 'Services Offered',
      icon: FaServicestack,
      section: 'Content Management',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: FaBriefcase,
      section: 'Content Management',
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: FaGripHorizontal,
      section: 'Content Management',
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: FaAddressCard,
      section: 'Content Management',
    },
    {
      id: 'team',
      label: 'Team',
      icon: FaUsers,
      section: 'Content Management',
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: FaImages,
      section: 'Content Management',
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: FaComments,
      section: 'Content Management',
    },
    {
      id: 'packages-pricing',
      label: 'Packages & Pricing',
      icon: FaDollarSign,
      section: 'Content Management',
    },
    {
      id: 'contact',
      label: 'Contact Info',
      icon: FaPhone,
      section: 'Content Management',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FaCog,
      section: 'Account Management',
    },
  ];

  useEffect(() => {
    const businessData = getBusinessTemplate(businessId);
    if (businessData) {
      setBusiness(businessData);

      // Initialize business in Redux state if it doesn't exist, then set as editing
      try {
        // Create a sanitized version for Redux
        const sanitizedBusiness = JSON.parse(JSON.stringify(businessData));
        dispatch(initializeBusiness(sanitizedBusiness));
        dispatch(setEditingBusiness(businessId));
      } catch (error) {
        console.error('Error setting editing business:', error);
      }
    }
    setLoading(false);
  }, [businessId, dispatch]);

  // Handle Save Changes - saves to editing state for real-time preview
  const handleSaveChanges = () => {
    console.log('handleSaveChanges called');

    try {
      // Mark as saved and clear changed sections
      setSaved(true);
      alert(
        'Changes saved! You can preview them in the business page. Click "Save & Go Live" to publish permanently.'
      );
      console.log('Updated editing business for real-time preview');
    } catch (error) {
      console.error('Error saving changes for preview:', error);
      alert('Error saving changes for preview. Please try again.');
    }
  };

  // Handle Save & Go Live - publishes changes to global state
  const handleSaveAndGoLive = () => {
    console.log('handleSaveAndGoLive called');

    if (!editingBusiness) {
      alert('No business is being edited. Please try refreshing the page.');
      return;
    }

    try {
      console.log('Saving business changes...');
      dispatch(saveBusinessChanges());

      setSaved(false);
      alert('All changes published to live business page successfully!');

      // Navigate back to business page
      navigate(`/${businessId}`);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    }
  };

  // Handle Discard Changes - revert to original state
  const handleDiscardChanges = () => {
    if (!originalBusiness) return;

    try {
      // Discard changes in Redux
      dispatch(discardBusinessChanges());
      setSaved(false);
      alert('All changes discarded. Form reset to original values.');
    } catch (error) {
      console.error('Error discarding changes:', error);
      alert('Error discarding changes. Please try again.');
    }
  };

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscapeKey = event => {
      if (event.key === 'Escape' && mobileSidebarOpen) {
        closeMobileSidebar();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [mobileSidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileSidebarOpen]);

  const renderContent = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <ContentSection>
            <h2>Hero Section Management</h2>
            <p>Manage your business hero section content, images, and call-to-action buttons.</p>
          </ContentSection>
        );

      case 'about-us':
        return (
          <ContentSection>
            <h2>About Us Section</h2>
            <p>Edit your business story, mission, and company information.</p>
          </ContentSection>
        );

      case 'services-offered':
        return (
          <ContentSection>
            <h2>Services Management</h2>
            <p>Add, edit, and organize your business services and pricing.</p>
          </ContentSection>
        );

      case 'portfolio':
        return (
          <ContentSection>
            <h2>Portfolio Management</h2>
            <p>Showcase your best work and projects to potential clients.</p>
          </ContentSection>
        );

      case 'team':
        return (
          <ContentSection>
            <h2>Team Management</h2>
            <p>Add and manage your team members, their roles, and profiles.</p>
          </ContentSection>
        );

      case 'testimonials':
        return (
          <ContentSection>
            <h2>Testimonials Management</h2>
            <p>Display customer reviews and testimonials to build trust.</p>
          </ContentSection>
        );

      case 'contact':
        return (
          <ContentSection>
            <h2>Contact Information</h2>
            <p>Manage your business contact details, hours, and location.</p>
          </ContentSection>
        );

      case 'settings':
        return (
          <ContentSection>
            <h2>Business Settings</h2>
            <p>Configure your business settings, branding, and preferences.</p>
          </ContentSection>
        );

      default:
        return (
          <ContentSection>
            <h2>Welcome to Business Dashboard</h2>
            <p>Select a section from the sidebar to start editing your business website.</p>
          </ContentSection>
        );
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Loading Dashboard...</h2>
          <p>Please wait while we load your business dashboard.</p>
        </div>
      </DashboardContainer>
    );
  }

  if (!business) {
    return (
      <DashboardContainer>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Business Not Found</h2>
          <p>The business you're trying to edit doesn't exist.</p>
          <ActionButton onClick={() => navigate('/business-websites')}>
            <FaArrowLeft />
            Back to Business Templates
          </ActionButton>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {/* Mobile Sidebar Overlay */}
      <MobileSidebarOverlay
        isOpen={mobileSidebarOpen}
        onClick={closeMobileSidebar}
      />

      {/* Mobile Menu Button */}
      <MobileMenuButton
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileSidebarOpen}>
        <MobileSidebarCloseButton onClick={closeMobileSidebar}>
          <FaTimes />
        </MobileSidebarCloseButton>

        <SidebarHeader>
          <BusinessName>{business.name}</BusinessName>
          <BusinessRole>Business Dashboard</BusinessRole>
        </SidebarHeader>

        <SidebarNav>
          <NavSection>
            <NavSectionTitle>Content Management</NavSectionTitle>
            {navigationItems
              .filter(item => item.section === 'Content Management')
              .map(item => (
                <NavItem
                  key={item.id}
                  active={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon />
                  {item.label}
                </NavItem>
              ))}
          </NavSection>

          <NavSection>
            <NavSectionTitle>Account Management</NavSectionTitle>
            {navigationItems
              .filter(item => item.section === 'Account Management')
              .map(item => (
                <NavItem
                  key={item.id}
                  active={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon />
                  {item.label}
                </NavItem>
              ))}
          </NavSection>
        </SidebarNav>

        <SidebarFooter>
          <SaveActionsContainer>
            {hasUnsavedChanges && (
              <ChangesIndicator>
                <FaEdit />
                Unsaved changes
              </ChangesIndicator>
            )}

            <SaveButton
              variant="primary"
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges}
              saved={saved && !hasUnsavedChanges}
            >
              {saved && !hasUnsavedChanges ? (
                <>
                  <FaCheckCircle />
                  Changes Saved
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </SaveButton>

            <SaveButton
              variant="success"
              onClick={handleSaveAndGoLive}
              disabled={hasUnsavedChanges && !saved}
            >
              <FaCheckCircle />
              Save & Go Live
            </SaveButton>

            <SaveButton
              variant="secondary"
              onClick={handleDiscardChanges}
              disabled={!hasUnsavedChanges}
            >
              <FaUndo />
              Discard Changes
            </SaveButton>
          </SaveActionsContainer>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <ContentHeader>
          <PageTitle>Business Dashboard</PageTitle>
          <PageActions>
            <ActionButton
              onClick={() => navigate(`/${businessId}`)}
              aria-label="Preview business website"
            >
              <FaEye />
              Preview Website
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => window.open(`/${businessId}`, '_blank')}
              aria-label="Open business website in new tab"
            >
              <FaExternalLinkAlt />
              Open Website
            </ActionButton>
          </PageActions>
        </ContentHeader>

        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default BuisnessAdminDashboard;
