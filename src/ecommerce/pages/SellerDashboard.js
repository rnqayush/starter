import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSave,
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaShoppingBag,
  FaHome,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

// Import all dashboard components
import SellerSidebar from '../components/SellerSidebar';
import DashboardTabEnhanced from '../components/DashboardTabEnhanced';
import AddProductTabEnhanced from '../components/AddProductTabEnhanced';
import ProductsTab from '../components/ProductsTab';
import CategoriesTab from '../components/CategoriesTab';
import OrdersTabEnhanced from '../components/OrdersTabEnhanced';
import EnquiriesTab from '../components/EnquiriesTab';
import DiscountsTab from '../components/DiscountsTab';
import BulkImportTab from '../components/BulkImportTab';
import InsightsTab from '../components/InsightsTab';
import ShopSettingsTab from '../components/ShopSettingsTab';

// Section edit components (will need to create these)
import HeroSectionEdit from '../components/HeroSectionEdit';
import CategoriesSectionEdit from '../components/CategoriesSectionEditNew';
import FeaturedSectionEdit from '../components/FeaturedSectionEditNew';
import HotDealsSectionEdit from '../components/HotDealsSectionEdit';
import FooterSectionEdit from '../components/FooterSectionEditNew';
import CustomSectionEdit from '../components/CustomSectionEditNew';
import SectionOrderEdit from '../components/SectionOrderEdit';

import {
  fetchEcommerceData,
  saveEcommerceData,
  publishChanges,
  selectVendor,
  selectLoading,
  selectError,
  selectSaving,
  selectPublishing,
  selectHasUnsavedChanges,
  selectIsDataPersisted,
  clearError,
  discardChanges,
} from '../../store/slices/ecommerceManagementSlice';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;
  background: ${theme.colors.gray50};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const Header = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: between;
  align-items: center;
  gap: ${theme.spacing.md};
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.sm};
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex: 1;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: stretch;

    & > * {
      flex: 1;
    }
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  min-width: 100px;
  justify-content: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.8rem;
    min-width: auto;
  }
`;

const SaveButton = styled(ActionButton)`
  background: ${theme.colors.success};
  color: ${theme.colors.white};

  &:hover:not(:disabled) {
    background: ${theme.colors.successDark || '#059669'};
    transform: translateY(-1px);
  }
`;

const PreviewButton = styled(ActionButton)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const DiscardButton = styled(ActionButton)`
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  border: 2px solid ${theme.colors.gray300};

  &:hover:not(:disabled) {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray400};
    transform: translateY(-1px);
  }
`;

const UnsavedChangesIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.warning};
  font-size: 0.9rem;
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const ContentArea = styled.div`
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: ${theme.spacing.lg};
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${theme.colors.gray200};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray600};
  text-align: center;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: ${theme.spacing.lg};
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.red600};
  margin: 0;
`;

const ErrorText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.gray600};
  max-width: 500px;
  line-height: 1.6;
`;

const BackToStoreButton = styled.button`
  position: fixed;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  z-index: 1000;
  box-shadow: ${theme.shadows.md};
  font-size: 0.9rem;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    transform: translateY(-1px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.8rem;
  }
`;

const SellerDashboard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const vendor = useSelector(selectVendor);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const saving = useSelector(selectSaving);
  const publishing = useSelector(selectPublishing);
  const hasUnsavedChanges = useSelector(selectHasUnsavedChanges);
  const isDataPersisted = useSelector(selectIsDataPersisted);

  // Local state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  // Initialize dashboard
  useEffect(() => {
    if (slug) {
      dispatch(fetchEcommerceData({ vendorSlug: slug }));
    }
  }, [dispatch, slug]);

  // Show unsaved changes warning
  useEffect(() => {
    if (hasUnsavedChanges && !showUnsavedWarning) {
      setShowUnsavedWarning(true);
    } else if (!hasUnsavedChanges && showUnsavedWarning) {
      setShowUnsavedWarning(false);
    }
  }, [hasUnsavedChanges, showUnsavedWarning]);

  const handleSaveChanges = async () => {
    try {
      const result = await dispatch(
        saveEcommerceData({
          vendor,
          hasUnsavedChanges: false,
        })
      );

      if (saveEcommerceData.fulfilled.match(result)) {
        // Success feedback could be added here
      }
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handlePublishChanges = async () => {
    try {
      await dispatch(publishChanges());
      // Success feedback could be added here
    } catch (error) {
      console.error('Failed to publish changes:', error);
    }
  };

  const handleDiscardChanges = () => {
    if (
      window.confirm('Are you sure you want to discard all unsaved changes?')
    ) {
      dispatch(discardChanges());
    }
  };

  const handlePreviewStore = () => {
    if (vendor?.slug) {
      const previewUrl = `/${vendor.slug}`;
      window.open(previewUrl, '_blank');
    }
  };

  const handleBackToStore = () => {
    if (vendor?.slug) {
      navigate(`/${vendor.slug}`);
    } else {
      navigate('/ecommerce-stores');
    }
  };

  const getTabTitle = () => {
    const titles = {
      dashboard: 'Dashboard Overview',
      'add-product': 'Add New Product',
      products: 'Product Management',
      categories: 'Category Management',
      orders: 'Order Management',
      enquiries: 'Customer Enquiries',
      discounts: 'Discounts & Coupons',
      'bulk-import': 'Bulk Product Import',
      insights: 'Analytics & Insights',
      settings: 'Store Settings',
      'section-hero': 'Hero Section',
      'section-categories': 'Categories Section',
      'section-featured': 'Featured Products',
      'section-special-offers': 'Hot Deals',
      'section-footer': 'Footer Section',
      'section-custom': 'Custom Section',
      'section-order': 'Section Management',
    };
    return titles[activeTab] || 'Dashboard';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTabEnhanced />;
      case 'add-product':
        return <AddProductTabEnhanced />;
      case 'products':
        return <ProductsTab />;
      case 'categories':
        return <CategoriesTab />;
      case 'orders':
        return <OrdersTabEnhanced />;
      case 'enquiries':
        return <EnquiriesTab />;
      case 'discounts':
        return <DiscountsTab />;
      case 'bulk-import':
        return <BulkImportTab />;
      case 'insights':
        return <InsightsTab />;
      case 'settings':
        return <ShopSettingsTab />;
      case 'section-hero':
        return <HeroSectionEdit />;
      case 'section-categories':
        return <CategoriesSectionEdit />;
      case 'section-featured':
        return <FeaturedSectionEdit />;
      case 'section-special-offers':
        return <HotDealsSectionEdit />;
      case 'section-footer':
        return <FooterSectionEdit />;
      case 'section-custom':
        return <CustomSectionEdit />;
      case 'section-order':
        return <SectionOrderEdit />;
      default:
        return <DashboardTabEnhanced />;
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading seller dashboard...</LoadingText>
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <ErrorContainer>
          <ErrorTitle>Failed to Load Dashboard</ErrorTitle>
          <ErrorText>{error}</ErrorText>
          <PreviewButton onClick={() => dispatch(clearError())}>
            <FaSpinner />
            Retry
          </PreviewButton>
        </ErrorContainer>
      </DashboardContainer>
    );
  }

  if (!vendor) {
    return (
      <DashboardContainer>
        <ErrorContainer>
          <ErrorTitle>Store Not Found</ErrorTitle>
          <ErrorText>
            The store you're trying to access doesn't exist or you don't have
            permission to view it.
          </ErrorText>
          <PreviewButton onClick={() => navigate('/ecommerce-stores')}>
            <FaShoppingBag />
            Browse Stores
          </PreviewButton>
        </ErrorContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <SellerSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        vendor={vendor}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSaveChanges}
        onDiscard={handleDiscardChanges}
      />

      <MainContent>
        <Header>
          <HeaderLeft>
            <HeaderTitle>{getTabTitle()}</HeaderTitle>
            {showUnsavedWarning && (
              <UnsavedChangesIndicator>
                <FaExclamationTriangle />
                Unsaved Changes
              </UnsavedChangesIndicator>
            )}
          </HeaderLeft>

          <HeaderRight>
            {hasUnsavedChanges && (
              <DiscardButton
                onClick={handleDiscardChanges}
                disabled={saving || publishing}
              >
                Discard
              </DiscardButton>
            )}

            <SaveButton
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges || saving || publishing}
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {saving ? 'Saving...' : 'Save'}
            </SaveButton>

            <PreviewButton
              onClick={handlePreviewStore}
              disabled={saving || publishing}
            >
              <FaEye />
              Preview
            </PreviewButton>
          </HeaderRight>
        </Header>

        <ContentArea>{renderTabContent()}</ContentArea>
      </MainContent>

      <BackToStoreButton onClick={handleBackToStore}>
        <FaHome />
        Back to Store
      </BackToStoreButton>
    </DashboardContainer>
  );
};

export default SellerDashboard;
