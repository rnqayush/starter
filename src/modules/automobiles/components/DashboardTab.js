import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaCar,
  FaDollarSign,
  FaUsers,
  FaChartLine,
  FaEnvelope,
  FaCalendar,
  FaExchangeAlt,
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaEye,
} from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const StatCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${theme.colors.white};
  background: ${props => props.color || theme.colors.primary};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.sm};
`;

const StatChange = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'positive',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props =>
    props.positive ? theme.colors.success : theme.colors.error};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const ChartSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const RecentActivity = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};
`;

const ActivityIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color || theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xs};
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const ActionCard = styled.button`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
    border-color: ${theme.colors.primary};
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color || theme.colors.primary}20;
  color: ${props => props.color || theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: ${theme.spacing.md};
`;

const ActionTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ActionDescription = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray500};
  font-size: 1rem;
  border: 2px dashed ${theme.colors.gray300};
`;

const DashboardTab = ({ dealer }) => {
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate loading dashboard data
    setStats({
      totalVehicles: 147,
      totalSales: 52,
      revenue: 2840000,
      customers: 1243,
      enquiries: 28,
      serviceAppointments: 15,
      tradeIns: 8,
      avgRating: 4.8,
    });

    setRecentActivity([
      {
        id: 1,
        type: 'sale',
        text: 'New sale: 2024 BMW X5 M50i',
        time: '2 hours ago',
        icon: FaDollarSign,
        color: theme.colors.success,
      },
      {
        id: 2,
        type: 'enquiry',
        text: 'New enquiry for Tesla Model S Plaid',
        time: '4 hours ago',
        icon: FaEnvelope,
        color: theme.colors.primary,
      },
      {
        id: 3,
        type: 'service',
        text: 'Service appointment scheduled',
        time: '6 hours ago',
        icon: FaCalendar,
        color: theme.colors.warning,
      },
      {
        id: 4,
        type: 'trade-in',
        text: 'Trade-in evaluation completed',
        time: '1 day ago',
        icon: FaExchangeAlt,
        color: theme.colors.info,
      },
    ]);
  }, []);

  const statCards = [
    {
      label: 'Total Vehicles',
      value: stats.totalVehicles,
      icon: FaCar,
      color: theme.colors.primary,
      change: { value: '+12%', positive: true },
    },
    {
      label: 'Monthly Sales',
      value: stats.totalSales,
      icon: FaDollarSign,
      color: theme.colors.success,
      change: { value: '+8%', positive: true },
    },
    {
      label: 'Revenue (YTD)',
      value: `$${(stats.revenue / 1000000).toFixed(1)}M`,
      icon: FaChartLine,
      color: theme.colors.info,
      change: { value: '+15%', positive: true },
    },
    {
      label: 'Total Customers',
      value: stats.customers,
      icon: FaUsers,
      color: theme.colors.secondary,
      change: { value: '+5%', positive: true },
    },
    {
      label: 'Active Enquiries',
      value: stats.enquiries,
      icon: FaEnvelope,
      color: theme.colors.warning,
      change: { value: '-3%', positive: false },
    },
    {
      label: 'Service Appointments',
      value: stats.serviceAppointments,
      icon: FaCalendar,
      color: theme.colors.purple || '#8b5cf6',
      change: { value: '+20%', positive: true },
    },
    {
      label: 'Trade-Ins (Month)',
      value: stats.tradeIns,
      icon: FaExchangeAlt,
      color: theme.colors.orange || '#f59e0b',
      change: { value: '+25%', positive: true },
    },
    {
      label: 'Average Rating',
      value: stats.avgRating,
      icon: FaStar,
      color: theme.colors.yellow || '#eab308',
      change: { value: '+0.2', positive: true },
    },
  ];

  const quickActions = [
    {
      title: 'Add New Vehicle',
      description: 'Add a new vehicle to inventory',
      icon: FaCar,
      color: theme.colors.primary,
      action: () => {}, // Will be handled by parent
    },
    {
      title: 'View Enquiries',
      description: 'Check new customer enquiries',
      icon: FaEnvelope,
      color: theme.colors.secondary,
      action: () => {},
    },
    {
      title: 'Sales Report',
      description: 'Generate monthly sales report',
      icon: FaChartLine,
      color: theme.colors.success,
      action: () => {},
    },
    {
      title: 'Customer Management',
      description: 'Manage customer database',
      icon: FaUsers,
      color: theme.colors.info,
      action: () => {},
    },
  ];

  return (
    <DashboardContainer>
      <StatsGrid>
        {statCards.map((stat, index) => (
          <StatCard key={index}>
            <StatHeader>
              <div>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
                <StatChange positive={stat.change.positive}>
                  {stat.change.positive ? <FaArrowUp /> : <FaArrowDown />}
                  {stat.change.value} from last month
                </StatChange>
              </div>
              <StatIcon color={stat.color}>
                <stat.icon />
              </StatIcon>
            </StatHeader>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid>
        <ChartSection>
          <SectionTitle>
            <FaChartLine />
            Sales Performance
          </SectionTitle>
          <ChartPlaceholder>
            Sales Chart Coming Soon
            <br />
            <small>Interactive sales analytics will be available here</small>
          </ChartPlaceholder>
        </ChartSection>

        <RecentActivity>
          <SectionTitle>
            <FaEye />
            Recent Activity
          </SectionTitle>
          <ActivityList>
            {recentActivity.map(activity => (
              <ActivityItem key={activity.id}>
                <ActivityIcon color={activity.color}>
                  <activity.icon />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>{activity.text}</ActivityText>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivity>
      </ContentGrid>

      <div>
        <SectionTitle>Quick Actions</SectionTitle>
        <QuickActions>
          {quickActions.map((action, index) => (
            <ActionCard key={index} onClick={action.action}>
              <ActionIcon color={action.color}>
                <action.icon />
              </ActionIcon>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionCard>
          ))}
        </QuickActions>
      </div>
    </DashboardContainer>
  );
};

export default DashboardTab;
