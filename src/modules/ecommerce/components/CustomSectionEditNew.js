import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaPuzzlePiece,
  FaEye,
  FaPlus,
  FaTrash,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaSearch,
} from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import FormField from './shared/FormField';
import {
  selectPageSections,
  updateSectionContent,
  addCustomSection,
  removeCustomSection,
  selectVendor,
  selectProducts,
} from '../../store/slices/ecommerceManagementSlice';

const SectionContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} ${theme.spacing.xl} 0;
  border-bottom: 1px solid ${theme.colors.gray200};
  padding-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0;
`;

const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ContentWrapper = styled.div`
  padding: 0 ${theme.spacing.xl} ${theme.spacing.xl};
`;

const SectionSubtitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const CustomSectionsList = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const CustomSectionItem = styled.div`
  background: ${theme.colors.gray50};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
`;

const CustomSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const CustomSectionName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const CustomSectionControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props =>
    props.active ? theme.colors.success : theme.colors.gray400};
  color: ${theme.colors.white};
  font-size: 0.8rem;

  &:hover {
    background: ${props =>
      props.active ? theme.colors.successDark : theme.colors.gray500};
  }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${theme.colors.red500};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.red600};
  }
`;

const AddSectionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${theme.spacing.xl};

  &:hover {
    background: ${theme.colors.successDark};
    transform: translateY(-1px);
  }
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
`;

const EditModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const EditModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const EditModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.gray400};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.gray600};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const SaveButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};

  svg {
    position: absolute;
    left: ${theme.spacing.md};
    color: ${theme.colors.gray400};
    z-index: 1;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 2.5rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.sm};
  max-height: 300px;
  overflow-y: auto;
`;

const ProductCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'selected',
})`
  background: ${theme.colors.white};
  border: 2px solid
    ${props => (props.selected ? theme.colors.success : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props =>
      props.selected ? theme.colors.successDark : theme.colors.primary};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.xs};
`;

const ProductName = styled.h5`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0;
  line-height: 1.2;
`;

const CustomSectionEdit = () => {
  const dispatch = useDispatch();
  const vendor = useSelector(selectVendor);
  const products = useSelector(selectProducts);
  const sections = useSelector(selectPageSections);

  const [editingSection, setEditingSection] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    productIds: [],
  });
  const [searchTerm, setSearchTerm] = useState('');

  const customSections = useMemo(() => {
    return (sections || []).filter(section => section.type === 'custom');
  }, [sections]);

  const handlePreview = () => {
    if (vendor?.slug) {
      window.open(`/${vendor.slug}`, '_blank');
    }
  };

  const handleAddSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      name: 'New Custom Section',
      title: 'Custom Section',
      subtitle: 'Add your custom content here',
      visible: true,
      order: (sections?.length || 0) + 1,
      content: {
        title: 'Custom Section',
        subtitle: 'Add your custom content here',
        productIds: [],
      },
    };

    dispatch(addCustomSection(newSection));
  };

  const handleEditSection = section => {
    setEditingSection(section);
    setEditFormData({
      name: section.name || 'Custom Section',
      title: section.content?.title || section.title || 'Custom Section',
      subtitle: section.content?.subtitle || section.subtitle || '',
      productIds: section.content?.productIds || [],
    });
    setSearchTerm('');
  };

  const handleSaveEdit = () => {
    dispatch(
      updateSectionContent({
        sectionId: editingSection.id,
        contentUpdates: {
          name: editFormData.name,
          title: editFormData.title,
          subtitle: editFormData.subtitle,
          productIds: editFormData.productIds,
        },
      })
    );
    setEditingSection(null);
  };

  const handleToggleVisibility = (sectionId, currentVisibility) => {
    dispatch(
      updateSectionContent({
        sectionId,
        contentUpdates: {
          visible: !currentVisibility,
        },
      })
    );
  };

  const handleRemoveSection = sectionId => {
    if (
      window.confirm('Are you sure you want to remove this custom section?')
    ) {
      dispatch(removeCustomSection(sectionId));
    }
  };

  const handleProductToggle = productId => {
    const isSelected = editFormData.productIds.includes(productId);
    const newProductIds = isSelected
      ? editFormData.productIds.filter(id => id !== productId)
      : [...editFormData.productIds, productId];

    setEditFormData(prev => ({
      ...prev,
      productIds: newProductIds,
    }));
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products || [];

    const search = searchTerm.toLowerCase();
    return (products || []).filter(
      product =>
        product.name.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search)
    );
  }, [products, searchTerm]);

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FaPuzzlePiece />
          Custom Sections
        </SectionTitle>
        <PreviewButton onClick={handlePreview}>
          <FaEye />
          Preview Store
        </PreviewButton>
      </SectionHeader>

      <ContentWrapper>
        <SectionSubtitle>Manage Custom Sections</SectionSubtitle>
        <p
          style={{
            color: theme.colors.gray600,
            fontSize: '0.9rem',
            marginBottom: theme.spacing.lg,
          }}
        >
          Create custom sections to showcase specific products or content on
          your store page.
        </p>

        <AddSectionButton onClick={handleAddSection}>
          <FaPlus />
          Add New Custom Section
        </AddSectionButton>

        <CustomSectionsList>
          {customSections.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: theme.spacing.xl,
                color: theme.colors.gray500,
                fontStyle: 'italic',
              }}
            >
              No custom sections created yet. Click "Add New Custom Section" to
              create one.
            </div>
          ) : (
            customSections.map(section => (
              <CustomSectionItem key={section.id}>
                <CustomSectionHeader>
                  <CustomSectionName>
                    {section.name || 'Unnamed Section'}
                  </CustomSectionName>
                  <CustomSectionControls>
                    <ToggleButton
                      active={section.visible !== false}
                      onClick={() =>
                        handleToggleVisibility(
                          section.id,
                          section.visible !== false
                        )
                      }
                    >
                      {section.visible !== false ? (
                        <FaToggleOn />
                      ) : (
                        <FaToggleOff />
                      )}
                      {section.visible !== false ? 'Visible' : 'Hidden'}
                    </ToggleButton>
                    <EditButton onClick={() => handleEditSection(section)}>
                      <FaEdit />
                      Edit
                    </EditButton>
                    <RemoveButton
                      onClick={() => handleRemoveSection(section.id)}
                    >
                      <FaTrash />
                    </RemoveButton>
                  </CustomSectionControls>
                </CustomSectionHeader>
                <div
                  style={{ color: theme.colors.gray600, fontSize: '0.9rem' }}
                >
                  <strong>Title:</strong>{' '}
                  {section.content?.title || section.title || 'No title'}
                  <br />
                  <strong>Products:</strong>{' '}
                  {section.content?.productIds?.length || 0} selected
                </div>
              </CustomSectionItem>
            ))
          )}
        </CustomSectionsList>
      </ContentWrapper>

      {editingSection && (
        <EditModal
          onClick={e => e.target === e.currentTarget && setEditingSection(null)}
        >
          <EditModalContent>
            <EditModalHeader>
              <EditModalTitle>Edit Custom Section</EditModalTitle>
              <CloseButton onClick={() => setEditingSection(null)}>
                ×
              </CloseButton>
            </EditModalHeader>

            <FormGrid>
              <FormField
                label="Section Name (Internal)"
                value={editFormData.name}
                onChange={value =>
                  setEditFormData(prev => ({ ...prev, name: value }))
                }
                placeholder="Custom Section"
              />

              <FormField
                label="Section Title (Displayed)"
                value={editFormData.title}
                onChange={value =>
                  setEditFormData(prev => ({ ...prev, title: value }))
                }
                placeholder="Section Title"
              />

              <FormField
                label="Section Subtitle"
                value={editFormData.subtitle}
                onChange={value =>
                  setEditFormData(prev => ({ ...prev, subtitle: value }))
                }
                placeholder="Section description..."
                multiline
                rows={2}
              />
            </FormGrid>

            <SectionSubtitle>
              Select Products ({editFormData.productIds.length} selected)
            </SectionSubtitle>

            <SearchInputContainer>
              <FaSearch />
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </SearchInputContainer>

            <ProductsGrid>
              {filteredProducts.map(product => {
                const isSelected = editFormData.productIds.includes(product.id);
                return (
                  <ProductCard
                    key={product.id}
                    selected={isSelected}
                    onClick={() => handleProductToggle(product.id)}
                  >
                    <ProductImage
                      src={product.images?.[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                    />
                    <ProductName>{product.name}</ProductName>
                  </ProductCard>
                );
              })}
            </ProductsGrid>

            <div style={{ marginTop: theme.spacing.lg, textAlign: 'right' }}>
              <SaveButton onClick={handleSaveEdit}>Save Changes</SaveButton>
            </div>
          </EditModalContent>
        </EditModal>
      )}
    </SectionContainer>
  );
};

export default CustomSectionEdit;
