import React from 'react';
import styled from 'styled-components';
import {
  FaChartPie,
  FaChartBar,
  FaChartLine,
  FaDownload,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { sellerDashboardData } from '../../data';
const { categoryRevenueData, bestSellingProducts, salesTrendData } =
  sellerDashboardData;

const InsightsContainer = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
`;

const InsightsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${theme.spacing.lg};
`;

const HeaderTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.white};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};

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
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const ChartIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background: ${props =>
    props.gradient ||
    `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 1.1rem;
`;

const ChartTitleGroup = styled.div`
  flex: 1;
`;

const ChartTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const ChartSubtitle = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const PieChart = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto ${theme.spacing.lg};
`;

const PieSegment = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    ${props =>
      props.segments
        .map((segment, index) => {
          const colors = [
            theme.colors.primary,
            theme.colors.secondary,
            theme.colors.success,
            theme.colors.warning,
            theme.colors.info,
          ];
          const startAngle = segment.startAngle;
          const endAngle = segment.endAngle;
          return `${colors[index % colors.length]} ${startAngle}deg ${endAngle}deg`;
        })
        .join(', ')}
  );
`;

const PieCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: ${theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 0 0 2px ${theme.colors.gray200};
`;

const PieCenterValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const PieCenterLabel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
`;

const LegendList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LegendColor = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'color',
})`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${props => props.color};
`;

const LegendText = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.gray700};
  flex: 1;
`;

const LegendValue = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
`;

const BarChart = styled.div`
  height: 300px;
  display: flex;
  align-items: end;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.lg} 0;
`;

const Bar = styled.div`
  flex: 1;
  background: linear-gradient(
    to top,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  border-radius: 4px 4px 0 0;
  min-height: 10px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
`;

const BarLabel = styled.div`
  position: absolute;
  bottom: -${theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: ${theme.colors.gray600};
  text-align: center;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BarValue = styled.div`
  position: absolute;
  top: -${theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 500;
  color: ${theme.colors.gray700};
  white-space: nowrap;
`;

const LineChart = styled.div`
  height: 250px;
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  position: relative;
  overflow: hidden;
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: end;
  gap: 2px;
`;

const LineBar = styled.div`
  flex: 1;
  background: linear-gradient(
    to top,
    ${theme.colors.primary}40,
    ${theme.colors.primary}
  );
  border-radius: 1px 1px 0 0;
  min-height: 5px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      to top,
      ${theme.colors.primary}60,
      ${theme.colors.primaryDark}
    );
  }
`;

const FullWidthCard = styled(ChartCard)`
  grid-column: 1 / -1;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InsightsTab = () => {
  const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = value => {
    return `${value}%`;
  };

  // Calculate pie chart segments
  const totalRevenue = categoryRevenueData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  let currentAngle = 0;
  const pieSegments = categoryRevenueData.map(item => {
    const angle = (item.percentage / 100) * 360;
    const segment = {
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      ...item,
    };
    currentAngle += angle;
    return segment;
  });

  // Calculate max values for charts
  const maxProductSales = Math.max(...bestSellingProducts.map(p => p.sold));
  const maxSalesValue = Math.max(...salesTrendData.map(d => d.sales));

  const colors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.success,
    theme.colors.warning,
    theme.colors.info,
  ];

  return (
    <InsightsContainer>
      <InsightsHeader>
        <HeaderTitle>Business Insights</HeaderTitle>
        <ExportButton>
          <FaDownload />
          Export Report
        </ExportButton>
      </InsightsHeader>

      <ChartsGrid>
        <ChartCard>
          <ChartHeader>
            <ChartIcon gradient="linear-gradient(135deg, #FF6B6B, #FF8E53)">
              <FaChartPie />
            </ChartIcon>
            <ChartTitleGroup>
              <ChartTitle>Revenue by Category</ChartTitle>
              <ChartSubtitle>
                Distribution of sales across product categories
              </ChartSubtitle>
            </ChartTitleGroup>
          </ChartHeader>

          <PieChart>
            <PieSegment segments={pieSegments} />
            <PieCenter>
              <PieCenterValue>{formatCurrency(totalRevenue)}</PieCenterValue>
              <PieCenterLabel>Total</PieCenterLabel>
            </PieCenter>
          </PieChart>

          <LegendList>
            {categoryRevenueData.map((item, index) => (
              <LegendItem key={item.category}>
                <LegendColor color={colors[index % colors.length]} />
                <LegendText>{item.category}</LegendText>
                <LegendValue>{formatPercentage(item.percentage)}</LegendValue>
              </LegendItem>
            ))}
          </LegendList>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartIcon gradient="linear-gradient(135deg, #4ECDC4, #44A08D)">
              <FaChartBar />
            </ChartIcon>
            <ChartTitleGroup>
              <ChartTitle>Best Selling Products</ChartTitle>
              <ChartSubtitle>
                Top performing products by units sold
              </ChartSubtitle>
            </ChartTitleGroup>
          </ChartHeader>

          <BarChart>
            {bestSellingProducts.map((product, index) => (
              <Bar
                key={index}
                style={{
                  height: `${(product.sold / maxProductSales) * 100}%`,
                }}
                title={`${product.name}: ${product.sold} sold`}
              >
                <BarValue>{product.sold}</BarValue>
                <BarLabel>{product.name}</BarLabel>
              </Bar>
            ))}
          </BarChart>
        </ChartCard>

        <FullWidthCard>
          <ChartHeader>
            <ChartIcon gradient="linear-gradient(135deg, #667eea, #764ba2)">
              <FaChartLine />
            </ChartIcon>
            <ChartTitleGroup>
              <ChartTitle>Sales Trends</ChartTitle>
              <ChartSubtitle>
                Daily sales performance over the last 14 days
              </ChartSubtitle>
            </ChartTitleGroup>
          </ChartHeader>

          <StatsRow>
            <StatCard>
              <StatValue>{formatCurrency(28450)}</StatValue>
              <StatLabel>Average Daily Sales</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>+12.5%</StatValue>
              <StatLabel>Growth Rate</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{formatCurrency(3100)}</StatValue>
              <StatLabel>Best Day</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>5.2</StatValue>
              <StatLabel>Trending Score</StatLabel>
            </StatCard>
          </StatsRow>

          <LineChart>
            {salesTrendData.map((data, index) => (
              <LineBar
                key={index}
                style={{
                  height: `${(data.sales / maxSalesValue) * 100}%`,
                }}
                title={`${new Date(data.date).toLocaleDateString()}: ${formatCurrency(data.sales)}`}
              />
            ))}
          </LineChart>
        </FullWidthCard>
      </ChartsGrid>
    </InsightsContainer>
  );
};

export default InsightsTab;
