import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaTags,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaPlay,
  FaPause,
  FaStop,
  FaCalendar,
  FaChartLine,
  FaDownload,
  FaCopy,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const Container = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "primary",
})`
  background: ${(props) => props.primary ? theme.colors.primary : theme.colors.white};
  color: ${(props) => props.primary ? theme.colors.white : theme.colors.gray700};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: ${(props) => props.primary ? 'none' : `2px solid ${theme.colors.gray200}`};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${(props) => props.primary ? theme.colors.primaryDark : theme.colors.gray50};
    transform: translateY(-1px);
    border-color: ${(props) => props.primary ? theme.colors.primaryDark : theme.colors.primary};
  }
`;

const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 2.5rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1rem;
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.color || theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PromotionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.lg};
  }
`;

const PromotionCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
    border-color: ${theme.colors.primary};
  }
`;

const PromotionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const PromotionInfo = styled.div`
  flex: 1;
`;

const PromotionTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 1.1rem;
  margin-bottom: ${theme.spacing.xs};
`;

const PromotionType = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${theme.spacing.sm};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "status",
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.white};
  background: ${(props) => {
    switch (props.status) {
      case "draft": return theme.colors.gray500;
      case "active": return theme.colors.success;
      case "scheduled": return theme.colors.info;
      case "paused": return theme.colors.warning;
      case "expired": return theme.colors.error;
      default: return theme.colors.gray500;
    }
  }};
`;

const PromotionDescription = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: ${theme.spacing.md};
`;

const PromotionDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailValue = styled.div`
  font-weight: 700;
  color: ${(props) => props.color || theme.colors.gray900};
  font-size: 1rem;
  margin-bottom: ${theme.spacing.xs};
`;

const DetailLabel = styled.div`
  font-size: 0.7rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DateRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const PerformanceMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const MetricItem = styled.div`
  text-align: center;
`;

const MetricValue = styled.div`
  font-weight: 600;
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.xs};
`;

const MetricLabel = styled.div`
  font-size: 0.7rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButtonSmall = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})`
  background: ${(props) => 
    props.variant === 'activate' ? theme.colors.success : 
    props.variant === 'pause' ? theme.colors.warning : 
    props.variant === 'stop' ? theme.colors.error : 
    props.variant === 'primary' ? theme.colors.primary :
    theme.colors.white};
  color: ${(props) => 
    props.variant === 'activate' || props.variant === 'pause' || props.variant === 'stop' || props.variant === 'primary' ? 
    theme.colors.white : theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: ${(props) => 
    props.variant === 'activate' || props.variant === 'pause' || props.variant === 'stop' || props.variant === 'primary' ? 
    'none' : `1px solid ${theme.colors.gray300}`};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};
  grid-column: 1 / -1;

  .icon {
    font-size: 4rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.lg};
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray700};
  }
`;

const PromotionsTab = ({ dealer }) => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    // Mock promotions data
    const mockPromotions = [
      {
        id: "PROMO-001",
        title: "Summer Sales Spectacular",
        type: "percentage_discount",
        description: "Get 15% off all SUVs and trucks this summer! Perfect time to upgrade your vehicle.",
        discountValue: 15,
        discountType: "percentage",
        startDate: "2024-06-01",
        endDate: "2024-08-31",
        status: "scheduled",
        applicableVehicles: "SUV, Truck",
        minPurchaseAmount: 25000,
        maxDiscountAmount: 5000,
        usageCount: 0,
        usageLimit: 100,
        revenue: 0,
        conversionRate: 0,
        createdDate: "2024-05-15",
      },
      {
        id: "PROMO-002",
        title: "New Customer Welcome Deal",
        type: "fixed_discount",
        description: "First-time customers get $2,000 off any new vehicle purchase. Welcome to our dealership family!",
        discountValue: 2000,
        discountType: "fixed",
        startDate: "2024-02-01",
        endDate: "2024-12-31",
        status: "active",
        applicableVehicles: "All New Vehicles",
        minPurchaseAmount: 20000,
        maxDiscountAmount: 2000,
        usageCount: 23,
        usageLimit: 200,
        revenue: 920000,
        conversionRate: 18.5,
        createdDate: "2024-01-25",
      },
      {
        id: "PROMO-003",
        title: "Trade-In Bonus Program",
        type: "trade_in_bonus",
        description: "Extra $1,500 trade-in value for your old vehicle when purchasing any certified pre-owned car.",
        discountValue: 1500,
        discountType: "trade_bonus",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        status: "active",
        applicableVehicles: "Certified Pre-Owned",
        minPurchaseAmount: 15000,
        maxDiscountAmount: 1500,
        usageCount: 34,
        usageLimit: 150,
        revenue: 1360000,
        conversionRate: 22.7,
        createdDate: "2024-01-10",
      },
      {
        id: "PROMO-004",
        title: "Memorial Day Weekend Special",
        type: "financing_deal",
        description: "0.9% APR financing for qualified buyers on select new vehicles. Limited time offer!",
        discountValue: 0.9,
        discountType: "apr_rate",
        startDate: "2024-05-25",
        endDate: "2024-05-28",
        status: "expired",
        applicableVehicles: "Select New Models",
        minPurchaseAmount: 30000,
        maxDiscountAmount: 0,
        usageCount: 12,
        usageLimit: 50,
        revenue: 480000,
        conversionRate: 24.0,
        createdDate: "2024-05-15",
      },
      {
        id: "PROMO-005",
        title: "Fleet Customer Discount",
        type: "bulk_discount",
        description: "Special pricing for fleet customers purchasing 5 or more vehicles. Contact us for custom quotes.",
        discountValue: 8,
        discountType: "percentage",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        status: "active",
        applicableVehicles: "All Vehicles",
        minPurchaseAmount: 100000,
        maxDiscountAmount: 50000,
        usageCount: 6,
        usageLimit: 25,
        revenue: 780000,
        conversionRate: 85.7,
        createdDate: "2023-12-20",
      },
      {
        id: "PROMO-006",
        title: "Student Discount Program",
        type: "student_discount",
        description: "College students and recent graduates get $1,000 off their first car purchase.",
        discountValue: 1000,
        discountType: "fixed",
        startDate: "2024-03-01",
        endDate: "2024-12-31",
        status: "paused",
        applicableVehicles: "All Vehicles",
        minPurchaseAmount: 15000,
        maxDiscountAmount: 1000,
        usageCount: 8,
        usageLimit: 100,
        revenue: 240000,
        conversionRate: 12.3,
        createdDate: "2024-02-20",
      },
    ];

    setPromotions(mockPromotions);
    setFilteredPromotions(mockPromotions);
  }, []);

  useEffect(() => {
    let filtered = [...promotions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(promotion =>
        promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promotion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promotion.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(promotion => promotion.status === statusFilter);
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter(promotion => promotion.type === typeFilter);
    }

    setFilteredPromotions(filtered);
  }, [promotions, searchTerm, statusFilter, typeFilter]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "draft": return "Draft";
      case "active": return "Active";
      case "scheduled": return "Scheduled";
      case "paused": return "Paused";
      case "expired": return "Expired";
      default: return status;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "percentage_discount": return "Percentage Discount";
      case "fixed_discount": return "Fixed Discount";
      case "trade_in_bonus": return "Trade-In Bonus";
      case "financing_deal": return "Financing Deal";
      case "bulk_discount": return "Bulk Discount";
      case "student_discount": return "Student Discount";
      default: return type;
    }
  };

  const formatDiscountValue = (promotion) => {
    switch (promotion.discountType) {
      case "percentage":
        return `${promotion.discountValue}%`;
      case "fixed":
        return formatCurrency(promotion.discountValue);
      case "trade_bonus":
        return `+${formatCurrency(promotion.discountValue)}`;
      case "apr_rate":
        return `${promotion.discountValue}% APR`;
      default:
        return promotion.discountValue;
    }
  };

  const stats = {
    total: promotions.length,
    active: promotions.filter(p => p.status === "active").length,
    scheduled: promotions.filter(p => p.status === "scheduled").length,
    paused: promotions.filter(p => p.status === "paused").length,
    totalRevenue: promotions.filter(p => p.status === "active" || p.status === "expired").reduce((sum, p) => sum + p.revenue, 0),
    totalUsage: promotions.reduce((sum, p) => sum + p.usageCount, 0),
    avgConversion: promotions.length > 0 ? 
      promotions.filter(p => p.conversionRate > 0).reduce((sum, p) => sum + p.conversionRate, 0) / 
      promotions.filter(p => p.conversionRate > 0).length : 0,
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Title>
            <FaTags />
            Promotions & Deals ({filteredPromotions.length})
          </Title>
          <HeaderActions>
            <ActionButton>
              <FaDownload />
              Export Report
            </ActionButton>
            <ActionButton>
              <FaChartLine />
              Analytics
            </ActionButton>
            <ActionButton primary>
              <FaPlus />
              New Promotion
            </ActionButton>
          </HeaderActions>
        </HeaderTop>

        <FiltersRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search promotions by title, description, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
            <option value="draft">Draft</option>
          </FilterSelect>

          <FilterSelect
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="percentage_discount">Percentage Discount</option>
            <option value="fixed_discount">Fixed Discount</option>
            <option value="trade_in_bonus">Trade-In Bonus</option>
            <option value="financing_deal">Financing Deal</option>
            <option value="bulk_discount">Bulk Discount</option>
            <option value="student_discount">Student Discount</option>
          </FilterSelect>

          <FilterSelect defaultValue="recent">
            <option value="recent">Recent First</option>
            <option value="ending_soon">Ending Soon</option>
            <option value="performance">Best Performance</option>
            <option value="usage">Most Used</option>
          </FilterSelect>
        </FiltersRow>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Promotions</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{stats.active}</StatValue>
          <StatLabel>Active</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.info}>{stats.scheduled}</StatValue>
          <StatLabel>Scheduled</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.warning}>{stats.paused}</StatValue>
          <StatLabel>Paused</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{formatCurrency(stats.totalRevenue)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.primary}>{stats.totalUsage}</StatValue>
          <StatLabel>Total Usage</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.info}>{stats.avgConversion.toFixed(1)}%</StatValue>
          <StatLabel>Avg Conversion</StatLabel>
        </StatCard>
      </StatsGrid>

      <PromotionsGrid>
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promotion) => (
            <PromotionCard key={promotion.id}>
              <PromotionHeader>
                <PromotionInfo>
                  <PromotionTitle>{promotion.title}</PromotionTitle>
                  <PromotionType>{getTypeLabel(promotion.type)}</PromotionType>
                </PromotionInfo>
                <StatusBadge status={promotion.status}>
                  {getStatusLabel(promotion.status)}
                </StatusBadge>
              </PromotionHeader>

              <PromotionDescription>
                {promotion.description}
              </PromotionDescription>

              <PromotionDetails>
                <DetailItem>
                  <DetailValue color={theme.colors.success}>
                    {formatDiscountValue(promotion)}
                  </DetailValue>
                  <DetailLabel>Discount Value</DetailLabel>
                </DetailItem>
                <DetailItem>
                  <DetailValue>
                    {formatCurrency(promotion.minPurchaseAmount)}
                  </DetailValue>
                  <DetailLabel>Min Purchase</DetailLabel>
                </DetailItem>
              </PromotionDetails>

              <DateRange>
                <div>
                  <FaCalendar style={{ marginRight: '4px' }} />
                  {formatDate(promotion.startDate)}
                </div>
                <div>→</div>
                <div>
                  <FaCalendar style={{ marginRight: '4px' }} />
                  {formatDate(promotion.endDate)}
                </div>
              </DateRange>

              <PerformanceMetrics>
                <MetricItem>
                  <MetricValue>{promotion.usageCount}/{promotion.usageLimit}</MetricValue>
                  <MetricLabel>Usage</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricValue>{formatCurrency(promotion.revenue)}</MetricValue>
                  <MetricLabel>Revenue</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricValue>{promotion.conversionRate}%</MetricValue>
                  <MetricLabel>Conversion</MetricLabel>
                </MetricItem>
              </PerformanceMetrics>

              <div style={{ marginBottom: theme.spacing.md, fontSize: '0.8rem', color: theme.colors.gray600 }}>
                Applicable to: {promotion.applicableVehicles}
              </div>

              <ActionButtons>
                <ActionButtonSmall>
                  <FaEye />
                  View Details
                </ActionButtonSmall>
                {promotion.status === "draft" && (
                  <ActionButtonSmall variant="activate">
                    <FaPlay />
                    Activate
                  </ActionButtonSmall>
                )}
                {promotion.status === "active" && (
                  <ActionButtonSmall variant="pause">
                    <FaPause />
                    Pause
                  </ActionButtonSmall>
                )}
                {promotion.status === "paused" && (
                  <ActionButtonSmall variant="activate">
                    <FaPlay />
                    Resume
                  </ActionButtonSmall>
                )}
                {(promotion.status === "active" || promotion.status === "paused") && (
                  <ActionButtonSmall variant="stop">
                    <FaStop />
                    Stop
                  </ActionButtonSmall>
                )}
                <ActionButtonSmall>
                  <FaCopy />
                  Duplicate
                </ActionButtonSmall>
                <ActionButtonSmall>
                  <FaEdit />
                  Edit
                </ActionButtonSmall>
              </ActionButtons>
            </PromotionCard>
          ))
        ) : (
          <EmptyState>
            <FaTags className="icon" />
            <h3>No promotions found</h3>
            <p>Try adjusting your search criteria or create a new promotional campaign.</p>
          </EmptyState>
        )}
      </PromotionsGrid>
    </Container>
  );
};

export default PromotionsTab;
