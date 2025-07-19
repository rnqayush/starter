import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUpload, FaCheck } from "react-icons/fa";
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

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xxl};
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
`;

const FormCard = styled(Card)`
  max-width: 800px;
`;

const HotelForm = styled.form`
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

const ImageUploadArea = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.gray400};
  margin-bottom: ${theme.spacing.md};
`;

const UploadText = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.sm};
`;

const UploadSubtext = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.gray500};
`;

const TimeInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
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

const AddHotelPage = () => {
  const navigate = useNavigate();
  const { setHotels, setOwnerHotels } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    description: "",
    starRating: "3",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    amenities: [],
    policies: ["ID proof required"],
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a server
    // For demo purposes, we'll use placeholder URLs
    const imageUrls = files.map(
      (_, index) =>
        `https://images.unsplash.com/photo-${1566073771259 + index}?ixlib=rb-4.0.3`,
    );

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newHotel = {
        id: Date.now(),
        ownerId: "owner123",
        name: formData.name,
        location: `${formData.city}`,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        description: formData.description,
        rating: 0,
        starRating: parseInt(formData.starRating),
        image:
          formData.images[0] ||
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
        images:
          formData.images.length > 0
            ? formData.images
            : [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
              ],
        amenities: formData.amenities,
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime,
        policies: formData.policies,
        startingPrice: 0,
        rooms: [],
      };

      const newOwnerHotel = {
        id: newHotel.id,
        ownerId: "owner123",
        name: formData.name,
        location: `${formData.city}`,
        status: "active",
        image: newHotel.image,
        totalRooms: 0,
        totalBookings: 0,
      };

      setHotels((prev) => [...prev, newHotel]);
      setOwnerHotels((prev) => [...prev, newOwnerHotel]);

      navigate("/owner/my-hotels");
    } catch (error) {
      console.error("Error adding hotel:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Sidebar />

      <MainContent>
        <PageHeader>
          <PageTitle>Add New Hotel</PageTitle>
          <PageSubtitle>
            Create a new hotel listing with details and amenities
          </PageSubtitle>
        </PageHeader>

        <FormCard>
          <CardContent>
            <HotelForm onSubmit={handleSubmit}>
              <div>
                <SectionTitle>Basic Information</SectionTitle>

                <FormGroup>
                  <Label>Hotel Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter hotel name"
                    required
                  />
                </FormGroup>

                <InputGroup>
                  <FormGroup>
                    <Label>City *</Label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Pincode *</Label>
                    <Input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter pincode"
                      required
                    />
                  </FormGroup>
                </InputGroup>

                <FormGroup>
                  <Label>Address *</Label>
                  <TextArea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter complete address"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Description *</Label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your hotel..."
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Star Rating</Label>
                  <Select
                    name="starRating"
                    value={formData.starRating}
                    onChange={handleInputChange}
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </Select>
                </FormGroup>
              </div>

              <div>
                <SectionTitle>Hotel Images</SectionTitle>
                <FormGroup>
                  <Label>Upload Images</Label>
                  <ImageUploadArea
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    <UploadIcon>
                      <FaUpload />
                    </UploadIcon>
                    <UploadText>Click to upload hotel images</UploadText>
                    <UploadSubtext>
                      Support: JPG, PNG, GIF up to 10MB
                    </UploadSubtext>
                  </ImageUploadArea>
                  <input
                    id="imageUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  {formData.images.length > 0 && (
                    <p
                      style={{
                        marginTop: theme.spacing.sm,
                        color: theme.colors.success,
                      }}
                    >
                      <FaCheck /> {formData.images.length} image(s) uploaded
                    </p>
                  )}
                </FormGroup>
              </div>

              <div>
                <SectionTitle>Amenities</SectionTitle>
                <FormGroup>
                  <Label>Select Available Amenities</Label>
                  <CheckboxGroup>
                    {amenitiesList.map((amenity) => (
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

              <div>
                <SectionTitle>Policies & Timings</SectionTitle>

                <TimeInputGroup>
                  <FormGroup>
                    <Label>Check-in Time</Label>
                    <Input
                      type="time"
                      name="checkInTime"
                      value={formData.checkInTime}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Check-out Time</Label>
                    <Input
                      type="time"
                      name="checkOutTime"
                      value={formData.checkOutTime}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </TimeInputGroup>
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
                  {isSubmitting ? "Adding Hotel..." : "Add Hotel"}
                </Button>
              </FormActions>
            </HotelForm>
          </CardContent>
        </FormCard>
      </MainContent>
    </PageContainer>
  );
};

export default AddHotelPage;
