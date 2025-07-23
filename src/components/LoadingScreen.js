import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const LogoSubtext = styled.div`
  font-size: 1rem;
  color: #6b7280;
  text-align: center;
`;

const SpinnerContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.6s ease-out 0.3s both;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out 0.6s both;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 2px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const LoadingScreen = ({
  text = 'Loading...',
  progress = null,
  showLogo = true,
}) => {
  return (
    <LoadingContainer>
      {showLogo && (
        <LogoContainer>
          <Logo>🛍️ ShopMart</Logo>
          <LogoSubtext>Your Ultimate Shopping Destination</LogoSubtext>
        </LogoContainer>
      )}

      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>

      <LoadingText>{text}</LoadingText>

      {progress !== null && (
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
      )}
    </LoadingContainer>
  );
};

export default LoadingScreen;
