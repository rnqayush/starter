import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaEye,
  FaImage,
  FaPlus,
  FaTrash,
  FaCog,
  FaUsers,
  FaChartBar,
  FaPalette,
  FaTimes,
  FaCheck,
  FaUpload,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { getBusinessTemplate } from "../data/businessTemplates";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const DashboardHeader = styled.div`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.spacing.lg} 0;
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: transparent;
  border: 1px solid ${theme.colors.gray300};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const DashboardTitle = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'primaryColor',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: ${props.primaryColor || theme.colors.primary};
    color: ${theme.colors.white};
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  ` : `
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};
    border: 1px solid ${theme.colors.gray300};
    
    &:hover {
      background: ${theme.colors.gray50};
    }
  `}
`;

const DashboardLayout = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const Sidebar = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  height: fit-content;
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const MenuItem = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'primaryColor',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.active ? (props.primaryColor + '15') : 'transparent'};
  color: ${props => props.active ? (props.primaryColor || theme.colors.primary) : theme.colors.gray700};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${props => props.primaryColor + '10' || theme.colors.gray50};
  }

  svg {
    font-size: 1.1rem;
  }
`;

const MainContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  min-height: 600px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
  }
`;

const EditableField = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }

  input, textarea {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 2px solid ${theme.colors.gray200};
    border-radius: ${theme.borderRadius.md};
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.primaryColor || theme.colors.primary};
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.primaryColor || theme.colors.primary};
    background: ${props => props.primaryColor + '05' || theme.colors.gray50};
  }

  .icon {
    font-size: 2rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.gray600};
    font-weight: 500;
  }
`;

const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};

  .section-info {
    h4 {
      font-weight: 600;
      color: ${theme.colors.gray900};
      margin-bottom: ${theme.spacing.xs};
    }

    p {
      color: ${theme.colors.gray600};
      font-size: 0.9rem;
    }
  }

  .section-actions {
    display: flex;
    gap: ${theme.spacing.sm};
    }
`;

// Modal and Form Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
  }
`;

const FormField = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
    font-size: 0.9rem;
  }

  input, textarea, select {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 2px solid ${theme.colors.gray200};
    border-radius: ${theme.borderRadius.md};
    font-size: 1rem;
    transition: border-color 0.2s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${props => props.primaryColor || theme.colors.primary};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .help-text {
    font-size: 0.8rem;
    color: ${theme.colors.gray500};
    margin-top: ${theme.spacing.xs};
  }
`;

const TagInput = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
  }

  .tag {
    background: ${props => props.primaryColor + '20' || theme.colors.primary + '20'};
    color: ${props => props.primaryColor || theme.colors.primary};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};

    .remove {
      cursor: pointer;
      font-weight: bold;

      &:hover {
        color: ${theme.colors.error};
      }
    }
  }

  .tag-input {
    padding: ${theme.spacing.sm};
    border: 1px solid ${theme.colors.gray300};
    border-radius: ${theme.borderRadius.sm};
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: ${props => props.primaryColor || theme.colors.primary};
    }
  }
`;

const RangeSlider = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${theme.colors.gray200};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.primaryColor || theme.colors.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.primaryColor || theme.colors.primary};
    cursor: pointer;
    border: none;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'primaryColor',
})`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  ${props => props.variant === 'primary' ? `
    background: ${props.primaryColor || theme.colors.primary};
    color: ${theme.colors.white};

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  ` : props.variant === 'danger' ? `
    background: ${theme.colors.error};
    color: ${theme.colors.white};

    &:hover {
      background: #dc2626;
    }
  ` : `
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};
    border: 1px solid ${theme.colors.gray300};

    &:hover {
      background: ${theme.colors.gray50};
    }
  `}
`;

// Image Upload Components
const ImageUploadContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const ImageUploadArea = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor' && prop !== 'hasImage',
})`
  border: 2px dashed ${props => props.hasImage ? (props.primaryColor || theme.colors.primary) : theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.hasImage ? 'transparent' : theme.colors.gray50};
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    border-color: ${props => props.primaryColor || theme.colors.primary};
    background: ${props => props.primaryColor + '05' || theme.colors.gray100};
  }

  .upload-icon {
    font-size: 3rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.md};
  }

  .upload-text {
    color: ${theme.colors.gray600};
    font-weight: 500;
    margin-bottom: ${theme.spacing.sm};
  }

  .upload-hint {
    color: ${theme.colors.gray500};
    font-size: 0.8rem;
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${theme.spacing.md};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  .image-actions {
    display: flex;
    gap: ${theme.spacing.sm};
  }

  .image-action-btn {
    background: ${theme.colors.white};
    border: none;
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.gray100};
    }
  }
`;

const ImageUrlInput = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor',
})`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: flex-end;

  .url-input {
    flex: 1;
  }

  .url-button {
    padding: ${theme.spacing.md};
    background: ${props => props.primaryColor || theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.md};
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const VisibilityToggle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primaryColor' && prop !== 'isVisible',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  .toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    background: ${props => props.isVisible ? (props.primaryColor || theme.colors.primary) : theme.colors.gray300};
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: ${props => props.isVisible ? '22px' : '2px'};
      width: 20px;
      height: 20px;
      background: ${theme.colors.white};
      border-radius: 50%;
      transition: left 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .toggle-label {
    font-size: 0.8rem;
    color: ${props => props.isVisible ? theme.colors.gray700 : theme.colors.gray500};
    font-weight: 500;
  }
`;

const OwnerDashboard = () => {
  const { businessSlug } = useParams();
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState(null);
  const [activeSection, setActiveSection] = useState('content');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
        const [currentData, setCurrentData] = useState({
    sectionVisibility: {
      hero: true,
      about: true,
      services: true,
      portfolio: true,
      skills: true,
      experience: true,
      team: true,
      gallery: true,
      contact: true
    },
    hero: {
      title: "Creative Freelancer Portfolio",
      subtitle: "Transforming ideas into stunning visual experiences. Specialized in design, development, and creative solutions for modern businesses.",
      backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=1200&q=80"
    },
        about: {
      title: "About Me",
      description: "I'm a passionate creative professional with 8+ years of experience helping businesses and individuals bring their visions to life through innovative design and development.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400&q=80"
    },
    services: [
      { id: 1, icon: "🎨", title: "Web Design", description: "Custom website design tailored to your brand and business goals", price: "From $1,200" },
      { id: 2, icon: "📱", title: "UI/UX Design", description: "User-centered design for web and mobile applications", price: "From $800" },
      { id: 3, icon: "💻", title: "Frontend Development", description: "Modern, responsive websites built with latest technologies", price: "From $1,500" }
    ],
        portfolio: [
      { id: 1, title: "E-commerce Platform", category: "Web Development", description: "Modern e-commerce platform with custom design and seamless user experience", technologies: ["React", "Node.js", "MongoDB"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=600&q=80" },
      { id: 2, title: "Brand Identity Design", category: "Branding", description: "Complete brand identity including logo, color palette, and brand guidelines", technologies: ["Illustrator", "Photoshop", "Figma"], image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&w=600&q=80" }
    ],
    skills: [
      { id: 1, name: "Web Design", level: 95, icon: "🎨" },
      { id: 2, name: "UI/UX Design", level: 90, icon: "📱" },
      { id: 3, name: "Frontend Development", level: 88, icon: "💻" }
    ],
    experience: [
      { id: 1, company: "Digital Agency Inc.", role: "Senior Creative Designer", period: "2020 - Present", description: "Lead designer for major client projects, specializing in web design and branding solutions." },
      { id: 2, company: "Freelance", role: "Independent Designer & Developer", period: "2018 - Present", description: "Providing creative solutions for startups and established businesses across various industries." }
    ],
        team: [
      { id: 1, name: "Sarah Johnson", role: "Senior Stylist", bio: "15+ years experience in color and cutting", specialties: ["Color Specialist", "Bridal Hair"], photo: "https://images.unsplash.com/photo-1594824388853-bf7e0ad7b2ad?ixlib=rb-4.0.3&w=400&q=80" },
      { id: 2, name: "Maria Garcia", role: "Nail Specialist", bio: "Expert in nail art and luxury manicures", specialties: ["Nail Art", "Gel Manicures"], photo: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&w=400&q=80" }
    ],
        gallery: [
      { id: 1, category: "Hair Styling", images: 8, coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&w=600&q=80" },
      { id: 2, category: "Nail Art", images: 6, coverImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&w=600&q=80" },
      { id: 3, category: "Spa Treatments", images: 5, coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=600&q=80" }
    ],
    contact: {
      title: "Get In Touch",
      description: "Ready to start your next project? Contact me today and let's discuss how I can help bring your vision to life.",
      email: "hello@freelancer.com",
      phone: "+1 (555) 123-4567",
      address: "123 Creative Street, Design City, DC 12345",
      hours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed"
      },
      socialMedia: {
        linkedin: "https://linkedin.com/in/freelancer",
        twitter: "https://twitter.com/freelancer",
        instagram: "https://instagram.com/freelancer",
        website: "https://portfolio.freelancer.com"
      }
    }
  });

  useEffect(() => {
    const template = getBusinessTemplate(businessSlug);
    if (template) {
      setBusinessData(template);
    }
  }, [businessSlug]);

  if (!businessData) {
    return (
      <DashboardContainer>
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h2>Business Not Found</h2>
          <p>The business you're trying to edit doesn't exist.</p>
        </div>
      </DashboardContainer>
    );
  }

  const handleBackToWebsite = () => {
    navigate(`/business/${businessData.slug}`);
  };

    const handlePreview = () => {
    window.open(`/business/${businessData.slug}`, '_blank');
  };

  // Modal and form handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!modalType) return;

    if (modalType.includes('hero') || modalType.includes('about')) {
      setCurrentData(prev => ({
        ...prev,
        [modalType]: formData
      }));
    } else {
      const section = modalType.split('-')[0];
      if (editingItem) {
        // Edit existing item
        setCurrentData(prev => ({
          ...prev,
          [section]: prev[section].map(item =>
            item.id === editingItem.id ? { ...item, ...formData } : item
          )
        }));
      } else {
        // Add new item
        const newItem = {
          ...formData,
          id: Date.now() // Simple ID generation
        };
        setCurrentData(prev => ({
          ...prev,
          [section]: [...prev[section], newItem]
        }));
      }
    }
    closeModal();
  };

  const handleDelete = (section, id) => {
    setCurrentData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
    };

  // Image upload handlers
  const handleImageUpload = (file, field) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange(field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = (url, field) => {
    if (url.trim()) {
      handleInputChange(field, url.trim());
    }
  };

    const removeImage = (field) => {
    handleInputChange(field, '');
  };

  // Visibility toggle handler
  const toggleSectionVisibility = (section) => {
    setCurrentData(prev => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [section]: !prev.sectionVisibility[section]
      }
    }));
  };

  const menuItems = businessData?.slug === 'freelancer' ? [
    { id: 'content', label: 'Content Editor', icon: FaEdit },
    { id: 'portfolio', label: 'Portfolio Manager', icon: FaImage },
    { id: 'skills', label: 'Skills & Experience', icon: FaUsers },
    { id: 'design', label: 'Design & Theme', icon: FaPalette },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ] : [
    { id: 'content', label: 'Content Editor', icon: FaEdit },
    { id: 'design', label: 'Design & Theme', icon: FaPalette },
    { id: 'images', label: 'Media Library', icon: FaImage },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar },
    { id: 'settings', label: 'Settings', icon: FaCog },
      ];

  // Reusable Image Upload Component
  const ImageUpload = ({ field, label, currentImage, primaryColor }) => {
    const [tempUrl, setTempUrl] = useState('');

    return (
      <ImageUploadContainer>
        <FormField primaryColor={primaryColor}>
          <label>{label}</label>

          {currentImage ? (
            <ImagePreview>
              <img src={currentImage} alt="Preview" />
              <div className="image-overlay">
                <div className="image-actions">
                  <button
                    className="image-action-btn"
                    onClick={() => removeImage(field)}
                    title="Remove Image"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </ImagePreview>
          ) : (
            <ImageUploadArea
              hasImage={false}
              primaryColor={primaryColor}
              onClick={() => document.getElementById(`file-${field}`).click()}
            >
              <FaUpload className="upload-icon" />
              <div className="upload-text">Click to upload image</div>
              <div className="upload-hint">Supports JPG, PNG, GIF up to 10MB</div>
              <input
                id={`file-${field}`}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleImageUpload(file, field);
                  }
                }}
              />
            </ImageUploadArea>
          )}

          <div style={{ marginTop: theme.spacing.md }}>
            <label style={{ fontSize: '0.8rem', marginBottom: theme.spacing.xs }}>Or enter image URL:</label>
            <ImageUrlInput primaryColor={primaryColor}>
              <div className="url-input">
                <input
                  type="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <button
                className="url-button"
                onClick={() => {
                  if (tempUrl) {
                    handleImageUrl(tempUrl, field);
                    setTempUrl('');
                  }
                }}
              >
                Add URL
              </button>
            </ImageUrlInput>
          </div>
        </FormField>
      </ImageUploadContainer>
    );
  };

  // Render modal for editing
  const renderModal = () => {
    if (!showModal) return null;

    const renderForm = () => {
      switch (modalType) {
        case 'hero':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter hero title"
                                />
              </FormField>
              <ImageUpload
                field="backgroundImage"
                label="Background Image"
                currentImage={formData.backgroundImage}
                primaryColor={businessData.primaryColor}
              />
              <FormField primaryColor={businessData.primaryColor}>
                <label>Subtitle</label>
                <textarea
                  value={formData.subtitle || ''}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  placeholder="Enter hero subtitle"
                />
              </FormField>
            </>
          );

        case 'about':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Section Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Enter section title"
                />
              </FormField>
              <ImageUpload
                field="profileImage"
                label={businessData.slug === 'freelancer' ? 'Profile Photo' : 'Business Image'}
                currentImage={formData.profileImage}
                primaryColor={businessData.primaryColor}
              />
              <FormField primaryColor={businessData.primaryColor}>
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter about description"
                />
              </FormField>
            </>
          );

        case 'services':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => handleInputChange('icon', e.target.value)}
                  placeholder="🎨"
                />
                <div className="help-text">Choose an emoji to represent this service</div>
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Service Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Web Design"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your service"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Price</label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="From $1,200"
                />
              </FormField>
            </>
          );

        case 'portfolio':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Project Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="E-commerce Platform"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Category</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Branding">Branding</option>
                  <option value="Mobile App">Mobile App</option>
                                    <option value="Graphic Design">Graphic Design</option>
                </select>
              </FormField>
              <ImageUpload
                field="image"
                label="Project Image"
                currentImage={formData.image}
                primaryColor={businessData.primaryColor}
              />
              <FormField primaryColor={businessData.primaryColor}>
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the project"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Technologies</label>
                <TagInput primaryColor={businessData.primaryColor}>
                  <div className="tags-container">
                    {(formData.technologies || []).map((tech, index) => (
                      <div key={index} className="tag">
                        {tech}
                        <span
                          className="remove"
                          onClick={() => {
                            const newTechs = formData.technologies.filter((_, i) => i !== index);
                            handleInputChange('technologies', newTechs);
                          }}
                        >
                          ×
                        </span>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="tag-input"
                    placeholder="Add technology (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newTechs = [...(formData.technologies || []), e.target.value.trim()];
                        handleInputChange('technologies', newTechs);
                        e.target.value = '';
                      }
                    }}
                  />
                </TagInput>
              </FormField>
            </>
          );

        case 'skills':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => handleInputChange('icon', e.target.value)}
                  placeholder="🎨"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Skill Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Web Design"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Proficiency Level: {formData.level || 50}%</label>
                <RangeSlider
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level || 50}
                  onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                  primaryColor={businessData.primaryColor}
                />
              </FormField>
            </>
          );

        case 'experience':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Company</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Digital Agency Inc."
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Role</label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="Senior Creative Designer"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Period</label>
                <input
                  type="text"
                  value={formData.period || ''}
                  onChange={(e) => handleInputChange('period', e.target.value)}
                  placeholder="2020 - Present"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your role and achievements"
                />
              </FormField>
            </>
          );

        case 'team':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Sarah Johnson"
                />
              </FormField>
              <ImageUpload
                field="photo"
                label="Team Member Photo"
                currentImage={formData.photo}
                primaryColor={businessData.primaryColor}
              />
              <FormField primaryColor={businessData.primaryColor}>
                <label>Role</label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="Senior Stylist"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Bio</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Brief bio about the team member"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Specialties</label>
                <TagInput primaryColor={businessData.primaryColor}>
                  <div className="tags-container">
                    {(formData.specialties || []).map((specialty, index) => (
                      <div key={index} className="tag">
                        {specialty}
                        <span
                          className="remove"
                          onClick={() => {
                            const newSpecialties = formData.specialties.filter((_, i) => i !== index);
                            handleInputChange('specialties', newSpecialties);
                          }}
                        >
                          ×
                        </span>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="tag-input"
                    placeholder="Add specialty (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newSpecialties = [...(formData.specialties || []), e.target.value.trim()];
                        handleInputChange('specialties', newSpecialties);
                        e.target.value = '';
                      }
                    }}
                  />
                </TagInput>
              </FormField>
            </>
          );

                        case 'gallery':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Category Name</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Hair Styling"
                />
              </FormField>
              <ImageUpload
                field="coverImage"
                label="Cover Image"
                currentImage={formData.coverImage}
                primaryColor={businessData.primaryColor}
              />
              <FormField primaryColor={businessData.primaryColor}>
                <label>Number of Images</label>
                <input
                  type="number"
                  value={formData.images || ''}
                  onChange={(e) => handleInputChange('images', parseInt(e.target.value))}
                  placeholder="8"
                  min="1"
                />
                <div className="help-text">How many photos are in this category</div>
              </FormField>
            </>
          );

        case 'contact':
          return (
            <>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Section Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Get In Touch"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Ready to start your next project?"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="hello@business.com"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Address</label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Business Street, City, State 12345"
                  style={{ minHeight: '80px' }}
                />
              </FormField>
              <FormField primaryColor={businessData.primaryColor}>
                <label>Business Hours</label>
                <div style={{ display: 'grid', gap: theme.spacing.sm }}>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <div key={day} style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                      <label style={{ minWidth: '100px', textTransform: 'capitalize', fontSize: '0.9rem' }}>{day}:</label>
                      <input
                        type="text"
                        value={formData.hours?.[day] || ''}
                        onChange={(e) => handleInputChange('hours', { ...formData.hours, [day]: e.target.value })}
                        placeholder={day === 'sunday' ? 'Closed' : '9:00 AM - 6:00 PM'}
                        style={{ flex: 1 }}
                      />
                    </div>
                  ))}
                </div>
              </FormField>
            </>
          );

        default:
          return <div>Form not implemented for {modalType}</div>;
      }
    };

    return (
      <ModalOverlay onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h3>
              {editingItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
            </h3>
            <CloseButton onClick={closeModal}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          {renderForm()}

          <ModalActions>
            <ActionButton onClick={closeModal}>
              Cancel
            </ActionButton>
            {editingItem && (
              <ActionButton
                variant="danger"
                onClick={() => {
                  const section = modalType.split('-')[0];
                  handleDelete(section, editingItem.id);
                  closeModal();
                }}
              >
                <FaTrash />
                Delete
              </ActionButton>
            )}
            <ActionButton
              variant="primary"
              primaryColor={businessData.primaryColor}
              onClick={handleSave}
            >
              <FaCheck />
              Save
            </ActionButton>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'content':
        return (
          <div>
            <ContentHeader>
              <h2>Content Editor</h2>
              <Button 
                variant="primary" 
                primaryColor={businessData.primaryColor}
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit />
                {isEditing ? 'Save Changes' : 'Edit Content'}
              </Button>
            </ContentHeader>

            <SectionList>
                                                        <SectionItem>
                <div className="section-info">
                  <h4>Hero Section</h4>
                  <p>Main headline, subtitle, and call-to-action buttons</p>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                    Current: "{currentData.hero?.title}"
                  </div>
                  <VisibilityToggle
                    primaryColor={businessData.primaryColor}
                    isVisible={currentData.sectionVisibility?.hero}
                    style={{ marginTop: theme.spacing.sm }}
                  >
                    <div
                      className="toggle-switch"
                      onClick={() => toggleSectionVisibility('hero')}
                    />
                    <span className="toggle-label">
                      {currentData.sectionVisibility?.hero ? 'Visible' : 'Hidden'}
                    </span>
                  </VisibilityToggle>
                </div>
                <div className="section-actions">
                  <Button onClick={() => openModal('hero', currentData.hero)}>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>

                                                        <SectionItem>
                <div className="section-info">
                  <h4>About Section</h4>
                  <p>{businessData.slug === 'freelancer' ? 'Personal story, background, and professional journey' : 'Business story, values, and statistics'}</p>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                    Current: "{currentData.about?.title}"
                  </div>
                  <VisibilityToggle
                    primaryColor={businessData.primaryColor}
                    isVisible={currentData.sectionVisibility?.about}
                    style={{ marginTop: theme.spacing.sm }}
                  >
                    <div
                      className="toggle-switch"
                      onClick={() => toggleSectionVisibility('about')}
                    />
                    <span className="toggle-label">
                      {currentData.sectionVisibility?.about ? 'Visible' : 'Hidden'}
                    </span>
                  </VisibilityToggle>
                </div>
                <div className="section-actions">
                  <Button onClick={() => openModal('about', currentData.about)}>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>

                                                        <SectionItem>
                <div className="section-info">
                  <h4>Services Section</h4>
                  <p>{businessData.slug === 'freelancer' ? 'Professional services offered to clients' : 'List of services, pricing, and descriptions'}</p>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                    {currentData.services?.length || 0} services configured
                  </div>
                  <VisibilityToggle
                    primaryColor={businessData.primaryColor}
                    isVisible={currentData.sectionVisibility?.services}
                    style={{ marginTop: theme.spacing.sm }}
                  >
                    <div
                      className="toggle-switch"
                      onClick={() => toggleSectionVisibility('services')}
                    />
                    <span className="toggle-label">
                      {currentData.sectionVisibility?.services ? 'Visible' : 'Hidden'}
                    </span>
                  </VisibilityToggle>
                </div>
                <div className="section-actions">
                  <Button onClick={() => openModal('services')}>
                    <FaPlus />
                    Add Service
                  </Button>
                </div>
              </SectionItem>

                                          <SectionItem>
                <div className="section-info">
                  <h4>Team Section</h4>
                  <p>Staff profiles, photos, and bios</p>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                    {currentData.team?.length || 0} team members
                  </div>
                  <VisibilityToggle
                    primaryColor={businessData.primaryColor}
                    isVisible={currentData.sectionVisibility?.team}
                    style={{ marginTop: theme.spacing.sm }}
                  >
                    <div
                      className="toggle-switch"
                      onClick={() => toggleSectionVisibility('team')}
                    />
                    <span className="toggle-label">
                      {currentData.sectionVisibility?.team ? 'Visible' : 'Hidden'}
                    </span>
                  </VisibilityToggle>
                </div>
                <div className="section-actions">
                  <Button onClick={() => openModal('team')}>
                    <FaPlus />
                    Add Member
                  </Button>
                </div>
              </SectionItem>

                                          <SectionItem>
                <div className="section-info">
                  <h4>Contact Section</h4>
                  <p>Contact form, address, and business hours</p>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                    Current: "{currentData.contact?.title}"
                  </div>
                  <VisibilityToggle
                    primaryColor={businessData.primaryColor}
                    isVisible={currentData.sectionVisibility?.contact}
                    style={{ marginTop: theme.spacing.sm }}
                  >
                    <div
                      className="toggle-switch"
                      onClick={() => toggleSectionVisibility('contact')}
                    />
                    <span className="toggle-label">
                      {currentData.sectionVisibility?.contact ? 'Visible' : 'Hidden'}
                    </span>
                  </VisibilityToggle>
                </div>
                <div className="section-actions">
                  <Button onClick={() => openModal('contact', currentData.contact)}>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>

              {businessData.slug !== 'freelancer' && (
                <SectionItem>
                  <div className="section-info">
                    <h4>Gallery Section</h4>
                    <p>Photo galleries organized by categories</p>
                    <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                      {currentData.gallery?.length || 0} galleries configured
                    </div>
                  </div>
                  <div className="section-actions">
                    <Button onClick={() => openModal('gallery')}>
                      <FaPlus />
                      Add Gallery
                    </Button>
                  </div>
                </SectionItem>
              )}
            </SectionList>

            {/* Services List */}
            <div style={{ marginTop: theme.spacing.xl }}>
              <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Current Services</h3>
              <SectionList>
                {(currentData.services || []).map((service, index) => (
                  <SectionItem key={service.id}>
                    <div className="section-info">
                      <h4>{service.icon} {service.title}</h4>
                      <p>{service.description}</p>
                      {service.price && (
                        <div style={{ fontSize: '0.8rem', color: businessData.primaryColor, fontWeight: 600, marginTop: '4px' }}>
                          {service.price}
                        </div>
                      )}
                    </div>
                    <div className="section-actions">
                      <Button onClick={() => openModal('services', service)}>
                        <FaEdit />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete('services', service.id)}>
                        <FaTrash />
                        Delete
                      </Button>
                    </div>
                  </SectionItem>
                ))}
                            </SectionList>
            </div>

                        {/* Team Members List */}
            <div style={{ marginTop: theme.spacing.xl }}>
              <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Team Members</h3>
              <SectionList>
                {(currentData.team || []).map((member, index) => (
                  <SectionItem key={member.id}>
                    <div className="section-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                        {member.photo && (
                          <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundImage: `url(${member.photo})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }} />
                        )}
                        <div>
                          <h4>{member.name}</h4>
                          <p>{member.role}</p>
                          {member.specialties && (
                            <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                              {member.specialties.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="section-actions">
                      <Button onClick={() => openModal('team', member)}>
                        <FaEdit />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete('team', member.id)}>
                        <FaTrash />
                        Delete
                      </Button>
                    </div>
                  </SectionItem>
                ))}
              </SectionList>
            </div>

            {/* Gallery List for Non-Freelancers */}
            {businessData.slug !== 'freelancer' && (
              <div style={{ marginTop: theme.spacing.xl }}>
                <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Gallery Categories</h3>
                <SectionList>
                  {(currentData.gallery || []).map((gallery, index) => (
                    <SectionItem key={gallery.id}>
                      <div className="section-info">
                        <h4>{gallery.category}</h4>
                        <p>{gallery.images} images</p>
                        {gallery.coverImage && (
                          <div style={{
                            marginTop: theme.spacing.sm,
                            width: '60px',
                            height: '40px',
                            borderRadius: theme.borderRadius.sm,
                            backgroundImage: `url(${gallery.coverImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }} />
                        )}
                      </div>
                      <div className="section-actions">
                        <Button onClick={() => openModal('gallery', gallery)}>
                          <FaEdit />
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete('gallery', gallery.id)}>
                          <FaTrash />
                          Delete
                        </Button>
                      </div>
                    </SectionItem>
                  ))}
                </SectionList>
              </div>
            )}
          </div>
        );

      case 'portfolio':
        return businessData.slug === 'freelancer' ? (
          <div>
                        <ContentHeader>
              <h2>Portfolio Manager</h2>
              <Button variant="primary" primaryColor={businessData.primaryColor} onClick={() => openModal('portfolio')}>
                <FaPlus />
                Add New Project
              </Button>
            </ContentHeader>

            <div style={{ marginBottom: theme.spacing.xl }}>
              <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Portfolio Projects</h3>

              {(currentData.portfolio || []).map((project, index) => (
                                <div key={project.id} style={{
                  background: theme.colors.white,
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.md
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: theme.spacing.md
                  }}>
                    <h4 style={{ fontWeight: 600, color: theme.colors.gray900 }}>{project.title}</h4>
                    <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                      <Button onClick={() => openModal('portfolio', project)}>
                        <FaEdit />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete('portfolio', project.id)}>
                        <FaTrash />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: theme.spacing.md
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: theme.colors.gray700,
                        marginBottom: theme.spacing.xs,
                        textTransform: 'uppercase'
                      }}>Category</label>
                      <div style={{ color: theme.colors.gray900, fontWeight: 500 }}>{project.category}</div>
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: theme.colors.gray700,
                        marginBottom: theme.spacing.xs,
                        textTransform: 'uppercase'
                      }}>Technologies</label>
                      <div style={{ color: theme.colors.gray900, fontWeight: 500 }}>{project.technologies?.join(', ')}</div>
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: theme.colors.gray700,
                        marginBottom: theme.spacing.xs,
                        textTransform: 'uppercase'
                      }}>Description</label>
                      <div style={{ color: theme.colors.gray600, fontSize: '0.9rem' }}>{project.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'skills':
        return businessData.slug === 'freelancer' ? (
          <div>
                        <ContentHeader>
              <h2>Skills & Experience</h2>
              <Button variant="primary" primaryColor={businessData.primaryColor} onClick={() => openModal('skills')}>
                <FaPlus />
                Add New Skill
              </Button>
            </ContentHeader>

            <div style={{ marginBottom: theme.spacing.xl }}>
              <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Technical Skills</h3>

              {(currentData.skills || []).map((skill, index) => (
                                <div key={skill.id} style={{
                  background: theme.colors.white,
                  border: `1px solid ${theme.colors.gray200}`,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.md
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: theme.spacing.md
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                      <div style={{ fontSize: '1.5rem' }}>{skill.icon}</div>
                      <h4 style={{ fontWeight: 600, color: theme.colors.gray900, margin: 0 }}>{skill.name}</h4>
                    </div>
                    <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                      <Button onClick={() => openModal('skills', skill)}>
                        <FaEdit />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete('skills', skill.id)}>
                        <FaTrash />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                    <div style={{
                      flex: 1,
                      height: '8px',
                      background: theme.colors.gray200,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        height: '100%',
                        background: businessData.primaryColor,
                        width: `${skill.level}%`,
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    <div style={{
                      fontWeight: 600,
                      color: businessData.primaryColor,
                      minWidth: '40px'
                    }}>{skill.level}%</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Professional Experience</h3>

                            <SectionList>
                {(currentData.experience || []).map((exp, index) => (
                  <SectionItem key={exp.id}>
                    <div className="section-info">
                      <h4>{exp.role}</h4>
                      <p>{exp.company} • {exp.period}</p>
                      {exp.description && (
                        <div style={{ fontSize: '0.8rem', color: theme.colors.gray500, marginTop: '4px' }}>
                          {exp.description.substring(0, 100)}...
                        </div>
                      )}
                    </div>
                    <div className="section-actions">
                      <Button onClick={() => openModal('experience', exp)}>
                        <FaEdit />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete('experience', exp.id)}>
                        <FaTrash />
                        Delete
                      </Button>
                    </div>
                  </SectionItem>
                ))}
              </SectionList>

              <Button
                variant="primary"
                primaryColor={businessData.primaryColor}
                style={{ marginTop: theme.spacing.lg }}
                onClick={() => openModal('experience')}
              >
                <FaPlus />
                Add Experience
              </Button>
            </div>
          </div>
        ) : null;

      case 'design':
        return (
          <div>
            <ContentHeader>
              <h2>Design & Theme</h2>
            </ContentHeader>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Primary Color</label>
              <input type="color" defaultValue={businessData.primaryColor} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Business Name</label>
              <input type="text" defaultValue={businessData.name} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Logo Upload</label>
              <ImageUpload primaryColor={businessData.primaryColor}>
                <FaImage className="icon" />
                <p>Click to upload logo or drag and drop</p>
              </ImageUpload>
            </EditableField>
          </div>
        );

            case 'images':
        return businessData.slug !== 'freelancer' ? (
          <div>
            <ContentHeader>
              <h2>Media Library</h2>
              <Button
                variant="primary"
                primaryColor={businessData.primaryColor}
                onClick={() => openModal('gallery')}
              >
                <FaPlus />
                Add Gallery Category
              </Button>
            </ContentHeader>

            <div style={{ marginBottom: theme.spacing.xl }}>
              <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Gallery Categories</h3>

              {(currentData.gallery || []).length === 0 ? (
                <div style={{
                  background: theme.colors.gray50,
                  border: `2px dashed ${theme.colors.gray300}`,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.xl,
                  textAlign: 'center'
                }}>
                  <FaImage style={{ fontSize: '3rem', color: theme.colors.gray400, marginBottom: theme.spacing.md }} />
                  <h4 style={{ color: theme.colors.gray600, marginBottom: theme.spacing.sm }}>No gallery categories yet</h4>
                  <p style={{ color: theme.colors.gray500, marginBottom: theme.spacing.lg }}>Create your first gallery category to organize your photos</p>
                  <Button
                    variant="primary"
                    primaryColor={businessData.primaryColor}
                    onClick={() => openModal('gallery')}
                  >
                    <FaPlus />
                    Create First Gallery
                  </Button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: theme.spacing.lg
                }}>
                  {(currentData.gallery || []).map((gallery, index) => (
                    <div key={gallery.id} style={{
                      background: theme.colors.white,
                      border: `1px solid ${theme.colors.gray200}`,
                      borderRadius: theme.borderRadius.lg,
                      overflow: 'hidden',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}>
                      {/* Gallery Cover Image */}
                      <div style={{
                        height: '200px',
                        backgroundImage: gallery.coverImage ? `url(${gallery.coverImage})` : 'none',
                        backgroundColor: gallery.coverImage ? 'transparent' : theme.colors.gray100,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        {!gallery.coverImage && (
                          <div style={{ textAlign: 'center', color: theme.colors.gray500 }}>
                            <FaImage style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                            <div>No cover image</div>
                          </div>
                        )}
                        <div style={{
                          position: 'absolute',
                          top: theme.spacing.sm,
                          right: theme.spacing.sm,
                          display: 'flex',
                          gap: theme.spacing.xs
                        }}>
                          <button
                            style={{
                              background: 'rgba(255, 255, 255, 0.9)',
                              border: 'none',
                              borderRadius: theme.borderRadius.sm,
                              padding: theme.spacing.xs,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('gallery', gallery);
                            }}
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            style={{
                              background: 'rgba(255, 255, 255, 0.9)',
                              border: 'none',
                              borderRadius: theme.borderRadius.sm,
                              padding: theme.spacing.xs,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: theme.colors.error
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete('gallery', gallery.id);
                            }}
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Gallery Info */}
                      <div style={{ padding: theme.spacing.lg }}>
                        <h4 style={{
                          margin: 0,
                          marginBottom: theme.spacing.sm,
                          fontWeight: 600,
                          color: theme.colors.gray900
                        }}>
                          {gallery.category}
                        </h4>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing.sm,
                          color: theme.colors.gray600,
                          fontSize: '0.9rem'
                        }}>
                          <FaImage size={14} />
                          <span>{gallery.images || 0} images</span>
                        </div>

                        <div style={{
                          marginTop: theme.spacing.md,
                          display: 'flex',
                          gap: theme.spacing.sm
                        }}>
                          <Button
                            style={{ flex: 1, fontSize: '0.8rem' }}
                            onClick={() => openModal('gallery', gallery)}
                          >
                            <FaEdit size={12} />
                            Edit
                          </Button>
                          <Button
                            style={{ fontSize: '0.8rem' }}
                            onClick={() => {
                              // Here you would typically open a gallery viewer/manager
                              console.log('Manage images for:', gallery.category);
                            }}
                          >
                            <FaImage size={12} />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Upload Section */}
            <div style={{ marginTop: theme.spacing.xl }}>
              <h3 style={{ marginBottom: theme.spacing.lg, color: theme.colors.gray900 }}>Quick Upload</h3>
              <div style={{
                background: theme.colors.white,
                border: `1px solid ${theme.colors.gray200}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.xl
              }}>
                <ImageUploadArea
                  hasImage={false}
                  primaryColor={businessData.primaryColor}
                  onClick={() => document.getElementById('bulk-upload').click()}
                >
                  <FaUpload className="upload-icon" />
                  <div className="upload-text">Upload multiple images</div>
                  <div className="upload-hint">Select images to add to your media library</div>
                  <input
                    id="bulk-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      console.log('Bulk upload:', files.length, 'files');
                      // Here you would handle bulk upload functionality
                    }}
                  />
                </ImageUploadArea>

                <div style={{
                  marginTop: theme.spacing.lg,
                  padding: theme.spacing.md,
                  background: theme.colors.gray50,
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.gray200}`
                }}>
                  <h4 style={{
                    margin: 0,
                    marginBottom: theme.spacing.sm,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: theme.colors.gray900
                  }}>Upload Tips:</h4>
                  <ul style={{
                    margin: 0,
                    paddingLeft: theme.spacing.lg,
                    fontSize: '0.8rem',
                    color: theme.colors.gray600,
                    lineHeight: '1.5'
                  }}>
                    <li>Recommended image size: 1200x800px or higher</li>
                    <li>Supported formats: JPG, PNG, GIF, WebP</li>
                    <li>Maximum file size: 10MB per image</li>
                    <li>Organize images into categories for better management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null;

      case 'analytics':
        return (
          <div>
            <ContentHeader>
              <h2>Analytics</h2>
            </ContentHeader>
            <p style={{ color: theme.colors.gray600, textAlign: 'center', padding: '2rem' }}>
              Analytics dashboard coming soon. Track your website visitors, popular pages, and engagement metrics.
            </p>
          </div>
        );

      case 'settings':
        return (
          <div>
            <ContentHeader>
              <h2>Website Settings</h2>
            </ContentHeader>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Website URL</label>
              <input type="text" defaultValue={`yourdomain.com/business/${businessData.slug}`} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>SEO Meta Description</label>
              <textarea defaultValue={businessData.description} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Contact Email</label>
              <input type="email" defaultValue={`info@${businessData.slug}.com`} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Phone Number</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" />
            </EditableField>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
            <BackButton onClick={handleBackToWebsite}>
              <FaArrowLeft />
              Back to Website
            </BackButton>
            <DashboardTitle>
              <h1>{businessData.name} - Owner Dashboard</h1>
              <p>Manage your website content, design, and settings</p>
            </DashboardTitle>
          </div>
          <ActionButtons>
            <Button onClick={handlePreview}>
              <FaEye />
              Preview Website
            </Button>
            <Button variant="primary" primaryColor={businessData.primaryColor}>
              <FaSave />
              Save Changes
            </Button>
          </ActionButtons>
        </HeaderContent>
      </DashboardHeader>

      <DashboardLayout>
        <Sidebar>
          <SidebarTitle>
            <FaCog />
            Dashboard Menu
          </SidebarTitle>
          <SidebarMenu>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <MenuItem
                  key={item.id}
                  active={activeSection === item.id}
                  primaryColor={businessData.primaryColor}
                  onClick={() => setActiveSection(item.id)}
                >
                  <IconComponent />
                  {item.label}
                </MenuItem>
              );
            })}
          </SidebarMenu>
        </Sidebar>

                <MainContent>
          {renderContent()}
        </MainContent>
      </DashboardLayout>

      {/* Render Modal */}
      {renderModal()}
    </DashboardContainer>
  );
};

export default OwnerDashboard;
