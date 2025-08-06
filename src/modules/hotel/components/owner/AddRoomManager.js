import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaBed,
  FaUsers,
  FaImage,
  FaPlus,
  FaTrash,
  FaSave,
  FaUndo,
  FaGift,
} from 'react-icons/fa';
import { theme } from '../../../../styles/GlobalStyle';
import {
  addRoom,
  setEditingHotel,
  saveChanges,
  publishChanges,
} from '../../../../store/slices/hotelManagementSlice';
import { getHotelByIdOrSlug } from '../../../../DummyData';
import { Button } from '../../../../components/shared/Button';
import { Input } from '../../../../components/shared/Input';

const Container = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.gray50};
  min-height: 100vh;
`;

const Header = styled.div`
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

const FormCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
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

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ImageItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};
`;

const ImagePreview = styled.div`
  width: 80px;
  height: 60px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AmenitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const AmenityItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};
`;

const RemoveButton = styled.button`
  background: ${theme.colors.error};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.errorDark};
  }
`;

const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-weight: 500;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
`;

const AddRoomManager = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { editingHotel } = useSelector(state => state.hotelManagement);

  // Auto-select hotel based on URL slug
  useEffect(() => {
    if (slug && !editingHotel) {
      const hotelData = getHotelByIdOrSlug(slug);
      if (hotelData) {
        dispatch(setEditingHotel(hotelData.id));
      }
    }
  }, [slug, editingHotel, dispatch]);

  const [roomData, setRoomData] = useState({
    name: '',
    type: '',
    price: '',
    maxGuests: '',
    bedType: '',
    description: '',
    images: [''],
    amenities: [''],
    offer: '',
  });

  const updateField = (field, value) => {
    setRoomData(prev => ({ ...prev, [field]: value }));
  };

  const addImage = () => {
    setRoomData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = index => {
    setRoomData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index, value) => {
    setRoomData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }));
  };

  const addAmenity = () => {
    setRoomData(prev => ({ ...prev, amenities: [...prev.amenities, ''] }));
  };

  const removeAmenity = index => {
    setRoomData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const updateAmenity = (index, value) => {
    setRoomData(prev => ({
      ...prev,
      amenities: prev.amenities.map((amenity, i) =>
        i === index ? value : amenity
      ),
    }));
  };

  const handleSaveRoom = () => {
    if (!roomData.name || !roomData.type || !roomData.price) {
      alert('Please fill in all required fields (Name, Type, Price)');
      return;
    }

    const newRoom = {
      id: Date.now(), // Generate unique ID
      name: roomData.name,
      type: roomData.type,
      price: parseInt(roomData.price),
      maxGuests: parseInt(roomData.maxGuests) || 2,
      bedType: roomData.bedType,
      description: roomData.description,
      images: roomData.images.filter(img => img.trim()),
      amenities: roomData.amenities.filter(amenity => amenity.trim()),
      offer: roomData.offer,
    };

    dispatch(addRoom(newRoom));

    // Save changes to draft and publish to live data
    dispatch(saveChanges());
    dispatch(publishChanges());

    console.log('Room added and published to live data:', newRoom.name);

    // Reset form
    setRoomData({
      name: '',
      type: '',
      price: '',
      maxGuests: '',
      bedType: '',
      description: '',
      images: [''],
      amenities: [''],
      offer: '',
    });

    alert('Room added and published to live hotel page successfully!');
  };

  const handleReset = () => {
    setRoomData({
      name: '',
      type: '',
      price: '',
      maxGuests: '',
      bedType: '',
      description: '',
      images: [''],
      amenities: [''],
      offer: '',
    });
  };

  if (!editingHotel) {
    return (
      <Container>
        <Header>
          <Title>Add Room</Title>
          <Subtitle>Please select a hotel first to add rooms</Subtitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Add New Room</Title>
        <Subtitle>Add a new room to {editingHotel.name}</Subtitle>
      </Header>

      <FormCard>
        <SectionTitle>
          <FaBed />
          Basic Room Information
        </SectionTitle>
        <FormGrid>
          <FormField>
            <Label>Room Name *</Label>
            <Input
              value={roomData.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder="e.g., Deluxe Ocean View"
            />
          </FormField>
          <FormField>
            <Label>Room Type *</Label>
            <Input
              value={roomData.type}
              onChange={e => updateField('type', e.target.value)}
              placeholder="e.g., Deluxe, Suite, Standard"
            />
          </FormField>
          <FormField>
            <Label>Price per Night (₹) *</Label>
            <Input
              type="number"
              value={roomData.price}
              onChange={e => updateField('price', e.target.value)}
              placeholder="e.g., 8500"
            />
          </FormField>
          <FormField>
            <Label>Maximum Guests</Label>
            <Input
              type="number"
              value={roomData.maxGuests}
              onChange={e => updateField('maxGuests', e.target.value)}
              placeholder="e.g., 2"
            />
          </FormField>
          <FormField>
            <Label>Bed Type</Label>
            <Input
              value={roomData.bedType}
              onChange={e => updateField('bedType', e.target.value)}
              placeholder="e.g., King Size, Double Bed"
            />
          </FormField>
        </FormGrid>

        <FormField>
          <Label>Room Description</Label>
          <TextArea
            value={roomData.description}
            onChange={e => updateField('description', e.target.value)}
            placeholder="Enter detailed room description..."
          />
        </FormField>
      </FormCard>

      <FormCard>
        <SectionTitle>
          <FaGift />
          Special Offers & Rewards
        </SectionTitle>
        <FormField>
          <Label>Room Offers</Label>
          <TextArea
            value={roomData.offer}
            onChange={e => updateField('offer', e.target.value)}
            placeholder="Enter special offers, rewards, or perks for this room..."
            rows={4}
          />
        </FormField>
      </FormCard>

      <FormCard>
        <SectionTitle>
          <FaImage />
          Room Images
        </SectionTitle>
        <ImageList>
          {roomData.images.map((image, index) => (
            <ImageItem key={index}>
              {image && (
                <ImagePreview>
                  <img src={image} alt={`Room ${index + 1}`} />
                </ImagePreview>
              )}
              <Input
                value={image}
                onChange={e => updateImage(index, e.target.value)}
                placeholder="Enter image URL"
                style={{ flex: 1 }}
              />
              <RemoveButton onClick={() => removeImage(index)}>
                <FaTrash />
              </RemoveButton>
            </ImageItem>
          ))}
        </ImageList>
        <AddButton onClick={addImage}>
          <FaPlus /> Add Image
        </AddButton>
      </FormCard>

      <FormCard>
        <SectionTitle>
          <FaUsers />
          Room Amenities
        </SectionTitle>
        <AmenitiesList>
          {roomData.amenities.map((amenity, index) => (
            <AmenityItem key={index}>
              <Input
                value={amenity}
                onChange={e => updateAmenity(index, e.target.value)}
                placeholder="Enter amenity (e.g., WiFi, AC, TV)"
                style={{ flex: 1 }}
              />
              <RemoveButton onClick={() => removeAmenity(index)}>
                <FaTrash />
              </RemoveButton>
            </AmenityItem>
          ))}
        </AmenitiesList>
        <AddButton onClick={addAmenity}>
          <FaPlus /> Add Amenity
        </AddButton>
      </FormCard>

      <ActionButtons>
        <Button variant="outline" onClick={handleReset}>
          <FaUndo /> Reset Form
        </Button>
        <Button onClick={handleSaveRoom}>
          <FaSave /> Save Room
        </Button>
      </ActionButtons>
    </Container>
  );
};

export default AddRoomManager;
