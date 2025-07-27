import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaLock,
  FaArrowLeft,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaShieldAlt,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const SecurityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 600;
`;

const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const CheckoutForm = styled.form`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
`;

const Section = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const FormGrid = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'columns',
})`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &.error {
    border-color: ${theme.colors.error};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  input {
    margin-top: 2px;
  }

  label {
    font-size: 0.9rem;
    line-height: 1.5;
    color: ${theme.colors.gray700};
    cursor: pointer;
  }
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const PaymentMethod = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'selected',
})`
  border: 2px solid
    ${props => (props.selected ? theme.colors.primary : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props =>
    props.selected ? theme.colors.primary : theme.colors.white};
  color: ${props =>
    props.selected ? theme.colors.white : theme.colors.gray700};

  &:hover {
    border-color: ${theme.colors.primary};
  }

  .icon {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.sm};
  }

  .label {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const OrderSummary = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  height: fit-content;
  position: sticky;
  top: ${theme.spacing.xl};
`;

const SummaryTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
`;

const OrderItem = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const ItemDetails = styled.div`
  flex: 1;

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.xs};
    line-height: 1.3;
  }

  .meta {
    font-size: 0.8rem;
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing.xs};
  }

  .price {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${theme.colors.primary};
  }
`;

const SummaryRow = styled.div.withConfig({
  shouldForwardProp: prop => !['large', 'bold'].includes(prop),
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  font-size: ${props => (props.large ? '1.1rem' : '0.9rem')};
  font-weight: ${props => (props.bold ? '600' : '400')};
  color: ${props => (props.bold ? theme.colors.gray900 : theme.colors.gray600)};

  &.total {
    font-size: 1.2rem;
    font-weight: 600;
    padding-top: ${theme.spacing.md};
    border-top: 2px solid ${theme.colors.gray200};
    color: ${theme.colors.gray900};
  }
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xl};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.8rem;
  margin-top: ${theme.spacing.xs};
`;

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveInfo: false,
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock order items
  const orderItems = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    },
    {
      id: 4,
      name: 'Classic Denim Jacket',
      price: 89.99,
      quantity: 2,
      size: 'M',
      image:
        'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80',
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 99 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'city',
      'state',
      'zipCode',
      'phone',
    ];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Payment validation
    if (paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      }

      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!formData.cardName) {
        newErrors.cardName = 'Cardholder name is required';
      }
    }

    // Terms acceptance
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to order confirmation
      navigate('/ecommerce/order-confirmation', {
        state: {
          orderNumber: 'ORD-' + Date.now(),
          total: total,
          paymentMethod: paymentMethod,
          email: formData.email,
        },
      });
    } catch (error) {
    // alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = value => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = e => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  return (
    <PageContainer>
      <Navbar
        cartItemsCount={orderItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
      />

      <Container>
        <BackButton onClick={() => navigate('/ecommerce/cart')}>
          <FaArrowLeft />
          Back to Cart
        </BackButton>

        <PageHeader>
          <PageTitle>Secure Checkout</PageTitle>
          <SecurityBadge>
            <FaShieldAlt />
            SSL Secured
          </SecurityBadge>
        </PageHeader>

        <CheckoutContainer>
          <CheckoutForm onSubmit={handleSubmit}>
            <Section>
              <SectionTitle>1. Contact Information</SectionTitle>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>2. Shipping Address</SectionTitle>

              <FormGrid columns="1fr 1fr">
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="First name"
                  />
                  {errors.firstName && (
                    <ErrorMessage>{errors.firstName}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Last name"
                  />
                  {errors.lastName && (
                    <ErrorMessage>{errors.lastName}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="Street address"
                />
                {errors.address && (
                  <ErrorMessage>{errors.address}</ErrorMessage>
                )}
              </FormGroup>

              <FormGrid columns="1fr 1fr 1fr">
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                    placeholder="City"
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="CA">California</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                  </Select>
                  {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                    placeholder="ZIP"
                  />
                  {errors.zipCode && (
                    <ErrorMessage>{errors.zipCode}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>3. Payment Method</SectionTitle>

              <PaymentMethods>
                <PaymentMethod
                  selected={paymentMethod === 'card'}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FaCreditCard className="icon" />
                  <div className="label">Credit Card</div>
                </PaymentMethod>
                <PaymentMethod
                  selected={paymentMethod === 'paypal'}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <FaPaypal className="icon" />
                  <div className="label">PayPal</div>
                </PaymentMethod>
                <PaymentMethod
                  selected={paymentMethod === 'apple'}
                  onClick={() => setPaymentMethod('apple')}
                >
                  <FaApplePay className="icon" />
                  <div className="label">Apple Pay</div>
                </PaymentMethod>
                <PaymentMethod
                  selected={paymentMethod === 'google'}
                  onClick={() => setPaymentMethod('google')}
                >
                  <FaGooglePay className="icon" />
                  <div className="label">Google Pay</div>
                </PaymentMethod>
              </PaymentMethods>

              {paymentMethod === 'card' && (
                <>
                  <FormGroup>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      className={errors.cardNumber ? 'error' : ''}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && (
                      <ErrorMessage>{errors.cardNumber}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGrid columns="1fr 1fr">
                    <FormGroup>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={errors.expiryDate ? 'error' : ''}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiryDate && (
                        <ErrorMessage>{errors.expiryDate}</ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={errors.cvv ? 'error' : ''}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
                    </FormGroup>
                  </FormGrid>

                  <FormGroup>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={errors.cardName ? 'error' : ''}
                      placeholder="Name on card"
                    />
                    {errors.cardName && (
                      <ErrorMessage>{errors.cardName}</ErrorMessage>
                    )}
                  </FormGroup>
                </>
              )}

              <Checkbox>
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                />
                <label htmlFor="saveInfo">
                  Save my information for faster checkout next time
                </label>
              </Checkbox>

              <Checkbox>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                />
                <label htmlFor="terms">
                  I agree to the Terms of Service and Privacy Policy
                  {errors.terms && <ErrorMessage>{errors.terms}</ErrorMessage>}
                </label>
              </Checkbox>
            </Section>

            <Section>
              <PlaceOrderButton type="submit" disabled={loading}>
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <FaLock />
                    Place Order - ${total.toFixed(2)}
                  </>
                )}
              </PlaceOrderButton>
            </Section>
          </CheckoutForm>

          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>

            {orderItems.map(item => (
              <OrderItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <h4>{item.name}</h4>
                  <div className="meta">
                    Qty: {item.quantity}
                    {item.size && ` • Size: ${item.size}`}
                  </div>
                  <div className="price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </ItemDetails>
              </OrderItem>
            ))}

            <div style={{ marginTop: theme.spacing.lg }}>
              <SummaryRow>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </SummaryRow>

              <SummaryRow>
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </SummaryRow>

              <SummaryRow>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </SummaryRow>

              <SummaryRow className="total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </SummaryRow>
            </div>

            <div
              style={{
                textAlign: 'center',
                marginTop: theme.spacing.lg,
                fontSize: '0.8rem',
                color: theme.colors.gray500,
              }}
            >
              <FaShieldAlt style={{ marginRight: '4px' }} />
              Your payment information is secure and encrypted
            </div>
          </OrderSummary>
        </CheckoutContainer>
      </Container>

      <Footer />
    </PageContainer>
  );
};

export default Checkout;
