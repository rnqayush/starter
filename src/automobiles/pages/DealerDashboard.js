import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyle';
import DealerSidebar from '../components/DealerSidebar';
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
import { getAutomobileVendorByIdOrSlug as getVendorByIdOrSlug } from '../../DummyData';
import { fetchAutomobileData } from '../../store/slices/automobileManagementSlice';

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
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get dealer data from URL
    const path = location.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    const dealerSlug = pathSegments[0];

    const dealerData = getVendorByIdOrSlug(dealerSlug);

    if (dealerData) {
      setDealer(dealerData);
      // Fetch automobile data to populate Redux store
      dispatch(fetchAutomobileData(dealerSlug));
      setLoading(false);
    } else {
      // If no dealer found, redirect to dealer listing
      navigate('/auto-dealers');
    }
  }, [location.pathname, navigate, dispatch]);

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
      case 'inventory':
        return 'Manage your vehicle inventory and stock levels';
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
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab dealer={dealer} />;
      case 'section-order':
        return <SectionOrderEdit dealer={dealer} />;
      case 'hero-section':
        return <HeroSectionEdit dealer={dealer} />;
      case 'categories-section':
        return <CategoriesSectionEdit dealer={dealer} />;
      case 'featured-section':
        return <FeaturedSectionEdit dealer={dealer} />;
      case 'offers-section':
        return <SpecialOffersSectionEdit dealer={dealer} />;
      case 'footer-section':
        return <FooterSectionEdit dealer={dealer} />;
      case 'inventory':
        return <VehicleInventoryTab dealer={dealer} />;
      case 'add-vehicle':
        return <AddVehicleTab dealer={dealer} />;
      case 'bulk-import':
        return <BulkImportTab dealer={dealer} />;
      case 'orders':
        return <SalesOrdersTab dealer={dealer} />;
      case 'enquiries':
        return <EnquiriesTab dealer={dealer} />;
      case 'customers':
        return <CustomersTab dealer={dealer} />;
      case 'financing':
        return <FinancingTab dealer={dealer} />;
      case 'trade-ins':
        return <TradeInsTab dealer={dealer} />;
      case 'service':
        return <ServiceAppointmentsTab dealer={dealer} />;
      case 'promotions':
        return <PromotionsTab dealer={dealer} />;
      case 'dealer-settings':
        return <DealerSettingsTab dealer={dealer} />;
      case 'analytics':
        return <AnalyticsTab dealer={dealer} />;
      default:
        return <DashboardTab dealer={dealer} />;
    }
  };

  if (loading) {
    return <LoadingContainer>Loading dealership dashboard...</LoadingContainer>;
  }

  if (!dealer) {
    return null; // Will redirect
  }

  return (
    <DashboardContainer>
      <DealerSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        dealer={dealer}
      />
      <MainContent>
        <ContentWrapper>
          <PageHeader>
            <PageTitle>{getPageTitle()}</PageTitle>
            <PageSubtitle>{getPageSubtitle()}</PageSubtitle>
          </PageHeader>
          {renderContent()}
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

export default DealerDashboard;
