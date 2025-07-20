import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  FaBars
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { getVendorById } from "../data/vendors";
import { useAuth } from "../../context/AuthContext";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
  display: flex;
`;

const Sidebar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "mobileOpen",
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
    transform: translateX(${(props) => (props.mobileOpen ? "0" : "-100%")});
    transition: transform 0.3s ease;
    overflow-y: auto;
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
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${props => props.active ? theme.colors.primary : theme.colors.gray700};
  background: ${props => props.active ? theme.colors.primary + '10' : 'transparent'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  border-left: 3px solid ${props => props.active ? theme.colors.primary : 'transparent'};

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
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);
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
    padding-top: 4rem; /* Account for mobile menu button */
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
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  background: ${props => 
    props.variant === 'primary' ? theme.colors.primary :
    props.variant === 'success' ? theme.colors.green500 :
    props.variant === 'danger' ? theme.colors.error :
    theme.colors.white
  };
  color: ${props => 
    props.variant === 'primary' || props.variant === 'success' || props.variant === 'danger'
      ? 'white' : theme.colors.gray700
  };
  border: 2px solid ${props => 
    props.variant === 'primary' ? theme.colors.primary :
    props.variant === 'success' ? theme.colors.green500 :
    props.variant === 'danger' ? theme.colors.error :
    theme.colors.gray200
  };
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
`;

const ContentSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xl};
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

const ImageUploadArea = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${theme.colors.gray50};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }

  input[type="file"] {
    display: none;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin: ${theme.spacing.sm};
`;

const PreviewImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  border: 2px solid ${theme.colors.gray200};
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${theme.colors.error};
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: ${theme.colors.red700};
  }
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const ServiceContent = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ServiceDescription = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const ServiceActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const PortfolioCard = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background: ${theme.colors.white};
`;

const PortfolioImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PortfolioInfo = styled.div`
  padding: ${theme.spacing.lg};
`;

const PortfolioTitle = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${theme.colors.gray900};
  font-weight: 600;
`;

const PortfolioMeta = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !['status'].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => 
    props.status === 'published' ? theme.colors.green100 :
    props.status === 'draft' ? theme.colors.gray100 :
    theme.colors.yellow100
  };
  color: ${props => 
    props.status === 'published' ? theme.colors.green700 :
    props.status === 'draft' ? theme.colors.gray700 :
    theme.colors.yellow700
  };
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};
`;

const PortfolioFormModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs};
    align-items: flex-start;
    padding-top: ${theme.spacing.sm};
    padding-bottom: ${theme.spacing.sm};
  }
`;

const PortfolioFormContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${theme.spacing.xxl};
  margin: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    max-height: 98vh;
    border-radius: ${theme.borderRadius.md};
    margin: ${theme.spacing.xs};
    width: calc(100% - ${theme.spacing.sm});
  }
`;

const PortfolioFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const PortfolioFormTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.gray900};
  font-size: 1.5rem;
  font-weight: 600;
`;

const GalleryImageCard = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  background: ${theme.colors.white};
  margin-bottom: ${theme.spacing.lg};
`;

const GalleryImagePreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const GalleryImageForm = styled.div`
  padding: ${theme.spacing.lg};
`;

const ServiceHighlightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ServiceHighlightItem = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const SmallButton = styled.button`
  background: ${theme.colors.gray100};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray200};
  }

  &.danger {
    background: ${theme.colors.red100};
    border-color: ${theme.colors.red200};
    color: ${theme.colors.red700};

    &:hover {
      background: ${theme.colors.red200};
    }
  }

  &.success {
    background: ${theme.colors.green100};
    border-color: ${theme.colors.green200};
    color: ${theme.colors.green700};

    &:hover {
      background: ${theme.colors.green200};
    }
  }
`;

const VendorDashboard = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get vendor ID from URL path
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const vendorId = vendorSlug || pathSegments[0];
  
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form states for different sections
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    tagline: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: ''
  });
  
  const [mediaFiles, setMediaFiles] = useState({
    logo: '',
    banner: '',
    gallery: []
  });

  const [services, setServices] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
  const [portfolioForm, setPortfolioForm] = useState({
    id: '',
    location: '',
    city: '',
    state: '',
    weddingDate: '',
    coupleNames: '',
    description: '',
    coverImage: '',
    gallery: [],
    services: [],
    highlights: [],
    editing: false
  });
    const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const vendorData = getVendorById(vendorId);
    if (vendorData) {
      setVendor(vendorData);
      setBasicInfo({
        name: vendorData.name,
        tagline: vendorData.tagline || '',
        description: vendorData.description,
        phone: vendorData.phone,
        email: vendorData.email,
        website: vendorData.website,
        address: vendorData.address
      });
      setMediaFiles({
        logo: vendorData.logo,
        banner: vendorData.image,
        gallery: vendorData.portfolioImages || []
      });
                  setServices((vendorData.services || []).map((service, index) => ({
        ...service,
        id: service.id || `service-${index}-${Date.now()}`,
        image: service.image || '',
        icon: service.icon || '⭐'
      })));
                  setPortfolio((vendorData.locationPortfolio || []).map((item, index) => ({
        ...item,
        id: item.id || `portfolio-${index}-${Date.now()}`,
        gallery: (item.gallery || []).map((img, imgIndex) =>
          typeof img === 'string'
            ? { id: `img-${imgIndex}-${Date.now()}`, src: img, title: '', description: '' }
            : { ...img, id: img.id || `img-${imgIndex}-${Date.now()}` }
        )
      })));
      setPackages(vendorData.packages || []);
      setTestimonials(vendorData.testimonials || []);
      setFaq(vendorData.faq || []);
    }
    setLoading(false);
  }, [vendorId]);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: FaUser, section: 'General' },
    { id: 'basic-info', label: 'Basic Information', icon: FaAddressCard, section: 'General' },
    { id: 'media', label: 'Photos & Media', icon: FaImages, section: 'Content' },
    { id: 'services', label: 'Services', icon: FaServicestack, section: 'Content' },
    { id: 'portfolio', label: 'Portfolio & Work', icon: FaBriefcase, section: 'Content' },
    { id: 'packages', label: 'Packages & Pricing', icon: FaDollarSign, section: 'Content' },
    { id: 'testimonials', label: 'Testimonials', icon: FaComments, section: 'Content' },
    { id: 'faq', label: 'FAQ', icon: FaQuestionCircle, section: 'Content' },
    { id: 'settings', label: 'Settings', icon: FaCog, section: 'Account' }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setHasChanges(false);
      alert('Changes saved successfully!');
    }, 1000);
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'gallery') {
          setMediaFiles(prev => ({
            ...prev,
            gallery: [...prev.gallery, event.target.result]
          }));
        } else {
          setMediaFiles(prev => ({
            ...prev,
            [type]: event.target.result
          }));
        }
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index) => {
    setMediaFiles(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

    const addService = () => {
    setServices(prev => [...prev, {
      id: Date.now(),
      name: 'New Service',
      description: 'Service description',
      icon: '⭐',
      image: ''
    }]);
    setHasChanges(true);
  };

  const updateService = (id, field, value) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
    setHasChanges(true);
  };

    const removeService = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
    setHasChanges(true);
  };

  // Portfolio management functions
  const addPortfolioItem = () => {
    setPortfolioForm({
      id: '',
      location: '',
      city: '',
      state: '',
      weddingDate: '',
      coupleNames: '',
      description: '',
      coverImage: '',
      gallery: [],
      services: [],
      highlights: [],
      editing: false
    });
    setShowPortfolioForm(true);
  };

  const editPortfolioItem = (item) => {
    setPortfolioForm({ ...item, editing: true });
    setShowPortfolioForm(true);
  };

  const savePortfolioItem = () => {
    if (portfolioForm.editing) {
      setPortfolio(prev => prev.map(item =>
        item.id === portfolioForm.id ? { ...portfolioForm, editing: false } : item
      ));
    } else {
      const newItem = {
        ...portfolioForm,
        id: portfolioForm.id || Date.now().toString(),
        editing: false
      };
      setPortfolio(prev => [...prev, newItem]);
    }
    setHasChanges(true);
    setShowPortfolioForm(false);
  };

  const deletePortfolioItem = (id) => {
    setPortfolio(prev => prev.filter(item => item.id !== id));
    setHasChanges(true);
  };

  const updatePortfolioForm = (field, value) => {
    setPortfolioForm(prev => ({ ...prev, [field]: value }));
  };

  const addPortfolioGalleryImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = {
          id: Date.now() + Math.random(),
          src: event.target.result,
          title: '',
          description: ''
        };
        setPortfolioForm(prev => ({
          ...prev,
          gallery: [...prev.gallery, imageData]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const updatePortfolioGalleryImage = (imageId, field, value) => {
    setPortfolioForm(prev => ({
      ...prev,
      gallery: prev.gallery.map(img =>
        img.id === imageId ? { ...img, [field]: value } : img
      )
    }));
  };

  const removePortfolioGalleryImage = (imageId) => {
    setPortfolioForm(prev => ({
      ...prev,
      gallery: prev.gallery.filter(img => img.id !== imageId)
    }));
  };

  const addPortfolioService = () => {
    setPortfolioForm(prev => ({
      ...prev,
      services: [...prev.services, '']
    }));
  };

  const updatePortfolioService = (index, value) => {
    setPortfolioForm(prev => ({
      ...prev,
      services: prev.services.map((service, i) => i === index ? value : service)
    }));
  };

  const removePortfolioService = (index) => {
    setPortfolioForm(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addPortfolioHighlight = () => {
    setPortfolioForm(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const updatePortfolioHighlight = (index, value) => {
    setPortfolioForm(prev => ({
      ...prev,
      highlights: prev.highlights.map((highlight, i) => i === index ? value : highlight)
    }));
  };

    const removePortfolioHighlight = (index) => {
    setPortfolioForm(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && mobileSidebarOpen) {
        closeMobileSidebar();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [mobileSidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileSidebarOpen]);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <ContentSection>
            <SectionTitle>
              <FaUser />
              Dashboard Overview
            </SectionTitle>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.lg }}>
              {[
                {
                  id: 'profile-views',
                  title: 'Profile Views',
                  value: '1,234',
                  subtitle: 'Last 30 days',
                  bgColor: theme.colors.blue50,
                  titleColor: theme.colors.blue700,
                  valueColor: theme.colors.blue800,
                  subtitleColor: theme.colors.blue600
                },
                {
                  id: 'enquiries',
                  title: 'Enquiries',
                  value: '47',
                  subtitle: 'This month',
                  bgColor: theme.colors.green50,
                  titleColor: theme.colors.green700,
                  valueColor: theme.colors.green800,
                  subtitleColor: theme.colors.green600
                },
                {
                  id: 'portfolio-views',
                  title: 'Portfolio Views',
                  value: '892',
                  subtitle: 'Total',
                  bgColor: theme.colors.purple50,
                  titleColor: theme.colors.purple700,
                  valueColor: theme.colors.purple800,
                  subtitleColor: theme.colors.purple600
                }
              ].map((stat) => (
                <div key={stat.id} style={{ padding: theme.spacing.lg, background: stat.bgColor, borderRadius: theme.borderRadius.md }}>
                  <h3 style={{ margin: '0 0 8px 0', color: stat.titleColor }}>{stat.title}</h3>
                  <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: stat.valueColor }}>{stat.value}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: stat.subtitleColor }}>{stat.subtitle}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        );

      case 'basic-info':
        return (
          <ContentSection>
            <SectionTitle>
              <FaAddressCard />
              Basic Information
            </SectionTitle>
                        <FormGrid>
              <FormGroup key="business-name">
                <FormLabel>Business Name</FormLabel>
                <FormInput
                  value={basicInfo.name}
                  onChange={(e) => {
                    setBasicInfo(prev => ({ ...prev, name: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="Your business name"
                />
              </FormGroup>
              <FormGroup key="tagline">
                <FormLabel>Tagline</FormLabel>
                <FormInput
                  value={basicInfo.tagline}
                  onChange={(e) => {
                    setBasicInfo(prev => ({ ...prev, tagline: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="Your catchy tagline"
                />
              </FormGroup>
              <FormGroup key="description" style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Description</FormLabel>
                <FormTextarea
                  value={basicInfo.description}
                  onChange={(e) => {
                    setBasicInfo(prev => ({ ...prev, description: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="Describe your business and what makes you special"
                />
              </FormGroup>
              <FormGroup key="phone">
                <FormLabel>Phone</FormLabel>
                <FormInput
                  value={basicInfo.phone}
                  onChange={(e) => {
                    setBasicInfo(prev => ({ ...prev, phone: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>
              <FormGroup key="email">
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={basicInfo.email}
                  onChange={(e) => {
                    setBasicInfo(prev => ({ ...prev, email: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="contact@yourbusiness.com"
                />
              </FormGroup>
              <FormGroup key="website">
                <FormLabel>Website</FormLabel>
                <FormInput
                  value={basicInfo.website}
                  onChange={(e) => {
                    setBasicInfo(prev => ({ ...prev, website: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="www.yourbusiness.com"
                />
              </FormGroup>
              <FormGroup key="address">
                <FormLabel>Address</FormLabel>
                <FormInput
                  value={basicInfo.address}
                  onChange={(e) => {
                    setBasicInfo(prev => ({ ...prev, address: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="Your business address"
                />
              </FormGroup>
            </FormGrid>
          </ContentSection>
        );

      case 'media':
        return (
          <ContentSection>
            <SectionTitle>
              <FaImages />
              Photos & Media
            </SectionTitle>
            
            <div style={{ marginBottom: theme.spacing.xxl }}>
              <h3 style={{ marginBottom: theme.spacing.lg }}>Logo</h3>
              <div style={{ display: 'flex', gap: theme.spacing.lg, alignItems: 'center' }}>
                {mediaFiles.logo && (
                  <PreviewImage src={mediaFiles.logo} alt="Logo" />
                )}
                <ImageUploadArea>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload">
                    <FaUpload style={{ fontSize: '2rem', marginBottom: theme.spacing.sm, color: theme.colors.gray400 }} />
                    <p style={{ margin: 0, color: theme.colors.gray600 }}>Click to upload logo</p>
                  </label>
                </ImageUploadArea>
              </div>
            </div>

            <div style={{ marginBottom: theme.spacing.xxl }}>
              <h3 style={{ marginBottom: theme.spacing.lg }}>Hero Banner</h3>
              <div style={{ display: 'flex', gap: theme.spacing.lg, alignItems: 'center' }}>
                {mediaFiles.banner && (
                  <img src={mediaFiles.banner} alt="Banner" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: theme.borderRadius.md }} />
                )}
                <ImageUploadArea>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    id="banner-upload"
                  />
                  <label htmlFor="banner-upload">
                    <FaUpload style={{ fontSize: '2rem', marginBottom: theme.spacing.sm, color: theme.colors.gray400 }} />
                    <p style={{ margin: 0, color: theme.colors.gray600 }}>Click to upload banner</p>
                  </label>
                </ImageUploadArea>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: theme.spacing.lg }}>Gallery Images</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
                {mediaFiles.gallery.map((image, index) => (
                  <ImagePreview key={index}>
                    <PreviewImage src={image} alt={`Gallery ${index + 1}`} />
                    <RemoveImageButton onClick={() => removeGalleryImage(index)}>
                      <FaTimes />
                    </RemoveImageButton>
                  </ImagePreview>
                ))}
              </div>
              <ImageUploadArea>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, 'gallery')}
                  id="gallery-upload"
                />
                <label htmlFor="gallery-upload">
                  <FaUpload style={{ fontSize: '2rem', marginBottom: theme.spacing.sm, color: theme.colors.gray400 }} />
                  <p style={{ margin: 0, color: theme.colors.gray600 }}>Click to add gallery images</p>
                </label>
              </ImageUploadArea>
            </div>
          </ContentSection>
        );

            case 'services':
        return (
          <ContentSection>
            <SectionTitle>
              <FaServicestack />
              Services
            </SectionTitle>
            <ServiceList>
              {services.map((service) => (
                <ServiceItem key={service.id} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', gap: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                    {/* Service Cover Image */}
                    <div style={{ minWidth: '200px' }}>
                      <h4 style={{ margin: `0 0 ${theme.spacing.sm} 0`, fontSize: '0.9rem', fontWeight: 600 }}>Cover Image</h4>
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.name}
                          style={{
                            width: '200px',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: theme.borderRadius.md,
                            border: `2px solid ${theme.colors.gray200}`,
                            marginBottom: theme.spacing.sm
                          }}
                        />
                      )}
                      <div style={{ position: 'relative' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                updateService(service.id, 'image', event.target.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          id={`service-image-${service.id}`}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor={`service-image-${service.id}`}
                          style={{
                            display: 'block',
                            padding: theme.spacing.sm,
                            border: `2px dashed ${theme.colors.gray300}`,
                            borderRadius: theme.borderRadius.md,
                            textAlign: 'center',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            color: theme.colors.gray600,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <FaUpload style={{ marginBottom: theme.spacing.xs }} />
                          <br />
                          {service.image ? 'Change Image' : 'Upload Image'}
                        </label>
                      </div>
                    </div>

                    {/* Service Details */}
                    <ServiceContent style={{ flex: 1 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
                        <FormGroup>
                          <FormLabel>Service Name</FormLabel>
                          <FormInput
                            value={service.name}
                            onChange={(e) => updateService(service.id, 'name', e.target.value)}
                            placeholder="Wedding Planning, Photography, etc."
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Icon</FormLabel>
                          <FormInput
                            value={service.icon || ''}
                            onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                            placeholder="💍"
                            style={{ textAlign: 'center', fontSize: '1.2rem' }}
                          />
                        </FormGroup>
                      </div>
                      <FormGroup>
                        <FormLabel>Service Description</FormLabel>
                        <FormTextarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          placeholder="Detailed description of this service..."
                          style={{ minHeight: '100px' }}
                        />
                      </FormGroup>
                    </ServiceContent>
                  </div>

                  <ServiceActions style={{ alignSelf: 'flex-end', marginTop: theme.spacing.md }}>
                    <ActionButton variant="danger" onClick={() => removeService(service.id)}>
                      <FaTrash />
                      Remove Service
                    </ActionButton>
                  </ServiceActions>
                </ServiceItem>
              ))}
            </ServiceList>

            {services.length === 0 && (
              <EmptyState>
                <FaServicestack style={{ fontSize: '3rem', marginBottom: theme.spacing.lg, color: theme.colors.gray400 }} />
                <h3>No services added yet</h3>
                <p>Start by adding the services you offer to potential clients</p>
              </EmptyState>
            )}

            <ActionButton onClick={addService} style={{ marginTop: theme.spacing.lg }}>
              <FaPlus />
              Add New Service
            </ActionButton>
          </ContentSection>
        );

            case 'portfolio':
        return (
          <>
            <ContentSection>
              <SectionTitle>
                <FaBriefcase />
                Portfolio & Work
              </SectionTitle>

              <div style={{ marginBottom: theme.spacing.xl }}>
                <ActionButton variant="primary" onClick={addPortfolioItem}>
                  <FaPlus />
                  Add New Portfolio Item
                </ActionButton>
              </div>

              {portfolio.length > 0 ? (
                <PortfolioGrid>
                  {portfolio.map((item, index) => (
                    <PortfolioCard key={item.id || index}>
                      <PortfolioImage src={item.coverImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80'} alt={item.location} />
                      <PortfolioInfo>
                        <PortfolioTitle>{item.location}</PortfolioTitle>
                        <PortfolioMeta>
                          {item.city}, {item.state} • {item.weddingDate}
                        </PortfolioMeta>
                        <div style={{ margin: `${theme.spacing.sm} 0` }}>
                          <StatusBadge status="published">
                            <FaCheck />
                            Published
                          </StatusBadge>
                        </div>
                        <div style={{ display: 'flex', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
                          <ActionButton onClick={() => editPortfolioItem(item)}>
                            <FaEdit />
                            Edit
                          </ActionButton>
                          <ActionButton variant="danger" onClick={() => deletePortfolioItem(item.id)}>
                            <FaTrash />
                            Delete
                          </ActionButton>
                        </div>
                      </PortfolioInfo>
                    </PortfolioCard>
                  ))}
                </PortfolioGrid>
              ) : (
                <EmptyState>
                  <FaBriefcase style={{ fontSize: '3rem', marginBottom: theme.spacing.lg, color: theme.colors.gray400 }} />
                  <h3>No portfolio items yet</h3>
                  <p>Start showcasing your work by adding portfolio items</p>
                  <ActionButton variant="primary" onClick={addPortfolioItem}>
                    <FaPlus />
                    Add Portfolio Item
                  </ActionButton>
                </EmptyState>
              )}
            </ContentSection>

            {showPortfolioForm && (
              <PortfolioFormModal onClick={(e) => e.target === e.currentTarget && setShowPortfolioForm(false)}>
                <PortfolioFormContent>
                  <PortfolioFormHeader>
                    <PortfolioFormTitle>
                      {portfolioForm.editing ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                    </PortfolioFormTitle>
                    <ActionButton onClick={() => setShowPortfolioForm(false)}>
                      <FaTimes />
                    </ActionButton>
                  </PortfolioFormHeader>

                                    <FormGrid>
                    <FormGroup key="portfolio-location">
                      <FormLabel>Event Location/Venue Name</FormLabel>
                      <FormInput
                        value={portfolioForm.location}
                        onChange={(e) => updatePortfolioForm('location', e.target.value)}
                        placeholder="Napa Valley Vineyard"
                      />
                    </FormGroup>
                    <FormGroup key="portfolio-city">
                      <FormLabel>City</FormLabel>
                      <FormInput
                        value={portfolioForm.city}
                        onChange={(e) => updatePortfolioForm('city', e.target.value)}
                        placeholder="Napa Valley"
                      />
                    </FormGroup>
                    <FormGroup key="portfolio-state">
                      <FormLabel>State</FormLabel>
                      <FormInput
                        value={portfolioForm.state}
                        onChange={(e) => updatePortfolioForm('state', e.target.value)}
                        placeholder="CA"
                      />
                    </FormGroup>
                    <FormGroup key="portfolio-date">
                      <FormLabel>Wedding Date</FormLabel>
                      <FormInput
                        value={portfolioForm.weddingDate}
                        onChange={(e) => updatePortfolioForm('weddingDate', e.target.value)}
                        placeholder="September 2023"
                      />
                    </FormGroup>
                    <FormGroup key="portfolio-couple">
                      <FormLabel>Couple Names</FormLabel>
                      <FormInput
                        value={portfolioForm.coupleNames}
                        onChange={(e) => updatePortfolioForm('coupleNames', e.target.value)}
                        placeholder="Sarah & Michael"
                      />
                    </FormGroup>
                    <FormGroup key="portfolio-description" style={{ gridColumn: '1 / -1' }}>
                      <FormLabel>Description</FormLabel>
                      <FormTextarea
                        value={portfolioForm.description}
                        onChange={(e) => updatePortfolioForm('description', e.target.value)}
                        placeholder="Describe this wedding event, the theme, special moments, and what made it unique..."
                      />
                    </FormGroup>
                  </FormGrid>

                  <div style={{ marginTop: theme.spacing.xl }}>
                    <h3 style={{ marginBottom: theme.spacing.lg }}>Cover Image</h3>
                    <div style={{ display: 'flex', gap: theme.spacing.lg, alignItems: 'center' }}>
                      {portfolioForm.coverImage && (
                        <img src={portfolioForm.coverImage} alt="Cover" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: theme.borderRadius.md }} />
                      )}
                      <ImageUploadArea>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                updatePortfolioForm('coverImage', event.target.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          id="cover-upload"
                        />
                        <label htmlFor="cover-upload">
                          <FaUpload style={{ fontSize: '2rem', marginBottom: theme.spacing.sm, color: theme.colors.gray400 }} />
                          <p style={{ margin: 0, color: theme.colors.gray600 }}>Click to upload cover image</p>
                        </label>
                      </ImageUploadArea>
                    </div>
                  </div>

                  <div style={{ marginTop: theme.spacing.xl }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
                      <h3 style={{ margin: 0 }}>Photo Gallery</h3>
                      <ActionButton onClick={() => document.getElementById('portfolio-gallery-upload').click()}>
                        <FaPlus />
                        Add Photos
                      </ActionButton>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={addPortfolioGalleryImage}
                      id="portfolio-gallery-upload"
                      style={{ display: 'none' }}
                    />

                    {portfolioForm.gallery.map((image) => (
                      <GalleryImageCard key={image.id}>
                        <GalleryImagePreview src={image.src} alt={image.title || 'Gallery image'} />
                        <GalleryImageForm>
                                                    <FormGrid>
                            <FormGroup key={`${image.id}-title`}>
                              <FormLabel>Photo Title</FormLabel>
                              <FormInput
                                value={image.title}
                                onChange={(e) => updatePortfolioGalleryImage(image.id, 'title', e.target.value)}
                                placeholder="Ceremony setup, Reception decor, etc."
                              />
                            </FormGroup>
                            <FormGroup key={`${image.id}-description`}>
                              <FormLabel>Description</FormLabel>
                              <FormInput
                                value={image.description}
                                onChange={(e) => updatePortfolioGalleryImage(image.id, 'description', e.target.value)}
                                placeholder="Describe this photo..."
                              />
                            </FormGroup>
                          </FormGrid>
                          <div style={{ marginTop: theme.spacing.md, textAlign: 'right' }}>
                            <SmallButton className="danger" onClick={() => removePortfolioGalleryImage(image.id)}>
                              <FaTrash />
                            </SmallButton>
                          </div>
                        </GalleryImageForm>
                      </GalleryImageCard>
                    ))}

                    {portfolioForm.gallery.length === 0 && (
                      <div style={{ textAlign: 'center', padding: theme.spacing.xl, color: theme.colors.gray500 }}>
                        <FaCamera style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                        <p>No photos added yet. Click "Add Photos" to start building your gallery.</p>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: theme.spacing.xl }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
                      <h3 style={{ margin: 0 }}>Services Provided</h3>
                      <ActionButton onClick={addPortfolioService}>
                        <FaPlus />
                        Add Service
                      </ActionButton>
                    </div>
                                        <ServiceHighlightList>
                      {portfolioForm.services.map((service, index) => (
                        <ServiceHighlightItem key={`service-${index}-${service.slice(0, 10)}`}>
                          <FormInput
                            value={service}
                            onChange={(e) => updatePortfolioService(index, e.target.value)}
                            placeholder="Full Wedding Planning, Floral Design, etc."
                            style={{ flex: 1 }}
                          />
                          <SmallButton className="danger" onClick={() => removePortfolioService(index)}>
                            <FaTrash />
                          </SmallButton>
                        </ServiceHighlightItem>
                      ))}
                    </ServiceHighlightList>
                  </div>

                  <div style={{ marginTop: theme.spacing.xl }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
                      <h3 style={{ margin: 0 }}>Event Highlights</h3>
                      <ActionButton onClick={addPortfolioHighlight}>
                        <FaPlus />
                        Add Highlight
                      </ActionButton>
                    </div>
                                        <ServiceHighlightList>
                      {portfolioForm.highlights.map((highlight, index) => (
                        <ServiceHighlightItem key={`highlight-${index}-${highlight.slice(0, 10)}`}>
                          <FormInput
                            value={highlight}
                            onChange={(e) => updatePortfolioHighlight(index, e.target.value)}
                            placeholder="Custom vineyard ceremony setup, Sunset photography session, etc."
                            style={{ flex: 1 }}
                          />
                          <SmallButton className="danger" onClick={() => removePortfolioHighlight(index)}>
                            <FaTrash />
                          </SmallButton>
                        </ServiceHighlightItem>
                      ))}
                    </ServiceHighlightList>
                  </div>

                  <div style={{ marginTop: theme.spacing.xxl, paddingTop: theme.spacing.lg, borderTop: `1px solid ${theme.colors.gray200}`, display: 'flex', gap: theme.spacing.md, justifyContent: 'flex-end' }}>
                    <ActionButton onClick={() => setShowPortfolioForm(false)}>
                      Cancel
                    </ActionButton>
                    <ActionButton variant="success" onClick={savePortfolioItem}>
                      <FaSave />
                      {portfolioForm.editing ? 'Update Portfolio Item' : 'Save Portfolio Item'}
                    </ActionButton>
                  </div>
                </PortfolioFormContent>
              </PortfolioFormModal>
            )}
          </>
        );

      default:
        return (
          <ContentSection>
            <SectionTitle>Section: {activeSection}</SectionTitle>
            <p>This section is under development. Content management for {activeSection} will be available soon.</p>
          </ContentSection>
        );
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
          Loading dashboard...
        </div>
      </DashboardContainer>
    );
  }

  if (!vendor) {
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
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
      <MobileSidebarOverlay isOpen={mobileSidebarOpen} onClick={closeMobileSidebar} />
      <MobileMenuButton
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
      >
        {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      <Sidebar mobileOpen={mobileSidebarOpen}>
        <SidebarHeader>
          <VendorName>{vendor.name}</VendorName>
          <VendorRole>Wedding Vendor Dashboard</VendorRole>
        </SidebarHeader>
        
        <SidebarNav>
          {Object.entries(groupedNavItems).map(([section, items]) => (
            <NavSection key={section}>
              <NavSectionTitle>{section}</NavSectionTitle>
                            {items.map((item) => (
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
                  <FaChevronRight style={{ marginLeft: 'auto', fontSize: '0.8rem' }} />
                </NavItem>
              ))}
            </NavSection>
          ))}
        </SidebarNav>
      </Sidebar>

      <MainContent>
        <ContentHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
            <ActionButton onClick={() => navigate(`/${vendorId}`)}>
              <FaArrowLeft />
              Back to Site
            </ActionButton>
            <PageTitle>
              {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </PageTitle>
          </div>
          
          <PageActions>
            <ActionButton onClick={() => navigate(`/${vendorId}`)} variant="secondary">
              <FaEye />
              Preview Site
            </ActionButton>
            {hasChanges && (
              <ActionButton 
                variant="success" 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </ActionButton>
            )}
          </PageActions>
        </ContentHeader>

        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default VendorDashboard;
