import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaGripVertical,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTimes,
  FaEdit,
  FaSave,
  FaGlobe,
  FaImage,
  FaAlignLeft,
  FaList,
  FaCar,
  FaArrowUp,
  FaArrowDown,
  FaSort,
  FaPalette,
  FaLink,
  FaUpload,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectVendor,
  updatePageSections,
  publishPageContent,
} from '../../store/slices/automobileManagementSlice';

const ContentContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const HeaderTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => props.color || theme.colors.primary};
  background: ${props => props.filled ? (props.color || theme.colors.primary) : theme.colors.white};
  color: ${props => props.filled ? theme.colors.white : (props.color || theme.colors.primary)};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${props => props.color || theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SectionsContainer = styled.div`
  padding: ${theme.spacing.xl};
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionCard = styled.div.withConfig({
  shouldForwardProp: prop => !['isVisible', 'isActive'].includes(prop),
})`
  background: ${theme.colors.white};
  border: 2px solid ${props => props.isActive ? theme.colors.primary : theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.isVisible ? 1 : 0.6};
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || theme.colors.primary};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.color || `${theme.colors.primary}20`};
  color: ${props => props.textColor || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0 0 ${theme.spacing.md} 0;
  line-height: 1.4;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.gray100};
`;

const CardBadge = styled.span`
  background: ${props => props.color || theme.colors.gray100};
  color: ${props => props.textColor || theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
`;

const VisibilityButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.visible ? theme.colors.success : theme.colors.gray400};
  font-size: 1.1rem;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
  }
`;

const AddSectionCard = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }
`;

const AddIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray500};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.md};
  transition: all 0.2s ease;

  ${AddSectionCard}:hover & {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const AddTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin: 0 0 ${theme.spacing.sm} 0;

  ${AddSectionCard}:hover & {
    color: ${theme.colors.primary};
  }
`;

const AddDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray500};
  margin: 0;
`;

// Modal Styles
const Modal = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: ${props => props.maxWidth || '600px'};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray500};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};

  &:hover {
    color: ${theme.colors.error};
    background: ${theme.colors.gray100};
  }
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
`;

const ModalFooter = styled.div`
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ColorPicker = styled.input`
  width: 60px;
  height: 40px;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  background: none;

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const OrderItem = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isDragging',
})`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  cursor: grab;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }

  ${props => props.isDragging && `
    opacity: 0.8;
    transform: scale(1.02);
    cursor: grabbing;
  `}
`;

const DragHandle = styled.div`
  color: ${theme.colors.gray400};
  cursor: grab;
`;

const OrderItemContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const OrderItemIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.color || `${theme.colors.primary}20`};
  color: ${props => props.textColor || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

const OrderItemInfo = styled.div``;

const OrderItemName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;
`;

const OrderItemType = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const OrderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const OrderButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.gray300};
  color: ${theme.colors.gray600};
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const ContentManagementTab = ({ dealer }) => {
  const dispatch = useDispatch();
  const reduxSections = useSelector(selectPageSections);
  const vendor = useSelector(selectVendor);
  
  // Local state for UI and modal management
  const [sections, setSections] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [customSectionModal, setCustomSectionModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  // Section configuration with form fields
  const sectionConfigs = {
    hero: {
      name: 'Hero Section',
      description: 'Main banner with dealer branding and call-to-action',
      icon: FaImage,
      color: `${theme.colors.blue500}20`,
      textColor: theme.colors.blue500,
      fields: [
        { name: 'title', label: 'Main Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
        { name: 'backgroundImage', label: 'Background Image URL', type: 'url' },
        { name: 'primaryColor', label: 'Primary Color', type: 'color' },
        { name: 'secondaryColor', label: 'Secondary Color', type: 'color' },
        { name: 'ctaText', label: 'Call-to-Action Text', type: 'text' },
        { name: 'ctaLink', label: 'Call-to-Action Link', type: 'text' },
      ]
    },
    categories: {
      name: 'Browse by Category',
      description: 'Display vehicle categories for easy browsing',
      icon: FaList,
      color: `${theme.colors.green500}20`,
      textColor: theme.colors.green500,
      fields: [
        { name: 'title', label: 'Section Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
        { name: 'showCount', label: 'Show Vehicle Count', type: 'checkbox' },
        { name: 'displayStyle', label: 'Display Style', type: 'select', options: ['grid', 'list', 'carousel'] },
      ]
    },
    featured: {
      name: 'Featured Vehicles',
      description: 'Showcase handpicked vehicles from your inventory',
      icon: FaCar,
      color: `${theme.colors.purple500}20`,
      textColor: theme.colors.purple500,
      fields: [
        { name: 'title', label: 'Section Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
        { name: 'maxVehicles', label: 'Maximum Vehicles to Show', type: 'number', min: 1, max: 12 },
        { name: 'showPricing', label: 'Show Pricing', type: 'checkbox' },
        { name: 'showBadges', label: 'Show Feature Badges', type: 'checkbox' },
      ]
    },
    'special-offers': {
      name: 'Special Offers',
      description: 'Highlight vehicles with special pricing or promotions',
      icon: FaCar,
      color: `${theme.colors.red500}20`,
      textColor: theme.colors.red500,
      fields: [
        { name: 'title', label: 'Section Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
        { name: 'maxOffers', label: 'Maximum Offers to Show', type: 'number', min: 1, max: 8 },
        { name: 'highlightSavings', label: 'Highlight Savings Amount', type: 'checkbox' },
        { name: 'showCountdown', label: 'Show Offer Countdown', type: 'checkbox' },
      ]
    },
    footer: {
      name: 'Footer',
      description: 'Contact information and dealership details',
      icon: FaAlignLeft,
      color: `${theme.colors.gray500}20`,
      textColor: theme.colors.gray500,
      fields: [
        { name: 'showSocialMedia', label: 'Show Social Media Links', type: 'checkbox' },
        { name: 'showHours', label: 'Show Business Hours', type: 'checkbox' },
        { name: 'showMap', label: 'Show Location Map', type: 'checkbox' },
        { name: 'customText', label: 'Custom Footer Text', type: 'textarea' },
        { name: 'backgroundColor', label: 'Background Color', type: 'color' },
      ]
    }
  };

  const customSectionTypes = [
    {
      id: 'text-content',
      name: 'Text Content',
      description: 'Add custom text blocks, announcements, or information',
      icon: FaAlignLeft,
      color: `${theme.colors.blue500}20`,
      textColor: theme.colors.blue500,
      fields: [
        { name: 'title', label: 'Section Title', type: 'text', required: true },
        { name: 'content', label: 'Content', type: 'textarea', required: true },
        { name: 'alignment', label: 'Text Alignment', type: 'select', options: ['left', 'center', 'right'] },
        { name: 'backgroundColor', label: 'Background Color', type: 'color' },
      ]
    },
    {
      id: 'vehicle-showcase',
      name: 'Vehicle Showcase',
      description: 'Create additional vehicle displays or highlights',
      icon: FaCar,
      color: `${theme.colors.green500}20`,
      textColor: theme.colors.green500,
      fields: [
        { name: 'title', label: 'Section Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
        { name: 'filterBy', label: 'Filter Vehicles By', type: 'select', options: ['category', 'make', 'condition', 'price-range'] },
        { name: 'filterValue', label: 'Filter Value', type: 'text' },
        { name: 'displayCount', label: 'Number of Vehicles', type: 'number', min: 1, max: 12 },
      ]
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      description: 'Display dealership photos, awards, or team pictures',
      icon: FaImage,
      color: `${theme.colors.purple500}20`,
      textColor: theme.colors.purple500,
      fields: [
        { name: 'title', label: 'Gallery Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Gallery Description', type: 'textarea' },
        { name: 'images', label: 'Image URLs (one per line)', type: 'textarea', required: true },
        { name: 'layoutStyle', label: 'Layout Style', type: 'select', options: ['grid', 'masonry', 'carousel'] },
      ]
    },
    {
      id: 'info-cards',
      name: 'Information Cards',
      description: 'Services, certifications, or key dealership features',
      icon: FaList,
      color: `${theme.colors.orange500}20`,
      textColor: theme.colors.orange500,
      fields: [
        { name: 'title', label: 'Section Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
        { name: 'cards', label: 'Cards (JSON format)', type: 'textarea', required: true, placeholder: '[{"title": "Service", "description": "Description", "icon": "icon-name"}]' },
        { name: 'cardsPerRow', label: 'Cards Per Row', type: 'number', min: 1, max: 4 },
      ]
    }
  ];

  // Initialize sections with default content from vendor data
  const initializeSections = (reduxSections) => {
    const iconMapping = {
      'hero': FaImage,
      'categories': FaList,
      'featured': FaCar,
      'special-offers': FaCar,
      'footer': FaAlignLeft,
    };

    return reduxSections.map(section => ({
      ...section,
      icon: iconMapping[section.id] || FaEdit,
      content: section.content || getDefaultContent(section.id),
    }));
  };

  const getDefaultContent = (sectionId) => {
    const defaults = {
      hero: {
        title: vendor?.name || 'Welcome to Our Dealership',
        subtitle: vendor?.businessInfo?.description || 'Your trusted automotive partner',
        backgroundImage: vendor?.businessInfo?.coverImage || '',
        primaryColor: vendor?.theme?.primaryColor || theme.colors.primary,
        secondaryColor: vendor?.theme?.secondaryColor || theme.colors.secondary,
        ctaText: 'Browse Vehicles',
        ctaLink: '/vehicles',
      },
      categories: {
        title: 'Browse by Category',
        subtitle: 'Explore our diverse range of vehicles across different categories',
        showCount: true,
        displayStyle: 'grid',
      },
      featured: {
        title: 'Featured Vehicles',
        subtitle: `Handpicked vehicles from ${vendor?.name || 'our dealership'} that customers love the most`,
        maxVehicles: 4,
        showPricing: true,
        showBadges: true,
      },
      'special-offers': {
        title: '🔥 Special Offers',
        subtitle: `Limited time deals from ${vendor?.name || 'our dealership'} you don't want to miss`,
        maxOffers: 4,
        highlightSavings: true,
        showCountdown: false,
      },
      footer: {
        showSocialMedia: true,
        showHours: true,
        showMap: true,
        customText: '',
        backgroundColor: theme.colors.gray900,
      },
    };

    return defaults[sectionId] || {};
  };

  const handleSectionClick = (section) => {
    setEditingSection({ ...section });
    setActiveModal(section.id);
  };

  const handleOrderClick = () => {
    setOrderModal(true);
  };

  const handleAddCustomSection = () => {
    setCustomSectionModal(true);
  };

  const toggleSectionVisibility = (sectionId, event) => {
    event.stopPropagation();
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    ));
    setHasChanges(true);
  };

  const saveSection = () => {
    setSections(sections.map(section => 
      section.id === editingSection.id ? editingSection : section
    ));
    setHasChanges(true);
    setActiveModal(null);
    setEditingSection(null);
  };

  const saveSectionOrder = () => {
    setHasChanges(true);
    setOrderModal(false);
  };

  const addCustomSection = (type) => {
    const typeConfig = customSectionTypes.find(t => t.id === type);
    const newSection = {
      id: `custom-${Date.now()}`,
      name: typeConfig.name,
      description: typeConfig.description,
      icon: typeConfig.icon,
      type: 'custom',
      customType: type,
      visible: true,
      order: sections.length + 1,
      content: {},
    };

    setSections([...sections, newSection]);
    setCustomSectionModal(false);
    setHasChanges(true);
  };

  const removeCustomSection = (sectionId) => {
    setSections(sections.filter(s => s.id !== sectionId));
    setHasChanges(true);
  };

  const saveChanges = () => {
    const sectionsToSave = sections.map(({ icon, ...section }) => section);
    dispatch(updatePageSections(sectionsToSave));
    localStorage.setItem(`dealership-content-${dealer.slug}`, JSON.stringify(sectionsToSave));
    setHasChanges(false);
    alert('Changes saved successfully!');
  };

  const publishChanges = () => {
    const sectionsToSave = sections.map(({ icon, ...section }) => section);
    dispatch(publishPageContent(sectionsToSave));
    localStorage.setItem(`dealership-content-${dealer.slug}`, JSON.stringify(sectionsToSave));
    setHasChanges(false);
    alert('Changes published successfully! Your dealership page has been updated and is now live.');
  };

  const renderFormField = (field, value, onChange) => {
    const commonProps = {
      id: field.name,
      value: value || '',
      onChange: (e) => onChange(field.name, e.target.value),
      required: field.required,
    };

    switch (field.type) {
      case 'textarea':
        return <TextArea {...commonProps} placeholder={field.placeholder} />;
      case 'select':
        return (
          <Select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </Select>
        );
      case 'number':
        return <Input {...commonProps} type="number" min={field.min} max={field.max} />;
      case 'color':
        return <ColorPicker {...commonProps} type="color" />;
      case 'checkbox':
        return (
          <Input
            type="checkbox"
            id={field.name}
            checked={value || false}
            onChange={(e) => onChange(field.name, e.target.checked)}
            style={{ width: 'auto' }}
          />
        );
      case 'url':
        return <Input {...commonProps} type="url" placeholder="https://example.com/image.jpg" />;
      case 'file':
        return <FileInput {...commonProps} type="file" accept="image/*" />;
      default:
        return <Input {...commonProps} type="text" placeholder={field.placeholder} />;
    }
  };

  const handleDragStart = (e, sectionId) => {
    setDraggedItem(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetSectionId) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetSectionId) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = sections.findIndex(s => s.id === draggedItem);
    const targetIndex = sections.findIndex(s => s.id === targetSectionId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      return;
    }

    const newSections = [...sections];
    const [draggedSection] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, draggedSection);

    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    setSections(updatedSections);
    setDraggedItem(null);
    setHasChanges(true);
  };

  const moveSection = (sectionId, direction) => {
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const newSections = [...sections];
    [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];

    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    setSections(updatedSections);
    setHasChanges(true);
  };

  // Load sections from Redux on component mount
  useEffect(() => {
    if (reduxSections && reduxSections.length > 0) {
      setSections(initializeSections(reduxSections));
    } else {
      const saved = localStorage.getItem(`dealership-content-${dealer.slug}`);
      if (saved) {
        try {
          const savedSections = JSON.parse(saved);
          setSections(initializeSections(savedSections));
          dispatch(updatePageSections(savedSections));
        } catch (error) {
          console.error('Failed to load saved sections:', error);
        }
      } else {
        setSections(initializeSections(reduxSections));
      }
    }
  }, [reduxSections, dealer.slug, dispatch, vendor]);

  // Reset hasChanges when sections match Redux state
  useEffect(() => {
    if (reduxSections && sections.length > 0) {
      const currentSectionsData = sections.map(({ icon, ...section }) => section);
      const hasChangedData = JSON.stringify(currentSectionsData) !== JSON.stringify(reduxSections);
      setHasChanges(hasChangedData);
    }
  }, [sections, reduxSections]);

  return (
    <>
      <ContentContainer>
        <ContentHeader>
          <HeaderLeft>
            <HeaderTitle>Page Content Management</HeaderTitle>
          </HeaderLeft>
          <HeaderActions>
            <ActionButton 
              onClick={saveChanges}
              disabled={!hasChanges}
              color={theme.colors.blue500}
            >
              <FaSave />
              Save Changes
            </ActionButton>
            <ActionButton 
              onClick={publishChanges}
              disabled={!hasChanges}
              filled
              color={theme.colors.success}
            >
              <FaGlobe />
              Save & Go Public
            </ActionButton>
          </HeaderActions>
        </ContentHeader>

        <SectionsContainer>
          <SectionsGrid>
            {/* Section Order Card */}
            <SectionCard 
              color={theme.colors.gray600}
              onClick={handleOrderClick}
            >
              <CardIcon color={`${theme.colors.gray600}20`} textColor={theme.colors.gray600}>
                <FaSort />
              </CardIcon>
              <CardTitle>Section Order</CardTitle>
              <CardDescription>
                Arrange the order of all page sections using drag and drop
              </CardDescription>
              <CardFooter>
                <CardBadge color={`${theme.colors.gray600}20`} textColor={theme.colors.gray600}>
                  System
                </CardBadge>
              </CardFooter>
            </SectionCard>

            {/* Default Section Cards */}
            {sections
              .filter(section => section.type === 'default' || !section.type)
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const config = sectionConfigs[section.id];
                if (!config) return null;

                return (
                  <SectionCard
                    key={section.id}
                    isVisible={section.visible}
                    color={config.textColor}
                    onClick={() => handleSectionClick(section)}
                  >
                    <CardIcon color={config.color} textColor={config.textColor}>
                      <config.icon />
                    </CardIcon>
                    <CardTitle>{config.name}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                    <CardFooter>
                      <CardBadge color={config.color} textColor={config.textColor}>
                        Default
                      </CardBadge>
                      <VisibilityButton
                        visible={section.visible}
                        onClick={(e) => toggleSectionVisibility(section.id, e)}
                      >
                        {section.visible ? <FaEye /> : <FaEyeSlash />}
                      </VisibilityButton>
                    </CardFooter>
                  </SectionCard>
                );
              })}

            {/* Custom Section Cards */}
            {sections
              .filter(section => section.type === 'custom')
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const typeConfig = customSectionTypes.find(t => t.id === section.customType);
                const colors = typeConfig ? {
                  color: typeConfig.color,
                  textColor: typeConfig.textColor,
                } : {
                  color: `${theme.colors.primary}20`,
                  textColor: theme.colors.primary,
                };

                return (
                  <SectionCard
                    key={section.id}
                    isVisible={section.visible}
                    color={colors.textColor}
                    onClick={() => handleSectionClick(section)}
                  >
                    <CardIcon color={colors.color} textColor={colors.textColor}>
                      <section.icon />
                    </CardIcon>
                    <CardTitle>{section.name}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                    <CardFooter>
                      <CardBadge color={colors.color} textColor={colors.textColor}>
                        Custom
                      </CardBadge>
                      <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                        <VisibilityButton
                          visible={section.visible}
                          onClick={(e) => toggleSectionVisibility(section.id, e)}
                        >
                          {section.visible ? <FaEye /> : <FaEyeSlash />}
                        </VisibilityButton>
                        <VisibilityButton
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCustomSection(section.id);
                          }}
                          style={{ color: theme.colors.error }}
                        >
                          <FaTimes />
                        </VisibilityButton>
                      </div>
                    </CardFooter>
                  </SectionCard>
                );
              })}

            {/* Add Custom Section Card */}
            <AddSectionCard onClick={handleAddCustomSection}>
              <AddIcon>
                <FaPlus />
              </AddIcon>
              <AddTitle>Add Custom Section</AddTitle>
              <AddDescription>
                Create a custom content section for your dealership page
              </AddDescription>
            </AddSectionCard>
          </SectionsGrid>
        </SectionsContainer>
      </ContentContainer>

      {/* Section Order Modal */}
      <Modal isOpen={orderModal} maxWidth="700px">
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Section Order</ModalTitle>
            <CloseButton onClick={() => setOrderModal(false)}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <OrderList>
              {sections
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                  const config = sectionConfigs[section.id] || customSectionTypes.find(t => t.id === section.customType);
                  const colors = config ? {
                    color: config.color,
                    textColor: config.textColor,
                  } : {
                    color: `${theme.colors.primary}20`,
                    textColor: theme.colors.primary,
                  };

                  return (
                    <OrderItem
                      key={section.id}
                      isDragging={draggedItem === section.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, section.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, section.id)}
                    >
                      <DragHandle>
                        <FaGripVertical />
                      </DragHandle>
                      <OrderItemContent>
                        <OrderItemIcon color={colors.color} textColor={colors.textColor}>
                          <section.icon />
                        </OrderItemIcon>
                        <OrderItemInfo>
                          <OrderItemName>{section.name}</OrderItemName>
                          <OrderItemType>
                            {section.type === 'custom' ? 'Custom' : 'Default'} Section
                          </OrderItemType>
                        </OrderItemInfo>
                      </OrderItemContent>
                      <OrderActions>
                        <OrderButton onClick={() => moveSection(section.id, 'up')}>
                          <FaArrowUp />
                        </OrderButton>
                        <OrderButton onClick={() => moveSection(section.id, 'down')}>
                          <FaArrowDown />
                        </OrderButton>
                      </OrderActions>
                    </OrderItem>
                  );
                })}
            </OrderList>
          </ModalBody>
          <ModalFooter>
            <ActionButton onClick={() => setOrderModal(false)}>
              Cancel
            </ActionButton>
            <ActionButton filled onClick={saveSectionOrder}>
              Save Order
            </ActionButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Section Edit Modal */}
      <Modal isOpen={!!activeModal && activeModal !== 'custom'}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              Edit {editingSection?.name || 'Section'}
            </ModalTitle>
            <CloseButton onClick={() => setActiveModal(null)}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            {editingSection && (
              <>
                {/* Get field configuration */}
                {(() => {
                  const config = editingSection.type === 'custom' 
                    ? customSectionTypes.find(t => t.id === editingSection.customType)
                    : sectionConfigs[editingSection.id];
                  
                  return config?.fields?.map((field) => (
                    <FormGroup key={field.name}>
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && '*'}
                      </Label>
                      {renderFormField(
                        field,
                        editingSection.content?.[field.name],
                        (fieldName, value) => {
                          setEditingSection({
                            ...editingSection,
                            content: {
                              ...editingSection.content,
                              [fieldName]: value,
                            },
                          });
                        }
                      )}
                    </FormGroup>
                  ));
                })()}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <ActionButton onClick={() => setActiveModal(null)}>
              Cancel
            </ActionButton>
            <ActionButton filled onClick={saveSection}>
              Save Section
            </ActionButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Custom Section Modal */}
      <Modal isOpen={customSectionModal}>
        <ModalContent maxWidth="800px">
          <ModalHeader>
            <ModalTitle>Add Custom Section</ModalTitle>
            <CloseButton onClick={() => setCustomSectionModal(false)}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <SectionsGrid>
              {customSectionTypes.map((type) => (
                <SectionCard 
                  key={type.id} 
                  color={type.textColor}
                  onClick={() => addCustomSection(type.id)}
                >
                  <CardIcon color={type.color} textColor={type.textColor}>
                    <type.icon />
                  </CardIcon>
                  <CardTitle>{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                  <CardFooter>
                    <CardBadge color={type.color} textColor={type.textColor}>
                      Custom
                    </CardBadge>
                  </CardFooter>
                </SectionCard>
              ))}
            </SectionsGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContentManagementTab;
