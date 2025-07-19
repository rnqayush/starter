import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const LoginCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.xl};
  width: 100%;
  max-width: 400px;
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
`;

const LogoSubtext = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
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
    content: "";
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

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard or home page
      navigate("/");
    }, 1500);
  };

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
                type={showPassword ? "text" : "password"}
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

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
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
