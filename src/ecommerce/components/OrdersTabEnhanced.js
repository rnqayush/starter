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
  FaPrint,
  FaFileInvoiceDollar,
  FaShippingFast,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Modal from './shared/Modal';
import FormField from './shared/FormField';
import Button from './shared/Button';
import { sellerDashboardData } from '../../DummyData';
const { sellerOrders } = sellerDashboardData;

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

const FilterTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  overflow-x: auto;
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
  white-space: nowrap;

  &:hover {
    background: ${props =>
      props.active ? theme.colors.primaryDark : theme.colors.gray200};
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

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
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

const OrderDetailsModal = styled.div`
  max-height: 70vh;
  overflow-y: auto;
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const DetailTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.lg} 0;
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const DetailLabel = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${theme.spacing.xs};
`;

const DetailValue = styled.span`
  display: block;
  font-size: 0.9rem;
  color: ${theme.colors.gray900};
`;

const StatusUpdateForm = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: end;
  margin-top: ${theme.spacing.lg};
`;

const OrdersTabEnhanced = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState(sellerOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({
    trackingNumber: '',
    carrier: 'ups',
    notes: '',
  });

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

  const handleViewOrder = order => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleAddTracking = () => {
    if (selectedOrder && trackingInfo.trackingNumber) {
      setOrders(
        orders.map(order =>
          order.id === selectedOrder.id
            ? {
                ...order,
                status: 'shipped',
                trackingNumber: trackingInfo.trackingNumber,
                carrier: trackingInfo.carrier,
                trackingNotes: trackingInfo.notes,
              }
            : order
        )
      );
      setTrackingInfo({ trackingNumber: '', carrier: 'ups', notes: '' });
      alert('Tracking information added successfully!');
    }
  };

  const handlePrintInvoice = order => {
    alert(`Printing invoice for order ${order.id}`);
  };

  const handleExportOrders = () => {
    const csv = [
      ['Order ID', 'Customer', 'Total', 'Status', 'Date'].join(','),
      ...filteredOrders.map(order =>
        [
          order.id,
          order.customerName,
          order.total,
          order.status,
          order.orderDate,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
  };

  const orderDetailsFooter = (
    <>
      <Button variant="ghost" onClick={() => setShowOrderModal(false)}>
        Close
      </Button>
      <Button
        variant="outline"
        onClick={() => handlePrintInvoice(selectedOrder)}
      >
        <FaPrint />
        Print Invoice
      </Button>
    </>
  );

  return (
    <>
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

            <Button variant="outline" onClick={() => {}}>
              <FaFilter />
              Filter
            </Button>

            <Button variant="primary" onClick={handleExportOrders}>
              <FaDownload />
              Export
            </Button>
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
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton onClick={() => handleViewOrder(order)}>
                        <FaEye />
                      </ActionButton>
                      <ActionButton onClick={() => handlePrintInvoice(order)}>
                        <FaFileInvoiceDollar />
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </OrdersTable>
      </OrdersContainer>

      {/* Order Details Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title={`Order Details - ${selectedOrder?.id}`}
        footer={orderDetailsFooter}
        size="lg"
      >
        {selectedOrder && (
          <OrderDetailsModal>
            <DetailSection>
              <DetailTitle>Order Information</DetailTitle>
              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Order ID</DetailLabel>
                  <DetailValue>{selectedOrder.id}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Order Date</DetailLabel>
                  <DetailValue>
                    {formatDate(selectedOrder.orderDate)}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Order Status</DetailLabel>
                  <DetailValue>
                    <StatusBadge status={selectedOrder.status}>
                      {getStatusIcon(selectedOrder.status)}
                      {getStatusText(selectedOrder.status)}
                    </StatusBadge>
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Payment Status</DetailLabel>
                  <DetailValue>{selectedOrder.paymentStatus}</DetailValue>
                </DetailItem>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailTitle>Customer Information</DetailTitle>
              <DetailGrid>
                <DetailItem>
                  <DetailLabel>Customer Name</DetailLabel>
                  <DetailValue>{selectedOrder.customerName}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Email</DetailLabel>
                  <DetailValue>{selectedOrder.customerEmail}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Shipping Address</DetailLabel>
                  <DetailValue>{selectedOrder.shippingAddress}</DetailValue>
                </DetailItem>
              </DetailGrid>
            </DetailSection>

            <DetailSection>
              <DetailTitle>Order Items</DetailTitle>
              {selectedOrder.products.map((product, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.gray200}`,
                    borderRadius: theme.borderRadius.md,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <span>
                    {product.quantity}x {product.name}
                  </span>
                  <span>
                    {formatCurrency(product.price * product.quantity)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'between',
                  alignItems: 'center',
                  padding: theme.spacing.lg,
                  background: theme.colors.gray50,
                  borderRadius: theme.borderRadius.md,
                  fontWeight: '600',
                  fontSize: '1.1rem',
                }}
              >
                <span>Total</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </DetailSection>

            <DetailSection>
              <DetailTitle>Update Order Status</DetailTitle>
              <StatusUpdateForm>
                <FormField
                  label="Change Status"
                  type="select"
                  value={selectedOrder.status}
                  onChange={e =>
                    handleUpdateStatus(selectedOrder.id, e.target.value)
                  }
                  options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'processing', label: 'Processing' },
                    { value: 'shipped', label: 'Shipped' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'cancelled', label: 'Cancelled' },
                  ]}
                />
                <Button variant="primary">Update Status</Button>
              </StatusUpdateForm>
            </DetailSection>

            {selectedOrder.status !== 'shipped' &&
              selectedOrder.status !== 'completed' && (
                <DetailSection>
                  <DetailTitle>Add Tracking Information</DetailTitle>
                  <FormField
                    label="Tracking Number"
                    value={trackingInfo.trackingNumber}
                    onChange={e =>
                      setTrackingInfo(prev => ({
                        ...prev,
                        trackingNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter tracking number"
                  />
                  <DetailGrid>
                    <FormField
                      label="Carrier"
                      type="select"
                      value={trackingInfo.carrier}
                      onChange={e =>
                        setTrackingInfo(prev => ({
                          ...prev,
                          carrier: e.target.value,
                        }))
                      }
                      options={[
                        { value: 'ups', label: 'UPS' },
                        { value: 'fedex', label: 'FedEx' },
                        { value: 'usps', label: 'USPS' },
                        { value: 'dhl', label: 'DHL' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                      <Button
                        variant="primary"
                        onClick={handleAddTracking}
                        fullWidth
                      >
                        <FaShippingFast />
                        Add Tracking
                      </Button>
                    </div>
                  </DetailGrid>
                </DetailSection>
              )}
          </OrderDetailsModal>
        )}
      </Modal>
    </>
  );
};

export default OrdersTabEnhanced;
