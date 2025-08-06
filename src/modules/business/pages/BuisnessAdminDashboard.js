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
  FaChevronUp,
  FaChevronDown,
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
  FaClock,
  FaCalendarAlt,
  FaRandom,
} from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import { fetchBusinessData } from '../../../utils/businessAPI';
import { selectUser } from '../../../store/slices/authSlice';
import {
  setEditingBusiness,
  initializeBusiness,
  initializeBusinessData,
  setBusinessType,
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
  markUnsavedChanges,
  setLoading,
  setError,
  clearError,
} from '../../../store/slices/businessManagementSlice';

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
  flex-shrink: 0;
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
  min-height: 0;
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
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  flex-shrink: 0;
  max-height: 350px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const SidebarFooterContent = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  min-height: 0;
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

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};

  .item-info {
    flex: 1;
    min-width: 0;

    h4 {
      font-weight: 600;
      color: ${theme.colors.gray900};
      margin-bottom: ${theme.spacing.xs};
    }

    p {
      color: ${theme.colors.gray600};
      font-size: 0.9rem;
      margin-bottom: ${theme.spacing.xs};
    }

    .item-meta {
      font-size: 0.8rem;
      color: ${theme.colors.gray500};
    }
  }

  .item-actions {
    display: flex;
    gap: ${theme.spacing.sm};
    flex-shrink: 0;
    margin-left: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};

    .item-actions {
      width: 100%;
      justify-content: flex-end;
      margin-left: 0;
    }
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${theme.spacing.lg};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${props =>
    props.variant === 'danger' ? theme.colors.error : theme.colors.white};
  color: ${props =>
    props.variant === 'danger' ? 'white' : theme.colors.gray700};
  border: 1px solid
    ${props =>
      props.variant === 'danger' ? theme.colors.error : theme.colors.gray300};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.variant === 'danger' ? '#dc2626' : theme.colors.gray50};
  }
`;

const BuisnessAdminDashboard = () => {
  const { businessSlug, slug } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Support both businessSlug (legacy routes) and slug (new optimized routes)
  const actualSlug = businessSlug || slug;

  // Redux state
  const {
    editingBusiness,
    hasUnsavedChanges,
    originalBusiness,
    businessType,
    businessTypeConfig,
    sectionVisibility,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector(state => state.businessManagement);

  // Get business ID from URL path
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const businessId = actualSlug || pathSegments[0];

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [changedSections, setChangedSections] = useState(new Set());

  // Local form states
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: '',
    profileImage: '',
    logo: '',
  });

  const [aboutData, setAboutData] = useState({
    title: '',
    description: '',
    profileImage: '',
  });

  const [servicesData, setServicesData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [contactData, setContactData] = useState({
    title: 'Get In Touch',
    description: '',
    email: '',
    phone: '',
    address: '',
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
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  });
  const [businessHoursData, setBusinessHoursData] = useState({
    title: 'Business Hours',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  });
  const [customSectionsData, setCustomSectionsData] = useState([]);
  const [sectionOrderData, setSectionOrderData] = useState([]);
  const [uiContentData, setUiContentData] = useState({
    sections: {},
    buttons: {},
    contactForm: { placeholders: {} },
    businessHours: {},
  });
  const [statisticsData, setStatisticsData] = useState([]);

  // Track changes in a section and update Redux editing business for real-time preview
  const trackSectionChange = sectionId => {
    setChangedSections(prev => new Set([...prev, sectionId]));
    setSaved(false);

    // Mark changes as unsaved in Redux
    dispatch(markUnsavedChanges());

    // Immediately update Redux editing business for real-time preview
    updateEditingBusinessInRedux();
  };

  // Handle section visibility toggle - using Redux action
  const toggleSectionVisibility = sectionId => {
    dispatch(toggleBusinessSectionVisibility({ section: sectionId }));
    trackSectionChange(sectionId);
  };

  // Helper function to immediately update Redux editing business
  const updateEditingBusinessInRedux = () => {
    if (!editingBusiness) return;

    try {
      // Create updated business object with current form data
      const updatedBusiness = {
        ...editingBusiness,
        logo: heroData.logo, // Update logo from hero data
        navigation: {
          ...editingBusiness.navigation,
          logo: heroData.logo, // Also update navigation logo
        },
        hero: heroData,
        about: {
          ...aboutData,
          stats: statisticsData,
        },
        services: servicesData,
        team: teamData,
        portfolio: portfolioData,
        skills: skillsData,
        experience: experienceData,
        gallery: galleryData,
        packages: packagesData,
        testimonials: testimonialsData,
        reviews: reviewsData,
        faq: faqData,
        contact: contactData,
        businessHours: businessHoursData,
        customSections: customSectionsData,
        sectionOrder: sectionOrderData,
        sectionVisibility: sectionVisibility,
        ui: uiContentData,
      };

      // Update Redux with the current form data for real-time preview
      Object.keys(updatedBusiness).forEach(key => {
        if (
          key !== 'id' &&
          JSON.stringify(updatedBusiness[key]) !==
            JSON.stringify(editingBusiness[key])
        ) {
          dispatch(
            updateBusinessField({ field: key, value: updatedBusiness[key] })
          );
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

  // Auto-update Redux when UI content changes for real-time preview
  useEffect(() => {
    if (editingBusiness && uiContentData) {
      updateEditingBusinessInRedux();
    }
  }, [uiContentData]);

  // Auto-update Redux when statistics data changes for real-time preview
  useEffect(() => {
    if (editingBusiness && statisticsData) {
      updateEditingBusinessInRedux();
    }
  }, [statisticsData]);

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
    ...(businessType === 'freelancer'
      ? [
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
        ]
      : [
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
            id: 'packages',
            label: 'Packages & Pricing',
            icon: FaDollarSign,
            section: 'Content Management',
          },
        ]),
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: FaComments,
      section: 'Content Management',
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: FaStar,
      section: 'Content Management',
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: FaQuestionCircle,
      section: 'Content Management',
    },
    {
      id: 'business-hours',
      label: 'Business Hours',
      icon: FaClock,
      section: 'Content Management',
    },
    {
      id: 'contact',
      label: 'Contact Info',
      icon: FaPhone,
      section: 'Content Management',
    },

    {
      id: 'custom-sections',
      label: 'Custom Sections',
      icon: FaPlus,
      section: 'Advanced',
    },
    {
      id: 'section-order',
      label: 'Section Order',
      icon: FaList,
      section: 'Advanced',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FaCog,
      section: 'Account Management',
    },
  ];

  useEffect(() => {
    const fetchBusinessDataForAdmin = async () => {
      try {
        // dispatch(setLoading(true)); // Temporarily disabled to fix Redux error
        dispatch(clearError());

        console.log(
          `[AdminDashboard] Making API call for business: ${businessId}`
        );
        const response = await fetchBusinessData(businessId);

        if (response.success && response.data) {
          const { businessData, businessType, businessTypeConfig } =
            response.data;
          console.log('[AdminDashboard] API call successful:', response.data);
          console.log(
            '[AdminDashboard] businessData type:',
            typeof businessData
          );
          console.log(
            '[AdminDashboard] businessType type:',
            typeof businessType
          );
          console.log(
            '[AdminDashboard] businessTypeConfig type:',
            typeof businessTypeConfig
          );

          setBusiness(businessData);

          // Simplified Redux actions - dispatch only essential actions
          console.log(
            '[AdminDashboard] Dispatching simplified Redux actions...'
          );

          dispatch(clearError());
          dispatch(setEditingBusiness(businessId));

          console.log('[AdminDashboard] Redux actions dispatched successfully');

          // try {
          //   console.log('[AdminDashboard] About to dispatch setBusinessType');
          //   console.log('Action creator setBusinessType:', setBusinessType);
          //   const action2 = setBusinessType({
          //     businessType,
          //     businessTypeConfig: serializableBusinessTypeConfig,
          //   });
          //   console.log('Generated action2:', action2);
          //   dispatch(action2);
          //   console.log('[AdminDashboard] setBusinessType dispatched successfully');
          // } catch (error) {
          //   console.error('[AdminDashboard] Error dispatching setBusinessType:', error);
          //   throw error;
          // }

          // Pre-fill all form data from current edited business or original business data
          const currentData = editingBusiness || businessData;
          setHeroData({
            title: currentData.hero?.title || `${currentData.name}`,
            subtitle:
              currentData.hero?.subtitle || `Welcome to ${currentData.name}`,
            backgroundImage:
              currentData.hero?.backgroundImage || currentData.image || '',
            profileImage:
              currentData.hero?.profileImage ||
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
            logo:
              currentData.logo ||
              currentData.navigation?.logo ||
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
          });

          setAboutData({
            title: currentData.about?.title || 'About Us',
            description:
              currentData.about?.description ||
              `Learn more about ${currentData.name}`,
            profileImage: currentData.about?.profileImage || '',
          });

          // Use current edited data or API data
          setServicesData(currentData.services || []);
          setTeamData(currentData.team || []);
          setPortfolioData(currentData.portfolio || []);
          setSkillsData(currentData.skills || []);
          setExperienceData(currentData.experience || []);
          setGalleryData(businessData.gallery || []);
          setPackagesData(currentData.packages || []);
          setTestimonialsData(currentData.testimonials || []);
          setReviewsData(currentData.reviews || []);
          setFaqData(currentData.faq || []);

          // Initialize business hours from current data
          setBusinessHoursData(
            currentData.businessHours || {
              title: 'Business Hours',
              hours: {
                monday: '9:00 AM - 6:00 PM',
                tuesday: '9:00 AM - 6:00 PM',
                wednesday: '9:00 AM - 6:00 PM',
                thursday: '9:00 AM - 6:00 PM',
                friday: '9:00 AM - 6:00 PM',
                saturday: '10:00 AM - 4:00 PM',
                sunday: 'Closed',
              },
            }
          );

          // Initialize section order
          setSectionOrderData([
            'hero',
            'about-us',
            'services-offered',
            'portfolio',
            'skills',
            'experience',
            'team',
            'gallery',
            'packages',
            'testimonials',
            'reviews',
            'faq',
            'business-hours',
            'contact',
          ]);

          // Initialize contact data from current data
          setContactData(
            currentData.contact || {
              title: 'Get In Touch',
              description: `Contact us to learn more about ${currentData.name}`,
              email: `hello@${currentData.slug}.com`,
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
                facebook: '',
                twitter: '',
                instagram: '',
                linkedin: '',
              },
            }
          );

          // Initialize UI content data from current data
          setUiContentData(
            currentData.ui || {
              sections: currentData.sections || {},
              buttons: {
                bookNow: 'Book Now',
                learnMore: 'Learn More',
                sendMessage: 'Send Message',
                contactUs: 'Contact Us',
              },
              contactForm: {
                placeholders: {
                  name: 'Your Name',
                  email: 'Your Email',
                  phone: 'Your Phone',
                  message: 'Your Message',
                },
              },
              businessHours: {
                title: 'Business Hours',
                contactInfoTitle: 'Contact Information',
              },
            }
          );

          // Initialize statistics data from API data
          setStatisticsData(
            businessData.about?.stats || [
              { number: '100+', label: 'Services' },
              { number: '5+', label: 'Years Experience' },
              { number: '4.9', label: '★ Average Rating' },
              { number: '200+', label: 'Happy Clients' },
            ]
          );
        } else {
          // dispatch(setError('Business not found')); // Temporarily disabled to fix Redux error
          setLoading(false);
          setApiLoading(false);
          return;
        }
      } catch (error) {
        console.error('[AdminDashboard] Error fetching business data:', error);
        setApiError(error.message);

        // Set error state
        // dispatch(setError('Failed to fetch business data')); // Temporarily disabled to fix Redux error
      } finally {
        setLoading(false);
        setApiLoading(false);
      }
    };

    fetchBusinessDataForAdmin();
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
        title: originalBusiness.hero?.title || `${originalBusiness.name}`,
        subtitle:
          originalBusiness.hero?.subtitle ||
          `Welcome to ${originalBusiness.name}`,
        backgroundImage:
          originalBusiness.hero?.backgroundImage ||
          originalBusiness.image ||
          '',
        profileImage:
          originalBusiness.hero?.profileImage ||
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        logo:
          originalBusiness.logo ||
          originalBusiness.navigation?.logo ||
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      });

      setAboutData({
        title: originalBusiness.about?.title || 'About Us',
        description:
          originalBusiness.about?.description ||
          `Learn more about ${originalBusiness.name}`,
        profileImage: originalBusiness.about?.profileImage || '',
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

  // Helper functions for managing dynamic lists
  const addService = () => {
    const newService = {
      id: Date.now(),
      icon: '🔧',
      title: 'New Service',
      description: 'Service description',
      price: 'From $0',
    };
    setServicesData(prev => [...prev, newService]);
    trackSectionChange('services-offered');
  };

  const updateService = (id, field, value) => {
    setServicesData(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
    trackSectionChange('services-offered');
  };

  const deleteService = id => {
    setServicesData(prev => prev.filter(service => service.id !== id));
    trackSectionChange('services-offered');
  };

  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'New Team Member',
      role: 'Role',
      bio: 'Bio description',
      photo: '',
      specialties: [],
    };
    setTeamData(prev => [...prev, newMember]);
    trackSectionChange('team');
  };

  const updateTeamMember = (id, field, value) => {
    setTeamData(prev =>
      prev.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
    trackSectionChange('team');
  };

  const deleteTeamMember = id => {
    setTeamData(prev => prev.filter(member => member.id !== id));
    trackSectionChange('team');
  };

  // Portfolio management functions
  const addPortfolioItem = () => {
    const newItem = {
      id: Date.now(),
      title: 'New Project',
      category: 'Design',
      description: 'Project description',
      image: '',
      technologies: [],
    };
    setPortfolioData(prev => [...prev, newItem]);
    trackSectionChange('portfolio');
  };

  const updatePortfolioItem = (id, field, value) => {
    setPortfolioData(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
    trackSectionChange('portfolio');
  };

  const deletePortfolioItem = id => {
    setPortfolioData(prev => prev.filter(item => item.id !== id));
    trackSectionChange('portfolio');
  };

  // Skills management functions
  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: 'New Skill',
      level: 70,
      icon: '����',
    };
    setSkillsData(prev => [...prev, newSkill]);
    trackSectionChange('skills');
  };

  const updateSkill = (id, field, value) => {
    setSkillsData(prev =>
      prev.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
    trackSectionChange('skills');
  };

  const deleteSkill = id => {
    setSkillsData(prev => prev.filter(skill => skill.id !== id));
    trackSectionChange('skills');
  };

  // Experience management functions
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: 'Company Name',
      role: 'Position',
      period: '2023 - Present',
      description: 'Job description',
    };
    setExperienceData(prev => [...prev, newExperience]);
    trackSectionChange('experience');
  };

  const updateExperience = (id, field, value) => {
    setExperienceData(prev =>
      prev.map(exp => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
    trackSectionChange('experience');
  };

  const deleteExperience = id => {
    setExperienceData(prev => prev.filter(exp => exp.id !== id));
    trackSectionChange('experience');
  };

  // Gallery management functions
  const addGalleryCategory = () => {
    const newCategory = {
      id: Date.now(),
      category: 'New Category',
      images: [],
      description: 'Category description',
    };
    setGalleryData(prev => [...prev, newCategory]);
    trackSectionChange('gallery');
  };

  const updateGalleryCategory = (id, field, value) => {
    setGalleryData(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, [field]: value } : cat))
    );
    trackSectionChange('gallery');
  };

  const deleteGalleryCategory = id => {
    setGalleryData(prev => prev.filter(cat => cat.id !== id));
    trackSectionChange('gallery');
  };

  // Packages management functions
  const addPackage = () => {
    const newPackage = {
      id: Date.now(),
      name: 'New Package',
      description: 'Package description',
      price: '$0',
      duration: '1 hour',
      features: [],
      featured: false,
    };
    setPackagesData(prev => [...prev, newPackage]);
    trackSectionChange('packages');
  };

  const updatePackage = (id, field, value) => {
    setPackagesData(prev =>
      prev.map(pkg => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
    trackSectionChange('packages');
  };

  const deletePackage = id => {
    setPackagesData(prev => prev.filter(pkg => pkg.id !== id));
    trackSectionChange('packages');
  };

  // Testimonials management functions
  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: 'Client Name',
      company: 'Company',
      role: 'Position',
      review: 'Great experience!',
      rating: 5,
      image: '',
    };
    setTestimonialsData(prev => [...prev, newTestimonial]);
    trackSectionChange('testimonials');
  };

  const updateTestimonial = (id, field, value) => {
    setTestimonialsData(prev =>
      prev.map(testimonial =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    );
    trackSectionChange('testimonials');
  };

  const deleteTestimonial = id => {
    setTestimonialsData(prev =>
      prev.filter(testimonial => testimonial.id !== id)
    );
    trackSectionChange('testimonials');
  };

  // Reviews management functions
  const addReview = () => {
    const newReview = {
      id: Date.now(),
      name: 'Reviewer Name',
      date: new Date().toLocaleDateString(),
      rating: 5,
      review: 'Excellent service!',
      avatar: '',
    };
    setReviewsData(prev => [...prev, newReview]);
    trackSectionChange('reviews');
  };

  const updateReview = (id, field, value) => {
    setReviewsData(prev =>
      prev.map(review =>
        review.id === id ? { ...review, [field]: value } : review
      )
    );
    trackSectionChange('reviews');
  };

  const deleteReview = id => {
    setReviewsData(prev => prev.filter(review => review.id !== id));
    trackSectionChange('reviews');
  };

  // FAQ management functions
  const addFAQ = () => {
    const newFAQ = {
      id: Date.now(),
      question: 'New Question?',
      answer: 'Answer to the question.',
    };
    setFaqData(prev => [...prev, newFAQ]);
    trackSectionChange('faq');
  };

  const updateFAQ = (id, field, value) => {
    setFaqData(prev =>
      prev.map(faq => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
    trackSectionChange('faq');
  };

  const deleteFAQ = id => {
    setFaqData(prev => prev.filter(faq => faq.id !== id));
    trackSectionChange('faq');
  };

  // Custom sections management
  const addCustomSection = (type = 'text') => {
    const templates = {
      text: {
        title: 'Text Section',
        content: {
          heading: 'Section Heading',
          description: 'Add your content here...',
          backgroundColor: '#ffffff',
          textColor: '#333333',
        },
      },
      list: {
        title: 'List Section',
        content: {
          heading: 'List Heading',
          items: ['Item 1', 'Item 2', 'Item 3'],
          style: 'bullets', // bullets, numbers, icons
          backgroundColor: '#f8f9fa',
        },
      },
      card: {
        title: 'Card Section',
        content: {
          heading: 'Card Section',
          cards: [
            { title: 'Card 1', description: 'Description 1', icon: '🎯' },
            { title: 'Card 2', description: 'Description 2', icon: '���' },
            { title: 'Card 3', description: 'Description 3', icon: '🚀' },
          ],
          layout: 'grid', // grid, horizontal, vertical
        },
      },
      image: {
        title: 'Image Gallery',
        content: {
          heading: 'Image Gallery',
          images: [],
          layout: 'grid', // grid, masonry, carousel
          columns: 3,
        },
      },
    };

    const template = templates[type] || templates.text;
    const newSection = {
      id: Date.now(),
      type,
      title: template.title,
      content: template.content,
      order: customSectionsData.length,
      visible: true,
    };
    setCustomSectionsData(prev => [...prev, newSection]);
    trackSectionChange('custom');
  };

  const updateCustomSection = (id, field, value) => {
    setCustomSectionsData(prev =>
      prev.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
    trackSectionChange('custom');
  };

  const deleteCustomSection = id => {
    setCustomSectionsData(prev => prev.filter(section => section.id !== id));
    trackSectionChange('custom');
  };

  // Image upload handler
  const handleImageUpload = (event, callback) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would upload to a service like AWS S3, Cloudinary, etc.
      // For demo purposes, we'll create a blob URL
      const imageUrl = URL.createObjectURL(file);
      callback(imageUrl);
    }
  };

  // Section reorder handler
  const reorderSections = (startIndex, endIndex) => {
    const result = Array.from(sectionOrderData);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSectionOrderData(result);
    trackSectionChange('order');
  };

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
                    setHeroData(prev => ({
                      ...prev,
                      subtitle: e.target.value,
                    }));
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
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="hero-background-upload"
                    onChange={e =>
                      handleImageUpload(e, url => {
                        setHeroData(prev => ({
                          ...prev,
                          backgroundImage: url,
                        }));
                        trackSectionChange('hero');
                      })
                    }
                  />
                  <label
                    htmlFor="hero-background-upload"
                    style={{
                      marginLeft: '10px',
                      cursor: 'pointer',
                      color: '#3b82f6',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <FaUpload /> Upload
                  </label>
                </FormLabel>
                <FormInput
                  value={heroData.backgroundImage}
                  onChange={e => {
                    setHeroData(prev => ({
                      ...prev,
                      backgroundImage: e.target.value,
                    }));
                    trackSectionChange('hero');
                  }}
                  placeholder="Enter background image URL or upload"
                />
                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '60px',
                      backgroundImage: heroData.backgroundImage
                        ? `url(${heroData.backgroundImage})`
                        : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      color: '#6b7280',
                    }}
                  >
                    {!heroData.backgroundImage && '🖼️'}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: '#374151',
                        fontWeight: '500',
                      }}
                    >
                      Background Image Preview
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {heroData.backgroundImage
                        ? 'Current image loaded'
                        : 'No image selected'}
                    </div>
                  </div>
                </div>
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>
                  <FaCamera />
                  Profile Image URL
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="hero-profile-upload"
                    onChange={e =>
                      handleImageUpload(e, url => {
                        setHeroData(prev => ({
                          ...prev,
                          profileImage: url,
                        }));
                        trackSectionChange('hero');
                      })
                    }
                  />
                  <label
                    htmlFor="hero-profile-upload"
                    style={{
                      marginLeft: '10px',
                      cursor: 'pointer',
                      color: '#3b82f6',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <FaUpload /> Upload
                  </label>
                </FormLabel>
                <FormInput
                  value={heroData.profileImage}
                  onChange={e => {
                    setHeroData(prev => ({
                      ...prev,
                      profileImage: e.target.value,
                    }));
                    trackSectionChange('hero');
                  }}
                  placeholder="Enter profile image URL or upload"
                />
                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundImage: heroData.profileImage
                        ? `url(${heroData.profileImage})`
                        : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '50%',
                      border: '1px solid #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}
                  >
                    {!heroData.profileImage && '👤'}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: '#374151',
                        fontWeight: '500',
                      }}
                    >
                      Profile Image Preview
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {heroData.profileImage
                        ? 'Current profile image'
                        : 'No profile image selected'}
                    </div>
                  </div>
                </div>
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>
                  <FaFileImage />
                  Logo URL
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="hero-logo-upload"
                    onChange={e =>
                      handleImageUpload(e, url => {
                        setHeroData(prev => ({
                          ...prev,
                          logo: url,
                        }));
                        trackSectionChange('hero');
                      })
                    }
                  />
                  <label
                    htmlFor="hero-logo-upload"
                    style={{
                      marginLeft: '10px',
                      cursor: 'pointer',
                      color: '#3b82f6',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <FaUpload /> Upload
                  </label>
                </FormLabel>
                <FormInput
                  value={heroData.logo}
                  onChange={e => {
                    setHeroData(prev => ({
                      ...prev,
                      logo: e.target.value,
                    }));
                    trackSectionChange('hero');
                  }}
                  placeholder="Enter logo URL or upload"
                />
                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '40px',
                      backgroundImage: heroData.logo
                        ? `url(${heroData.logo})`
                        : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                    }}
                  >
                    {!heroData.logo && '🏢'}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: '#374151',
                        fontWeight: '500',
                      }}
                    >
                      Logo Preview
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {heroData.logo ? 'Current logo' : 'No logo selected'}
                    </div>
                  </div>
                </div>
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
                <span>
                  {sectionVisibility['about-us'] ? 'Visible' : 'Hidden'}
                </span>
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
                    setAboutData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }));
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
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="about-profile-upload"
                    onChange={e =>
                      handleImageUpload(e, url => {
                        setAboutData(prev => ({ ...prev, profileImage: url }));
                        trackSectionChange('about-us');
                      })
                    }
                  />
                  <label
                    htmlFor="about-profile-upload"
                    style={{
                      marginLeft: '10px',
                      cursor: 'pointer',
                      color: '#3b82f6',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <FaUpload /> Upload
                  </label>
                </FormLabel>
                <FormInput
                  value={aboutData.profileImage}
                  onChange={e => {
                    setAboutData(prev => ({
                      ...prev,
                      profileImage: e.target.value,
                    }));
                    trackSectionChange('about-us');
                  }}
                  placeholder="Enter profile image URL or upload"
                />
                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundImage: aboutData.profileImage
                        ? `url(${aboutData.profileImage})`
                        : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '50%',
                      border: '1px solid #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}
                  >
                    {!aboutData.profileImage && '👤'}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: '#374151',
                        fontWeight: '500',
                      }}
                    >
                      About Profile Image
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {aboutData.profileImage
                        ? 'Current profile image'
                        : 'No profile image selected'}
                    </div>
                  </div>
                </div>
              </FormGroup>

              {/* Statistics Section within About Us */}
              <FormGroup
                style={{ gridColumn: '1 / -1', marginTop: theme.spacing.xl }}
              >
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.gray800,
                    borderTop: `1px solid ${theme.colors.gray200}`,
                    paddingTop: theme.spacing.lg,
                  }}
                >
                  Statistics
                </h3>
                <p
                  style={{
                    marginBottom: theme.spacing.md,
                    color: theme.colors.gray600,
                  }}
                >
                  Edit the statistics displayed in the about section of your
                  website.
                </p>

                <AddButton
                  onClick={() => {
                    const newStat = {
                      number: '0',
                      label: 'New Stat',
                      id: Date.now(),
                    };
                    setStatisticsData(prev => [...prev, newStat]);
                    trackSectionChange('about-us');
                  }}
                  style={{ marginBottom: theme.spacing.lg }}
                >
                  <FaPlus />
                  Add Statistic
                </AddButton>

                <ListContainer>
                  {statisticsData.map((stat, index) => (
                    <ListItem key={stat.id || index}>
                      <div className="item-info">
                        <FormGrid>
                          <FormGroup>
                            <FormLabel>Number/Value</FormLabel>
                            <FormInput
                              value={stat.number}
                              onChange={e => {
                                setStatisticsData(prev =>
                                  prev.map((s, i) =>
                                    i === index
                                      ? { ...s, number: e.target.value }
                                      : s
                                  )
                                );
                                trackSectionChange('about-us');
                              }}
                              placeholder="100+"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Label</FormLabel>
                            <FormInput
                              value={stat.label}
                              onChange={e => {
                                setStatisticsData(prev =>
                                  prev.map((s, i) =>
                                    i === index
                                      ? { ...s, label: e.target.value }
                                      : s
                                  )
                                );
                                trackSectionChange('about-us');
                              }}
                              placeholder="Happy Clients"
                            />
                          </FormGroup>
                        </FormGrid>
                      </div>
                      <div className="item-actions">
                        <ItemButton
                          variant="danger"
                          onClick={() => {
                            setStatisticsData(prev =>
                              prev.filter((_, i) => i !== index)
                            );
                            trackSectionChange('about-us');
                          }}
                        >
                          <FaTrash />
                          Delete
                        </ItemButton>
                      </div>
                    </ListItem>
                  ))}
                </ListContainer>
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      case 'services-offered':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaServicestack />
                Services Offered
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['services-offered'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['services-offered']}
                    onChange={() => toggleSectionVisibility('services-offered')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            {/* Section UI Content Editing */}
            <div
              style={{
                marginBottom: theme.spacing.xl,
                padding: theme.spacing.lg,
                background: theme.colors.gray50,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <h3
                style={{
                  marginBottom: theme.spacing.md,
                  color: theme.colors.gray800,
                }}
              >
                Section Text & Labels
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Section Title</FormLabel>
                  <FormInput
                    value={
                      uiContentData.sections?.services?.title ||
                      (business?.slug === 'freelancer'
                        ? 'My Services'
                        : 'Our Services')
                    }
                    onChange={e => {
                      setUiContentData(prev => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          services: {
                            ...prev.sections?.services,
                            title: e.target.value,
                          },
                        },
                      }));
                      trackSectionChange('services-offered');
                    }}
                    placeholder={
                      business?.slug === 'freelancer'
                        ? 'My Services'
                        : 'Our Services'
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Section Subtitle</FormLabel>
                  <FormTextarea
                    value={
                      uiContentData.sections?.services?.subtitle ||
                      'We offer a comprehensive range of professional services designed to meet your needs and exceed your expectations.'
                    }
                    onChange={e => {
                      setUiContentData(prev => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          services: {
                            ...prev.sections?.services,
                            subtitle: e.target.value,
                          },
                        },
                      }));
                      trackSectionChange('services-offered');
                    }}
                    placeholder="We offer a comprehensive range of professional services designed to meet your needs and exceed your expectations."
                    rows={3}
                  />
                </FormGroup>
              </FormGrid>
            </div>

            <AddButton onClick={addService}>
              <FaPlus />
              Add New Service
            </AddButton>

            <ListContainer>
              {servicesData.map(service => (
                <ListItem key={service.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Icon (Emoji)</FormLabel>
                        <FormInput
                          value={service.icon}
                          onChange={e =>
                            updateService(service.id, 'icon', e.target.value)
                          }
                          placeholder="🔧"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Price</FormLabel>
                        <FormInput
                          value={service.price}
                          onChange={e =>
                            updateService(service.id, 'price', e.target.value)
                          }
                          placeholder="From $0"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Service Title</FormLabel>
                        <FormInput
                          value={service.title}
                          onChange={e =>
                            updateService(service.id, 'title', e.target.value)
                          }
                          placeholder="Service Name"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Description</FormLabel>
                        <FormTextarea
                          value={service.description}
                          onChange={e =>
                            updateService(
                              service.id,
                              'description',
                              e.target.value
                            )
                          }
                          placeholder="Service description"
                          rows={3}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteService(service.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'team':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaUsers />
                Team Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>{sectionVisibility['team'] ? 'Visible' : 'Hidden'}</span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['team']}
                    onChange={() => toggleSectionVisibility('team')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            {/* Section UI Content Editing */}
            <div
              style={{
                marginBottom: theme.spacing.xl,
                padding: theme.spacing.lg,
                background: theme.colors.gray50,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <h3
                style={{
                  marginBottom: theme.spacing.md,
                  color: theme.colors.gray800,
                }}
              >
                Section Text & Labels
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Section Title</FormLabel>
                  <FormInput
                    value={
                      uiContentData.sections?.team?.title || 'Meet Our Team'
                    }
                    onChange={e => {
                      setUiContentData(prev => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          team: {
                            ...prev.sections?.team,
                            title: e.target.value,
                          },
                        },
                      }));
                      trackSectionChange('team');
                    }}
                    placeholder="Meet Our Team"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Section Subtitle</FormLabel>
                  <FormTextarea
                    value={
                      uiContentData.sections?.team?.subtitle ||
                      'Our experienced professionals are passionate about delivering exceptional service and results.'
                    }
                    onChange={e => {
                      setUiContentData(prev => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          team: {
                            ...prev.sections?.team,
                            subtitle: e.target.value,
                          },
                        },
                      }));
                      trackSectionChange('team');
                    }}
                    placeholder="Our experienced professionals are passionate about delivering exceptional service and results."
                    rows={3}
                  />
                </FormGroup>
              </FormGrid>
            </div>

            <AddButton onClick={addTeamMember}>
              <FaPlus />
              Add Team Member
            </AddButton>

            <ListContainer>
              {teamData.map(member => (
                <ListItem key={member.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <FormInput
                          value={member.name}
                          onChange={e =>
                            updateTeamMember(member.id, 'name', e.target.value)
                          }
                          placeholder="Team member name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Role</FormLabel>
                        <FormInput
                          value={member.role}
                          onChange={e =>
                            updateTeamMember(member.id, 'role', e.target.value)
                          }
                          placeholder="Job title"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>
                          <FaCamera />
                          Photo URL
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id={`team-photo-${member.id}`}
                            onChange={e =>
                              handleImageUpload(e, url =>
                                updateTeamMember(member.id, 'photo', url)
                              )
                            }
                          />
                          <label
                            htmlFor={`team-photo-${member.id}`}
                            style={{
                              marginLeft: '10px',
                              cursor: 'pointer',
                              color: '#3b82f6',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <FaUpload /> Upload
                          </label>
                        </FormLabel>
                        <FormInput
                          value={member.photo}
                          onChange={e =>
                            updateTeamMember(member.id, 'photo', e.target.value)
                          }
                          placeholder="Profile photo URL or upload"
                        />
                        {member.photo && (
                          <div
                            style={{
                              marginTop: '10px',
                              padding: '10px',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <div
                              style={{
                                width: '50px',
                                height: '50px',
                                backgroundImage: `url(${member.photo})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '50%',
                                border: '1px solid #d1d5db',
                              }}
                            />
                            <span
                              style={{ fontSize: '0.9rem', color: '#6b7280' }}
                            >
                              {member.name} photo
                            </span>
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Bio</FormLabel>
                        <FormTextarea
                          value={member.bio}
                          onChange={e =>
                            updateTeamMember(member.id, 'bio', e.target.value)
                          }
                          placeholder="Brief bio about the team member"
                          rows={3}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteTeamMember(member.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'portfolio':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaBriefcase />
                Portfolio Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['portfolio'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['portfolio']}
                    onChange={() => toggleSectionVisibility('portfolio')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            <AddButton onClick={addPortfolioItem}>
              <FaPlus />
              Add Portfolio Item
            </AddButton>

            <ListContainer>
              {portfolioData.map(item => (
                <ListItem key={item.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Project Title</FormLabel>
                        <FormInput
                          value={item.title}
                          onChange={e =>
                            updatePortfolioItem(
                              item.id,
                              'title',
                              e.target.value
                            )
                          }
                          placeholder="Project Name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Category</FormLabel>
                        <FormInput
                          value={item.category}
                          onChange={e =>
                            updatePortfolioItem(
                              item.id,
                              'category',
                              e.target.value
                            )
                          }
                          placeholder="Design, Development, etc."
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>
                          <FaFileImage />
                          Project Image URL
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id={`portfolio-image-${item.id}`}
                            onChange={e =>
                              handleImageUpload(e, url =>
                                updatePortfolioItem(item.id, 'image', url)
                              )
                            }
                          />
                          <label
                            htmlFor={`portfolio-image-${item.id}`}
                            style={{
                              marginLeft: '10px',
                              cursor: 'pointer',
                              color: '#3b82f6',
                            }}
                          >
                            <FaUpload /> Upload
                          </label>
                        </FormLabel>
                        <FormInput
                          value={item.image || ''}
                          onChange={e =>
                            updatePortfolioItem(
                              item.id,
                              'image',
                              e.target.value
                            )
                          }
                          placeholder="Enter image URL or upload"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Description</FormLabel>
                        <FormTextarea
                          value={item.description}
                          onChange={e =>
                            updatePortfolioItem(
                              item.id,
                              'description',
                              e.target.value
                            )
                          }
                          placeholder="Project description"
                          rows={3}
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Technologies (comma-separated)</FormLabel>
                        <FormInput
                          value={
                            Array.isArray(item.technologies)
                              ? item.technologies.join(', ')
                              : ''
                          }
                          onChange={e =>
                            updatePortfolioItem(
                              item.id,
                              'technologies',
                              e.target.value.split(', ').filter(t => t.trim())
                            )
                          }
                          placeholder="React, Node.js, MongoDB"
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deletePortfolioItem(item.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'skills':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaGripHorizontal />
                Skills Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['skills'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['skills']}
                    onChange={() => toggleSectionVisibility('skills')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            <AddButton onClick={addSkill}>
              <FaPlus />
              Add Skill
            </AddButton>

            <ListContainer>
              {skillsData.map(skill => (
                <ListItem key={skill.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Skill Name</FormLabel>
                        <FormInput
                          value={skill.name}
                          onChange={e =>
                            updateSkill(skill.id, 'name', e.target.value)
                          }
                          placeholder="Skill name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Icon (Emoji)</FormLabel>
                        <FormInput
                          value={skill.icon}
                          onChange={e =>
                            updateSkill(skill.id, 'icon', e.target.value)
                          }
                          placeholder="🔧"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Skill Level ({skill.level}%)</FormLabel>
                        <FormInput
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={e =>
                            updateSkill(
                              skill.id,
                              'level',
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteSkill(skill.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'experience':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaAddressCard />
                Experience Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['experience'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['experience']}
                    onChange={() => toggleSectionVisibility('experience')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            <AddButton onClick={addExperience}>
              <FaPlus />
              Add Experience
            </AddButton>

            <ListContainer>
              {experienceData.map(exp => (
                <ListItem key={exp.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Company</FormLabel>
                        <FormInput
                          value={exp.company}
                          onChange={e =>
                            updateExperience(exp.id, 'company', e.target.value)
                          }
                          placeholder="Company name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Role</FormLabel>
                        <FormInput
                          value={exp.role}
                          onChange={e =>
                            updateExperience(exp.id, 'role', e.target.value)
                          }
                          placeholder="Job title"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Period</FormLabel>
                        <FormInput
                          value={exp.period}
                          onChange={e =>
                            updateExperience(exp.id, 'period', e.target.value)
                          }
                          placeholder="2020 - Present"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Description</FormLabel>
                        <FormTextarea
                          value={exp.description}
                          onChange={e =>
                            updateExperience(
                              exp.id,
                              'description',
                              e.target.value
                            )
                          }
                          placeholder="Job description"
                          rows={3}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteExperience(exp.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'gallery':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaImages />
                Gallery Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['gallery'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['gallery']}
                    onChange={() => toggleSectionVisibility('gallery')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            <AddButton onClick={addGalleryCategory}>
              <FaPlus />
              Add Gallery Category
            </AddButton>

            <ListContainer>
              {galleryData.map(category => (
                <ListItem key={category.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Category Name</FormLabel>
                        <FormInput
                          value={category.category}
                          onChange={e =>
                            updateGalleryCategory(
                              category.id,
                              'category',
                              e.target.value
                            )
                          }
                          placeholder="Category name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Image Count</FormLabel>
                        <FormInput
                          type="number"
                          value={category.images}
                          onChange={e =>
                            updateGalleryCategory(
                              category.id,
                              'images',
                              parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="Number of images"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Description</FormLabel>
                        <FormTextarea
                          value={category.description || ''}
                          onChange={e =>
                            updateGalleryCategory(
                              category.id,
                              'description',
                              e.target.value
                            )
                          }
                          placeholder="Category description"
                          rows={2}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteGalleryCategory(category.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'packages':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaDollarSign />
                Packages & Pricing
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['packages'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['packages']}
                    onChange={() => toggleSectionVisibility('packages')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            <AddButton onClick={addPackage}>
              <FaPlus />
              Add Package
            </AddButton>

            <ListContainer>
              {packagesData.map(pkg => (
                <ListItem key={pkg.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Package Name</FormLabel>
                        <FormInput
                          value={pkg.name}
                          onChange={e =>
                            updatePackage(pkg.id, 'name', e.target.value)
                          }
                          placeholder="Package name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Price</FormLabel>
                        <FormInput
                          value={pkg.price}
                          onChange={e =>
                            updatePackage(pkg.id, 'price', e.target.value)
                          }
                          placeholder="$99"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Duration</FormLabel>
                        <FormInput
                          value={pkg.duration}
                          onChange={e =>
                            updatePackage(pkg.id, 'duration', e.target.value)
                          }
                          placeholder="2 hours"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>
                          <input
                            type="checkbox"
                            checked={pkg.featured || false}
                            onChange={e =>
                              updatePackage(
                                pkg.id,
                                'featured',
                                e.target.checked
                              )
                            }
                            style={{ marginRight: '8px' }}
                          />
                          Featured Package
                        </FormLabel>
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Description</FormLabel>
                        <FormTextarea
                          value={pkg.description}
                          onChange={e =>
                            updatePackage(pkg.id, 'description', e.target.value)
                          }
                          placeholder="Package description"
                          rows={3}
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Features (comma-separated)</FormLabel>
                        <FormInput
                          value={
                            Array.isArray(pkg.features)
                              ? pkg.features.join(', ')
                              : ''
                          }
                          onChange={e =>
                            updatePackage(
                              pkg.id,
                              'features',
                              e.target.value.split(', ').filter(f => f.trim())
                            )
                          }
                          placeholder="Feature 1, Feature 2, Feature 3"
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deletePackage(pkg.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'testimonials':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaComments />
                Testimonials Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['testimonials'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['testimonials']}
                    onChange={() => toggleSectionVisibility('testimonials')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            {/* Section UI Content Editing */}
            <div
              style={{
                marginBottom: theme.spacing.xl,
                padding: theme.spacing.lg,
                background: theme.colors.gray50,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <h3
                style={{
                  marginBottom: theme.spacing.md,
                  color: theme.colors.gray800,
                }}
              >
                Section Text & Labels
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Section Title</FormLabel>
                  <FormInput
                    value={
                      uiContentData.sections?.testimonials?.title ||
                      'What Our Clients Say'
                    }
                    onChange={e => {
                      setUiContentData(prev => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          testimonials: {
                            ...prev.sections?.testimonials,
                            title: e.target.value,
                          },
                        },
                      }));
                      trackSectionChange('testimonials');
                    }}
                    placeholder="What Our Clients Say"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Section Subtitle</FormLabel>
                  <FormTextarea
                    value={
                      uiContentData.sections?.testimonials?.subtitle ||
                      "Don't just take our word for it - hear from our satisfied customers about their experiences."
                    }
                    onChange={e => {
                      setUiContentData(prev => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          testimonials: {
                            ...prev.sections?.testimonials,
                            subtitle: e.target.value,
                          },
                        },
                      }));
                      trackSectionChange('testimonials');
                    }}
                    placeholder="Don't just take our word for it - hear from our satisfied customers about their experiences."
                    rows={3}
                  />
                </FormGroup>
              </FormGrid>
            </div>

            <AddButton onClick={addTestimonial}>
              <FaPlus />
              Add Testimonial
            </AddButton>

            <ListContainer>
              {testimonialsData.map(testimonial => (
                <ListItem key={testimonial.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Client Name</FormLabel>
                        <FormInput
                          value={testimonial.name}
                          onChange={e =>
                            updateTestimonial(
                              testimonial.id,
                              'name',
                              e.target.value
                            )
                          }
                          placeholder="Client name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Company</FormLabel>
                        <FormInput
                          value={testimonial.company}
                          onChange={e =>
                            updateTestimonial(
                              testimonial.id,
                              'company',
                              e.target.value
                            )
                          }
                          placeholder="Company name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Role</FormLabel>
                        <FormInput
                          value={testimonial.role}
                          onChange={e =>
                            updateTestimonial(
                              testimonial.id,
                              'role',
                              e.target.value
                            )
                          }
                          placeholder="Job title"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Rating</FormLabel>
                        <FormInput
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={e =>
                            updateTestimonial(
                              testimonial.id,
                              'rating',
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>
                          <FaFileImage />
                          Client Photo URL
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id={`testimonial-image-${testimonial.id}`}
                            onChange={e =>
                              handleImageUpload(e, url =>
                                updateTestimonial(testimonial.id, 'image', url)
                              )
                            }
                          />
                          <label
                            htmlFor={`testimonial-image-${testimonial.id}`}
                            style={{
                              marginLeft: '10px',
                              cursor: 'pointer',
                              color: '#3b82f6',
                            }}
                          >
                            <FaUpload /> Upload
                          </label>
                        </FormLabel>
                        <FormInput
                          value={testimonial.image || ''}
                          onChange={e =>
                            updateTestimonial(
                              testimonial.id,
                              'image',
                              e.target.value
                            )
                          }
                          placeholder="Enter image URL or upload"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Review</FormLabel>
                        <FormTextarea
                          value={testimonial.review}
                          onChange={e =>
                            updateTestimonial(
                              testimonial.id,
                              'review',
                              e.target.value
                            )
                          }
                          placeholder="Client testimonial"
                          rows={4}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'reviews':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaStar />
                Reviews Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['reviews'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['reviews']}
                    onChange={() => toggleSectionVisibility('reviews')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            <AddButton onClick={addReview}>
              <FaPlus />
              Add Review
            </AddButton>

            <ListContainer>
              {reviewsData.map(review => (
                <ListItem key={review.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Reviewer Name</FormLabel>
                        <FormInput
                          value={review.name}
                          onChange={e =>
                            updateReview(review.id, 'name', e.target.value)
                          }
                          placeholder="Reviewer name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Date</FormLabel>
                        <FormInput
                          type="date"
                          value={review.date}
                          onChange={e =>
                            updateReview(review.id, 'date', e.target.value)
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Rating</FormLabel>
                        <FormInput
                          type="number"
                          min="1"
                          max="5"
                          value={review.rating}
                          onChange={e =>
                            updateReview(
                              review.id,
                              'rating',
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>
                          <FaFileImage />
                          Avatar URL
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id={`review-avatar-${review.id}`}
                            onChange={e =>
                              handleImageUpload(e, url =>
                                updateReview(review.id, 'avatar', url)
                              )
                            }
                          />
                          <label
                            htmlFor={`review-avatar-${review.id}`}
                            style={{
                              marginLeft: '10px',
                              cursor: 'pointer',
                              color: '#3b82f6',
                            }}
                          >
                            <FaUpload /> Upload
                          </label>
                        </FormLabel>
                        <FormInput
                          value={review.avatar || ''}
                          onChange={e =>
                            updateReview(review.id, 'avatar', e.target.value)
                          }
                          placeholder="Enter avatar URL or upload"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Review Text</FormLabel>
                        <FormTextarea
                          value={review.review}
                          onChange={e =>
                            updateReview(review.id, 'review', e.target.value)
                          }
                          placeholder="Review content"
                          rows={3}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteReview(review.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'faq':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaQuestionCircle />
                FAQ Management
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>{sectionVisibility['faq'] ? 'Visible' : 'Hidden'}</span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['faq']}
                    onChange={() => toggleSectionVisibility('faq')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            <AddButton onClick={addFAQ}>
              <FaPlus />
              Add FAQ
            </AddButton>

            <ListContainer>
              {faqData.map(faq => (
                <ListItem key={faq.id}>
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Question</FormLabel>
                        <FormInput
                          value={faq.question}
                          onChange={e =>
                            updateFAQ(faq.id, 'question', e.target.value)
                          }
                          placeholder="Frequently asked question"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Answer</FormLabel>
                        <FormTextarea
                          value={faq.answer}
                          onChange={e =>
                            updateFAQ(faq.id, 'answer', e.target.value)
                          }
                          placeholder="Answer to the question"
                          rows={4}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteFAQ(faq.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          </ContentSection>
        );

      case 'business-hours':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaClock />
                Business Hours
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['business-hours'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['business-hours']}
                    onChange={() => toggleSectionVisibility('business-hours')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            <FormGrid>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Section Title</FormLabel>
                <FormInput
                  value={businessHoursData.title}
                  onChange={e => {
                    setBusinessHoursData(prev => ({
                      ...prev,
                      title: e.target.value,
                    }));
                    trackSectionChange('business-hours');
                  }}
                  placeholder="Business Hours"
                />
              </FormGroup>
              {Object.entries(businessHoursData.hours).map(([day, time]) => (
                <FormGroup key={day}>
                  <FormLabel>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </FormLabel>
                  <FormInput
                    value={time}
                    onChange={e => {
                      setBusinessHoursData(prev => ({
                        ...prev,
                        hours: { ...prev.hours, [day]: e.target.value },
                      }));
                      trackSectionChange('business-hours');
                    }}
                    placeholder="9:00 AM - 6:00 PM"
                  />
                </FormGroup>
              ))}
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
                <span>
                  {sectionVisibility['contact'] ? 'Visible' : 'Hidden'}
                </span>
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
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Section Title</FormLabel>
                <FormInput
                  value={contactData.title}
                  onChange={e => {
                    setContactData(prev => ({
                      ...prev,
                      title: e.target.value,
                    }));
                    trackSectionChange('contact');
                  }}
                  placeholder="Get In Touch"
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Description</FormLabel>
                <FormTextarea
                  value={contactData.description}
                  onChange={e => {
                    setContactData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }));
                    trackSectionChange('contact');
                  }}
                  placeholder="Contact section description"
                  rows={3}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={contactData.email}
                  onChange={e => {
                    setContactData(prev => ({
                      ...prev,
                      email: e.target.value,
                    }));
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
                    setContactData(prev => ({
                      ...prev,
                      phone: e.target.value,
                    }));
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
                    setContactData(prev => ({
                      ...prev,
                      address: e.target.value,
                    }));
                    trackSectionChange('contact');
                  }}
                  placeholder="123 Business Street, City, State 12345"
                  rows={3}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Social Media</FormLabel>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Facebook</FormLabel>
                    <FormInput
                      value={contactData.socialMedia?.facebook || ''}
                      onChange={e => {
                        setContactData(prev => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            facebook: e.target.value,
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Facebook URL"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Instagram</FormLabel>
                    <FormInput
                      value={contactData.socialMedia?.instagram || ''}
                      onChange={e => {
                        setContactData(prev => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            instagram: e.target.value,
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Instagram URL"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Twitter</FormLabel>
                    <FormInput
                      value={contactData.socialMedia?.twitter || ''}
                      onChange={e => {
                        setContactData(prev => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            twitter: e.target.value,
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Twitter URL"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormInput
                      value={contactData.socialMedia?.linkedin || ''}
                      onChange={e => {
                        setContactData(prev => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            linkedin: e.target.value,
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="LinkedIn URL"
                    />
                  </FormGroup>
                </FormGrid>
              </FormGroup>

              {/* Button Labels & Contact Form UI */}
              <FormGroup
                style={{ gridColumn: '1 / -1', marginTop: theme.spacing.xl }}
              >
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.gray800,
                    borderTop: `1px solid ${theme.colors.gray200}`,
                    paddingTop: theme.spacing.lg,
                  }}
                >
                  Button Labels
                </h3>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Primary Action Button</FormLabel>
                    <FormInput
                      value={uiContentData.buttons?.bookNow || 'Book Now'}
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          buttons: { ...prev.buttons, bookNow: e.target.value },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Book Now"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Send Message Button</FormLabel>
                    <FormInput
                      value={
                        uiContentData.buttons?.sendMessage || 'Send Message'
                      }
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          buttons: {
                            ...prev.buttons,
                            sendMessage: e.target.value,
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Send Message"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Contact Us Button</FormLabel>
                    <FormInput
                      value={uiContentData.buttons?.contactUs || 'Contact Us'}
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          buttons: {
                            ...prev.buttons,
                            contactUs: e.target.value,
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Contact Us"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Learn More Button</FormLabel>
                    <FormInput
                      value={uiContentData.buttons?.learnMore || 'Learn More'}
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          buttons: {
                            ...prev.buttons,
                            learnMore: e.target.value,
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Learn More"
                    />
                  </FormGroup>
                </FormGrid>
              </FormGroup>

              <FormGroup
                style={{ gridColumn: '1 / -1', marginTop: theme.spacing.lg }}
              >
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.gray800,
                  }}
                >
                  Contact Form Placeholders
                </h3>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Name Field Placeholder</FormLabel>
                    <FormInput
                      value={
                        uiContentData.contactForm?.placeholders?.name ||
                        'Your Name'
                      }
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          contactForm: {
                            ...prev.contactForm,
                            placeholders: {
                              ...prev.contactForm?.placeholders,
                              name: e.target.value,
                            },
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Your Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email Field Placeholder</FormLabel>
                    <FormInput
                      value={
                        uiContentData.contactForm?.placeholders?.email ||
                        'Your Email'
                      }
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          contactForm: {
                            ...prev.contactForm,
                            placeholders: {
                              ...prev.contactForm?.placeholders,
                              email: e.target.value,
                            },
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Your Email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Phone Field Placeholder</FormLabel>
                    <FormInput
                      value={
                        uiContentData.contactForm?.placeholders?.phone ||
                        'Your Phone'
                      }
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          contactForm: {
                            ...prev.contactForm,
                            placeholders: {
                              ...prev.contactForm?.placeholders,
                              phone: e.target.value,
                            },
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Your Phone"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Message Field Placeholder</FormLabel>
                    <FormInput
                      value={
                        uiContentData.contactForm?.placeholders?.message ||
                        'Your Message'
                      }
                      onChange={e => {
                        setUiContentData(prev => ({
                          ...prev,
                          contactForm: {
                            ...prev.contactForm,
                            placeholders: {
                              ...prev.contactForm?.placeholders,
                              message: e.target.value,
                            },
                          },
                        }));
                        trackSectionChange('contact');
                      }}
                      placeholder="Your Message"
                    />
                  </FormGroup>
                </FormGrid>
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      case 'custom-sections':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaPlus />
                Custom Sections
              </SectionTitle>
            </SectionHeader>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap',
              }}
            >
              <AddButton onClick={() => addCustomSection('text')}>
                <FaTextHeight />
                Add Text Section
              </AddButton>
              <AddButton
                onClick={() => addCustomSection('list')}
                style={{ background: '#10b981' }}
              >
                <FaList />
                Add List Section
              </AddButton>
              <AddButton
                onClick={() => addCustomSection('card')}
                style={{ background: '#8b5cf6' }}
              >
                <FaServicestack />
                Add Card Section
              </AddButton>
              <AddButton
                onClick={() => addCustomSection('image')}
                style={{ background: '#f59e0b' }}
              >
                <FaImages />
                Add Image Section
              </AddButton>
            </div>

            <ListContainer>
              {customSectionsData.map(section => (
                <ListItem
                  key={section.id}
                  style={{
                    border: `2px solid ${section.visible ? '#10b981' : '#6b7280'}`,
                  }}
                >
                  <div className="item-info">
                    <FormGrid>
                      <FormGroup>
                        <FormLabel>Section Title</FormLabel>
                        <FormInput
                          value={section.title}
                          onChange={e =>
                            updateCustomSection(
                              section.id,
                              'title',
                              e.target.value
                            )
                          }
                          placeholder="Section title"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Section Type</FormLabel>
                        <select
                          value={section.type}
                          onChange={e =>
                            updateCustomSection(
                              section.id,
                              'type',
                              e.target.value
                            )
                          }
                          style={{
                            padding: '10px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            width: '100%',
                          }}
                        >
                          <option value="text">📝 Text Content</option>
                          <option value="list">📋 List Items</option>
                          <option value="card">🎴 Card Layout</option>
                          <option value="image">🖼️ Image Gallery</option>
                        </select>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>
                          <input
                            type="checkbox"
                            checked={section.visible || false}
                            onChange={e =>
                              updateCustomSection(
                                section.id,
                                'visible',
                                e.target.checked
                              )
                            }
                            style={{ marginRight: '8px' }}
                          />
                          <span
                            style={{
                              color: section.visible ? '#10b981' : '#6b7280',
                            }}
                          >
                            {section.visible ? '👁️ Visible' : '🚫 Hidden'}
                          </span>
                        </FormLabel>
                      </FormGroup>

                      {/* Smart editing interface based on section type */}
                      {section.type === 'text' && (
                        <>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>Heading</FormLabel>
                            <FormInput
                              value={section.content.heading || ''}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  heading: e.target.value,
                                })
                              }
                              placeholder="Section heading"
                            />
                          </FormGroup>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>Description</FormLabel>
                            <FormTextarea
                              value={section.content.description || ''}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  description: e.target.value,
                                })
                              }
                              placeholder="Your content here..."
                              rows={4}
                            />
                          </FormGroup>
                        </>
                      )}

                      {section.type === 'list' && (
                        <>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>List Heading</FormLabel>
                            <FormInput
                              value={section.content.heading || ''}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  heading: e.target.value,
                                })
                              }
                              placeholder="List heading"
                            />
                          </FormGroup>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>List Items (one per line)</FormLabel>
                            <FormTextarea
                              value={(section.content.items || []).join('\n')}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  items: e.target.value
                                    .split('\n')
                                    .filter(item => item.trim()),
                                })
                              }
                              placeholder="Item 1&#10;Item 2&#10;Item 3"
                              rows={5}
                            />
                          </FormGroup>
                        </>
                      )}

                      {section.type === 'card' && (
                        <>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>Card Section Heading</FormLabel>
                            <FormInput
                              value={section.content.heading || ''}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  heading: e.target.value,
                                })
                              }
                              placeholder="Card section heading"
                            />
                          </FormGroup>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>Cards (JSON format)</FormLabel>
                            <FormTextarea
                              value={JSON.stringify(
                                section.content.cards || [],
                                null,
                                2
                              )}
                              onChange={e => {
                                try {
                                  const cards = JSON.parse(e.target.value);
                                  updateCustomSection(section.id, 'content', {
                                    ...section.content,
                                    cards,
                                  });
                                } catch (error) {
                                  // Invalid JSON, ignore
                                }
                              }}
                              placeholder='[{"title": "Card Title", "description": "Card description", "icon": "🎯"}]'
                              rows={6}
                            />
                          </FormGroup>
                        </>
                      )}

                      {section.type === 'image' && (
                        <>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>Gallery Heading</FormLabel>
                            <FormInput
                              value={section.content.heading || ''}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  heading: e.target.value,
                                })
                              }
                              placeholder="Gallery heading"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>Columns</FormLabel>
                            <FormInput
                              type="number"
                              min="1"
                              max="6"
                              value={section.content.columns || 3}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  columns: parseInt(e.target.value),
                                })
                              }
                            />
                          </FormGroup>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <FormLabel>Image URLs (one per line)</FormLabel>
                            <FormTextarea
                              value={(section.content.images || []).join('\n')}
                              onChange={e =>
                                updateCustomSection(section.id, 'content', {
                                  ...section.content,
                                  images: e.target.value
                                    .split('\n')
                                    .filter(url => url.trim()),
                                })
                              }
                              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                              rows={4}
                            />
                          </FormGroup>
                        </>
                      )}

                      <FormGroup
                        style={{
                          gridColumn: '1 / -1',
                          marginTop: '20px',
                          padding: '10px',
                          background: '#f8f9fa',
                          borderRadius: '6px',
                        }}
                      >
                        <FormLabel>Advanced: Raw JSON Content</FormLabel>
                        <FormTextarea
                          value={JSON.stringify(section.content, null, 2)}
                          onChange={e => {
                            try {
                              const content = JSON.parse(e.target.value);
                              updateCustomSection(
                                section.id,
                                'content',
                                content
                              );
                            } catch (error) {
                              // Invalid JSON, but still update to show user's input
                              updateCustomSection(section.id, 'content', {
                                raw: e.target.value,
                              });
                            }
                          }}
                          placeholder='{"title": "Custom Content", "description": "Your content here"}'
                          rows={4}
                          style={{
                            fontSize: '0.85rem',
                            fontFamily: 'monospace',
                          }}
                        />
                      </FormGroup>
                    </FormGrid>
                  </div>
                  <div className="item-actions">
                    <ItemButton
                      onClick={() => {
                        const newOrder =
                          customSectionsData.indexOf(section) - 1;
                        if (newOrder >= 0) {
                          const newData = [...customSectionsData];
                          const [removed] = newData.splice(
                            customSectionsData.indexOf(section),
                            1
                          );
                          newData.splice(newOrder, 0, removed);
                          setCustomSectionsData(newData);
                          trackSectionChange('custom');
                        }
                      }}
                      disabled={customSectionsData.indexOf(section) === 0}
                    >
                      ↑ Up
                    </ItemButton>
                    <ItemButton
                      onClick={() => {
                        const newOrder =
                          customSectionsData.indexOf(section) + 1;
                        if (newOrder < customSectionsData.length) {
                          const newData = [...customSectionsData];
                          const [removed] = newData.splice(
                            customSectionsData.indexOf(section),
                            1
                          );
                          newData.splice(newOrder, 0, removed);
                          setCustomSectionsData(newData);
                          trackSectionChange('custom');
                        }
                      }}
                      disabled={
                        customSectionsData.indexOf(section) ===
                        customSectionsData.length - 1
                      }
                    >
                      ↓ Down
                    </ItemButton>
                    <ItemButton
                      variant="danger"
                      onClick={() => deleteCustomSection(section.id)}
                    >
                      <FaTrash />
                      Delete
                    </ItemButton>
                  </div>
                </ListItem>
              ))}
              {customSectionsData.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#6b7280',
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                  }}
                >
                  <FaPlus
                    style={{
                      fontSize: '3rem',
                      marginBottom: '16px',
                      opacity: 0.5,
                    }}
                  />
                  <h3>No Custom Sections Yet</h3>
                  <p>
                    Click one of the buttons above to add your first custom
                    section!
                  </p>
                </div>
              )}
            </ListContainer>
          </ContentSection>
        );

      case 'section-order':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaList />
                Section Order Management
              </SectionTitle>
            </SectionHeader>

            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #dbeafe',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#1e40af',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <FaChartBar />
                Section Management
              </h4>
              <p style={{ margin: '0', color: '#1e40af', fontSize: '0.9rem' }}>
                Reorder sections to customize your website layout. Use the arrow
                buttons to move sections up or down. Disabled sections will
                appear grayed out but can still be reordered.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => {
                  const defaultOrder = [
                    'hero',
                    'about-us',
                    'services-offered',
                    'portfolio',
                    'skills',
                    'experience',
                    'team',
                    'gallery',
                    'packages',
                    'testimonials',
                    'reviews',
                    'faq',
                    'business-hours',
                    'contact',
                  ];
                  setSectionOrderData(defaultOrder);
                  trackSectionChange('order');
                }}
                style={{
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <FaUndo />
                Reset to Default
              </button>
              <button
                onClick={() => {
                  const shuffled = [...sectionOrderData].sort(
                    () => Math.random() - 0.5
                  );
                  setSectionOrderData(shuffled);
                  trackSectionChange('order');
                }}
                style={{
                  padding: '8px 16px',
                  background: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <FaRandom />
                Shuffle
              </button>
            </div>

            <ListContainer>
              {sectionOrderData.map((sectionId, index) => {
                const isVisible = sectionVisibility[sectionId];
                const sectionIcon =
                  {
                    hero: '🏠',
                    'about-us': '👥',
                    'services-offered': '⚙️',
                    portfolio: '💼',
                    skills: '🎯',
                    experience: '📄',
                    team: '👨‍👩‍👧‍👦',
                    gallery: '����',
                    packages: '💰',
                    testimonials: '💬',
                    reviews: '⭐',
                    faq: '❓',
                    'business-hours': '🕐',
                    contact: '📞',
                  }[sectionId] || '📋';

                return (
                  <ListItem
                    key={sectionId}
                    style={{
                      cursor: 'move',
                      opacity: isVisible ? 1 : 0.6,
                      border: `2px solid ${isVisible ? '#10b981' : '#6b7280'}`,
                      background: isVisible ? '#ffffff' : '#f9fafb',
                    }}
                  >
                    <div
                      className="item-info"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          background: '#f3f4f6',
                          borderRadius: '6px',
                          fontSize: '1.2rem',
                        }}
                      >
                        {index + 1}
                      </div>
                      <span style={{ fontSize: '1.5rem' }}>{sectionIcon}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: '600',
                            textTransform: 'capitalize',
                            color: isVisible ? '#111827' : '#6b7280',
                          }}
                        >
                          {sectionId.replace(/-/g, ' ')}
                        </div>
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: isVisible ? '#10b981' : '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {isVisible ? (
                            <>
                              <FaEye />
                              Visible
                            </>
                          ) : (
                            <>
                              <FaEyeSlash />
                              Hidden
                            </>
                          )}
                        </div>
                      </div>
                      <FaGripHorizontal
                        style={{ color: '#9ca3af', fontSize: '1.2rem' }}
                      />
                    </div>
                    <div className="item-actions">
                      <ItemButton
                        onClick={() => {
                          if (index > 0) {
                            reorderSections(index, index - 1);
                          }
                        }}
                        disabled={index === 0}
                        title="Move up"
                      >
                        <FaChevronUp />
                      </ItemButton>
                      <ItemButton
                        onClick={() => {
                          if (index < sectionOrderData.length - 1) {
                            reorderSections(index, index + 1);
                          }
                        }}
                        disabled={index === sectionOrderData.length - 1}
                        title="Move down"
                      >
                        <FaChevronDown />
                      </ItemButton>
                      <ItemButton
                        onClick={() => toggleSectionVisibility(sectionId)}
                        style={{
                          background: isVisible ? '#ef4444' : '#10b981',
                          color: 'white',
                        }}
                        title={isVisible ? 'Hide section' : 'Show section'}
                      >
                        {isVisible ? <FaEyeSlash /> : <FaEye />}
                      </ItemButton>
                    </div>
                  </ListItem>
                );
              })}
            </ListContainer>

            {/* Preview order */}
            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            >
              <h4 style={{ margin: '0 0 12px 0', color: '#374151' }}>
                Section Preview Order
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {sectionOrderData.map((sectionId, index) => (
                  <span
                    key={sectionId}
                    style={{
                      padding: '4px 8px',
                      background: sectionVisibility[sectionId]
                        ? '#3b82f6'
                        : '#6b7280',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      opacity: sectionVisibility[sectionId] ? 1 : 0.6,
                    }}
                  >
                    {index + 1}. {sectionId.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </ContentSection>
        );

      default:
        return (
          <ContentSection>
            <SectionTitle>
              <FaEdit />
              {activeSection.charAt(0).toUpperCase() +
                activeSection.slice(1).replace(/-/g, ' ')}{' '}
              Management
            </SectionTitle>
            <p>
              This section is under development. Please select another section
              to edit.
            </p>
            <p>
              Available sections: Hero, About Us, Services, Team, Portfolio,
              Skills, Experience, Gallery, Packages, Testimonials, Reviews, FAQ,
              Business Hours, Contact
            </p>
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
            <NavSectionTitle>Advanced</NavSectionTitle>
            {navigationItems
              .filter(item => item.section === 'Advanced')
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

          {/* Save Changes Section - Now part of scrollable content */}
          <NavSection>
            <NavSectionTitle>Save Changes</NavSectionTitle>
            <div style={{ padding: '0 16px' }}>
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

                {changedSections.size > 0 && (
                  <div
                    style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: '#fef3c7',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                    }}
                  >
                    <strong>Changed sections:</strong>
                    <div style={{ marginTop: '4px' }}>
                      {Array.from(changedSections).map(section => (
                        <span
                          key={section}
                          style={{
                            display: 'inline-block',
                            background: '#f59e0b',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            margin: '2px',
                            fontSize: '0.8rem',
                          }}
                        >
                          {section.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </SaveActionsContainer>
            </div>
          </NavSection>
        </SidebarNav>
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
