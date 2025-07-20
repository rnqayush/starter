import React from "react";
import styled from "styled-components";
import { FaDollarSign } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const Container = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};

  .icon {
    font-size: 4rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.lg};
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray700};
  }

  p {
    font-size: 1rem;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const FinancingTab = () => {
  return (
    <Container>
      <Title>
        <FaDollarSign />
        Financing & Loans
      </Title>
      <ComingSoon>
        <FaDollarSign className="icon" />
        <h3>Financing Management Coming Soon</h3>
        <p>Manage financing applications, loan approvals, payment plans, and work with lending partners to offer competitive rates to customers.</p>
      </ComingSoon>
    </Container>
  );
};

export default FinancingTab;
