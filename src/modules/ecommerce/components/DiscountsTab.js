import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCopy,
  FaToggleOn,
  FaToggleOff,
  FaPercent,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers,
} from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import Modal from './shared/Modal';
import FormField from './shared/FormField';
import { Button } from '../../components/shared/Button';

const DiscountsContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  overflow: hidden;
`;

const DiscountsHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: between;
  gap: ${theme.spacing.lg};
`;

const HeaderLeft = styled.div`
  flex: 1;
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

const DiscountsList = styled.div`
  padding: ${theme.spacing.lg};
`;

const DiscountCard = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.gray300};
    box-shadow: ${theme.shadows.sm};
  }
`;

const DiscountHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: between;
  margin-bottom: ${theme.spacing.lg};
`;

const DiscountInfo = styled.div`
  flex: 1;
`;

const DiscountCode = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const CopyButton = styled.button`
  background: ${theme.colors.gray100};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray200};
    color: ${theme.colors.gray700};
  }
`;

const DiscountDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const DiscountActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const StatusToggle = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'isActive',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${props =>
    props.isActive ? theme.colors.success : theme.colors.gray400};
  color: ${theme.colors.white};

  &:hover {
    opacity: 0.9;
  }
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

  &.danger:hover {
    border-color: ${theme.colors.error};
    color: ${theme.colors.error};
    background: ${theme.colors.error}10;
  }
`;

const DiscountDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const DetailIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

const DetailContent = styled.div``;

const DetailLabel = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  color: ${theme.colors.gray400};
  font-size: 2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DiscountsTab = () => {
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      code: 'WELCOME20',
      description: 'Welcome discount for new customers',
      type: 'percentage',
      value: 20,
      minOrderAmount: 50,
      maxUsagePerCustomer: 1,
      totalUsage: 245,
      maxUsage: 1000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
    },
    {
      id: 2,
      code: 'SAVE10',
      description: 'Fixed discount for orders above $100',
      type: 'fixed',
      value: 10,
      minOrderAmount: 100,
      maxUsagePerCustomer: 3,
      totalUsage: 89,
      maxUsage: 500,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      isActive: true,
    },
    {
      id: 3,
      code: 'EXPIRED50',
      description: 'Old promotional discount',
      type: 'percentage',
      value: 50,
      minOrderAmount: 0,
      maxUsagePerCustomer: 1,
      totalUsage: 156,
      maxUsage: 200,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      isActive: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage',
    value: '',
    minOrderAmount: '',
    maxUsagePerCustomer: '',
    maxUsage: '',
    startDate: '',
    endDate: '',
  });

  const handleAddDiscount = () => {
    setEditingDiscount(null);
    setFormData({
      code: '',
      description: '',
      type: 'percentage',
      value: '',
      minOrderAmount: '',
      maxUsagePerCustomer: '',
      maxUsage: '',
      startDate: '',
      endDate: '',
    });
    setShowModal(true);
  };

  const handleEditDiscount = discount => {
    setEditingDiscount(discount);
    setFormData({
      code: discount.code,
      description: discount.description,
      type: discount.type,
      value: discount.value.toString(),
      minOrderAmount: discount.minOrderAmount.toString(),
      maxUsagePerCustomer: discount.maxUsagePerCustomer.toString(),
      maxUsage: discount.maxUsage.toString(),
      startDate: discount.startDate,
      endDate: discount.endDate,
    });
    setShowModal(true);
  };

  const handleDeleteDiscount = discountId => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      setDiscounts(discounts.filter(d => d.id !== discountId));
    }
  };

  const handleToggleStatus = discountId => {
    setDiscounts(
      discounts.map(d =>
        d.id === discountId ? { ...d, isActive: !d.isActive } : d
      )
    );
  };

  const handleCopyCode = code => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const discountData = {
      ...formData,
      value: parseFloat(formData.value),
      minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
      maxUsagePerCustomer: parseInt(formData.maxUsagePerCustomer) || 1,
      maxUsage: parseInt(formData.maxUsage) || 1000,
    };

    if (editingDiscount) {
      setDiscounts(
        discounts.map(d =>
          d.id === editingDiscount.id ? { ...d, ...discountData } : d
        )
      );
    } else {
      const newDiscount = {
        id: Date.now(),
        ...discountData,
        totalUsage: 0,
        isActive: true,
      };
      setDiscounts([...discounts, newDiscount]);
    }

    setShowModal(false);
  };

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

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        {editingDiscount ? 'Update Discount' : 'Create Discount'}
      </Button>
    </>
  );

  return (
    <>
      <DiscountsContainer>
        <DiscountsHeader>
          <HeaderLeft>
            <HeaderTitle>Discounts & Coupons</HeaderTitle>
            <HeaderSubtitle>
              Create and manage discount codes for your customers
            </HeaderSubtitle>
          </HeaderLeft>

          <Button variant="primary" onClick={handleAddDiscount}>
            <FaPlus />
            Create Discount
          </Button>
        </DiscountsHeader>

        <DiscountsList>
          {discounts.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <FaPercent />
              </EmptyIcon>
              <h3>No discounts created yet</h3>
              <p>
                Create your first discount to start offering deals to your
                customers
              </p>
              <Button variant="primary" onClick={handleAddDiscount}>
                <FaPlus />
                Create Your First Discount
              </Button>
            </EmptyState>
          ) : (
            discounts.map(discount => (
              <DiscountCard key={discount.id}>
                <DiscountHeader>
                  <DiscountInfo>
                    <DiscountCode>
                      {discount.code}
                      <CopyButton onClick={() => handleCopyCode(discount.code)}>
                        <FaCopy />
                      </CopyButton>
                    </DiscountCode>
                    <DiscountDescription>
                      {discount.description}
                    </DiscountDescription>
                  </DiscountInfo>

                  <DiscountActions>
                    <StatusToggle
                      isActive={discount.isActive}
                      onClick={() => handleToggleStatus(discount.id)}
                    >
                      {discount.isActive ? <FaToggleOn /> : <FaToggleOff />}
                      {discount.isActive ? 'Active' : 'Inactive'}
                    </StatusToggle>

                    <ActionButton onClick={() => handleEditDiscount(discount)}>
                      <FaEdit />
                    </ActionButton>

                    <ActionButton
                      className="danger"
                      onClick={() => handleDeleteDiscount(discount.id)}
                    >
                      <FaTrash />
                    </ActionButton>
                  </DiscountActions>
                </DiscountHeader>

                <DiscountDetails>
                  <DetailItem>
                    <DetailIcon>
                      {discount.type === 'percentage' ? (
                        <FaPercent />
                      ) : (
                        <FaDollarSign />
                      )}
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Discount Value</DetailLabel>
                      <DetailValue>
                        {discount.type === 'percentage'
                          ? `${discount.value}%`
                          : formatCurrency(discount.value)}
                      </DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <FaDollarSign />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Min Order Amount</DetailLabel>
                      <DetailValue>
                        {formatCurrency(discount.minOrderAmount)}
                      </DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <FaUsers />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Usage</DetailLabel>
                      <DetailValue>
                        {discount.totalUsage} / {discount.maxUsage}
                      </DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <FaCalendarAlt />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Valid Period</DetailLabel>
                      <DetailValue>
                        {formatDate(discount.startDate)} -{' '}
                        {formatDate(discount.endDate)}
                      </DetailValue>
                    </DetailContent>
                  </DetailItem>
                </DiscountDetails>
              </DiscountCard>
            ))
          )}
        </DiscountsList>
      </DiscountsContainer>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingDiscount ? 'Edit Discount' : 'Create New Discount'}
        footer={modalFooter}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormField
              label="Coupon Code"
              name="code"
              value={formData.code}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  code: e.target.value.toUpperCase(),
                }))
              }
              placeholder="e.g., SAVE20"
              required
            />

            <FormField
              label="Discount Type"
              type="select"
              name="type"
              value={formData.type}
              onChange={e =>
                setFormData(prev => ({ ...prev, type: e.target.value }))
              }
              options={[
                { value: 'percentage', label: 'Percentage' },
                { value: 'fixed', label: 'Fixed Amount' },
              ]}
              required
            />
          </FormRow>

          <FormField
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={e =>
              setFormData(prev => ({ ...prev, description: e.target.value }))
            }
            placeholder="Describe this discount offer"
            rows={2}
          />

          <FormRow>
            <FormField
              label={`Discount Value (${formData.type === 'percentage' ? '%' : '$'})`}
              type="number"
              name="value"
              value={formData.value}
              onChange={e =>
                setFormData(prev => ({ ...prev, value: e.target.value }))
              }
              placeholder={formData.type === 'percentage' ? '20' : '10.00'}
              min="0"
              max={formData.type === 'percentage' ? '100' : undefined}
              step={formData.type === 'percentage' ? '1' : '0.01'}
              required
            />

            <FormField
              label="Minimum Order Amount ($)"
              type="number"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  minOrderAmount: e.target.value,
                }))
              }
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </FormRow>

          <FormRow>
            <FormField
              label="Max Usage Per Customer"
              type="number"
              name="maxUsagePerCustomer"
              value={formData.maxUsagePerCustomer}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  maxUsagePerCustomer: e.target.value,
                }))
              }
              placeholder="1"
              min="1"
            />

            <FormField
              label="Total Usage Limit"
              type="number"
              name="maxUsage"
              value={formData.maxUsage}
              onChange={e =>
                setFormData(prev => ({ ...prev, maxUsage: e.target.value }))
              }
              placeholder="1000"
              min="1"
            />
          </FormRow>

          <FormRow>
            <FormField
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={e =>
                setFormData(prev => ({ ...prev, startDate: e.target.value }))
              }
              required
            />

            <FormField
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={e =>
                setFormData(prev => ({ ...prev, endDate: e.target.value }))
              }
              required
            />
          </FormRow>
        </form>
      </Modal>
    </>
  );
};

export default DiscountsTab;
