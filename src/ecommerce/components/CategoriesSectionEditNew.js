import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaTags,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import FormField from './shared/FormField';
import {
  selectSectionById,
  updateSectionContent,
  selectVendor,
  selectCategories,
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

const VisibilityToggle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const ToggleLabel = styled.span`
  font-weight: 500;
  color: ${theme.colors.gray700};
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props =>
    props.active ? theme.colors.success : theme.colors.gray300};
  color: ${props => (props.active ? theme.colors.white : theme.colors.gray600)};

  &:hover {
    background: ${props =>
      props.active ? theme.colors.successDark : theme.colors.gray400};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const CategoriesSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const CategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
`;

const CategoryItem = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'visible',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  background: ${props =>
    props.visible ? theme.colors.white : theme.colors.gray50};
  border: 2px solid
    ${props => (props.visible ? theme.colors.success : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props =>
      props.visible ? theme.colors.successDark : theme.colors.gray300};
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex: 1;
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.sm};
  object-fit: cover;
  border: 1px solid ${theme.colors.gray200};
`;

const CategoryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CategoryName = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;
`;

const CategoryDescription = styled.span`
  color: ${theme.colors.gray600};
  font-size: 0.8rem;
`;

const CategoryControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const OrderButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'disabled',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${props =>
    props.disabled ? theme.colors.gray200 : theme.colors.primary};
  color: ${props =>
    props.disabled ? theme.colors.gray400 : theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.disabled ? theme.colors.gray200 : theme.colors.primaryDark};
  }
`;

const VisibilityButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'visible',
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
    props.visible ? theme.colors.success : theme.colors.gray400};
  color: ${theme.colors.white};
  font-size: 0.8rem;

  &:hover {
    background: ${props =>
      props.visible ? theme.colors.successDark : theme.colors.gray500};
  }
`;

const CategoriesSectionEdit = () => {
  const dispatch = useDispatch();
  const vendor = useSelector(selectVendor);
  const categories = useSelector(selectCategories);
  const section = useSelector(selectSectionById('categories'));

  const [sectionData, setSectionData] = useState({
    title: 'Shop by Category',
    subtitle: 'Explore our diverse range of products',
    visible: true,
    visibleCategories: [],
  });

  useEffect(() => {
    if (section) {
      setSectionData({
        title: section.content?.title || 'Shop by Category',
        subtitle:
          section.content?.subtitle || 'Explore our diverse range of products',
        visible: section.visible !== false,
        visibleCategories:
          section.content?.visibleCategories ||
          categories?.map(cat => cat.id) ||
          [],
      });
    } else if (categories?.length > 0) {
      // Initialize with all categories visible if no section data exists
      setSectionData(prev => ({
        ...prev,
        visibleCategories: categories.map(cat => cat.id),
      }));
    }
  }, [section, categories]);

  const handleInputChange = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Update Redux state immediately for change tracking
    dispatch(
      updateSectionContent({
        sectionId: 'categories',
        contentUpdates: {
          [field]: value,
        },
      })
    );
  };

  const handleCategoryVisibilityToggle = categoryId => {
    const isVisible = sectionData.visibleCategories.includes(categoryId);
    const newVisibleCategories = isVisible
      ? sectionData.visibleCategories.filter(id => id !== categoryId)
      : [...sectionData.visibleCategories, categoryId];

    handleInputChange('visibleCategories', newVisibleCategories);
  };

  const moveCategoryOrder = (categoryId, direction) => {
    const currentIndex = sectionData.visibleCategories.indexOf(categoryId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sectionData.visibleCategories.length)
      return;

    const newOrder = [...sectionData.visibleCategories];
    [newOrder[currentIndex], newOrder[newIndex]] = [
      newOrder[newIndex],
      newOrder[currentIndex],
    ];

    handleInputChange('visibleCategories', newOrder);
  };

  const handlePreview = () => {
    if (vendor?.slug) {
      window.open(`/${vendor.slug}`, '_blank');
    }
  };

  // Get ordered categories for display
  const orderedCategories = sectionData.visibleCategories
    .map(id => categories?.find(cat => cat.id === id))
    .filter(Boolean)
    .concat(
      (categories || []).filter(
        cat => !sectionData.visibleCategories.includes(cat.id)
      )
    );

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FaTags />
          Categories Section
        </SectionTitle>
        <PreviewButton onClick={handlePreview}>
          <FaEye />
          Preview Store
        </PreviewButton>
      </SectionHeader>

      <ContentWrapper>
        <VisibilityToggle>
          <ToggleLabel>Section Visibility:</ToggleLabel>
          <ToggleButton
            active={sectionData.visible}
            onClick={() => handleInputChange('visible', !sectionData.visible)}
          >
            {sectionData.visible ? <FaToggleOn /> : <FaToggleOff />}
            {sectionData.visible ? 'Visible' : 'Hidden'}
          </ToggleButton>
        </VisibilityToggle>

        <FormGrid>
          <FormField
            label="Section Title"
            value={sectionData.title}
            onChange={value => handleInputChange('title', value)}
            placeholder="Shop by Category"
          />

          <FormField
            label="Section Subtitle"
            value={sectionData.subtitle}
            onChange={value => handleInputChange('subtitle', value)}
            placeholder="Explore our diverse range of products"
          />
        </FormGrid>

        <CategoriesSection>
          <SectionSubtitle>
            Category Management ({sectionData.visibleCategories.length} visible)
          </SectionSubtitle>
          <p
            style={{
              color: theme.colors.gray600,
              fontSize: '0.9rem',
              marginBottom: theme.spacing.md,
            }}
          >
            Manage which categories appear in your store and their display
            order. Drag categories to reorder them or toggle visibility.
          </p>

          <CategoriesList>
            {orderedCategories.map((category, index) => {
              const isVisible = sectionData.visibleCategories.includes(
                category.id
              );
              const visibleIndex = sectionData.visibleCategories.indexOf(
                category.id
              );

              return (
                <CategoryItem key={category.id} visible={isVisible}>
                  <CategoryInfo>
                    <CategoryImage
                      src={category.image || '/placeholder-category.jpg'}
                      alt={category.name}
                    />
                    <CategoryDetails>
                      <CategoryName>{category.name}</CategoryName>
                      <CategoryDescription>
                        {category.description || 'No description available'}
                      </CategoryDescription>
                    </CategoryDetails>
                  </CategoryInfo>

                  <CategoryControls>
                    {isVisible && (
                      <>
                        <OrderButton
                          onClick={() => moveCategoryOrder(category.id, 'up')}
                          disabled={visibleIndex === 0}
                          title="Move up"
                        >
                          <FaArrowUp />
                        </OrderButton>
                        <OrderButton
                          onClick={() => moveCategoryOrder(category.id, 'down')}
                          disabled={
                            visibleIndex ===
                            sectionData.visibleCategories.length - 1
                          }
                          title="Move down"
                        >
                          <FaArrowDown />
                        </OrderButton>
                      </>
                    )}
                    <VisibilityButton
                      visible={isVisible}
                      onClick={() =>
                        handleCategoryVisibilityToggle(category.id)
                      }
                    >
                      {isVisible ? 'Hide' : 'Show'}
                    </VisibilityButton>
                  </CategoryControls>
                </CategoryItem>
              );
            })}
          </CategoriesList>

          {(!categories || categories.length === 0) && (
            <div
              style={{
                textAlign: 'center',
                padding: theme.spacing.xl,
                color: theme.colors.gray500,
                fontStyle: 'italic',
              }}
            >
              No categories found. Add categories in the Category Management
              section first.
            </div>
          )}
        </CategoriesSection>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default CategoriesSectionEdit;
