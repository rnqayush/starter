import styled from "styled-components";
import { theme, media } from "../../styles/GlobalStyle";

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};

  ${media.tabletUp} {
    margin-bottom: ${theme.spacing.lg};
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.xs};
  font-size: 0.8125rem;

  ${media.tabletUp} {
    font-size: 0.875rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;
  background: ${theme.colors.white};
  min-height: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }

  &:disabled {
    background: ${theme.colors.gray100};
    cursor: not-allowed;
  }

  ${media.tabletUp} {
    font-size: 0.9375rem;
  }

  ${media.desktop} {
    padding: ${theme.spacing.md};
    min-height: 2.75rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 5rem;
  transition: all 0.2s ease;
  background: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }

  ${media.tabletUp} {
    font-size: 0.9375rem;
    min-height: 5.625rem;
  }

  ${media.desktop} {
    padding: ${theme.spacing.md};
    min-height: 6.25rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  ${media.tabletUp} {
    font-size: 0.9375rem;
  }

  ${media.desktop} {
    padding: ${theme.spacing.md};
    min-height: 2.75rem;
  }
`;

export const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.sm};
  color: ${theme.colors.gray400};
  pointer-events: none;
  z-index: 1;

  ${media.desktop} {
    left: ${theme.spacing.md};
  }
`;

export const SearchField = styled(Input).withConfig({
  shouldForwardProp: (prop) => prop !== "hasIcon",
})`
  padding-left: ${(props) => (props.hasIcon ? "2.25rem" : theme.spacing.sm)};

  ${media.desktop} {
    padding-left: ${(props) => (props.hasIcon ? "2.5rem" : theme.spacing.md)};
  }
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.sm};

  ${media.tabletUp} {
    grid-template-columns: ${(props) => props.columns || "1fr 1fr"};
    gap: ${theme.spacing.md};
  }

  ${media.desktop} {
    gap: ${theme.spacing.lg};
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xs};

  ${media.tabletUp} {
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.sm};
  }
`;

export const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: background-color 0.2s ease;
  font-size: 0.8125rem;

  &:hover {
    background: ${theme.colors.gray50};
  }

  input[type="checkbox"] {
    margin: 0;
    transform: scale(1);
  }

  ${media.tabletUp} {
    padding: ${theme.spacing.sm};
    font-size: 0.875rem;
    gap: ${theme.spacing.sm};

    input[type="checkbox"] {
      transform: scale(1.1);
    }
  }
`;

export const FileInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8125rem;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  ${media.tabletUp} {
    padding: ${theme.spacing.md};
    font-size: 0.875rem;
  }
`;
