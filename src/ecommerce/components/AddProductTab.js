import React, { useState } from "react";
import styled from "styled-components";
import { FaUpload, FaTimes, FaSave, FaArrowLeft } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { productCategories } from "../data/sellerData";

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  overflow: hidden;
`;

const FormHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const FormTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const FormSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const FormBody = styled.form`
  padding: ${theme.spacing.xl};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.xl};

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const RequiredMark = styled.span`
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.xs};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &:invalid {
    border-color: ${theme.colors.error};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  background: ${theme.colors.gray50};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }

  &.dragover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }
`;

const UploadIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${theme.spacing.lg};
  background: ${theme.colors.primary}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-size: 1.5rem;
`;

const UploadText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.gray700};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-weight: 500;
`;

const UploadSubtext = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.gray500};
  margin: 0;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const ImagePreview = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${theme.colors.gray200};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: ${theme.spacing.xs};
  right: ${theme.spacing.xs};
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.errorDark};
    transform: scale(1.1);
  }
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.primaryDark};
      transform: translateY(-1px);
    }

    &:disabled {
      background: ${theme.colors.gray400};
      cursor: not-allowed;
      transform: none;
    }
  }

  &.secondary {
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};
    border: 1px solid ${theme.colors.gray300};

    &:hover {
      background: ${theme.colors.gray50};
      border-color: ${theme.colors.gray400};
    }
  }
`;

const PriceInputGroup = styled.div`
  position: relative;
`;

const CurrencySymbol = styled.span`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray500};
  font-weight: 500;
`;

const PriceInput = styled(Input)`
  padding-left: ${theme.spacing.xxl};
`;

const AddProductTab = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    images: [],
  });

  const [dragOver, setDragOver] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleImageRemove = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    alert("Product added successfully!");
  };

  const isFormValid =
    formData.name && formData.price && formData.stock && formData.category;

  return (
    <FormContainer>
      <FormCard>
        <FormHeader>
          <FormTitle>Add New Product</FormTitle>
          <FormSubtitle>
            Fill in the details to add a new product to your store
          </FormSubtitle>
        </FormHeader>

        <FormBody onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label>
                Product Name
                <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Category
                <RequiredMark>*</RequiredMark>
              </Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>
                Price
                <RequiredMark>*</RequiredMark>
              </Label>
              <PriceInputGroup>
                <CurrencySymbol>$</CurrencySymbol>
                <PriceInput
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </PriceInputGroup>
            </FormGroup>

            <FormGroup>
              <Label>
                Stock Quantity
                <RequiredMark>*</RequiredMark>
              </Label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                min="0"
                required
              />
            </FormGroup>

            <FormGroup className="full-width">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product features, benefits, and specifications..."
              />
            </FormGroup>

            <FormGroup className="full-width">
              <Label>Product Images</Label>
              <ImageUploadArea
                className={dragOver ? "dragover" : ""}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("imageInput").click()}
              >
                <UploadIcon>
                  <FaUpload />
                </UploadIcon>
                <UploadText>Click to upload or drag and drop</UploadText>
                <UploadSubtext>PNG, JPG, GIF up to 10MB each</UploadSubtext>
              </ImageUploadArea>

              <HiddenFileInput
                id="imageInput"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
              />

              {formData.images.length > 0 && (
                <ImagePreviewGrid>
                  {formData.images.map((image) => (
                    <ImagePreview key={image.id}>
                      <PreviewImage src={image.url} alt="Product preview" />
                      <RemoveImageButton
                        type="button"
                        onClick={() => handleImageRemove(image.id)}
                      >
                        <FaTimes />
                      </RemoveImageButton>
                    </ImagePreview>
                  ))}
                </ImagePreviewGrid>
              )}
            </FormGroup>
          </FormGrid>
        </FormBody>

        <FormActions>
          <Button type="button" className="secondary">
            <FaArrowLeft />
            Cancel
          </Button>

          <Button
            type="submit"
            className="primary"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            <FaSave />
            Add Product
          </Button>
        </FormActions>
      </FormCard>
    </FormContainer>
  );
};

export default AddProductTab;
