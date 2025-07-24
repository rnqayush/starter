import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/GlobalStyle';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.size === 'large' ? '4rem' : '2rem'};
`;

const Spinner = styled.div`
  border: ${props => props.size === 'large' ? '4px' : '3px'} solid ${theme.colors.gray200};
  border-top: ${props => props.size === 'large' ? '4px' : '3px'} solid ${theme.colors.primary};
  border-radius: 50%;
  width: ${props => {
    switch (props.size) {
      case 'small': return '20px';
      case 'large': return '50px';
      default: return '30px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '20px';
      case 'large': return '50px';
      default: return '30px';
    }
  }};
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: ${theme.spacing.md};
  color: ${theme.colors.gray600};
  font-size: ${props => props.size === 'large' ? '1.1rem' : '0.9rem'};
  text-align: center;
`;

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Loading...', 
  showText = true,
  className 
}) => {
  return (
    <SpinnerContainer className={className} size={size}>
      <div>
        <Spinner size={size} />
        {showText && <LoadingText size={size}>{text}</LoadingText>}
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
