import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaFire,
  FaEye,
  FaSearch,
  FaTrash,
  FaPlus,
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
  background: ${props => (props.active ? theme.colors.success : theme.colors.gray300)};
  color: ${props => (props.active ? theme.colors.white : theme.colors.gray600)};

  &:hover {
    background: ${props => (props.active ? theme.colors.successDark : theme.colors.gray400)};
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

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const SelectedProductsSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.blue50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.blue200};
`;

const SelectedProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const SelectedProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.colors.white};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex: 1;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.sm};
  object-fit: cover;
  border: 1px solid ${theme.colors.gray200};
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const ProductName = styled.span`
  font-weight: 500;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;
`;

const ProductPrice = styled.span`
  color: ${theme.colors.success};
  font-weight: 600;
  font-size: 0.85rem;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${theme.colors.red500};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.red600};
    transform: scale(1.05);
  }
`;

const SearchSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
`;

const ProductCard = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'selected',
})`
  background: ${theme.colors.white};
  border: 2px solid ${props => (props.selected ? theme.colors.success : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => (props.selected ? theme.colors.successDark : theme.colors.primary)};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ProductCardImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const ProductCardName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
  line-height: 1.3;
`;

const ProductCardPrice = styled.div`
  font-weight: 600;
  color: ${theme.colors.success};
  font-size: 0.9rem;
`;

const ProductCardCategory = styled.span`
  display: inline-block;
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.7rem;
  margin-top: ${theme.spacing.xs};
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
    productIds: []
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (section) {
      setSectionData({
        title: section.content?.title || '🔥 Hot Deals',
        subtitle: section.content?.subtitle || 'Limited time offers on our best products',
        visible: section.visible !== false,
        productIds: section.content?.productIds || []
      });
    }
  }, [section]);

  const handleInputChange = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update Redux state immediately for change tracking
    dispatch(updateSectionContent({
      sectionId: 'special-offers',
      contentUpdates: {
        [field]: value
      }
    }));
  };

  const handleProductToggle = (productId) => {
    const isSelected = sectionData.productIds.includes(productId);
    const newProductIds = isSelected
      ? sectionData.productIds.filter(id => id !== productId)
      : [...sectionData.productIds, productId];

    handleInputChange('productIds', newProductIds);
  };

  const handlePreview = () => {
    if (vendor?.slug) {
      window.open(`/${vendor.slug}`, '_blank');
    }
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products || [];
    
    const search = searchTerm.toLowerCase();
    return (products || []).filter(product => 
      product.name.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.pricing?.price?.toString().includes(search)
    );
  }, [products, searchTerm]);

  // Get selected products for display
  const selectedProducts = useMemo(() => {
    return sectionData.productIds.map(id => 
      products?.find(p => p.id === id)
    ).filter(Boolean);
  }, [sectionData.productIds, products]);

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FaFire />
          Hot Deals Section
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
            onChange={(value) => handleInputChange('title', value)}
            placeholder="🔥 Hot Deals"
          />

          <FormField
            label="Section Subtitle"
            value={sectionData.subtitle}
            onChange={(value) => handleInputChange('subtitle', value)}
            placeholder="Limited time offers on our best products"
            multiline
            rows={3}
          />
        </FormGrid>

        {/* Selected Products Section */}
        {selectedProducts.length > 0 && (
          <SelectedProductsSection>
            <SectionSubtitle>
              Selected Products ({selectedProducts.length})
            </SectionSubtitle>
            <SelectedProductsList>
              {selectedProducts.map(product => (
                <SelectedProductItem key={product.id}>
                  <ProductInfo>
                    <ProductImage 
                      src={product.images?.[0] || '/placeholder-product.jpg'} 
                      alt={product.name} 
                    />
                    <ProductDetails>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>${product.pricing?.price}</ProductPrice>
                    </ProductDetails>
                  </ProductInfo>
                  <RemoveButton
                    onClick={() => handleProductToggle(product.id)}
                    title="Remove from hot deals"
                  >
                    <FaTrash />
                  </RemoveButton>
                </SelectedProductItem>
              ))}
            </SelectedProductsList>
          </SelectedProductsSection>
        )}

        {/* Search and Product Selection */}
        <SearchSection>
          <SectionSubtitle>Add Products to Hot Deals</SectionSubtitle>
          <SearchInputContainer>
            <FaSearch />
            <SearchInput
              type="text"
              placeholder="Search products by name, category, or price..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputContainer>

          <ProductsGrid>
            {filteredProducts.map(product => {
              const isSelected = sectionData.productIds.includes(product.id);
              return (
                <ProductCard
                  key={product.id}
                  selected={isSelected}
                  onClick={() => handleProductToggle(product.id)}
                >
                  <ProductCardImage 
                    src={product.images?.[0] || '/placeholder-product.jpg'} 
                    alt={product.name} 
                  />
                  <ProductCardName>{product.name}</ProductCardName>
                  <ProductCardPrice>${product.pricing?.price}</ProductCardPrice>
                  {product.category && (
                    <ProductCardCategory>{product.category}</ProductCardCategory>
                  )}
                </ProductCard>
              );
            })}
          </ProductsGrid>

          {filteredProducts.length === 0 && searchTerm && (
            <div style={{
              textAlign: 'center',
              padding: theme.spacing.xl,
              color: theme.colors.gray500
            }}>
              No products found matching "{searchTerm}"
            </div>
          )}
        </SearchSection>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default HotDealsSectionEdit;
