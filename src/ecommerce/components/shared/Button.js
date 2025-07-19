import styled from "styled-components";
import { theme } from "../../../styles/GlobalStyle";

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["variant", "size", "fullWidth"].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${(props) => {
    switch (props.size) {
      case "sm":
        return `${theme.spacing.sm} ${theme.spacing.md}`;
      case "lg":
        return `${theme.spacing.lg} ${theme.spacing.xl}`;
      default:
        return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
  }};
  border: ${(props) => {
    switch (props.variant) {
      case "outline":
        return `1px solid ${theme.colors.primary}`;
      case "ghost":
        return "1px solid transparent";
      default:
        return "none";
    }
  }};
  border-radius: ${theme.borderRadius.md};
  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return "0.85rem";
      case "lg":
        return "1rem";
      default:
        return "0.9rem";
    }
  }};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.gray600;
      case "success":
        return theme.colors.success;
      case "warning":
        return theme.colors.warning;
      case "error":
        return theme.colors.error;
      case "outline":
        return "transparent";
      case "ghost":
        return "transparent";
      default:
        return theme.colors.primary;
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case "outline":
        return theme.colors.primary;
      case "ghost":
        return theme.colors.gray700;
      default:
        return theme.colors.white;
    }
  }};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};

    ${(props) => {
      switch (props.variant) {
        case "primary":
          return `background: ${theme.colors.primaryDark};`;
        case "secondary":
          return `background: ${theme.colors.gray700};`;
        case "success":
          return `background: ${theme.colors.successDark || theme.colors.success};`;
        case "warning":
          return `background: ${theme.colors.warningDark || theme.colors.warning};`;
        case "error":
          return `background: ${theme.colors.errorDark || theme.colors.error};`;
        case "outline":
          return `background: ${theme.colors.primary}; color: ${theme.colors.white};`;
        case "ghost":
          return `background: ${theme.colors.gray100};`;
        default:
          return `background: ${theme.colors.primaryDark};`;
      }
    }}
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${theme.colors.gray400};
    color: ${theme.colors.gray200};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

export default Button;
