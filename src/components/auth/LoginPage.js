import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { loginUser, clearError, selectAuth } from '../../store/slices/authSlice';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};

  ${media.mobile} {
    padding: ${theme.spacing.md};
    align-items: flex-start;
    padding-top: ${theme.spacing.xl};
  }

  ${media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

const LoginCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.xl};
  width: 100%;
  max-width: 25rem;

  ${media.mobile} {
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    max-width: 100%;
    box-shadow: ${theme.shadows.lg};
  }

  ${media.tablet} {
    padding: ${theme.spacing.xl};
    max-width: 22rem;
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
  margin-bottom: ${theme.spacing.xl};

  ${media.mobile} {
    font-size: 1.375rem;
    margin-bottom: ${theme.spacing.lg};
  }

  ${media.tablet} {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  ${media.mobile} {
    gap: ${theme.spacing.md};
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
  min-height: 3rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 2.5rem;
    font-size: 1rem;
    min-height: 2.75rem;
    border-radius: ${theme.borderRadius.md};
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
  z-index: 1;

  &:hover {
    color: ${theme.colors.gray600};
  }

  ${media.mobile} {
    right: ${theme.spacing.sm};
    font-size: 0.875rem;
    padding: ${theme.spacing.xs};
  }
`;

const ForgotPasswordLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  display: block;
  margin-top: ${theme.spacing.sm};

  &:hover {
    text-decoration: underline;
  }

  ${media.mobile} {
    font-size: 0.8125rem;
    text-align: center;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: ${theme.spacing.md};
  font-size: 1rem;
  font-weight: 600;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.2s ease;
  min-height: 3rem;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    background: ${theme.colors.gray300};
    cursor: not-allowed;
    transform: none;
  }

  ${media.mobile} {
    min-height: 2.75rem;
    font-size: 1rem;
    border-radius: ${theme.borderRadius.md};

    &:hover {
      transform: none;
    }
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

  ${media.mobile} {
    margin: ${theme.spacing.md} 0;

    span {
      font-size: 0.8125rem;
      padding: 0 ${theme.spacing.sm};
    }
  }
`;

const RegisterLink = styled.div`
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

  ${media.mobile} {
    font-size: 0.8125rem;
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

  ${media.mobile} {
    font-size: 0.8125rem;
    margin-bottom: ${theme.spacing.md};
    gap: ${theme.spacing.xs};
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(selectAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    const result = await dispatch(loginUser(formData.email, formData.password));

    if (result.success) {
      // Redirect based on user role
      const user = result.user;
      if (user.role === 'admin') {
        navigate('/');
      } else if (user.role === 'business_owner') {
        // Redirect to appropriate dashboard based on business category
        const dashboardRoutes = {
          hotels: '/hoteladmin',
          ecommerce: '/selleradminpanel',
          weddings: '/weddingadminpanel',
          automobiles: '/autoadmindasboard',
          business: '/adminpanel',
          services: '/adminpanel',
          restaurants: '/adminpanel',
        };
        const redirectPath = dashboardRoutes[user.businessCategory] || '/';
        navigate(redirectPath);
      } else {
        navigate('/');
      }
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component unmounts or form changes
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, error]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer>
      <LoginCard>
        <BackToHome to="/">← Back to Home</BackToHome>

        <Logo>
          <LogoText>StoreBuilder</LogoText>
          <LogoSubtext>Launch your online store without coding</LogoSubtext>
        </Logo>

        <Title>Welcome Back</Title>

        <Form onSubmit={handleSubmit}>
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
                value={formData.email}
                onChange={handleInputChange}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <PasswordToggle type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputContainer>
            <ForgotPasswordLink to="/forgot-password">
              Forgot your password?
            </ForgotPasswordLink>
          </FormGroup>

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </LoginButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <RegisterLink>
          Don't have an account? <Link to="/register">Create one here</Link>
        </RegisterLink>
      </LoginCard>
    </PageContainer>
  );
};

export default LoginPage;
