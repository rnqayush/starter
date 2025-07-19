import React, { useState } from "react";
import styled from "styled-components";
import {
  FaUpload,
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaBarcode,
  FaTag,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import FormField from "./shared/FormField";
import Button from "./shared/Button";
import { productCategories } from "../data/sellerData";

const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const FormCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  overflow: hidden;
  margin-bottom: ${theme.spacing.xl};
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

const FormBody = styled.div`
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

const VariantCard = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  background: ${theme.colors.gray50};
`;

const VariantHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${theme.spacing.md};
`;

const VariantTitle = styled.h5`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0;
`;








  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
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

const AddProductTabEnhanced = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    sku: "",
    barcode: "",
    price: "",
    compareAtPrice: "",
    stock: "",
    lowStockThreshold: "",
    weight: "",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    tags: [],
    images: [],
    variants: [],
  });

  const [dragOver, setDragOver] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

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

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addVariant = () => {
    const newVariant = {
      id: Date.now(),
      option1: "",
      option2: "",
      price: "",
      sku: "",
      barcode: "",
      stock: "",
      weight: "",
    };
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const removeVariant = (variantId) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== variantId),
    }));
  };

  const updateVariant = (variantId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === variantId ? { ...v, [field]: value } : v,
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product data:", formData);
    alert("Product saved successfully!");
  };

  const generateSKU = () => {
    const prefix = formData.name.substring(0, 3).toUpperCase() || "PRD";
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    setFormData((prev) => ({ ...prev, sku: `${prefix}-${random}` }));
  };

  const generateBarcode = () => {
    const barcode = Math.floor(Math.random() * 1000000000000)
      .toString()
      .padStart(12, "0");
    setFormData((prev) => ({ ...prev, barcode }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        {/* Basic Information */}
        <FormCard>
          <FormHeader>
            <FormTitle>Basic Information</FormTitle>
            <FormSubtitle>
              Essential product details and description
            </FormSubtitle>
          </FormHeader>
          <FormBody>
            <FormField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />

            <FormField
              label="Description"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product features, benefits, and specifications..."
              rows={4}
            />

            <FormGrid>
              <FormField
                label="Category"
                type="select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={productCategories.map((cat) => ({
                  value: cat,
                  label: cat,
                }))}
                required
              />

              <FormField
                label="Product Status"
                type="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "active", label: "Active" },
                  { value: "archived", label: "Archived" },
                ]}
                required
              />
            </FormGrid>
          </FormBody>
        </FormCard>

        {/* Pricing & Inventory */}
        <FormCard>
          <FormHeader>
            <FormTitle>Pricing & Inventory</FormTitle>
            <FormSubtitle>
              Set pricing, stock levels, and inventory tracking
            </FormSubtitle>
          </FormHeader>
          <FormBody>
            <FormGrid>
              <FormField
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />

              <FormField
                label="Compare at Price (MSRP)"
                type="number"
                name="compareAtPrice"
                value={formData.compareAtPrice}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                helpText="Show customers how much they save"
              />
            </FormGrid>

            <FormGrid>
              <FormField
                label="Stock Quantity"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                min="0"
                required
              />

              <FormField
                label="Low Stock Threshold"
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleInputChange}
                placeholder="5"
                min="0"
                helpText="Get alerts when stock falls below this level"
              />
            </FormGrid>
          </FormBody>
        </FormCard>

        {/* Product Identity */}
        <FormCard>
          <FormHeader>
            <FormTitle>Product Identity</FormTitle>
            <FormSubtitle>SKU, barcode, and tracking information</FormSubtitle>
          </FormHeader>
          <FormBody>
            <FormGrid>
              <div>
                <FormField
                  label="SKU (Stock Keeping Unit)"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateSKU}
                >
                  <FaTag />
                  Generate SKU
                </Button>
              </div>

              <div>
                <FormField
                  label="Barcode"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  placeholder="Enter barcode"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateBarcode}
                >
                  <FaBarcode />
                  Generate Barcode
                </Button>
              </div>
            </FormGrid>

            <FormField
              label="Weight (kg)"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="0.0"
              min="0"
              step="0.1"
              helpText="Used for calculating shipping costs"
            />
          </FormBody>
        </FormCard>

        {/* Product Images */}
        <FormCard>
          <FormHeader>
            <FormTitle>Product Images</FormTitle>
            <FormSubtitle>
              Upload high-quality images of your product
            </FormSubtitle>
          </FormHeader>
          <FormBody>
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
              <UploadSubtext>
                PNG, JPG, GIF up to 10MB each. First image will be the main
                product image.
              </UploadSubtext>
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
          </FormBody>
        </FormCard>

        {/* Product Variants */}
        <FormCard>
          <FormHeader>
            <FormTitle>Product Variants</FormTitle>
            <FormSubtitle>
              Add variants like size, color, style (optional)
            </FormSubtitle>
          </FormHeader>
          <FormBody>
            <div style={{ marginBottom: theme.spacing.lg }}>
              <Button type="button" variant="outline" onClick={addVariant}>
                <FaPlus />
                Add Variant
              </Button>
            </div>

            {formData.variants.map((variant) => (
              <VariantCard key={variant.id}>
                <VariantHeader>
                  <VariantTitle>
                    Variant #{formData.variants.indexOf(variant) + 1}
                  </VariantTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVariant(variant.id)}
                  >
                    <FaTrash />
                  </Button>
                </VariantHeader>

                <FormGrid>
                  <FormField
                    label="Option 1 (e.g., Size)"
                    value={variant.option1}
                    onChange={(e) =>
                      updateVariant(variant.id, "option1", e.target.value)
                    }
                    placeholder="S, M, L, XL"
                  />

                  <FormField
                    label="Option 2 (e.g., Color)"
                    value={variant.option2}
                    onChange={(e) =>
                      updateVariant(variant.id, "option2", e.target.value)
                    }
                    placeholder="Red, Blue, Green"
                  />
                </FormGrid>

                <FormGrid>
                  <FormField
                    label="Variant Price"
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      updateVariant(variant.id, "price", e.target.value)
                    }
                    placeholder="0.00"
                    step="0.01"
                  />

                  <FormField
                    label="Variant Stock"
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariant(variant.id, "stock", e.target.value)
                    }
                    placeholder="0"
                  />
                </FormGrid>

                <FormGrid>
                  <FormField
                    label="Variant SKU"
                    value={variant.sku}
                    onChange={(e) =>
                      updateVariant(variant.id, "sku", e.target.value)
                    }
                    placeholder="Unique SKU"
                  />

                  <FormField
                    label="Variant Barcode"
                    value={variant.barcode}
                    onChange={(e) =>
                      updateVariant(variant.id, "barcode", e.target.value)
                    }
                    placeholder="Barcode"
                  />
                </FormGrid>
              </VariantCard>
            ))}
          </FormBody>
        </FormCard>

        {/* SEO & Tags */}
        <FormCard>
          <FormHeader>
            <FormTitle>SEO & Search</FormTitle>
            <FormSubtitle>
              Optimize for search engines and internal search
            </FormSubtitle>
          </FormHeader>
          <FormBody>
            <FormField
              label="SEO Title"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleInputChange}
              placeholder="Optimized title for search engines"
              helpText="Recommended: 50-60 characters"
            />

            <FormField
              label="SEO Description"
              type="textarea"
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleInputChange}
              placeholder="Description that appears in search results"
              rows={3}
              helpText="Recommended: 150-160 characters"
            />

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: theme.colors.gray700,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Product Tags
              </label>
              <div
                style={{
                  display: "flex",
                  gap: theme.spacing.sm,
                  marginBottom: theme.spacing.sm,
                }}
              >
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  style={{
                    flex: 1,
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.gray300}`,
                    borderRadius: theme.borderRadius.md,
                    fontSize: "0.9rem",
                  }}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Add Tag
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing.sm,
                }}
              >
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: theme.colors.primary + "20",
                      color: theme.colors.primary,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderRadius: theme.borderRadius.sm,
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: theme.spacing.xs,
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "inherit",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </FormBody>
        </FormCard>

        <FormActions>
          <Button type="button" variant="ghost">
            <FaArrowLeft />
            Cancel
          </Button>

          <div style={{ display: "flex", gap: theme.spacing.md }}>
            <Button type="submit" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" variant="primary">
              <FaSave />
              Save & Publish
            </Button>
          </div>
        </FormActions>
      </FormContainer>
    </form>
  );
};

export default AddProductTabEnhanced;