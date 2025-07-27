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
  FaList,
  FaTextHeight,
  FaGripHorizontal,
  FaQuoteLeft,
  FaVideo,
  FaTable,
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
  publishChanges,
  toggleSectionVisibility,
  updateFeatures,
  addFeature,
  removeFeature,
  updateAmenityCategories,
  addAmenityCategory,
  addAmenityToCategory,
  removeAmenityFromCategory,
  selectHasPendingChanges,
} from '../../store/slices/hotelManagementSlice';
import { useAppContext } from '../../context/AppContext';
import { getHotelByIdOrSlug, amenitiesList } from '../../DummyData';
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
  border: 2px solid
    ${props => (props.selected ? theme.colors.primary : theme.colors.gray300)};
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
  opacity: ${props => (props.isVisible ? 1 : 0.6)};

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
  background: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray300};
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
    left: ${props => (props.active ? '22px' : '2px')};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
  background: linear-gradient(
    135deg,
    ${theme.colors.success},
    ${theme.colors.successDark}
  );
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

const SectionOrderControls = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const OrderButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    background: ${theme.colors.gray300};
    cursor: not-allowed;
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  margin-top: ${theme.spacing.sm};
`;

const ImageUploadButton = styled.label`
  background: ${theme.colors.secondary};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.secondaryDark};
  }

  input {
    display: none;
  }
`;

const SectionReorderContainer = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionOrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.sm};
  background: ${theme.colors.gray50};
`;

const SectionOrderButtons = styled.div`
  display: flex;
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
  background: ${props =>
    props.selected ? theme.colors.primary : theme.colors.white};
  color: ${props =>
    props.selected ? theme.colors.white : theme.colors.gray700};

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

const AddSectionCard = styled(SectionCard)`
  border: 2px dashed ${theme.colors.primary};
  background: ${theme.colors.primary}05;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  text-align: center;

  &:hover {
    border-color: ${theme.colors.primaryDark};
    background: ${theme.colors.primary}10;
    transform: translateY(-2px);
  }
`;

const AddSectionIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: ${theme.spacing.lg};
`;

const AddSectionText = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 0.9rem;
  }
`;

const SectionTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.lg} 0;
`;

const SectionTypeCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'selected',
})`
  padding: ${theme.spacing.lg};
  border: 2px solid
    ${props => (props.selected ? theme.colors.primary : theme.colors.gray300)};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props =>
    props.selected ? theme.colors.primary + '10' : theme.colors.white};

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const SectionTypeIcon = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'selected',
})`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props =>
    props.selected ? theme.colors.primary : theme.colors.gray400};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin: 0 auto ${theme.spacing.sm};
`;

const ContentForm = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const ContentItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  align-items: flex-start;
`;

const CardContentForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
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
    pendingChanges,
    lastSaveTime,
    lastPublishTime,
    liveHotels
  } = useSelector(state => state.hotelManagement);

  const hasPendingChanges = useSelector(state =>
    editingHotel ? selectHasPendingChanges(state, editingHotel.id) : false
  );

  const { slug } = useParams(); // Get slug from URL
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [tempData, setTempData] = useState({});
  const [newAmenityInputs, setNewAmenityInputs] = useState({});
  const [sectionOrder, setSectionOrder] = useState([
    'hero',
    'about',
    'features',
    'gallery',
    'amenities',
    'testimonials',
    'contact',
  ]);
  const [customSections, setCustomSections] = useState([]);
  const [newSectionData, setNewSectionData] = useState({
    title: '',
    type: '',
    content: [],
  });

  // Auto-select hotel based on URL slug and initialize section order
  useEffect(() => {
    if (slug && !editingHotel) {
      // First try to find hotel in Redux state
      let hotelData = liveHotels?.find(h => h.slug === slug || h.id === parseInt(slug));

      // Fallback to static data if not found in Redux
      if (!hotelData) {
        hotelData = getHotelByIdOrSlug(slug);
      }

      if (hotelData) {
        dispatch(setEditingHotel(hotelData.id));
        setSelectedHotelId(hotelData.id);
        // Initialize section order from hotel data
        if (hotelData.sectionOrder) {
          setSectionOrder(hotelData.sectionOrder);
        }
      }
    } else if (!editingHotel && liveHotels && liveHotels.length > 0 && !slug) {
      // Fallback to first hotel if no slug
      const firstHotel = liveHotels[0];
      setSelectedHotelId(firstHotel.id);
      dispatch(setEditingHotel(firstHotel.id));
      // Initialize section order from hotel data
      if (firstHotel.sectionOrder) {
        setSectionOrder(firstHotel.sectionOrder);
      }
    }
  }, [slug, editingHotel, liveHotels, dispatch]);

  // Update section order when editingHotel changes
  useEffect(() => {
    if (editingHotel && editingHotel.sectionOrder) {
      setSectionOrder(editingHotel.sectionOrder);
    }
    // Initialize custom sections from hotel data
    if (editingHotel && editingHotel.customSections) {
      setCustomSections(editingHotel.customSections);
    }
  }, [editingHotel]);

  const openModal = sectionType => {
    setActiveModal(sectionType);

    // Reset new section data when opening add-section modal
    if (sectionType === 'add-section') {
      setNewSectionData({
        title: '',
        type: '',
        content: [],
      });
      return;
    }

    // Check if this is a custom section being edited
    const customSection = customSections.find(cs => cs.id === sectionType);
    if (customSection) {
      setNewSectionData({
        title: customSection.title,
        type: customSection.type,
        content: customSection.content || [],
      });
      return;
    }

    // Initialize temp data with current hotel data - exactly as it appears on hotel detail page
    if (editingHotel) {
      setTempData({
        name: editingHotel.name || '',
        heroSubtitle: editingHotel.sections?.hero?.subtitle || editingHotel.heroSubtitle || editingHotel.sections?.hero?.subtitle || `Experience luxury hospitality in the heart of ${editingHotel.city || 'your city'}`,
        description: editingHotel.sections?.about?.content || editingHotel.description || '',
        image: editingHotel.sections?.hero?.backgroundImage || editingHotel.image || '',
        gallery: editingHotel.sections?.gallery?.images || editingHotel.gallery || (editingHotel.images ? editingHotel.images.map((img, index) => ({
          title: ['Hotel Exterior', 'Luxury Rooms', 'Dining Experience'][index] || `Image ${index + 1}`,
          image: img
        })) : []),
        amenities: editingHotel.amenities || [],
        address: editingHotel.address || '',
        phone: editingHotel.phone || '',
        email: editingHotel.email || '',
        checkInTime: editingHotel.checkInTime || '3:00 PM',
        checkOutTime: editingHotel.checkOutTime || '11:00 AM',
        features: editingHotel.sections?.features?.items || editingHotel.features || [],
        amenityCategories: editingHotel.sections?.amenities?.categories || editingHotel.amenityCategories || [],
        contactFields: editingHotel.sections?.contact?.info || editingHotel.contactFields || [
          { label: 'Address', value: editingHotel.address || '', icon: 'FaMapMarkerAlt' },
          { label: 'Phone', value: editingHotel.phone || '', icon: 'FaPhone' },
          { label: 'Email', value: editingHotel.email || '', icon: 'FaEnvelope' },
          {
            label: 'Check-in / Check-out',
            value: `${editingHotel.checkInTime || '3:00 PM'} / ${editingHotel.checkOutTime || '11:00 AM'}`,
            icon: 'FaClock'
          },
        ],
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setTempData({});
  };

  const saveSection = () => {
    if (!editingHotel) return;

    // Map tempData to proper section structure for the hotel
    Object.keys(tempData).forEach(key => {
      if (tempData[key] !== undefined) {
        switch (key) {
          case 'name':
            dispatch(updateHotelField({ field: 'name', value: tempData[key] }));
            break;
          case 'heroSubtitle':
            dispatch(updateHotelField({
              field: 'subtitle',
              value: tempData[key],
              section: 'hero'
            }));
            break;
          case 'image':
            dispatch(updateHotelField({
              field: 'backgroundImage',
              value: tempData[key],
              section: 'hero'
            }));
            break;
          case 'description':
            dispatch(updateHotelField({
              field: 'content',
              value: tempData[key],
              section: 'about'
            }));
            break;
          case 'gallery':
            dispatch(updateHotelField({
              field: 'images',
              value: tempData[key],
              section: 'gallery'
            }));
            break;
          case 'features':
            dispatch(updateHotelField({
              field: 'items',
              value: tempData[key],
              section: 'features'
            }));
            break;
          case 'amenityCategories':
            dispatch(updateHotelField({
              field: 'categories',
              value: tempData[key],
              section: 'amenities'
            }));
            break;
          case 'contactFields':
            dispatch(updateHotelField({
              field: 'info',
              value: tempData[key],
              section: 'contact'
            }));
            break;
          default:
            dispatch(updateHotelField({ field: key, value: tempData[key] }));
        }
      }
    });

    closeModal();
    alert(
      'Section updated! Click "Save & Go Live" to publish changes to the live hotel page.'
    );
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

  const removeImage = index => {
    const newImages = tempData.images.filter((_, i) => i !== index);
    updateTempData('images', newImages);
  };

  const toggleAmenity = amenityId => {
    const currentAmenities = tempData.amenities || [];
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    updateTempData('amenities', newAmenities);
  };

  const addFeatureItem = () => {
    const newFeature = {
      title: '',
      description: '',
    };
    const newFeatures = [...(tempData.features || []), newFeature];
    updateTempData('features', newFeatures);
  };

  const removeFeatureItem = index => {
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

  const addAmenityItem = categoryIndex => {
    const input = newAmenityInputs[categoryIndex];
    if (input && input.trim()) {
      const newCategories = tempData.amenityCategories.map(
        (category, index) => {
          if (index === categoryIndex) {
            return {
              ...category,
              items: [...category.items, input.trim()],
            };
          }
          return category;
        }
      );
      updateTempData('amenityCategories', newCategories);
      setNewAmenityInputs(prev => ({ ...prev, [categoryIndex]: '' }));
    }
  };

  const removeAmenityItem = (categoryIndex, itemIndex) => {
    const newCategories = tempData.amenityCategories.map((category, index) => {
      if (index === categoryIndex) {
        return {
          ...category,
          items: category.items.filter((_, i) => i !== itemIndex),
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
          title: title,
        };
      }
      return category;
    });
    updateTempData('amenityCategories', newCategories);
  };

  const addAmenityCategory = () => {
    const newCategory = {
      title: '',
      items: [],
    };
    const newCategories = [...tempData.amenityCategories, newCategory];
    updateTempData('amenityCategories', newCategories);
  };

  const handleSectionToggle = sectionId => {
    dispatch(toggleSectionVisibility({ section: sectionId }));
  };

  // Gallery management functions
  const addGalleryItem = () => {
    const newGallery = [...(tempData.gallery || []), { title: '', image: '' }];
    updateTempData('gallery', newGallery);
  };

  const removeGalleryItem = index => {
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
    const newContactFields = [
      ...(tempData.contactFields || []),
      { label: '', value: '' },
    ];
    updateTempData('contactFields', newContactFields);
  };

  const removeContactField = index => {
    const newContactFields = tempData.contactFields.filter(
      (_, i) => i !== index
    );
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

  // Custom section management functions
  const addCustomSection = () => {
    if (!newSectionData.title || !newSectionData.type) {
      alert('Please provide a section title and select a type.');
      return;
    }

    const sectionId = `custom-${Date.now()}`;
    const newSection = {
      id: sectionId,
      title: newSectionData.title,
      type: newSectionData.type,
      content: newSectionData.content,
      isVisible: true,
      isCustom: true,
    };

    // Add to custom sections
    setCustomSections(prev => [...prev, newSection]);

    // Add to section order
    setSectionOrder(prev => [...prev, sectionId]);

    // Update hotel data
    dispatch(
      updateHotelField({
        field: 'customSections',
        value: [...customSections, newSection],
      })
    );

    // Update section order in Redux store
    dispatch(
      updateHotelField({
        field: 'sectionOrder',
        value: [...sectionOrder, sectionId],
      })
    );

    // Close modal
    closeModal();
    alert(
      'Custom section added! Remember to "Save & Go Live" to publish changes.'
    );
  };

  const updateNewSectionData = (field, value) => {
    setNewSectionData(prev => ({ ...prev, [field]: value }));
  };

  const updateCustomSection = () => {
    const customSectionId = activeModal;
    const updatedSections = customSections.map(section =>
      section.id === customSectionId
        ? { ...section, ...newSectionData }
        : section
    );

    setCustomSections(updatedSections);

    // Update in Redux store
    dispatch(
      updateHotelField({
        field: 'customSections',
        value: updatedSections,
      })
    );

    closeModal();
    alert(
      'Custom section updated! Remember to "Save & Go Live" to publish changes.'
    );
  };

  const addContentItem = () => {
    const { type } = newSectionData;
    let newItem = {};

    switch (type) {
      case 'gallery':
        newItem = { image: '', title: '', description: '' };
        break;
      case 'cards':
        newItem = { title: '', description: '', image: '', link: '' };
        break;
      case 'text':
        newItem = { content: '' };
        break;
      case 'list':
        newItem = { text: '' };
        break;
      case 'testimonials':
        newItem = { quote: '', author: '', designation: '', image: '' };
        break;
      case 'video':
        newItem = { url: '', title: '', description: '' };
        break;
      case 'table':
        newItem = {
          headers: ['Header 1', 'Header 2'],
          rows: [['Data 1', 'Data 2']],
        };
        break;
      default:
        newItem = { content: '' };
    }

    setNewSectionData(prev => ({
      ...prev,
      content: [...prev.content, newItem],
    }));
  };

  const removeContentItem = index => {
    setNewSectionData(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const updateContentItem = (index, field, value) => {
    setNewSectionData(prev => ({
      ...prev,
      content: prev.content.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Section type options
  const sectionTypes = [
    {
      id: 'text',
      name: 'Text Content',
      icon: FaTextHeight,
      description: 'Rich text content',
    },
    {
      id: 'gallery',
      name: 'Image Gallery',
      icon: FaCamera,
      description: 'Collection of images',
    },
    {
      id: 'cards',
      name: 'Info Cards',
      icon: FaGripHorizontal,
      description: 'Card-based content',
    },
    {
      id: 'list',
      name: 'List Items',
      icon: FaList,
      description: 'Bulleted or numbered lists',
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      icon: FaQuoteLeft,
      description: 'Customer reviews',
    },
    {
      id: 'video',
      name: 'Video Content',
      icon: FaVideo,
      description: 'Video embeds',
    },
    {
      id: 'table',
      name: 'Data Table',
      icon: FaTable,
      description: 'Tabular data',
    },
  ];

  const handleSaveAndGoLive = () => {
    if (!editingHotel) return;

    console.log('Publishing changes for hotel:', editingHotel.name);

    // Save section order along with other changes
    dispatch(updateHotelField({ field: 'sectionOrder', value: sectionOrder }));

    // Save custom sections
    dispatch(
      updateHotelField({ field: 'customSections', value: customSections })
    );

    // First save changes to draft
    dispatch(saveChanges());

    // Then publish draft changes to live data
    dispatch(publishChanges());

    console.log('Changes published to live data');
    alert('All changes published to live hotel page successfully!');
  };

  // Section reordering functions
  const moveSectionUp = index => {
    if (index > 0) {
      const newOrder = [...sectionOrder];
      [newOrder[index], newOrder[index - 1]] = [
        newOrder[index - 1],
        newOrder[index],
      ];
      setSectionOrder(newOrder);
      // Mark as unsaved change
      dispatch(updateHotelField({ field: 'sectionOrder', value: newOrder }));
    }
  };

  const moveSectionDown = index => {
    if (index < sectionOrder.length - 1) {
      const newOrder = [...sectionOrder];
      [newOrder[index], newOrder[index + 1]] = [
        newOrder[index + 1],
        newOrder[index],
      ];
      setSectionOrder(newOrder);
      // Mark as unsaved change
      dispatch(updateHotelField({ field: 'sectionOrder', value: newOrder }));
    }
  };

  // Image upload function
  const handleImageUpload = (file, callback) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        callback(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
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
            {(liveHotels || ownerHotels).map(hotel => (
              <HotelSelectCard
                key={hotel.id}
                onClick={() => {
                  setSelectedHotelId(hotel.id);
                  dispatch(setEditingHotel(hotel.id));
                }}
                selected={selectedHotelId === hotel.id}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ padding: theme.spacing.lg }}>
                  <h3 style={{ marginBottom: theme.spacing.sm }}>
                    {hotel.name}
                  </h3>
                  <p style={{ color: theme.colors.gray600 }}>
                    {hotel.location}
                  </p>
                </div>
              </HotelSelectCard>
            ))}
          </HotelGrid>
        </HotelSelector>
      </EditorContainer>
    );
  }

  const allSections = {
    hero: {
      id: 'hero',
      title: 'Hero Section',
      description: 'Update background image and hotel title',
      icon: FaImage,
      preview: `${editingHotel.name} - ${editingHotel.city}`,
      isVisible: sectionVisibility.hero,
    },
    about: {
      id: 'about',
      title: 'About Section',
      description: 'Edit hotel description and story',
      icon: FaInfo,
      preview:
        editingHotel.description?.substring(0, 100) + '...' ||
        'No description set',
      isVisible: sectionVisibility.about,
    },
    features: {
      id: 'features',
      title: 'Why Choose Us',
      description: 'Manage hotel features and benefits',
      icon: FaStar,
      preview: `${editingHotel.features?.length || 4} features configured`,
      isVisible: sectionVisibility.features,
    },
    gallery: {
      id: 'gallery',
      title: 'Hotel Gallery',
      description: 'Manage hotel images and gallery',
      icon: FaCamera,
      preview: `${editingHotel.gallery?.length || 5} gallery items`,
      isVisible: sectionVisibility.gallery,
    },
    amenities: {
      id: 'amenities',
      title: 'World-Class Amenities',
      description: 'Update hotel amenities and services',
      icon: FaConciergeBell,
      preview: `${editingHotel.amenityCategories?.length || 4} categories`,
      isVisible: sectionVisibility.amenities,
    },
    contact: {
      id: 'contact',
      title: 'Location & Contact',
      description: 'Update contact information and address',
      icon: FaMapMarkerAlt,
      preview: `${editingHotel.contactFields?.length || 4} contact fields`,
      isVisible: sectionVisibility.contact,
    },
  };

  // Create ordered sections array based on sectionOrder (excluding hero as it's handled separately)
  const sections = sectionOrder
    .filter(sectionId => sectionId !== 'hero')
    .map(sectionId => allSections[sectionId])
    .filter(Boolean);

  return (
    <EditorContainer>
      <Header>
        <Title>Editing: {editingHotel.name}</Title>
        <Subtitle>Click on any section below to edit its content</Subtitle>
      </Header>

      <SectionReorderContainer>
        <h3
          style={{
            marginBottom: theme.spacing.lg,
            color: theme.colors.gray900,
          }}
        >
          Section Order Management
        </h3>
        <p
          style={{
            color: theme.colors.gray600,
            marginBottom: theme.spacing.lg,
          }}
        >
          Drag sections up or down to change their order on the hotel detail
          page.
        </p>
        {sectionOrder.map((sectionId, index) => {
          const section = allSections[sectionId];
          return (
            <SectionOrderItem key={sectionId}>
              <div>
                <strong>{section?.title}</strong> - {section?.description}
              </div>
              <SectionOrderButtons>
                <OrderButton
                  onClick={() => moveSectionUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </OrderButton>
                <OrderButton
                  onClick={() => moveSectionDown(index)}
                  disabled={index === sectionOrder.length - 1}
                >
                  ↓
                </OrderButton>
              </SectionOrderButtons>
            </SectionOrderItem>
          );
        })}
      </SectionReorderContainer>

      <SectionsGrid>
        {/* Show all sections in order including hero */}
        {sectionOrder.map(sectionId => {
          const section = allSections[sectionId];
          if (!section) return null;

          return (
            <SectionCard
              key={section.id}
              isVisible={section.isVisible}
              onClick={e => {
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
                  onClick={e => {
                    e.stopPropagation();
                    handleSectionToggle(section.id);
                  }}
                />
              </SectionHeader>
              <SectionPreview>{section.preview}</SectionPreview>
            </SectionCard>
          );
        })}

        {/* Show additional sections not in main order */}
        {/* Additional sections that might not be in main order */}
        {Object.values(allSections)
          .filter(section => !sectionOrder.includes(section.id))
          .map(section => (
            <SectionCard
              key={section.id}
              isVisible={section.isVisible}
              onClick={e => {
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
                  onClick={e => {
                    e.stopPropagation();
                    handleSectionToggle(section.id);
                  }}
                />
              </SectionHeader>
              <SectionPreview>{section.preview}</SectionPreview>
            </SectionCard>
          ))}

        {/* Show custom sections */}
        {customSections.map(section => (
          <SectionCard
            key={section.id}
            isVisible={section.isVisible}
            onClick={e => {
              if (e.target.closest('.toggle-switch')) return;
              openModal(section.id);
            }}
          >
            <SectionHeader>
              <SectionInfo>
                <SectionIcon>
                  {section.type === 'gallery' && <FaCamera />}
                  {section.type === 'cards' && <FaGripHorizontal />}
                  {section.type === 'text' && <FaTextHeight />}
                  {section.type === 'list' && <FaList />}
                  {section.type === 'testimonials' && <FaQuoteLeft />}
                  {section.type === 'video' && <FaVideo />}
                  {section.type === 'table' && <FaTable />}
                </SectionIcon>
                <SectionTitle>{section.title}</SectionTitle>
                <SectionDescription>
                  Custom {section.type} section
                </SectionDescription>
              </SectionInfo>
              <ToggleSwitch
                className="toggle-switch"
                active={section.isVisible}
                onClick={e => {
                  e.stopPropagation();
                  handleSectionToggle(section.id);
                }}
              />
            </SectionHeader>
            <SectionPreview>
              {section.content.length} {section.type} items
            </SectionPreview>
          </SectionCard>
        ))}

        {/* Add Section Card */}
        <AddSectionCard onClick={() => openModal('add-section')}>
          <AddSectionIcon>
            <FaPlus />
          </AddSectionIcon>
          <AddSectionText>
            <h3>Add Custom Section</h3>
            <p>Create a new section with custom content</p>
          </AddSectionText>
        </AddSectionCard>
      </SectionsGrid>

      {/* Modal Overlays */}
      {activeModal && (
        <Overlay onClick={closeModal}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {activeModal === 'add-section'
                  ? 'Add Custom Section'
                  : `Edit ${sections.find(s => s.id === activeModal)?.title || customSections.find(s => s.id === activeModal)?.title || activeModal}`}
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
                      onChange={e => updateTempData('name', e.target.value)}
                      placeholder="Enter hotel name"
                    />
                  </FormField>
                  <FormField>
                    <Label>Hero Subtitle</Label>
                    <TextArea
                      value={tempData.heroSubtitle || ''}
                      onChange={e =>
                        updateTempData('heroSubtitle', e.target.value)
                      }
                      placeholder="Enter hero subtitle"
                      rows={3}
                    />
                  </FormField>
                  <FormField>
                    <Label>Background Image</Label>
                    <Input
                      value={tempData.image || ''}
                      onChange={e => updateTempData('image', e.target.value)}
                      placeholder="Enter image URL"
                    />
                    <ImageUploadContainer>
                      <span>OR</span>
                      <ImageUploadButton>
                        <FaPlus />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              handleImageUpload(file, dataUrl => {
                                updateTempData('image', dataUrl);
                              });
                            }
                          }}
                        />
                      </ImageUploadButton>
                    </ImageUploadContainer>
                    {tempData.image && (
                      <div style={{ marginTop: theme.spacing.md }}>
                        <img
                          src={tempData.image}
                          alt="Preview"
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: theme.borderRadius.md,
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
                    onChange={e =>
                      updateTempData('description', e.target.value)
                    }
                    placeholder="Enter hotel description"
                    rows={8}
                  />
                </FormField>
              )}

              {activeModal === 'gallery' && (
                <FormField>
                  <Label>Hotel Gallery</Label>
                  <p
                    style={{
                      color: theme.colors.gray600,
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    Manage gallery images with titles for better organization.
                  </p>
                  {tempData.gallery?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: theme.spacing.lg,
                        padding: theme.spacing.md,
                        border: `1px solid ${theme.colors.gray200}`,
                        borderRadius: theme.borderRadius.md,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: theme.spacing.md,
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <FormField>
                            <Label>Image Title</Label>
                            <Input
                              value={item.title}
                              onChange={e =>
                                updateGalleryItem(
                                  index,
                                  'title',
                                  e.target.value
                                )
                              }
                              placeholder="e.g., Hotel Exterior, Luxury Rooms"
                            />
                          </FormField>
                          <FormField>
                            <Label>Image URL</Label>
                            <Input
                              value={item.image}
                              onChange={e =>
                                updateGalleryItem(
                                  index,
                                  'image',
                                  e.target.value
                                )
                              }
                              placeholder="Enter image URL"
                            />
                            <ImageUploadContainer>
                              <span>OR</span>
                              <ImageUploadButton>
                                <FaPlus />
                                Upload Image
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      handleImageUpload(file, dataUrl => {
                                        updateGalleryItem(
                                          index,
                                          'image',
                                          dataUrl
                                        );
                                      });
                                    }
                                  }}
                                />
                              </ImageUploadButton>
                            </ImageUploadContainer>
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
                                borderRadius: theme.borderRadius.md,
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
                  <p
                    style={{
                      color: theme.colors.gray600,
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    Organize your amenities into categories with custom headers
                    and items.
                  </p>
                  {tempData.amenityCategories?.map(
                    (category, categoryIndex) => (
                      <AmenityCategoryItem key={categoryIndex}>
                        <AmenityCategoryHeader>
                          <Input
                            value={category.title}
                            onChange={e =>
                              updateCategoryTitle(categoryIndex, e.target.value)
                            }
                            placeholder="Category title (e.g., Recreation)"
                            style={{ flex: 1 }}
                          />
                        </AmenityCategoryHeader>

                        <AmenityItemsContainer>
                          {category.items.map((item, itemIndex) => (
                            <AmenityTag key={itemIndex}>
                              {item}
                              <button
                                onClick={() =>
                                  removeAmenityItem(categoryIndex, itemIndex)
                                }
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: 'white',
                                  marginLeft: theme.spacing.xs,
                                  cursor: 'pointer',
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
                            onChange={e =>
                              setNewAmenityInputs(prev => ({
                                ...prev,
                                [categoryIndex]: e.target.value,
                              }))
                            }
                            placeholder="Add new amenity"
                            style={{ flex: 1 }}
                            onKeyPress={e => {
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
                    )
                  )}
                  <AddButton onClick={addAmenityCategory}>
                    <FaPlus /> Add New Category
                  </AddButton>
                </FormField>
              )}

              {activeModal === 'contact' && (
                <FormField>
                  <Label>Contact Information Fields</Label>
                  <p
                    style={{
                      color: theme.colors.gray600,
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    Manage contact information displayed on the hotel page.
                  </p>
                  {tempData.contactFields?.map((field, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.md,
                        padding: theme.spacing.md,
                        border: `1px solid ${theme.colors.gray200}`,
                        borderRadius: theme.borderRadius.md,
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Input
                          value={field.label}
                          onChange={e =>
                            updateContactField(index, 'label', e.target.value)
                          }
                          placeholder="Label (e.g., Address, Phone)"
                          style={{ marginBottom: theme.spacing.sm }}
                        />
                        <Input
                          value={field.value}
                          onChange={e =>
                            updateContactField(index, 'value', e.target.value)
                          }
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
                  <p
                    style={{
                      color: theme.colors.gray600,
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    These are the key features shown in the "Why Choose Us"
                    section.
                  </p>
                  <FeaturesList>
                    {tempData.features?.map((feature, index) => (
                      <FeatureItem key={index}>
                        <div style={{ flex: 1 }}>
                          <Input
                            value={feature.title}
                            onChange={e =>
                              updateFeatureItem(index, 'title', e.target.value)
                            }
                            placeholder="Feature title"
                            style={{ marginBottom: theme.spacing.sm }}
                          />
                          <TextArea
                            value={feature.description}
                            onChange={e =>
                              updateFeatureItem(
                                index,
                                'description',
                                e.target.value
                              )
                            }
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

              {activeModal === 'add-section' && (
                <>
                  <FormField>
                    <Label>Section Title</Label>
                    <Input
                      value={newSectionData.title}
                      onChange={e =>
                        updateNewSectionData('title', e.target.value)
                      }
                      placeholder="Enter section title (e.g., Our Awards, Special Offers)"
                    />
                  </FormField>

                  <FormField>
                    <Label>Section Type</Label>
                    <p
                      style={{
                        color: theme.colors.gray600,
                        marginBottom: theme.spacing.md,
                      }}
                    >
                      Choose the type of content for this section.
                    </p>
                    <SectionTypeGrid>
                      {sectionTypes.map(type => (
                        <SectionTypeCard
                          key={type.id}
                          selected={newSectionData.type === type.id}
                          onClick={() => updateNewSectionData('type', type.id)}
                        >
                          <SectionTypeIcon
                            selected={newSectionData.type === type.id}
                          >
                            <type.icon />
                          </SectionTypeIcon>
                          <h4
                            style={{
                              margin: 0,
                              marginBottom: theme.spacing.xs,
                              fontSize: '0.9rem',
                            }}
                          >
                            {type.name}
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.8rem',
                              color: theme.colors.gray600,
                            }}
                          >
                            {type.description}
                          </p>
                        </SectionTypeCard>
                      ))}
                    </SectionTypeGrid>
                  </FormField>

                  {newSectionData.type && (
                    <FormField>
                      <Label>Content Items</Label>
                      <p
                        style={{
                          color: theme.colors.gray600,
                          marginBottom: theme.spacing.md,
                        }}
                      >
                        Add content items for your {newSectionData.type}{' '}
                        section.
                      </p>

                      <ContentForm>
                        {newSectionData.content.map((item, index) => (
                          <ContentItem key={index}>
                            <div style={{ flex: 1 }}>
                              {newSectionData.type === 'text' && (
                                <TextArea
                                  value={item.content || ''}
                                  onChange={e =>
                                    updateContentItem(
                                      index,
                                      'content',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter your text content here..."
                                  rows={4}
                                />
                              )}

                              {newSectionData.type === 'gallery' && (
                                <>
                                  <Input
                                    value={item.title || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'title',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Image title"
                                    style={{ marginBottom: theme.spacing.sm }}
                                  />
                                  <Input
                                    value={item.image || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'image',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Image URL"
                                    style={{ marginBottom: theme.spacing.sm }}
                                  />
                                  <TextArea
                                    value={item.description || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'description',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Image description (optional)"
                                    rows={2}
                                  />
                                </>
                              )}

                              {newSectionData.type === 'cards' && (
                                <CardContentForm>
                                  <div>
                                    <Input
                                      value={item.title || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'title',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card title"
                                      style={{ marginBottom: theme.spacing.sm }}
                                    />
                                    <TextArea
                                      value={item.description || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'description',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card description"
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      value={item.image || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'image',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card image URL (optional)"
                                      style={{ marginBottom: theme.spacing.sm }}
                                    />
                                    <Input
                                      value={item.link || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'link',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card link URL (optional)"
                                    />
                                  </div>
                                </CardContentForm>
                              )}

                              {newSectionData.type === 'list' && (
                                <Input
                                  value={item.text || ''}
                                  onChange={e =>
                                    updateContentItem(
                                      index,
                                      'text',
                                      e.target.value
                                    )
                                  }
                                  placeholder="List item text"
                                />
                              )}

                              {newSectionData.type === 'testimonials' && (
                                <>
                                  <TextArea
                                    value={item.quote || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'quote',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Customer testimonial quote"
                                    rows={3}
                                    style={{ marginBottom: theme.spacing.sm }}
                                  />
                                  <CardContentForm>
                                    <Input
                                      value={item.author || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'author',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Author name"
                                    />
                                    <Input
                                      value={item.designation || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'designation',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Author designation"
                                    />
                                  </CardContentForm>
                                  <Input
                                    value={item.image || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'image',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Author image URL (optional)"
                                  />
                                </>
                              )}

                              {newSectionData.type === 'video' && (
                                <>
                                  <Input
                                    value={item.title || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'title',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Video title"
                                    style={{ marginBottom: theme.spacing.sm }}
                                  />
                                  <Input
                                    value={item.url || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'url',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Video URL (YouTube, Vimeo, etc.)"
                                    style={{ marginBottom: theme.spacing.sm }}
                                  />
                                  <TextArea
                                    value={item.description || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'description',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Video description (optional)"
                                    rows={2}
                                  />
                                </>
                              )}
                            </div>
                            <RemoveButton
                              onClick={() => removeContentItem(index)}
                            >
                              <FaTrash />
                            </RemoveButton>
                          </ContentItem>
                        ))}

                        <AddButton onClick={addContentItem}>
                          <FaPlus /> Add {newSectionData.type} Item
                        </AddButton>
                      </ContentForm>
                    </FormField>
                  )}
                </>
              )}

              {/* Custom section editing - reuse add-section content */}
              {customSections.find(cs => cs.id === activeModal) && (
                <>
                  <FormField>
                    <Label>Section Title</Label>
                    <Input
                      value={newSectionData.title}
                      onChange={e =>
                        updateNewSectionData('title', e.target.value)
                      }
                      placeholder="Enter section title (e.g., Our Awards, Special Offers)"
                    />
                  </FormField>

                  <FormField>
                    <Label>Section Type</Label>
                    <p
                      style={{
                        color: theme.colors.gray600,
                        marginBottom: theme.spacing.md,
                      }}
                    >
                      Choose the type of content for this section.
                    </p>
                    <SectionTypeGrid>
                      {sectionTypes.map(type => (
                        <SectionTypeCard
                          key={type.id}
                          selected={newSectionData.type === type.id}
                          onClick={() => updateNewSectionData('type', type.id)}
                        >
                          <SectionTypeIcon
                            selected={newSectionData.type === type.id}
                          >
                            <type.icon />
                          </SectionTypeIcon>
                          <h4
                            style={{
                              margin: 0,
                              marginBottom: theme.spacing.xs,
                              fontSize: '0.9rem',
                            }}
                          >
                            {type.name}
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.8rem',
                              color: theme.colors.gray600,
                            }}
                          >
                            {type.description}
                          </p>
                        </SectionTypeCard>
                      ))}
                    </SectionTypeGrid>
                  </FormField>

                  {newSectionData.type && (
                    <FormField>
                      <Label>Content Items</Label>
                      <p
                        style={{
                          color: theme.colors.gray600,
                          marginBottom: theme.spacing.md,
                        }}
                      >
                        Add content items for your {newSectionData.type}{' '}
                        section.
                      </p>

                      <ContentForm>
                        {newSectionData.content.map((item, index) => (
                          <ContentItem key={index}>
                            <div style={{ flex: 1 }}>
                              {newSectionData.type === 'text' && (
                                <TextArea
                                  value={item.content || ''}
                                  onChange={e =>
                                    updateContentItem(
                                      index,
                                      'content',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter your text content here..."
                                  rows={4}
                                />
                              )}

                              {newSectionData.type === 'gallery' && (
                                <>
                                  <Input
                                    value={item.title || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'title',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Image title"
                                    style={{ marginBottom: theme.spacing.sm }}
                                  />
                                  <Input
                                    value={item.image || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'image',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Image URL"
                                    style={{ marginBottom: theme.spacing.sm }}
                                  />
                                  <TextArea
                                    value={item.description || ''}
                                    onChange={e =>
                                      updateContentItem(
                                        index,
                                        'description',
                                        e.target.value
                                      )
                                    }
                                    placeholder="Image description (optional)"
                                    rows={2}
                                  />
                                </>
                              )}

                              {newSectionData.type === 'cards' && (
                                <CardContentForm>
                                  <div>
                                    <Input
                                      value={item.title || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'title',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card title"
                                      style={{ marginBottom: theme.spacing.sm }}
                                    />
                                    <TextArea
                                      value={item.description || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'description',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card description"
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <Input
                                      value={item.image || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'image',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card image URL (optional)"
                                      style={{ marginBottom: theme.spacing.sm }}
                                    />
                                    <Input
                                      value={item.link || ''}
                                      onChange={e =>
                                        updateContentItem(
                                          index,
                                          'link',
                                          e.target.value
                                        )
                                      }
                                      placeholder="Card link URL (optional)"
                                    />
                                  </div>
                                </CardContentForm>
                              )}

                              {newSectionData.type === 'list' && (
                                <Input
                                  value={item.text || ''}
                                  onChange={e =>
                                    updateContentItem(
                                      index,
                                      'text',
                                      e.target.value
                                    )
                                  }
                                  placeholder="List item text"
                                />
                              )}
                            </div>
                            <RemoveButton
                              onClick={() => removeContentItem(index)}
                            >
                              <FaTrash />
                            </RemoveButton>
                          </ContentItem>
                        ))}

                        <AddButton onClick={addContentItem}>
                          <FaPlus /> Add {newSectionData.type} Item
                        </AddButton>
                      </ContentForm>
                    </FormField>
                  )}
                </>
              )}
            </ModalContent>

            <ModalFooter>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              {activeModal === 'add-section' ? (
                <Button onClick={addCustomSection}>
                  <FaPlus /> Add Section
                </Button>
              ) : customSections.find(cs => cs.id === activeModal) ? (
                <Button onClick={updateCustomSection}>
                  <FaSave /> Update Section
                </Button>
              ) : (
                <Button onClick={saveSection}>
                  <FaSave /> Save Changes
                </Button>
              )}
            </ModalFooter>
          </Modal>
        </Overlay>
      )}

      {/* Save & Go Live Bar - appears when there are unsaved or pending changes */}
      {(hasUnsavedChanges || hasPendingChanges) && (
        <SaveGoLiveBar>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
            {hasUnsavedChanges && (
              <ChangesIndicator>
                <FaEdit />
                {Object.keys(changes || {}).length} unsaved changes
              </ChangesIndicator>
            )}
            {hasPendingChanges && !hasUnsavedChanges && (
              <ChangesIndicator style={{ color: theme.colors.warning }}>
                <FaSave />
                Changes saved in draft - ready to publish
              </ChangesIndicator>
            )}
            {lastSaveTime && (
              <div style={{ fontSize: '0.8rem', color: theme.colors.gray500 }}>
                Last saved: {new Date(lastSaveTime).toLocaleTimeString()}
              </div>
            )}
          </div>
          <SaveGoLiveButton
            onClick={handleSaveAndGoLive}
            disabled={!hasUnsavedChanges && !hasPendingChanges}
          >
            <FaSave />
            {hasUnsavedChanges ? 'Save & Go Live' : 'Publish Draft'}
          </SaveGoLiveButton>
        </SaveGoLiveBar>
      )}
    </EditorContainer>
  );
};

export default SectionBasedHotelEditor;
