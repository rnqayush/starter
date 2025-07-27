import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaStore,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaGithub,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  backdrop-filter: blur(4px);
  padding: 1rem;
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 450px;
  width: 100%;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  position: relative;
  margin: auto;

  @media (max-width: 768px) {
    max-width: 95%;
    border-radius: 12px;
  }
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  text-align: center;
  border-bottom: 1px solid #f3f4f6;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const ModalSubtitle = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin: 1.5rem 0 0 0;
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${props => (props.active ? '#3b82f6' : 'transparent')};
  color: ${props => (props.active ? '#3b82f6' : '#6b7280')};
  font-weight: ${props => (props.active ? '600' : '500')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  ${props =>
    props.error &&
    `
    border-color: #ef4444;
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `}
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: #6b7280;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  span {
    padding: 0 1rem;
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    border-color: #d1d5db;
    background: #f9fafb;
  }

  &.google:hover {
    border-color: #ea4335;
    color: #ea4335;
  }

  &.facebook:hover {
    border-color: #1877f2;
    color: #1877f2;
  }

  &.github:hover {
    border-color: #333;
    color: #333;
  }
`;

const RoleSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const RoleOption = styled.div`
  padding: 1rem;
  border: 2px solid ${props => (props.selected ? '#3b82f6' : '#e5e7eb')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  background: ${props => (props.selected ? '#eff6ff' : 'white')};

  &:hover {
    border-color: #3b82f6;
  }

  .icon {
    font-size: 1.5rem;
    color: ${props => (props.selected ? '#3b82f6' : '#6b7280')};
    margin-bottom: 0.5rem;
  }

  .title {
    font-weight: 600;
    color: ${props => (props.selected ? '#3b82f6' : '#374151')};
    margin-bottom: 0.25rem;
  }

  .desc {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

const AuthModal = ({ isOpen, onClose, onSuccess, defaultTab = 'login' }) => {
  const { login, register, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    businessName: '',
    businessType: 'General',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === 'register') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }

      if (formData.role === 'seller' && !formData.businessName.trim()) {
        newErrors.businessName = 'Business name is required for sellers';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let result;
      if (activeTab === 'login') {
        result = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        result = await register(formData);
      }

      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: 'customer',
          businessName: '',
          businessType: 'General',
        });

        if (onSuccess) {
          onSuccess();
        } else {
          onClose();
        }
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = provider => {
    // Simulate social login
    const email = `demo@${provider}.com`;
    login({
      email,
      name: `Demo ${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      role: 'customer',
    }).then(result => {
      if (result.success) {
        onClose();
      }
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>

        <ModalHeader>
          <ModalTitle>
            {activeTab === 'login' ? 'Welcome Back!' : 'Join Our Platform'}
          </ModalTitle>
          <ModalSubtitle>
            {activeTab === 'login'
              ? 'Sign in to continue your journey'
              : 'Create an account to get started'}
          </ModalSubtitle>

          <TabContainer>
            <Tab
              active={activeTab === 'login'}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </Tab>
            <Tab
              active={activeTab === 'register'}
              onClick={() => setActiveTab('register')}
            >
              Sign Up
            </Tab>
          </TabContainer>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <>
                <FormGroup>
                  <Label>I want to:</Label>
                  <RoleSelector>
                    <RoleOption
                      selected={formData.role === 'customer'}
                      onClick={() =>
                        setFormData(prev => ({ ...prev, role: 'customer' }))
                      }
                    >
                      <div className="icon">
                        <FaUser />
                      </div>
                      <div className="title">Buy Products</div>
                      <div className="desc">
                        Browse and enquire about products
                      </div>
                    </RoleOption>
                    <RoleOption
                      selected={formData.role === 'seller'}
                      onClick={() =>
                        setFormData(prev => ({ ...prev, role: 'seller' }))
                      }
                    >
                      <div className="icon">
                        <FaStore />
                      </div>
                      <div className="title">Sell Products</div>
                      <div className="desc">Create your own store</div>
                    </RoleOption>
                  </RoleSelector>
                </FormGroup>

                <FormGroup>
                  <Label>Full Name</Label>
                  <InputWrapper>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      error={errors.name}
                    />
                  </InputWrapper>
                  {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>

                {formData.role === 'seller' && (
                  <>
                    <FormGroup>
                      <Label>Business Name</Label>
                      <InputWrapper>
                        <InputIcon>
                          <FaStore />
                        </InputIcon>
                        <Input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="Enter your business name"
                          error={errors.businessName}
                        />
                      </InputWrapper>
                      {errors.businessName && (
                        <ErrorMessage>{errors.businessName}</ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Business Type</Label>
                      <InputWrapper>
                        <InputIcon>
                          <FaStore />
                        </InputIcon>
                        <Select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                        >
                          <option value="General">General Store</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Fashion">Fashion & Clothing</option>
                          <option value="Home & Garden">Home & Garden</option>
                          <option value="Sports">Sports & Fitness</option>
                          <option value="Books">Books & Media</option>
                          <option value="Health">Health & Beauty</option>
                          <option value="Food">Food & Beverages</option>
                        </Select>
                      </InputWrapper>
                    </FormGroup>
                  </>
                )}

                <FormGroup>
                  <Label>Phone Number</Label>
                  <InputWrapper>
                    <InputIcon>
                      <FaPhone />
                    </InputIcon>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      error={errors.phone}
                    />
                  </InputWrapper>
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>
              </>
            )}

            <FormGroup>
              <Label>Email Address</Label>
              <InputWrapper>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  error={errors.email}
                />
              </InputWrapper>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <InputWrapper>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  error={errors.password}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputWrapper>
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FormGroup>

            {activeTab === 'register' && (
              <FormGroup>
                <Label>Confirm Password</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                  />
                </InputWrapper>
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
              </FormGroup>
            )}

            {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isSubmitting || loading}>
              {isSubmitting
                ? 'Please wait...'
                : activeTab === 'login'
                  ? 'Sign In'
                  : 'Create Account'}
            </SubmitButton>
          </Form>

          <Divider>
            <span>or continue with</span>
          </Divider>

          <SocialButtons>
            <SocialButton
              className="google"
              onClick={() => handleSocialLogin('google')}
            >
              <FaGoogle />
              Google
            </SocialButton>
            <SocialButton
              className="facebook"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FaFacebook />
              Facebook
            </SocialButton>
            <SocialButton
              className="github"
              onClick={() => handleSocialLogin('github')}
            >
              <FaGithub />
              GitHub
            </SocialButton>
          </SocialButtons>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AuthModal;
