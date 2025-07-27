import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyle';
import DealerSidebar from '../components/DealerSidebar';
import DashboardTab from '../components/DashboardTab';
import VehicleInventoryTab from '../components/VehicleInventoryTab';
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [_dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get _dealer data from URL
    const path = location.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    const dealerSlug = pathSegments[0];

    const dealerData = getVendorByIdOrSlug(dealerSlug);

    if (dealerData) {
      setDealer(dealerData);
      setLoading(false);
    } else {
      // If no _dealer found, redirect to _dealer listing
      navigate('/auto-dealers');
    }
  }, [location.pathname, navigate]);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dealership Overview';
      case 'inventory':
        return 'Vehicle Inventory';
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
      case '_dealer-settings':
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
      case '_dealer-settings':
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
        return <DashboardTab _dealer={_dealer} />;
      case 'inventory':
        return <VehicleInventoryTab _dealer={_dealer} />;
      case 'add-vehicle':
        return <AddVehicleTab _dealer={_dealer} />;
      case 'bulk-import':
        return <BulkImportTab _dealer={_dealer} />;
      case 'orders':
        return <SalesOrdersTab _dealer={_dealer} />;
      case 'enquiries':
        return <EnquiriesTab _dealer={_dealer} />;
      case 'customers':
        return <CustomersTab _dealer={_dealer} />;
      case 'financing':
        return <FinancingTab _dealer={_dealer} />;
      case 'trade-ins':
        return <TradeInsTab _dealer={_dealer} />;
      case 'service':
        return <ServiceAppointmentsTab _dealer={_dealer} />;
      case 'promotions':
        return <PromotionsTab _dealer={_dealer} />;
      case '_dealer-settings':
        return <DealerSettingsTab _dealer={_dealer} />;
      case 'analytics':
        return <AnalyticsTab _dealer={_dealer} />;
      default:
        return <DashboardTab _dealer={_dealer} />;
    }
  };

  if (loading) {
    return <LoadingContainer>Loading dealership dashboard...</LoadingContainer>;
  }

  if (!_dealer) {
    return null; // Will redirect
  }

  return (
    <DashboardContainer>
      <DealerSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        _dealer={_dealer}
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
