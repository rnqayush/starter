import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FaMapMarkerAlt,
  FaStar,
  FaSwimmingPool,
  FaUtensils,
  FaClock,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaConciergeBell,
  FaUmbrellaBeach,
  FaBusinessTime,
  FaTaxi,
  FaEdit,
  FaSave,
  FaUndo,
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
  discardChanges,
} from '../../store/slices/hotelManagementSlice';
import { useAppContext } from '../../context/AppContext';
import { getHotelByIdOrSlug, amenitiesList } from '../../DummyData';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
  position: relative;
`;

const EditingIndicator = styled.div`
  position: fixed;
  top: 0;
  left: 17.5rem;
  right: 0;
  background: ${theme.colors.warning};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm};
  text-align: center;
  font-weight: 600;
  z-index: 100;
  box-shadow: ${theme.shadows.md};
`;

const EditableHeroBanner = styled.section.withConfig({
  shouldForwardProp: prop => prop !== 'image',
})`
  position: relative;
  height: 100vh;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 40px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 80vh;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 100vh;
    padding-top: 60px;
    background-attachment: scroll;
    background-position: center center;

    &::before {
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.5)
      );
    }
  }
`;

const ImageEditOverlay = styled.div`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 3;
`;

const EditButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: ${theme.colors.white};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.md};
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 120px);
  }
`;

const EditableTitle = styled.input`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  background: transparent;
  border: 2px dashed transparent;
  color: ${theme.colors.white};
  width: 100%;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.white};
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.8rem;
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
`;

const EditableSubtitle = styled.textarea`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  background: transparent;
  border: 2px dashed transparent;
  color: ${theme.colors.white};
  width: 100%;
  resize: none;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
  max-width: 600px;
  min-height: 60px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.white};
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const ContentSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.white};

  &.alt {
    background: ${theme.colors.gray50};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl} 0;

    &:first-of-type {
      padding-top: ${theme.spacing.xxl};
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.xl};
  }
`;

const EditableSectionTitle = styled.input`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  background: transparent;
  border: 2px dashed transparent;
  text-align: center;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const EditableDescription = styled.textarea`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.gray700};
  background: transparent;
  border: 2px dashed transparent;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  resize: none;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: ${theme.colors.gray50};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.15rem;
    line-height: 1.8;
    text-align: left;
    padding: 0 ${theme.spacing.sm};
  }
`;

const GallerySection = styled.div`
  margin: ${theme.spacing.xxl} 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 300px 300px;
  gap: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 200px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 250px);
    gap: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.lg};
  }
`;

const EditableGalleryItem = styled.div.withConfig({
  shouldForwardProp: prop => !['image', 'span'].includes(prop),
})`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  ${props => props.span && `grid-row: span ${props.span};`}

  &:hover {
    transform: scale(1.02);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease;
  }

  &:hover::before {
    background: rgba(0, 0, 0, 0.3);
  }

  &:first-child {
    grid-row: span 2;
  }
`;

const ImageEditButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs};
  color: ${theme.colors.primary};
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;

  ${EditableGalleryItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${theme.colors.white};
    transform: scale(1.1);
  }
`;

const AmenitiesSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.lg};
    margin: 0 -${theme.spacing.sm};
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const AmenityCategory = styled.div`
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 1.3rem;
      font-weight: 700;
      padding: ${theme.spacing.md} 0;
      border-bottom: 2px solid ${theme.colors.gray100};
      margin-bottom: ${theme.spacing.lg};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    background: ${theme.colors.gray50};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.gray200};
  }
`;

const EditableAmenityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.sm};
`;

const AmenityToggle = styled.div`
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
  font-size: 0.9rem;
  
  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-1px);
  }

  .icon {
    font-size: 0.8rem;
  }
`;

const ActionBar = styled.div`
  position: fixed;
  bottom: ${theme.spacing.xl};
  left: 17.5rem;
  right: ${theme.spacing.xl};
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  border: 1px solid ${theme.colors.gray200};
`;

const ChangesCount = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.warning};
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  &.save {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.primaryDark};
      transform: translateY(-2px);
    }
  }

  &.discard {
    background: ${theme.colors.gray200};
    color: ${theme.colors.gray700};

    &:hover {
      background: ${theme.colors.gray300};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EditableHotelDetail = ({ setActiveSection }) => {
  const dispatch = useDispatch();
  const { ownerHotels } = useAppContext();
  const {
    editingHotel,
    hasUnsavedChanges,
    changes,
    activeHotelId
  } = useSelector(state => state.hotelManagement);

  const [selectedHotelId, setSelectedHotelId] = useState(null);
  
  // If no hotel is being edited, show hotel selection
  useEffect(() => {
    if (!editingHotel && ownerHotels.length > 0) {
      // Auto-select first hotel if none selected
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

  const handleFieldChange = (field, value) => {
    dispatch(updateHotelField({ field, value }));
  };

  const handleImageEdit = (index, isMainImage = false) => {
    const currentUrl = isMainImage ? editingHotel?.image : editingHotel?.images?.[index];
    const newUrl = prompt('Enter new image URL:', currentUrl);
    if (newUrl && newUrl !== currentUrl) {
      if (isMainImage) {
        dispatch(updateHotelField({ field: 'image', value: newUrl }));
      } else {
        dispatch(updateHotelImage({ index, url: newUrl }));
      }
    }
  };

  const toggleAmenity = (categoryItems, amenityName) => {
    if (!editingHotel) return;
    
    const currentAmenities = editingHotel.amenities || [];
    const newAmenities = currentAmenities.includes(amenityName)
      ? currentAmenities.filter(a => a !== amenityName)
      : [...currentAmenities, amenityName];
    
    dispatch(updateAmenities(newAmenities));
  };

  const handleSave = () => {
    dispatch(saveChanges());
    alert('Changes saved successfully! Hotel detail page has been updated.');
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      dispatch(discardChanges());
    }
  };

  if (!editingHotel) {
    return (
      <PageContainer>
        <Container style={{ paddingTop: theme.spacing.xxl }}>
          <h2>Select a hotel to edit:</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: theme.spacing.lg, marginTop: theme.spacing.xl }}>
            {ownerHotels.map(hotel => (
              <div 
                key={hotel.id}
                onClick={() => setSelectedHotelId(hotel.id)}
                style={{
                  cursor: 'pointer',
                  border: `2px solid ${selectedHotelId === hotel.id ? theme.colors.primary : theme.colors.gray300}`,
                  borderRadius: theme.borderRadius.lg,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: theme.spacing.lg }}>
                  <h3>{hotel.name}</h3>
                  <p style={{ color: theme.colors.gray600 }}>{hotel.location}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </PageContainer>
    );
  }

  const amenityCategories = [
    {
      title: 'Recreation',
      icon: FaSwimmingPool,
      items: ['Swimming Pool', 'Fitness Center', 'Spa & Wellness', 'Game Room', 'Tennis Court'],
    },
    {
      title: 'Dining',
      icon: FaUtensils,
      items: ['Fine Dining Restaurant', 'Rooftop Bar', 'Room Service', 'Breakfast Buffet', 'Coffee Shop'],
    },
    {
      title: 'Business',
      icon: FaBusinessTime,
      items: ['Business Center', 'Meeting Rooms', 'Conference Hall', 'Free WiFi', 'Printing Services'],
    },
    {
      title: 'Services',
      icon: FaConciergeBell,
      items: ['24/7 Concierge', 'Valet Parking', 'Laundry Service', 'Airport Transfer', 'Tour Desk'],
    },
  ];

  return (
    <PageContainer>
      <EditingIndicator>
        🎨 EDITING MODE - Make changes to your hotel page content
      </EditingIndicator>

      <EditableHeroBanner image={editingHotel.image}>
        <ImageEditOverlay>
          <EditButton onClick={() => handleImageEdit(0, true)}>
            <FaEdit /> Change Background
          </EditButton>
        </ImageEditOverlay>
        <HeroContent>
          <EditableTitle
            value={editingHotel.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Enter hotel name"
          />
          <EditableSubtitle
            value={`Experience luxury hospitality in the heart of ${editingHotel.city || 'your city'}`}
            onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
            placeholder="Enter hero subtitle"
          />
        </HeroContent>
      </EditableHeroBanner>

      <ContentSection>
        <Container>
          <SectionHeader>
            <EditableSectionTitle
              value={`About ${editingHotel.name}`}
              onChange={(e) => handleFieldChange('aboutTitle', e.target.value)}
              placeholder="About section title"
            />
          </SectionHeader>
          <EditableDescription
            value={editingHotel.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Enter hotel description..."
          />
        </Container>
      </ContentSection>

      <ContentSection>
        <Container>
          <SectionHeader>
            <EditableSectionTitle
              value="Hotel Gallery"
              readOnly
              style={{ border: 'none', cursor: 'default' }}
            />
          </SectionHeader>
          <GallerySection>
            <GalleryGrid>
              {editingHotel.images?.map((image, index) => (
                <EditableGalleryItem key={index} image={image}>
                  <ImageEditButton onClick={() => handleImageEdit(index)}>
                    <FaEdit />
                  </ImageEditButton>
                </EditableGalleryItem>
              ))}
            </GalleryGrid>
          </GallerySection>
        </Container>
      </ContentSection>

      <ContentSection className="alt">
        <Container>
          <SectionHeader>
            <EditableSectionTitle
              value="World-Class Amenities"
              readOnly
              style={{ border: 'none', cursor: 'default' }}
            />
          </SectionHeader>
          <AmenitiesSection>
            <AmenitiesGrid>
              {amenityCategories.map((category, index) => (
                <AmenityCategory key={index}>
                  <h4>
                    <category.icon />
                    {category.title}
                  </h4>
                  <EditableAmenityList>
                    {category.items.map((item, itemIndex) => (
                      <AmenityToggle
                        key={itemIndex}
                        selected={editingHotel.amenities?.includes(item)}
                        onClick={() => toggleAmenity(category.items, item)}
                      >
                        <FaCheckCircle className="icon" />
                        {item}
                      </AmenityToggle>
                    ))}
                  </EditableAmenityList>
                </AmenityCategory>
              ))}
            </AmenitiesGrid>
          </AmenitiesSection>
        </Container>
      </ContentSection>

      {hasUnsavedChanges && (
        <ActionBar>
          <ChangesCount>
            <FaEdit />
            {Object.keys(changes).length} changes made
          </ChangesCount>
          <ActionButtons>
            <ActionButton className="discard" onClick={handleDiscard}>
              <FaUndo /> Discard Changes
            </ActionButton>
            <ActionButton className="save" onClick={handleSave}>
              <FaSave /> Save & Update Live Page
            </ActionButton>
          </ActionButtons>
        </ActionBar>
      )}
    </PageContainer>
  );
};

export default EditableHotelDetail;
