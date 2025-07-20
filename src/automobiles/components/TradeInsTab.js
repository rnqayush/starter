import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaExchangeAlt,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaEdit,
  FaCheck,
  FaTimes,
  FaClock,
  FaCar,
  FaUser,
  FaDollarSign,
  FaCalendar,
  FaStar,
  FaClipboardList,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaPrint,
  FaCamera,
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

const TradeInsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.lg};
  }
`;

const TradeInCard = styled.div`
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

const TradeInHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const TradeInId = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 1rem;
  margin-bottom: ${theme.spacing.xs};
`;

const TradeInDate = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
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
      case "pending": return theme.colors.warning;
      case "evaluating": return theme.colors.info;
      case "appraised": return theme.colors.purple || "#8b5cf6";
      case "accepted": return theme.colors.success;
      case "rejected": return theme.colors.error;
      case "completed": return theme.colors.gray600;
      default: return theme.colors.gray500;
    }
  }};
`;

const CustomerSection = styled.div`
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const CustomerContact = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const VehicleSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const VehicleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const VehicleImage = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const VehicleDetails = styled.div`
  flex: 1;
`;

const VehicleName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VehicleSpecs = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const PricingSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const PriceItem = styled.div`
  text-align: center;
`;

const PriceValue = styled.div`
  font-weight: 700;
  color: ${(props) => props.color || theme.colors.gray900};
  font-size: 1rem;
  margin-bottom: ${theme.spacing.xs};
`;

const PriceLabel = styled.div`
  font-size: 0.7rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ConditionRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const ConditionLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
`;

const ConditionStars = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.warning};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButtonSmall = styled.button`
  background: ${(props) => 
    props.variant === 'accept' ? theme.colors.success : 
    props.variant === 'reject' ? theme.colors.error : 
    props.variant === 'primary' ? theme.colors.primary :
    theme.colors.white};
  color: ${(props) => 
    props.variant === 'accept' || props.variant === 'reject' || props.variant === 'primary' ? 
    theme.colors.white : theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: ${(props) => 
    props.variant === 'accept' || props.variant === 'reject' || props.variant === 'primary' ? 
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

const TradeInsTab = ({ dealer }) => {
  const [tradeIns, setTradeIns] = useState([]);
  const [filteredTradeIns, setFilteredTradeIns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    // Mock trade-in data
    const mockTradeIns = [
      {
        id: "TI-001",
        tradeInId: "24-TI-001",
        customerId: 1,
        customerName: "John Smith",
        customerEmail: "john.smith@email.com",
        customerPhone: "(555) 123-4567",
        vehicle: {
          year: 2019,
          make: "BMW",
          model: "X3",
          trim: "xDrive30i",
          mileage: 45000,
          color: "Black",
          vin: "5UXTY3C52K9A12345",
          image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
        },
        submissionDate: "2024-02-15T10:30:00Z",
        status: "evaluating",
        condition: {
          overall: 4,
          exterior: 4,
          interior: 4,
          mechanical: 5,
        },
        pricing: {
          estimatedValue: 28000,
          offerAmount: 26500,
          marketValue: 30000,
        },
        appraiser: "Mike Johnson",
        notes: "Good condition, minor scratches on rear bumper, recent maintenance records available",
        photos: 8,
      },
      {
        id: "TI-002",
        tradeInId: "24-TI-002",
        customerId: 2,
        customerName: "Sarah Johnson",
        customerEmail: "sarah.j@email.com",
        customerPhone: "(555) 234-5678",
        vehicle: {
          year: 2020,
          make: "Toyota",
          model: "Camry",
          trim: "XLE",
          mileage: 32000,
          color: "Silver",
          vin: "4T1G11AK4LU123456",
          image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop",
        },
        submissionDate: "2024-02-14T14:20:00Z",
        status: "accepted",
        condition: {
          overall: 5,
          exterior: 5,
          interior: 5,
          mechanical: 5,
        },
        pricing: {
          estimatedValue: 22000,
          offerAmount: 21500,
          marketValue: 24000,
        },
        appraiser: "Lisa Chen",
        notes: "Excellent condition, single owner, full service history",
        photos: 12,
      },
      {
        id: "TI-003",
        tradeInId: "24-TI-003",
        customerId: 3,
        customerName: "Michael Brown",
        customerEmail: "m.brown@email.com",
        customerPhone: "(555) 345-6789",
        vehicle: {
          year: 2018,
          make: "Ford",
          model: "F-150",
          trim: "Lariat",
          mileage: 68000,
          color: "Blue",
          vin: "1FTEW1EG5JKF12345",
          image: "https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=300&h=200&fit=crop",
        },
        submissionDate: "2024-02-13T09:15:00Z",
        status: "appraised",
        condition: {
          overall: 3,
          exterior: 3,
          interior: 4,
          mechanical: 3,
        },
        pricing: {
          estimatedValue: 32000,
          offerAmount: 29500,
          marketValue: 35000,
        },
        appraiser: "David Wilson",
        notes: "Work truck with some wear, bed liner installed, maintenance up to date",
        photos: 6,
      },
      {
        id: "TI-004",
        tradeInId: "24-TI-004",
        customerId: 4,
        customerName: "Emily Davis",
        customerEmail: "emily.davis@email.com",
        customerPhone: "(555) 456-7890",
        vehicle: {
          year: 2021,
          make: "Honda",
          model: "Civic",
          trim: "Sport",
          mileage: 25000,
          color: "Red",
          vin: "2HGFC2F56MH123456",
          image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=300&h=200&fit=crop",
        },
        submissionDate: "2024-02-12T16:45:00Z",
        status: "pending",
        condition: {
          overall: 0,
          exterior: 0,
          interior: 0,
          mechanical: 0,
        },
        pricing: {
          estimatedValue: 0,
          offerAmount: 0,
          marketValue: 0,
        },
        appraiser: null,
        notes: "Initial submission, awaiting inspection appointment",
        photos: 4,
      },
      {
        id: "TI-005",
        tradeInId: "24-TI-005",
        customerId: 5,
        customerName: "Robert Wilson",
        customerEmail: "r.wilson@email.com",
        customerPhone: "(555) 567-8901",
        vehicle: {
          year: 2017,
          make: "Mercedes-Benz",
          model: "C300",
          trim: "4MATIC",
          mileage: 75000,
          color: "White",
          vin: "55SWF4KB4HU123456",
          image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&h=200&fit=crop",
        },
        submissionDate: "2024-02-11T11:00:00Z",
        status: "rejected",
        condition: {
          overall: 2,
          exterior: 2,
          interior: 3,
          mechanical: 2,
        },
        pricing: {
          estimatedValue: 18000,
          offerAmount: 0,
          marketValue: 22000,
        },
        appraiser: "Alex Rodriguez",
        notes: "High mileage, multiple accident history, extensive wear and tear",
        photos: 10,
      },
    ];

    setTradeIns(mockTradeIns);
    setFilteredTradeIns(mockTradeIns);
  }, []);

  useEffect(() => {
    let filtered = [...tradeIns];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tradeIn =>
        tradeIn.tradeInId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tradeIn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${tradeIn.vehicle.year} ${tradeIn.vehicle.make} ${tradeIn.vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tradeIn.appraiser && tradeIn.appraiser.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(tradeIn => tradeIn.status === statusFilter);
    }

    setFilteredTradeIns(filtered);
  }, [tradeIns, searchTerm, statusFilter]);

  const formatCurrency = (amount) => {
    if (amount === 0) return "TBD";
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
      case "pending": return "Pending";
      case "evaluating": return "Evaluating";
      case "appraised": return "Appraised";
      case "accepted": return "Accepted";
      case "rejected": return "Rejected";
      case "completed": return "Completed";
      default: return status;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} style={{ color: i < rating ? theme.colors.warning : theme.colors.gray300 }} />
    ));
  };

  const stats = {
    total: tradeIns.length,
    pending: tradeIns.filter(t => t.status === "pending").length,
    evaluating: tradeIns.filter(t => t.status === "evaluating").length,
    accepted: tradeIns.filter(t => t.status === "accepted").length,
    rejected: tradeIns.filter(t => t.status === "rejected").length,
    totalValue: tradeIns.filter(t => t.status === "accepted").reduce((sum, t) => sum + t.pricing.offerAmount, 0),
    avgCondition: tradeIns.length > 0 ? 
      Math.round(tradeIns.filter(t => t.condition.overall > 0).reduce((sum, t) => sum + t.condition.overall, 0) / 
      tradeIns.filter(t => t.condition.overall > 0).length * 10) / 10 : 0,
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Title>
            <FaExchangeAlt />
            Trade-In Management ({filteredTradeIns.length})
          </Title>
          <HeaderActions>
            <ActionButton>
              <FaDownload />
              Export Report
            </ActionButton>
            <ActionButton>
              <FaClipboardList />
              Appraisal Form
            </ActionButton>
            <ActionButton primary>
              <FaPlus />
              New Trade-In
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
              placeholder="Search by trade-in ID, customer, vehicle, or appraiser..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="evaluating">Evaluating</option>
            <option value="appraised">Appraised</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </FilterSelect>

          <FilterSelect defaultValue="recent">
            <option value="recent">Recent First</option>
            <option value="oldest">Oldest First</option>
            <option value="value">Highest Value</option>
            <option value="condition">Best Condition</option>
          </FilterSelect>

          <FilterSelect defaultValue="all">
            <option value="all">All Appraisers</option>
            <option value="mike">Mike Johnson</option>
            <option value="lisa">Lisa Chen</option>
            <option value="david">David Wilson</option>
            <option value="alex">Alex Rodriguez</option>
          </FilterSelect>
        </FiltersRow>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Trade-Ins</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.warning}>{stats.pending}</StatValue>
          <StatLabel>Pending Review</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.info}>{stats.evaluating}</StatValue>
          <StatLabel>Under Evaluation</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{stats.accepted}</StatValue>
          <StatLabel>Accepted</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.error}>{stats.rejected}</StatValue>
          <StatLabel>Rejected</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{formatCurrency(stats.totalValue)}</StatValue>
          <StatLabel>Total Value</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.warning}>{stats.avgCondition}</StatValue>
          <StatLabel>Avg Condition</StatLabel>
        </StatCard>
      </StatsGrid>

      <TradeInsGrid>
        {filteredTradeIns.length > 0 ? (
          filteredTradeIns.map((tradeIn) => (
            <TradeInCard key={tradeIn.id}>
              <TradeInHeader>
                <div>
                  <TradeInId>#{tradeIn.tradeInId}</TradeInId>
                  <TradeInDate>
                    <FaCalendar />
                    {formatDate(tradeIn.submissionDate)}
                  </TradeInDate>
                </div>
                <StatusBadge status={tradeIn.status}>
                  {getStatusLabel(tradeIn.status)}
                </StatusBadge>
              </TradeInHeader>

              <CustomerSection>
                <CustomerName>
                  <FaUser />
                  {tradeIn.customerName}
                </CustomerName>
                <CustomerContact>{tradeIn.customerEmail}</CustomerContact>
                <CustomerContact>{tradeIn.customerPhone}</CustomerContact>
              </CustomerSection>

              <VehicleSection>
                <VehicleInfo>
                  <VehicleImage src={tradeIn.vehicle.image} alt={`${tradeIn.vehicle.year} ${tradeIn.vehicle.make} ${tradeIn.vehicle.model}`} />
                  <VehicleDetails>
                    <VehicleName>
                      {tradeIn.vehicle.year} {tradeIn.vehicle.make} {tradeIn.vehicle.model}
                    </VehicleName>
                    <VehicleSpecs>
                      <div>{tradeIn.vehicle.trim} • {tradeIn.vehicle.color}</div>
                      <div>{tradeIn.vehicle.mileage.toLocaleString()} miles</div>
                      <div>VIN: {tradeIn.vehicle.vin}</div>
                    </VehicleSpecs>
                  </VehicleDetails>
                </VehicleInfo>
              </VehicleSection>

              {tradeIn.condition.overall > 0 && (
                <ConditionRating>
                  <ConditionLabel>Condition Rating:</ConditionLabel>
                  <ConditionStars>
                    {renderStars(tradeIn.condition.overall)}
                  </ConditionStars>
                </ConditionRating>
              )}

              <PricingSection>
                <PriceItem>
                  <PriceValue color={theme.colors.info}>{formatCurrency(tradeIn.pricing.marketValue)}</PriceValue>
                  <PriceLabel>Market Value</PriceLabel>
                </PriceItem>
                <PriceItem>
                  <PriceValue>{formatCurrency(tradeIn.pricing.estimatedValue)}</PriceValue>
                  <PriceLabel>Estimated</PriceLabel>
                </PriceItem>
                <PriceItem>
                  <PriceValue color={theme.colors.success}>{formatCurrency(tradeIn.pricing.offerAmount)}</PriceValue>
                  <PriceLabel>Our Offer</PriceLabel>
                </PriceItem>
              </PricingSection>

              {tradeIn.appraiser && (
                <div style={{ marginBottom: theme.spacing.md, fontSize: '0.9rem', color: theme.colors.gray600 }}>
                  Appraiser: {tradeIn.appraiser} • {tradeIn.photos} photos
                </div>
              )}

              {tradeIn.notes && (
                <div style={{ marginBottom: theme.spacing.md, fontSize: '0.9rem', color: theme.colors.gray600, fontStyle: 'italic' }}>
                  Notes: {tradeIn.notes}
                </div>
              )}

              <ActionButtons>
                <ActionButtonSmall>
                  <FaEye />
                  View Details
                </ActionButtonSmall>
                <ActionButtonSmall>
                  <FaCamera />
                  Photos ({tradeIn.photos})
                </ActionButtonSmall>
                {tradeIn.status === "pending" && (
                  <ActionButtonSmall variant="primary">
                    <FaClipboardList />
                    Start Appraisal
                  </ActionButtonSmall>
                )}
                {tradeIn.status === "appraised" && (
                  <>
                    <ActionButtonSmall variant="accept">
                      <FaCheck />
                      Accept
                    </ActionButtonSmall>
                    <ActionButtonSmall variant="reject">
                      <FaTimes />
                      Reject
                    </ActionButtonSmall>
                  </>
                )}
                {tradeIn.status === "accepted" && (
                  <ActionButtonSmall>
                    <FaPrint />
                    Print Contract
                  </ActionButtonSmall>
                )}
                <ActionButtonSmall>
                  <FaEdit />
                  Edit
                </ActionButtonSmall>
              </ActionButtons>
            </TradeInCard>
          ))
        ) : (
          <EmptyState>
            <FaExchangeAlt className="icon" />
            <h3>No trade-ins found</h3>
            <p>Try adjusting your search criteria or add a new trade-in evaluation.</p>
          </EmptyState>
        )}
      </TradeInsGrid>
    </Container>
  );
};

export default TradeInsTab;
