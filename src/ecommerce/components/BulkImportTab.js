import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {
  FaFileImport,
  FaDownload,
  FaUpload,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCloud,
  FaFileCsv,
  FaTable,
  FaEye,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const Container = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Description = styled.p`
  color: ${theme.colors.gray600};
  font-size: 1rem;
  line-height: 1.5;
`;

const Content = styled.div`
  padding: ${theme.spacing.xl};
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
`;

const StepCard = styled.div`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 auto ${theme.spacing.md} auto;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const StepDescription = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.5;
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  min-height: 48px;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: none;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryDark};
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.white};
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary}10;
          }
        `;
      default:
        return `
          background: ${theme.colors.gray100};
          color: ${theme.colors.gray700};
          border: 1px solid ${theme.colors.gray300};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.gray200};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const UploadArea = styled.div`
  border: 3px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  transition: all 0.2s ease;
  background: ${theme.colors.gray50};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }

  &.dragover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }
`;

const UploadIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto ${theme.spacing.lg} auto;
`;

const UploadText = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const UploadSubtext = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
`;

const FileInput = styled.input`
  display: none;
`;

const ImportProgress = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const ProgressTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${theme.colors.gray200};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${theme.spacing.md};
`;

const ProgressFill = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'progress',
})`
  height: 100%;
  background: ${theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ResultCard = styled.div.withConfig({
  shouldForwardProp: prop => !['type'].includes(prop),
})`
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  border: 1px solid;

  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background: ${theme.colors.success}10;
          border-color: ${theme.colors.success};
          color: ${theme.colors.success};
        `;
      case 'error':
        return `
          background: #fef2f2;
          border-color: #ef4444;
          color: #ef4444;
        `;
      case 'warning':
        return `
          background: #fefce8;
          border-color: #eab308;
          color: #eab308;
        `;
      default:
        return `
          background: ${theme.colors.gray50};
          border-color: ${theme.colors.gray300};
          color: ${theme.colors.gray600};
        `;
    }
  }}
`;

const ResultNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
`;

const ResultLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

const InfoCard = styled.div`
  background: ${theme.colors.blue}10;
  border: 1px solid ${theme.colors.blue}30;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.blue};
  font-weight: 600;
`;

const InfoList = styled.ul`
  margin: 0;
  padding-left: ${theme.spacing.lg};
  color: ${theme.colors.gray700};

  li {
    margin-bottom: ${theme.spacing.xs};
    line-height: 1.5;
  }
`;

const BulkImportTab = () => {
  const [uploadStep, setUploadStep] = useState('upload'); // upload, processing, results
  const [selectedFile, setSelectedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = file => {
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const simulateImport = () => {
    setIsProcessing(true);
    setUploadStep('processing');
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setUploadStep('results');
          setImportResults({
            total: 150,
            successful: 145,
            failed: 3,
            skipped: 2,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetUpload = () => {
    setUploadStep('upload');
    setSelectedFile(null);
    setImportProgress(0);
    setImportResults(null);
    setIsProcessing(false);
  };

  const downloadTemplate = () => {
    // Create sample CSV content
    const csvContent = [
      'name,description,price,category,sku,stock,image_url',
      'Sample Product 1,High-quality product description,29.99,electronics,SKU001,100,https://example.com/image1.jpg',
      'Sample Product 2,Another great product,49.99,fashion,SKU002,50,https://example.com/image2.jpg',
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (uploadStep === 'processing') {
    return (
      <Container>
        <Header>
          <Title>
            <FaSpinner className="animate-spin" />
            Processing Import
          </Title>
          <Description>
            Please wait while we process your product data...
          </Description>
        </Header>

        <Content>
          <ImportProgress>
            <ProgressHeader>
              <ProgressTitle>Importing Products</ProgressTitle>
              <span>{importProgress}%</span>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill progress={importProgress} />
            </ProgressBar>
            <p style={{ color: theme.colors.gray600, margin: 0 }}>
              Processing {selectedFile?.name}...
            </p>
          </ImportProgress>
        </Content>
      </Container>
    );
  }

  if (uploadStep === 'results') {
    return (
      <Container>
        <Header>
          <Title>
            <FaCheck />
            Import Complete
          </Title>
          <Description>
            Your product import has been completed. Review the results below.
          </Description>
        </Header>

        <Content>
          <ResultsContainer>
            <ResultCard type="default">
              <ResultNumber>{importResults.total}</ResultNumber>
              <ResultLabel>Total Products</ResultLabel>
            </ResultCard>
            <ResultCard type="success">
              <ResultNumber>{importResults.successful}</ResultNumber>
              <ResultLabel>Successfully Imported</ResultLabel>
            </ResultCard>
            <ResultCard type="error">
              <ResultNumber>{importResults.failed}</ResultNumber>
              <ResultLabel>Failed</ResultLabel>
            </ResultCard>
            <ResultCard type="warning">
              <ResultNumber>{importResults.skipped}</ResultNumber>
              <ResultLabel>Skipped</ResultLabel>
            </ResultCard>
          </ResultsContainer>

          <div
            style={{
              marginTop: theme.spacing.xl,
              display: 'flex',
              gap: theme.spacing.md,
            }}
          >
            <ActionButton variant="primary" onClick={resetUpload}>
              <FaUpload />
              Import More Products
            </ActionButton>
            <ActionButton variant="secondary">
              <FaEye />
              View Import Log
            </ActionButton>
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaFileImport />
          Bulk Product Import
        </Title>
        <Description>
          Import multiple products at once using a CSV file. Save time by
          uploading hundreds of products in seconds.
        </Description>
      </Header>

      <Content>
        <InfoCard>
          <InfoHeader>
            <FaInfoCircle />
            Before You Start
          </InfoHeader>
          <InfoList>
            <li>Download the CSV template to see the required format</li>
            <li>
              Include all required fields: name, price, category, and stock
            </li>
            <li>Image URLs should be publicly accessible</li>
            <li>Maximum file size: 10MB</li>
            <li>Maximum products per import: 1000</li>
          </InfoList>
        </InfoCard>

        <StepsContainer>
          <StepCard>
            <StepNumber>1</StepNumber>
            <StepTitle>Download Template</StepTitle>
            <StepDescription>
              Get the CSV template with the correct format and sample data
            </StepDescription>
            <ActionButton variant="secondary" onClick={downloadTemplate}>
              <FaDownload />
              Download Template
            </ActionButton>
          </StepCard>

          <StepCard>
            <StepNumber>2</StepNumber>
            <StepTitle>Prepare Your Data</StepTitle>
            <StepDescription>
              Fill in your product information using the template format
            </StepDescription>
            <ActionButton variant="default">
              <FaTable />
              Format Guide
            </ActionButton>
          </StepCard>

          <StepCard>
            <StepNumber>3</StepNumber>
            <StepTitle>Upload & Import</StepTitle>
            <StepDescription>
              Upload your CSV file and let us handle the rest
            </StepDescription>
            <ActionButton variant="default">
              <FaCloud />
              Ready to Upload
            </ActionButton>
          </StepCard>
        </StepsContainer>

        <UploadArea
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon>
            <FaFileCsv />
          </UploadIcon>
          <UploadText>
            {selectedFile ? selectedFile.name : 'Drop your CSV file here'}
          </UploadText>
          <UploadSubtext>
            {selectedFile
              ? `File size: ${(selectedFile.size / 1024).toFixed(1)} KB`
              : 'or click to browse and select a file'}
          </UploadSubtext>

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.md,
              justifyContent: 'center',
            }}
          >
            <ActionButton
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              style={{ maxWidth: '200px' }}
            >
              <FaUpload />
              Choose File
            </ActionButton>

            {selectedFile && (
              <ActionButton
                variant="primary"
                onClick={simulateImport}
                style={{ maxWidth: '200px' }}
              >
                <FaFileImport />
                Start Import
              </ActionButton>
            )}
          </div>

          <FileInput
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileInputChange}
          />
        </UploadArea>

        {selectedFile && (
          <InfoCard>
            <InfoHeader>
              <FaCheck />
              File Ready for Import
            </InfoHeader>
            <InfoList>
              <li>
                <strong>File:</strong> {selectedFile.name}
              </li>
              <li>
                <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(1)}{' '}
                KB
              </li>
              <li>
                <strong>Type:</strong> {selectedFile.type}
              </li>
              <li>
                <strong>Modified:</strong>{' '}
                {new Date(selectedFile.lastModified).toLocaleDateString()}
              </li>
            </InfoList>
          </InfoCard>
        )}
      </Content>
    </Container>
  );
};

export default BulkImportTab;
