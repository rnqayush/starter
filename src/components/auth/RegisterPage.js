import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaShoppingBag,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};

  ${media.mobile} {
    padding: ${theme.spacing.sm};
    align-items: flex-start;
    padding-top: ${theme.spacing.lg};
  }

  ${media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

const RegisterCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.xl};
  width: 100%;
  max-width: 31.25rem;
  max-height: 90vh;
  overflow-y: auto;

  ${media.mobile} {
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    max-width: 100%;
    max-height: 95vh;
    box-shadow: ${theme.shadows.lg};
  }

  ${media.tablet} {
    padding: ${theme.spacing.xl};
    max-width: 28rem;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray100};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray300};
    border-radius: ${theme.borderRadius.sm};
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};

  ${media.mobile} {
    font-size: 1.5rem;
  }

  ${media.tablet} {
    font-size: 1.75rem;
  }
`;

const LogoSubtext = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;

  ${media.mobile} {
    font-size: 0.8125rem;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};

  ${media.mobile} {
    font-size: 1.375rem;
    margin-bottom: ${theme.spacing.md};
  }

  ${media.tablet} {
    font-size: 1.5rem;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  background: ${theme.colors.gray100};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xl};

  ${media.mobile} {
    margin-bottom: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.md};
  }
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  flex: 1;
  padding: ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.875rem;

  ${media.mobile} {
    padding: ${theme.spacing.sm};
    font-size: 0.8125rem;
  }

  ${props =>
    props.active
      ? `
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.sm};
  `
      : `
    background: transparent;
    color: ${theme.colors.gray600};
    
    &:hover {
      color: ${theme.colors.gray800};
    }
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  ${media.mobile} {
    gap: ${theme.spacing.md};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  ${media.mobileDown} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }

  ${media.tablet} {
    gap: ${theme.spacing.lg};
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.875rem;

  ${media.mobile} {
    font-size: 0.8125rem;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1rem;
  z-index: 1;

  ${media.mobile} {
    left: ${theme.spacing.sm};
    font-size: 0.875rem;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.gray400};
  cursor: pointer;
  font-size: 1rem;
  padding: ${theme.spacing.xs};

  &:hover {
    color: ${theme.colors.gray600};
  }
`;

const RegisterButton = styled(Button)`
  width: 100%;
  padding: ${theme.spacing.md};
  font-size: 1rem;
  font-weight: 600;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    background: ${theme.colors.gray300};
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: ${theme.spacing.lg} 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: ${theme.colors.gray200};
  }

  span {
    background: ${theme.colors.white};
    color: ${theme.colors.gray500};
    padding: 0 ${theme.spacing.md};
    font-size: 0.9rem;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  color: ${theme.colors.gray600};
  font-size: 0.9rem;

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackToHome = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.lg};

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessCategory: '',
    phone: '',
    address: '',
    website: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to seller dashboard
      navigate('/seller-dashboard');
    }, 1500);
  };

  const categories = [
    { value: '', label: 'Select Business Category' },
    { value: 'hotels', label: 'Hotels & Hospitality' },
    { value: 'ecommerce', label: 'Ecommerce & Retail' },
    { value: 'weddings', label: 'Weddings & Events' },
    { value: 'automobiles', label: 'Automobiles & Transport' },
    { value: 'restaurants', label: 'Restaurants & Food' },
    { value: 'services', label: 'Professional Services' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <PageContainer>
      <RegisterCard>
        <BackToHome to="/">← Back to Home</BackToHome>

        <Logo>
          <LogoText>StoreBuilder</LogoText>
          <LogoSubtext>Launch your online store without coding</LogoSubtext>
        </Logo>

        <Title>Create Account</Title>

        <Form onSubmit={handleSubmit}>
          {userType === 'buyer' ? (
            // Buyer Form
            <>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <InputContainer>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <StyledInput
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={buyerData.firstName}
                      onChange={handleBuyerInputChange}
                      required
                    />
                  </InputContainer>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <InputContainer>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <StyledInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={buyerData.lastName}
                      onChange={handleBuyerInputChange}
                      required
                    />
                  </InputContainer>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <InputContainer>
                  <InputIcon>
                    <FaEnvelope />
                  </InputIcon>
                  <StyledInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={buyerData.email}
                    onChange={handleBuyerInputChange}
                    required
                  />
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <InputContainer>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <StyledInput
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={buyerData.password}
                    onChange={handleBuyerInputChange}
                    required
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <InputContainer>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <StyledInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={buyerData.confirmPassword}
                    onChange={handleBuyerInputChange}
                    required
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </InputContainer>
              </FormGroup>
            </>
          ) : (
            // Seller Form
            <>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <InputContainer>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <StyledInput
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={sellerData.firstName}
                      onChange={handleSellerInputChange}
                      required
                    />
                  </InputContainer>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <InputContainer>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <StyledInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={sellerData.lastName}
                      onChange={handleSellerInputChange}
                      required
                    />
                  </InputContainer>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <InputContainer>
                  <InputIcon>
                    <FaEnvelope />
                  </InputIcon>
                  <StyledInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Business email"
                    value={sellerData.email}
                    onChange={handleSellerInputChange}
                    required
                  />
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="businessName">Business Name</Label>
                <InputContainer>
                  <InputIcon>
                    <FaBuilding />
                  </InputIcon>
                  <StyledInput
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="Your business name"
                    value={sellerData.businessName}
                    onChange={handleSellerInputChange}
                    required
                  />
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="businessCategory">Business Category</Label>
                <InputContainer>
                  <InputIcon>
                    <FaShoppingBag />
                  </InputIcon>
                  <Select
                    id="businessCategory"
                    name="businessCategory"
                    value={sellerData.businessCategory}
                    onChange={handleSellerInputChange}
                    required
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Select>
                </InputContainer>
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <InputContainer>
                    <InputIcon>
                      <FaPhone />
                    </InputIcon>
                    <StyledInput
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone number"
                      value={sellerData.phone}
                      onChange={handleSellerInputChange}
                      required
                    />
                  </InputContainer>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <InputContainer>
                    <InputIcon>
                      <FaGlobe />
                    </InputIcon>
                    <StyledInput
                      type="url"
                      id="website"
                      name="website"
                      placeholder="www.example.com"
                      value={sellerData.website}
                      onChange={handleSellerInputChange}
                    />
                  </InputContainer>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="address">Business Address</Label>
                <InputContainer>
                  <InputIcon>
                    <FaMapMarkerAlt />
                  </InputIcon>
                  <StyledInput
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Business address"
                    value={sellerData.address}
                    onChange={handleSellerInputChange}
                    required
                  />
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <InputContainer>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <StyledInput
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={sellerData.password}
                    onChange={handleSellerInputChange}
                    required
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <InputContainer>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <StyledInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={sellerData.confirmPassword}
                    onChange={handleSellerInputChange}
                    required
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </InputContainer>
              </FormGroup>
            </>
          )}

          <RegisterButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </RegisterButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <LoginLink>
          Already have an account? <Link to="/login">Sign in here</Link>
        </LoginLink>
      </RegisterCard>
    </PageContainer>
  );
};

export default RegisterPage;
