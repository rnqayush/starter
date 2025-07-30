import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaDollarSign,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaCheck,
  FaTimes,
  FaUser,
  FaCalendar,
  FaCalculator,
  FaFileContract,
  FaUniversity,
  FaDownload,
  FaPrint,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

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
  shouldForwardProp: prop => prop !== 'primary',
})`
  background: ${props =>
    props.primary ? theme.colors.primary : theme.colors.white};
  color: ${props =>
    props.primary ? theme.colors.white : theme.colors.gray700};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: ${props =>
    props.primary ? 'none' : `2px solid ${theme.colors.gray200}`};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${props =>
      props.primary ? theme.colors.primaryDark : theme.colors.gray50};
    transform: translateY(-1px);
    border-color: ${props =>
      props.primary ? theme.colors.primaryDark : theme.colors.primary};
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  color: ${props => props.color || theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const ApplicationsList = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

const ApplicationsHeader = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ApplicationItem = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.gray50};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ApplicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const ApplicationInfo = styled.div`
  flex: 1;
`;

const ApplicationId = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const CustomerName = styled.div`
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xs};
`;

const ApplicationDate = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: prop => prop !== 'status',
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.white};
  background: ${props => {
    switch (props.status) {
      case 'pending':
        return theme.colors.warning;
      case 'under_review':
        return theme.colors.info;
      case 'approved':
        return theme.colors.success;
      case 'rejected':
        return theme.colors.error;
      case 'conditional':
        return theme.colors.purple || '#8b5cf6';
      default:
        return theme.colors.gray500;
    }
  }};
`;

const ApplicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButtonSmall = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'variant',
})`
  background: ${props =>
    props.variant === 'approve'
      ? theme.colors.success
      : props.variant === 'reject'
        ? theme.colors.error
        : theme.colors.white};
  color: ${props =>
    props.variant === 'approve' || props.variant === 'reject'
      ? theme.colors.white
      : theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: ${props =>
    props.variant === 'approve' || props.variant === 'reject'
      ? 'none'
      : `1px solid ${theme.colors.gray300}`};
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

const LendersPanel = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
`;

const LendersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const LenderCard = styled.div`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.sm};
  }
`;

const LenderName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const LenderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${theme.spacing.sm};
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};

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

const FinancingTab = ({ dealer }) => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [lenders] = useState([
    {
      id: 1,
      name: 'First National Bank',
      minRate: 3.49,
      maxRate: 7.99,
      maxTerm: 84,
      minCreditScore: 650,
      status: 'active',
    },
    {
      id: 2,
      name: 'Capital Auto Finance',
      minRate: 4.25,
      maxRate: 12.99,
      maxTerm: 72,
      minCreditScore: 580,
      status: 'active',
    },
    {
      id: 3,
      name: 'Credit Union Motors',
      minRate: 2.99,
      maxRate: 6.49,
      maxTerm: 60,
      minCreditScore: 700,
      status: 'active',
    },
    {
      id: 4,
      name: 'Quick Approval Loans',
      minRate: 8.99,
      maxRate: 18.99,
      maxTerm: 60,
      minCreditScore: 500,
      status: 'active',
    },
  ]);

  useEffect(() => {
    // Mock financing applications data
    const mockApplications = [
      {
        id: 'FA-001',
        applicationId: '24-FA-001',
        customerId: 1,
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        vehicleId: 1,
        vehicleName: '2024 BMW X5 M50i',
        vehiclePrice: 75000,
        downPayment: 15000,
        loanAmount: 60000,
        requestedTerm: 60,
        creditScore: 750,
        monthlyIncome: 8500,
        employmentYears: 5,
        applicationDate: '2024-02-15T10:30:00Z',
        status: 'under_review',
        lender: 'First National Bank',
        interestRate: 4.25,
        monthlyPayment: 1120,
        notes: 'Excellent credit, stable employment',
      },
      {
        id: 'FA-002',
        applicationId: '24-FA-002',
        customerId: 2,
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        vehicleId: 2,
        vehicleName: '2023 Tesla Model S Plaid',
        vehiclePrice: 120000,
        downPayment: 25000,
        loanAmount: 95000,
        requestedTerm: 72,
        creditScore: 680,
        monthlyIncome: 12000,
        employmentYears: 3,
        applicationDate: '2024-02-14T14:20:00Z',
        status: 'approved',
        lender: 'Capital Auto Finance',
        interestRate: 5.75,
        monthlyPayment: 1580,
        notes: 'Approved with standard terms',
      },
      {
        id: 'FA-003',
        applicationId: '24-FA-003',
        customerId: 3,
        customerName: 'Michael Brown',
        customerEmail: 'm.brown@email.com',
        vehicleId: 3,
        vehicleName: '2024 Ford F-150 Lightning',
        vehiclePrice: 65000,
        downPayment: 10000,
        loanAmount: 55000,
        requestedTerm: 60,
        creditScore: 720,
        monthlyIncome: 9500,
        employmentYears: 8,
        applicationDate: '2024-02-13T09:15:00Z',
        status: 'conditional',
        lender: 'Credit Union Motors',
        interestRate: 3.99,
        monthlyPayment: 1015,
        notes: 'Conditional approval - needs updated pay stubs',
      },
      {
        id: 'FA-004',
        applicationId: '24-FA-004',
        customerId: 4,
        customerName: 'Emily Davis',
        customerEmail: 'emily.davis@email.com',
        vehicleId: 4,
        vehicleName: '2023 Honda Civic Type R',
        vehiclePrice: 42000,
        downPayment: 5000,
        loanAmount: 37000,
        requestedTerm: 60,
        creditScore: 620,
        monthlyIncome: 4800,
        employmentYears: 2,
        applicationDate: '2024-02-12T16:45:00Z',
        status: 'pending',
        lender: null,
        interestRate: null,
        monthlyPayment: null,
        notes: 'Application submitted, awaiting credit check',
      },
      {
        id: 'FA-005',
        applicationId: '24-FA-005',
        customerId: 5,
        customerName: 'Robert Wilson',
        customerEmail: 'r.wilson@email.com',
        vehicleId: 5,
        vehicleName: '2024 Porsche 911 Turbo S',
        vehiclePrice: 230000,
        downPayment: 80000,
        loanAmount: 150000,
        requestedTerm: 84,
        creditScore: 580,
        monthlyIncome: 15000,
        employmentYears: 1,
        applicationDate: '2024-02-11T11:00:00Z',
        status: 'rejected',
        lender: 'First National Bank',
        interestRate: null,
        monthlyPayment: null,
        notes: 'Insufficient credit history, debt-to-income ratio too high',
      },
    ];

    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  useEffect(() => {
    let filtered = [...applications];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        app =>
          app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (app.lender &&
            app.lender.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusLabel = status => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'under_review':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'conditional':
        return 'Conditional';
      default:
        return status;
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    totalLoanAmount: applications
      .filter(a => a.status === 'approved')
      .reduce((sum, a) => sum + a.loanAmount, 0),
    avgCreditScore:
      applications.length > 0
        ? Math.round(
            applications.reduce((sum, a) => sum + a.creditScore, 0) /
              applications.length
          )
        : 0,
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Title>
            <FaDollarSign />
            Financing & Loans ({filteredApplications.length})
          </Title>
          <HeaderActions>
            <ActionButton>
              <FaDownload />
              Export Applications
            </ActionButton>
            <ActionButton>
              <FaCalculator />
              Loan Calculator
            </ActionButton>
            <ActionButton primary>
              <FaPlus />
              New Application
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
              placeholder="Search applications by ID, customer, vehicle, or lender..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSelect
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="conditional">Conditional</option>
            <option value="rejected">Rejected</option>
          </FilterSelect>

          <FilterSelect defaultValue="recent">
            <option value="recent">Recent First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount">Highest Amount</option>
            <option value="credit">Best Credit</option>
          </FilterSelect>

          <FilterSelect defaultValue="all">
            <option value="all">All Lenders</option>
            <option value="first-national">First National Bank</option>
            <option value="capital-auto">Capital Auto Finance</option>
            <option value="credit-union">Credit Union Motors</option>
            <option value="quick-approval">Quick Approval Loans</option>
          </FilterSelect>
        </FiltersRow>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Applications</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.warning}>{stats.pending}</StatValue>
          <StatLabel>Pending Review</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{stats.approved}</StatValue>
          <StatLabel>Approved</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.error}>{stats.rejected}</StatValue>
          <StatLabel>Rejected</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.info}>
            {formatCurrency(stats.totalLoanAmount)}
          </StatValue>
          <StatLabel>Total Financed</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>
            {stats.avgCreditScore}
          </StatValue>
          <StatLabel>Avg Credit Score</StatLabel>
        </StatCard>
      </StatsGrid>

      <ContentGrid>
        <ApplicationsList>
          <ApplicationsHeader>
            <SectionTitle>
              <FaFileContract />
              Financing Applications
            </SectionTitle>
          </ApplicationsHeader>

          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => (
              <ApplicationItem key={application.id}>
                <ApplicationHeader>
                  <ApplicationInfo>
                    <ApplicationId>#{application.applicationId}</ApplicationId>
                    <CustomerName>
                      <FaUser
                        style={{ marginRight: '6px', fontSize: '0.8rem' }}
                      />
                      {application.customerName}
                    </CustomerName>
                    <ApplicationDate>
                      <FaCalendar
                        style={{ marginRight: '4px', fontSize: '0.7rem' }}
                      />
                      Applied {formatDate(application.applicationDate)}
                    </ApplicationDate>
                  </ApplicationInfo>
                  <StatusBadge status={application.status}>
                    {getStatusLabel(application.status)}
                  </StatusBadge>
                </ApplicationHeader>

                <ApplicationDetails>
                  <DetailItem>
                    <DetailValue>{application.vehicleName}</DetailValue>
                    <DetailLabel>Vehicle</DetailLabel>
                  </DetailItem>
                  <DetailItem>
                    <DetailValue>
                      {formatCurrency(application.loanAmount)}
                    </DetailValue>
                    <DetailLabel>Loan Amount</DetailLabel>
                  </DetailItem>
                  <DetailItem>
                    <DetailValue>
                      {application.requestedTerm} months
                    </DetailValue>
                    <DetailLabel>Term</DetailLabel>
                  </DetailItem>
                  <DetailItem>
                    <DetailValue>{application.creditScore}</DetailValue>
                    <DetailLabel>Credit Score</DetailLabel>
                  </DetailItem>
                  {application.interestRate && (
                    <DetailItem>
                      <DetailValue>{application.interestRate}%</DetailValue>
                      <DetailLabel>Interest Rate</DetailLabel>
                    </DetailItem>
                  )}
                  {application.monthlyPayment && (
                    <DetailItem>
                      <DetailValue>
                        {formatCurrency(application.monthlyPayment)}
                      </DetailValue>
                      <DetailLabel>Monthly Payment</DetailLabel>
                    </DetailItem>
                  )}
                </ApplicationDetails>

                {application.lender && (
                  <div
                    style={{
                      marginBottom: theme.spacing.md,
                      fontSize: '0.9rem',
                      color: theme.colors.gray600,
                    }}
                  >
                    <FaUniversity style={{ marginRight: '6px' }} />
                    Lender: {application.lender}
                  </div>
                )}

                {application.notes && (
                  <div
                    style={{
                      marginBottom: theme.spacing.md,
                      fontSize: '0.9rem',
                      color: theme.colors.gray600,
                      fontStyle: 'italic',
                    }}
                  >
                    Notes: {application.notes}
                  </div>
                )}

                <ActionButtons>
                  <ActionButtonSmall>
                    <FaEye />
                    View Details
                  </ActionButtonSmall>
                  <ActionButtonSmall>
                    <FaEdit />
                    Edit
                  </ActionButtonSmall>
                  {application.status === 'pending' && (
                    <>
                      <ActionButtonSmall variant="approve">
                        <FaCheck />
                        Approve
                      </ActionButtonSmall>
                      <ActionButtonSmall variant="reject">
                        <FaTimes />
                        Reject
                      </ActionButtonSmall>
                    </>
                  )}
                  {application.status === 'approved' && (
                    <ActionButtonSmall>
                      <FaPrint />
                      Print Contract
                    </ActionButtonSmall>
                  )}
                </ActionButtons>
              </ApplicationItem>
            ))
          ) : (
            <EmptyState>
              <FaFileContract className="icon" />
              <h3>No financing applications found</h3>
              <p>
                Try adjusting your search criteria or create a new financing
                application.
              </p>
            </EmptyState>
          )}
        </ApplicationsList>

        <LendersPanel>
          <SectionTitle>
            <FaUniversity />
            Partner Lenders
          </SectionTitle>

          <LendersList>
            {lenders.map(lender => (
              <LenderCard key={lender.id}>
                <LenderName>{lender.name}</LenderName>
                <LenderDetails>
                  <div>
                    Rate: {lender.minRate}% - {lender.maxRate}%
                  </div>
                  <div>Max Term: {lender.maxTerm} mo</div>
                  <div>Min Credit: {lender.minCreditScore}</div>
                  <div>
                    Status:{' '}
                    <span
                      style={{ color: theme.colors.success, fontWeight: 600 }}
                    >
                      {lender.status}
                    </span>
                  </div>
                </LenderDetails>
              </LenderCard>
            ))}
          </LendersList>
        </LendersPanel>
      </ContentGrid>
    </Container>
  );
};

export default FinancingTab;
