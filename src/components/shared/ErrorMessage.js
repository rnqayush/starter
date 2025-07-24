import React from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { Button } from './Button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  text-align: center;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.red200};
  margin: ${theme.spacing.md} 0;
`;

const ErrorIcon = styled.div`
  color: ${theme.colors.red500};
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
`;

const ErrorTitle = styled.h3`
  color: ${theme.colors.red700};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const ErrorDescription = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.lg};
  max-width: 400px;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

const ErrorMessage = ({ 
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  showRetry = true,
  className
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <ErrorContainer className={className}>
      <ErrorIcon>
        <FaExclamationTriangle />
      </ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{message}</ErrorDescription>
      {showRetry && (
        <ErrorActions>
          <Button
            variant="outline"
            onClick={handleRetry}
            icon={<FaRedo />}
          >
            Try Again
          </Button>
        </ErrorActions>
      )}
    </ErrorContainer>
  );
};

// Specific error components for common scenarios
export const NetworkError = ({ onRetry }) => (
  <ErrorMessage
    title="Network Error"
    message="Unable to connect to the server. Please check your internet connection and try again."
    onRetry={onRetry}
  />
);

export const NotFoundError = ({ message = "The requested content could not be found." }) => (
  <ErrorMessage
    title="Not Found"
    message={message}
    showRetry={false}
  />
);

export const UnauthorizedError = ({ onLogin }) => (
  <ErrorMessage
    title="Access Denied"
    message="You need to be logged in to access this content."
    onRetry={onLogin}
    showRetry={!!onLogin}
  />
);

export const ServerError = ({ onRetry }) => (
  <ErrorMessage
    title="Server Error"
    message="Our servers are experiencing issues. Please try again in a few moments."
    onRetry={onRetry}
  />
);

export default ErrorMessage;
