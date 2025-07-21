import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaEdit,
  FaImage,
  FaPlus,
  FaTrash,
  FaSave,
  FaTimes,
  FaEye,
  FaImages,
  FaSwimmingPool,
  FaStar,
  FaPhone,
  FaArrowLeft,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Sidebar from "./Sidebar";
import { Card, CardContent } from "../shared/Card";
import { Button } from "../shared/Button";
import { getHotelByIdOrSlug } from "../../hotel/data/hotels";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 17.5rem;
  padding: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    padding-top: 5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.lg};
    align-items: stretch;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: stretch;
  }
`;

const BackButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const ContentCard = styled(Card)`
  height: fit-content;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  background: ${theme.colors.gray50};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }

  .upload-icon {
    font-size: 3rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.md};
  }

  .upload-text {
    color: ${theme.colors.gray600};
    font-weight: 500;
  }
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const ImageItem = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }
  
  .remove-btn {
    position: absolute;
    top: ${theme.spacing.xs};
    right: ${theme.spacing.xs};
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${theme.colors.error};
    font-size: 0.8rem;
    
    &:hover {
      background: ${theme.colors.white};
    }
  }
`;





const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;





const ActionButton = styled.button`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray300};
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  &.danger:hover {
    border-color: ${theme.colors.error};
    color: ${theme.colors.error};
  }
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const FeatureItem = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SaveButton = styled(Button)`
  align-self: flex-start;
  margin-top: ${theme.spacing.lg};
`;

const HotelContentManager = () => {
  const { hotelSlug } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    aboutUs: "",
    address: "",
    phone: "",
    email: "",
    checkInTime: "",
    checkOutTime: "",
  });

  const [features, setFeatures] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (hotelSlug) {
      const foundHotel = getHotelByIdOrSlug(hotelSlug);
      if (foundHotel) {
        setHotel(foundHotel);
        setFormData({
          name: foundHotel.name || "",
          description: foundHotel.description || "",
          aboutUs: `${foundHotel.name} stands as a beacon of luxury and elegance in the heart of ${foundHotel.city}. With our rich heritage of hospitality excellence spanning decades, we have been creating unforgettable experiences for discerning travelers from around the world.`,
          address: foundHotel.address || "",
          phone: "+91 22 6601 1825",
          email: `reservations@${foundHotel.slug}.com`,
          checkInTime: foundHotel.checkInTime || "",
          checkOutTime: foundHotel.checkOutTime || "",
        });
        setFeatures([
          "24/7 Concierge Service",
          "Luxury Amenities",
          "Business Center",
          "Airport Transfer"
        ]);
        setAmenities(foundHotel.amenities || []);
        setGallery(foundHotel.images || []);
      }
    }
    setLoading(false);
  }, [hotelSlug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveBasicInfo = (e) => {
    e.preventDefault();
    // Here you would save to your backend
    console.log("Saving basic info:", formData);
    alert("Basic information saved!");
  };

  const addFeature = () => {
    const feature = prompt("Enter new feature:");
    if (feature) {
      setFeatures(prev => [...prev, feature]);
    }
  };

  const removeFeature = (index) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const addAmenity = () => {
    const amenity = prompt("Enter new amenity:");
    if (amenity) {
      setAmenities(prev => [...prev, amenity]);
    }
  };

  const removeAmenity = (index) => {
    setAmenities(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload to your image service
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGallery(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <DashboardContainer>
        <Sidebar />
        <MainContent>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Loading...</h2>
          </div>
        </MainContent>
      </DashboardContainer>
    );
  }

  if (!hotel) {
    return (
      <DashboardContainer>
        <Sidebar />
        <MainContent>
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Hotel not found</h2>
            <p>Please select a valid hotel to manage.</p>
          </div>
        </MainContent>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Sidebar />

      <MainContent>
        <Header>
          <Title>Manage {hotel.name}</Title>
          <HeaderActions>
            <BackButton onClick={() => navigate("/owner/dashboard")}>
              <FaArrowLeft />
              Back to Dashboard
            </BackButton>
            <Button
              variant="outline"
              onClick={() => window.open(`/${hotel.slug}`, '_blank')}
            >
              <FaEye />
              View Live Site
            </Button>
          </HeaderActions>
        </Header>

        <ContentGrid>
          {/* Basic Information */}
          <ContentCard>
            <CardContent>
              <CardTitle>
                <FaEdit />
                Basic Information
              </CardTitle>
              <Form onSubmit={handleSaveBasicInfo}>
                <FormGroup>
                  <Label htmlFor="name">Hotel Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="description">Short Description</Label>
                  <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="aboutUs">About Us (Full Description)</Label>
                  <TextArea
                    id="aboutUs"
                    name="aboutUs"
                    value={formData.aboutUs}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </FormGroup>

                <SaveButton type="submit">
                  <FaSave />
                  Save Basic Info
                </SaveButton>
              </Form>
            </CardContent>
          </ContentCard>

          {/* Contact Information */}
          <ContentCard>
            <CardContent>
              <CardTitle>
                <FaPhone />
                Contact Information
              </CardTitle>
              <Form>
                <FormGroup>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="checkInTime">Check-in Time</Label>
                  <Input
                    type="text"
                    id="checkInTime"
                    name="checkInTime"
                    value={formData.checkInTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 3:00 PM"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="checkOutTime">Check-out Time</Label>
                  <Input
                    type="text"
                    id="checkOutTime"
                    name="checkOutTime"
                    value={formData.checkOutTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 11:00 AM"
                  />
                </FormGroup>

                <SaveButton>
                  <FaSave />
                  Save Contact Info
                </SaveButton>
              </Form>
            </CardContent>
          </ContentCard>
        </ContentGrid>

        {/* Features Management */}
        <ContentCard style={{ marginBottom: theme.spacing.xl }}>
          <CardContent>
            <SectionHeader>
              <CardTitle>
                <FaStar />
                Why Choose Us Features
              </CardTitle>
              <Button variant="outline" onClick={addFeature}>
                <FaPlus />
                Add Feature
              </Button>
            </SectionHeader>
            
            <FeaturesList>
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  <span>{feature}</span>
                  <ActionButton className="danger" onClick={() => removeFeature(index)}>
                    <FaTrash />
                  </ActionButton>
                </FeatureItem>
              ))}
            </FeaturesList>
          </CardContent>
        </ContentCard>

        {/* Amenities Management */}
        <ContentCard style={{ marginBottom: theme.spacing.xl }}>
          <CardContent>
            <SectionHeader>
              <CardTitle>
                <FaSwimmingPool />
                Hotel Amenities
              </CardTitle>
              <Button variant="outline" onClick={addAmenity}>
                <FaPlus />
                Add Amenity
              </Button>
            </SectionHeader>
            
            <FeaturesList>
              {amenities.map((amenity, index) => (
                <FeatureItem key={index}>
                  <span>{amenity}</span>
                  <ActionButton className="danger" onClick={() => removeAmenity(index)}>
                    <FaTrash />
                  </ActionButton>
                </FeatureItem>
              ))}
            </FeaturesList>
          </CardContent>
        </ContentCard>

        {/* Gallery Management */}
        <ContentCard>
          <CardContent>
            <CardTitle>
              <FaImages />
              Hotel Gallery
            </CardTitle>
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="gallery-upload"
            />
            
            <ImageUploadArea
              onClick={() => document.getElementById('gallery-upload').click()}
            >
              <FaImage className="upload-icon" />
              <div className="upload-text">
                Click to upload hotel images
              </div>
            </ImageUploadArea>

            {gallery.length > 0 && (
              <ImagePreview>
                {gallery.map((image, index) => (
                  <ImageItem key={index}>
                    <img src={image} alt={`Gallery ${index + 1}`} />
                    <button
                      className="remove-btn"
                      onClick={() => removeImage(index)}
                    >
                      <FaTimes />
                    </button>
                  </ImageItem>
                ))}
              </ImagePreview>
            )}
          </CardContent>
        </ContentCard>
      </MainContent>
    </DashboardContainer>
  );
};

export default HotelContentManager;
