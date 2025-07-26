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
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { getWeddingVendorById as getVendorById } from '../../DummyData';
import { useAuth } from '../../context/AuthContext';
import {
  setEditingVendor,
  initializeVendor,
  updateVendorField,
  updateVendorImage,
  updateVendorGallery,
  updateServices,
  updateTestimonials,
  updatePackages,
  updateRecentWork,
  updateCustomSections,
  saveChanges,
  discardChanges,
  toggleSectionVisibility,
} from '../../store/slices/vendorManagementSlice';

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

const VendorName = styled.h2`
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: 1.3rem;
  font-weight: 700;
`;

const VendorRole = styled.p`
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
  shouldForwardProp: prop => !['variant', 'disabled'].includes(prop),
})`
  background: ${props =>
    props.variant === 'primary'
      ? `linear-gradient(135deg, ${theme.colors.success}, ${theme.colors.successDark})`
      : props.variant === 'secondary'
        ? theme.colors.gray300
        : theme.colors.white};
  color: ${props =>
    props.variant === 'primary'
      ? 'white'
      : props.variant === 'secondary'
        ? theme.colors.gray700
        : theme.colors.gray700};
  border: ${props =>
    props.variant === 'primary' ? 'none' : `2px solid ${theme.colors.gray300}`};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
  width: 100%;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
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

const FileUploadContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-end;
  flex-wrap: wrap;
`;

const FileUploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${theme.colors.gray50};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }

  input {
    display: none;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const RemoveImageButton = styled.button`
  background: ${theme.colors.error};
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: prop => !['active'].includes(prop),
})`
  background: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray100};
  color: ${props => (props.active ? 'white' : theme.colors.gray700)};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.active ? theme.colors.primaryDark : theme.colors.gray200};
  }
`;

const VendorDashboard = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();

  // Redux state
  const { editingVendor, hasUnsavedChanges, originalVendor } = useSelector(
    state => state.vendorManagement
  );

  // Get vendor ID from URL path
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const vendorId = vendorSlug || pathSegments[0];

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

  // Auto-save function for real-time preview updates
  const autoSaveForPreview = () => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    const timeout = setTimeout(() => {
      handleSaveChanges();
    }, 1000); // Auto-save after 1 second of no changes

    setAutoSaveTimeout(timeout);
  };

  // Local form states - these hold temporary changes
  const [heroData, setHeroData] = useState({
    name: '',
    tagline: '',
    image: '',
    imageFile: null,
  });

  const [aboutUsData, setAboutUsData] = useState({
    description: '',
    mission: '',
    experience: '',
    completedWeddings: '',
    satisfiedCouples: '',
    videoEmbed: '',
    aboutImage: '',
    mediaType: 'video', // 'video' or 'image'
    videoFile: null,
    imageFile: null,
    experienceVisible: true,
    weddingsVisible: true,
    couplesVisible: true,
  });

  const [servicesData, setServicesData] = useState([]);
  const [recentWorkData, setRecentWorkData] = useState([]);
  
  const [galleryData, setGalleryData] = useState({
    subtitle: '',
    activeTab: 'decor',
    categories: {
      decor: { title: 'Decor', images: [] },
      venues: { title: 'Venues', images: [] },
      photography: { title: 'Photography', images: [] },
      catering: { title: 'Catering', images: [] },
    },
  });

  const [testimonialsData, setTestimonialsData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [customSections, setCustomSections] = useState([]);

  const [sectionOrder, setSectionOrder] = useState([
    'hero',
    'about-us',
    'services-offered',
    'recent-work',
    'gallery',
    'packages-pricing',
    'testimonials'
  ]);

  const [changedSections, setChangedSections] = useState(new Set());

  // Track changes in a section
  const trackSectionChange = (sectionId) => {
    setChangedSections(prev => new Set([...prev, sectionId]));
    setSaved(false);
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
      id: 'recent-work',
      label: 'Recent Work',
      icon: FaBriefcase,
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
      id: 'custom-sections',
      label: 'Custom Sections',
      icon: FaPlus,
      section: 'Content Management',
    },
    {
      id: 'section-order',
      label: 'Section Order',
      icon: FaList,
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
    const vendorData = getVendorById(vendorId);
    if (vendorData) {
      setVendor(vendorData);

      // Initialize vendor in Redux state if it doesn't exist, then set as editing
      try {
        // Create a sanitized version for Redux
        const sanitizedVendor = JSON.parse(JSON.stringify(vendorData));
        dispatch(initializeVendor(sanitizedVendor));
        dispatch(setEditingVendor(vendorId));
      } catch (error) {
        console.error('Error setting editing vendor:', error);
      }

      // Pre-fill all form data from vendor data
      setHeroData({
        name: vendorData.name || '',
        tagline: vendorData.tagline || '',
        image: vendorData.image || '',
        imageFile: null,
      });

      setAboutUsData({
        description: vendorData.description || vendorData.aboutUs?.text || '',
        mission: vendorData.mission || '',
        experience: vendorData.aboutUs?.experience || '0+',
        completedWeddings: vendorData.aboutUs?.completedWeddings || '0+',
        satisfiedCouples: vendorData.aboutUs?.satisfiedCouples || '0+',
        videoEmbed: vendorData.aboutUs?.videoEmbed || '',
        aboutImage: vendorData.aboutUs?.aboutImage || '',
        mediaType: vendorData.aboutUs?.videoEmbed ? 'video' : 'image',
        videoFile: null,
        imageFile: null,
        experienceVisible: vendorData.aboutUs?.experienceVisible !== false,
        weddingsVisible: vendorData.aboutUs?.weddingsVisible !== false,
        couplesVisible: vendorData.aboutUs?.couplesVisible !== false,
      });

      // Pre-fill services with unique IDs
      const servicesWithIds = (vendorData.services || []).map(
        (service, index) => ({
          ...service,
          id: service.id || `service-${Date.now()}-${index}`,
          price: service.price || '$0',
          imageFile: null,
        })
      );
      setServicesData(servicesWithIds);

      // Pre-fill recent work data with unique IDs
      const recentWorkWithIds = (vendorData.locationPortfolio || []).map(
        (work, index) => ({
          ...work,
          id: work.id || `work-${Date.now()}-${index}`,
          title: work.location || '',
          location: work.city || '',
          date: work.weddingDate || '',
          image: work.coverImage || '',
          imageFile: null,
        })
      );
      setRecentWorkData(recentWorkWithIds);

      // Pre-fill gallery data
      setGalleryData({
        subtitle: 'Browse through our portfolio of beautiful weddings and events',
        activeTab: 'decor',
        categories: vendorData.gallery || {
          decor: { title: 'Decor', images: [] },
          venues: { title: 'Venues', images: [] },
          photography: { title: 'Photography', images: [] },
          catering: { title: 'Catering', images: [] },
        },
      });

      // Pre-fill testimonials data with unique IDs
      const testimonialsWithIds = (vendorData.testimonials || []).map(
        (testimonial, index) => ({
          ...testimonial,
          id: testimonial.id || `testimonial-${Date.now()}-${index}`,
          client: testimonial.name || '',
          text: testimonial.text || '',
          rating: testimonial.rating || 5,
        })
      );
      setTestimonialsData(testimonialsWithIds);

      // Pre-fill packages data with unique IDs
      const packagesWithIds = (vendorData.packages || []).map((pkg, index) => ({
        ...pkg,
        id: pkg.id || `package-${Date.now()}-${index}`,
        features: pkg.features || [],
      }));
      setPackagesData(packagesWithIds);

      // Pre-fill custom sections with unique IDs
      const customSectionsWithIds = (vendorData.customSections || []).map(
        (section, index) => ({
          ...section,
          id: section.id || `custom-section-${Date.now()}-${index}`,
        })
      );
      setCustomSections(customSectionsWithIds);
    }
    setLoading(false);
  }, [vendorId, dispatch]);

  // Handle Save Changes - saves to editing state for real-time preview
  const handleSaveChanges = () => {
    console.log('handleSaveChanges called');

    try {
      // Update editing vendor with current form data for real-time preview
      const updatedVendor = {
        ...editingVendor,
        name: heroData.name || '',
        tagline: heroData.tagline || '',
        image: heroData.image || '',
        description: aboutUsData.description || '',
        aboutUs: {
          text: aboutUsData.description || '',
          experience: aboutUsData.experience || '',
          completedWeddings: aboutUsData.completedWeddings || '',
          satisfiedCouples: aboutUsData.satisfiedCouples || '',
          videoEmbed: aboutUsData.videoEmbed || '',
          aboutImage: aboutUsData.aboutImage || '',
          experienceVisible: aboutUsData.experienceVisible,
          weddingsVisible: aboutUsData.weddingsVisible,
          couplesVisible: aboutUsData.couplesVisible,
        },
        services: servicesData.map(service => ({
          id: service.id,
          name: service.name || '',
          description: service.description || '',
          price: service.price || '',
          icon: service.icon || '',
          image: service.image || '',
        })),
        locationPortfolio: recentWorkData.map(work => ({
          id: work.id,
          location: work.title || '',
          city: work.location || '',
          weddingDate: work.date || '',
          coverImage: work.image || '',
          description: work.description || '',
        })),
        testimonials: testimonialsData.map(testimonial => ({
          id: testimonial.id,
          name: testimonial.client || '',
          text: testimonial.text || '',
          rating: testimonial.rating || 5,
          wedding: testimonial.wedding || '',
        })),
        packages: packagesData.map(pkg => ({
          id: pkg.id,
          name: pkg.name || '',
          description: pkg.description || '',
          price: pkg.price || '',
          features: Array.isArray(pkg.features) ? pkg.features : [],
        })),
        gallery: (() => {
          const cleanGallery = {};
          Object.keys(galleryData.categories || {}).forEach(key => {
            cleanGallery[key] = {
              title: galleryData.categories[key]?.title || key,
              images: Array.isArray(galleryData.categories[key]?.images)
                ? galleryData.categories[key].images.filter(img => typeof img === 'string')
                : [],
            };
          });
          return cleanGallery;
        })(),
      };

      // Update the editing vendor in Redux for real-time preview
      dispatch({ type: 'vendorManagement/setEditingVendor', payload: updatedVendor.id });
      Object.keys(updatedVendor).forEach(key => {
        if (key !== 'id') {
          dispatch({ type: 'vendorManagement/updateVendorField', payload: { field: key, value: updatedVendor[key] } });
        }
      });

      setSaved(true);
      alert('Changes saved! You can preview them in the vendor page. Click "Save & Go Live" to publish permanently.');
      console.log('Updated editing vendor for real-time preview:', updatedVendor);
    } catch (error) {
      console.error('Error saving changes for preview:', error);
      alert('Error saving changes for preview. Please try again.');
    }
  };

  // Handle Save & Go Live - publishes changes to global state
  const handleSaveAndGoLive = () => {
    console.log('handleSaveAndGoLive called');

    if (!editingVendor) {
      alert('No vendor is being edited. Please try refreshing the page.');
      return;
    }

    try {
      // Create clean, serializable objects without File references
      const cleanServices = servicesData.map(service => ({
        id: service.id,
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        icon: service.icon || '',
        image: service.image || '',
      }));

      const cleanRecentWork = recentWorkData.map(work => ({
        id: work.id,
        title: work.title || '',
        location: work.location || '',
        date: work.date || '',
        image: work.image || '',
        city: work.location || '',
        weddingDate: work.date || '',
        coverImage: work.image || '',
        description: work.description || '',
      }));

      const cleanTestimonials = testimonialsData.map(testimonial => ({
        id: testimonial.id,
        client: testimonial.client || '',
        name: testimonial.client || '', // Map client to name for compatibility
        text: testimonial.text || '',
        rating: testimonial.rating || 5,
        wedding: testimonial.wedding || '',
      }));

      const cleanPackages = packagesData.map(pkg => ({
        id: pkg.id,
        name: pkg.name || '',
        description: pkg.description || '',
        price: pkg.price || '',
        features: Array.isArray(pkg.features) ? pkg.features : [],
      }));

      const cleanGallery = {};
      Object.keys(galleryData.categories || {}).forEach(key => {
        cleanGallery[key] = {
          title: galleryData.categories[key]?.title || key,
          images: Array.isArray(galleryData.categories[key]?.images)
            ? galleryData.categories[key].images.filter(img => typeof img === 'string')
            : [],
        };
      });

      const cleanAboutUs = {
        text: aboutUsData.description || '',
        experience: aboutUsData.experience || '',
        completedWeddings: aboutUsData.completedWeddings || '',
        satisfiedCouples: aboutUsData.satisfiedCouples || '',
        videoEmbed: aboutUsData.videoEmbed || '',
        aboutImage: aboutUsData.aboutImage || '',
        experienceVisible: aboutUsData.experienceVisible,
        weddingsVisible: aboutUsData.weddingsVisible,
        couplesVisible: aboutUsData.couplesVisible,
      };

      console.log('Dispatching basic field updates...');
      // Update basic fields one by one
      dispatch({ type: 'vendorManagement/updateVendorField', payload: { field: 'name', value: heroData.name || '' } });
      dispatch({ type: 'vendorManagement/updateVendorField', payload: { field: 'tagline', value: heroData.tagline || '' } });
      dispatch({ type: 'vendorManagement/updateVendorField', payload: { field: 'image', value: heroData.image || '' } });
      dispatch({ type: 'vendorManagement/updateVendorField', payload: { field: 'description', value: aboutUsData.description || '' } });
      dispatch({ type: 'vendorManagement/updateVendorField', payload: { field: 'aboutUs', value: cleanAboutUs } });

      console.log('Dispatching array updates...');
      dispatch({ type: 'vendorManagement/updateServices', payload: cleanServices });
      dispatch({ type: 'vendorManagement/updateRecentWork', payload: cleanRecentWork });
      dispatch({ type: 'vendorManagement/updateTestimonials', payload: cleanTestimonials });
      dispatch({ type: 'vendorManagement/updatePackages', payload: cleanPackages });
      dispatch({ type: 'vendorManagement/updateVendorGallery', payload: cleanGallery });

      console.log('Saving changes...');
      dispatch({ type: 'vendorManagement/saveChanges' });

      setSaved(false);
      alert('All changes published to live vendor page successfully!');

      // Navigate back to vendor page
      navigate(`/${vendorId}`);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    }
  };

  // Handle Discard Changes - revert to original state
  const handleDiscardChanges = () => {
    if (!originalVendor) return;

    try {
      // Reset all local form data to original values
      setHeroData({
        name: originalVendor.name || '',
        tagline: originalVendor.tagline || '',
        image: originalVendor.image || '',
        imageFile: null,
      });

      setAboutUsData({
        description: originalVendor.description || originalVendor.aboutUs?.text || '',
        mission: originalVendor.mission || '',
        experience: originalVendor.aboutUs?.experience || '0+',
        completedWeddings: originalVendor.aboutUs?.completedWeddings || '0+',
        satisfiedCouples: originalVendor.aboutUs?.satisfiedCouples || '0+',
        videoEmbed: originalVendor.aboutUs?.videoEmbed || '',
        videoFile: null,
        experienceVisible: true,
        weddingsVisible: true,
        couplesVisible: true,
      });

      // Reset services
      const originalServicesWithIds = (originalVendor.services || []).map(
        (service, index) => ({
          ...service,
          id: service.id || `service-${Date.now()}-${index}`,
          price: service.price || '$0',
          imageFile: null,
        })
      );
      setServicesData(originalServicesWithIds);

      // Reset recent work
      const originalRecentWorkWithIds = (originalVendor.locationPortfolio || []).map(
        (work, index) => ({
          ...work,
          id: work.id || `work-${Date.now()}-${index}`,
          title: work.location || '',
          location: work.city || '',
          date: work.weddingDate || '',
          image: work.coverImage || '',
          imageFile: null,
        })
      );
      setRecentWorkData(originalRecentWorkWithIds);

      // Reset gallery
      setGalleryData({
        subtitle: 'Browse through our portfolio of beautiful weddings and events',
        activeTab: 'decor',
        categories: originalVendor.gallery || {
          decor: { title: 'Decor', images: [] },
          venues: { title: 'Venues', images: [] },
          photography: { title: 'Photography', images: [] },
          catering: { title: 'Catering', images: [] },
        },
      });

      // Reset testimonials
      const originalTestimonialsWithIds = (originalVendor.testimonials || []).map(
        (testimonial, index) => ({
          ...testimonial,
          id: testimonial.id || `testimonial-${Date.now()}-${index}`,
          client: testimonial.name || '',
          text: testimonial.text || '',
          rating: testimonial.rating || 5,
        })
      );
      setTestimonialsData(originalTestimonialsWithIds);

      // Reset packages
      const originalPackagesWithIds = (originalVendor.packages || []).map(
        (pkg, index) => ({
          ...pkg,
          id: pkg.id || `package-${Date.now()}-${index}`,
          features: pkg.features || [],
        })
      );
      setPackagesData(originalPackagesWithIds);

      // Reset custom sections
      const originalCustomSectionsWithIds = (originalVendor.customSections || []).map(
        (section, index) => ({
          ...section,
          id: section.id || `custom-section-${Date.now()}-${index}`,
        })
      );
      setCustomSections(originalCustomSectionsWithIds);

      // Discard changes in Redux
      dispatch(discardChanges());
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

  // File upload handlers
  const handleImageUpload = (file, setter, field) => {
    const reader = new FileReader();
    reader.onload = e => {
      setter(prev => ({ ...prev, [field]: e.target.result, [`${field}File`]: file }));
    };
    reader.readAsDataURL(file);
  };

  // Helper functions for managing dynamic lists
  const addService = () => {
    const newService = {
      id: `service-${Date.now()}-${Math.random()}`,
      name: 'New Service',
      description: 'Service description',
      price: '$0',
      icon: '💍',
      image: '',
      imageFile: null,
    };
    setServicesData(prev => [...prev, newService]);
  };

  const updateService = (id, field, value) => {
    setServicesData(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const deleteService = id => {
    setServicesData(prev => prev.filter(service => service.id !== id));
  };

  const addRecentWork = () => {
    const newWork = {
      id: `work-${Date.now()}-${Math.random()}`,
      title: 'New Project',
      location: 'Location',
      date: 'Date',
      image: '',
      imageFile: null,
    };
    setRecentWorkData(prev => [...prev, newWork]);
  };

  const updateRecentWork = (id, field, value) => {
    setRecentWorkData(prev =>
      prev.map(work => (work.id === id ? { ...work, [field]: value } : work))
    );
  };

  const deleteRecentWork = id => {
    setRecentWorkData(prev => prev.filter(work => work.id !== id));
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: `testimonial-${Date.now()}-${Math.random()}`,
      client: 'Client Name',
      text: 'Testimonial text',
      rating: 5,
    };
    setTestimonialsData(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id, field, value) => {
    setTestimonialsData(prev =>
      prev.map(testimonial =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    );
  };

  const deleteTestimonial = id => {
    setTestimonialsData(prev =>
      prev.filter(testimonial => testimonial.id !== id)
    );
  };

  const addPackage = () => {
    const newPackage = {
      id: `package-${Date.now()}-${Math.random()}`,
      name: 'New Package',
      description: 'Package description',
      price: '$0',
      features: [],
    };
    setPackagesData(prev => [...prev, newPackage]);
  };

  const updatePackage = (id, field, value) => {
    setPackagesData(prev =>
      prev.map(pkg => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
  };

  const deletePackage = id => {
    setPackagesData(prev => prev.filter(pkg => pkg.id !== id));
  };

  // Gallery helpers
  const addGalleryImage = (category, imageUrl) => {
    setGalleryData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          images: [...(prev.categories[category]?.images || []), imageUrl],
        },
      },
    }));
  };

  const removeGalleryImage = (category, imageIndex) => {
    setGalleryData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          images: prev.categories[category].images.filter((_, index) => index !== imageIndex),
        },
      },
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <ContentSection>
            <SectionTitle>
              <FaImages />
              Hero Section
            </SectionTitle>
            <FormGrid>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Business Name</FormLabel>
                <FormInput
                  value={heroData.name}
                  onChange={e => {
                    setHeroData(prev => ({ ...prev, name: e.target.value }));
                    autoSaveForPreview();
                  }}
                  placeholder="Enter your business name"
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Tagline</FormLabel>
                <FormTextarea
                  value={heroData.tagline}
                  onChange={e => {
                    setHeroData(prev => ({ ...prev, tagline: e.target.value }));
                    autoSaveForPreview();
                  }}
                  placeholder="Enter your business tagline..."
                  rows={3}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>
                  <FaCamera />
                  Hero Background Image
                </FormLabel>
                <FileUploadContainer>
                  {heroData.image && (
                    <ImagePreview>
                      <img src={heroData.image} alt="Hero background" />
                      <ImageOverlay>
                        <RemoveImageButton
                          onClick={() => setHeroData(prev => ({ ...prev, image: '', imageFile: null }))}
                        >
                          <FaTrash />
                        </RemoveImageButton>
                      </ImageOverlay>
                    </ImagePreview>
                  )}
                  <FileUploadBox>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageUpload(e.target.files[0], setHeroData, 'image')}
                    />
                    <FaUpload size={24} color={theme.colors.gray400} />
                    <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>Upload Image</span>
                  </FileUploadBox>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>
                      <FaLink />
                      Or paste image URL
                    </FormLabel>
                    <FormInput
                      value={heroData.image}
                      onChange={e =>
                        setHeroData(prev => ({ ...prev, image: e.target.value }))
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </FormGroup>
                </FileUploadContainer>
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      case 'about-us':
        return (
          <ContentSection>
            <SectionTitle>
              <FaUser />
              About Us
            </SectionTitle>
            <FormGrid>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Business Description</FormLabel>
                <FormTextarea
                  value={aboutUsData.description}
                  onChange={e =>
                    setAboutUsData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Tell your clients about your business..."
                  rows={6}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Mission & Values</FormLabel>
                <FormTextarea
                  value={aboutUsData.mission}
                  onChange={e =>
                    setAboutUsData(prev => ({
                      ...prev,
                      mission: e.target.value,
                    }))
                  }
                  placeholder="Share your mission and values..."
                  rows={4}
                />
              </FormGroup>
              
              {/* Statistics Section */}
              <FormGroup>
                <FormLabel style={{ justifyContent: 'space-between' }}>
                  Years of Experience
                  <ToggleSwitch>
                    <input 
                      type="checkbox" 
                      checked={aboutUsData.experienceVisible}
                      onChange={e => setAboutUsData(prev => ({ ...prev, experienceVisible: e.target.checked }))}
                    />
                    <span></span>
                  </ToggleSwitch>
                </FormLabel>
                <FormInput
                  value={aboutUsData.experience}
                  onChange={e =>
                    setAboutUsData(prev => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  placeholder="e.g., 10+"
                  disabled={!aboutUsData.experienceVisible}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel style={{ justifyContent: 'space-between' }}>
                  Completed Weddings
                  <ToggleSwitch>
                    <input 
                      type="checkbox" 
                      checked={aboutUsData.weddingsVisible}
                      onChange={e => setAboutUsData(prev => ({ ...prev, weddingsVisible: e.target.checked }))}
                    />
                    <span></span>
                  </ToggleSwitch>
                </FormLabel>
                <FormInput
                  value={aboutUsData.completedWeddings}
                  onChange={e =>
                    setAboutUsData(prev => ({
                      ...prev,
                      completedWeddings: e.target.value,
                    }))
                  }
                  placeholder="e.g., 250+"
                  disabled={!aboutUsData.weddingsVisible}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel style={{ justifyContent: 'space-between' }}>
                  Happy Couples
                  <ToggleSwitch>
                    <input 
                      type="checkbox" 
                      checked={aboutUsData.couplesVisible}
                      onChange={e => setAboutUsData(prev => ({ ...prev, couplesVisible: e.target.checked }))}
                    />
                    <span></span>
                  </ToggleSwitch>
                </FormLabel>
                <FormInput
                  value={aboutUsData.satisfiedCouples}
                  onChange={e =>
                    setAboutUsData(prev => ({
                      ...prev,
                      satisfiedCouples: e.target.value,
                    }))
                  }
                  placeholder="e.g., 500+"
                  disabled={!aboutUsData.couplesVisible}
                />
              </FormGroup>
              
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>About Us Media</FormLabel>
                <TabsContainer>
                  <Tab
                    active={aboutUsData.mediaType === 'video'}
                    onClick={() => setAboutUsData(prev => ({ ...prev, mediaType: 'video' }))}
                  >
                    <FaVideo />
                    Video
                  </Tab>
                  <Tab
                    active={aboutUsData.mediaType === 'image'}
                    onClick={() => setAboutUsData(prev => ({ ...prev, mediaType: 'image' }))}
                  >
                    <FaFileImage />
                    Image
                  </Tab>
                </TabsContainer>

                {aboutUsData.mediaType === 'video' ? (
                  <FileUploadContainer>
                    <FileUploadBox>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={e => {
                          const file = e.target.files[0];
                          setAboutUsData(prev => ({ ...prev, videoFile: file }));
                        }}
                      />
                      <FaVideo size={24} color={theme.colors.gray400} />
                      <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>Upload Video</span>
                    </FileUploadBox>
                    <FormGroup style={{ flex: 1 }}>
                      <FormLabel>
                        <FaLink />
                        Or paste video embed URL
                      </FormLabel>
                      <FormInput
                        value={aboutUsData.videoEmbed}
                        onChange={e => {
                          setAboutUsData(prev => ({ ...prev, videoEmbed: e.target.value }));
                          autoSaveForPreview();
                        }}
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </FormGroup>
                  </FileUploadContainer>
                ) : (
                  <FileUploadContainer>
                    {aboutUsData.aboutImage && (
                      <ImagePreview>
                        <img src={aboutUsData.aboutImage} alt="About us" />
                        <ImageOverlay>
                          <RemoveImageButton
                            onClick={() => setAboutUsData(prev => ({ ...prev, aboutImage: '', imageFile: null }))}
                          >
                            <FaTrash />
                          </RemoveImageButton>
                        </ImageOverlay>
                      </ImagePreview>
                    )}
                    <FileUploadBox>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(e.target.files[0], setAboutUsData, 'aboutImage')}
                      />
                      <FaUpload size={24} color={theme.colors.gray400} />
                      <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>Upload Image</span>
                    </FileUploadBox>
                    <FormGroup style={{ flex: 1 }}>
                      <FormLabel>
                        <FaLink />
                        Or paste image URL
                      </FormLabel>
                      <FormInput
                        value={aboutUsData.aboutImage}
                        onChange={e => {
                          setAboutUsData(prev => ({ ...prev, aboutImage: e.target.value }));
                          autoSaveForPreview();
                        }}
                        placeholder="https://example.com/image.jpg"
                      />
                    </FormGroup>
                  </FileUploadContainer>
                )}
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      case 'services-offered':
        return (
          <ContentSection>
            <SectionTitle>
              <FaServicestack />
              Services Offered
            </SectionTitle>
            {servicesData.map(service => (
              <div
                key={service.id}
                style={{
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.lg,
                }}
              >
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Service Name</FormLabel>
                    <FormInput
                      value={service.name}
                      onChange={e =>
                        updateService(service.id, 'name', e.target.value)
                      }
                      placeholder="Wedding Planning"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Price Range</FormLabel>
                    <FormInput
                      value={service.price}
                      onChange={e =>
                        updateService(service.id, 'price', e.target.value)
                      }
                      placeholder="$2000-$5000"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Service Icon (Emoji)</FormLabel>
                    <FormInput
                      value={service.icon}
                      onChange={e =>
                        updateService(service.id, 'icon', e.target.value)
                      }
                      placeholder="💍"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>
                      <FaFileImage />
                      Service Image
                    </FormLabel>
                    <FileUploadContainer>
                      {service.image && (
                        <ImagePreview>
                          <img src={service.image} alt="Service" />
                          <ImageOverlay>
                            <RemoveImageButton
                              onClick={() => updateService(service.id, 'image', '')}
                            >
                              <FaTrash />
                            </RemoveImageButton>
                          </ImageOverlay>
                        </ImagePreview>
                      )}
                      <FileUploadBox>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = event => {
                              updateService(service.id, 'image', event.target.result);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <FaUpload size={20} color={theme.colors.gray400} />
                        <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>Upload</span>
                      </FileUploadBox>
                    </FileUploadContainer>
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Service Description</FormLabel>
                    <FormTextarea
                      value={service.description}
                      onChange={e =>
                        updateService(service.id, 'description', e.target.value)
                      }
                      placeholder="Describe this service in detail..."
                      rows={3}
                    />
                  </FormGroup>
                  <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                    <ActionButton
                      variant="danger"
                      onClick={() => deleteService(service.id)}
                    >
                      <FaTrash />
                      Remove Service
                    </ActionButton>
                  </div>
                </FormGrid>
              </div>
            ))}
            <ActionButton onClick={addService}>
              <FaPlus />
              Add New Service
            </ActionButton>
          </ContentSection>
        );

      case 'recent-work':
        return (
          <ContentSection>
            <SectionTitle>
              <FaBriefcase />
              Recent Work
            </SectionTitle>
            {recentWorkData.map(work => (
              <div
                key={work.id}
                style={{
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.lg,
                }}
              >
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Project Title</FormLabel>
                    <FormInput
                      value={work.title}
                      onChange={e =>
                        updateRecentWork(work.id, 'title', e.target.value)
                      }
                      placeholder="Sarah & Michael Wedding"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Location</FormLabel>
                    <FormInput
                      value={work.location}
                      onChange={e =>
                        updateRecentWork(work.id, 'location', e.target.value)
                      }
                      placeholder="Napa Valley"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Date</FormLabel>
                    <FormInput
                      value={work.date}
                      onChange={e =>
                        updateRecentWork(work.id, 'date', e.target.value)
                      }
                      placeholder="September 2023"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>
                      <FaFileImage />
                      Featured Image
                    </FormLabel>
                    <FileUploadContainer>
                      {work.image && (
                        <ImagePreview>
                          <img src={work.image} alt="Work" />
                          <ImageOverlay>
                            <RemoveImageButton
                              onClick={() => updateRecentWork(work.id, 'image', '')}
                            >
                              <FaTrash />
                            </RemoveImageButton>
                          </ImageOverlay>
                        </ImagePreview>
                      )}
                      <FileUploadBox>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = event => {
                              updateRecentWork(work.id, 'image', event.target.result);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <FaUpload size={20} color={theme.colors.gray400} />
                        <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>Upload</span>
                      </FileUploadBox>
                    </FileUploadContainer>
                  </FormGroup>
                  <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                    <ActionButton
                      variant="danger"
                      onClick={() => deleteRecentWork(work.id)}
                    >
                      <FaTrash />
                      Remove Project
                    </ActionButton>
                  </div>
                </FormGrid>
              </div>
            ))}
            <ActionButton onClick={addRecentWork}>
              <FaPlus />
              Add New Project
            </ActionButton>
          </ContentSection>
        );

      case 'gallery':
        return (
          <ContentSection>
            <SectionTitle>
              <FaImages />
              Gallery
            </SectionTitle>
            <FormGroup style={{ marginBottom: theme.spacing.lg }}>
              <FormLabel>Gallery Subtitle</FormLabel>
              <FormInput
                value={galleryData.subtitle}
                onChange={e => {
                  setGalleryData(prev => ({ ...prev, subtitle: e.target.value }));
                  autoSaveForPreview();
                }}
                placeholder="Browse through our portfolio of beautiful weddings and events"
              />
            </FormGroup>

            {/* Existing Categories */}
            {Object.entries(galleryData.categories).map(([key, category]) => (
              <div
                key={key}
                style={{
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.lg,
                }}
              >
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Category Title</FormLabel>
                    <FormInput
                      value={category.title || key}
                      onChange={e => {
                        setGalleryData(prev => ({
                          ...prev,
                          categories: {
                            ...prev.categories,
                            [key]: {
                              ...prev.categories[key],
                              title: e.target.value,
                            },
                          },
                        }));
                        autoSaveForPreview();
                      }}
                      placeholder="Category name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Add Images</FormLabel>
                    <FileUploadContainer>
                      <FileUploadBox>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={e => {
                            Array.from(e.target.files).forEach(file => {
                              const reader = new FileReader();
                              reader.onload = event => {
                                addGalleryImage(key, event.target.result);
                                autoSaveForPreview();
                              };
                              reader.readAsDataURL(file);
                            });
                          }}
                        />
                        <FaUpload size={20} color={theme.colors.gray400} />
                        <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>Upload</span>
                      </FileUploadBox>
                    </FileUploadContainer>
                  </FormGroup>
                </FormGrid>

                {/* Category Images */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
                  {category.images?.map((image, index) => (
                    <ImagePreview key={index} style={{ width: '120px', height: '80px' }}>
                      <img src={image} alt={`${category.title} ${index}`} />
                      <ImageOverlay>
                        <RemoveImageButton
                          onClick={() => {
                            removeGalleryImage(key, index);
                            autoSaveForPreview();
                          }}
                        >
                          <FaTrash />
                        </RemoveImageButton>
                      </ImageOverlay>
                    </ImagePreview>
                  ))}
                </div>

                <div style={{ textAlign: 'right', marginTop: theme.spacing.md }}>
                  <ActionButton
                    variant="danger"
                    onClick={() => {
                      setGalleryData(prev => {
                        const newCategories = { ...prev.categories };
                        delete newCategories[key];
                        return { ...prev, categories: newCategories };
                      });
                      autoSaveForPreview();
                    }}
                  >
                    <FaTrash />
                    Remove Category
                  </ActionButton>
                </div>
              </div>
            ))}

            {/* Add New Category Button */}
            <ActionButton
              onClick={() => {
                const newCategoryKey = `category_${Date.now()}`;
                setGalleryData(prev => ({
                  ...prev,
                  categories: {
                    ...prev.categories,
                    [newCategoryKey]: {
                      title: 'New Category',
                      images: [],
                    },
                  },
                }));
              }}
            >
              <FaPlus />
              Add New Category
            </ActionButton>
          </ContentSection>
        );

      case 'testimonials':
        return (
          <ContentSection>
            <SectionTitle>
              <FaComments />
              Testimonials
            </SectionTitle>
            {testimonialsData.map(testimonial => (
              <div
                key={testimonial.id}
                style={{
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.lg,
                }}
              >
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Client Name</FormLabel>
                    <FormInput
                      value={testimonial.client}
                      onChange={e =>
                        updateTestimonial(
                          testimonial.id,
                          'client',
                          e.target.value
                        )
                      }
                      placeholder="Sarah & Michael"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Rating (1-5)</FormLabel>
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
                    <FormLabel>Testimonial Text</FormLabel>
                    <FormTextarea
                      value={testimonial.text}
                      onChange={e =>
                        updateTestimonial(
                          testimonial.id,
                          'text',
                          e.target.value
                        )
                      }
                      placeholder="Amazing service! Highly recommended."
                      rows={3}
                    />
                  </FormGroup>
                  <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                    <ActionButton
                      variant="danger"
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      <FaTrash />
                      Remove Testimonial
                    </ActionButton>
                  </div>
                </FormGrid>
              </div>
            ))}
            <ActionButton onClick={addTestimonial}>
              <FaPlus />
              Add New Testimonial
            </ActionButton>
          </ContentSection>
        );

      case 'packages-pricing':
        return (
          <ContentSection>
            <SectionTitle>
              <FaDollarSign />
              Packages & Pricing
            </SectionTitle>
            {packagesData.map(pkg => (
              <div
                key={pkg.id}
                style={{
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.lg,
                }}
              >
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Package Name</FormLabel>
                    <FormInput
                      value={pkg.name}
                      onChange={e =>
                        updatePackage(pkg.id, 'name', e.target.value)
                      }
                      placeholder="Basic Package"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Price</FormLabel>
                    <FormInput
                      value={pkg.price}
                      onChange={e =>
                        updatePackage(pkg.id, 'price', e.target.value)
                      }
                      placeholder="$2000"
                    />
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Package Description</FormLabel>
                    <FormTextarea
                      value={pkg.description}
                      onChange={e =>
                        updatePackage(pkg.id, 'description', e.target.value)
                      }
                      placeholder="Essential wedding planning services..."
                      rows={3}
                    />
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Features (one per line)</FormLabel>
                    <FormTextarea
                      value={pkg.features?.join('\n') || ''}
                      onChange={e =>
                        updatePackage(pkg.id, 'features', e.target.value.split('\n').filter(f => f.trim()))
                      }
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      rows={4}
                    />
                  </FormGroup>
                  <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                    <ActionButton
                      variant="danger"
                      onClick={() => deletePackage(pkg.id)}
                    >
                      <FaTrash />
                      Remove Package
                    </ActionButton>
                  </div>
                </FormGrid>
              </div>
            ))}
            <ActionButton onClick={addPackage}>
              <FaPlus />
              Add New Package
            </ActionButton>
          </ContentSection>
        );

      case 'custom-sections':
        return (
          <ContentSection>
            <SectionTitle>
              <FaPlus />
              Custom Sections
            </SectionTitle>
            <p
              style={{
                color: theme.colors.gray600,
                marginBottom: theme.spacing.lg,
              }}
            >
              Custom sections functionality will be implemented here.
            </p>
          </ContentSection>
        );

      case 'settings':
        return (
          <ContentSection>
            <SectionTitle>
              <FaCog />
              Settings
            </SectionTitle>
            <p
              style={{
                color: theme.colors.gray600,
                marginBottom: theme.spacing.lg,
              }}
            >
              Profile settings functionality will be implemented here.
            </p>
          </ContentSection>
        );

      default:
        return (
          <ContentSection>
            <SectionTitle>Section: {activeSection}</SectionTitle>
            <p>This section is under development.</p>
          </ContentSection>
        );
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          Loading dashboard...
        </div>
      </DashboardContainer>
    );
  }

  if (!vendor) {
    return (
      <DashboardContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2>Vendor Not Found</h2>
            <p>You don't have access to this vendor dashboard.</p>
            <ActionButton onClick={() => navigate('/weddings')}>
              <FaArrowLeft />
              Back to Vendors
            </ActionButton>
          </div>
        </div>
      </DashboardContainer>
    );
  }

  const groupedNavItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <DashboardContainer>
      <MobileSidebarOverlay
        isOpen={mobileSidebarOpen}
        onClick={closeMobileSidebar}
      />
      <MobileMenuButton
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      <Sidebar mobileOpen={mobileSidebarOpen}>
        <SidebarHeader>
          <MobileSidebarCloseButton onClick={closeMobileSidebar}>
            <FaTimes />
          </MobileSidebarCloseButton>
          <VendorName>{vendor.name}</VendorName>
          <VendorRole>Wedding Vendor Dashboard</VendorRole>
        </SidebarHeader>

        <SidebarNav>
          {Object.entries(groupedNavItems).map(([section, items]) => (
            <NavSection key={section}>
              <NavSectionTitle>{section}</NavSectionTitle>
              {items.map(item => (
                <NavItem
                  key={item.id}
                  active={activeSection === item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    closeMobileSidebar();
                  }}
                >
                  <item.icon />
                  {item.label}
                  <FaChevronRight
                    style={{ marginLeft: 'auto', fontSize: '0.8rem' }}
                  />
                </NavItem>
              ))}
            </NavSection>
          ))}

          {/* Save Actions Section - Now part of scrollable content */}
          <NavSection>
            <NavSectionTitle>Actions</NavSectionTitle>
            <SidebarFooter>
              <SaveActionsContainer>
                {(hasUnsavedChanges || saved) && (
                  <ChangesIndicator>
                    <FaEdit />
                    {saved ? 'Changes saved - Ready to publish' : 'You have unsaved changes'}
                  </ChangesIndicator>
                )}
                <SaveButton variant="secondary" onClick={handleDiscardChanges}>
                  <FaUndo />
                  Discard
                </SaveButton>
                <SaveButton
                  onClick={handleSaveChanges}
                  disabled={saved}
                >
                  <FaSave />
                  {saved ? 'Saved' : 'Save Changes'}
                </SaveButton>
                <SaveButton
                  variant="primary"
                  onClick={handleSaveAndGoLive}
                  disabled={!saved}
                >
                  <FaCheckCircle />
                  Save & Go Live
                </SaveButton>
              </SaveActionsContainer>
            </SidebarFooter>
          </NavSection>
        </SidebarNav>
      </Sidebar>

      <MainContent>
        <ContentHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.lg,
            }}
          >
            <ActionButton onClick={() => navigate(`/${vendorId}`)}>
              <FaArrowLeft />
              Back to Site
            </ActionButton>
            <PageTitle>
              {navigationItems.find(item => item.id === activeSection)?.label ||
                'Dashboard'}
            </PageTitle>
          </div>

          <PageActions>
            <ActionButton
              onClick={() => navigate(`/${vendorId}`)}
              variant="secondary"
            >
              <FaEye />
              Preview Site
            </ActionButton>
          </PageActions>
        </ContentHeader>

        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default VendorDashboard;
