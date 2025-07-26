import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { getWeddingVendorById as getVendorById } from '../../DummyData';
import { useAuth } from '../../context/AuthContext';

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

const CustomSectionCard = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.primary};
  }
`;

const CustomSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const CustomSectionTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.gray900};
  font-size: 1.1rem;
  font-weight: 600;
`;

const SectionTypeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.lg} 0;
`;

const SectionTypeCard = styled.div.withConfig({
  shouldForwardProp: prop => !['selected'].includes(prop),
})`
  padding: ${theme.spacing.lg};
  border: 2px solid ${props => props.selected ? theme.colors.primary : theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? theme.colors.primary + '10' : theme.colors.white};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }
`;

const Modal = styled.div`
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
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${theme.spacing.xxl};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.gray900};
  font-size: 1.5rem;
  font-weight: 600;
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
  const [activeSection, setActiveSection] = useState('about-us');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Form states for different sections
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
    gallery: [],
  });

  const [testimonialsData, setTestimonialsData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  
  const [customSections, setCustomSections] = useState([]);
  const [showCustomSectionModal, setShowCustomSectionModal] = useState(false);
  const [editingCustomSection, setEditingCustomSection] = useState(null);
  const [newCustomSection, setNewCustomSection] = useState({
    title: '',
    type: '',
    content: '',
  });

  const [profileSettings, setProfileSettings] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigationItems = [
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
      
      // Initialize About Us data
      setAboutUsData({
        description: vendorData.description || 'Tell your clients about your business, experience, and what makes you unique.',
        mission: vendorData.mission || 'Share your mission and values that drive your business.',
        experience: vendorData.experience || 'Describe your years of experience and expertise.',
        specialization: vendorData.specialization || 'Highlight your specializations and unique services.',
      });
      
      // Initialize Services data with unique IDs
      const servicesWithIds = (vendorData.services || [
        { name: 'Wedding Planning', description: 'Complete wedding planning service from start to finish.', price: '$2000-$5000' },
        { name: 'Day-of Coordination', description: 'Professional coordination on your wedding day.', price: '$800-$1500' },
      ]).map((service, index) => ({
        ...service,
        id: service.id || `service-${Date.now()}-${index}`
      }));
      setServicesData(servicesWithIds);

      // Initialize Recent Work data with unique IDs
      const recentWorkWithIds = (vendorData.locationPortfolio || [
        { title: 'Sarah & Michael Wedding', location: 'Napa Valley', date: 'September 2023', image: vendorData.image },
        { title: 'Emily & James Wedding', location: 'San Francisco', date: 'August 2023', image: vendorData.image },
      ]).map((work, index) => ({
        ...work,
        id: work.id || `work-${Date.now()}-${index}`
      }));
      setRecentWorkData(recentWorkWithIds);

      // Initialize Photos & Media data
      setPhotosMediaData({
        profileImage: vendorData.logo || '',
        bannerImage: vendorData.image || '',
        gallery: vendorData.portfolioImages || [],
      });

      // Initialize Testimonials data with unique IDs
      const testimonialsWithIds = (vendorData.testimonials || [
        { client: 'Sarah & Michael', text: 'Amazing service! Highly recommended.', rating: 5 },
        { client: 'Emily & James', text: 'Professional and creative. Made our day perfect.', rating: 5 },
      ]).map((testimonial, index) => ({
        ...testimonial,
        id: testimonial.id || `testimonial-${Date.now()}-${index}`
      }));
      setTestimonialsData(testimonialsWithIds);

      // Initialize Packages data with unique IDs
      const packagesWithIds = (vendorData.packages || [
        { name: 'Basic Package', description: 'Essential wedding planning services', price: '$2000' },
        { name: 'Premium Package', description: 'Full-service wedding planning with premium features', price: '$5000' },
      ]).map((pkg, index) => ({
        ...pkg,
        id: pkg.id || `package-${Date.now()}-${index}`
      }));
      setPackagesData(packagesWithIds);
      
      // Initialize Custom Sections with unique IDs
      const customSectionsWithIds = (vendorData.customSections || []).map((section, index) => ({
        ...section,
        id: section.id || `custom-section-${Date.now()}-${index}`
      }));
      setCustomSections(customSectionsWithIds);
      
      // Initialize Profile Settings
      setProfileSettings({
        name: vendorData.name,
        email: vendorData.email,
        phone: vendorData.phone,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
    setLoading(false);
  }, [vendorId]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setHasChanges(false);
      alert('Changes saved successfully!');
    }, 1000);
  };

  const handleDataChange = (section, field, value) => {
    switch (section) {
      case 'about-us':
        setAboutUsData(prev => ({ ...prev, [field]: value }));
        break;
      case 'profile-settings':
        setProfileSettings(prev => ({ ...prev, [field]: value }));
        break;
      default:
        break;
    }
    setHasChanges(true);
  };

  const addCustomSection = () => {
    setEditingCustomSection(null);
    setNewCustomSection({ title: '', type: '', content: '' });
    setShowCustomSectionModal(true);
  };

  const editCustomSection = (section) => {
    setEditingCustomSection(section);
    setNewCustomSection(section);
    setShowCustomSectionModal(true);
  };

  const saveCustomSection = () => {
    if (editingCustomSection) {
      setCustomSections(prev => 
        prev.map(section => section.id === editingCustomSection.id ? newCustomSection : section)
      );
    } else {
      const newSection = {
        ...newCustomSection,
        id: `custom-section-${Date.now()}-${Math.random()}`,
      };
      setCustomSections(prev => [...prev, newSection]);
    }
    setShowCustomSectionModal(false);
    setHasChanges(true);
  };

  const deleteCustomSection = (sectionId) => {
    setCustomSections(prev => prev.filter(section => section.id !== sectionId));
    setHasChanges(true);
  };

  const addService = () => {
    const newService = {
      id: `service-${Date.now()}-${Math.random()}`,
      name: 'New Service',
      description: 'Service description',
      price: '$0',
    };
    setServicesData(prev => [...prev, newService]);
    setHasChanges(true);
  };

  const updateService = (id, field, value) => {
    setServicesData(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
    setHasChanges(true);
  };

  const deleteService = (id) => {
    setServicesData(prev => prev.filter(service => service.id !== id));
    setHasChanges(true);
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
                  onChange={e => handleDataChange('about-us', 'description', e.target.value)}
                  placeholder="Tell your clients about your business..."
                  rows={6}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Mission & Values</FormLabel>
                <FormTextarea
                  value={aboutUsData.mission}
                  onChange={e => handleDataChange('about-us', 'mission', e.target.value)}
                  placeholder="Share your mission and values..."
                  rows={4}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Years of Experience</FormLabel>
                <FormInput
                  value={aboutUsData.experience}
                  onChange={e => handleDataChange('about-us', 'experience', e.target.value)}
                  placeholder="e.g., 10+ years in wedding planning"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Specialization</FormLabel>
                <FormInput
                  value={aboutUsData.specialization}
                  onChange={e => handleDataChange('about-us', 'specialization', e.target.value)}
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
              <div key={service.id} style={{ 
                border: `1px solid ${theme.colors.gray200}`, 
                borderRadius: theme.borderRadius.md, 
                padding: theme.spacing.lg, 
                marginBottom: theme.spacing.lg 
              }}>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Service Name</FormLabel>
                    <FormInput
                      value={service.name}
                      onChange={e => updateService(service.id, 'name', e.target.value)}
                      placeholder="Wedding Planning"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Price Range</FormLabel>
                    <FormInput
                      value={service.price}
                      onChange={e => updateService(service.id, 'price', e.target.value)}
                      placeholder="$2000-$5000"
                    />
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Service Description</FormLabel>
                    <FormTextarea
                      value={service.description}
                      onChange={e => updateService(service.id, 'description', e.target.value)}
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
              <div key={work.id} style={{ 
                border: `1px solid ${theme.colors.gray200}`, 
                borderRadius: theme.borderRadius.md, 
                padding: theme.spacing.lg, 
                marginBottom: theme.spacing.lg 
              }}>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Project Title</FormLabel>
                    <FormInput
                      value={work.title}
                      onChange={e => {
                        setRecentWorkData(prev =>
                          prev.map(item =>
                            item.id === work.id ? { ...item, title: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="Sarah & Michael Wedding"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Location</FormLabel>
                    <FormInput
                      value={work.location}
                      onChange={e => {
                        setRecentWorkData(prev =>
                          prev.map(item =>
                            item.id === work.id ? { ...item, location: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="Napa Valley"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Date</FormLabel>
                    <FormInput
                      value={work.date}
                      onChange={e => {
                        setRecentWorkData(prev =>
                          prev.map(item =>
                            item.id === work.id ? { ...item, date: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="September 2023"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormInput
                      value={work.image || ''}
                      onChange={e => {
                        setRecentWorkData(prev =>
                          prev.map(item =>
                            item.id === work.id ? { ...item, image: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </FormGroup>
                </FormGrid>
              </div>
            ))}
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
                  onChange={e => {
                    setPhotosMediaData(prev => ({ ...prev, profileImage: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="https://example.com/profile.jpg"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Banner Image URL</FormLabel>
                <FormInput
                  value={photosMediaData.bannerImage}
                  onChange={e => {
                    setPhotosMediaData(prev => ({ ...prev, bannerImage: e.target.value }));
                    setHasChanges(true);
                  }}
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
              <div key={testimonial.id} style={{ 
                border: `1px solid ${theme.colors.gray200}`, 
                borderRadius: theme.borderRadius.md, 
                padding: theme.spacing.lg, 
                marginBottom: theme.spacing.lg 
              }}>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Client Name</FormLabel>
                    <FormInput
                      value={testimonial.client}
                      onChange={e => {
                        setTestimonialsData(prev =>
                          prev.map(item =>
                            item.id === testimonial.id ? { ...item, client: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
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
                        setTestimonialsData(prev =>
                          prev.map(item =>
                            item.id === testimonial.id ? { ...item, rating: parseInt(e.target.value) } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                    />
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Testimonial Text</FormLabel>
                    <FormTextarea
                      value={testimonial.text}
                      onChange={e => {
                        setTestimonialsData(prev =>
                          prev.map(item =>
                            item.id === testimonial.id ? { ...item, text: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="Amazing service! Highly recommended."
                      rows={3}
                    />
                  </FormGroup>
                </FormGrid>
              </div>
            ))}
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
              <div key={pkg.id} style={{ 
                border: `1px solid ${theme.colors.gray200}`, 
                borderRadius: theme.borderRadius.md, 
                padding: theme.spacing.lg, 
                marginBottom: theme.spacing.lg 
              }}>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Package Name</FormLabel>
                    <FormInput
                      value={pkg.name}
                      onChange={e => {
                        setPackagesData(prev =>
                          prev.map(item =>
                            item.id === pkg.id ? { ...item, name: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="Basic Package"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Price</FormLabel>
                    <FormInput
                      value={pkg.price}
                      onChange={e => {
                        setPackagesData(prev =>
                          prev.map(item =>
                            item.id === pkg.id ? { ...item, price: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="$2000"
                    />
                  </FormGroup>
                  <FormGroup style={{ gridColumn: '1 / -1' }}>
                    <FormLabel>Package Description</FormLabel>
                    <FormTextarea
                      value={pkg.description}
                      onChange={e => {
                        setPackagesData(prev =>
                          prev.map(item =>
                            item.id === pkg.id ? { ...item, description: e.target.value } : item
                          )
                        );
                        setHasChanges(true);
                      }}
                      placeholder="Essential wedding planning services..."
                      rows={3}
                    />
                  </FormGroup>
                </FormGrid>
              </div>
            ))}
          </ContentSection>
        );

      case 'custom-sections':
        return (
          <ContentSection>
            <SectionTitle>
              <FaPlus />
              Custom Sections
            </SectionTitle>
            <div style={{ marginBottom: theme.spacing.xl }}>
              <ActionButton variant="primary" onClick={addCustomSection}>
                <FaPlus />
                Add Custom Section
              </ActionButton>
            </div>
            
            {customSections.map(section => (
              <CustomSectionCard key={section.id}>
                <CustomSectionHeader>
                  <CustomSectionTitle>{section.title}</CustomSectionTitle>
                  <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                    <ActionButton onClick={() => editCustomSection(section)}>
                      <FaEdit />
                      Edit
                    </ActionButton>
                    <ActionButton 
                      variant="danger" 
                      onClick={() => deleteCustomSection(section.id)}
                    >
                      <FaTrash />
                      Delete
                    </ActionButton>
                  </div>
                </CustomSectionHeader>
                <p style={{ color: theme.colors.gray600, margin: 0 }}>
                  Type: {section.type} | Content: {section.content?.substring(0, 100)}...
                </p>
              </CustomSectionCard>
            ))}

            {customSections.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: theme.spacing.xxl, 
                color: theme.colors.gray500 
              }}>
                <FaPlus style={{ fontSize: '3rem', marginBottom: theme.spacing.lg }} />
                <h3>No custom sections yet</h3>
                <p>Create custom sections to showcase unique aspects of your business</p>
              </div>
            )}
          </ContentSection>
        );

      case 'settings':
        return (
          <ContentSection>
            <SectionTitle>
              <FaCog />
              Profile Settings
            </SectionTitle>
            <FormGrid>
              <FormGroup>
                <FormLabel>Business Name</FormLabel>
                <FormInput
                  value={profileSettings.name}
                  onChange={e => handleDataChange('profile-settings', 'name', e.target.value)}
                  placeholder="Your business name"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  value={profileSettings.email}
                  onChange={e => handleDataChange('profile-settings', 'email', e.target.value)}
                  placeholder="your@email.com"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <FormInput
                  value={profileSettings.phone}
                  onChange={e => handleDataChange('profile-settings', 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>Current Password</FormLabel>
                <FormInput
                  type="password"
                  value={profileSettings.currentPassword}
                  onChange={e => handleDataChange('profile-settings', 'currentPassword', e.target.value)}
                  placeholder="Enter current password to make changes"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>New Password</FormLabel>
                <FormInput
                  type="password"
                  value={profileSettings.newPassword}
                  onChange={e => handleDataChange('profile-settings', 'newPassword', e.target.value)}
                  placeholder="Enter new password"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Confirm New Password</FormLabel>
                <FormInput
                  type="password"
                  value={profileSettings.confirmPassword}
                  onChange={e => handleDataChange('profile-settings', 'confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                />
              </FormGroup>
            </FormGrid>
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

      {/* Custom Section Modal */}
      {showCustomSectionModal && (
        <Modal onClick={() => setShowCustomSectionModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingCustomSection ? 'Edit Custom Section' : 'Add Custom Section'}
              </ModalTitle>
              <ActionButton onClick={() => setShowCustomSectionModal(false)}>
                <FaTimes />
              </ActionButton>
            </ModalHeader>
            
            <FormGroup>
              <FormLabel>Section Title</FormLabel>
              <FormInput
                value={newCustomSection.title}
                onChange={e => setNewCustomSection(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Our Awards, Special Offers"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Section Type</FormLabel>
              <SectionTypeOptions>
                <SectionTypeCard
                  key="section-type-text"
                  selected={newCustomSection.type === 'text'}
                  onClick={() => setNewCustomSection(prev => ({ ...prev, type: 'text' }))}
                >
                  <FaTextHeight style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                  <h4>Text</h4>
                  <p>Rich text content</p>
                </SectionTypeCard>
                <SectionTypeCard
                  key="section-type-gallery"
                  selected={newCustomSection.type === 'gallery'}
                  onClick={() => setNewCustomSection(prev => ({ ...prev, type: 'gallery' }))}
                >
                  <FaImages style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                  <h4>Gallery</h4>
                  <p>Image gallery</p>
                </SectionTypeCard>
                <SectionTypeCard
                  key="section-type-list"
                  selected={newCustomSection.type === 'list'}
                  onClick={() => setNewCustomSection(prev => ({ ...prev, type: 'list' }))}
                >
                  <FaList style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                  <h4>List</h4>
                  <p>Bullet point list</p>
                </SectionTypeCard>
                <SectionTypeCard
                  key="section-type-testimonial"
                  selected={newCustomSection.type === 'testimonial'}
                  onClick={() => setNewCustomSection(prev => ({ ...prev, type: 'testimonial' }))}
                >
                  <FaQuoteLeft style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                  <h4>Testimonial</h4>
                  <p>Featured testimonial</p>
                </SectionTypeCard>
              </SectionTypeOptions>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Content</FormLabel>
              <FormTextarea
                value={newCustomSection.content}
                onChange={e => setNewCustomSection(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter your content here..."
                rows={6}
              />
            </FormGroup>
            
            <div style={{ 
              marginTop: theme.spacing.xl, 
              display: 'flex', 
              gap: theme.spacing.md, 
              justifyContent: 'flex-end' 
            }}>
              <ActionButton onClick={() => setShowCustomSectionModal(false)}>
                Cancel
              </ActionButton>
              <ActionButton variant="success" onClick={saveCustomSection}>
                <FaSave />
                {editingCustomSection ? 'Update Section' : 'Add Section'}
              </ActionButton>
            </div>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default VendorDashboard;
