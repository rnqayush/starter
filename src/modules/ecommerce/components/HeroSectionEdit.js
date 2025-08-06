import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaImage, FaEdit, FaEye } from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import FormField from './shared/FormField';
import {
  selectSectionById,
  updateSectionContent,
  selectVendor,
} from '../../../store/slices/ecommerceManagementSlice';

const SectionContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  background: ${theme.colors.gray50};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.blue50 || theme.colors.gray100};
  }
`;

const ImageUploadText = styled.p`
  color: ${theme.colors.gray600};
  margin: ${theme.spacing.sm} 0;
  font-size: 0.95rem;
`;

const CurrentImagePreview = styled.div`
  margin-top: ${theme.spacing.md};

  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.sm};
  }
`;

const HeroSectionEdit = () => {
  const dispatch = useDispatch();
  const vendor = useSelector(selectVendor);
  const heroSection = useSelector(selectSectionById('hero'));

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    backgroundImage: '',
    primaryButtonText: '',
    secondaryButtonText: '',
  });

  useEffect(() => {
    if (heroSection) {
      setFormData({
        title: heroSection.title || heroSection.content?.title || '',
        subtitle: heroSection.subtitle || heroSection.content?.subtitle || '',
        backgroundImage:
          heroSection.backgroundImage ||
          heroSection.content?.backgroundImage ||
          '',
        primaryButtonText:
          heroSection.primaryButtonText ||
          heroSection.content?.primaryButtonText ||
          'Shop Products',
        secondaryButtonText:
          heroSection.secondaryButtonText ||
          heroSection.content?.secondaryButtonText ||
          'Browse Categories',
      });
    }
  }, [heroSection]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Update Redux state
    dispatch(
      updateSectionContent({
        sectionId: 'hero',
        contentUpdates: {
          [field]: value,
        },
      })
    );
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, this would upload to a cloud service
      // For demo, we'll use a placeholder URL
      const imageUrl = URL.createObjectURL(file);
      handleInputChange('backgroundImage', imageUrl);
    }
  };

  const handlePreview = () => {
    if (vendor?.slug) {
      window.open(`/${vendor.slug}`, '_blank');
    }
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FaEdit />
          Hero Section Settings
        </SectionTitle>
        <PreviewButton onClick={handlePreview}>
          <FaEye />
          Preview Store
        </PreviewButton>
      </SectionHeader>

      <FormGrid>
        <FormField
          label="Hero Title"
          type="text"
          value={formData.title}
          onChange={value => handleInputChange('title', value)}
          placeholder="Welcome to Your Store"
          required
        />

        <FormField
          label="Store Name Display"
          type="text"
          value={vendor?.name || ''}
          disabled
          placeholder="Store name from settings"
        />

        <FullWidthField>
          <FormField
            label="Hero Subtitle"
            type="textarea"
            value={formData.subtitle}
            onChange={value => handleInputChange('subtitle', value)}
            placeholder="Brief description of your store and what you offer..."
            rows={3}
          />
        </FullWidthField>

        <FormField
          label="Primary Button Text"
          type="text"
          value={formData.primaryButtonText}
          onChange={value => handleInputChange('primaryButtonText', value)}
          placeholder="Shop Products"
        />

        <FormField
          label="Secondary Button Text"
          type="text"
          value={formData.secondaryButtonText}
          onChange={value => handleInputChange('secondaryButtonText', value)}
          placeholder="Browse Categories"
        />

        <FullWidthField>
          <FormField label="Background Image" required>
            <ImageUploadContainer
              onClick={() =>
                document.getElementById('hero-image-upload').click()
              }
            >
              <FaImage size={24} color={theme.colors.gray400} />
              <ImageUploadText>
                Click to upload hero background image
              </ImageUploadText>
              <input
                id="hero-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </ImageUploadContainer>

            {formData.backgroundImage && (
              <CurrentImagePreview>
                <img
                  src={formData.backgroundImage}
                  alt="Hero background preview"
                />
              </CurrentImagePreview>
            )}
          </FormField>
        </FullWidthField>
      </FormGrid>
    </SectionContainer>
  );
};

export default HeroSectionEdit;
