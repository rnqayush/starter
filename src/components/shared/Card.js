import styled from "styled-components";
import { theme, media } from "../../styles/GlobalStyle";

export const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  ${media.mobile} {
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.sm};

    &:hover {
      transform: none;
      box-shadow: ${theme.shadows.md};
    }
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: ${(props) => props.height || "12.5rem"};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;

  ${media.mobile} {
    height: ${(props) => props.height || "10rem"};
  }

  ${media.tablet} {
    height: ${(props) => props.height || "11.25rem"};
  }
`;

export const CardContent = styled.div`
  padding: ${theme.spacing.lg};

  ${media.mobile} {
    padding: ${theme.spacing.md};
  }

  ${media.tablet} {
    padding: ${theme.spacing.lg};
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray900};
  line-height: 1.3;

  ${media.mobile} {
    font-size: 1.125rem;
    margin-bottom: ${theme.spacing.xs};
  }

  ${media.tablet} {
    font-size: 1.1875rem;
  }
`;

export const CardSubtitle = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
  font-size: 0.875rem;
  line-height: 1.4;

  ${media.mobile} {
    font-size: 0.8125rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const CardDescription = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
  font-size: 0.875rem;

  ${media.mobile} {
    font-size: 0.8125rem;
    line-height: 1.4;
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const CardFooter = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};

  ${media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    gap: ${theme.spacing.sm};
    flex-direction: column;
    align-items: stretch;
  }

  ${media.tablet} {
    flex-direction: row;
    align-items: center;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};

  ${media.mobile} {
    gap: ${theme.spacing.xs};
    margin-top: ${theme.spacing.sm};
    flex-direction: column;
  }

  ${media.tablet} {
    flex-direction: row;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: ${theme.borderRadius.sm};
  white-space: nowrap;

  ${media.mobile} {
    font-size: 0.6875rem;
    padding: ${theme.spacing.xs} ${theme.spacing.xs};
  }

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
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.xs};

  ${media.mobile} {
    font-size: 1.125rem;
  }

  ${media.tablet} {
    font-size: 1.1875rem;
  }
`;

export const PriceUnit = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${theme.colors.gray600};

  ${media.mobile} {
    font-size: 0.8125rem;
  }
`;
