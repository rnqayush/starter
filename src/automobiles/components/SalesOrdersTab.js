import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaShoppingCart,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTimes,
  FaCalendar,
  FaPrint,
  FaDownload,
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

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
  color: ${(props) => props.color || theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const OrdersTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${theme.colors.gray50};
  border-bottom: 2px solid ${theme.colors.gray200};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray200};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const TableHeaderCell = styled.th`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-align: left;
  font-weight: 600;
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
  vertical-align: middle;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const OrderId = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const OrderDate = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const CustomerContact = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const VehicleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const VehicleImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const VehicleDetails = styled.div``;

const VehicleName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VehicleSpec = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
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
      case "confirmed": return theme.colors.info;
      case "processing": return theme.colors.purple || "#8b5cf6";
      case "shipped": return theme.colors.primary;
      case "delivered": return theme.colors.success;
      case "cancelled": return theme.colors.error;
      default: return theme.colors.gray500;
    }
  }};
`;

const PriceCell = styled.div`
  font-weight: 700;
  color: ${theme.colors.gray900};
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButtonSmall = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${theme.colors.gray500};

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }

  &.edit:hover {
    color: ${theme.colors.warning};
  }

  &.delete:hover {
    color: ${theme.colors.error};
  }

  &.print:hover {
    color: ${theme.colors.info};
  }
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

const SalesOrdersTab = ({ dealer }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    // Mock orders data - in real app, fetch from API
    const mockOrders = [
      {
        id: "ORD-001",
        orderNumber: "24001",
        customerId: 1,
        customerName: "John Smith",
        customerEmail: "john.smith@email.com",
        customerPhone: "(555) 123-4567",
        vehicleId: 1,
        vehicleName: "2024 BMW X5 M50i",
        vehicleImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
        vehiclePrice: 75000,
        orderDate: "2024-02-15T10:30:00Z",
        status: "confirmed",
        paymentStatus: "paid",
        deliveryDate: "2024-03-01",
        notes: "Customer prefers early morning delivery",
        salesPerson: "Mike Johnson",
        commission: 3750,
      },
      {
        id: "ORD-002",
        orderNumber: "24002",
        customerId: 2,
        customerName: "Sarah Johnson",
        customerEmail: "sarah.j@email.com",
        customerPhone: "(555) 234-5678",
        vehicleId: 2,
        vehicleName: "2023 Tesla Model S Plaid",
        vehicleImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop",
        vehiclePrice: 120000,
        orderDate: "2024-02-14T14:20:00Z",
        status: "processing",
        paymentStatus: "pending",
        deliveryDate: "2024-03-15",
        notes: "Financing application in progress",
        salesPerson: "Lisa Chen",
        commission: 6000,
      },
      {
        id: "ORD-003",
        orderNumber: "24003",
        customerId: 3,
        customerName: "Michael Brown",
        customerEmail: "m.brown@email.com",
        customerPhone: "(555) 345-6789",
        vehicleId: 3,
        vehicleName: "2024 Ford F-150 Lightning",
        vehicleImage: "https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=300&h=200&fit=crop",
        vehiclePrice: 65000,
        orderDate: "2024-02-13T09:15:00Z",
        status: "shipped",
        paymentStatus: "paid",
        deliveryDate: "2024-02-20",
        notes: "Fleet purchase - 3 units",
        salesPerson: "David Wilson",
        commission: 3250,
      },
      {
        id: "ORD-004",
        orderNumber: "24004",
        customerId: 4,
        customerName: "Emily Davis",
        customerEmail: "emily.davis@email.com",
        customerPhone: "(555) 456-7890",
        vehicleId: 4,
        vehicleName: "2023 Honda Civic Type R",
        vehicleImage: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=300&h=200&fit=crop",
        vehiclePrice: 42000,
        orderDate: "2024-02-12T16:45:00Z",
        status: "delivered",
        paymentStatus: "paid",
        deliveryDate: "2024-02-18",
        notes: "First-time buyer discount applied",
        salesPerson: "Jennifer Lee",
        commission: 2100,
      },
      {
        id: "ORD-005",
        orderNumber: "24005",
        customerId: 5,
        customerName: "Robert Wilson",
        customerEmail: "r.wilson@email.com",
        customerPhone: "(555) 567-8901",
        vehicleId: 5,
        vehicleName: "2024 Porsche 911 Turbo S",
        vehicleImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
        vehiclePrice: 230000,
        orderDate: "2024-02-11T11:00:00Z",
        status: "pending",
        paymentStatus: "deposit",
        deliveryDate: "2024-04-01",
        notes: "Special order - custom configuration",
        salesPerson: "Alex Rodriguez",
        commission: 11500,
      },
      {
        id: "ORD-006",
        orderNumber: "24006",
        customerId: 6,
        customerName: "Lisa Anderson",
        customerEmail: "lisa.anderson@email.com",
        customerPhone: "(555) 678-9012",
        vehicleId: 6,
        vehicleName: "2023 Volvo XC90 Recharge",
        vehicleImage: "https://images.unsplash.com/photo-1606016872875-84d1177d27bb?w=300&h=200&fit=crop",
        vehiclePrice: 68000,
        orderDate: "2024-02-10T13:30:00Z",
        status: "cancelled",
        paymentStatus: "refunded",
        deliveryDate: null,
        notes: "Customer changed mind - full refund processed",
        salesPerson: "Mark Thompson",
        commission: 0,
      },
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.salesPerson.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date filter
    if (dateFilter) {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(order => 
            new Date(order.orderDate) >= filterDate
          );
          break;
        case "week":
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(order => 
            new Date(order.orderDate) >= filterDate
          );
          break;
        case "month":
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(order => 
            new Date(order.orderDate) >= filterDate
          );
          break;
      }
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, searchTerm, statusFilter, dateFilter]);

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
      case "pending": return "Pending";
      case "confirmed": return "Confirmed";
      case "processing": return "Processing";
      case "shipped": return "Shipped";
      case "delivered": return "Delivered";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
    totalRevenue: orders.filter(o => o.paymentStatus === "paid").reduce((sum, o) => sum + o.vehiclePrice, 0),
    totalCommission: orders.filter(o => o.paymentStatus === "paid").reduce((sum, o) => sum + o.commission, 0),
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Title>
            <FaShoppingCart />
            Sales & Orders ({filteredOrders.length})
          </Title>
          <HeaderActions>
            <ActionButton>
              <FaDownload />
              Export Orders
            </ActionButton>
            <ActionButton primary>
              <FaPlus />
              New Order
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
              placeholder="Search orders by number, customer, vehicle, or salesperson..."
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
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </FilterSelect>

          <FilterSelect
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </FilterSelect>

          <FilterSelect defaultValue="recent">
            <option value="recent">Recent First</option>
            <option value="oldest">Oldest First</option>
            <option value="value">Highest Value</option>
            <option value="customer">Customer A-Z</option>
          </FilterSelect>
        </FiltersRow>
      </Header>

      <StatsRow>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.warning}>{stats.pending}</StatValue>
          <StatLabel>Pending</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{stats.delivered}</StatValue>
          <StatLabel>Delivered</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.error}>{stats.cancelled}</StatValue>
          <StatLabel>Cancelled</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.success}>{formatCurrency(stats.totalRevenue)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue color={theme.colors.info}>{formatCurrency(stats.totalCommission)}</StatValue>
          <StatLabel>Total Commission</StatLabel>
        </StatCard>
      </StatsRow>

      <OrdersTable>
        {currentOrders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Order</TableHeaderCell>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Vehicle</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Sales Person</TableHeaderCell>
                <TableHeaderCell>Delivery</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <OrderInfo>
                      <OrderId>#{order.orderNumber}</OrderId>
                      <OrderDate>
                        <FaCalendar style={{ marginRight: '4px', fontSize: '0.7rem' }} />
                        {formatDate(order.orderDate)}
                      </OrderDate>
                    </OrderInfo>
                  </TableCell>
                  <TableCell>
                    <CustomerInfo>
                      <CustomerName>{order.customerName}</CustomerName>
                      <CustomerContact>{order.customerEmail}</CustomerContact>
                      <CustomerContact>{order.customerPhone}</CustomerContact>
                    </CustomerInfo>
                  </TableCell>
                  <TableCell>
                    <VehicleInfo>
                      <VehicleImage src={order.vehicleImage} alt={order.vehicleName} />
                      <VehicleDetails>
                        <VehicleName>{order.vehicleName}</VehicleName>
                        <VehicleSpec>
                          Commission: {formatCurrency(order.commission)}
                        </VehicleSpec>
                      </VehicleDetails>
                    </VehicleInfo>
                  </TableCell>
                  <TableCell>
                    <PriceCell>{formatCurrency(order.vehiclePrice)}</PriceCell>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status}>
                      {getStatusLabel(order.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{order.salesPerson}</TableCell>
                  <TableCell>
                    {order.deliveryDate ? formatDate(order.deliveryDate) : "TBD"}
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButtonSmall title="View Details">
                        <FaEye />
                      </ActionButtonSmall>
                      <ActionButtonSmall className="edit" title="Edit Order">
                        <FaEdit />
                      </ActionButtonSmall>
                      <ActionButtonSmall className="print" title="Print Invoice">
                        <FaPrint />
                      </ActionButtonSmall>
                      <ActionButtonSmall className="delete" title="Cancel Order">
                        <FaTimes />
                      </ActionButtonSmall>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            <FaShoppingCart className="icon" />
            <h3>No orders found</h3>
            <p>Try adjusting your search criteria or create a new order.</p>
          </EmptyState>
        )}
      </OrdersTable>

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
            Page {currentPage} of {totalPages} ({filteredOrders.length} orders)
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

export default SalesOrdersTab;
