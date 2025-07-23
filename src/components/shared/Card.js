import styled from 'styled-components';
import { theme, media } from '../../styles/GlobalStyle';

export const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: none;
    box-shadow: ${theme.shadows.md};
  }

  ${media.tabletUp} {
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.md};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: ${props => props.height || '9rem'};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;

  ${media.tabletUp} {
    height: ${props => props.height || '9.5rem'};
  }

  ${media.desktop} {
    height: ${props => props.height || '10rem'};
  }
`;

export const CardContent = styled.div`
  padding: ${theme.spacing.sm};

  ${media.tabletUp} {
    padding: ${theme.spacing.md};
  }
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.gray900};
  line-height: 1.3;

  ${media.tabletUp} {
    font-size: 1.0625rem;
  }

  ${media.desktop} {
    font-size: 1.125rem;
  }
`;

export const CardSubtitle = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xs};
  font-size: 0.75rem;
  line-height: 1.4;

  ${media.tabletUp} {
    font-size: 0.8125rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const CardDescription = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.4;
  margin-bottom: ${theme.spacing.xs};
  font-size: 0.75rem;

  ${media.tabletUp} {
    font-size: 0.8125rem;
    line-height: 1.5;
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const CardFooter = styled.div`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  display: flex;
  gap: ${theme.spacing.xs};
  flex-direction: column;
  align-items: stretch;

  ${media.tabletUp} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    gap: ${theme.spacing.sm};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.xs};
  flex-direction: column;

  ${media.tabletUp} {
    flex-direction: row;
    margin-top: ${theme.spacing.sm};
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.xs};
  font-size: 0.6875rem;
  font-weight: 500;
  border-radius: ${theme.borderRadius.sm};
  white-space: nowrap;

  ${media.tabletUp} {
    font-size: 0.75rem;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }

  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'error':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      case 'primary':
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
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.xs};

  ${media.tabletUp} {
    font-size: 1.0625rem;
  }

  ${media.desktop} {
    font-size: 1.125rem;
  }
`;

export const PriceUnit = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${theme.colors.gray600};

  ${media.tabletUp} {
    font-size: 0.8125rem;
  }
`;
