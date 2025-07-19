import React from "react";
import styled from "styled-components";
import {
  FaDollarSign,
  FaShoppingCart,
  FaBox,
  FaArrowUp,
  FaArrowDown,
  FaBell,
  FaUsers,
  FaExclamationTriangle,
  FaTrophy,
  FaToggleOn,
  FaToggleOff,
  FaEye,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import {
  dashboardStats,
  salesTrendData,
  recentActivity,
} from "../data/sellerData";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatsCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${theme.spacing.lg};
`;

const StatsIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${theme.colors.white};
  background: ${(props) =>
    props.gradient ||
    `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`};
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsValue = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const StatsLabel = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const StatsChange = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "positive",
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${(props) =>
    props.positive ? theme.colors.success : theme.colors.error};
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
`;

const ChartHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const ChartSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const SimpleChart = styled.div`
  height: 250px;
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  position: relative;
  overflow: hidden;
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: end;
  gap: 4px;
`;

const ChartBar = styled.div`
  flex: 1;
  background: linear-gradient(
    to top,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  border-radius: 2px 2px 0 0;
  min-height: 10px;
  position: relative;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ActivityCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  height: fit-content;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMessage = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
  line-height: 1.4;
`;

const ActivityTime = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  margin: 0;
`;

const DashboardTab = () => {
  const formatCurrency = (value, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return FaShoppingCart;
      case "product":
        return FaBox;
      case "payment":
        return FaDollarSign;
      case "review":
        return FaArrowUp;
      default:
        return FaBell;
    }
  };

  const maxSales = Math.max(...salesTrendData.map((d) => d.sales));

  return (
    <>
      <DashboardGrid>
        <StatsCard>
          <StatsHeader>
            <StatsIcon gradient="linear-gradient(135deg, #4CAF50, #45a049)">
              <FaDollarSign />
            </StatsIcon>
          </StatsHeader>
          <StatsContent>
            <StatsValue>
              {formatCurrency(dashboardStats.totalSales.value)}
            </StatsValue>
            <StatsLabel>Total Sales</StatsLabel>
            <StatsChange positive={dashboardStats.totalSales.change > 0}>
              {dashboardStats.totalSales.change > 0 ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
              {Math.abs(dashboardStats.totalSales.change)}%{" "}
              {dashboardStats.totalSales.period}
            </StatsChange>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsHeader>
            <StatsIcon gradient="linear-gradient(135deg, #2196F3, #1976D2)">
              <FaShoppingCart />
            </StatsIcon>
          </StatsHeader>
          <StatsContent>
            <StatsValue>
              {formatNumber(dashboardStats.totalOrders.value)}
            </StatsValue>
            <StatsLabel>Total Orders</StatsLabel>
            <StatsChange positive={dashboardStats.totalOrders.change > 0}>
              {dashboardStats.totalOrders.change > 0 ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
              {Math.abs(dashboardStats.totalOrders.change)}%{" "}
              {dashboardStats.totalOrders.period}
            </StatsChange>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsHeader>
            <StatsIcon gradient="linear-gradient(135deg, #FF9800, #F57C00)">
              <FaBox />
            </StatsIcon>
          </StatsHeader>
          <StatsContent>
            <StatsValue>
              {formatNumber(dashboardStats.totalProducts.value)}
            </StatsValue>
            <StatsLabel>Total Products</StatsLabel>
            <StatsChange positive={dashboardStats.totalProducts.change > 0}>
              {dashboardStats.totalProducts.change > 0 ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
              {Math.abs(dashboardStats.totalProducts.change)}%{" "}
              {dashboardStats.totalProducts.period}
            </StatsChange>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsHeader>
            <StatsIcon gradient="linear-gradient(135deg, #9C27B0, #7B1FA2)">
              <FaArrowUp />
            </StatsIcon>
          </StatsHeader>
          <StatsContent>
            <StatsValue>
              {formatCurrency(dashboardStats.averageOrderValue.value)}
            </StatsValue>
            <StatsLabel>Average Order Value</StatsLabel>
            <StatsChange positive={dashboardStats.averageOrderValue.change > 0}>
              {dashboardStats.averageOrderValue.change > 0 ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
              {Math.abs(dashboardStats.averageOrderValue.change)}%{" "}
              {dashboardStats.averageOrderValue.period}
            </StatsChange>
          </StatsContent>
        </StatsCard>
      </DashboardGrid>

      <ChartSection>
        <ChartCard>
          <ChartHeader>
            <ChartTitle>Sales Trend</ChartTitle>
            <ChartSubtitle>Daily sales over the last 14 days</ChartSubtitle>
          </ChartHeader>
          <SimpleChart>
            {salesTrendData.map((data, index) => (
              <ChartBar
                key={index}
                style={{
                  height: `${(data.sales / maxSales) * 100}%`,
                }}
                title={`${new Date(data.date).toLocaleDateString()}: ${formatCurrency(data.sales)}`}
              />
            ))}
          </SimpleChart>
        </ChartCard>

        <ActivityCard>
          <ChartHeader>
            <ChartTitle>Recent Activity</ChartTitle>
            <ChartSubtitle>Latest updates from your store</ChartSubtitle>
          </ChartHeader>
          <ActivityList>
            {recentActivity.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <ActivityItem key={activity.id}>
                  <ActivityIcon>
                    <IconComponent />
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityMessage>{activity.message}</ActivityMessage>
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              );
            })}
          </ActivityList>
        </ActivityCard>
      </ChartSection>
    </>
  );
};

export default DashboardTab;
