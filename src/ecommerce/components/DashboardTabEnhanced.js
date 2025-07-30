import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaDollarSign,
  FaShoppingCart,
  FaArrowUp,
  FaArrowDown,
  FaUsers,
  FaExclamationTriangle,
  FaTrophy,
  FaToggleOn,
  FaToggleOff,
  FaEye,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { sellerDashboardData } from '../../data';
const {
  dashboardStats,
  salesTrendData,
  recentActivity,
  storeStatus,
  lowStockAlerts,
  topPerformingProducts,
} = sellerDashboardData;

const DashboardContainer = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
`;

const StoreStatusCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  margin-bottom: ${theme.spacing.xl};
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${theme.spacing.lg};
`;

const StatusInfo = styled.div`
  flex: 1;
`;

const StatusTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const StatusSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'isActive',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  background: ${props =>
    props.isActive ? theme.colors.success : theme.colors.error};
  color: ${theme.colors.white};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
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
  background: ${props =>
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
  shouldForwardProp: prop => prop !== 'positive',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props =>
    props.positive ? theme.colors.success : theme.colors.error};
`;

const ContentGrid = styled.div`
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

const AlertsCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  height: fit-content;
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.warning}10;
  border: 1px solid ${theme.colors.warning}30;
  border-radius: ${theme.borderRadius.md};
`;

const AlertImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.sm};
  object-fit: cover;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const AlertMessage = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.warning};
  margin: 0;
`;

const TopProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const ProductStats = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const ProductGrowth = styled.span`
  color: ${theme.colors.success};
  font-weight: 500;
`;

const DashboardTabEnhanced = () => {
  const [isStoreLive, setIsStoreLive] = useState(storeStatus.isLive);

  const formatCurrency = (value, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const formatNumber = value => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const maxSales = Math.max(...salesTrendData.map(d => d.sales));

  const toggleStoreStatus = () => {
    setIsStoreLive(!isStoreLive);
  };

  return (
    <DashboardContainer>
      {/* Store Status Toggle */}
      <StoreStatusCard>
        <StatusHeader>
          <StatusInfo>
            <StatusTitle>Store Status</StatusTitle>
            <StatusSubtitle>
              Your store is currently {isStoreLive ? 'live' : 'paused'}. Last
              updated: {storeStatus.lastToggled}
            </StatusSubtitle>
          </StatusInfo>
          <ToggleButton isActive={isStoreLive} onClick={toggleStoreStatus}>
            {isStoreLive ? <FaToggleOn /> : <FaToggleOff />}
            {isStoreLive ? 'Store Live' : 'Store Paused'}
          </ToggleButton>
        </StatusHeader>
      </StoreStatusCard>

      {/* Stats Cards */}
      <DashboardGrid>
        <StatsCard>
          <StatsHeader>
            <StatsIcon gradient="linear-gradient(135deg, #4CAF50, #45a049)">
              <FaDollarSign />
            </StatsIcon>
          </StatsHeader>
          <StatsContent>
            <StatsValue>
              {formatCurrency(
                dashboardStats.totalSales.value || 0,
                dashboardStats.totalSales.currency || 'USD'
              )}
            </StatsValue>
            <StatsLabel>Total Sales</StatsLabel>
            <StatsChange positive={dashboardStats.totalSales.change > 0}>
              {dashboardStats.totalSales.change > 0 ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
              {Math.abs(dashboardStats.totalSales.change)}%{' '}
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
              {Math.abs(dashboardStats.totalOrders.change)}%{' '}
              {dashboardStats.totalOrders.period}
            </StatsChange>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsHeader>
            <StatsIcon gradient="linear-gradient(135deg, #9C27B0, #7B1FA2)">
              <FaUsers />
            </StatsIcon>
          </StatsHeader>
          <StatsContent>
            <StatsValue>
              {formatNumber(dashboardStats.totalCustomers.value)}
            </StatsValue>
            <StatsLabel>Total Customers</StatsLabel>
            <StatsChange positive={dashboardStats.totalCustomers.change > 0}>
              {dashboardStats.totalCustomers.change > 0 ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
              {Math.abs(dashboardStats.totalCustomers.change)}%{' '}
              {dashboardStats.totalCustomers.period}
            </StatsChange>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsHeader>
            <StatsIcon gradient="linear-gradient(135deg, #FF9800, #F57C00)">
              <FaEye />
            </StatsIcon>
          </StatsHeader>
          <StatsContent>
            <StatsValue>
              {formatNumber(dashboardStats.storeViews.value)}
            </StatsValue>
            <StatsLabel>Store Views</StatsLabel>
            <StatsChange positive={dashboardStats.storeViews.change > 0}>
              {dashboardStats.storeViews.change > 0 ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
              {Math.abs(dashboardStats.storeViews.change)}%{' '}
              {dashboardStats.storeViews.period}
            </StatsChange>
          </StatsContent>
        </StatsCard>
      </DashboardGrid>

      {/* Charts and Alerts */}
      <ContentGrid>
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

        <AlertsCard>
          <ChartHeader>
            <ChartTitle>Low Stock Alerts</ChartTitle>
            <ChartSubtitle>Products running low on inventory</ChartSubtitle>
          </ChartHeader>
          <AlertsList>
            {lowStockAlerts.map(alert => (
              <AlertItem key={alert.id}>
                <AlertImage
                  src={
                    alert.image ||
                    'https://via.placeholder.com/64x64?text=No+Image'
                  }
                  alt={alert.productName}
                  onError={e => {
                    e.target.src =
                      'https://via.placeholder.com/64x64?text=No+Image';
                  }}
                />
                <AlertContent>
                  <AlertTitle>{alert.productName}</AlertTitle>
                  <AlertMessage>
                    Only {alert.currentStock} left in stock (Threshold:{' '}
                    {alert.threshold})
                  </AlertMessage>
                </AlertContent>
              </AlertItem>
            ))}
          </AlertsList>
        </AlertsCard>
      </ContentGrid>

      {/* Top Products */}
      <TopProductsGrid>
        <ProductCard>
          <ChartHeader>
            <ChartTitle>Best Selling Products</ChartTitle>
            <ChartSubtitle>Top performing products this month</ChartSubtitle>
          </ChartHeader>
          <ProductsList>
            {topPerformingProducts.map((product, index) => (
              <ProductItem key={product.id}>
                <ProductImage
                  src={
                    product.image ||
                    'https://via.placeholder.com/80x80?text=No+Image'
                  }
                  alt={product.name}
                  onError={e => {
                    e.target.src =
                      'https://via.placeholder.com/80x80?text=No+Image';
                  }}
                />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductStats>
                    {product.sales || 0} sold •{' '}
                    {formatCurrency(product.revenue || 0)} revenue
                    <ProductGrowth> (+{product.growth || 0}%)</ProductGrowth>
                  </ProductStats>
                </ProductInfo>
              </ProductItem>
            ))}
          </ProductsList>
        </ProductCard>

        <ProductCard>
          <ChartHeader>
            <ChartTitle>Recent Activity</ChartTitle>
            <ChartSubtitle>Latest updates from your store</ChartSubtitle>
          </ChartHeader>
          <ProductsList>
            {recentActivity.map(activity => (
              <ProductItem key={activity.id}>
                <StatsIcon
                  style={{
                    width: '32px',
                    height: '32px',
                    fontSize: '0.9rem',
                    background: `${theme.colors.primary}20`,
                    color: theme.colors.primary,
                  }}
                >
                  {activity.type === 'order' && <FaShoppingCart />}
                  {activity.type === 'product' && <FaExclamationTriangle />}
                  {activity.type === 'payment' && <FaDollarSign />}
                  {activity.type === 'review' && <FaTrophy />}
                </StatsIcon>
                <ProductInfo>
                  <ProductName>{activity.message}</ProductName>
                  <ProductStats>{activity.time}</ProductStats>
                </ProductInfo>
              </ProductItem>
            ))}
          </ProductsList>
        </ProductCard>
      </TopProductsGrid>
    </DashboardContainer>
  );
};

export default DashboardTabEnhanced;
