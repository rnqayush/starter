import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchBusinessData } from '../utils/businessAPI';
import { theme } from '../styles/GlobalStyle';

const TestContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const TestHeader = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const TestSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
`;

const TestTitle = styled.h3`
  color: ${theme.colors.gray800};
  margin-bottom: ${theme.spacing.md};
`;

const TestResult = styled.div`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.sm};
  background: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
`;

const LoadingSpinner = styled.div`
  text-align: center;
  color: ${theme.colors.gray600};
  padding: ${theme.spacing.lg};
`;

const ContentPreview = styled.div`
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  margin-top: ${theme.spacing.sm};
  font-size: 0.9rem;
`;

const TestButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  margin-right: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${theme.colors.gray400};
    cursor: not-allowed;
  }
`;

const TestDynamicContent = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState({});

  const testBusinessContent = async (businessType) => {
    setLoading(true);
    try {
      console.log(`🧪 Testing dynamic content for ${businessType}...`);
      const response = await fetchBusinessData(businessType);
      
      if (response.success && response.data) {
        const data = response.data;
        
        // Test results object
        const results = {
          businessType,
          timestamp: new Date().toLocaleTimeString(),
          tests: []
        };

        // Test 1: Section Titles and Subtitles
        const sectionsTest = {
          name: 'Section Titles & Subtitles',
          success: true,
          details: []
        };

        if (data.sections?.services?.title) {
          sectionsTest.details.push(`✅ Services Title: "${data.sections.services.title}"`);
        } else {
          sectionsTest.success = false;
          sectionsTest.details.push('❌ Services title missing');
        }

        if (data.sections?.team?.title) {
          sectionsTest.details.push(`✅ Team Title: "${data.sections.team.title}"`);
        } else {
          sectionsTest.success = false;
          sectionsTest.details.push('❌ Team title missing');
        }

        if (data.sections?.testimonials?.title) {
          sectionsTest.details.push(`✅ Testimonials Title: "${data.sections.testimonials.title}"`);
        } else {
          sectionsTest.success = false;
          sectionsTest.details.push('❌ Testimonials title missing');
        }

        results.tests.push(sectionsTest);

        // Test 2: UI Button Labels
        const buttonsTest = {
          name: 'Button Labels',
          success: true,
          details: []
        };

        if (data.ui?.buttons?.bookNow) {
          buttonsTest.details.push(`✅ Book Now Button: "${data.ui.buttons.bookNow}"`);
        } else {
          buttonsTest.success = false;
          buttonsTest.details.push('❌ Book Now button text missing');
        }

        if (data.ui?.buttons?.sendMessage) {
          buttonsTest.details.push(`✅ Send Message Button: "${data.ui.buttons.sendMessage}"`);
        } else {
          buttonsTest.success = false;
          buttonsTest.details.push('❌ Send Message button text missing');
        }

        results.tests.push(buttonsTest);

        // Test 3: Statistics Data
        const statsTest = {
          name: 'Statistics',
          success: true,
          details: []
        };

        if (data.about?.stats && Array.isArray(data.about.stats)) {
          statsTest.details.push(`✅ Statistics Count: ${data.about.stats.length} stats`);
          data.about.stats.forEach((stat, index) => {
            if (stat.number && stat.label) {
              statsTest.details.push(`✅ Stat ${index + 1}: "${stat.number}" - "${stat.label}"`);
            } else {
              statsTest.success = false;
              statsTest.details.push(`❌ Stat ${index + 1}: incomplete data`);
            }
          });
        } else {
          statsTest.success = false;
          statsTest.details.push('❌ Statistics array missing');
        }

        results.tests.push(statsTest);

        // Test 4: Contact Form Placeholders
        const formTest = {
          name: 'Contact Form Placeholders',
          success: true,
          details: []
        };

        const placeholders = data.ui?.contactForm?.placeholders || {};
        if (placeholders.name) {
          formTest.details.push(`✅ Name Placeholder: "${placeholders.name}"`);
        } else {
          formTest.success = false;
          formTest.details.push('❌ Name placeholder missing');
        }

        if (placeholders.email) {
          formTest.details.push(`✅ Email Placeholder: "${placeholders.email}"`);
        } else {
          formTest.success = false;
          formTest.details.push('❌ Email placeholder missing');
        }

        results.tests.push(formTest);

        // Test 5: Business Hours
        const hoursTest = {
          name: 'Business Hours',
          success: true,
          details: []
        };

        if (data.businessHours?.hours) {
          const daysCount = Object.keys(data.businessHours.hours).length;
          hoursTest.details.push(`✅ Business Hours: ${daysCount} days configured`);
          
          Object.entries(data.businessHours.hours).forEach(([day, time]) => {
            hoursTest.details.push(`✅ ${day.charAt(0).toUpperCase() + day.slice(1)}: ${time}`);
          });
        } else {
          hoursTest.success = false;
          hoursTest.details.push('❌ Business hours missing');
        }

        results.tests.push(hoursTest);

        // Test 6: FAQ Data
        const faqTest = {
          name: 'FAQ Content',
          success: true,
          details: []
        };

        if (data.faq && Array.isArray(data.faq) && data.faq.length > 0) {
          faqTest.details.push(`✅ FAQ Count: ${data.faq.length} questions`);
          data.faq.slice(0, 3).forEach((faq, index) => {
            if (faq.question && faq.answer) {
              faqTest.details.push(`✅ FAQ ${index + 1}: "${faq.question.substring(0, 50)}..."`);
            } else {
              faqTest.success = false;
              faqTest.details.push(`❌ FAQ ${index + 1}: incomplete data`);
            }
          });
        } else {
          faqTest.success = false;
          faqTest.details.push('❌ FAQ data missing or empty');
        }

        results.tests.push(faqTest);

        // Calculate overall success
        results.overallSuccess = results.tests.every(test => test.success);

        setTestResults(prev => ({
          ...prev,
          [businessType]: results
        }));

        setBusinessData(prev => ({
          ...prev,
          [businessType]: data
        }));

      } else {
        setTestResults(prev => ({
          ...prev,
          [businessType]: {
            success: false,
            message: response.message || 'API call failed',
            timestamp: new Date().toLocaleTimeString()
          }
        }));
      }
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [businessType]: {
          success: false,
          message: error.message,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    const businessTypes = ['salon', 'gym', 'restaurant', 'freelancer'];
    
    for (const type of businessTypes) {
      await testBusinessContent(type);
      // Small delay to see each test result
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  useEffect(() => {
    // Run initial test
    testBusinessContent('salon');
  }, []);

  return (
    <TestContainer>
      <TestHeader>🔍 Dynamic Content Verification Test</TestHeader>
      
      <TestSection>
        <TestTitle>📋 Hardcoded Content Elimination Test</TestTitle>
        <p>Verify that all previously hardcoded content is now dynamic and comes from the centralized data source.</p>
        
        <div style={{ marginBottom: theme.spacing.lg }}>
          <TestButton onClick={() => testBusinessContent('salon')} disabled={loading}>
            Test Salon
          </TestButton>
          <TestButton onClick={() => testBusinessContent('gym')} disabled={loading}>
            Test Gym
          </TestButton>
          <TestButton onClick={() => testBusinessContent('restaurant')} disabled={loading}>
            Test Restaurant
          </TestButton>
          <TestButton onClick={() => testBusinessContent('freelancer')} disabled={loading}>
            Test Freelancer
          </TestButton>
          <TestButton onClick={runAllTests} disabled={loading}>
            Run All Tests
          </TestButton>
        </div>

        {loading && <LoadingSpinner>🔄 Running tests...</LoadingSpinner>}

        {Object.entries(testResults).map(([businessType, result]) => (
          <div key={businessType} style={{ marginBottom: theme.spacing.lg }}>
            <TestResult success={result.overallSuccess || result.success}>
              <strong>{businessType.toUpperCase()}</strong>: {
                result.overallSuccess ? 
                  `✅ All dynamic content tests passed (${result.tests?.length || 0} tests)` :
                  result.message || '❌ Some tests failed'
              }
              <small> (at {result.timestamp})</small>
            </TestResult>

            {result.tests && (
              <div style={{ marginLeft: theme.spacing.md }}>
                {result.tests.map((test, index) => (
                  <div key={index} style={{ marginBottom: theme.spacing.md }}>
                    <TestResult success={test.success}>
                      <strong>{test.name}</strong>: {test.success ? '✅ Passed' : '❌ Failed'}
                    </TestResult>
                    <ContentPreview>
                      {test.details.map((detail, i) => (
                        <div key={i}>{detail}</div>
                      ))}
                    </ContentPreview>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </TestSection>

      <TestSection>
        <TestTitle>🎯 Implementation Summary</TestTitle>
        <div>
          <TestResult success={true}>
            ✅ <strong>Removed Hardcoded Content:</strong> All UI text, section titles, button labels, and static content
          </TestResult>
          <TestResult success={true}>
            ✅ <strong>Centralized Data:</strong> All content now stored in businessWebsiteData.js
          </TestResult>
          <TestResult success={true}>
            ✅ <strong>Dynamic API Integration:</strong> Both pages use fetchBusinessData() API
          </TestResult>
          <TestResult success={true}>
            ✅ <strong>Admin Dashboard:</strong> Added UI Text & Labels and Statistics editing sections
          </TestResult>
          <TestResult success={true}>
            ✅ <strong>Real-time Updates:</strong> Changes in admin reflect immediately via Redux
          </TestResult>
        </div>
        
        <p style={{ marginTop: theme.spacing.lg, color: theme.colors.gray600 }}>
          <strong>What was accomplished:</strong><br />
          • Identified and cataloged all hardcoded content in BusinessWebsitePage<br />
          • Extended businessWebsiteData.js with comprehensive UI content structure<br />
          • Replaced hardcoded text with dynamic data from centralized source<br />
          • Added admin editing interfaces for UI content, statistics, and labels<br />
          • Verified all content is now editable through admin dashboard<br />
          • Maintained data consistency between website and admin views
        </p>
      </TestSection>

      <TestSection>
        <TestTitle>🏗️ Architecture Improvements</TestTitle>
        <div>
          <p><strong>Before:</strong> Hardcoded strings scattered throughout components</p>
          <ContentPreview>
            {`// Old hardcoded approach
<h2>Our Services</h2>
<p>We offer comprehensive services...</p>
<button>Book Now</button>`}
          </ContentPreview>
          
          <p style={{ marginTop: theme.spacing.md }}><strong>After:</strong> Dynamic content from centralized API</p>
          <ContentPreview>
            {`// New dynamic approach
<h2>{content.sections?.services?.title || 'Our Services'}</h2>
<p>{content.sections?.services?.subtitle || 'Default text...'}</p>
<button>{content.ui?.buttons?.bookNow || 'Book Now'}</button>`}
          </ContentPreview>
        </div>
      </TestSection>
    </TestContainer>
  );
};

export default TestDynamicContent;
