import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHotel, FaUser, FaLock } from "react-icons/fa";
import { Button } from "../shared/Button";
import { Card, CardContent } from "../shared/Card";
import { Input, FormGroup, Label } from "../shared/Input";
import { theme } from "../../styles/GlobalStyle";
import { useAppContext } from "../../context/AppContext";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryLight}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.xl};
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const LoginTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

const LoginSubtitle = styled.p`
  color: ${theme.colors.gray600};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const InputWithIcon = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
`;

const StyledInput = styled(Input)`
  padding-left: 2.5rem;
`;

const UserTypeToggle = styled.div`
  display: flex;
  background: ${theme.colors.gray100};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
`;

const ToggleOption = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background: ${(props) => (props.active ? theme.colors.white : "transparent")};
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.gray600};
  border-radius: ${theme.borderRadius.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.xl};
  color: ${theme.colors.gray600};
`;

const DemoInfo = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.lg};
  font-size: 0.875rem;
  color: ${theme.colors.gray600};
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, userType, setUserType } = useAppContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock login - in real app, this would authenticate with backend
    const mockUser = {
      id: userType === "customer" ? "user123" : "owner123",
      email: formData.email,
      name: userType === "customer" ? "John Doe" : "Hotel Owner",
      type: userType,
    };

    setUser(mockUser);

    // Redirect based on user type
    if (userType === "customer") {
      navigate("/");
    } else {
      navigate("/owner/dashboard");
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        <CardContent>
          <LoginHeader>
            <Logo>
              <FaHotel />
              StayEase
            </Logo>
            <LoginTitle>Welcome Back</LoginTitle>
            <LoginSubtitle>Sign in to your account</LoginSubtitle>
          </LoginHeader>

          <UserTypeToggle>
            <ToggleOption
              type="button"
              active={userType === "customer"}
              onClick={() => setUserType("customer")}
            >
              Customer
            </ToggleOption>
            <ToggleOption
              type="button"
              active={userType === "owner"}
              onClick={() => setUserType("owner")}
            >
              Hotel Owner
            </ToggleOption>
          </UserTypeToggle>

          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email Address</Label>
              <InputWithIcon>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <StyledInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </InputWithIcon>
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <InputWithIcon>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <StyledInput
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </InputWithIcon>
            </FormGroup>

            <Button type="submit" size="large" style={{ width: "100%" }}>
              Sign In
            </Button>
          </LoginForm>

          <DemoInfo>
            <strong>Demo Mode:</strong> Use any email and password to sign in.
            This is a demonstration app with mock authentication.
          </DemoInfo>

          <LoginFooter>
            Don't have an account?{" "}
            <strong style={{ color: theme.colors.primary, cursor: "pointer" }}>
              Sign up
            </strong>
          </LoginFooter>
        </CardContent>
      </LoginCard>
    </PageContainer>
  );
};

export default LoginPage;
