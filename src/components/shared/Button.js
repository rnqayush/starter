import styled from "styled-components";
import { theme } from "../../styles/GlobalStyle";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${(props) =>
    props.size === "large"
      ? `${theme.spacing.lg} ${theme.spacing.xxl}`
      : props.size === "small"
        ? `${theme.spacing.sm} ${theme.spacing.md}`
        : `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${(props) =>
    props.size === "large"
      ? "1.125rem"
      : props.size === "small"
        ? "0.875rem"
        : "1rem"};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

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
  padding: ${theme.spacing.md};
  min-width: auto;
`;
