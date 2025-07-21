import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaRing,
  FaHotel,
  FaShoppingCart,
  FaCar,
  FaBriefcase,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaUpload,
  FaGlobe,
  FaRocket,
} from "react-icons/fa";
import { theme, media } from "../styles/GlobalStyle";
import { Button } from "./shared/Button";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: ${theme.spacing.lg} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23ffffff10" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
  }

  ${media.mobile} {
    padding: ${theme.spacing.md} 0;
  }
`;

const StepperCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  z-index: 1;

  ${media.mobile} {
    margin: 0 ${theme.spacing.sm};
    border-radius: 16px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f3f4f6;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Header = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.lg};
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e5e7eb;

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.md};
  }
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  ${media.mobile} {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
  }
`;

const StepDot = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  background: ${props => 
    props.active ? 'linear-gradient(135deg, #10b981, #059669)' :
    props.completed ? 'linear-gradient(135deg, #10b981, #059669)' :
    '#d1d5db'
  };
  transition: all 0.3s ease;
  position: relative;

  ${props => props.completed && `
    &::after {
      content: "✓";
      position: absolute;
      font-size: 14px;
    }
  `}

  ${media.mobile} {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
`;

const StepConnector = styled.div`
  width: 60px;
  height: 2px;
  background: ${props => props.completed ? 'linear-gradient(90deg, #10b981, #059669)' : '#d1d5db'};
  transition: all 0.3s ease;

  ${media.mobile} {
    width: 40px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: ${theme.spacing.sm};
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
`;

const Content = styled.div`
  padding: ${theme.spacing.xl};
  min-height: 400px;

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const WebsiteTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
  }
`;

const WebsiteTypeCard = styled.div`
  background: white;
  border: 3px solid ${props => props.selected ? '#10b981' : '#e5e7eb'};
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #10b981;
  }

  ${props => props.selected && `
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    
    &::after {
      content: "✓";
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      background: #10b981;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
  `}

  ${media.mobile} {
    padding: ${theme.spacing.md};
  }
`;

const TypeIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.selected ? '#10b981' : '#6b7280'};
  margin-bottom: ${theme.spacing.md};
  transition: color 0.3s ease;

  ${media.mobile} {
    font-size: 2rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const TypeTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.selected ? '#10b981' : '#374151'};
  margin: 0;
  transition: color 0.3s ease;

  ${media.mobile} {
    font-size: 0.875rem;
  }
`;

const FormSection = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: ${theme.spacing.sm};
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #10b981;
    background: white;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PreviewBox = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px dashed #38bdf8;
  border-radius: 12px;
  padding: ${theme.spacing.lg};
  text-align: center;
  margin-top: ${theme.spacing.md};
`;

const PreviewText = styled.p`
  font-size: 1.125rem;
  color: #0369a1;
  margin: 0;
  font-weight: 500;

  .domain {
    color: #0284c7;
    font-weight: 600;
  }

  .slug {
    color: #10b981;
    font-weight: 700;
  }
`;

const FileUpload = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;

  &:hover {
    border-color: #10b981;
    background: #f0fdf4;
  }

  input {
    display: none;
  }
`;

const ColorPicker = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.md};
`;

const ColorOption = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid ${props => props.selected ? '#10b981' : 'transparent'};
  background: ${props => props.color};
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  ${props => props.selected && `
    &::after {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
  `}
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.xl};
  background: #f8fafc;
  border-top: 1px solid #e5e7eb;

  ${media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const ActionButton = styled(Button)`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-weight: 600;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: all 0.3s ease;

  ${props => props.variant === 'back' && `
    background: white;
    color: #6b7280;
    border: 2px solid #e5e7eb;
    
    &:hover {
      background: #f9fafb;
      border-color: #d1d5db;
    }
  `}

  ${props => props.variant === 'next' && `
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `}

  ${props => props.variant === 'publish' && `
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    color: white;
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
    }
  `}
`;

const Summary = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 600;
  color: #374151;
`;

const SummaryValue = styled.span`
  color: #10b981;
  font-weight: 600;
`;

const StartBuilding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    websiteType: "",
    websiteName: "",
    logo: null,
    fullPageImage: null,
    tagline: "",
    themeColor: "#10b981"
  });

  const websiteTypes = [
    { id: "weddings", icon: FaRing, title: "Weddings", description: "Wedding planners & venues" },
    { id: "hotels", icon: FaHotel, title: "Hotels", description: "Hotels & accommodations" },
    { id: "ecommerce", icon: FaShoppingCart, title: "Ecommerce", description: "Online stores" },
    { id: "automobiles", icon: FaCar, title: "Automobiles", description: "Car dealers & rentals" },
    { id: "professional", icon: FaBriefcase, title: "Professional", description: "Business websites" }
  ];

  const colorOptions = [
    "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"
  ];

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.websiteType !== "";
      case 2:
        return formData.websiteName !== "" && /^[a-z0-9-]+$/.test(formData.websiteName);
      case 3:
        return true; // Confirmation step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    // Simulate website creation
    const slug = formData.websiteName;
    navigate(`/${slug}`);
  };

  const handleWebsiteNameChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData({ ...formData, websiteName: value });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <Title>What kind of website do you want to build?</Title>
            <Subtitle>Choose the type that best describes your business</Subtitle>
            <WebsiteTypeGrid>
              {websiteTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <WebsiteTypeCard
                    key={type.id}
                    selected={formData.websiteType === type.id}
                    onClick={() => setFormData({ ...formData, websiteType: type.id })}
                  >
                    <TypeIcon selected={formData.websiteType === type.id}>
                      <IconComponent />
                    </TypeIcon>
                    <TypeTitle selected={formData.websiteType === type.id}>
                      {type.title}
                    </TypeTitle>
                  </WebsiteTypeCard>
                );
              })}
            </WebsiteTypeGrid>
          </div>
        );

      case 2:
        return (
          <FormSection>
            <Title>Set up your website details</Title>
            <Subtitle>Choose your website name and upload your branding assets</Subtitle>

            <FormGroup>
              <Label>Website Name (URL slug)</Label>
              <Input
                type="text"
                placeholder="kingbanaras"
                value={formData.websiteName}
                onChange={handleWebsiteNameChange}
              />
              {formData.websiteName && (
                <PreviewBox>
                  <PreviewText>
                    Your website will be: <span className="domain">storebuilder.com/</span><span className="slug">{formData.websiteName}</span>
                  </PreviewText>
                </PreviewBox>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Logo Upload (Optional)</Label>
              <FileUpload onClick={() => document.getElementById('logo-upload').click()}>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
                />
                <FaUpload size={32} color="#6b7280" />
                <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
                  {formData.logo ? formData.logo.name : "Click to upload your logo"}
                </p>
              </FileUpload>
            </FormGroup>

            <FormGroup>
              <Label>Full Page Image (Optional)</Label>
              <FileUpload onClick={() => document.getElementById('hero-upload').click()}>
                <input
                  id="hero-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, fullPageImage: e.target.files[0] })}
                />
                <FaUpload size={32} color="#6b7280" />
                <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
                  {formData.fullPageImage ? formData.fullPageImage.name : "Click to upload a hero/banner image"}
                </p>
              </FileUpload>
            </FormGroup>

            <FormGroup>
              <Label>Business Tagline (Optional)</Label>
              <Input
                type="text"
                placeholder="Your business tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>Theme Color</Label>
              <ColorPicker>
                {colorOptions.map((color) => (
                  <ColorOption
                    key={color}
                    color={color}
                    selected={formData.themeColor === color}
                    onClick={() => setFormData({ ...formData, themeColor: color })}
                  />
                ))}
              </ColorPicker>
            </FormGroup>
          </FormSection>
        );

      case 3:
        return (
          <FormSection>
            <Title>Ready to publish!</Title>
            <Subtitle>Review your website configuration and publish your site</Subtitle>

            <Summary>
              <SummaryItem>
                <SummaryLabel>Website Type:</SummaryLabel>
                <SummaryValue>{websiteTypes.find(t => t.id === formData.websiteType)?.title}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Website URL:</SummaryLabel>
                <SummaryValue>storebuilder.com/{formData.websiteName}</SummaryValue>
              </SummaryItem>
              {formData.logo && (
                <SummaryItem>
                  <SummaryLabel>Logo:</SummaryLabel>
                  <SummaryValue>✓ {formData.logo.name}</SummaryValue>
                </SummaryItem>
              )}
              {formData.fullPageImage && (
                <SummaryItem>
                  <SummaryLabel>Hero Image:</SummaryLabel>
                  <SummaryValue>✓ {formData.fullPageImage.name}</SummaryValue>
                </SummaryItem>
              )}
              {formData.tagline && (
                <SummaryItem>
                  <SummaryLabel>Tagline:</SummaryLabel>
                  <SummaryValue>"{formData.tagline}"</SummaryValue>
                </SummaryItem>
              )}
              <SummaryItem>
                <SummaryLabel>Theme Color:</SummaryLabel>
                <SummaryValue>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', background: formData.themeColor, borderRadius: '4px' }}></div>
                    {formData.themeColor}
                  </div>
                </SummaryValue>
              </SummaryItem>
            </Summary>
          </FormSection>
        );

      default:
        return null;
    }
  };



  return (
    <Container>
      <StepperCard>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>

        <Header>
          <StepIndicator>
            {Array.from({ length: totalSteps }, (_, index) => (
              <React.Fragment key={index}>
                <StepDot
                  active={currentStep === index + 1}
                  completed={currentStep > index + 1}
                >
                  {currentStep > index + 1 ? <FaCheck /> : index + 1}
                </StepDot>
                {index < totalSteps - 1 && (
                  <StepConnector completed={currentStep > index + 1} />
                )}
              </React.Fragment>
            ))}
          </StepIndicator>
        </Header>

        <Content>
          {currentStep <= totalSteps ? renderStepContent() : null}
          {renderFinalStep()}
        </Content>

        <Actions>
          <ActionButton
            variant="back"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <FaArrowLeft />
            Back
          </ActionButton>

          {currentStep < totalSteps ? (
            <ActionButton
              variant="next"
              onClick={handleNext}
              disabled={!validateStep()}
            >
              Next
              <FaArrowRight />
            </ActionButton>
          ) : (
            <ActionButton
              variant="publish"
              onClick={handlePublish}
              disabled={!validateStep()}
            >
              <FaRocket />
              Publish My Website
            </ActionButton>
          )}
        </Actions>
      </StepperCard>
    </Container>
  );
};

export default StartBuilding;
