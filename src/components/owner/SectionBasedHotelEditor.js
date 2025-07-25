import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaImage,
  FaInfo,
  FaStar,
  FaCamera,
  FaConciergeBell,
  FaMapMarkerAlt,
  FaTimes,
  FaSave,
  FaEdit,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  setEditingHotel,
  updateHotelField,
  updateHotelImage,
  addHotelImage,
  removeHotelImage,
  updateAmenities,
  saveChanges,
  toggleSectionVisibility,
  updateFeatures,
  addFeature,
  removeFeature,
  updateAmenityCategories,
  addAmenityCategory,
  addAmenityToCategory,
  removeAmenityFromCategory,
} from '../../store/slices/hotelManagementSlice';
import { useAppContext } from '../../context/AppContext';
import { getHotelByIdOrSlug, amenitiesList } from '../../DummyData/hotels';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

const EditorContainer = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.gray50};
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${theme.colors.gray600};
  font-size: 1.1rem;
`;

const HotelSelector = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const HotelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const HotelSelectCard = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? theme.colors.primary : theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background: ${theme.colors.white};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
  }
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const SectionCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isVisible',
})`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  opacity: ${props => props.isVisible ? 1 : 0.6};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const ToggleSwitch = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${props => props.active ? theme.colors.primary : theme.colors.gray300};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${props => props.active ? '22px' : '2px'};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const SectionInfo = styled.div`
  flex: 1;
`;

const SaveGoLiveBar = styled.div`
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
  min-width: 300px;
`;

const SaveGoLiveButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.success}, ${theme.colors.successDark});
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChangesIndicator = styled.div`
  color: ${theme.colors.warning};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const SectionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const SectionDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const SectionPreview = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
  border-left: 3px solid ${theme.colors.primary};
`;

const Overlay = styled.div`
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

const Modal = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
  }
`;

const ModalContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const FormField = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const ImageItem = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  
  &.has-image {
    border: none;
  }
`;

const ImageDisplay = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ImageActions = styled.div`
  position: absolute;
  top: ${theme.spacing.xs};
  right: ${theme.spacing.xs};
  display: flex;
  gap: ${theme.spacing.xs};
`;

const ImageButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs};
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: ${theme.colors.white};
  }
`;

const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.gray500};
  font-size: 0.9rem;
  text-align: center;
  padding: ${theme.spacing.sm};
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? theme.colors.primary : theme.colors.white};
  color: ${props => props.selected ? theme.colors.white : theme.colors.gray700};
  
  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ModalFooter = styled.div`
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
`;

const FeaturesList = styled.div`
  margin-top: ${theme.spacing.md};
`;

const FeatureItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  align-items: flex-start;
`;

const RemoveButton = styled.button`
  background: ${theme.colors.error};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs};
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.errorDark};
  }
`;

const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const AmenityCategoryItem = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};
`;

const AmenityCategoryHeader = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const AmenityItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const AmenityTag = styled.div`
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const AddAmenityForm = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const SectionBasedHotelEditor = ({ setActiveSection }) => {
  const dispatch = useDispatch();
  const { ownerHotels } = useAppContext();
  const {
    editingHotel,
    hasUnsavedChanges,
    changes,
    sectionVisibility,
  } = useSelector(state => state.hotelManagement);

  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [tempData, setTempData] = useState({});
  const [newAmenityInputs, setNewAmenityInputs] = useState({});

  // Auto-select first hotel if none selected
  useEffect(() => {
    if (!editingHotel && ownerHotels.length > 0) {
      if (!selectedHotelId) {
        setSelectedHotelId(ownerHotels[0].id);
      }
      if (selectedHotelId) {
        const hotelData = getHotelByIdOrSlug(selectedHotelId);
        if (hotelData) {
          dispatch(setEditingHotel(selectedHotelId));
        }
      }
    }
  }, [selectedHotelId, editingHotel, ownerHotels, dispatch]);

  const openModal = (sectionType) => {
    setActiveModal(sectionType);
    // Initialize temp data with current hotel data - exactly as it appears on hotel detail page
    if (editingHotel) {
      setTempData({
        name: editingHotel.name || '',
        heroSubtitle: editingHotel.heroSubtitle || `Experience luxury hospitality in the heart of ${editingHotel.city || 'your city'}`,
        description: editingHotel.description || '',
        image: editingHotel.image || '',
        gallery: editingHotel.gallery || [
          { title: 'Hotel Exterior', image: editingHotel.images?.[0] || '' },
          { title: 'Luxury Rooms', image: editingHotel.images?.[1] || '' },
          { title: 'Dining Experience', image: editingHotel.images?.[2] || '' },
          { title: 'Swimming Pool', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3' },
          { title: 'Spa & Wellness', image: 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3' },
        ],
        amenities: editingHotel.amenities || [],
        address: editingHotel.address || '',
        phone: editingHotel.phone || '+91 22 6601 1825',
        email: editingHotel.email || `reservations@${editingHotel.slug || 'hotel'}.com`,
        checkInTime: editingHotel.checkInTime || '3:00 PM',
        checkOutTime: editingHotel.checkOutTime || '11:00 AM',
        features: editingHotel.features || [
          {
            title: '24/7 Concierge',
            description: 'Our dedicated concierge team is available round-the-clock to assist with all your needs.',
          },
          {
            title: 'Luxury Amenities',
            description: 'Enjoy world-class facilities including spa, pool, and fine dining restaurants.',
          },
          {
            title: 'Business Center',
            description: 'Fully equipped business facilities for meetings and corporate events.',
          },
          {
            title: 'Airport Transfer',
            description: 'Complimentary airport shuttle service for all our guests.',
          },
        ],
        amenityCategories: editingHotel.amenityCategories || [
          {
            title: 'Recreation',
            items: ['Swimming Pool', 'Fitness Center', 'Spa & Wellness']
          },
          {
            title: 'Dining',
            items: ['Fine Dining Restaurant', 'Rooftop Bar', 'Room Service']
          },
          {
            title: 'Business',
            items: ['Business Center', 'Meeting Rooms', 'Free WiFi']
          },
          {
            title: 'Services',
            items: ['24/7 Concierge', 'Valet Parking', 'Airport Transfer']
          },
        ],
        contactFields: editingHotel.contactFields || [
          { label: 'Address', value: editingHotel.address || '' },
          { label: 'Phone', value: editingHotel.phone || '+91 22 6601 1825' },
          { label: 'Email', value: editingHotel.email || `reservations@${editingHotel.slug || 'hotel'}.com` },
          { label: 'Check-in / Check-out', value: `${editingHotel.checkInTime || '3:00 PM'} / ${editingHotel.checkOutTime || '11:00 AM'}` },
        ]
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setTempData({});
  };

  const saveSection = () => {
    if (!editingHotel) return;

    // Only update the local editing hotel state, NOT the global live data
    Object.keys(tempData).forEach(key => {
      if (tempData[key] !== undefined) {
        if (key === 'features') {
          dispatch(updateFeatures(tempData[key]));
        } else if (key === 'amenityCategories') {
          dispatch(updateAmenityCategories(tempData[key]));
        } else if (key === 'gallery') {
          dispatch(updateHotelField({ field: 'gallery', value: tempData[key] }));
        } else if (key === 'contactFields') {
          dispatch(updateHotelField({ field: 'contactFields', value: tempData[key] }));
        } else {
          dispatch(updateHotelField({ field: key, value: tempData[key] }));
        }
      }
    });

    // DON'T save to global state here - only save to editing state
    closeModal();
    alert('Section updated! Click "Save & Go Live" to publish changes to the live hotel page.');
  };

  const updateTempData = (field, value) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageEdit = (index, isMainImage = false) => {
    const currentUrl = isMainImage ? tempData.image : tempData.images?.[index];
    const newUrl = prompt('Enter new image URL:', currentUrl);
    if (newUrl && newUrl !== currentUrl) {
      if (isMainImage) {
        updateTempData('image', newUrl);
      } else {
        const newImages = [...(tempData.images || [])];
        newImages[index] = newUrl;
        updateTempData('images', newImages);
      }
    }
  };

  const addImage = () => {
    const newUrl = prompt('Enter image URL:');
    if (newUrl) {
      const newImages = [...(tempData.images || []), newUrl];
      updateTempData('images', newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = tempData.images.filter((_, i) => i !== index);
    updateTempData('images', newImages);
  };

  const toggleAmenity = (amenityId) => {
    const currentAmenities = tempData.amenities || [];
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    updateTempData('amenities', newAmenities);
  };

  const addFeatureItem = () => {
    const newFeature = {
      title: '',
      description: ''
    };
    const newFeatures = [...(tempData.features || []), newFeature];
    updateTempData('features', newFeatures);
  };

  const removeFeatureItem = (index) => {
    const newFeatures = tempData.features.filter((_, i) => i !== index);
    updateTempData('features', newFeatures);
  };

  const updateFeatureItem = (index, field, value) => {
    const newFeatures = tempData.features.map((feature, i) => {
      if (i === index) {
        return { ...feature, [field]: value };
      }
      return feature;
    });
    updateTempData('features', newFeatures);
  };

  const addAmenityItem = (categoryIndex) => {
    const input = newAmenityInputs[categoryIndex];
    if (input && input.trim()) {
      const newCategories = tempData.amenityCategories.map((category, index) => {
        if (index === categoryIndex) {
          return {
            ...category,
            items: [...category.items, input.trim()]
          };
        }
        return category;
      });
      updateTempData('amenityCategories', newCategories);
      setNewAmenityInputs(prev => ({ ...prev, [categoryIndex]: '' }));
    }
  };

  const removeAmenityItem = (categoryIndex, itemIndex) => {
    const newCategories = tempData.amenityCategories.map((category, index) => {
      if (index === categoryIndex) {
        return {
          ...category,
          items: category.items.filter((_, i) => i !== itemIndex)
        };
      }
      return category;
    });
    updateTempData('amenityCategories', newCategories);
  };

  const updateCategoryTitle = (categoryIndex, title) => {
    const newCategories = tempData.amenityCategories.map((category, index) => {
      if (index === categoryIndex) {
        return {
          ...category,
          title: title
        };
      }
      return category;
    });
    updateTempData('amenityCategories', newCategories);
  };

  const addAmenityCategory = () => {
    const newCategory = {
      title: '',
      items: []
    };
    const newCategories = [...tempData.amenityCategories, newCategory];
    updateTempData('amenityCategories', newCategories);
  };

  const handleSectionToggle = (sectionId) => {
    dispatch(toggleSectionVisibility({ section: sectionId }));
  };

  // Gallery management functions
  const addGalleryItem = () => {
    const newGallery = [...(tempData.gallery || []), { title: '', image: '' }];
    updateTempData('gallery', newGallery);
  };

  const removeGalleryItem = (index) => {
    const newGallery = tempData.gallery.filter((_, i) => i !== index);
    updateTempData('gallery', newGallery);
  };

  const updateGalleryItem = (index, field, value) => {
    const newGallery = tempData.gallery.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateTempData('gallery', newGallery);
  };

  // Contact fields management
  const addContactField = () => {
    const newContactFields = [...(tempData.contactFields || []), { label: '', value: '' }];
    updateTempData('contactFields', newContactFields);
  };

  const removeContactField = (index) => {
    const newContactFields = tempData.contactFields.filter((_, i) => i !== index);
    updateTempData('contactFields', newContactFields);
  };

  const updateContactField = (index, field, value) => {
    const newContactFields = tempData.contactFields.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateTempData('contactFields', newContactFields);
  };

  const handleSaveAndGoLive = () => {
    if (!editingHotel || !hasUnsavedChanges) return;

    // Save all changes to global state (this will update the live hotel page)
    dispatch(saveChanges());
    alert('All changes published to live hotel page successfully!');
  };

  if (!editingHotel) {
    return (
      <EditorContainer>
        <Header>
          <Title>Hotel Content Editor</Title>
          <Subtitle>Select a hotel to edit its content</Subtitle>
        </Header>

        <HotelSelector>
          <HotelGrid>
            {ownerHotels.map(hotel => (
              <HotelSelectCard
                key={hotel.id}
                onClick={() => setSelectedHotelId(hotel.id)}
                selected={selectedHotelId === hotel.id}
              >
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover'
                  }} 
                />
                <div style={{ padding: theme.spacing.lg }}>
                  <h3 style={{ marginBottom: theme.spacing.sm }}>{hotel.name}</h3>
                  <p style={{ color: theme.colors.gray600 }}>{hotel.location}</p>
                </div>
              </HotelSelectCard>
            ))}
          </HotelGrid>
        </HotelSelector>
      </EditorContainer>
    );
  }

  const sections = [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Update background image and hotel title',
      icon: FaImage,
      preview: `${editingHotel.name} - ${editingHotel.city}`,
      isVisible: sectionVisibility.hero
    },
    {
      id: 'about',
      title: 'About Section',
      description: 'Edit hotel description and story',
      icon: FaInfo,
      preview: editingHotel.description?.substring(0, 100) + '...' || 'No description set',
      isVisible: sectionVisibility.about
    },
    {
      id: 'features',
      title: 'Why Choose Us',
      description: 'Manage hotel features and benefits',
      icon: FaStar,
      preview: `${editingHotel.features?.length || 4} features configured`,
      isVisible: sectionVisibility.features
    },
    {
      id: 'gallery',
      title: 'Hotel Gallery',
      description: 'Manage hotel images and gallery',
      icon: FaCamera,
      preview: `${editingHotel.gallery?.length || 5} gallery items`,
      isVisible: sectionVisibility.gallery
    },
    {
      id: 'amenities',
      title: 'World-Class Amenities',
      description: 'Update hotel amenities and services',
      icon: FaConciergeBell,
      preview: `${editingHotel.amenityCategories?.length || 4} categories`,
      isVisible: sectionVisibility.amenities
    },
    {
      id: 'contact',
      title: 'Location & Contact',
      description: 'Update contact information and address',
      icon: FaMapMarkerAlt,
      preview: `${editingHotel.contactFields?.length || 4} contact fields`,
      isVisible: sectionVisibility.contact
    }
  ];

  return (
    <EditorContainer>
      <Header>
        <Title>Editing: {editingHotel.name}</Title>
        <Subtitle>Click on any section below to edit its content</Subtitle>
      </Header>

      <SectionsGrid>
        {sections.map(section => (
          <SectionCard
            key={section.id}
            isVisible={section.isVisible}
            onClick={(e) => {
              if (e.target.closest('.toggle-switch')) return;
              openModal(section.id);
            }}
          >
            <SectionHeader>
              <SectionInfo>
                <SectionIcon>
                  <section.icon />
                </SectionIcon>
                <SectionTitle>{section.title}</SectionTitle>
                <SectionDescription>{section.description}</SectionDescription>
              </SectionInfo>
              <ToggleSwitch
                className="toggle-switch"
                active={section.isVisible}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSectionToggle(section.id);
                }}
              />
            </SectionHeader>
            <SectionPreview>{section.preview}</SectionPreview>
          </SectionCard>
        ))}
      </SectionsGrid>

      {/* Modal Overlays */}
      {activeModal && (
        <Overlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                Edit {sections.find(s => s.id === activeModal)?.title}
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <ModalContent>
              {activeModal === 'hero' && (
                <>
                  <FormField>
                    <Label>Hotel Name</Label>
                    <Input
                      value={tempData.name || ''}
                      onChange={(e) => updateTempData('name', e.target.value)}
                      placeholder="Enter hotel name"
                    />
                  </FormField>
                  <FormField>
                    <Label>Hero Subtitle</Label>
                    <TextArea
                      value={tempData.heroSubtitle || ''}
                      onChange={(e) => updateTempData('heroSubtitle', e.target.value)}
                      placeholder="Enter hero subtitle"
                      rows={3}
                    />
                  </FormField>
                  <FormField>
                    <Label>Background Image</Label>
                    <Input
                      value={tempData.image || ''}
                      onChange={(e) => updateTempData('image', e.target.value)}
                      placeholder="Enter image URL"
                    />
                    {tempData.image && (
                      <div style={{ marginTop: theme.spacing.md }}>
                        <img 
                          src={tempData.image} 
                          alt="Preview" 
                          style={{ 
                            width: '100%', 
                            height: '200px', 
                            objectFit: 'cover',
                            borderRadius: theme.borderRadius.md
                          }} 
                        />
                      </div>
                    )}
                  </FormField>
                </>
              )}

              {activeModal === 'about' && (
                <FormField>
                  <Label>Hotel Description</Label>
                  <TextArea
                    value={tempData.description || ''}
                    onChange={(e) => updateTempData('description', e.target.value)}
                    placeholder="Enter hotel description"
                    rows={8}
                  />
                </FormField>
              )}

              {activeModal === 'gallery' && (
                <FormField>
                  <Label>Hotel Gallery</Label>
                  <p style={{ color: theme.colors.gray600, marginBottom: theme.spacing.md }}>
                    Manage gallery images with titles for better organization.
                  </p>
                  {tempData.gallery?.map((item, index) => (
                    <div key={index} style={{
                      marginBottom: theme.spacing.lg,
                      padding: theme.spacing.md,
                      border: `1px solid ${theme.colors.gray200}`,
                      borderRadius: theme.borderRadius.md
                    }}>
                      <div style={{ display: 'flex', gap: theme.spacing.md, alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <FormField>
                            <Label>Image Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => updateGalleryItem(index, 'title', e.target.value)}
                              placeholder="e.g., Hotel Exterior, Luxury Rooms"
                            />
                          </FormField>
                          <FormField>
                            <Label>Image URL</Label>
                            <Input
                              value={item.image}
                              onChange={(e) => updateGalleryItem(index, 'image', e.target.value)}
                              placeholder="Enter image URL"
                            />
                          </FormField>
                        </div>
                        {item.image && (
                          <div style={{ width: '120px', height: '80px' }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: theme.borderRadius.md
                              }}
                            />
                          </div>
                        )}
                        <RemoveButton onClick={() => removeGalleryItem(index)}>
                          <FaTrash />
                        </RemoveButton>
                      </div>
                    </div>
                  ))}
                  <AddButton onClick={addGalleryItem}>
                    <FaPlus /> Add Gallery Item
                  </AddButton>
                </FormField>
              )}

              {activeModal === 'amenities' && (
                <FormField>
                  <Label>Hotel Amenity Categories</Label>
                  <p style={{ color: theme.colors.gray600, marginBottom: theme.spacing.md }}>
                    Organize your amenities into categories with custom headers and items.
                  </p>
                  {tempData.amenityCategories?.map((category, categoryIndex) => (
                    <AmenityCategoryItem key={categoryIndex}>
                      <AmenityCategoryHeader>
                        <Input
                          value={category.title}
                          onChange={(e) => updateCategoryTitle(categoryIndex, e.target.value)}
                          placeholder="Category title (e.g., Recreation)"
                          style={{ flex: 1 }}
                        />
                      </AmenityCategoryHeader>

                      <AmenityItemsContainer>
                        {category.items.map((item, itemIndex) => (
                          <AmenityTag key={itemIndex}>
                            {item}
                            <button
                              onClick={() => removeAmenityItem(categoryIndex, itemIndex)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                marginLeft: theme.spacing.xs,
                                cursor: 'pointer'
                              }}
                            >
                              <FaTimes />
                            </button>
                          </AmenityTag>
                        ))}
                      </AmenityItemsContainer>

                      <AddAmenityForm>
                        <Input
                          value={newAmenityInputs[categoryIndex] || ''}
                          onChange={(e) => setNewAmenityInputs(prev => ({
                            ...prev,
                            [categoryIndex]: e.target.value
                          }))}
                          placeholder="Add new amenity"
                          style={{ flex: 1 }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addAmenityItem(categoryIndex);
                            }
                          }}
                        />
                        <Button
                          size="small"
                          onClick={() => addAmenityItem(categoryIndex)}
                        >
                          <FaPlus />
                        </Button>
                      </AddAmenityForm>
                    </AmenityCategoryItem>
                  ))}
                  <AddButton onClick={addAmenityCategory}>
                    <FaPlus /> Add New Category
                  </AddButton>
                </FormField>
              )}

              {activeModal === 'contact' && (
                <FormField>
                  <Label>Contact Information Fields</Label>
                  <p style={{ color: theme.colors.gray600, marginBottom: theme.spacing.md }}>
                    Manage contact information displayed on the hotel page.
                  </p>
                  {tempData.contactFields?.map((field, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      gap: theme.spacing.md,
                      marginBottom: theme.spacing.md,
                      padding: theme.spacing.md,
                      border: `1px solid ${theme.colors.gray200}`,
                      borderRadius: theme.borderRadius.md,
                      alignItems: 'flex-start'
                    }}>
                      <div style={{ flex: 1 }}>
                        <Input
                          value={field.label}
                          onChange={(e) => updateContactField(index, 'label', e.target.value)}
                          placeholder="Label (e.g., Address, Phone)"
                          style={{ marginBottom: theme.spacing.sm }}
                        />
                        <Input
                          value={field.value}
                          onChange={(e) => updateContactField(index, 'value', e.target.value)}
                          placeholder="Value"
                        />
                      </div>
                      <RemoveButton onClick={() => removeContactField(index)}>
                        <FaTrash />
                      </RemoveButton>
                    </div>
                  ))}
                  <AddButton onClick={addContactField}>
                    <FaPlus /> Add More Contact Field
                  </AddButton>
                </FormField>
              )}

              {activeModal === 'features' && (
                <FormField>
                  <Label>Hotel Features</Label>
                  <p style={{ color: theme.colors.gray600, marginBottom: theme.spacing.md }}>
                    These are the key features shown in the "Why Choose Us" section.
                  </p>
                  <FeaturesList>
                    {tempData.features?.map((feature, index) => (
                      <FeatureItem key={index}>
                        <div style={{ flex: 1 }}>
                          <Input
                            value={feature.title}
                            onChange={(e) => updateFeatureItem(index, 'title', e.target.value)}
                            placeholder="Feature title"
                            style={{ marginBottom: theme.spacing.sm }}
                          />
                          <TextArea
                            value={feature.description}
                            onChange={(e) => updateFeatureItem(index, 'description', e.target.value)}
                            placeholder="Feature description"
                            rows={3}
                          />
                        </div>
                        <RemoveButton onClick={() => removeFeatureItem(index)}>
                          <FaTrash />
                        </RemoveButton>
                      </FeatureItem>
                    ))}
                  </FeaturesList>
                  <AddButton onClick={addFeatureItem}>
                    <FaPlus /> Add More Feature
                  </AddButton>
                </FormField>
              )}
            </ModalContent>

            <ModalFooter>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={saveSection}>
                <FaSave /> Save Changes
              </Button>
            </ModalFooter>
          </Modal>
        </Overlay>
      )}

      {/* Save & Go Live Bar - appears when there are unsaved changes */}
      {hasUnsavedChanges && (
        <SaveGoLiveBar>
          <ChangesIndicator>
            <FaEdit />
            {Object.keys(hasUnsavedChanges ? changes : {}).length} unsaved changes
          </ChangesIndicator>
          <SaveGoLiveButton
            onClick={handleSaveAndGoLive}
            disabled={!hasUnsavedChanges}
          >
            <FaSave />
            Save & Go Live
          </SaveGoLiveButton>
        </SaveGoLiveBar>
      )}
    </EditorContainer>
  );
};

export default SectionBasedHotelEditor;
