import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaDownload,
  FaTruck,
  FaCheck,
  FaClock,
  FaTimes,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { sellerOrders } from '../data/sellerData';

const OrdersContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  overflow: hidden;
`;

const OrdersHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: between;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  flex: 1;
  min-width: 200px;
`;

const HeaderTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  position: relative;
  min-width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}
    ${theme.spacing.xxl};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 0.9rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray400};
  }
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

const OrdersTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${theme.colors.gray50};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray200};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const TableHeaderCell = styled.th`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 0.9rem;
  color: ${theme.colors.gray900};
  vertical-align: middle;
`;

const OrderId = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: ${theme.colors.primary};
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CustomerName = styled.span`
  font-weight: 500;
  color: ${theme.colors.gray900};
`;

const CustomerEmail = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  max-width: 200px;
`;

const ProductItem = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.gray700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TotalAmount = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 1rem;
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: prop => prop !== 'status',
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  width: fit-content;

  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'shipped':
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
        `;
      case 'processing':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'pending':
        return `
          background: ${theme.colors.gray200};
          color: ${theme.colors.gray600};
        `;
      case 'cancelled':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      default:
        return `
          background: ${theme.colors.gray200};
          color: ${theme.colors.gray600};
        `;
    }
  }}
`;

const PaymentBadge = styled.span.withConfig({
  shouldForwardProp: prop => prop !== 'status',
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => {
    switch (props.status) {
      case 'paid':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'pending':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'refunded':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      default:
        return `
          background: ${theme.colors.gray200};
          color: ${theme.colors.gray600};
        `;
    }
  }}
`;

const OrderDate = styled.span`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.white};
  color: ${theme.colors.gray600};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const FilterTab = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => (props.active ? theme.colors.primary : 'transparent')};
  color: ${props => (props.active ? theme.colors.white : theme.colors.gray600)};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.active ? theme.colors.primaryDark : theme.colors.gray200};
  }
`;

const OrdersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders] = useState(sellerOrders);

  const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <FaCheck />;
      case 'shipped':
        return <FaTruck />;
      case 'processing':
        return <FaClock />;
      case 'pending':
        return <FaClock />;
      case 'cancelled':
        return <FaTimes />;
      default:
        return <FaClock />;
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getPaymentText = status => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'refunded':
        return 'Refunded';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <OrdersContainer>
      <OrdersHeader>
        <HeaderLeft>
          <HeaderTitle>Orders</HeaderTitle>
          <HeaderSubtitle>Track and manage customer orders</HeaderSubtitle>
        </HeaderLeft>

        <HeaderActions>
          <SearchBox>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <FilterButton>
            <FaFilter />
            Filter
          </FilterButton>

          <ExportButton>
            <FaDownload />
            Export
          </ExportButton>
        </HeaderActions>
      </OrdersHeader>

      <FilterTabs>
        <FilterTab
          active={statusFilter === 'all'}
          onClick={() => setStatusFilter('all')}
        >
          All ({statusCounts.all})
        </FilterTab>
        <FilterTab
          active={statusFilter === 'pending'}
          onClick={() => setStatusFilter('pending')}
        >
          Pending ({statusCounts.pending})
        </FilterTab>
        <FilterTab
          active={statusFilter === 'processing'}
          onClick={() => setStatusFilter('processing')}
        >
          Processing ({statusCounts.processing})
        </FilterTab>
        <FilterTab
          active={statusFilter === 'shipped'}
          onClick={() => setStatusFilter('shipped')}
        >
          Shipped ({statusCounts.shipped})
        </FilterTab>
        <FilterTab
          active={statusFilter === 'completed'}
          onClick={() => setStatusFilter('completed')}
        >
          Completed ({statusCounts.completed})
        </FilterTab>
        <FilterTab
          active={statusFilter === 'cancelled'}
          onClick={() => setStatusFilter('cancelled')}
        >
          Cancelled ({statusCounts.cancelled})
        </FilterTab>
      </FilterTabs>

      <OrdersTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Order ID</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Products</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Payment</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>
                  <OrderId>{order.id}</OrderId>
                </TableCell>
                <TableCell>
                  <CustomerInfo>
                    <CustomerName>{order.customerName}</CustomerName>
                    <CustomerEmail>{order.customerEmail}</CustomerEmail>
                  </CustomerInfo>
                </TableCell>
                <TableCell>
                  <ProductsList>
                    {order.products.map((product, index) => (
                      <ProductItem key={index}>
                        {product.quantity}x {product.name}
                      </ProductItem>
                    ))}
                  </ProductsList>
                </TableCell>
                <TableCell>
                  <TotalAmount>{formatCurrency(order.total)}</TotalAmount>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status}>
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <PaymentBadge status={order.paymentStatus}>
                    {getPaymentText(order.paymentStatus)}
                  </PaymentBadge>
                </TableCell>
                <TableCell>
                  <OrderDate>{formatDate(order.orderDate)}</OrderDate>
                </TableCell>
                <TableCell>
                  <ActionButton title="View Order Details">
                    <FaEye />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </OrdersTable>
    </OrdersContainer>
  );
};

export default OrdersTab;
