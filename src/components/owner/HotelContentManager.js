import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FaEdit,
  FaImage,
  FaPlus,
  FaTrash,
  FaSave,
  FaUndo,
  FaInfo,
  FaBed,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaConciergeBell,
} from 'react-icons/fa';
import {
  setEditingHotel,
  updateHotelField,
  updateHotelImage,
  addHotelImage,
  removeHotelImage,
  updateAmenities,
  updatePolicies,
  addRoom,
  updateRoom,
  removeRoom,
  saveChanges,
  discardChanges,
} from '../../store/slices/hotelManagementSlice';
import { Card, CardContent, CardActions } from '../shared/Card';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { theme } from '../../styles/GlobalStyle';
import { useAppContext } from '../../context/AppContext';
import { amenitiesList } from '../../DummyData/hotels';

const ContentManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
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
  margin-bottom: ${theme.spacing.xl};
`;

const HotelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const HotelSelectCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? theme.colors.primary : 'transparent'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
  }
`;

const EditingPanel = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.gray700};
`;

const TextArea = styled.textarea`
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

const ImageSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ImageCard = styled.div`
  position: relative;
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  aspect-ratio: 16/9;
  overflow: hidden;
  background: ${theme.colors.gray50};
  
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
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  display: flex;
  gap: ${theme.spacing.xs};
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
  padding: ${theme.spacing.md};
`;

const ImageInput = styled.input`
  display: none;
`;

const AmenitiesSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
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

const RoomsSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
`;

const RoomCard = styled(Card)`
  border: 1px solid ${theme.colors.gray200};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
`;

const HotelContentManager = ({ setActiveSection }) => {
  const dispatch = useDispatch();
  const { ownerHotels } = useAppContext();
  const {
    editingHotel,
    hasUnsavedChanges,
    changes,
    activeHotelId
  } = useSelector(state => state.hotelManagement);

  const [newImageUrl, setNewImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSelectHotel = (hotelId) => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Discard them?')) {
        dispatch(discardChanges());
        dispatch(setEditingHotel(hotelId));
      }
    } else {
      dispatch(setEditingHotel(hotelId));
    }
  };

  const handleFieldChange = (field, value) => {
    dispatch(updateHotelField({ field, value }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      dispatch(addHotelImage(newImageUrl.trim()));
      setNewImageUrl('');
      setShowImageInput(false);
    }
  };

  const handleUpdateImage = (index, url) => {
    dispatch(updateHotelImage({ index, url }));
  };

  const handleRemoveImage = (index) => {
    dispatch(removeHotelImage(index));
  };

  const toggleAmenity = (amenityId) => {
    if (!editingHotel) return;
    
    const currentAmenities = editingHotel.amenities || [];
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    
    dispatch(updateAmenities(newAmenities));
  };

  const handleSave = () => {
    dispatch(saveChanges());
    alert('Changes saved successfully!');
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      dispatch(discardChanges());
    }
  };

  if (!editingHotel) {
    return (
      <ContentManagerContainer>
        <HeaderSection>
          <div>
            <Title>Hotel Content Manager</Title>
            <Subtitle>Select a hotel to manage its content and details</Subtitle>
          </div>
        </HeaderSection>

        <HotelSelector>
          <SectionTitle>
            <FaEdit />
            Select Hotel to Edit
          </SectionTitle>
          <HotelGrid>
            {ownerHotels.map(hotel => (
              <HotelSelectCard
                key={hotel.id}
                onClick={() => handleSelectHotel(hotel.id)}
                selected={activeHotelId === hotel.id}
              >
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`
                  }} 
                />
                <CardContent>
                  <h3 style={{ marginBottom: theme.spacing.sm }}>{hotel.name}</h3>
                  <p style={{ color: theme.colors.gray600, marginBottom: theme.spacing.md }}>
                    {hotel.location}
                  </p>
                  <div style={{ display: 'flex', gap: theme.spacing.md, fontSize: '0.9rem', color: theme.colors.gray500 }}>
                    <span><FaBed /> {hotel.totalRooms} rooms</span>
                    <span><FaMapMarkerAlt /> {hotel.status}</span>
                  </div>
                </CardContent>
              </HotelSelectCard>
            ))}
          </HotelGrid>
        </HotelSelector>
      </ContentManagerContainer>
    );
  }

  return (
    <ContentManagerContainer>
      <HeaderSection>
        <div>
          <Title>Editing: {editingHotel.name}</Title>
          <Subtitle>Make changes to hotel content and click save to apply</Subtitle>
          {hasUnsavedChanges && (
            <div style={{ color: theme.colors.warning, fontWeight: 600, marginTop: theme.spacing.sm }}>
              ⚠️ You have unsaved changes
            </div>
          )}
        </div>
      </HeaderSection>

      <EditingPanel>
        <SectionTitle>
          <FaInfo />
          Basic Information
        </SectionTitle>
        <FormGrid>
          <FormField>
            <Label>Hotel Name</Label>
            <Input
              value={editingHotel.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Enter hotel name"
            />
          </FormField>
          <FormField>
            <Label>Location</Label>
            <Input
              value={editingHotel.location || ''}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="Enter location"
            />
          </FormField>
          <FormField>
            <Label>Address</Label>
            <Input
              value={editingHotel.address || ''}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              placeholder="Enter full address"
            />
          </FormField>
          <FormField>
            <Label>City</Label>
            <Input
              value={editingHotel.city || ''}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              placeholder="Enter city"
            />
          </FormField>
          <FormField>
            <Label>Pin Code</Label>
            <Input
              value={editingHotel.pincode || ''}
              onChange={(e) => handleFieldChange('pincode', e.target.value)}
              placeholder="Enter pin code"
            />
          </FormField>
          <FormField>
            <Label>Starting Price (₹)</Label>
            <Input
              type="number"
              value={editingHotel.startingPrice || ''}
              onChange={(e) => handleFieldChange('startingPrice', parseInt(e.target.value))}
              placeholder="Enter starting price"
            />
          </FormField>
        </FormGrid>

        <FormField>
          <Label>Description</Label>
          <TextArea
            value={editingHotel.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Enter hotel description"
          />
        </FormField>
      </EditingPanel>

      <EditingPanel>
        <ImageSection>
          <SectionTitle>
            <FaImage />
            Hotel Images
          </SectionTitle>
          <ImageGrid>
            <ImageCard className={editingHotel.image ? 'has-image' : ''}>
              {editingHotel.image ? (
                <ImageDisplay src={editingHotel.image}>
                  <ImageActions>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => {
                        const newUrl = prompt('Enter new image URL:', editingHotel.image);
                        if (newUrl) handleUpdateImage('main', newUrl);
                      }}
                    >
                      <FaEdit />
                    </Button>
                  </ImageActions>
                </ImageDisplay>
              ) : (
                <ImagePlaceholder>
                  <FaImage style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                  <div>Main Hotel Image</div>
                  <Button
                    size="small"
                    style={{ marginTop: theme.spacing.sm }}
                    onClick={() => {
                      const url = prompt('Enter image URL:');
                      if (url) handleFieldChange('image', url);
                    }}
                  >
                    <FaPlus /> Add Image
                  </Button>
                </ImagePlaceholder>
              )}
            </ImageCard>

            {editingHotel.images?.map((image, index) => (
              <ImageCard key={index} className="has-image">
                <ImageDisplay src={image}>
                  <ImageActions>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => {
                        const newUrl = prompt('Enter new image URL:', image);
                        if (newUrl) handleUpdateImage(index, newUrl);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrash />
                    </Button>
                  </ImageActions>
                </ImageDisplay>
              </ImageCard>
            ))}

            <ImageCard>
              <ImagePlaceholder>
                <FaPlus style={{ fontSize: '2rem', marginBottom: theme.spacing.sm }} />
                <div>Add New Image</div>
                <Button
                  size="small"
                  style={{ marginTop: theme.spacing.sm }}
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) handleAddImage();
                    setNewImageUrl(url || '');
                  }}
                >
                  <FaPlus /> Add Image
                </Button>
              </ImagePlaceholder>
            </ImageCard>
          </ImageGrid>
        </ImageSection>
      </EditingPanel>

      <EditingPanel>
        <AmenitiesSection>
          <SectionTitle>
            <FaConciergeBell />
            Hotel Amenities
          </SectionTitle>
          <AmenitiesGrid>
            {amenitiesList.map(amenity => (
              <AmenityItem
                key={amenity.id}
                selected={editingHotel.amenities?.includes(amenity.id)}
                onClick={() => toggleAmenity(amenity.id)}
              >
                <span>{amenity.icon}</span>
                <span>{amenity.name}</span>
              </AmenityItem>
            ))}
          </AmenitiesGrid>
        </AmenitiesSection>
      </EditingPanel>

      <EditingPanel>
        <SectionTitle>
          <FaClock />
          Check-in / Check-out Times
        </SectionTitle>
        <FormGrid>
          <FormField>
            <Label>Check-in Time</Label>
            <Input
              value={editingHotel.checkInTime || ''}
              onChange={(e) => handleFieldChange('checkInTime', e.target.value)}
              placeholder="e.g., 3:00 PM"
            />
          </FormField>
          <FormField>
            <Label>Check-out Time</Label>
            <Input
              value={editingHotel.checkOutTime || ''}
              onChange={(e) => handleFieldChange('checkOutTime', e.target.value)}
              placeholder="e.g., 11:00 AM"
            />
          </FormField>
        </FormGrid>
      </EditingPanel>

      <ActionButtons>
        <Button variant="outline" onClick={() => dispatch(setEditingHotel(null))}>
          Back to Selection
        </Button>
        <Button variant="secondary" onClick={handleDiscard} disabled={!hasUnsavedChanges}>
          <FaUndo /> Discard Changes
        </Button>
        <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
          <FaSave /> Save Changes
        </Button>
      </ActionButtons>
    </ContentManagerContainer>
  );
};

export default HotelContentManager;
