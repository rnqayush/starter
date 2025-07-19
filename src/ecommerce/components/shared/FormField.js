import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/GlobalStyle";

const FieldContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const RequiredMark = styled.span`
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.xs};
`;

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid
    ${(props) => (props.hasError ? theme.colors.error : theme.colors.gray300)};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.hasError
          ? theme.colors.error + "20"
          : theme.colors.primary + "20"};
  }

  &:disabled {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray500};
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid
    ${(props) => (props.hasError ? theme.colors.error : theme.colors.gray300)};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.hasError
          ? theme.colors.error + "20"
          : theme.colors.primary + "20"};
  }

  &:disabled {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray500};
    cursor: not-allowed;
  }
`;

const Select = styled.select.withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid
    ${(props) => (props.hasError ? theme.colors.error : theme.colors.gray300)};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.hasError
          ? theme.colors.error + "20"
          : theme.colors.primary + "20"};
  }

  &:disabled {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray500};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
`;

const HelpText = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  margin-top: ${theme.spacing.xs};
`;

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  disabled = false,
  options = [],
  rows,
  ...props
}) => {
  const renderInput = () => {
    if (type === "textarea") {
      return (
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          hasError={!!error}
          rows={rows}
          {...props}
        />
      );
    }

    if (type === "select") {
      return (
        <Select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          hasError={!!error}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    }

    return (
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        hasError={!!error}
        {...props}
      />
    );
  };

  return (
    <FieldContainer>
      {label && (
        <Label>
          {label}
          {required && <RequiredMark>*</RequiredMark>}
        </Label>
      )}
      {renderInput()}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </FieldContainer>
  );
};

export default FormField;
