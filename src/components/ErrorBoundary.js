import React from "react";
import styled from "styled-components";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  padding: 2rem;
`;

const ErrorCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: #ef4444;
  margin-bottom: 2rem;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  text-align: left;
  margin: 2rem 0;
  
  summary {
    cursor: pointer;
    color: #6b7280;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  pre {
    background: #f3f4f6;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    overflow-x: auto;
    color: #374151;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;

  &:hover {
    background: #f9fafb;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you would send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
      console.error('Production error:', error.message);
    }
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorIcon>
              <FaExclamationTriangle />
            </ErrorIcon>
            
            <ErrorTitle>Oops! Something went wrong</ErrorTitle>
            
            <ErrorMessage>
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
            </ErrorMessage>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <ErrorDetails>
                <summary>Error Details (Development Mode)</summary>
                <pre>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </ErrorDetails>
            )}

            <ButtonGroup>
              <PrimaryButton onClick={this.handleRefresh}>
                <FaRefreshCw />
                Try Again
              </PrimaryButton>
              
              <SecondaryButton onClick={this.handleGoHome}>
                <FaHome />
                Go Home
              </SecondaryButton>
            </ButtonGroup>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
