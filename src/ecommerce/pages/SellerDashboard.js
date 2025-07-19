import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/GlobalStyle";
import SellerSidebar from "../components/SellerSidebar";
import DashboardTabEnhanced from "../components/DashboardTabEnhanced";
import ProductsTab from "../components/ProductsTab";
import AddProductTab from "../components/AddProductTab";
import CategoriesTab from "../components/CategoriesTab";
import OrdersTab from "../components/OrdersTab";
import DiscountsTab from "../components/DiscountsTab";
import InsightsTab from "../components/InsightsTab";

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
  const [activeTab, setActiveTab] = useState("dashboard");

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard Overview";
      case "products":
        return "Product Management";
      case "add-product":
        return "Add New Product";
      case "orders":
        return "Order Management";
      case "insights":
        return "Business Insights";
      default:
        return "Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Monitor your store performance and key metrics";
      case "products":
        return "Manage your product catalog and inventory";
      case "add-product":
        return "Add a new product to your store";
      case "orders":
        return "Track and manage customer orders";
      case "insights":
        return "Analyze your business data and trends";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "products":
        return <ProductsTab />;
      case "add-product":
        return <AddProductTab />;
      case "orders":
        return <OrdersTab />;
      case "insights":
        return <InsightsTab />;
      default:
        return <DashboardTab />;
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
