import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaUserPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaCar,
  FaDollarSign,
  FaCalendar,
  FaStar,
  FaMapMarkerAlt,
  FaDownload,
  FaSort,
  FaChevronLeft,
  FaChevronRight,
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

const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ExportButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
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

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CustomersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.lg};
  }
`;

const CustomerCard = styled.div`
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

const CustomerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const CustomerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-weight: 600;
  font-size: 1.2rem;
  margin-right: ${theme.spacing.md};
  flex-shrink: 0;
`;

const CustomerInfo = styled.div`
  flex: 1;
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 1.1rem;
  margin-bottom: ${theme.spacing.xs};
`;

const CustomerEmail = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.xs};
`;

const CustomerPhone = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const CustomerRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.8rem;
  color: ${theme.colors.warning};
  margin-left: auto;
`;

const CustomerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const CustomerStatItem = styled.div`
  text-align: center;
`;

const CustomerStatValue = styled.div`
  font-weight: 700;
  color: ${theme.colors.primary};
  font-size: 1.1rem;
  margin-bottom: ${theme.spacing.xs};
`;

const CustomerStatLabel = styled.div`
  font-size: 0.7rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CustomerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.gray300};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${theme.colors.gray600};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  &.primary {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};

    &:hover {
      background: ${theme.colors.primaryDark};
    }
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
`;

const PaginationButton = styled.button`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray300};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const CustomersTab = ({ dealer }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 12;

  useEffect(() => {
    // Mock customer data - in real app, fetch from API
    const mockCustomers = [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "(555) 123-4567",
        location: "New York, NY",
        joinDate: "2023-01-15",
        totalPurchases: 2,
        totalSpent: 85000,
        lastPurchase: "2024-01-10",
        rating: 4.8,
        status: "VIP",
        notes: "Prefers luxury vehicles, excellent payment history",
        vehicles: ["2022 BMW X5", "2024 Tesla Model S"],
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "(555) 234-5678",
        location: "Los Angeles, CA",
        joinDate: "2023-03-22",
        totalPurchases: 1,
        totalSpent: 45000,
        lastPurchase: "2023-11-20",
        rating: 4.5,
        status: "Regular",
        notes: "First-time buyer, interested in eco-friendly options",
        vehicles: ["2023 Toyota Prius"],
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "m.brown@email.com",
        phone: "(555) 345-6789",
        location: "Chicago, IL",
        joinDate: "2022-08-10",
        totalPurchases: 3,
        totalSpent: 125000,
        lastPurchase: "2024-02-05",
        rating: 4.9,
        status: "VIP",
        notes: "Fleet buyer for business, prefers trucks and SUVs",
        vehicles: ["2022 Ford F-150", "2023 Chevy Tahoe", "2024 GMC Sierra"],
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "(555) 456-7890",
        location: "Miami, FL",
        joinDate: "2023-06-12",
        totalPurchases: 1,
        totalSpent: 32000,
        lastPurchase: "2023-06-12",
        rating: 4.2,
        status: "New",
        notes: "Young professional, budget-conscious",
        vehicles: ["2021 Honda Civic"],
      },
      {
        id: 5,
        name: "Robert Wilson",
        email: "r.wilson@email.com",
        phone: "(555) 567-8901",
        location: "Dallas, TX",
        joinDate: "2022-12-03",
        totalPurchases: 2,
        totalSpent: 95000,
        lastPurchase: "2023-12-15",
        rating: 4.7,
        status: "VIP",
        notes: "Enthusiast collector, prefers classic and sports cars",
        vehicles: ["2023 Porsche 911", "2022 Mustang GT"],
      },
      {
        id: 6,
        name: "Lisa Anderson",
        email: "lisa.anderson@email.com",
        phone: "(555) 678-9012",
        location: "Seattle, WA",
        joinDate: "2023-09-18",
        totalPurchases: 1,
        totalSpent: 58000,
        lastPurchase: "2023-09-18",
        rating: 4.6,
        status: "Regular",
        notes: "Family-oriented, safety is top priority",
        vehicles: ["2023 Volvo XC90"],
      },
    ];

    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  useEffect(() => {
    let filtered = [...customers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (filterBy) {
      filtered = filtered.filter(customer => customer.status === filterBy);
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [customers, searchTerm, filterBy]);

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

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const stats = {
    total: customers.length,
    vip: customers.filter(c => c.status === "VIP").length,
    regular: customers.filter(c => c.status === "Regular").length,
    new: customers.filter(c => c.status === "New").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgSpending: customers.length > 0 ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0,
  };

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleExportCustomers = () => {
    // Mock export functionality
    const csvContent = [
      ["Name", "Email", "Phone", "Total Purchases", "Total Spent", "Status", "Join Date"],
      ...customers.map(customer => [
        customer.name,
        customer.email,
        customer.phone,
        customer.totalPurchases,
        customer.totalSpent,
        customer.status,
        customer.joinDate,
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Title>
            <FaUsers />
            Customer Management ({filteredCustomers.length})
          </Title>
          <HeaderActions>
            <ExportButton onClick={handleExportCustomers}>
              <FaDownload />
              Export
            </ExportButton>
            <AddButton>
              <FaUserPlus />
              Add Customer
            </AddButton>
          </HeaderActions>
        </HeaderTop>

        <FiltersRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSelect
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="">All Customers</option>
            <option value="VIP">VIP Customers</option>
            <option value="Regular">Regular Customers</option>
            <option value="New">New Customers</option>
          </FilterSelect>

          <FilterSelect defaultValue="recent">
            <option value="recent">Recent First</option>
            <option value="spending">High Spending</option>
            <option value="purchases">Most Purchases</option>
            <option value="rating">Highest Rated</option>
          </FilterSelect>
        </FiltersRow>
      </Header>

      <StatsRow>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Customers</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.vip}</StatValue>
          <StatLabel>VIP Customers</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.new}</StatValue>
          <StatLabel>New This Month</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatCurrency(stats.totalRevenue)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatCurrency(stats.avgSpending)}</StatValue>
          <StatLabel>Avg. Spending</StatLabel>
        </StatCard>
      </StatsRow>

      <CustomersGrid>
        {currentCustomers.length > 0 ? (
          currentCustomers.map((customer) => (
            <CustomerCard key={customer.id}>
              <CustomerHeader>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <CustomerAvatar>
                    {getInitials(customer.name)}
                  </CustomerAvatar>
                  <CustomerInfo>
                    <CustomerName>{customer.name}</CustomerName>
                    <CustomerEmail>
                      <FaEnvelope style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                      {customer.email}
                    </CustomerEmail>
                    <CustomerPhone>
                      <FaPhone style={{ marginRight: '6px', fontSize: '0.8rem' }} />
                      {customer.phone}
                    </CustomerPhone>
                  </CustomerInfo>
                </div>
                <CustomerRating>
                  <FaStar />
                  {customer.rating}
                </CustomerRating>
              </CustomerHeader>

              <CustomerStats>
                <CustomerStatItem>
                  <CustomerStatValue>{customer.totalPurchases}</CustomerStatValue>
                  <CustomerStatLabel>Purchases</CustomerStatLabel>
                </CustomerStatItem>
                <CustomerStatItem>
                  <CustomerStatValue>{formatCurrency(customer.totalSpent)}</CustomerStatValue>
                  <CustomerStatLabel>Total Spent</CustomerStatLabel>
                </CustomerStatItem>
                <CustomerStatItem>
                  <CustomerStatValue>{customer.status}</CustomerStatValue>
                  <CustomerStatLabel>Status</CustomerStatLabel>
                </CustomerStatItem>
              </CustomerStats>

              <CustomerMeta>
                <div>
                  <FaMapMarkerAlt style={{ marginRight: '4px' }} />
                  {customer.location}
                </div>
                <div>
                  <FaCalendar style={{ marginRight: '4px' }} />
                  Joined {formatDate(customer.joinDate)}
                </div>
              </CustomerMeta>

              <ActionButtons>
                <ActionButton className="primary">
                  <FaEye />
                  View Profile
                </ActionButton>
                <ActionButton>
                  <FaPhone />
                  Call
                </ActionButton>
                <ActionButton>
                  <FaEnvelope />
                  Email
                </ActionButton>
                <ActionButton>
                  <FaEdit />
                  Edit
                </ActionButton>
              </ActionButtons>
            </CustomerCard>
          ))
        ) : (
          <EmptyState>
            <FaUsers className="icon" />
            <h3>No customers found</h3>
            <p>Try adjusting your search criteria or add new customers to your database.</p>
          </EmptyState>
        )}
      </CustomersGrid>

      {totalPages > 1 && (
        <Pagination>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
            Previous
          </PaginationButton>
          
          <PaginationInfo>
            Page {currentPage} of {totalPages} ({filteredCustomers.length} customers)
          </PaginationInfo>
          
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <FaChevronRight />
          </PaginationButton>
        </Pagination>
      )}
    </Container>
  );
};

export default CustomersTab;
