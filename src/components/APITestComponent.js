import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { registerUser, loginUser } from '../store/slices/authSlice';
import { theme } from '../styles/GlobalStyle';

const TestContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const TestSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
`;

const TestButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    background: ${theme.colors.gray300};
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ success }) => success ? theme.colors.green50 : theme.colors.red50};
  border: 1px solid ${({ success }) => success ? theme.colors.green200 : theme.colors.red200};
  border-radius: ${theme.borderRadius.md};
  color: ${({ success }) => success ? theme.colors.green800 : theme.colors.red800};
`;

const APITestComponent = () => {
  const dispatch = useDispatch();
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState({});

  const testRegistration = async () => {
    setLoading(prev => ({ ...prev, register: true }));
    
    const testData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`, // Unique email
      password: 'testpassword123',
      phone: '1234567890',
      role: 'customer'
    };

    try {
      const result = await dispatch(registerUser(testData));
      setTestResults(prev => ({ 
        ...prev, 
        register: { 
          success: result.success, 
          message: result.success ? 'Registration successful!' : result.error,
          data: result
        }
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        register: { 
          success: false, 
          message: error.message,
          data: null
        }
      }));
    }
    
    setLoading(prev => ({ ...prev, register: false }));
  };

  const testLogin = async () => {
    setLoading(prev => ({ ...prev, login: true }));
    
    const testData = {
      email: 'dsfs@dfs.com', // Use the email from your example
      password: 'password123' // You'll need to provide the actual password
    };

    try {
      const result = await dispatch(loginUser(testData));
      setTestResults(prev => ({ 
        ...prev, 
        login: { 
          success: result.success, 
          message: result.success ? 'Login successful!' : result.error,
          data: result
        }
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        login: { 
          success: false, 
          message: error.message,
          data: null
        }
      }));
    }
    
    setLoading(prev => ({ ...prev, login: false }));
  };

  return (
    <TestContainer>
      <h2>API Integration Test</h2>
      <p>Test the registration and login endpoints to verify API integration.</p>
      
      <TestSection>
        <h3>Registration Test</h3>
        <p>Tests the /api/auth/register endpoint with sample data.</p>
        <TestButton 
          onClick={testRegistration}
          disabled={loading.register}
        >
          {loading.register ? 'Testing...' : 'Test Registration'}
        </TestButton>
        
        {testResults.register && (
          <ResultContainer success={testResults.register.success}>
            <strong>Result:</strong> {testResults.register.message}
            {testResults.register.data && (
              <pre style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                {JSON.stringify(testResults.register.data, null, 2)}
              </pre>
            )}
          </ResultContainer>
        )}
      </TestSection>

      <TestSection>
        <h3>Login Test</h3>
        <p>Tests the /api/auth/login endpoint with existing user.</p>
        <TestButton 
          onClick={testLogin}
          disabled={loading.login}
        >
          {loading.login ? 'Testing...' : 'Test Login'}
        </TestButton>
        
        {testResults.login && (
          <ResultContainer success={testResults.login.success}>
            <strong>Result:</strong> {testResults.login.message}
            {testResults.login.data && (
              <pre style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                {JSON.stringify(testResults.login.data, null, 2)}
              </pre>
            )}
          </ResultContainer>
        )}
      </TestSection>
    </TestContainer>
  );
};

export default APITestComponent;
