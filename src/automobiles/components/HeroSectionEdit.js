import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaImage, FaUpload, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectLoading,
  selectSectionContent,
  updatePageSectionContent,
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
  background: ${theme.colors.blue500}20;
  color: ${theme.colors.blue500};
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
  shouldForwardProp: prop => !['filled', 'color'].includes(prop),
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => props.color || theme.colors.primary};
  background: ${props =>
    props.filled ? props.color || theme.colors.primary : theme.colors.white};
  color: ${props =>
    props.filled ? theme.colors.white : props.color || theme.colors.primary};
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

const ImageUploadSection = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ImagePreview = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.md};
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.errorDark};
  }
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UrlOption = styled.div`
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.gray200};
`;

const HeroSectionEdit = ({ dealer }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const heroContent = useSelector(selectSectionContent('hero'));

  const [localChanges, setLocalChanges] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Get current values (Redux + local changes)
  const currentContent = {
    ...heroContent,
    ...localChanges,
  };

  const updateContent = (field, value) => {
    setLocalChanges(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        updateContent('backgroundImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updateContent('backgroundImage', '');
  };



  // Apply changes automatically when user makes any change
  useEffect(() => {
    if (hasChanges) {
      const timeout = setTimeout(() => {
        if (Object.keys(localChanges).length > 0) {
          dispatch(updatePageSectionContent({
            sectionId: 'hero',
            content: localChanges,
          }));
          setLocalChanges({});
        }
      }, 500); // Debounce
      return () => clearTimeout(timeout);
    }
  }, [localChanges, hasChanges, dispatch]);



  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Loading Hero Section...</HeaderTitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <SectionIcon>
            <FaImage />
          </SectionIcon>
          <HeaderTitle>Hero Section</HeaderTitle>
        </HeaderLeft>
        <HeaderActions>
          {/* Save functionality moved to sidebar */}
        </HeaderActions>
      </Header>

      <Content>
        <FormGroup>
          <Label>Background Image</Label>
          <ImageUploadSection>
            {currentContent.backgroundImage && (
              <ImagePreview>
                <PreviewImage
                  src={currentContent.backgroundImage}
                  alt="Hero background preview"
                />
                <RemoveImageButton onClick={removeImage}>
                  <FaTimes />
                </RemoveImageButton>
              </ImagePreview>
            )}

            <UploadButton>
              <FaUpload />
              Upload Image
              <HiddenFileInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </UploadButton>

            <UrlOption>
              <Label>Or enter image URL:</Label>
              <Input
                type="url"
                value={currentContent.backgroundImage || ''}
                onChange={e => updateContent('backgroundImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </UrlOption>
          </ImageUploadSection>
        </FormGroup>

        <FormGroup>
          <Label>Hero Title</Label>
          <Input
            type="text"
            value={currentContent.title || ''}
            onChange={e => updateContent('title', e.target.value)}
            placeholder="Enter hero section title"
          />
        </FormGroup>

        <FormGroup>
          <Label>Hero Subtitle/Description</Label>
          <TextArea
            value={currentContent.subtitle || ''}
            onChange={e => updateContent('subtitle', e.target.value)}
            placeholder="Enter hero section description"
          />
        </FormGroup>
      </Content>
    </Container>
  );
};

export default HeroSectionEdit;
