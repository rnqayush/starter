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
  updateFooterData,
  saveVendorChanges,
  discardVendorChanges,
  toggleSectionVisibility,
  toggleRealTimeUpdates,
} from '../../store/slices/weddingManagementSlice';

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
  const {
    vendors,
    editingVendor,
    hasUnsavedVendorChanges,
    originalVendor,
    realTimeUpdates,
  } = useSelector(state => state.weddingManagement);

  // Get vendor ID from URL path
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const vendorId = vendorSlug || pathSegments[0];

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);

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
  const [customSectionVisibility, setCustomSectionVisibility] = useState({});

  const [sectionOrder, setSectionOrder] = useState([
    'hero',
    'about-us',
    'services-offered',
    'recent-work',
    'gallery',
    'packages-pricing',
    'testimonials',
  ]);

  // Complete section order including custom sections
  const [completeSectionOrder, setCompleteSectionOrder] = useState([]);

  // Section visibility state
  const [sectionVisibility, setSectionVisibility] = useState({
    hero: true,
    'about-us': true,
    'services-offered': true,
    'recent-work': true,
    gallery: true,
    testimonials: true,
    'packages-pricing': true,
    footer: true,
  });

  const [changedSections, setChangedSections] = useState(new Set());
  const [showCustomSectionModal, setShowCustomSectionModal] = useState(false);
  const [editingCustomSection, setEditingCustomSection] = useState(null);
  const [customSectionForm, setCustomSectionForm] = useState({
    title: '',
    subtitle: '',
    type: 'text',
    content: '',
    images: [],
    cards: [],
    visible: true,
  });

  // Footer data state
  const [footerData, setFooterData] = useState({
    companyName: '',
    description: '',
    columns: [
      {
        title: 'Quick Links',
        type: 'links',
        content: [
          { text: 'About Us', url: '#about' },
          { text: 'Services', url: '#services' },
          { text: 'Gallery', url: '#gallery' },
          { text: 'Contact', url: '#contact' },
        ],
      },
      {
        title: 'Contact Info',
        type: 'contact',
        content: {
          showPhone: true,
          showEmail: true,
          showAddress: true,
          showHours: false,
        },
      },
    ],
    socialLinks: {
      instagram: '',
      facebook: '',
      pinterest: '',
      twitter: '',
      linkedin: '',
    },
    copyrightText: '',
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
  });
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // Track changes in a section and update Redux editing vendor for real-time preview
  const trackSectionChange = sectionId => {
    setChangedSections(prev => new Set([...prev, sectionId]));
    setSaved(false);

    // Immediately update Redux editing vendor for real-time preview
    updateEditingVendorInRedux();
  };

  // Handle footer data changes
  const handleFooterChange = updatedFooterData => {
    setFooterData(updatedFooterData);
    trackSectionChange('footer');

    // Dispatch footer update to Redux
    dispatch(updateFooterData({ footerData: updatedFooterData }));
  };

  // Handle section visibility toggle
  const handleSectionVisibilityToggle = sectionId => {
    if (sectionId.startsWith('custom-')) {
      const customId = sectionId.replace('custom-', '');
      setCustomSectionVisibility(prev => {
        const newVisibility = {
          ...prev,
          [customId]: !prev[customId],
        };

        // Immediately update Redux for real-time preview
        if (editingVendor) {
          dispatch(updateVendorField({
            field: 'customSectionVisibility',
            value: newVisibility
          }));
        }

        return newVisibility;
      });
    } else {
      setSectionVisibility(prev => {
        const newVisibility = {
          ...prev,
          [sectionId]: !prev[sectionId],
        };

        // Immediately update Redux for real-time preview
        if (editingVendor) {
          dispatch(updateVendorField({
            field: 'sectionVisibility',
            value: newVisibility
          }));
        }

        return newVisibility;
      });
    }
    trackSectionChange(sectionId);
  };

  // Helper function to immediately update Redux editing vendor
  const updateEditingVendorInRedux = () => {
    if (!editingVendor) return;

    try {
      // Create updated vendor object with current form data
      const updatedVendor = {
        ...editingVendor,
        name: heroData.name || editingVendor.name || '',
        tagline: heroData.tagline || editingVendor.tagline || '',
        image: heroData.image || editingVendor.image || '',
        description: aboutUsData.description || editingVendor.description || '',
        aboutUs: {
          ...(editingVendor.aboutUs || {}),
          text: aboutUsData.description || editingVendor.aboutUs?.text || '',
          experience:
            aboutUsData.experience || editingVendor.aboutUs?.experience || '',
          completedWeddings:
            aboutUsData.completedWeddings ||
            editingVendor.aboutUs?.completedWeddings ||
            '',
          satisfiedCouples:
            aboutUsData.satisfiedCouples ||
            editingVendor.aboutUs?.satisfiedCouples ||
            '',
          videoEmbed:
            aboutUsData.videoEmbed || editingVendor.aboutUs?.videoEmbed || '',
          aboutImage:
            aboutUsData.aboutImage || editingVendor.aboutUs?.aboutImage || '',
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
          coupleNames: work.coupleNames || '',
          description: work.description || '',
          coverImage: work.image || '',
          services: Array.isArray(work.services) ? work.services : [],
          highlights: Array.isArray(work.highlights) ? work.highlights : [],
          gallery: Array.isArray(work.gallery) ? work.gallery : [],
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
                ? galleryData.categories[key].images.filter(
                    img => typeof img === 'string'
                  )
                : [],
            };
          });
          return cleanGallery;
        })(),
        sectionOrder:
          completeSectionOrder.length > 0 ? completeSectionOrder : sectionOrder,
        customSections: customSections,
        sectionVisibility: sectionVisibility,
        customSectionVisibility: customSectionVisibility,
        // Footer data
        footerColumns: footerData.columns,
        footerCopyright: footerData.copyrightText,
        footerBackgroundColor: footerData.backgroundColor,
        footerTextColor: footerData.textColor,
        footerDescription: footerData.description,
        socialLinks: footerData.socialLinks,
      };

      // Update Redux with the current form data for real-time preview
      Object.keys(updatedVendor).forEach(key => {
        if (
          key !== 'id' &&
          JSON.stringify(updatedVendor[key]) !==
            JSON.stringify(editingVendor[key])
        ) {
          dispatch(
            updateVendorField({ field: key, value: updatedVendor[key] })
          );
        }
      });

      console.log(
        'Real-time preview: Updated editing vendor in Redux',
        updatedVendor
      );
    } catch (error) {
      console.error(
        'Error updating editing vendor for real-time preview:',
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
      id: 'footer',
      label: 'Footer',
      icon: FaAddressCard,
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
    // Priority 1: Check if vendor exists in Redux state first
    let vendorData = vendors.find(v => v.id === vendorId);

    // Priority 2: If not in Redux, fetch from JSON and add to Redux
    if (!vendorData) {
      vendorData = getVendorById(vendorId);
      if (vendorData) {
        // Initialize vendor in Redux state
        const sanitizedVendor = JSON.parse(JSON.stringify(vendorData));
        dispatch(initializeVendor(sanitizedVendor));
      }
    }

    if (vendorData) {
      setVendor(vendorData);

      // Set as editing vendor in Redux
      try {
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
        description: vendorData.aboutUs?.text || vendorData.description || '',
        mission: vendorData.mission || '',
        experience: vendorData.aboutUs?.experience || '0+',
        completedWeddings: vendorData.aboutUs?.completedWeddings || '0+',
        satisfiedCouples: vendorData.aboutUs?.satisfiedCouples || '0+',
        videoEmbed: vendorData.aboutUs?.videoEmbed || '',
        aboutImage: vendorData.aboutUs?.aboutImage || '',
        mediaType:
          vendorData.aboutUs?.videoEmbed && !vendorData.aboutUs?.aboutImage
            ? 'video'
            : 'image',
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

      // Pre-fill recent work data with unique IDs and full portfolio details
      const recentWorkWithIds = (vendorData.locationPortfolio || []).map(
        (work, index) => ({
          ...work,
          id: work.id || `work-${Date.now()}-${index}`,
          title: work.location || '',
          location: work.city || '',
          date: work.weddingDate || '',
          image: work.coverImage || '',
          coupleNames: work.coupleNames || '',
          description: work.description || '',
          services: work.services || [],
          highlights: work.highlights || [],
          gallery: work.gallery || [],
          imageFile: null,
        })
      );
      setRecentWorkData(recentWorkWithIds);

      // Pre-fill gallery data - convert old format to new format
      const galleryCategories = {};
      if (vendorData.gallery) {
        Object.keys(vendorData.gallery).forEach(key => {
          if (Array.isArray(vendorData.gallery[key])) {
            galleryCategories[key] = {
              title: key.charAt(0).toUpperCase() + key.slice(1),
              images: vendorData.gallery[key],
            };
          } else if (vendorData.gallery[key]?.images) {
            galleryCategories[key] = vendorData.gallery[key];
          }
        });
      }

      // Add default categories if none exist
      if (Object.keys(galleryCategories).length === 0) {
        galleryCategories.decor = { title: 'Decor', images: [] };
        galleryCategories.venues = { title: 'Venues', images: [] };
        galleryCategories.photography = { title: 'Photography', images: [] };
        galleryCategories.catering = { title: 'Catering', images: [] };
      }

      setGalleryData({
        subtitle:
          'Browse through our portfolio of beautiful weddings and events',
        activeTab: Object.keys(galleryCategories)[0] || 'decor',
        categories: galleryCategories,
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

      // Pre-fill footer data
      setFooterData({
        companyName: vendorData.name || '',
        description: vendorData.description || '',
        columns: vendorData.footerColumns || [
          {
            title: 'Quick Links',
            type: 'links',
            content: [
              { text: 'About Us', url: '#about' },
              { text: 'Services', url: '#services' },
              { text: 'Gallery', url: '#gallery' },
              { text: 'Contact', url: '#contact' },
            ],
          },
          {
            title: 'Contact Info',
            type: 'contact',
            content: {
              showPhone: true,
              showEmail: true,
              showAddress: true,
              showHours: false,
            },
          },
        ],
        socialLinks: vendorData.socialLinks || {
          instagram: '',
          facebook: '',
          pinterest: '',
          twitter: '',
          linkedin: '',
        },
        copyrightText:
          vendorData.footerCopyright ||
          `© 2024 ${vendorData.name}. All rights reserved.`,
        backgroundColor: vendorData.footerBackgroundColor || '#1f2937',
        textColor: vendorData.footerTextColor || '#ffffff',
      });

      // Initialize custom section visibility
      const customVisibility = {};
      customSectionsWithIds.forEach(section => {
        customVisibility[section.id] =
          vendorData.customSectionVisibility?.[section.id] !== false;
      });
      setCustomSectionVisibility(customVisibility);

      // Initialize complete section order
      const defaultOrder = [
        'hero',
        'about-us',
        'services-offered',
        'recent-work',
        'gallery',
        'packages-pricing',
        'testimonials',
      ];

      // Use vendor's section order if available, otherwise use default
      const vendorSectionOrder = vendorData.sectionOrder || defaultOrder;
      setSectionOrder(vendorSectionOrder);

      // Build complete section order including custom sections
      const completeOrder = [...vendorSectionOrder];
      customSectionsWithIds.forEach(customSection => {
        const customId = `custom-${customSection.id}`;
        if (!completeOrder.includes(customId)) {
          completeOrder.push(customId);
        }
      });
      setCompleteSectionOrder(completeOrder);

      // Initialize section visibility from vendor data
      const initialVisibility = {
        hero: vendorData.sectionVisibility?.hero !== false,
        'about-us': vendorData.sectionVisibility?.['about-us'] !== false,
        'services-offered':
          vendorData.sectionVisibility?.['services-offered'] !== false,
        'recent-work': vendorData.sectionVisibility?.['recent-work'] !== false,
        gallery: vendorData.sectionVisibility?.gallery !== false,
        testimonials: vendorData.sectionVisibility?.testimonials !== false,
        'packages-pricing':
          vendorData.sectionVisibility?.['packages-pricing'] !== false,
        footer: vendorData.sectionVisibility?.footer !== false,
      };
      setSectionVisibility(initialVisibility);
    }
    setLoading(false);
  }, [vendorId, dispatch, vendors]);

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
          coupleNames: work.coupleNames || '',
          description: work.description || '',
          coverImage: work.image || '',
          services: Array.isArray(work.services) ? work.services : [],
          highlights: Array.isArray(work.highlights) ? work.highlights : [],
          gallery: Array.isArray(work.gallery) ? work.gallery : [],
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
                ? galleryData.categories[key].images.filter(
                    img => typeof img === 'string'
                  )
                : [],
            };
          });
          return cleanGallery;
        })(),
        sectionOrder: completeSectionOrder.length > 0 ? completeSectionOrder : sectionOrder,
        customSections: customSections,
        sectionVisibility: sectionVisibility,
        customSectionVisibility: customSectionVisibility,
        // Footer data
        footerColumns: footerData.columns,
        footerCopyright: footerData.copyrightText,
        footerBackgroundColor: footerData.backgroundColor,
        footerTextColor: footerData.textColor,
        footerDescription: footerData.description,
        socialLinks: footerData.socialLinks,
      };

      // Update the editing vendor in Redux for real-time preview
      dispatch(setEditingVendor(updatedVendor.id));
      Object.keys(updatedVendor).forEach(key => {
        if (key !== 'id') {
          dispatch(
            updateVendorField({ field: key, value: updatedVendor[key] })
          );
        }
      });

      setSaved(true);
      setChangedSections(new Set());
      alert(
        'Changes saved! You can preview them in the vendor page. Click "Save & Go Live" to publish permanently.'
      );
      console.log(
        'Updated editing vendor for real-time preview:',
        updatedVendor
      );
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
        location: work.title || '',
        city: work.location || '',
        weddingDate: work.date || '',
        coupleNames: work.coupleNames || '',
        description: work.description || '',
        coverImage: work.image || '',
        services: Array.isArray(work.services) ? work.services : [],
        highlights: Array.isArray(work.highlights) ? work.highlights : [],
        gallery: Array.isArray(work.gallery) ? work.gallery : [],
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
            ? galleryData.categories[key].images.filter(
                img => typeof img === 'string'
              )
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

      console.log('Saving changes directly...');
      // Simply save the changes that are already in the editing vendor state
      dispatch(saveVendorChanges());

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
        description:
          originalVendor.aboutUs?.text || originalVendor.description || '',
        mission: originalVendor.mission || '',
        experience: originalVendor.aboutUs?.experience || '0+',
        completedWeddings: originalVendor.aboutUs?.completedWeddings || '0+',
        satisfiedCouples: originalVendor.aboutUs?.satisfiedCouples || '0+',
        videoEmbed: originalVendor.aboutUs?.videoEmbed || '',
        aboutImage: originalVendor.aboutUs?.aboutImage || '',
        mediaType:
          originalVendor.aboutUs?.videoEmbed &&
          !originalVendor.aboutUs?.aboutImage
            ? 'video'
            : 'image',
        videoFile: null,
        imageFile: null,
        experienceVisible: originalVendor.aboutUs?.experienceVisible !== false,
        weddingsVisible: originalVendor.aboutUs?.weddingsVisible !== false,
        couplesVisible: originalVendor.aboutUs?.couplesVisible !== false,
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

      // Reset recent work with full portfolio details
      const originalRecentWorkWithIds = (
        originalVendor.locationPortfolio || []
      ).map((work, index) => ({
        ...work,
        id: work.id || `work-${Date.now()}-${index}`,
        title: work.location || '',
        location: work.city || '',
        date: work.weddingDate || '',
        image: work.coverImage || '',
        coupleNames: work.coupleNames || '',
        description: work.description || '',
        services: work.services || [],
        highlights: work.highlights || [],
        gallery: work.gallery || [],
        imageFile: null,
      }));
      setRecentWorkData(originalRecentWorkWithIds);

      // Reset gallery - convert old format to new format
      const originalGalleryCategories = {};
      if (originalVendor.gallery) {
        Object.keys(originalVendor.gallery).forEach(key => {
          if (Array.isArray(originalVendor.gallery[key])) {
            originalGalleryCategories[key] = {
              title: key.charAt(0).toUpperCase() + key.slice(1),
              images: originalVendor.gallery[key],
            };
          } else if (originalVendor.gallery[key]?.images) {
            originalGalleryCategories[key] = originalVendor.gallery[key];
          }
        });
      }

      if (Object.keys(originalGalleryCategories).length === 0) {
        originalGalleryCategories.decor = { title: 'Decor', images: [] };
        originalGalleryCategories.venues = { title: 'Venues', images: [] };
        originalGalleryCategories.photography = {
          title: 'Photography',
          images: [],
        };
        originalGalleryCategories.catering = { title: 'Catering', images: [] };
      }

      setGalleryData({
        subtitle:
          'Browse through our portfolio of beautiful weddings and events',
        activeTab: Object.keys(originalGalleryCategories)[0] || 'decor',
        categories: originalGalleryCategories,
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
          features: pkg.features || [],
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

      // Reset section visibility
      const originalVisibility = {
        hero: originalVendor.sectionVisibility?.hero !== false,
        'about-us': originalVendor.sectionVisibility?.['about-us'] !== false,
        'services-offered':
          originalVendor.sectionVisibility?.['services-offered'] !== false,
        'recent-work':
          originalVendor.sectionVisibility?.['recent-work'] !== false,
        gallery: originalVendor.sectionVisibility?.gallery !== false,
        testimonials: originalVendor.sectionVisibility?.testimonials !== false,
        'packages-pricing':
          originalVendor.sectionVisibility?.['packages-pricing'] !== false,
      };
      setSectionVisibility(originalVisibility);

      // Reset custom section visibility
      const originalCustomVisibility = {};
      originalCustomSectionsWithIds.forEach(section => {
        originalCustomVisibility[section.id] =
          originalVendor.customSectionVisibility?.[section.id] !== false;
      });
      setCustomSectionVisibility(originalCustomVisibility);

      // Discard changes in Redux
      dispatch(discardVendorChanges());
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

  // File upload handlers
  const handleImageUpload = (file, setter, field) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (setter === setAboutUsData) {
        setter(prev => ({
          ...prev,
          [field]: e.target.result,
          [`${field}File`]: file,
          mediaType: 'image', // Set media type to image when uploading image
        }));
        trackSectionChange('about-us');
      } else {
        setter(prev => ({
          ...prev,
          [field]: e.target.result,
          [`${field}File`]: file,
        }));
        // Trigger real-time updates for other image uploads
        setTimeout(() => updateEditingVendorInRedux(), 100);
      }
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
    // Track section change to enable save button
    trackSectionChange('services-offered');
  };

  const updateService = (id, field, value) => {
    setServicesData(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
    // Track section change to enable save button
    trackSectionChange('services-offered');
    // Automatically trigger real-time updates
    setTimeout(() => updateEditingVendorInRedux(), 100);
  };

  const deleteService = id => {
    setServicesData(prev => prev.filter(service => service.id !== id));
    // Track section change to enable save button
    trackSectionChange('services-offered');
  };

  const addRecentWork = () => {
    const newWork = {
      id: `work-${Date.now()}-${Math.random()}`,
      title: 'New Project',
      location: 'Location',
      date: 'Date',
      image: '',
      coupleNames: '',
      description: '',
      services: [],
      highlights: [],
      gallery: [],
      imageFile: null,
    };
    setRecentWorkData(prev => [...prev, newWork]);
  };

  const updateRecentWork = (id, field, value) => {
    setRecentWorkData(prev =>
      prev.map(work => (work.id === id ? { ...work, [field]: value } : work))
    );
    // Automatically trigger real-time updates
    setTimeout(() => updateEditingVendorInRedux(), 100);
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

  // Custom section helpers
  const openCustomSectionModal = (section = null) => {
    if (section) {
      setEditingCustomSection(section);
      setCustomSectionForm({
        title: section.title || '',
        subtitle: section.subtitle || '',
        type: section.type || 'text',
        content: section.content || '',
        images: Array.isArray(section.images) ? [...section.images] : [],
        cards: Array.isArray(section.cards) ? [...section.cards] : [],
        visible: section.visible !== false, // Default to true if not specified
      });
    } else {
      setEditingCustomSection(null);
      setCustomSectionForm({
        title: '',
        subtitle: '',
        type: 'text',
        content: '',
        images: [],
        cards: [],
        visible: true,
      });
    }
    setShowCustomSectionModal(true);
  };

  const saveCustomSection = () => {
    if (!customSectionForm.title.trim()) {
      alert('Please enter a section title');
      return;
    }

    const sectionData = {
      id: editingCustomSection?.id || `custom-${Date.now()}`,
      title: customSectionForm.title.trim(),
      subtitle: customSectionForm.subtitle.trim(),
      type: customSectionForm.type,
      content: customSectionForm.content.trim(),
      images: customSectionForm.images || [],
      cards: customSectionForm.cards || [],
      visible: customSectionForm.visible,
    };

    if (editingCustomSection) {
      // Update existing section
      setCustomSections(prev =>
        prev.map(section =>
          section.id === editingCustomSection.id ? sectionData : section
        )
      );
      // Update visibility for existing section
      setCustomSectionVisibility(prev => ({
        ...prev,
        [sectionData.id]: sectionData.visible,
      }));
    } else {
      // Add new section
      setCustomSections(prev => [...prev, sectionData]);
      // Add to complete section order
      const customId = `custom-${sectionData.id}`;
      setCompleteSectionOrder(prev => {
        if (!prev.includes(customId)) {
          return [...prev, customId];
        }
        return prev;
      });
      // Set visibility for new custom section
      setCustomSectionVisibility(prev => ({
        ...prev,
        [sectionData.id]: sectionData.visible,
      }));
    }

    setShowCustomSectionModal(false);
    setEditingCustomSection(null);
    setCustomSectionForm({
      title: '',
      subtitle: '',
      type: 'text',
      content: '',
      images: [],
      cards: [],
      visible: true,
    });
    trackSectionChange('custom-sections');

    // Automatically trigger real-time updates
    setTimeout(() => updateEditingVendorInRedux(), 100);
  };

  const addCustomSectionCard = () => {
    setCustomSectionForm(prev => ({
      ...prev,
      cards: [
        ...prev.cards,
        { title: '', description: '', image: '', icon: '' },
      ],
    }));
  };

  const updateCustomSectionCard = (index, field, value) => {
    setCustomSectionForm(prev => ({
      ...prev,
      cards: prev.cards.map((card, i) =>
        i === index ? { ...card, [field]: value } : card
      ),
    }));
  };

  const removeCustomSectionCard = index => {
    setCustomSectionForm(prev => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index),
    }));
  };

  const addCustomSectionImage = imageUrl => {
    setCustomSectionForm(prev => ({
      ...prev,
      images: [...prev.images, imageUrl],
    }));
  };

  const removeCustomSectionImage = index => {
    setCustomSectionForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
    // Automatically trigger real-time updates
    setTimeout(() => updateEditingVendorInRedux(), 100);
  };

  const removeGalleryImage = (category, imageIndex) => {
    setGalleryData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          images: prev.categories[category].images.filter(
            (_, index) => index !== imageIndex
          ),
        },
      },
    }));
    // Automatically trigger real-time updates
    setTimeout(() => updateEditingVendorInRedux(), 100);
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
                    onChange={() => handleSectionVisibilityToggle('hero')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            <FormGrid>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Business Name</FormLabel>
                <FormInput
                  value={heroData.name}
                  onChange={e => {
                    setHeroData(prev => ({ ...prev, name: e.target.value }));
                    trackSectionChange('hero');
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
                    trackSectionChange('hero');
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
                          onClick={() =>
                            setHeroData(prev => ({
                              ...prev,
                              image: '',
                              imageFile: null,
                            }))
                          }
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
                      onChange={e =>
                        handleImageUpload(
                          e.target.files[0],
                          setHeroData,
                          'image'
                        )
                      }
                    />
                    <FaUpload size={24} color={theme.colors.gray400} />
                    <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                      Upload Image
                    </span>
                  </FileUploadBox>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>
                      <FaLink />
                      Or paste image URL
                    </FormLabel>
                    <FormInput
                      value={heroData.image}
                      onChange={e =>
                        setHeroData(prev => ({
                          ...prev,
                          image: e.target.value,
                        }))
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
            <SectionHeader>
              <SectionTitle>
                <FaUser />
                About Us
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['about-us'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['about-us']}
                    onChange={() => handleSectionVisibilityToggle('about-us')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            <FormGrid>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Business Description</FormLabel>
                <FormTextarea
                  value={aboutUsData.description}
                  onChange={e => {
                    setAboutUsData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }));
                    trackSectionChange('about-us');
                  }}
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
                      onChange={e => {
                        setAboutUsData(prev => ({
                          ...prev,
                          experienceVisible: e.target.checked,
                        }));
                        trackSectionChange('about-us');
                      }}
                    />
                    <span></span>
                  </ToggleSwitch>
                </FormLabel>
                <FormInput
                  value={aboutUsData.experience}
                  onChange={e => {
                    setAboutUsData(prev => ({
                      ...prev,
                      experience: e.target.value,
                    }));
                    trackSectionChange('about-us');
                  }}
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
                      onChange={e =>
                        setAboutUsData(prev => ({
                          ...prev,
                          weddingsVisible: e.target.checked,
                        }))
                      }
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
                      onChange={e =>
                        setAboutUsData(prev => ({
                          ...prev,
                          couplesVisible: e.target.checked,
                        }))
                      }
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
                    onClick={() => {
                      setAboutUsData(prev => ({ ...prev, mediaType: 'video' }));
                      trackSectionChange('about-us');
                    }}
                  >
                    <FaVideo />
                    Video
                  </Tab>
                  <Tab
                    active={aboutUsData.mediaType === 'image'}
                    onClick={() => {
                      setAboutUsData(prev => ({ ...prev, mediaType: 'image' }));
                      trackSectionChange('about-us');
                    }}
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
                          setAboutUsData(prev => ({
                            ...prev,
                            videoFile: file,
                          }));
                        }}
                      />
                      <FaVideo size={24} color={theme.colors.gray400} />
                      <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                        Upload Video
                      </span>
                    </FileUploadBox>
                    <FormGroup style={{ flex: 1 }}>
                      <FormLabel>
                        <FaLink />
                        Or paste video embed URL
                      </FormLabel>
                      <FormInput
                        value={aboutUsData.videoEmbed}
                        onChange={e => {
                          setAboutUsData(prev => ({
                            ...prev,
                            videoEmbed: e.target.value,
                          }));
                          trackSectionChange('about-us');
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
                            onClick={() =>
                              setAboutUsData(prev => ({
                                ...prev,
                                aboutImage: '',
                                imageFile: null,
                              }))
                            }
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
                        onChange={e =>
                          handleImageUpload(
                            e.target.files[0],
                            setAboutUsData,
                            'aboutImage'
                          )
                        }
                      />
                      <FaUpload size={24} color={theme.colors.gray400} />
                      <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                        Upload Image
                      </span>
                    </FileUploadBox>
                    <FormGroup style={{ flex: 1 }}>
                      <FormLabel>
                        <FaLink />
                        Or paste image URL
                      </FormLabel>
                      <FormInput
                        value={aboutUsData.aboutImage}
                        onChange={e => {
                          setAboutUsData(prev => ({
                            ...prev,
                            aboutImage: e.target.value,
                          }));
                          trackSectionChange('about-us');
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
                    onChange={() => handleSectionVisibilityToggle('services-offered')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
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
                              onClick={() =>
                                updateService(service.id, 'image', '')
                              }
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
                              updateService(
                                service.id,
                                'image',
                                event.target.result
                              );
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <FaUpload size={20} color={theme.colors.gray400} />
                        <span
                          style={{ fontSize: '0.7rem', textAlign: 'center' }}
                        >
                          Upload
                        </span>
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
            <SectionHeader>
              <SectionTitle>
                <FaBriefcase />
                Portfolio & Recent Work
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['recent-work'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['recent-work']}
                    onChange={() => handleSectionVisibilityToggle('recent-work')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            {recentWorkData.map(work => (
              <div
                key={work.id}
                style={{
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.xl,
                  backgroundColor: theme.colors.gray50,
                }}
              >
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.primary,
                  }}
                >
                  {work.title || 'New Project'}
                </h3>

                {/* Basic Information */}
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Venue/Location Name</FormLabel>
                    <FormInput
                      value={work.title}
                      onChange={e => {
                        updateRecentWork(work.id, 'title', e.target.value);
                        trackSectionChange('recent-work');
                      }}
                      placeholder="Napa Valley Vineyard"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <FormInput
                      value={work.location}
                      onChange={e => {
                        updateRecentWork(work.id, 'location', e.target.value);
                        trackSectionChange('recent-work');
                      }}
                      placeholder="Napa Valley"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Wedding Date</FormLabel>
                    <FormInput
                      value={work.date}
                      onChange={e => {
                        updateRecentWork(work.id, 'date', e.target.value);
                        trackSectionChange('recent-work');
                      }}
                      placeholder="September 2023"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Couple Names</FormLabel>
                    <FormInput
                      value={work.coupleNames}
                      onChange={e => {
                        updateRecentWork(
                          work.id,
                          'coupleNames',
                          e.target.value
                        );
                        trackSectionChange('recent-work');
                      }}
                      placeholder="Sarah & Michael"
                    />
                  </FormGroup>
                </FormGrid>

                {/* Description */}
                <FormGroup style={{ marginTop: theme.spacing.md }}>
                  <FormLabel>Project Description</FormLabel>
                  <FormTextarea
                    value={work.description}
                    onChange={e => {
                      updateRecentWork(work.id, 'description', e.target.value);
                      trackSectionChange('recent-work');
                    }}
                    placeholder="An enchanting vineyard wedding with rustic elegance and breathtaking sunset views..."
                    rows={4}
                  />
                </FormGroup>

                {/* Cover Image */}
                <FormGroup style={{ marginTop: theme.spacing.md }}>
                  <FormLabel>
                    <FaFileImage />
                    Cover Image
                  </FormLabel>
                  <FileUploadContainer>
                    {work.image && (
                      <ImagePreview>
                        <img src={work.image} alt="Work cover" />
                        <ImageOverlay>
                          <RemoveImageButton
                            onClick={() => {
                              updateRecentWork(work.id, 'image', '');
                              trackSectionChange('recent-work');
                            }}
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
                            updateRecentWork(
                              work.id,
                              'image',
                              event.target.result
                            );
                            trackSectionChange('recent-work');
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <FaUpload size={20} color={theme.colors.gray400} />
                      <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>
                        Upload Cover
                      </span>
                    </FileUploadBox>
                    <FormGroup style={{ flex: 1 }}>
                      <FormInput
                        value={work.image}
                        onChange={e => {
                          updateRecentWork(work.id, 'image', e.target.value);
                          trackSectionChange('recent-work');
                        }}
                        placeholder="Or paste image URL..."
                      />
                    </FormGroup>
                  </FileUploadContainer>
                </FormGroup>

                {/* Services Provided */}
                <FormGroup style={{ marginTop: theme.spacing.md }}>
                  <FormLabel>Services Provided (one per line)</FormLabel>
                  <FormTextarea
                    value={
                      Array.isArray(work.services)
                        ? work.services.join('\n')
                        : ''
                    }
                    onChange={e => {
                      const services = e.target.value
                        .split('\n')
                        .filter(s => s.trim());
                      updateRecentWork(work.id, 'services', services);
                      trackSectionChange('recent-work');
                    }}
                    placeholder="Full Wedding Planning&#10;Floral Design&#10;Venue Decoration&#10;Day-of Coordination"
                    rows={4}
                  />
                </FormGroup>

                {/* Project Highlights */}
                <FormGroup style={{ marginTop: theme.spacing.md }}>
                  <FormLabel>Project Highlights (one per line)</FormLabel>
                  <FormTextarea
                    value={
                      Array.isArray(work.highlights)
                        ? work.highlights.join('\n')
                        : ''
                    }
                    onChange={e => {
                      const highlights = e.target.value
                        .split('\n')
                        .filter(h => h.trim());
                      updateRecentWork(work.id, 'highlights', highlights);
                      trackSectionChange('recent-work');
                    }}
                    placeholder="Custom vineyard ceremony setup&#10;Rustic chic reception decor&#10;Farm-to-table catering coordination&#10;Sunset photography session"
                    rows={4}
                  />
                </FormGroup>

                {/* Gallery Images */}
                <FormGroup style={{ marginTop: theme.spacing.md }}>
                  <FormLabel>
                    <FaImages />
                    Portfolio Gallery Images
                  </FormLabel>
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
                              const currentGallery = work.gallery || [];
                              updateRecentWork(work.id, 'gallery', [
                                ...currentGallery,
                                event.target.result,
                              ]);
                              trackSectionChange('recent-work');
                            };
                            reader.readAsDataURL(file);
                          });
                        }}
                      />
                      <FaUpload size={20} color={theme.colors.gray400} />
                      <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>
                        Add Gallery Images
                      </span>
                    </FileUploadBox>
                    <FormGroup style={{ flex: 1 }}>
                      <FormTextarea
                        placeholder="Or paste image URLs (one per line)&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                        rows={3}
                        onBlur={e => {
                          const urls = e.target.value
                            .split('\n')
                            .filter(url => url.trim());
                          if (urls.length > 0) {
                            const currentGallery = work.gallery || [];
                            updateRecentWork(work.id, 'gallery', [
                              ...currentGallery,
                              ...urls,
                            ]);
                            trackSectionChange('recent-work');
                            e.target.value = '';
                          }
                        }}
                      />
                    </FormGroup>
                  </FileUploadContainer>

                  {/* Gallery Preview */}
                  {work.gallery && work.gallery.length > 0 && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: theme.spacing.sm,
                        marginTop: theme.spacing.md,
                      }}
                    >
                      {work.gallery.map((image, index) => (
                        <ImagePreview
                          key={index}
                          style={{ width: '120px', height: '80px' }}
                        >
                          <img src={image} alt={`Gallery ${index}`} />
                          <ImageOverlay>
                            <RemoveImageButton
                              onClick={() => {
                                const newGallery = work.gallery.filter(
                                  (_, i) => i !== index
                                );
                                updateRecentWork(
                                  work.id,
                                  'gallery',
                                  newGallery
                                );
                                trackSectionChange('recent-work');
                              }}
                            >
                              <FaTrash />
                            </RemoveImageButton>
                          </ImageOverlay>
                        </ImagePreview>
                      ))}
                    </div>
                  )}
                </FormGroup>

                <div
                  style={{
                    textAlign: 'right',
                    marginTop: theme.spacing.lg,
                    paddingTop: theme.spacing.md,
                    borderTop: `1px solid ${theme.colors.gray200}`,
                  }}
                >
                  <ActionButton
                    variant="danger"
                    onClick={() => {
                      deleteRecentWork(work.id);
                      trackSectionChange('recent-work');
                    }}
                  >
                    <FaTrash />
                    Remove This Project
                  </ActionButton>
                </div>
              </div>
            ))}
            <ActionButton onClick={addRecentWork}>
              <FaPlus />
              Add New Portfolio Project
            </ActionButton>
          </ContentSection>
        );

      case 'gallery':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaImages />
                Gallery
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['gallery'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['gallery']}
                    onChange={() => handleSectionVisibilityToggle('gallery')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
            <FormGroup style={{ marginBottom: theme.spacing.lg }}>
              <FormLabel>Gallery Subtitle</FormLabel>
              <FormInput
                value={galleryData.subtitle}
                onChange={e => {
                  setGalleryData(prev => ({
                    ...prev,
                    subtitle: e.target.value,
                  }));
                  trackSectionChange('gallery');
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
                        trackSectionChange('gallery');
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
                                trackSectionChange('gallery');
                              };
                              reader.readAsDataURL(file);
                            });
                          }}
                        />
                        <FaUpload size={20} color={theme.colors.gray400} />
                        <span
                          style={{ fontSize: '0.7rem', textAlign: 'center' }}
                        >
                          Upload
                        </span>
                      </FileUploadBox>
                    </FileUploadContainer>
                  </FormGroup>
                </FormGrid>

                {/* Category Images */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: theme.spacing.sm,
                    marginTop: theme.spacing.md,
                  }}
                >
                  {category.images?.map((image, index) => (
                    <ImagePreview
                      key={index}
                      style={{ width: '120px', height: '80px' }}
                    >
                      <img src={image} alt={`${category.title} ${index}`} />
                      <ImageOverlay>
                        <RemoveImageButton
                          onClick={() => {
                            removeGalleryImage(key, index);
                            trackSectionChange('gallery');
                          }}
                        >
                          <FaTrash />
                        </RemoveImageButton>
                      </ImageOverlay>
                    </ImagePreview>
                  ))}
                </div>

                <div
                  style={{ textAlign: 'right', marginTop: theme.spacing.md }}
                >
                  <ActionButton
                    variant="danger"
                    onClick={() => {
                      setGalleryData(prev => {
                        const newCategories = { ...prev.categories };
                        delete newCategories[key];
                        return { ...prev, categories: newCategories };
                      });
                      trackSectionChange('gallery');
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
            <SectionHeader>
              <SectionTitle>
                <FaComments />
                Testimonials
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['testimonials'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['testimonials']}
                    onChange={() => handleSectionVisibilityToggle('testimonials')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
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
                      onChange={e => {
                        const rating = parseInt(e.target.value);
                        updateTestimonial(
                          testimonial.id,
                          'rating',
                          isNaN(rating) ? 5 : Math.max(1, Math.min(5, rating))
                        );
                      }}
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
            <SectionHeader>
              <SectionTitle>
                <FaDollarSign />
                Packages & Pricing
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['packages-pricing'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['packages-pricing']}
                    onChange={() => handleSectionVisibilityToggle('packages-pricing')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>
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
                        updatePackage(
                          pkg.id,
                          'features',
                          e.target.value.split('\n').filter(f => f.trim())
                        )
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

      case 'section-order':
        return (
          <ContentSection>
            <SectionTitle>
              <FaList />
              Section Order
            </SectionTitle>
            <p
              style={{
                color: theme.colors.gray600,
                marginBottom: theme.spacing.lg,
              }}
            >
              Drag and drop to reorder sections as they appear on your vendor
              page. Custom sections are automatically included.
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.sm,
              }}
            >
              {(() => {
                // Use complete section order that includes both default and custom sections
                let allSections = [...completeSectionOrder];

                // If completeSectionOrder is empty (on initial load), build it
                if (allSections.length === 0) {
                  allSections = [...sectionOrder];
                  customSections.forEach(customSection => {
                    const customId = `custom-${customSection.id}`;
                    if (!allSections.includes(customId)) {
                      allSections.push(customId);
                    }
                  });
                }

                return allSections.map((sectionId, index) => {
                  let section,
                    isCustom = false;

                  if (sectionId.startsWith('custom-')) {
                    // This is a custom section
                    const customId = sectionId.replace('custom-', '');
                    const customSection = customSections.find(
                      cs => cs.id === customId
                    );
                    if (customSection) {
                      section = {
                        id: sectionId,
                        label: customSection.title,
                        icon: FaPlus,
                      };
                      isCustom = true;
                    }
                  } else {
                    // This is a default section
                    section = navigationItems.find(
                      item => item.id === sectionId
                    );
                  }

                  if (!section) return null;

                  return (
                    <div
                      key={sectionId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.md,
                        padding: theme.spacing.md,
                        border: `1px solid ${isCustom ? theme.colors.primary : theme.colors.gray200}`,
                        borderRadius: theme.borderRadius.md,
                        background: isCustom
                          ? theme.colors.primary + '10'
                          : theme.colors.white,
                      }}
                    >
                      <FaGripHorizontal
                        style={{ color: theme.colors.gray400, cursor: 'grab' }}
                      />
                      <section.icon style={{ color: theme.colors.primary }} />
                      <span style={{ flex: 1, fontWeight: 600 }}>
                        {section.label}
                        {isCustom && (
                          <span
                            style={{
                              fontSize: '0.8rem',
                              color: theme.colors.primary,
                              marginLeft: '8px',
                            }}
                          >
                            (Custom)
                          </span>
                        )}
                        {/* Visibility indicator */}
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: (() => {
                              if (isCustom) {
                                const customId = sectionId.replace(
                                  'custom-',
                                  ''
                                );
                                return customSectionVisibility[customId]
                                  ? theme.colors.success
                                  : theme.colors.gray400;
                              }
                              return sectionVisibility[sectionId]
                                ? theme.colors.success
                                : theme.colors.gray400;
                            })(),
                            marginLeft: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {(() => {
                            if (isCustom) {
                              const customId = sectionId.replace('custom-', '');
                              return customSectionVisibility[customId] ? (
                                <FaEye />
                              ) : (
                                <FaEyeSlash />
                              );
                            }
                            return sectionVisibility[sectionId] ? (
                              <FaEye />
                            ) : (
                              <FaEyeSlash />
                            );
                          })()}
                        </span>
                      </span>
                      <ActionButton
                        onClick={() => {
                          if (index > 0) {
                            const newOrder = [...allSections];
                            [newOrder[index], newOrder[index - 1]] = [
                              newOrder[index - 1],
                              newOrder[index],
                            ];
                            // Update the complete section order
                            setCompleteSectionOrder(newOrder);
                            // Update the default sections order (excluding custom ones)
                            const defaultSections = newOrder.filter(
                              id => !id.startsWith('custom-')
                            );
                            setSectionOrder(defaultSections);
                            trackSectionChange('section-order');
                          }
                        }}
                        disabled={index === 0}
                      >
                        ↑
                      </ActionButton>
                      <ActionButton
                        onClick={() => {
                          if (index < allSections.length - 1) {
                            const newOrder = [...allSections];
                            [newOrder[index], newOrder[index + 1]] = [
                              newOrder[index + 1],
                              newOrder[index],
                            ];
                            // Update the complete section order
                            setCompleteSectionOrder(newOrder);
                            // Update the default sections order (excluding custom ones)
                            const defaultSections = newOrder.filter(
                              id => !id.startsWith('custom-')
                            );
                            setSectionOrder(defaultSections);
                            trackSectionChange('section-order');
                          }
                        }}
                        disabled={index === allSections.length - 1}
                      >
                        ↓
                      </ActionButton>
                      {isCustom && (
                        <ActionButton
                          variant="danger"
                          onClick={() => {
                            const customId = sectionId.replace('custom-', '');
                            const updatedSections = customSections.filter(
                              cs => cs.id !== customId
                            );
                            setCustomSections(updatedSections);
                            // Remove from complete section order
                            const updatedCompleteOrder =
                              completeSectionOrder.filter(
                                id => id !== sectionId
                              );
                            setCompleteSectionOrder(updatedCompleteOrder);
                            trackSectionChange('section-order');
                          }}
                        >
                          <FaTrash />
                        </ActionButton>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
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
              Create custom sections for your vendor page with different content
              types like text, galleries, or cards.
            </p>

            {/* Existing Custom Sections */}
            {customSections.map(section => (
              <div
                key={section.id}
                style={{
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.lg,
                  backgroundColor: theme.colors.gray50,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <h3 style={{ margin: 0, color: theme.colors.primary }}>
                    {section.title}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      gap: theme.spacing.sm,
                      alignItems: 'center',
                    }}
                  >
                    <VisibilityToggleContainer>
                      <span>
                        {customSectionVisibility[section.id]
                          ? 'Visible'
                          : 'Hidden'}
                      </span>
                      <ToggleSwitch>
                        <input
                          type="checkbox"
                          checked={customSectionVisibility[section.id] || false}
                          onChange={() =>
                            handleSectionVisibilityToggle(`custom-${section.id}`)
                          }
                        />
                        <span></span>
                      </ToggleSwitch>
                    </VisibilityToggleContainer>
                    <ActionButton
                      onClick={() => openCustomSectionModal(section)}
                    >
                      <FaEdit />
                      Edit
                    </ActionButton>
                    <ActionButton
                      variant="danger"
                      onClick={() => {
                        const updatedSections = customSections.filter(
                          s => s.id !== section.id
                        );
                        setCustomSections(updatedSections);
                        // Remove from visibility state
                        setCustomSectionVisibility(prev => {
                          const newVisibility = { ...prev };
                          delete newVisibility[section.id];
                          return newVisibility;
                        });
                        trackSectionChange('custom-sections');
                      }}
                    >
                      <FaTrash />
                      Delete
                    </ActionButton>
                  </div>
                </div>
                <p style={{ color: theme.colors.gray600, margin: 0 }}>
                  {section.subtitle}
                </p>
                <p
                  style={{
                    color: theme.colors.gray500,
                    fontSize: '0.9rem',
                    margin: '8px 0 0 0',
                  }}
                >
                  Type:{' '}
                  {section.type === 'text'
                    ? 'Text Content'
                    : section.type === 'gallery'
                      ? 'Image Gallery'
                      : 'Card Layout'}
                </p>
              </div>
            ))}

            {/* Add New Custom Section Button */}
            <ActionButton onClick={() => openCustomSectionModal()}>
              <FaPlus />
              Add Custom Section
            </ActionButton>
          </ContentSection>
        );

      case 'settings':
        return (
          <ContentSection>
            <SectionTitle>
              <FaCog />
              Settings
            </SectionTitle>

            {/* Basic Details */}
            <div style={{ marginBottom: theme.spacing.xxl }}>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: theme.spacing.lg,
                  color: theme.colors.gray900,
                }}
              >
                Basic Details
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Business Name</FormLabel>
                  <FormInput
                    value={heroData.name}
                    onChange={e => {
                      setHeroData(prev => ({ ...prev, name: e.target.value }));
                      trackSectionChange('settings');
                    }}
                    placeholder="Enter business name"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email Address</FormLabel>
                  <FormInput
                    type="email"
                    value={vendor?.email || ''}
                    onChange={e => trackSectionChange('settings')}
                    placeholder="business@example.com"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone Number</FormLabel>
                  <FormInput
                    type="tel"
                    value={vendor?.phone || ''}
                    onChange={e => trackSectionChange('settings')}
                    placeholder="+1 (555) 123-4567"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Website URL</FormLabel>
                  <FormInput
                    type="url"
                    value={vendor?.website || ''}
                    onChange={e => trackSectionChange('settings')}
                    placeholder="https://example.com"
                  />
                </FormGroup>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <FormLabel>Business Address</FormLabel>
                  <FormTextarea
                    value={vendor?.address || ''}
                    onChange={e => trackSectionChange('settings')}
                    placeholder="Enter your complete business address..."
                    rows={3}
                  />
                </FormGroup>
              </FormGrid>
            </div>

            {/* Password Update */}
            <div style={{ marginBottom: theme.spacing.xxl }}>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: theme.spacing.lg,
                  color: theme.colors.gray900,
                }}
              >
                Update Password
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Current Password</FormLabel>
                  <FormInput
                    type="password"
                    placeholder="Enter current password"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>New Password</FormLabel>
                  <FormInput type="password" placeholder="Enter new password" />
                </FormGroup>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormInput
                    type="password"
                    placeholder="Confirm new password"
                  />
                </FormGroup>
              </FormGrid>
              <div style={{ marginTop: theme.spacing.lg }}>
                <ActionButton
                  onClick={() =>
                    alert(
                      'Password update functionality will be implemented with backend integration'
                    )
                  }
                >
                  <FaLock />
                  Update Password
                </ActionButton>
              </div>
            </div>

            {/* Account Actions */}
            <div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: theme.spacing.lg,
                  color: theme.colors.gray900,
                }}
              >
                Account Actions
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.md,
                  maxWidth: '300px',
                }}
              >
                <ActionButton
                  onClick={() => {
                    if (window.confirm('Are you sure you want to logout?')) {
                      // Handle logout
                      alert(
                        'Logout functionality will be implemented with auth integration'
                      );
                    }
                  }}
                >
                  <FaArrowLeft />
                  Logout
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={() => setShowDeleteAccountModal(true)}
                >
                  <FaTrash />
                  Delete Account
                </ActionButton>
              </div>
            </div>
          </ContentSection>
        );

      case 'footer':
        return (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <FaAddressCard />
                Footer
              </SectionTitle>
              <VisibilityToggleContainer>
                <span>
                  {sectionVisibility['footer'] ? 'Visible' : 'Hidden'}
                </span>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    checked={sectionVisibility['footer']}
                    onChange={() => handleSectionVisibilityToggle('footer')}
                  />
                  <span></span>
                </ToggleSwitch>
              </VisibilityToggleContainer>
            </SectionHeader>

            {/* Basic Footer Information */}
            <div style={{ marginBottom: theme.spacing.xxl }}>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: theme.spacing.lg,
                  color: theme.colors.gray900,
                }}
              >
                Basic Information
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Company Name</FormLabel>
                  <FormInput
                    value={footerData.companyName}
                    onChange={e => {
                      handleFooterChange({
                        ...footerData,
                        companyName: e.target.value,
                      });
                    }}
                    placeholder="Your Company Name"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Copyright Text</FormLabel>
                  <FormInput
                    value={footerData.copyrightText}
                    onChange={e => {
                      handleFooterChange({
                        ...footerData,
                        copyrightText: e.target.value,
                      });
                    }}
                    placeholder="© 2024 Your Company. All rights reserved."
                  />
                </FormGroup>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <FormLabel>Footer Description</FormLabel>
                  <FormTextarea
                    value={footerData.description}
                    onChange={e => {
                      handleFooterChange({
                        ...footerData,
                        description: e.target.value,
                      });
                    }}
                    placeholder="Brief description about your business for the footer..."
                    rows={3}
                  />
                </FormGroup>
              </FormGrid>
            </div>

            {/* Footer Styling */}
            <div style={{ marginBottom: theme.spacing.xxl }}>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: theme.spacing.lg,
                  color: theme.colors.gray900,
                }}
              >
                Footer Styling
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Background Color</FormLabel>
                  <FormInput
                    type="color"
                    value={footerData.backgroundColor}
                    onChange={e => {
                      setFooterData(prev => ({
                        ...prev,
                        backgroundColor: e.target.value,
                      }));
                      trackSectionChange('footer');
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Text Color</FormLabel>
                  <FormInput
                    type="color"
                    value={footerData.textColor}
                    onChange={e => {
                      setFooterData(prev => ({
                        ...prev,
                        textColor: e.target.value,
                      }));
                      trackSectionChange('footer');
                    }}
                  />
                </FormGroup>
              </FormGrid>
            </div>

            {/* Social Media Links */}
            <div style={{ marginBottom: theme.spacing.xxl }}>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: theme.spacing.lg,
                  color: theme.colors.gray900,
                }}
              >
                Social Media Links
              </h3>
              <FormGrid>
                <FormGroup>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormInput
                    value={footerData.socialLinks.instagram}
                    onChange={e => {
                      setFooterData(prev => ({
                        ...prev,
                        socialLinks: {
                          ...prev.socialLinks,
                          instagram: e.target.value,
                        },
                      }));
                      trackSectionChange('footer');
                    }}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormInput
                    value={footerData.socialLinks.facebook}
                    onChange={e => {
                      setFooterData(prev => ({
                        ...prev,
                        socialLinks: {
                          ...prev.socialLinks,
                          facebook: e.target.value,
                        },
                      }));
                      trackSectionChange('footer');
                    }}
                    placeholder="https://facebook.com/yourpage"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Pinterest URL</FormLabel>
                  <FormInput
                    value={footerData.socialLinks.pinterest}
                    onChange={e => {
                      setFooterData(prev => ({
                        ...prev,
                        socialLinks: {
                          ...prev.socialLinks,
                          pinterest: e.target.value,
                        },
                      }));
                      trackSectionChange('footer');
                    }}
                    placeholder="https://pinterest.com/yourhandle"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Twitter URL</FormLabel>
                  <FormInput
                    value={footerData.socialLinks.twitter}
                    onChange={e => {
                      setFooterData(prev => ({
                        ...prev,
                        socialLinks: {
                          ...prev.socialLinks,
                          twitter: e.target.value,
                        },
                      }));
                      trackSectionChange('footer');
                    }}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormInput
                    value={footerData.socialLinks.linkedin}
                    onChange={e => {
                      setFooterData(prev => ({
                        ...prev,
                        socialLinks: {
                          ...prev.socialLinks,
                          linkedin: e.target.value,
                        },
                      }));
                      trackSectionChange('footer');
                    }}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </FormGroup>
              </FormGrid>
            </div>

            {/* Footer Columns */}
            <div style={{ marginBottom: theme.spacing.xxl }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: theme.spacing.lg,
                }}
              >
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: theme.colors.gray900,
                    margin: 0,
                  }}
                >
                  Footer Columns
                </h3>
                <ActionButton
                  onClick={() => {
                    setFooterData(prev => ({
                      ...prev,
                      columns: [
                        ...prev.columns,
                        {
                          title: 'New Column',
                          type: 'links',
                          content: [{ text: 'Link 1', url: '#' }],
                        },
                      ],
                    }));
                    trackSectionChange('footer');
                  }}
                >
                  <FaPlus />
                  Add Column
                </ActionButton>
              </div>

              {footerData.columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  style={{
                    background: theme.colors.gray50,
                    padding: theme.spacing.lg,
                    borderRadius: theme.borderRadius.md,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: theme.colors.gray900,
                      }}
                    >
                      Column {columnIndex + 1}
                    </h4>
                    <ActionButton
                      variant="danger"
                      onClick={() => {
                        setFooterData(prev => ({
                          ...prev,
                          columns: prev.columns.filter(
                            (_, i) => i !== columnIndex
                          ),
                        }));
                        trackSectionChange('footer');
                      }}
                    >
                      <FaTrash />
                    </ActionButton>
                  </div>

                  <FormGrid>
                    <FormGroup>
                      <FormLabel>Column Title</FormLabel>
                      <FormInput
                        value={column.title}
                        onChange={e => {
                          setFooterData(prev => ({
                            ...prev,
                            columns: prev.columns.map((col, i) =>
                              i === columnIndex
                                ? { ...col, title: e.target.value }
                                : col
                            ),
                          }));
                          trackSectionChange('footer');
                        }}
                        placeholder="Column Title"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Column Type</FormLabel>
                      <select
                        value={column.type}
                        onChange={e => {
                          const newType = e.target.value;
                          let newContent;
                          if (newType === 'links') {
                            newContent = [{ text: 'Link 1', url: '#' }];
                          } else if (newType === 'contact') {
                            newContent = {
                              showPhone: true,
                              showEmail: true,
                              showAddress: true,
                              showHours: false,
                            };
                          } else {
                            newContent = 'Text content';
                          }

                          setFooterData(prev => ({
                            ...prev,
                            columns: prev.columns.map((col, i) =>
                              i === columnIndex
                                ? { ...col, type: newType, content: newContent }
                                : col
                            ),
                          }));
                          trackSectionChange('footer');
                        }}
                        style={{
                          padding: theme.spacing.md,
                          border: `2px solid ${theme.colors.gray200}`,
                          borderRadius: theme.borderRadius.md,
                          fontSize: '1rem',
                        }}
                      >
                        <option value="links">Links</option>
                        <option value="contact">Contact Info</option>
                        <option value="text">Text</option>
                      </select>
                    </FormGroup>
                  </FormGrid>

                  {/* Column Content Based on Type */}
                  <div style={{ marginTop: theme.spacing.md }}>
                    {column.type === 'links' &&
                      Array.isArray(column.content) && (
                        <div>
                          <FormLabel>Links</FormLabel>
                          {column.content.map((link, linkIndex) => (
                            <div
                              key={linkIndex}
                              style={{
                                display: 'flex',
                                gap: theme.spacing.sm,
                                marginBottom: theme.spacing.sm,
                                alignItems: 'center',
                              }}
                            >
                              <FormInput
                                value={link.text}
                                onChange={e => {
                                  setFooterData(prev => ({
                                    ...prev,
                                    columns: prev.columns.map((col, i) =>
                                      i === columnIndex
                                        ? {
                                            ...col,
                                            content: col.content.map((l, j) =>
                                              j === linkIndex
                                                ? { ...l, text: e.target.value }
                                                : l
                                            ),
                                          }
                                        : col
                                    ),
                                  }));
                                  trackSectionChange('footer');
                                }}
                                placeholder="Link Text"
                                style={{ flex: 1 }}
                              />
                              <FormInput
                                value={link.url}
                                onChange={e => {
                                  setFooterData(prev => ({
                                    ...prev,
                                    columns: prev.columns.map((col, i) =>
                                      i === columnIndex
                                        ? {
                                            ...col,
                                            content: col.content.map((l, j) =>
                                              j === linkIndex
                                                ? { ...l, url: e.target.value }
                                                : l
                                            ),
                                          }
                                        : col
                                    ),
                                  }));
                                  trackSectionChange('footer');
                                }}
                                placeholder="Link URL"
                                style={{ flex: 1 }}
                              />
                              <ActionButton
                                variant="danger"
                                onClick={() => {
                                  setFooterData(prev => ({
                                    ...prev,
                                    columns: prev.columns.map((col, i) =>
                                      i === columnIndex
                                        ? {
                                            ...col,
                                            content: col.content.filter(
                                              (_, j) => j !== linkIndex
                                            ),
                                          }
                                        : col
                                    ),
                                  }));
                                  trackSectionChange('footer');
                                }}
                              >
                                <FaTrash />
                              </ActionButton>
                            </div>
                          ))}
                          <ActionButton
                            onClick={() => {
                              setFooterData(prev => ({
                                ...prev,
                                columns: prev.columns.map((col, i) =>
                                  i === columnIndex
                                    ? {
                                        ...col,
                                        content: [
                                          ...col.content,
                                          { text: 'New Link', url: '#' },
                                        ],
                                      }
                                    : col
                                ),
                              }));
                              trackSectionChange('footer');
                            }}
                          >
                            <FaPlus />
                            Add Link
                          </ActionButton>
                        </div>
                      )}

                    {column.type === 'contact' &&
                      typeof column.content === 'object' &&
                      !Array.isArray(column.content) && (
                        <div>
                          <FormLabel>Contact Information to Show</FormLabel>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: theme.spacing.sm,
                            }}
                          >
                            {Object.entries(column.content).map(
                              ([key, value]) => (
                                <label
                                  key={key}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: theme.spacing.sm,
                                    cursor: 'pointer',
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={e => {
                                      setFooterData(prev => ({
                                        ...prev,
                                        columns: prev.columns.map((col, i) =>
                                          i === columnIndex
                                            ? {
                                                ...col,
                                                content: {
                                                  ...col.content,
                                                  [key]: e.target.checked,
                                                },
                                              }
                                            : col
                                        ),
                                      }));
                                      trackSectionChange('footer');
                                    }}
                                  />
                                  <span style={{ textTransform: 'capitalize' }}>
                                    {key
                                      .replace(/([A-Z])/g, ' $1')
                                      .replace(/^./, str => str.toUpperCase())}
                                  </span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {column.type === 'text' && (
                      <div>
                        <FormLabel>Text Content</FormLabel>
                        <FormTextarea
                          value={
                            typeof column.content === 'string'
                              ? column.content
                              : ''
                          }
                          onChange={e => {
                            setFooterData(prev => ({
                              ...prev,
                              columns: prev.columns.map((col, i) =>
                                i === columnIndex
                                  ? { ...col, content: e.target.value }
                                  : col
                              ),
                            }));
                            trackSectionChange('footer');
                          }}
                          placeholder="Enter text content for this column..."
                          rows={4}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
            <NavSectionTitle>Changes</NavSectionTitle>
            {changedSections.size > 0 && (
              <div
                style={{
                  padding: `0 ${theme.spacing.lg}`,
                  marginBottom: theme.spacing.md,
                }}
              >
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: theme.colors.gray600,
                    margin: '0 0 8px 0',
                  }}
                >
                  Modified sections:
                </p>
                {Array.from(changedSections).map(sectionId => {
                  const section = navigationItems.find(
                    item => item.id === sectionId
                  );
                  return (
                    <div
                      key={sectionId}
                      style={{
                        fontSize: '0.8rem',
                        color: theme.colors.warning,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '4px',
                      }}
                    >
                      <FaEdit size={10} />
                      {section?.label || sectionId}
                    </div>
                  );
                })}
              </div>
            )}
          </NavSection>

          <NavSection>
            <NavSectionTitle>Actions</NavSectionTitle>
            <SidebarFooter>
              <SaveActionsContainer>
                {changedSections.size > 0 && !saved && (
                  <ChangesIndicator>
                    <FaEdit />
                    {changedSections.size} section
                    {changedSections.size > 1 ? 's' : ''} modified
                  </ChangesIndicator>
                )}
                {saved && (
                  <ChangesIndicator style={{ color: theme.colors.success }}>
                    <FaCheckCircle />
                    Changes saved - Ready to publish
                  </ChangesIndicator>
                )}
                <SaveButton variant="secondary" onClick={handleDiscardChanges}>
                  <FaUndo />
                  Discard
                </SaveButton>
                <SaveButton
                  onClick={handleSaveChanges}
                  disabled={changedSections.size === 0 || saved}
                  saved={saved}
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

      {/* Custom Section Modal */}
      {showCustomSectionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: theme.spacing.lg,
          }}
        >
          <div
            style={{
              background: theme.colors.white,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.xl,
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: theme.spacing.lg,
              }}
            >
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
                {editingCustomSection
                  ? 'Edit Custom Section'
                  : 'Add Custom Section'}
              </h2>
              <button
                onClick={() => setShowCustomSectionModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                <FaTimes />
              </button>
            </div>

            <FormGroup style={{ marginBottom: theme.spacing.md }}>
              <FormLabel>Section Title</FormLabel>
              <FormInput
                value={customSectionForm.title}
                onChange={e =>
                  setCustomSectionForm(prev => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Enter section title"
              />
            </FormGroup>

            <FormGroup style={{ marginBottom: theme.spacing.md }}>
              <FormLabel>Section Subtitle (Optional)</FormLabel>
              <FormInput
                value={customSectionForm.subtitle}
                onChange={e =>
                  setCustomSectionForm(prev => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
                placeholder="Enter section subtitle"
              />
            </FormGroup>

            <FormGroup style={{ marginBottom: theme.spacing.md }}>
              <FormLabel>Content Type</FormLabel>
              <select
                value={customSectionForm.type}
                onChange={e =>
                  setCustomSectionForm(prev => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                style={{
                  padding: theme.spacing.md,
                  border: `2px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.md,
                  fontSize: '1rem',
                  width: '100%',
                }}
              >
                <option value="text">Text Content</option>
                <option value="gallery">Image Gallery</option>
                <option value="cards">Card Layout</option>
              </select>
            </FormGroup>

            <FormGroup style={{ marginBottom: theme.spacing.md }}>
              <VisibilityToggleContainer>
                <FormLabel>Section Visibility</FormLabel>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                  }}
                >
                  <span>
                    {customSectionForm.visible ? 'Visible' : 'Hidden'}
                  </span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={customSectionForm.visible || true}
                      onChange={e =>
                        setCustomSectionForm(prev => ({
                          ...prev,
                          visible: e.target.checked,
                        }))
                      }
                    />
                    <span></span>
                  </ToggleSwitch>
                </div>
              </VisibilityToggleContainer>
            </FormGroup>

            {/* Content Input Fields Based on Type */}
            {customSectionForm.type === 'text' && (
              <FormGroup style={{ marginBottom: theme.spacing.md }}>
                <FormLabel>Content</FormLabel>
                <FormTextarea
                  value={customSectionForm.content}
                  onChange={e =>
                    setCustomSectionForm(prev => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Enter your content here..."
                  rows={6}
                />
              </FormGroup>
            )}

            {customSectionForm.type === 'gallery' && (
              <FormGroup style={{ marginBottom: theme.spacing.md }}>
                <FormLabel>Gallery Images</FormLabel>
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
                            addCustomSectionImage(event.target.result);
                          };
                          reader.readAsDataURL(file);
                        });
                      }}
                    />
                    <FaUpload size={24} color={theme.colors.gray400} />
                    <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                      Upload Images
                    </span>
                  </FileUploadBox>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Or paste image URLs (one per line)</FormLabel>
                    <FormTextarea
                      placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg"
                      rows={3}
                      onBlur={e => {
                        const urls = e.target.value
                          .split('\n')
                          .filter(url => url.trim());
                        if (urls.length > 0) {
                          urls.forEach(url => addCustomSectionImage(url));
                          e.target.value = '';
                        }
                      }}
                    />
                  </FormGroup>
                </FileUploadContainer>

                {/* Gallery Preview */}
                {customSectionForm.images &&
                  customSectionForm.images.length > 0 && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: theme.spacing.sm,
                        marginTop: theme.spacing.md,
                      }}
                    >
                      {customSectionForm.images.map((image, index) => (
                        <ImagePreview
                          key={index}
                          style={{ width: '120px', height: '80px' }}
                        >
                          <img src={image} alt={`Gallery ${index}`} />
                          <ImageOverlay>
                            <RemoveImageButton
                              onClick={() => removeCustomSectionImage(index)}
                            >
                              <FaTrash />
                            </RemoveImageButton>
                          </ImageOverlay>
                        </ImagePreview>
                      ))}
                    </div>
                  )}
              </FormGroup>
            )}

            {customSectionForm.type === 'cards' && (
              <FormGroup style={{ marginBottom: theme.spacing.md }}>
                <FormLabel>Cards Content</FormLabel>

                {/* Existing Cards */}
                {customSectionForm.cards.map((card, index) => (
                  <div
                    key={index}
                    style={{
                      border: `1px solid ${theme.colors.gray200}`,
                      borderRadius: theme.borderRadius.md,
                      padding: theme.spacing.md,
                      marginBottom: theme.spacing.md,
                      backgroundColor: theme.colors.gray50,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      <h4
                        style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}
                      >
                        Card {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeCustomSectionCard(index)}
                        style={{
                          background: theme.colors.error,
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                        }}
                      >
                        ×
                      </button>
                    </div>

                    <FormGrid style={{ gap: theme.spacing.sm }}>
                      <FormGroup>
                        <FormLabel>Title</FormLabel>
                        <FormInput
                          value={card.title}
                          onChange={e =>
                            updateCustomSectionCard(
                              index,
                              'title',
                              e.target.value
                            )
                          }
                          placeholder="Card title"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Icon (Emoji)</FormLabel>
                        <FormInput
                          value={card.icon}
                          onChange={e =>
                            updateCustomSectionCard(
                              index,
                              'icon',
                              e.target.value
                            )
                          }
                          placeholder="💼"
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Description</FormLabel>
                        <FormTextarea
                          value={card.description}
                          onChange={e =>
                            updateCustomSectionCard(
                              index,
                              'description',
                              e.target.value
                            )
                          }
                          placeholder="Card description..."
                          rows={3}
                        />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <FormLabel>Card Image (Optional)</FormLabel>
                        <FileUploadContainer>
                          {card.image && (
                            <ImagePreview
                              style={{ width: '120px', height: '80px' }}
                            >
                              <img src={card.image} alt={`Card ${index + 1}`} />
                              <ImageOverlay>
                                <RemoveImageButton
                                  onClick={() =>
                                    updateCustomSectionCard(index, 'image', '')
                                  }
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
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = event => {
                                    updateCustomSectionCard(
                                      index,
                                      'image',
                                      event.target.result
                                    );
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <FaUpload size={20} color={theme.colors.gray400} />
                            <span
                              style={{
                                fontSize: '0.7rem',
                                textAlign: 'center',
                              }}
                            >
                              Upload
                            </span>
                          </FileUploadBox>
                          <FormGroup style={{ flex: 1 }}>
                            <FormLabel>Or paste image URL</FormLabel>
                            <FormInput
                              value={card.image}
                              onChange={e =>
                                updateCustomSectionCard(
                                  index,
                                  'image',
                                  e.target.value
                                )
                              }
                              placeholder="https://example.com/image.jpg"
                            />
                          </FormGroup>
                        </FileUploadContainer>
                      </FormGroup>
                    </FormGrid>
                  </div>
                ))}

                {/* Add New Card Button */}
                <button
                  type="button"
                  onClick={addCustomSectionCard}
                  style={{
                    background: theme.colors.primary,
                    color: 'white',
                    border: 'none',
                    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                    borderRadius: theme.borderRadius.md,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.xs,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  <FaPlus /> Add Card
                </button>
              </FormGroup>
            )}

            <div
              style={{
                display: 'flex',
                gap: theme.spacing.md,
                justifyContent: 'flex-end',
                marginTop: theme.spacing.xl,
              }}
            >
              <button
                onClick={() => setShowCustomSectionModal(false)}
                style={{
                  background: theme.colors.gray300,
                  color: theme.colors.gray700,
                  border: 'none',
                  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveCustomSection}
                style={{
                  background: theme.colors.primary,
                  color: 'white',
                  border: 'none',
                  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                }}
              >
                {editingCustomSection ? 'Update Section' : 'Add Section'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: theme.spacing.lg,
          }}
        >
          <div
            style={{
              background: theme.colors.white,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.xl,
              maxWidth: '500px',
              width: '100%',
              textAlign: 'center',
              border: `3px solid ${theme.colors.error}`,
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                color: theme.colors.error,
                marginBottom: theme.spacing.lg,
              }}
            >
              ⚠️
            </div>
            <h2
              style={{
                margin: `0 0 ${theme.spacing.md} 0`,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: theme.colors.error,
              }}
            >
              Delete Account
            </h2>
            <p
              style={{
                marginBottom: theme.spacing.lg,
                color: theme.colors.gray700,
                lineHeight: 1.6,
              }}
            >
              <strong>Warning:</strong> This action cannot be undone. Deleting
              your account will permanently remove:
            </p>
            <ul
              style={{
                textAlign: 'left',
                marginBottom: theme.spacing.xl,
                color: theme.colors.gray600,
              }}
            >
              <li>Your vendor profile and all content</li>
              <li>All portfolio images and work history</li>
              <li>Customer reviews and testimonials</li>
              <li>All account data and settings</li>
            </ul>
            <p
              style={{
                marginBottom: theme.spacing.xl,
                fontWeight: 600,
                color: theme.colors.error,
              }}
            >
              This action cannot be recovered. Are you absolutely sure?
            </p>
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.md,
                justifyContent: 'center',
              }}
            >
              <button
                onClick={() => setShowDeleteAccountModal(false)}
                style={{
                  background: theme.colors.gray300,
                  color: theme.colors.gray700,
                  border: 'none',
                  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(
                    'Delete account functionality will be implemented with backend integration'
                  );
                  setShowDeleteAccountModal(false);
                }}
                style={{
                  background: theme.colors.error,
                  color: 'white',
                  border: 'none',
                  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default VendorDashboard;
