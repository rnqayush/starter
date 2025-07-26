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
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { getWeddingVendorById as getVendorById } from '../../DummyData';
import { useAuth } from '../../context/AuthContext';
import {
  setEditingVendor,
  initializeVendor,
  updateVendorField,
  updateVendorImage,
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
  padding-bottom: 120px; /* Space for save bar */

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 260px;
    padding: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: 0;
    padding: ${theme.spacing.md};
    padding-top: 4rem; /* Account for mobile menu button */
    padding-bottom: 140px; /* More space for mobile save bar */
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

const SaveActionsBar = styled.div`
  position: fixed;
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  z-index: 100;
  border: 1px solid ${theme.colors.gray200};
  min-width: 400px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: ${theme.spacing.md};
    right: ${theme.spacing.md};
    left: ${theme.spacing.md};
    min-width: auto;
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const SaveButton = styled.button.withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop),
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
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  font-size: 1rem;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

const ChangesIndicator = styled.div`
  color: ${theme.colors.warning};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.9rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    order: -1;
    width: 100%;
    justify-content: center;
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

  // Debug: Check if action creators are properly imported
  console.log('Action creators:', {
    updateVendorField,
    updateServices,
    saveChanges,
  });

  // Get vendor ID from URL path
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const vendorId = vendorSlug || pathSegments[0];

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Local form states - these hold temporary changes
  const [heroData, setHeroData] = useState({
    name: '',
    tagline: '',
    image: '',
  });

  const [aboutUsData, setAboutUsData] = useState({
    description: '',
    mission: '',
    experience: '',
    specialization: '',
  });

  const [servicesData, setServicesData] = useState([]);
  const [recentWorkData, setRecentWorkData] = useState([]);
  const [photosMediaData, setPhotosMediaData] = useState({
    profileImage: '',
    bannerImage: '',
    gallery: {},
  });

  const [testimonialsData, setTestimonialsData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [customSections, setCustomSections] = useState([]);

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
      id: 'photos-media',
      label: 'Photos & Media',
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
        dispatch(initializeVendor(vendorData));
        dispatch(setEditingVendor(vendorId));
      } catch (error) {
        console.error('Error setting editing vendor:', error);
      }

      // Pre-fill all form data from vendor data
      setHeroData({
        name: vendorData.name || '',
        tagline: vendorData.tagline || '',
        image: vendorData.image || '',
      });

      setAboutUsData({
        description: vendorData.description || vendorData.aboutUs?.text || '',
        mission: vendorData.mission || '',
        experience: vendorData.aboutUs?.experience || '',
        specialization: vendorData.specialties?.join(', ') || '',
      });

      // Pre-fill services with unique IDs
      const servicesWithIds = (vendorData.services || []).map(
        (service, index) => ({
          ...service,
          id: service.id || `service-${Date.now()}-${index}`,
          price: service.price || '$0',
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
        })
      );
      setRecentWorkData(recentWorkWithIds);

      // Pre-fill photos & media data
      setPhotosMediaData({
        profileImage: vendorData.logo || '',
        bannerImage: vendorData.image || '',
        gallery: vendorData.gallery || {},
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

  // Handle Save & Go Live - publishes changes to global state
  const handleSaveAndGoLive = () => {
    console.log('handleSaveAndGoLive called');
    console.log('editingVendor:', editingVendor);

    if (!editingVendor) {
      alert('No vendor is being edited. Please try refreshing the page.');
      return;
    }

    try {
      // Sanitize data to ensure it's serializable
      const sanitizeData = data => {
        return JSON.parse(JSON.stringify(data));
      };

      console.log('Dispatching vendor field updates...');
      // Update vendor data in Redux with all local changes - test one at a time
      console.log('Dispatching name update:', heroData.name);
      dispatch(updateVendorField({ field: 'name', value: heroData.name }));

      console.log('Dispatching tagline update:', heroData.tagline);
      dispatch(
        updateVendorField({ field: 'tagline', value: heroData.tagline })
      );

      console.log('Dispatching image update:', heroData.image);
      dispatch(updateVendorField({ field: 'image', value: heroData.image }));

      console.log('Dispatching description update:', aboutUsData.description);
      dispatch(
        updateVendorField({
          field: 'description',
          value: aboutUsData.description,
        })
      );

      console.log('Dispatching services update...');
      const sanitizedServices = sanitizeData(servicesData);
      console.log('Sanitized services:', sanitizedServices);
      dispatch(updateServices(sanitizedServices));

      console.log('Saving changes...');
      // Save all changes to global state
      dispatch(saveChanges());
      alert('All changes published to live vendor page successfully!');
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
      });

      setAboutUsData({
        description:
          originalVendor.description || originalVendor.aboutUs?.text || '',
        mission: originalVendor.mission || '',
        experience: originalVendor.aboutUs?.experience || '',
        specialization: originalVendor.specialties?.join(', ') || '',
      });

      // Reset services
      const originalServicesWithIds = (originalVendor.services || []).map(
        (service, index) => ({
          ...service,
          id: service.id || `service-${Date.now()}-${index}`,
          price: service.price || '$0',
        })
      );
      setServicesData(originalServicesWithIds);

      // Reset recent work
      const originalRecentWorkWithIds = (
        originalVendor.locationPortfolio || []
      ).map((work, index) => ({
        ...work,
        id: work.id || `work-${Date.now()}-${index}`,
        title: work.location || '',
        location: work.city || '',
        date: work.weddingDate || '',
        image: work.coverImage || '',
      }));
      setRecentWorkData(originalRecentWorkWithIds);

      // Reset photos & media
      setPhotosMediaData({
        profileImage: originalVendor.logo || '',
        bannerImage: originalVendor.image || '',
        gallery: originalVendor.gallery || {},
      });

      // Reset testimonials
      const originalTestimonialsWithIds = (
        originalVendor.testimonials || []
      ).map((testimonial, index) => ({
        ...testimonial,
        id: testimonial.id || `testimonial-${Date.now()}-${index}`,
        client: testimonial.name || '',
        text: testimonial.text || '',
        rating: testimonial.rating || 5,
      }));
      setTestimonialsData(originalTestimonialsWithIds);

      // Reset packages
      const originalPackagesWithIds = (originalVendor.packages || []).map(
        (pkg, index) => ({
          ...pkg,
          id: pkg.id || `package-${Date.now()}-${index}`,
        })
      );
      setPackagesData(originalPackagesWithIds);

      // Reset custom sections
      const originalCustomSectionsWithIds = (
        originalVendor.customSections || []
      ).map((section, index) => ({
        ...section,
        id: section.id || `custom-section-${Date.now()}-${index}`,
      }));
      setCustomSections(originalCustomSectionsWithIds);

      // Discard changes in Redux
      dispatch(discardChanges());
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
      id: `service-${Date.now()}-${Math.random()}`,
      name: 'New Service',
      description: 'Service description',
      price: '$0',
      icon: '💍',
      image: '',
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
                  onChange={e =>
                    setHeroData(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter your business name"
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Tagline</FormLabel>
                <FormTextarea
                  value={heroData.tagline}
                  onChange={e =>
                    setHeroData(prev => ({ ...prev, tagline: e.target.value }))
                  }
                  placeholder="Enter your business tagline..."
                  rows={3}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Hero Background Image URL</FormLabel>
                <FormInput
                  value={heroData.image}
                  onChange={e =>
                    setHeroData(prev => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="Enter background image URL"
                />
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
              <FormGroup>
                <FormLabel>Years of Experience</FormLabel>
                <FormInput
                  value={aboutUsData.experience}
                  onChange={e =>
                    setAboutUsData(prev => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  placeholder="e.g., 10+ years in wedding planning"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Specialization</FormLabel>
                <FormInput
                  value={aboutUsData.specialization}
                  onChange={e =>
                    setAboutUsData(prev => ({
                      ...prev,
                      specialization: e.target.value,
                    }))
                  }
                  placeholder="e.g., Luxury weddings, Destination weddings"
                />
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
                    <FormLabel>Service Image URL</FormLabel>
                    <FormInput
                      value={service.image}
                      onChange={e =>
                        updateService(service.id, 'image', e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                    />
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
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormInput
                      value={work.image}
                      onChange={e =>
                        updateRecentWork(work.id, 'image', e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                    />
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

      case 'photos-media':
        return (
          <ContentSection>
            <SectionTitle>
              <FaImages />
              Photos & Media
            </SectionTitle>
            <FormGrid>
              <FormGroup>
                <FormLabel>Profile Image URL</FormLabel>
                <FormInput
                  value={photosMediaData.profileImage}
                  onChange={e =>
                    setPhotosMediaData(prev => ({
                      ...prev,
                      profileImage: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/profile.jpg"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Banner Image URL</FormLabel>
                <FormInput
                  value={photosMediaData.bannerImage}
                  onChange={e =>
                    setPhotosMediaData(prev => ({
                      ...prev,
                      bannerImage: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/banner.jpg"
                />
              </FormGroup>
            </FormGrid>
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

      {/* Save & Go Live Action Bar */}
      <SaveActionsBar>
        <ChangesIndicator>
          <FaEdit />
          You have unsaved changes
        </ChangesIndicator>
        <SaveButton variant="secondary" onClick={handleDiscardChanges}>
          <FaUndo />
          Discard
        </SaveButton>
        <SaveButton variant="primary" onClick={handleSaveAndGoLive}>
          <FaCheckCircle />
          Save & Go Live
        </SaveButton>
      </SaveActionsBar>
    </DashboardContainer>
  );
};

export default VendorDashboard;
