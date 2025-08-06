import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaTag,
} from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import {
  selectCategories,
  selectLoading,
} from '../../../store/slices/automobileManagementSlice';

const Container = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.green500}20;
  color: ${theme.colors.green500};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`;

const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => !['variant', 'small'].includes(prop),
})`
  padding: ${props =>
    props.small
      ? theme.spacing.xs + ' ' + theme.spacing.sm
      : theme.spacing.sm + ' ' + theme.spacing.md};
  border: ${props => {
    if (props.variant === 'danger') return '1px solid ' + theme.colors.error;
    if (props.variant === 'primary') return '1px solid ' + theme.colors.primary;
    return '1px solid ' + theme.colors.gray300;
  }};
  background: ${props => {
    if (props.variant === 'danger') return theme.colors.error;
    if (props.variant === 'primary') return theme.colors.primary;
    return theme.colors.white;
  }};
  color: ${props => {
    if (props.variant === 'danger' || props.variant === 'primary')
      return theme.colors.white;
    return theme.colors.gray700;
  }};
  border-radius: ${theme.borderRadius.md};
  font-size: ${props => (props.small ? '0.8rem' : '0.9rem')};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => {
      if (props.variant === 'danger') return theme.colors.errorDark;
      if (props.variant === 'primary') return theme.colors.primaryDark;
      return theme.colors.gray50;
    }};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Content = styled.div`
  padding: ${theme.spacing.xl};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const CategoryCard = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CategoryContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const CategorySlug = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.gray500};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-family: 'Courier New', monospace;
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0 0 ${theme.spacing.md} 0;
  line-height: 1.5;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  margin-top: ${theme.spacing.xs};
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const Tag = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary}15;
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const Modal = styled.div.withConfig({
  shouldForwardProp: prop => !['isOpen'].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Checkbox = styled.input`
  margin-right: ${theme.spacing.sm};
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  min-height: 50px;
  align-items: center;
`;

const TagInputField = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  font-size: 0.9rem;
`;

const EditableTag = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary}15;
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.xs};
  cursor: pointer;
  font-size: 0.7rem;

  &:hover {
    color: ${theme.colors.errorDark};
  }
`;

const ModalFooter = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
`;

const CategoryManagement = ({ dealer }) => {
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    image: '',
    description: '',
    vehicleCount: 0,
    priceRange: { min: 0, max: 0 },
    featured: false,
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEditing && categoryData.name) {
      const slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setCategoryData(prev => ({ ...prev, slug }));
    }
  }, [categoryData.name, isEditing]);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingCategoryId(null);
    setCategoryData({
      name: '',
      slug: '',
      image: '',
      description: '',
      vehicleCount: 0,
      priceRange: { min: 0, max: 0 },
      featured: false,
      tags: [],
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const openEditModal = category => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setCategoryData({
      name: category.name || '',
      slug: category.slug || '',
      image: category.image || '',
      description: category.description || '',
      vehicleCount: category.vehicleCount || 0,
      priceRange: category.priceRange || { min: 0, max: 0 },
      featured: category.featured || false,
      tags: category.tags || [],
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingCategoryId(null);
    setCategoryData({
      name: '',
      slug: '',
      image: '',
      description: '',
      vehicleCount: 0,
      priceRange: { min: 0, max: 0 },
      featured: false,
      tags: [],
    });
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !categoryData.tags.includes(tagInput.trim())) {
      setCategoryData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = tagToRemove => {
    setCategoryData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSave = () => {
    if (!categoryData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    if (!categoryData.slug.trim()) {
      alert('Please enter a category slug');
      return;
    }

    // In a real app, this would dispatch actions to save to backend
    // For now, we'll just show alerts
    if (isEditing) {
      alert('Category updated successfully!');
      console.log('Updated category:', {
        id: editingCategoryId,
        ...categoryData,
      });
    } else {
      alert('Category created successfully!');
      console.log('Created category:', { id: Date.now(), ...categoryData });
    }
    closeModal();
  };

  const handleDelete = (categoryId, categoryName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the category "${categoryName}"?`
      )
    ) {
      alert('Category deleted successfully!');
      console.log('Deleted category:', categoryId);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Loading Categories...</HeaderTitle>
        </Header>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <HeaderLeft>
            <SectionIcon>
              <FaTag />
            </SectionIcon>
            <HeaderTitle>Category Management</HeaderTitle>
          </HeaderLeft>
          <HeaderActions>
            <ActionButton variant="primary" onClick={openCreateModal}>
              <FaPlus />
              Create Category
            </ActionButton>
          </HeaderActions>
        </Header>

        <Content>
          <CategoriesGrid>
            {categories?.map(category => (
              <CategoryCard key={category.id}>
                <CategoryImage src={category.image} alt={category.name} />
                <CategoryContent>
                  <CategoryHeader>
                    <CategoryInfo>
                      <CategoryName>{category.name}</CategoryName>
                      <CategorySlug>/{category.slug}</CategorySlug>
                    </CategoryInfo>
                  </CategoryHeader>

                  <CategoryDescription>
                    {category.description}
                  </CategoryDescription>

                  <CategoryStats>
                    <StatItem>
                      <StatValue>{category.vehicleCount}</StatValue>
                      <StatLabel>Vehicles</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatValue>
                        ${category.priceRange?.min?.toLocaleString()} - $
                        {category.priceRange?.max?.toLocaleString()}
                      </StatValue>
                      <StatLabel>Price Range</StatLabel>
                    </StatItem>
                  </CategoryStats>

                  {category.tags && category.tags.length > 0 && (
                    <CategoryTags>
                      {category.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </CategoryTags>
                  )}

                  <CategoryActions>
                    <ActionButton small onClick={() => openEditModal(category)}>
                      <FaEdit />
                      Edit
                    </ActionButton>
                    <ActionButton
                      small
                      variant="danger"
                      onClick={() => handleDelete(category.id, category.name)}
                    >
                      <FaTrash />
                      Delete
                    </ActionButton>
                  </CategoryActions>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </Content>
      </Container>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {isEditing ? 'Edit Category' : 'Create Category'}
            </ModalTitle>
            <ActionButton small onClick={closeModal}>
              <FaTimes />
            </ActionButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label>Category Name</Label>
              <Input
                type="text"
                value={categoryData.name}
                onChange={e =>
                  setCategoryData(prev => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter category name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Category Slug</Label>
              <Input
                type="text"
                value={categoryData.slug}
                onChange={e =>
                  setCategoryData(prev => ({ ...prev, slug: e.target.value }))
                }
                placeholder="category-slug"
              />
            </FormGroup>

            <FormGroup>
              <Label>Category Image URL</Label>
              <Input
                type="url"
                value={categoryData.image}
                onChange={e =>
                  setCategoryData(prev => ({ ...prev, image: e.target.value }))
                }
                placeholder="https://example.com/image.jpg"
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={categoryData.description}
                onChange={e =>
                  setCategoryData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter category description"
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Vehicle Count</Label>
                <Input
                  type="number"
                  value={categoryData.vehicleCount}
                  onChange={e =>
                    setCategoryData(prev => ({
                      ...prev,
                      vehicleCount: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder="0"
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  <Checkbox
                    type="checkbox"
                    checked={categoryData.featured}
                    onChange={e =>
                      setCategoryData(prev => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                  />
                  Featured Category
                </Label>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Min Price</Label>
                <Input
                  type="number"
                  value={categoryData.priceRange.min}
                  onChange={e =>
                    setCategoryData(prev => ({
                      ...prev,
                      priceRange: {
                        ...prev.priceRange,
                        min: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  placeholder="0"
                />
              </FormGroup>
              <FormGroup>
                <Label>Max Price</Label>
                <Input
                  type="number"
                  value={categoryData.priceRange.max}
                  onChange={e =>
                    setCategoryData(prev => ({
                      ...prev,
                      priceRange: {
                        ...prev.priceRange,
                        max: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  placeholder="0"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Tags</Label>
              <TagsInput>
                {categoryData.tags.map((tag, index) => (
                  <EditableTag key={index}>
                    {tag}
                    <RemoveTag onClick={() => removeTag(tag)}>
                      <FaTimes />
                    </RemoveTag>
                  </EditableTag>
                ))}
                <TagInputField
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onBlur={addTag}
                  placeholder="Add tags..."
                />
              </TagsInput>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <ActionButton onClick={closeModal}>Cancel</ActionButton>
            <ActionButton variant="primary" onClick={handleSave}>
              <FaSave />
              {isEditing ? 'Update Category' : 'Create Category'}
            </ActionButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryManagement;
