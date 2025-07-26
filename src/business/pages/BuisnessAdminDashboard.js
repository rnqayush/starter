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

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};
  }
`;

const VisibilityToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.gray700};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.sm};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FormLabel = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const FormInput = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: auto;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.gray300};
    transition: 0.4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: ${theme.colors.primary};
  }

  input:checked + span:before {
    transform: translateX(26px);
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
  const [changedSections, setChangedSections] = useState(new Set());

  // Local form states
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: '',
    backgroundImageFile: null,
  });

  const [aboutData, setAboutData] = useState({
    title: '',
    description: '',
    profileImage: '',
    profileImageFile: null,
  });

  const [servicesData, setServicesData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [contactData, setContactData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
    socialMedia: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
    },
  });

  // Section visibility state
  const [sectionVisibility, setSectionVisibility] = useState({
    hero: true,
    'about-us': true,
    'services-offered': true,
    portfolio: true,
    skills: true,
    experience: true,
    team: true,
    gallery: true,
    testimonials: true,
    'packages-pricing': true,
    contact: true,
  });

  // Track changes in a section and update Redux editing business for real-time preview
  const trackSectionChange = sectionId => {
    setChangedSections(prev => new Set([...prev, sectionId]));
    setSaved(false);

    // Immediately update Redux editing business for real-time preview
    updateEditingBusinessInRedux();
  };

  // Handle section visibility toggle
  const toggleSectionVisibility = sectionId => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
    trackSectionChange(sectionId);
  };

  // Helper function to immediately update Redux editing business
  const updateEditingBusinessInRedux = () => {
    if (!editingBusiness) return;

    try {
      // Create updated business object with current form data
      const updatedBusiness = {
        ...editingBusiness,
        hero: {
          title: heroData.title || editingBusiness.hero?.title || '',
          subtitle: heroData.subtitle || editingBusiness.hero?.subtitle || '',
          backgroundImage: heroData.backgroundImage || editingBusiness.hero?.backgroundImage || '',
        },
        about: {
          title: aboutData.title || editingBusiness.about?.title || '',
          description: aboutData.description || editingBusiness.about?.description || '',
          profileImage: aboutData.profileImage || editingBusiness.about?.profileImage || '',
        },
        services: servicesData.map(service => ({
          id: service.id,
          icon: service.icon || '',
          title: service.title || '',
          description: service.description || '',
          price: service.price || '',
        })),
        team: teamData.map(member => ({
          id: member.id,
          name: member.name || '',
          role: member.role || '',
          bio: member.bio || '',
          photo: member.photo || '',
          specialties: Array.isArray(member.specialties) ? member.specialties : [],
        })),
        testimonials: testimonialsData.map(testimonial => ({
          id: testimonial.id,
          name: testimonial.name || '',
          text: testimonial.text || '',
          rating: testimonial.rating || 5,
          company: testimonial.company || '',
        })),
        contact: contactData,
        sectionVisibility: sectionVisibility,
      };

      // Update Redux with the current form data for real-time preview
      Object.keys(updatedBusiness).forEach(key => {
        if (
          key !== 'id' &&
          JSON.stringify(updatedBusiness[key]) !==
            JSON.stringify(editingBusiness[key])
        ) {
          dispatch(updateBusinessField({ field: key, value: updatedBusiness[key] }));
        }
      });

      console.log(
        'Real-time preview: Updated editing business in Redux',
        updatedBusiness
      );
    } catch (error) {
      console.error(
        'Error updating editing business for real-time preview:',
        error
      );
    }
  };

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
      id: 'team',
      label: 'Team',
      icon: FaUsers,
      section: 'Content Management',
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: FaComments,
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

      // Pre-fill all form data from business data
      setHeroData({
        title: businessData.hero?.title || `${businessData.name} Website`,
        subtitle: businessData.hero?.subtitle || `Welcome to ${businessData.name}`,
        backgroundImage: businessData.hero?.backgroundImage || businessData.image || '',
        backgroundImageFile: null,
      });

      setAboutData({
        title: businessData.about?.title || 'About Us',
        description: businessData.about?.description || `Learn more about ${businessData.name}`,
        profileImage: businessData.about?.profileImage || '',
        profileImageFile: null,
      });

      // Initialize services with sample data if needed
      if (businessData.services && businessData.services.length > 0) {
        setServicesData(businessData.services.map((service, index) => ({
          ...service,
          id: service.id || `service-${Date.now()}-${index}`,
        })));
      }

      // Initialize contact data
      setContactData(businessData.contact || {
        title: 'Get In Touch',
        description: `Contact us to learn more about ${businessData.name}`,
        email: 'hello@business.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business Street, City, State 12345',
        hours: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 4:00 PM',
          sunday: 'Closed',
        },
        socialMedia: {
          linkedin: '',
          twitter: '',
          instagram: '',
          facebook: '',
        },
      });
    }
    setLoading(false);
  }, [businessId, dispatch]);

  // Handle Save Changes - saves to editing state for real-time preview
  const handleSaveChanges = () => {
    console.log('handleSaveChanges called');

    try {
      // Update editing business with current form data for real-time preview
      updateEditingBusinessInRedux();

      setSaved(true);
      setChangedSections(new Set());
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
      // Reset all local form data to original values
      setHeroData({
        title: originalBusiness.hero?.title || `${originalBusiness.name} Website`,
        subtitle: originalBusiness.hero?.subtitle || `Welcome to ${originalBusiness.name}`,
        backgroundImage: originalBusiness.hero?.backgroundImage || originalBusiness.image || '',
        backgroundImageFile: null,
      });

      setAboutData({
        title: originalBusiness.about?.title || 'About Us',
        description: originalBusiness.about?.description || `Learn more about ${originalBusiness.name}`,
        profileImage: originalBusiness.about?.profileImage || '',
        profileImageFile: null,
      });

      // Discard changes in Redux
      dispatch(discardBusinessChanges());
      setSaved(false);
      setChangedSections(new Set());
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
            <SectionHeader>
              <SectionTitle>
                <FaImages />
                Hero Section
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>{sectionVisibility['hero'] ? 'Visible' : 'Hidden'}</span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['hero']}
                    onChange={() => toggleSectionVisibility('hero')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            <FormGrid>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Business Title</FormLabel>
                <FormInput
                  value={heroData.title}
                  onChange={e => {
                    setHeroData(prev => ({ ...prev, title: e.target.value }));
                    trackSectionChange('hero');
                  }}
                  placeholder="Enter your business title"
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Subtitle</FormLabel>
                <FormTextarea
                  value={heroData.subtitle}
                  onChange={e => {
                    setHeroData(prev => ({ ...prev, subtitle: e.target.value }));
                    trackSectionChange('hero');
                  }}
                  placeholder="Enter your business subtitle..."
                  rows={3}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>
                  <FaCamera />
                  Background Image URL
                </FormLabel>
                <FormInput
                  value={heroData.backgroundImage}
                  onChange={e => {
                    setHeroData(prev => ({ ...prev, backgroundImage: e.target.value }));
                    trackSectionChange('hero');
                  }}
                  placeholder="Enter background image URL"
                />
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      case 'about-us':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaUser />
                About Us Section
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>{sectionVisibility['about-us'] ? 'Visible' : 'Hidden'}</span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['about-us']}
                    onChange={() => toggleSectionVisibility('about-us')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            <FormGrid>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Section Title</FormLabel>
                <FormInput
                  value={aboutData.title}
                  onChange={e => {
                    setAboutData(prev => ({ ...prev, title: e.target.value }));
                    trackSectionChange('about-us');
                  }}
                  placeholder="Enter section title"
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Description</FormLabel>
                <FormTextarea
                  value={aboutData.description}
                  onChange={e => {
                    setAboutData(prev => ({ ...prev, description: e.target.value }));
                    trackSectionChange('about-us');
                  }}
                  placeholder="Enter about description..."
                  rows={5}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>
                  <FaCamera />
                  Profile Image URL
                </FormLabel>
                <FormInput
                  value={aboutData.profileImage}
                  onChange={e => {
                    setAboutData(prev => ({ ...prev, profileImage: e.target.value }));
                    trackSectionChange('about-us');
                  }}
                  placeholder="Enter profile image URL"
                />
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      case 'contact':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaPhone />
                Contact Information
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>{sectionVisibility['contact'] ? 'Visible' : 'Hidden'}</span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['contact']}
                    onChange={() => toggleSectionVisibility('contact')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            <FormGrid>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={contactData.email}
                  onChange={e => {
                    setContactData(prev => ({ ...prev, email: e.target.value }));
                    trackSectionChange('contact');
                  }}
                  placeholder="hello@business.com"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormInput
                  type="tel"
                  value={contactData.phone}
                  onChange={e => {
                    setContactData(prev => ({ ...prev, phone: e.target.value }));
                    trackSectionChange('contact');
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Address</FormLabel>
                <FormTextarea
                  value={contactData.address}
                  onChange={e => {
                    setContactData(prev => ({ ...prev, address: e.target.value }));
                    trackSectionChange('contact');
                  }}
                  placeholder="123 Business Street, City, State 12345"
                  rows={3}
                />
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      default:
        return (
          <ContentSection>
            <SectionTitle>
              <FaEdit />
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/-/g, ' ')} Management
            </SectionTitle>
            <p>This section is under development. Please select another section to edit.</p>
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
