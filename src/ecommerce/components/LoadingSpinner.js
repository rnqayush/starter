import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/GlobalStyle";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "fullPage",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.fullPage ? "4rem" : "2rem")};
  min-height: ${(props) => (props.fullPage ? "200px" : "auto")};
`;

const Spinner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "size",
})`
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  border: 3px solid ${theme.colors.gray200};
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: ${theme.spacing.md};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  text-align: center;
`;

const LoadingSpinner = ({
  size = "40px",
  text = "Loading...",
  fullPage = false,
  showText = true,
}) => {
  return (
    <SpinnerContainer fullPage={fullPage}>
      <div>
        <Spinner size={size} />
        {showText && <LoadingText>{text}</LoadingText>}
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
