import styled from "styled-components";
import { theme } from "../../styles/GlobalStyle";

export const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: ${(props) => props.height || "200px"};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const CardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
`;

export const CardSubtitle = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
  font-size: 0.875rem;
`;

export const CardDescription = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
`;

export const CardFooter = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: ${theme.borderRadius.sm};

  ${(props) => {
    switch (props.variant) {
      case "success":
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case "warning":
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case "error":
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      case "primary":
        return `
          background: ${theme.colors.primary}20;
          color: ${theme.colors.primary};
        `;
      default:
        return `
          background: ${theme.colors.gray200};
          color: ${theme.colors.gray700};
        `;
    }
  }}
`;

export const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export const PriceUnit = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${theme.colors.gray600};
`;
