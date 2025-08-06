import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaExclamationTriangle, FaSave, FaUndo } from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import EnhancedDealerSidebar from '../components/EnhancedDealerSidebar';
import DashboardTab from '../components/DashboardTab';
import SectionOrderEdit from '../components/SectionOrderEdit';
import HeroSectionEdit from '../components/HeroSectionEdit';
import CategoriesSectionEdit from '../components/CategoriesSectionEdit';
import FeaturedSectionEdit from '../components/FeaturedSectionEdit';
import SpecialOffersSectionEdit from '../components/SpecialOffersSectionEdit';
import FooterSectionEdit from '../components/FooterSectionEdit';
import CustomSectionEdit from '../components/CustomSectionEdit';
import VehicleInventoryTab from '../components/VehicleInventoryTab';
import CategoryManagement from '../components/CategoryManagement';
import AddVehicleTab from '../components/AddVehicleTab';
import BulkImportTab from '../components/BulkImportTab';
import SalesOrdersTab from '../components/SalesOrdersTab';
import EnquiriesTab from '../components/EnquiriesTab';
import CustomersTab from '../components/CustomersTab';
import FinancingTab from '../components/FinancingTab';
import TradeInsTab from '../components/TradeInsTab';
import ServiceAppointmentsTab from '../components/ServiceAppointmentsTab';
import PromotionsTab from '../components/PromotionsTab';
import DealerSettingsTab from '../components/DealerSettingsTab';
import AnalyticsTab from '../components/AnalyticsTab';
import {
  fetchAutomobileData,
  saveCompleteData,
  saveAndPublishChanges,
  selectVendor,
  selectLoading,
  selectError,
  selectHasUnsavedChanges,
  selectApiReadyData,
  selectNeedsSyncCheck,
  discardTempChanges,
} from '../../../store/slices/automobileManagementSlice';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: ${theme.spacing.xl};
  min-height: 100vh;

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: ${theme.spacing.lg};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const PageSubtitle = styled.p`
  color: ${theme.colors.gray600};
  margin: ${theme.spacing.sm} 0 0 0;
  font-size: 1rem;
`;

const SaveControls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  margin-top: ${theme.spacing.md};
`;

const SaveButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    background: ${theme.colors.gray300};
    cursor: not-allowed;
  }
`;

const DiscardButton = styled.button`
  background: transparent;
  color: ${theme.colors.gray600};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.gray400};
    color: ${theme.colors.gray700};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SyncWarning = styled.div`
  background: ${theme.colors.yellow50};
  border: 1px solid ${theme.colors.yellow200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.yellow800};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
`;

const DealerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dealerSlug, setDealerSlug] = useState(null);

  // Redux selectors
  const vendor = useSelector(selectVendor);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const hasUnsavedChanges = useSelector(selectHasUnsavedChanges);
  const apiReadyData = useSelector(selectApiReadyData);
  const syncCheck = useSelector(selectNeedsSyncCheck);

  useEffect(() => {
    // Get dealer data from URL
    const path = location.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    const slug = pathSegments[0];

    if (slug) {
      setDealerSlug(slug);

      // Only fetch initial data if we don't have vendor data for this slug
      // This preserves saved changes and prevents overriding user's work
      if (!vendor || vendor.slug !== slug) {
        dispatch(fetchAutomobileData({ vendorSlug: slug }));
      }
    } else {
      // If no dealer found, redirect to dealer listing
      navigate('/auto-dealers');
    }
  }, [location.pathname, navigate, dispatch, vendor]);

  // Handle save changes - publish to main state and save to API
  const handleSaveChanges = async () => {
    try {
      // First, publish changes to main state for real-time updates
      dispatch(saveAndPublishChanges());

      // Then save to API for persistence
      await dispatch(
        saveCompleteData({
          vendorSlug: dealerSlug,
          data: apiReadyData,
        })
      ).unwrap();

      console.log(
        'Changes saved successfully to API and published to main state!'
      );
    } catch (error) {
      console.error('Failed to save changes:', error);
      // Optionally show user-friendly error message
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleDiscardChanges = () => {
    dispatch(discardTempChanges());
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dealership Overview';
      case 'section-order':
        return 'Section Order Management';
      case 'hero-section':
        return 'Hero Section';
      case 'categories-section':
        return 'Categories Section';
      case 'featured-section':
        return 'Featured Vehicles';
      case 'offers-section':
        return 'Special Offers';
      case 'footer-section':
        return 'Footer Section';
      case 'custom-section':
        return 'Custom Sections';
      case 'inventory':
        return 'Vehicle Inventory';
      case 'categories':
        return 'Category Management';
      case 'add-vehicle':
        return 'Add New Vehicle';
      case 'bulk-import':
        return 'Bulk Import Vehicles';
      case 'orders':
        return 'Sales & Orders';
      case 'enquiries':
        return 'Customer Enquiries';
      case 'customers':
        return 'Customer Management';
      case 'financing':
        return 'Financing & Loans';
      case 'trade-ins':
        return 'Trade-In Management';
      case 'service':
        return 'Service Appointments';
      case 'promotions':
        return 'Promotions & Deals';
      case 'dealer-settings':
        return 'Dealership Settings';
      case 'analytics':
        return 'Analytics & Reports';
      default:
        return 'Dealership Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Monitor your dealership performance and key metrics';
      case 'section-order':
        return 'Manage the order and visibility of sections on your dealership page';
      case 'hero-section':
        return 'Customize your hero section with title, description, and background image';
      case 'categories-section':
        return 'Manage category visibility and section content';
      case 'featured-section':
        return 'Select and manage featured vehicles for your homepage';
      case 'offers-section':
        return 'Manage special offers and promotional vehicles';
      case 'footer-section':
        return 'Configure footer components and content';
      case 'custom-section':
        return 'Create and manage custom sections for your dealership page';
      case 'inventory':
        return 'Manage your vehicle inventory and stock levels';
      case 'categories':
        return 'Create, edit, and manage vehicle categories';
      case 'add-vehicle':
        return 'Add a new vehicle to your inventory';
      case 'bulk-import':
        return 'Import multiple vehicles via CSV file';
      case 'orders':
        return 'Track sales, deliveries, and customer orders';
      case 'enquiries':
        return 'Manage customer enquiries and communications';
      case 'customers':
        return 'View and manage your customer database';
      case 'financing':
        return 'Manage financing applications and loan approvals';
      case 'trade-ins':
        return 'Handle trade-in evaluations and transactions';
      case 'service':
        return 'Schedule and manage service appointments';
      case 'promotions':
        return 'Create and manage promotional offers';
      case 'dealer-settings':
        return 'Configure your dealership settings and preferences';
      case 'analytics':
        return 'Analyze your business data and sales trends';
      default:
        return '';
    }
  };

  const renderContent = () => {
    const commonProps = {
      vendor,
      dealerSlug,
      onSave: handleSaveChanges,
      hasUnsavedChanges,
      syncCheck,
    };

    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab {...commonProps} />;
      case 'section-order':
        return <SectionOrderEdit {...commonProps} />;
      case 'hero-section':
        return <HeroSectionEdit {...commonProps} />;
      case 'categories-section':
        return <CategoriesSectionEdit {...commonProps} />;
      case 'featured-section':
        return <FeaturedSectionEdit {...commonProps} />;
      case 'offers-section':
        return <SpecialOffersSectionEdit {...commonProps} />;
      case 'footer-section':
        return <FooterSectionEdit {...commonProps} />;
      case 'custom-section':
        return <CustomSectionEdit {...commonProps} />;
      case 'inventory':
        return <VehicleInventoryTab {...commonProps} />;
      case 'categories':
        return <CategoryManagement {...commonProps} />;
      case 'add-vehicle':
        return <AddVehicleTab {...commonProps} />;
      case 'bulk-import':
        return <BulkImportTab {...commonProps} />;
      case 'orders':
        return <SalesOrdersTab {...commonProps} />;
      case 'enquiries':
        return <EnquiriesTab {...commonProps} />;
      case 'customers':
        return <CustomersTab {...commonProps} />;
      case 'financing':
        return <FinancingTab {...commonProps} />;
      case 'trade-ins':
        return <TradeInsTab {...commonProps} />;
      case 'service':
        return <ServiceAppointmentsTab {...commonProps} />;
      case 'promotions':
        return <PromotionsTab {...commonProps} />;
      case 'dealer-settings':
        return <DealerSettingsTab {...commonProps} />;
      case 'analytics':
        return <AnalyticsTab {...commonProps} />;
      default:
        return <DashboardTab {...commonProps} />;
    }
  };

  if (loading) {
    return <LoadingContainer>Loading dealership dashboard...</LoadingContainer>;
  }

  if (error) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center', color: '#ef4444' }}>
          <h3>Error loading dashboard</h3>
          <p>{error}</p>
          <button
            onClick={() =>
              dispatch(
                fetchAutomobileData({
                  vendorSlug: dealerSlug,
                  forceRefresh: true,
                })
              )
            }
          >
            Retry
          </button>
        </div>
      </LoadingContainer>
    );
  }

  if (!vendor) {
    return null; // Will redirect
  }

  return (
    <DashboardContainer>
      <EnhancedDealerSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        vendor={vendor}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSaveChanges}
        onDiscard={handleDiscardChanges}
        syncCheck={syncCheck}
      />
      <MainContent>
        <ContentWrapper>
          <PageHeader>
            <PageTitle>{getPageTitle()}</PageTitle>
            <PageSubtitle>{getPageSubtitle()}</PageSubtitle>

            {/* Save Controls */}
            {hasUnsavedChanges && (
              <SaveControls>
                <SaveButton onClick={handleSaveChanges}>
                  <FaSave style={{ marginRight: '8px' }} />
                  Save Changes
                </SaveButton>
                <DiscardButton onClick={handleDiscardChanges}>
                  <FaUndo style={{ marginRight: '8px' }} />
                  Discard
                </DiscardButton>
              </SaveControls>
            )}

            {/* Sync Warning */}
            {syncCheck.needsSync && (
              <SyncWarning>
                <FaExclamationTriangle />
                Data sync required: Section data differs from global data.
                {syncCheck.categoriesNeedSync && ' Categories'}
                {syncCheck.vehiclesNeedSync && ' Vehicles'}
                need synchronization.
              </SyncWarning>
            )}
          </PageHeader>
          {renderContent()}
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

export default DealerDashboard;
