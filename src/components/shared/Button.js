import styled from "styled-components";
import { theme, media } from "../../styles/GlobalStyle";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
    gap: ${theme.spacing.xs};
  padding: ${(props) =>
    props.size === "large"
      ? `${theme.spacing.md} ${theme.spacing.xl}`
      : props.size === "small"
        ? `${theme.spacing.xs} ${theme.spacing.sm}`
        : `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${(props) =>
    props.size === "large"
      ? "1rem"
      : props.size === "small"
        ? "0.8125rem"
        : "0.875rem"};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: ${(props) =>
    props.size === "large"
      ? "2.5rem"
      : props.size === "small"
        ? "1.75rem"
        : "2.125rem"};
  white-space: nowrap;

    ${media.mobile} {
    padding: ${(props) =>
      props.size === "large"
        ? `${theme.spacing.sm} ${theme.spacing.lg}`
        : props.size === "small"
          ? `${theme.spacing.xs} ${theme.spacing.sm}`
          : `${theme.spacing.xs} ${theme.spacing.md}`};
    font-size: ${(props) =>
      props.size === "large"
        ? "0.9375rem"
        : props.size === "small"
          ? "0.75rem"
          : "0.8125rem"};
    min-height: ${(props) =>
      props.size === "large"
        ? "2.25rem"
        : props.size === "small"
          ? "1.625rem"
          : "1.875rem"};
    gap: ${theme.spacing.xs};
  }

    ${media.tablet} {
    font-size: ${(props) =>
      props.size === "large"
        ? "0.9375rem"
        : props.size === "small"
          ? "0.78125rem"
          : "0.8125rem"};
  }

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          background: ${theme.colors.white};
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `;
      case "outline":
        return `
          background: transparent;
          color: ${theme.colors.gray700};
          border-color: ${theme.colors.gray300};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.gray50};
            border-color: ${theme.colors.gray400};
          }
        `;
      case "danger":
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: #dc2626;
          }
        `;
      case "success":
        return `
          background: ${theme.colors.success};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: #059669;
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryDark};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

export const IconButton = styled(Button)`
  padding: ${theme.spacing.sm};
  min-width: auto;
  min-height: 2.125rem;
  width: 2.125rem;

  ${media.mobile} {
    padding: ${theme.spacing.xs};
    min-height: 1.875rem;
    width: 1.875rem;
    font-size: 0.8125rem;
  }

  ${media.tablet} {
    min-height: 2rem;
    width: 2rem;
  }
`;
