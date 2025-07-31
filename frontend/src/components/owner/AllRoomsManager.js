import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaBed,
  FaUsers,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaPlus,
  FaImage,
  FaGift,
  FaEye,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  updateRoom,
  removeRoom,
  setEditingHotel,
} from '../../store/slices/hotelManagementSlice';
import { getHotelByIdOrSlug } from '../../DummyData';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Card, CardContent } from '../shared/Card';

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

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.xl};
`;

const RoomCard = styled(Card)`
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const RoomImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  position: relative;
`;

const RoomInfo = styled.div`
  padding: ${theme.spacing.lg};
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const RoomName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const RoomType = styled.span`
  color: ${theme.colors.primary};
  font-weight: 500;
  font-size: 0.9rem;
`;

const RoomPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const RoomDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
`;

const RoomDescription = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const RoomOffer = styled.div`
  background: ${theme.colors.warning}20;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid ${theme.colors.warning};
  margin-bottom: ${theme.spacing.md};
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
`;

const AmenitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const AmenityTag = styled.span`
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  color: ${theme.colors.gray700};
`;

const RoomActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: flex-end;
`;

const EditModal = styled.div`
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

const EditContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${theme.spacing.xl};
`;

const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const EditTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.gray700};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
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
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};
`;

const AllRoomsManager = () => {
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

  const [editingRoom, setEditingRoom] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditRoom = room => {
    setEditingRoom(room.id);
    setEditData({ ...room });
  };

  const handleSaveEdit = () => {
    dispatch(updateRoom({ roomId: editingRoom, updates: editData }));
    setEditingRoom(null);
    setEditData({});
    alert('Room updated successfully!');
  };

  const handleDeleteRoom = roomId => {
    if (
      window.confirm(
        'Are you sure you want to delete this room? This action cannot be undone.'
      )
    ) {
      dispatch(removeRoom(roomId));
      alert('Room deleted successfully!');
    }
  };

  const handleCloseEdit = () => {
    setEditingRoom(null);
    setEditData({});
  };

  const updateEditField = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const updateEditImage = (index, value) => {
    const newImages = [...editData.images];
    newImages[index] = value;
    updateEditField('images', newImages);
  };

  const addEditImage = () => {
    updateEditField('images', [...editData.images, '']);
  };

  const removeEditImage = index => {
    const newImages = editData.images.filter((_, i) => i !== index);
    updateEditField('images', newImages);
  };

  const updateEditAmenity = (index, value) => {
    const newAmenities = [...editData.amenities];
    newAmenities[index] = value;
    updateEditField('amenities', newAmenities);
  };

  const addEditAmenity = () => {
    updateEditField('amenities', [...editData.amenities, '']);
  };

  const removeEditAmenity = index => {
    const newAmenities = editData.amenities.filter((_, i) => i !== index);
    updateEditField('amenities', newAmenities);
  };

  if (!editingHotel) {
    return (
      <Container>
        <Header>
          <Title>All Rooms</Title>
          <Subtitle>Please select a hotel first to view rooms</Subtitle>
        </Header>
      </Container>
    );
  }

  const rooms = editingHotel.rooms || [];

  return (
    <Container>
      <Header>
        <Title>All Rooms</Title>
        <Subtitle>
          Manage rooms for {editingHotel.name} ({rooms.length} rooms)
        </Subtitle>
      </Header>

      {rooms.length === 0 ? (
        <EmptyState>
          <FaBed
            style={{
              fontSize: '4rem',
              marginBottom: theme.spacing.lg,
              opacity: 0.5,
            }}
          />
          <h3>No rooms added yet</h3>
          <p>Start by adding your first room to this hotel.</p>
        </EmptyState>
      ) : (
        <RoomsGrid>
          {rooms.map(room => (
            <RoomCard key={room.id}>
              <RoomImage
                src={
                  room.images?.[0] ||
                  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3'
                }
              />
              <RoomInfo>
                <RoomHeader>
                  <div>
                    <RoomName>{room.name}</RoomName>
                    <RoomType>{room.type}</RoomType>
                  </div>
                  <RoomPrice>₹{room.price?.toLocaleString()}</RoomPrice>
                </RoomHeader>

                <RoomDetails>
                  <div>
                    <FaUsers /> {room.maxGuests} guests
                  </div>
                  <div>
                    <FaBed /> {room.bedType}
                  </div>
                </RoomDetails>

                <RoomDescription>{room.description}</RoomDescription>

                {room.offer && (
                  <RoomOffer>
                    <strong>Special Offer:</strong> {room.offer}
                  </RoomOffer>
                )}

                <AmenitiesList>
                  {room.amenities?.map((amenity, index) => (
                    <AmenityTag key={index}>{amenity}</AmenityTag>
                  ))}
                </AmenitiesList>

                <RoomActions>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => handleEditRoom(room)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </RoomActions>
              </RoomInfo>
            </RoomCard>
          ))}
        </RoomsGrid>
      )}

      {/* Edit Modal */}
      {editingRoom && (
        <EditModal onClick={handleCloseEdit}>
          <EditContent onClick={e => e.stopPropagation()}>
            <EditHeader>
              <EditTitle>Edit Room: {editData.name}</EditTitle>
              <CloseButton onClick={handleCloseEdit}>
                <FaTimes />
              </CloseButton>
            </EditHeader>

            <FormGrid>
              <FormField>
                <Label>Room Name</Label>
                <Input
                  value={editData.name || ''}
                  onChange={e => updateEditField('name', e.target.value)}
                />
              </FormField>
              <FormField>
                <Label>Room Type</Label>
                <Input
                  value={editData.type || ''}
                  onChange={e => updateEditField('type', e.target.value)}
                />
              </FormField>
              <FormField>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={editData.price || ''}
                  onChange={e =>
                    updateEditField('price', parseInt(e.target.value))
                  }
                />
              </FormField>
              <FormField>
                <Label>Max Guests</Label>
                <Input
                  type="number"
                  value={editData.maxGuests || ''}
                  onChange={e =>
                    updateEditField('maxGuests', parseInt(e.target.value))
                  }
                />
              </FormField>
              <FormField>
                <Label>Bed Type</Label>
                <Input
                  value={editData.bedType || ''}
                  onChange={e => updateEditField('bedType', e.target.value)}
                />
              </FormField>
            </FormGrid>

            <FormField style={{ marginBottom: theme.spacing.lg }}>
              <Label>Description</Label>
              <TextArea
                value={editData.description || ''}
                onChange={e => updateEditField('description', e.target.value)}
              />
            </FormField>

            <FormField style={{ marginBottom: theme.spacing.lg }}>
              <Label>Special Offers</Label>
              <TextArea
                value={editData.offer || ''}
                onChange={e => updateEditField('offer', e.target.value)}
                placeholder="Enter special offers or rewards for this room..."
              />
            </FormField>

            <FormField style={{ marginBottom: theme.spacing.lg }}>
              <Label>Images</Label>
              {editData.images?.map((image, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: theme.spacing.sm,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <Input
                    value={image}
                    onChange={e => updateEditImage(index, e.target.value)}
                    placeholder="Image URL"
                    style={{ flex: 1 }}
                  />
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => removeEditImage(index)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button size="small" onClick={addEditImage}>
                <FaPlus /> Add Image
              </Button>
            </FormField>

            <FormField style={{ marginBottom: theme.spacing.lg }}>
              <Label>Amenities</Label>
              {editData.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: theme.spacing.sm,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <Input
                    value={amenity}
                    onChange={e => updateEditAmenity(index, e.target.value)}
                    placeholder="Amenity"
                    style={{ flex: 1 }}
                  />
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => removeEditAmenity(index)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button size="small" onClick={addEditAmenity}>
                <FaPlus /> Add Amenity
              </Button>
            </FormField>

            <div
              style={{
                display: 'flex',
                gap: theme.spacing.md,
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="outline" onClick={handleCloseEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                <FaSave /> Save Changes
              </Button>
            </div>
          </EditContent>
        </EditModal>
      )}
    </Container>
  );
};

export default AllRoomsManager;
