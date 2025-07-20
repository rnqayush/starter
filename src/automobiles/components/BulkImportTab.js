import React, { useState, useRef } from "react";
import styled from "styled-components";
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
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

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

const ActionButton = styled.button`
  background: ${(props) => props.primary ? theme.colors.primary : theme.colors.white};
  color: ${(props) => props.primary ? theme.colors.white : theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;

  &:hover {
    background: ${(props) => props.primary ? theme.colors.primaryDark : theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const UploadSection = styled.div`
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const UploadArea = styled.div`
  border: 2px dashed ${(props) => props.isDragOver ? theme.colors.primary : theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  background: ${(props) => props.isDragOver ? `${theme.colors.primary}10` : theme.colors.white};
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.gray400};
  margin-bottom: ${theme.spacing.lg};
`;

const UploadText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const UploadSubtext = styled.div`
  color: ${theme.colors.gray500};
  font-size: 0.9rem;
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const FileInfo = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const FileIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.colors.success}20;
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.success};
  font-size: 1.2rem;
`;

const FileName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const FileSize = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.error}20;
  }
`;

const ProcessButton = styled.button`
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  width: 100%;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${theme.colors.successDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsSection = styled.div`
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ResultsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  border: 1px solid ${theme.colors.gray200};
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.color || theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ErrorsList = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
  overflow: hidden;
`;

const ErrorItem = styled.div`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};

  &:last-child {
    border-bottom: none;
  }
`;

const ErrorIcon = styled.div`
  color: ${theme.colors.error};
  font-size: 1.1rem;
  margin-top: 2px;
`;

const ErrorDetails = styled.div`
  flex: 1;
`;

const ErrorRow = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.9rem;
`;

const RequiredFields = styled.div`
  background: ${theme.colors.info}10;
  border: 1px solid ${theme.colors.info}30;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const RequiredFieldsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const FieldsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.sm};
`;

const FieldItem = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.xs};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm};
`;

const BulkImportTab = ({ dealer }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
      setResults(null);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock results
    const mockResults = {
      totalRows: 150,
      successfulImports: 142,
      failedImports: 8,
      errors: [
        {
          row: 5,
          message: "Missing required field: VIN",
        },
        {
          row: 12,
          message: "Invalid year format: 'Twenty Twenty Three'",
        },
        {
          row: 23,
          message: "Price must be a number",
        },
        {
          row: 34,
          message: "Make field cannot be empty",
        },
        {
          row: 67,
          message: "Invalid mileage value: -500",
        },
        {
          row: 89,
          message: "Model field cannot be empty",
        },
        {
          row: 101,
          message: "Invalid condition value: 'terrible'",
        },
        {
          row: 128,
          message: "Missing required field: Price",
        },
      ]
    };

    setResults(mockResults);
    setIsProcessing(false);
  };

  const downloadTemplate = () => {
    const csvContent = `VIN,Year,Make,Model,Trim,Body Style,Transmission,Engine,Fuel Type,Drivetrain,Exterior Color,Interior Color,Mileage,Condition,Price,Stock,Description,Features
1HGBH41JXMN109186,2023,Honda,Civic,Sport,Sedan,Manual,1.5L Turbo,Gasoline,FWD,Crystal Black Pearl,Black,15000,New,28500,5,"Sporty and fuel-efficient compact car","Turbo Engine, Sport Suspension, Manual Transmission"
5NPE24AF4FH123456,2022,Hyundai,Elantra,SEL,Sedan,CVT,2.0L,Gasoline,FWD,Phantom Black,Gray,25000,Used,22000,3,"Reliable sedan with great fuel economy","Heated Seats, Backup Camera, Apple CarPlay"
KMHL14JA8MA123456,2021,Hyundai,Elantra,Limited,Sedan,CVT,2.0L,Gasoline,FWD,White,Black,35000,Used,20500,2,"Fully loaded Elantra with premium features","Leather Seats, Sunroof, Premium Audio"`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vehicle_import_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const requiredFields = [
    "VIN", "Year", "Make", "Model", "Trim", "Body Style", 
    "Transmission", "Engine", "Fuel Type", "Drivetrain",
    "Exterior Color", "Interior Color", "Mileage", "Condition", 
    "Price", "Stock", "Description", "Features"
  ];

  return (
    <Container>
      <Header>
        <Title>
          <FaFileImport />
          Bulk Vehicle Import
        </Title>
        <Description>
          Import multiple vehicles at once using a CSV file. Download the template below, fill in your vehicle data, 
          and upload it to quickly add vehicles to your inventory.
        </Description>
      </Header>

      <Content>
        <RequiredFields>
          <RequiredFieldsTitle>
            <FaInfoCircle />
            Required CSV Fields
          </RequiredFieldsTitle>
          <FieldsList>
            {requiredFields.map((field, index) => (
              <FieldItem key={index}>{field}</FieldItem>
            ))}
          </FieldsList>
        </RequiredFields>

        <StepsContainer>
          <StepCard>
            <StepNumber>1</StepNumber>
            <StepTitle>Download Template</StepTitle>
            <StepDescription>
              Download the CSV template with all required fields and sample data to get started.
            </StepDescription>
            <ActionButton onClick={downloadTemplate}>
              <FaDownload />
              Download Template
            </ActionButton>
          </StepCard>

          <StepCard>
            <StepNumber>2</StepNumber>
            <StepTitle>Fill Vehicle Data</StepTitle>
            <StepDescription>
              Open the template in Excel or any spreadsheet application and fill in your vehicle information.
            </StepDescription>
            <ActionButton>
              <FaTable />
              Open in Excel
            </ActionButton>
          </StepCard>

          <StepCard>
            <StepNumber>3</StepNumber>
            <StepTitle>Upload & Import</StepTitle>
            <StepDescription>
              Upload your completed CSV file and we'll process it to add vehicles to your inventory.
            </StepDescription>
            <ActionButton primary disabled={!selectedFile || isProcessing}>
              <FaUpload />
              {selectedFile ? "Ready to Upload" : "Select File First"}
            </ActionButton>
          </StepCard>
        </StepsContainer>

        <UploadSection>
          <UploadArea
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileInput
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
                        <UploadIcon>
              <FaCloud />
            </UploadIcon>
            <UploadText>
              {isDragOver ? "Drop your CSV file here" : "Click to select or drag & drop your CSV file"}
            </UploadText>
            <UploadSubtext>
              Maximum file size: 10MB • Supported format: CSV
            </UploadSubtext>
          </UploadArea>

          {selectedFile && (
            <FileInfo>
              <FileDetails>
                <FileIcon>
                  <FaFileCsv />
                </FileIcon>
                <div>
                  <FileName>{selectedFile.name}</FileName>
                  <FileSize>{formatFileSize(selectedFile.size)}</FileSize>
                </div>
              </FileDetails>
              <RemoveButton onClick={removeFile}>
                <FaTimes />
              </RemoveButton>
            </FileInfo>
          )}

          {selectedFile && (
            <ProcessButton onClick={processFile} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <FaSpinner className="fa-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaUpload />
                  Process Import
                </>
              )}
            </ProcessButton>
          )}
        </UploadSection>

        {results && (
          <ResultsSection>
            <ResultsHeader>
              <ResultsTitle>
                <FaCheck />
                Import Results
              </ResultsTitle>
            </ResultsHeader>

            <StatsGrid>
              <StatCard>
                <StatValue>{results.totalRows}</StatValue>
                <StatLabel>Total Rows</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue color={theme.colors.success}>{results.successfulImports}</StatValue>
                <StatLabel>Successful</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue color={theme.colors.error}>{results.failedImports}</StatValue>
                <StatLabel>Failed</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue color={theme.colors.primary}>
                  {Math.round((results.successfulImports / results.totalRows) * 100)}%
                </StatValue>
                <StatLabel>Success Rate</StatLabel>
              </StatCard>
            </StatsGrid>

            {results.errors.length > 0 && (
              <div>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  color: theme.colors.gray900, 
                  marginBottom: theme.spacing.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm
                }}>
                  <FaExclamationTriangle />
                  Import Errors ({results.errors.length})
                </h4>
                <ErrorsList>
                  {results.errors.map((error, index) => (
                    <ErrorItem key={index}>
                      <ErrorIcon>
                        <FaExclamationTriangle />
                      </ErrorIcon>
                      <ErrorDetails>
                        <ErrorRow>Row {error.row}</ErrorRow>
                        <ErrorMessage>{error.message}</ErrorMessage>
                      </ErrorDetails>
                    </ErrorItem>
                  ))}
                </ErrorsList>
              </div>
            )}

            <div style={{ marginTop: theme.spacing.xl, display: 'flex', gap: theme.spacing.md }}>
              <ActionButton primary>
                <FaEye />
                View Imported Vehicles
              </ActionButton>
              <ActionButton>
                <FaDownload />
                Download Error Report
              </ActionButton>
            </div>
          </ResultsSection>
        )}
      </Content>
    </Container>
  );
};

export default BulkImportTab;
