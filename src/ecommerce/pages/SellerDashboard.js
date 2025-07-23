import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyle';
import SellerSidebar from '../components/SellerSidebar';
import DashboardTabEnhanced from '../components/DashboardTabEnhanced';
import ProductsTab from '../components/ProductsTab';
import AddProductTabEnhanced from '../components/AddProductTabEnhanced';
import CategoriesTab from '../components/CategoriesTab';
import OrdersTabEnhanced from '../components/OrdersTabEnhanced';
import EnquiriesTab from '../components/EnquiriesTab';
import DiscountsTab from '../components/DiscountsTab';
import ShopSettingsTab from '../components/ShopSettingsTab';
import InsightsTab from '../components/InsightsTab';

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

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'products':
        return 'Product Management';
      case 'add-product':
        return 'Add New Product';
      case 'categories':
        return 'Category Management';
      case 'bulk-import':
        return 'Bulk Import Products';
      case 'orders':
        return 'Order Management';
      case 'enquiries':
        return 'Enquiry Management';
      case 'discounts':
        return 'Discounts & Coupons';
      case 'customers':
        return 'Customer Management';
      case 'store-settings':
        return 'Store Settings';
      case 'appearance':
        return 'Store Appearance';
      case 'analytics':
        return 'Analytics & Reports';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Monitor your store performance and key metrics';
      case 'products':
        return 'Manage your product catalog and inventory';
      case 'add-product':
        return 'Add a new product to your store';
      case 'categories':
        return 'Organize your products into categories';
      case 'bulk-import':
        return 'Import multiple products via CSV file';
      case 'orders':
        return 'Track and manage customer orders';
      case 'enquiries':
        return 'Manage customer enquiries and communications';
      case 'discounts':
        return 'Create and manage discount codes';
      case 'customers':
        return 'View and manage your customer base';
      case 'store-settings':
        return 'Configure your store settings and preferences';
      case 'appearance':
        return "Customize your store's look and feel";
      case 'analytics':
        return 'Analyze your business data and trends';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTabEnhanced />;
      case 'products':
        return <ProductsTab />;
      case 'add-product':
        return <AddProductTabEnhanced />;
      case 'categories':
        return <CategoriesTab />;
      case 'bulk-import':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Bulk Import - Coming Soon</h3>
            <p>CSV import functionality will be available soon.</p>
          </div>
        );
      case 'orders':
        return <OrdersTabEnhanced />;
      case 'enquiries':
        return <EnquiriesTab />;
      case 'discounts':
        return <DiscountsTab />;
      case 'customers':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Customer Management - Coming Soon</h3>
            <p>Customer management features will be available soon.</p>
          </div>
        );
      case 'store-settings':
        return <ShopSettingsTab />;
      case 'appearance':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Store Appearance - Coming Soon</h3>
            <p>Theme customization features will be available soon.</p>
          </div>
        );
      case 'analytics':
        return <InsightsTab />;
      default:
        return <DashboardTabEnhanced />;
    }
  };

  return (
    <DashboardContainer>
      <SellerSidebar activeTab={activeTab} onTabChange={setActiveTab} />
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

export default SellerDashboard;
