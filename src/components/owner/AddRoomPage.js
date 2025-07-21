import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { Card, CardContent } from "../shared/Card";
import { Button } from "../shared/Button";
import {
  Input,
  FormGroup,
  Label,
  TextArea,
  Select,
  InputGroup,
  CheckboxGroup,
  CheckboxItem,
} from "../shared/Input";
import { theme } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";
import { amenitiesList } from "../../data/mockData";

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    padding-top: 80px;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  background: none;
  border: none;
  margin-bottom: ${theme.spacing.xl};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xxl};
`;

const FormCard = styled(Card)`
  max-width: 800px;
`;

const RoomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray900};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.gray200};
`;

const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const AddRoomPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { hotels, setHotels, setOwnerHotels } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    type: "Standard",
    price: "",
    maxGuests: "2",
    bedType: "Double Bed",
    description: "",
    amenities: [],
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const hotel = hotels.find((h) => h.id === parseInt(hotelId));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenityId, checked) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter((id) => id !== amenityId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newRoom = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        price: parseInt(formData.price),
        maxGuests: parseInt(formData.maxGuests),
        bedType: formData.bedType,
        description: formData.description,
        images:
          formData.images.length > 0
            ? formData.images
            : [
                "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3",
              ],
        amenities: formData.amenities,
      };

      // Update hotels data
      setHotels((prev) =>
        prev.map((h) =>
          h.id === parseInt(hotelId)
            ? { ...h, rooms: [...h.rooms, newRoom] }
            : h,
        ),
      );

      // Update owner hotels data
      setOwnerHotels((prev) =>
        prev.map((h) =>
          h.id === parseInt(hotelId)
            ? { ...h, totalRooms: h.totalRooms + 1 }
            : h,
        ),
      );

      navigate("/owner/my-hotels");
    } catch (error) {

    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <PageContainer>
      <Sidebar />

      <MainContent>
        <BackButton onClick={() => navigate("/owner/my-hotels")}>
          <FaArrowLeft />
          Back to My Hotels
        </BackButton>

        <PageTitle>Add Room</PageTitle>
        <PageSubtitle>Add a new room to {hotel.name}</PageSubtitle>

        <FormCard>
          <CardContent>
            <RoomForm onSubmit={handleSubmit}>
              <div>
                <SectionTitle>Room Details</SectionTitle>

                <FormGroup>
                  <Label>Room Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Deluxe AC Room"
                    required
                  />
                </FormGroup>

                <InputGroup>
                  <FormGroup>
                    <Label>Room Type</Label>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                      <option value="Premium">Premium</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Price per Night (₹) *</Label>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      required
                    />
                  </FormGroup>
                </InputGroup>

                <InputGroup>
                  <FormGroup>
                    <Label>Max Guests</Label>
                    <Select
                      name="maxGuests"
                      value={formData.maxGuests}
                      onChange={handleInputChange}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Bed Type</Label>
                    <Select
                      name="bedType"
                      value={formData.bedType}
                      onChange={handleInputChange}
                    >
                      <option value="Single Bed">Single Bed</option>
                      <option value="Double Bed">Double Bed</option>
                      <option value="King Size">King Size</option>
                      <option value="Queen Size">Queen Size</option>
                      <option value="Twin Beds">Twin Beds</option>
                    </Select>
                  </FormGroup>
                </InputGroup>

                <FormGroup>
                  <Label>Room Description *</Label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the room features and amenities..."
                    required
                  />
                </FormGroup>
              </div>

              <div>
                <SectionTitle>Room Amenities</SectionTitle>
                <FormGroup>
                  <Label>Select Room Amenities</Label>
                  <CheckboxGroup>
                    {amenitiesList.slice(0, 10).map((amenity) => (
                      <CheckboxItem key={amenity.id}>
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity.id)}
                          onChange={(e) =>
                            handleAmenityChange(amenity.id, e.target.checked)
                          }
                        />
                        <span>
                          {amenity.icon} {amenity.name}
                        </span>
                      </CheckboxItem>
                    ))}
                  </CheckboxGroup>
                </FormGroup>
              </div>

              <FormActions>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/owner/my-hotels")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} size="large">
                  {isSubmitting ? "Adding Room..." : "Add Room"}
                </Button>
              </FormActions>
            </RoomForm>
          </CardContent>
        </FormCard>
      </MainContent>
    </PageContainer>
  );
};

export default AddRoomPage;
