import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSave,
  FaGlobe,
  FaList,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectCategories,
  selectLoading,
  updatePageSections,
  publishPageContent,
} from '../../store/slices/automobileManagementSlice';

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
  shouldForwardProp: (prop) => !['filled', 'color'].includes(prop),
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => props.color || theme.colors.primary};
  background: ${props => props.filled ? (props.color || theme.colors.primary) : theme.colors.white};
  color: ${props => props.filled ? theme.colors.white : (props.color || theme.colors.primary)};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${props => props.color || theme.colors.primary};
    color: ${theme.colors.white};
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

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
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

  &:disabled {
    background: ${theme.colors.gray100};
    cursor: not-allowed;
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

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const CategoryImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-right: ${theme.spacing.md};
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const CategoryDescription = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
`;

const VisibilityButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  background: none;
  border: none;
  color: ${props => props.visible ? theme.colors.success : theme.colors.gray400};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
  }
`;

const CategoriesSectionEdit = ({ dealer }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectPageSections);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  
  const [sectionContent, setSectionContent] = useState({
    title: 'Browse by Category',
    subtitle: 'Explore our diverse range of vehicles across different categories',
    visibleCategories: [],
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize with data from Redux state
  useEffect(() => {
    const categorySection = sections.find(s => s.id === 'categories');
    if (categorySection?.content) {
      setSectionContent({
        title: categorySection.content.title || 'Browse by Category',
        subtitle: categorySection.content.subtitle || 'Explore our diverse range of vehicles across different categories',
        visibleCategories: categorySection.content.visibleCategories || categories?.map(cat => cat.id) || [],
      });
    } else if (categories) {
      // Initialize with all categories visible by default
      setSectionContent(prev => ({
        ...prev,
        visibleCategories: categories.map(cat => cat.id),
      }));
    }
  }, [sections, categories]);

  const updateContent = (field, value) => {
    setSectionContent(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const toggleCategoryVisibility = (categoryId) => {
    const currentCategories = sectionContent.visibleCategories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    updateContent('visibleCategories', newCategories);
  };

  const saveChanges = () => {
    const updatedSections = sections.map(section => 
      section.id === 'categories' 
        ? { ...section, content: { ...section.content, ...sectionContent } }
        : section
    );
    
    dispatch(updatePageSections(updatedSections));
    setHasChanges(false);
    alert('Categories section saved successfully!');
  };

  const publishChanges = () => {
    const updatedSections = sections.map(section => 
      section.id === 'categories' 
        ? { ...section, content: { ...section.content, ...sectionContent } }
        : section
    );
    
    dispatch(publishPageContent(updatedSections));
    setHasChanges(false);
    alert('Categories section published successfully! Changes are now live.');
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Loading Categories Section...</HeaderTitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <SectionIcon>
            <FaList />
          </SectionIcon>
          <HeaderTitle>Categories Section</HeaderTitle>
        </HeaderLeft>
        <HeaderActions>
          <ActionButton 
            onClick={saveChanges}
            disabled={!hasChanges}
            color={theme.colors.blue500}
          >
            <FaSave />
            Save Changes
          </ActionButton>
          <ActionButton 
            onClick={publishChanges}
            disabled={!hasChanges}
            filled
            color={theme.colors.success}
          >
            <FaGlobe />
            Save & Go Public
          </ActionButton>
        </HeaderActions>
      </Header>

      <Content>
        <FormGroup>
          <Label>Section Title (Fixed)</Label>
          <Input
            type="text"
            value="Browse by Category"
            disabled
          />
        </FormGroup>

        <FormGroup>
          <Label>Section Subtitle</Label>
          <TextArea
            value={sectionContent.subtitle}
            onChange={(e) => updateContent('subtitle', e.target.value)}
            placeholder="Enter section description"
          />
        </FormGroup>

        <FormGroup>
          <Label>Category Visibility</Label>
          <CategoryList>
            {categories?.map(category => (
              <CategoryItem key={category.id}>
                <CategoryImage src={category.image} alt={category.name} />
                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </CategoryInfo>
                <VisibilityButton
                  visible={sectionContent.visibleCategories?.includes(category.id)}
                  onClick={() => toggleCategoryVisibility(category.id)}
                  title={sectionContent.visibleCategories?.includes(category.id) ? 'Hide category' : 'Show category'}
                >
                  {sectionContent.visibleCategories?.includes(category.id) ? <FaEye /> : <FaEyeSlash />}
                </VisibilityButton>
              </CategoryItem>
            ))}
          </CategoryList>
        </FormGroup>
      </Content>
    </Container>
  );
};

export default CategoriesSectionEdit;
