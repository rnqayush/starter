import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaStore,
  FaChartLine,
  FaArrowRight,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const DemoContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
`;

const DemoCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.xl};
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const DemoIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.xl};
  color: ${theme.colors.white};
  font-size: 2rem;
`;

const DemoTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
`;

const DemoSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xxl};
  line-height: 1.6;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xxl};
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const FeatureIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${theme.colors.primary}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  font-size: 0.95rem;
  color: ${theme.colors.gray700};
`;

const DemoButton = styled.button`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.xl};
  background: ${theme.colors.white}40;
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.white}60;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${theme.colors.white}60;
    transform: translateY(-1px);
  }
`;

const SellerDashboardDemo = () => {
  const navigate = useNavigate();

  const features = [
    { icon: FaChartLine, text: "Sales Analytics & Insights" },
    { icon: FaShoppingCart, text: "Order Management" },
    { icon: FaStore, text: "Product Catalog" },
    { icon: FaUser, text: "Customer Management" },
    { icon: FaChartLine, text: "Revenue Tracking" },
    { icon: FaStore, text: "Inventory Control" },
  ];

  return (
    <DemoContainer>
      <BackButton onClick={() => navigate("/")}>← Back to Home</BackButton>

      <DemoCard>
        <DemoIcon>
          <FaStore />
        </DemoIcon>

        <DemoTitle>Seller Dashboard</DemoTitle>

        <DemoSubtitle>
          Experience our complete ecommerce seller management system with
          comprehensive analytics, product management, and order processing
          tools.
        </DemoSubtitle>

        <FeaturesList>
          {features.map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureIcon>
                <feature.icon />
              </FeatureIcon>
              <FeatureText>{feature.text}</FeatureText>
            </FeatureItem>
          ))}
        </FeaturesList>

        <DemoButton onClick={() => navigate("/ecommerce/seller-dashboard")}>
          Launch Seller Dashboard
          <FaArrowRight />
        </DemoButton>
      </DemoCard>
    </DemoContainer>
  );
};

export default SellerDashboardDemo;
