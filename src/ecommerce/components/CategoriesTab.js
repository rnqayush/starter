import React, { useState } from "react";
import styled from "styled-components";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaImage,
  FaGripVertical,
  FaFolder,
  FaFolderOpen,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import Modal from "./shared/Modal";
import FormField from "./shared/FormField";
import Button from "./shared/Button";

const CategoriesContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  overflow: hidden;
`;

const CategoriesHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: between;
  gap: ${theme.spacing.lg};
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const HeaderTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const CategoriesList = styled.div`
  padding: ${theme.spacing.lg};
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray300};
  }
`;

const DragHandle = styled.div`
  color: ${theme.colors.gray400};
  cursor: grab;
  margin-right: ${theme.spacing.md};

  &:active {
    cursor: grabbing;
  }
`;

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md};
  color: ${theme.colors.primary};
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
  margin-right: ${theme.spacing.md};
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const CategoryDescription = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const CategoryStats = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-right: ${theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.white};
  color: ${theme.colors.gray600};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }

  &.danger:hover {
    border-color: ${theme.colors.error};
    color: ${theme.colors.error};
    background: ${theme.colors.error}10;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  color: ${theme.colors.gray400};
  font-size: 2rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.gray700};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const EmptyText = styled.p`
  color: ${theme.colors.gray500};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const ImageUploadArea = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CategoriesTab = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Digital devices and gadgets",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&q=80",
      productCount: 45,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing and accessories",
      image: null,
      productCount: 32,
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Home improvement and gardening",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&q=80",
      productCount: 28,
      isActive: true,
      sortOrder: 3,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", image: null });
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setShowModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat,
        ),
      );
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: 0,
        isActive: true,
        sortOrder: categories.length + 1,
      };
      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        {editingCategory ? "Update Category" : "Add Category"}
      </Button>
    </>
  );

  return (
    <>
      <CategoriesContainer>
        <CategoriesHeader>
          <HeaderLeft>
            <HeaderTitle>Categories</HeaderTitle>
            <HeaderSubtitle>
              Organize your products into categories
            </HeaderSubtitle>
          </HeaderLeft>

          <Button variant="primary" onClick={handleAddCategory}>
            <FaPlus />
            Add Category
          </Button>
        </CategoriesHeader>

        <CategoriesList>
          {categories.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <FaFolder />
              </EmptyIcon>
              <EmptyTitle>No categories yet</EmptyTitle>
              <EmptyText>
                Create your first category to organize your products
              </EmptyText>
              <Button variant="primary" onClick={handleAddCategory}>
                <FaPlus />
                Add Your First Category
              </Button>
            </EmptyState>
          ) : (
            categories.map((category) => (
              <CategoryItem key={category.id}>
                <DragHandle>
                  <FaGripVertical />
                </DragHandle>

                {category.image ? (
                  <CategoryImage src={category.image} alt={category.name} />
                ) : (
                  <CategoryIcon>
                    <FaFolder />
                  </CategoryIcon>
                )}

                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryDescription>
                    {category.description}
                  </CategoryDescription>
                </CategoryInfo>

                <CategoryStats>
                  <StatItem>
                    <StatValue>{category.productCount}</StatValue>
                    <StatLabel>Products</StatLabel>
                  </StatItem>
                </CategoryStats>

                <ActionButtons>
                  <ActionButton onClick={() => handleEditCategory(category)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    className="danger"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <FaTrash />
                  </ActionButton>
                </ActionButtons>
              </CategoryItem>
            ))
          )}
        </CategoriesList>
      </CategoriesContainer>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        footer={modalFooter}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter category name"
            required
          />

          <FormField
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Describe this category"
            rows={3}
          />

          <FormField label="Category Image">
            <ImageUploadArea
              onClick={() =>
                document.getElementById("categoryImageInput").click()
              }
            >
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <>
                  <FaImage
                    style={{
                      fontSize: "2rem",
                      color: theme.colors.gray400,
                      marginBottom: "8px",
                    }}
                  />
                  <p style={{ margin: 0, color: theme.colors.gray600 }}>
                    Click to upload image
                  </p>
                </>
              )}
            </ImageUploadArea>
            <HiddenFileInput
              id="categoryImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </FormField>
        </form>
      </Modal>
    </>
  );
};

export default CategoriesTab;
