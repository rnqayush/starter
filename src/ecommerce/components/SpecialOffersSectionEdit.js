import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaFire,
  FaEdit,
  FaEye,
  FaPlus,
  FaTrash,
  FaImage,
  FaSave,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import FormField from './shared/FormField';
import {
  selectSectionById,
  updateSectionContent,
  selectVendor,
  selectProducts,
} from '../../store/slices/ecommerceManagementSlice';

const SectionContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
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

const ToggleLabel = styled.label`
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
    props.active ? theme.colors.success : theme.colors.gray400};
  color: ${theme.colors.white};

  &:hover {
    transform: translateY(-1px);
  }
`;

const ProductSelector = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const ProductCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'selected',
})`
  border: 2px solid
    ${props => (props.selected ? theme.colors.primary : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props =>
    props.selected ? theme.colors.primary + '10' : theme.colors.white};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const ProductName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
  line-height: 1.3;
`;

const ProductPrice = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.primary};
  font-weight: 600;
  margin: 0;
`;

const SaveButton = styled.button`
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
  margin-top: ${theme.spacing.lg};

  &:hover {
    background: ${theme.colors.successDark || '#059669'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const HotDealsSectionEdit = () => {
  const dispatch = useDispatch();
  const vendor = useSelector(selectVendor);
  const products = useSelector(selectProducts);
  const section = useSelector(selectSectionById('special-offers'));

  const [sectionData, setSectionData] = useState({
    title: '🔥 Hot Deals',
    subtitle: 'Limited time offers on our best products',
    visible: true,
    productIds: [],
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (section) {
      setSectionData({
        title: section.content?.title || '🔥 Hot Deals',
        subtitle:
          section.content?.subtitle ||
          'Limited time offers on our best products',
        visible: section.visible !== false,
        productIds: section.content?.productIds || [],
      });
    }
  }, [section]);

  const handleInputChange = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProductToggle = productId => {
    setSectionData(prev => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter(id => id !== productId)
        : [...prev.productIds, productId],
    }));
  };

  const handleSave = () => {
    const updatedSection = {
      id: 'special-offers',
      name: 'Special Offers',
      type: 'special-offers',
      visible: sectionData.visible,
      order: section?.order || 4,
      content: {
        title: sectionData.title,
        subtitle: sectionData.subtitle,
        productIds: sectionData.productIds,
      },
    };

    dispatch(updateSectionContent(updatedSection));
  };

  const handlePreview = () => {
    if (vendor?.slug) {
      window.open(`/${vendor.slug}#special-offers`, '_blank');
    }
  };

  const saleProducts = products?.filter(product => product.onSale) || [];

  // Memoize the original data to prevent infinite re-renders
  const originalData = useMemo(
    () => ({
      title: section?.content?.title || '🔥 Hot Deals',
      subtitle:
        section?.content?.subtitle ||
        'Limited time offers on our best products',
      visible: section?.visible !== false,
      productIds: section?.content?.productIds || [],
    }),
    [section]
  );

  const hasChanges =
    JSON.stringify(sectionData) !== JSON.stringify(originalData);

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FaFire />
          Hot Deals Section
        </SectionTitle>
        <PreviewButton onClick={handlePreview}>
          <FaEye />
          Preview
        </PreviewButton>
      </SectionHeader>

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
        <FormSection>
          <FormField
            label="Section Title"
            value={sectionData.title}
            onChange={value => handleInputChange('title', value)}
            placeholder="🔥 Hot Deals"
          />

          <FormField
            label="Section Subtitle"
            value={sectionData.subtitle}
            onChange={value => handleInputChange('subtitle', value)}
            placeholder="Limited time offers on our best products"
            multiline
            rows={3}
          />
        </FormSection>

        <FormSection>
          <div>
            <h4
              style={{
                margin: `0 0 ${theme.spacing.md} 0`,
                color: theme.colors.gray900,
              }}
            >
              Quick Stats
            </h4>
            <div
              style={{
                background: theme.colors.gray50,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
              }}
            >
              <p style={{ margin: '0 0 8px 0', color: theme.colors.gray600 }}>
                Products on Sale: <strong>{saleProducts.length}</strong>
              </p>
              <p style={{ margin: '0 0 8px 0', color: theme.colors.gray600 }}>
                Selected for Display:{' '}
                <strong>{sectionData.productIds.length}</strong>
              </p>
              <p style={{ margin: 0, color: theme.colors.gray600 }}>
                Section Status:{' '}
                <strong
                  style={{
                    color: sectionData.visible
                      ? theme.colors.success
                      : theme.colors.warning,
                  }}
                >
                  {sectionData.visible ? 'Visible' : 'Hidden'}
                </strong>
              </p>
            </div>
          </div>
        </FormSection>
      </FormGrid>

      <ProductSelector>
        <h3
          style={{
            margin: `0 0 ${theme.spacing.md} 0`,
            color: theme.colors.gray900,
          }}
        >
          Select Products for Special Offers ({sectionData.productIds.length}{' '}
          selected)
        </h3>
        <p
          style={{
            margin: `0 0 ${theme.spacing.md} 0`,
            color: theme.colors.gray600,
          }}
        >
          Choose which products to feature in your special offers section.
          Products on sale are recommended.
        </p>

        <ProductGrid>
          {(products || []).map(product => (
            <ProductCard
              key={product.id}
              selected={sectionData.productIds.includes(product.id)}
              onClick={() => handleProductToggle(product.id)}
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                ${product.price}
                {product.onSale && product.originalPrice && (
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: theme.colors.gray500,
                      marginLeft: theme.spacing.xs,
                      fontSize: '0.8rem',
                    }}
                  >
                    ${product.originalPrice}
                  </span>
                )}
              </ProductPrice>
              {product.onSale && (
                <div
                  style={{
                    background: theme.colors.error,
                    color: theme.colors.white,
                    padding: '2px 6px',
                    borderRadius: theme.borderRadius.sm,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    marginTop: theme.spacing.xs,
                    textAlign: 'center',
                  }}
                >
                  ON SALE
                </div>
              )}
            </ProductCard>
          ))}
        </ProductGrid>

        {(!products || products.length === 0) && (
          <div
            style={{
              textAlign: 'center',
              padding: theme.spacing.xl,
              color: theme.colors.gray500,
            }}
          >
            <FaImage size={48} style={{ marginBottom: theme.spacing.md }} />
            <p>No products available. Add some products first.</p>
          </div>
        )}
      </ProductSelector>

      <SaveButton onClick={handleSave} disabled={!hasChanges}>
        <FaSave />
        {hasChanges ? 'Save Changes' : 'No Changes'}
      </SaveButton>
    </SectionContainer>
  );
};

export default HotDealsSectionEdit;
