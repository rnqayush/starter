import { useState } from 'react';
import styled from 'styled-components';
import {
  FaCar,
  FaUpload,
  FaSave,
  FaImage,
  FaTimes,
  FaCheck,
  FaEdit,
  FaClock,
  FaExclamationTriangle,
  FaInfoCircle,
  FaDollarSign,
  FaRoad,
  FaGasPump,
  FaCogs,
  FaPalette,
  FaIdCard,
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
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Description = styled.p`
  color: ${theme.colors.gray600};
  font-size: 1rem;
  line-height: 1.5;
`;

const FormContainer = styled.div`
  padding: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FormSection = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};

  &.single {
    grid-template-columns: 1fr;
  }

  &.two-col {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  .required {
    color: ${theme.colors.error};
  }
`;

const Input = styled.input.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})`
  padding: ${theme.spacing.md};
  border: 2px solid
    ${props => (props.hasError ? theme.colors.error : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${props =>
      props.hasError ? theme.colors.error : theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }

  &:disabled {
    background: ${theme.colors.gray100};
    cursor: not-allowed;
  }
`;

const Select = styled.select.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})`
  padding: ${theme.spacing.md};
  border: 2px solid
    ${props => (props.hasError ? theme.colors.error : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props =>
      props.hasError ? theme.colors.error : theme.colors.primary};
  }

  &:disabled {
    background: ${theme.colors.gray100};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})`
  padding: ${theme.spacing.md};
  border: 2px solid
    ${props => (props.hasError ? theme.colors.error : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: ${theme.colors.white};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props =>
      props.hasError ? theme.colors.error : theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.8rem;
  margin-top: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const HelpText = styled.div`
  color: ${theme.colors.gray500};
  font-size: 0.8rem;
  margin-top: ${theme.spacing.xs};
`;

const ImageUploadSection = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  background: ${theme.colors.gray50};

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }

  &.drag-over {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}20;
  }
`;

const ImageUploadIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.gray400};
  margin-bottom: ${theme.spacing.md};
`;

const ImageUploadText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const ImageUploadSubtext = styled.div`
  color: ${theme.colors.gray500};
  font-size: 0.9rem;
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  border: 2px solid ${theme.colors.gray200};
  background: ${theme.colors.white};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: ${theme.spacing.xs};
  right: ${theme.spacing.xs};
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.errorDark};
    transform: scale(1.1);
  }
`;

const PricingSection = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const PriceDisplay = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  border: 2px solid ${theme.colors.primary}20;
  margin-bottom: ${theme.spacing.lg};
`;

const PriceAmount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const PriceLabel = styled.div`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const StatusSection = styled.div`
  background: ${theme.colors.gray50};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
  margin-bottom: ${theme.spacing.lg};
`;

const StatusIndicator = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'status',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background: ${props => {
    switch (props.status) {
      case 'draft':
        return theme.colors.gray100;
      case 'active':
        return theme.colors.success + '20';
      case 'pending':
        return theme.colors.warning + '20';
      default:
        return theme.colors.gray100;
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'draft':
        return theme.colors.gray700;
      case 'active':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      default:
        return theme.colors.gray700;
    }
  }};
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'variant',
})`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  min-width: 140px;
  justify-content: center;

  background: ${props => {
    switch (props.variant) {
      case 'primary':
        return theme.colors.primary;
      case 'success':
        return theme.colors.success;
      case 'secondary':
        return theme.colors.white;
      default:
        return theme.colors.gray200;
    }
  }};

  color: ${props => {
    switch (props.variant) {
      case 'primary':
        return theme.colors.white;
      case 'success':
        return theme.colors.white;
      case 'secondary':
        return theme.colors.gray700;
      default:
        return theme.colors.gray700;
    }
  }};

  border: ${props => {
    switch (props.variant) {
      case 'primary':
        return 'none';
      case 'success':
        return 'none';
      case 'secondary':
        return `2px solid ${theme.colors.gray200}`;
      default:
        return `1px solid ${theme.colors.gray300}`;
    }
  }};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};

    background: ${props => {
      switch (props.variant) {
        case 'primary':
          return theme.colors.primaryDark;
        case 'success':
          return theme.colors.successDark;
        case 'secondary':
          return theme.colors.gray50;
        default:
          return theme.colors.gray300;
      }
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const AddVehicleTab = ({ _dealer }) => {
  const [formData, setFormData] = useState({
    // Basic Information
    vin: '',
    year: '',
    make: '',
    model: '',
    trim: '',
    bodyStyle: '',

    // Engine & Performance
    engine: '',
    transmission: '',
    drivetrain: '',
    fuelType: '',
    mpgCity: '',
    mpgHighway: '',

    // Exterior & Interior
    exteriorColor: '',
    interiorColor: '',
    interiorMaterial: '',

    // Condition & History
    condition: '',
    mileage: '',
    previousOwners: '1',
    accidentHistory: 'no',
    serviceHistory: 'yes',

    // Pricing
    msrp: '',
    price: '',
    costPrice: '',

    // Inventory
    stock: '1',
    location: '',

    // Description & Features
    description: '',
    features: '',

    // Status
    status: 'draft',
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const makes = [
    'Audi',
    'BMW',
    'Chevrolet',
    'Ford',
    'Honda',
    'Hyundai',
    'Kia',
    'Lexus',
    'Mercedes-Benz',
    'Nissan',
    'Porsche',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo',
  ];

  const bodyStyles = [
    'Sedan',
    'SUV',
    'Hatchback',
    'Coupe',
    'Convertible',
    'Wagon',
    'Pickup Truck',
    'Van',
    'Crossover',
  ];

  const fuelTypes = [
    'Gasoline',
    'Diesel',
    'Hybrid',
    'Electric',
    'Plug-in Hybrid',
  ];

  const transmissions = [
    'Manual',
    'Automatic',
    'CVT',
    'Semi-Automatic',
    'Dual-Clutch',
  ];

  const drivetrains = ['FWD', 'RWD', 'AWD', '4WD'];

  const conditions = ['New', 'Used', 'Certified Pre-Owned'];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = event => {
          setImages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file,
              url: event.target.result,
              name: file.name,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = imageId => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      'vin',
      'year',
      'make',
      'model',
      'condition',
      'mileage',
      'price',
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // VIN validation (basic)
    if (formData.vin && formData.vin.length !== 17) {
      newErrors.vin = 'VIN must be exactly 17 characters';
    }

    // Year validation
    if (
      formData.year &&
      (formData.year < 1900 || formData.year > currentYear + 1)
    ) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
    }

    // Mileage validation
    if (formData.mileage && formData.mileage < 0) {
      newErrors.mileage = 'Mileage cannot be negative';
    }

    // Price validation
    if (formData.price && formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    // MPG validation
    if (formData.mpgCity && (formData.mpgCity <= 0 || formData.mpgCity > 100)) {
      newErrors.mpgCity = 'City MPG must be between 1 and 100';
    }

    if (
      formData.mpgHighway &&
      (formData.mpgHighway <= 0 || formData.mpgHighway > 100)
    ) {
      newErrors.mpgHighway = 'Highway MPG must be between 1 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          vin: '',
          year: '',
          make: '',
          model: '',
          trim: '',
          bodyStyle: '',
          engine: '',
          transmission: '',
          drivetrain: '',
          fuelType: '',
          mpgCity: '',
          mpgHighway: '',
          exteriorColor: '',
          interiorColor: '',
          interiorMaterial: '',
          condition: '',
          mileage: '',
          previousOwners: '1',
          accidentHistory: 'no',
          serviceHistory: 'yes',
          msrp: '',
          price: '',
          costPrice: '',
          stock: '1',
          location: '',
          description: '',
          features: '',
          status: 'draft',
        });
        setImages([]);
        setSubmitStatus('');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: 'draft' }));
    handleSubmit();
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: 'active' }));
    handleSubmit();
  };

  const formatPrice = price => {
    if (!price) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Container>
      <Header>
        <Title>
          <FaCar />
          Add New Vehicle
        </Title>
        <Description>
          Add a new vehicle to your inventory with detailed specifications,
          pricing, and images. All required fields must be completed before
          publishing.
        </Description>
      </Header>

      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormGrid>
            <div>
              {/* Basic Information */}
              <FormSection>
                <SectionTitle>
                  <FaIdCard />
                  Basic Information
                </SectionTitle>

                <FormRow>
                  <FormGroup>
                    <Label>
                      VIN <span className="required">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="vin"
                      value={formData.vin}
                      onChange={handleInputChange}
                      placeholder="Enter 17-character VIN"
                      maxLength="17"
                      hasError={!!errors.vin}
                    />
                    {errors.vin && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.vin}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Year <span className="required">*</span>
                    </Label>
                    <Select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      hasError={!!errors.year}
                    >
                      <option value="">Select Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                    {errors.year && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.year}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Make <span className="required">*</span>
                    </Label>
                    <Select
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      hasError={!!errors.make}
                    >
                      <option value="">Select Make</option>
                      {makes.map(make => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </Select>
                    {errors.make && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.make}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Model <span className="required">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="Enter model name"
                      hasError={!!errors.model}
                    />
                    {errors.model && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.model}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Trim Level</Label>
                    <Input
                      type="text"
                      name="trim"
                      value={formData.trim}
                      onChange={handleInputChange}
                      placeholder="e.g., LX, EX, Sport"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Body Style</Label>
                    <Select
                      name="bodyStyle"
                      value={formData.bodyStyle}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Body Style</option>
                      {bodyStyles.map(style => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Condition <span className="required">*</span>
                    </Label>
                    <Select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      hasError={!!errors.condition}
                    >
                      <option value="">Select Condition</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </Select>
                    {errors.condition && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.condition}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>
              </FormSection>

              {/* Engine & Performance */}
              <FormSection>
                <SectionTitle>
                  <FaCogs />
                  Engine & Performance
                </SectionTitle>

                <FormRow>
                  <FormGroup>
                    <Label>Engine</Label>
                    <Input
                      type="text"
                      name="engine"
                      value={formData.engine}
                      onChange={handleInputChange}
                      placeholder="e.g., 2.0L Turbo I4"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Transmission</Label>
                    <Select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Transmission</option>
                      {transmissions.map(trans => (
                        <option key={trans} value={trans}>
                          {trans}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Drivetrain</Label>
                    <Select
                      name="drivetrain"
                      value={formData.drivetrain}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Drivetrain</option>
                      {drivetrains.map(drive => (
                        <option key={drive} value={drive}>
                          {drive}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Fuel Type</Label>
                    <Select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Fuel Type</option>
                      {fuelTypes.map(fuel => (
                        <option key={fuel} value={fuel}>
                          {fuel}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      <FaGasPump />
                      City MPG
                    </Label>
                    <Input
                      type="number"
                      name="mpgCity"
                      value={formData.mpgCity}
                      onChange={handleInputChange}
                      placeholder="25"
                      min="1"
                      max="100"
                      hasError={!!errors.mpgCity}
                    />
                    {errors.mpgCity && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.mpgCity}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <FaRoad />
                      Highway MPG
                    </Label>
                    <Input
                      type="number"
                      name="mpgHighway"
                      value={formData.mpgHighway}
                      onChange={handleInputChange}
                      placeholder="32"
                      min="1"
                      max="100"
                      hasError={!!errors.mpgHighway}
                    />
                    {errors.mpgHighway && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.mpgHighway}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>
              </FormSection>

              {/* Exterior & Interior */}
              <FormSection>
                <SectionTitle>
                  <FaPalette />
                  Exterior & Interior
                </SectionTitle>

                <FormRow>
                  <FormGroup>
                    <Label>Exterior Color</Label>
                    <Input
                      type="text"
                      name="exteriorColor"
                      value={formData.exteriorColor}
                      onChange={handleInputChange}
                      placeholder="e.g., Crystal Black Pearl"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Interior Color</Label>
                    <Input
                      type="text"
                      name="interiorColor"
                      value={formData.interiorColor}
                      onChange={handleInputChange}
                      placeholder="e.g., Black"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Interior Material</Label>
                    <Select
                      name="interiorMaterial"
                      value={formData.interiorMaterial}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Material</option>
                      <option value="Cloth">Cloth</option>
                      <option value="Leather">Leather</option>
                      <option value="Synthetic Leather">
                        Synthetic Leather
                      </option>
                      <option value="Alcantara">Alcantara</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Mileage <span className="required">*</span>
                    </Label>
                    <Input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      placeholder="25000"
                      min="0"
                      hasError={!!errors.mileage}
                    />
                    {errors.mileage && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.mileage}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>
              </FormSection>

              {/* Vehicle History */}
              <FormSection>
                <SectionTitle>
                  <FaInfoCircle />
                  Vehicle History
                </SectionTitle>

                <FormRow>
                  <FormGroup>
                    <Label>Previous Owners</Label>
                    <Select
                      name="previousOwners"
                      value={formData.previousOwners}
                      onChange={handleInputChange}
                    >
                      <option value="1">1 Owner</option>
                      <option value="2">2 Owners</option>
                      <option value="3">3 Owners</option>
                      <option value="4+">4+ Owners</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Accident History</Label>
                    <Select
                      name="accidentHistory"
                      value={formData.accidentHistory}
                      onChange={handleInputChange}
                    >
                      <option value="no">No Accidents</option>
                      <option value="minor">Minor Accident</option>
                      <option value="major">Major Accident</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Service History</Label>
                    <Select
                      name="serviceHistory"
                      value={formData.serviceHistory}
                      onChange={handleInputChange}
                    >
                      <option value="yes">Complete Service Records</option>
                      <option value="partial">Partial Service Records</option>
                      <option value="no">No Service Records</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Stock Quantity</Label>
                    <Input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="1"
                    />
                  </FormGroup>
                </FormRow>
              </FormSection>

              {/* Description & Features */}
              <FormSection>
                <SectionTitle>
                  <FaInfoCircle />
                  Description & Features
                </SectionTitle>

                <FormRow className="single">
                  <FormGroup>
                    <Label>Vehicle Description</Label>
                    <TextArea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the vehicle's condition, special features, and any additional information..."
                      rows="4"
                    />
                    <HelpText>
                      Provide a detailed description that will help customers
                      understand the vehicle's condition and features.
                    </HelpText>
                  </FormGroup>
                </FormRow>

                <FormRow className="single">
                  <FormGroup>
                    <Label>Key Features</Label>
                    <TextArea
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      placeholder="e.g., Sunroof, Heated Seats, Navigation System, Backup Camera..."
                      rows="3"
                    />
                    <HelpText>
                      List the key features and options that come with this
                      vehicle, separated by commas.
                    </HelpText>
                  </FormGroup>
                </FormRow>
              </FormSection>
            </div>

            <div>
              {/* Pricing Section */}
              <FormSection>
                <SectionTitle>
                  <FaDollarSign />
                  Pricing
                </SectionTitle>

                <PriceDisplay>
                  <PriceAmount>{formatPrice(formData.price)}</PriceAmount>
                  <PriceLabel>Selling Price</PriceLabel>
                </PriceDisplay>

                <FormRow className="single">
                  <FormGroup>
                    <Label>MSRP</Label>
                    <Input
                      type="number"
                      name="msrp"
                      value={formData.msrp}
                      onChange={handleInputChange}
                      placeholder="35000"
                      min="0"
                    />
                    <HelpText>Manufacturer's Suggested Retail Price</HelpText>
                  </FormGroup>
                </FormRow>

                <FormRow className="single">
                  <FormGroup>
                    <Label>
                      Selling Price <span className="required">*</span>
                    </Label>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="32000"
                      min="0"
                      hasError={!!errors.price}
                    />
                    {errors.price && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.price}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow className="single">
                  <FormGroup>
                    <Label>Cost Price</Label>
                    <Input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleInputChange}
                      placeholder="28000"
                      min="0"
                    />
                    <HelpText>Your acquisition cost (internal use)</HelpText>
                  </FormGroup>
                </FormRow>

                {formData.price && formData.costPrice && (
                  <PricingSection>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: theme.spacing.sm,
                        fontWeight: 600,
                      }}
                    >
                      <span>Profit Margin:</span>
                      <span style={{ color: theme.colors.success }}>
                        {formatPrice(formData.price - formData.costPrice)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                        color: theme.colors.gray600,
                      }}
                    >
                      <span>Margin %:</span>
                      <span>
                        {(
                          ((formData.price - formData.costPrice) /
                            formData.price) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </PricingSection>
                )}
              </FormSection>

              {/* Status Section */}
              <StatusSection>
                <SectionTitle>Status</SectionTitle>

                <StatusIndicator status={formData.status}>
                  {formData.status === 'draft' && <FaEdit />}
                  {formData.status === 'active' && <FaCheck />}
                  {formData.status === 'pending' && <FaClock />}

                  {formData.status === 'draft' && 'Draft - Not Published'}
                  {formData.status === 'active' &&
                    'Active - Visible to Customers'}
                  {formData.status === 'pending' && 'Pending Review'}
                </StatusIndicator>

                <HelpText>
                  {formData.status === 'draft' &&
                    'This vehicle is saved as a draft and not visible to customers yet.'}
                  {formData.status === 'active' &&
                    'This vehicle is published and visible to customers on your website.'}
                  {formData.status === 'pending' &&
                    'This vehicle is pending review before going live.'}
                </HelpText>
              </StatusSection>

              {/* Image Upload Section */}
              <FormSection>
                <SectionTitle>
                  <FaImage />
                  Vehicle Images
                </SectionTitle>

                <ImageUploadSection
                  onClick={() => document.getElementById('imageInput').click()}
                >
                  <ImageUploadIcon>
                    <FaUpload />
                  </ImageUploadIcon>
                  <ImageUploadText>Upload Vehicle Images</ImageUploadText>
                  <ImageUploadSubtext>
                    Drag & drop images here or click to browse
                    <br />
                    Supports: JPG, PNG, WebP (Max 10MB each)
                  </ImageUploadSubtext>
                </ImageUploadSection>

                <FileInput
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />

                {images.length > 0 && (
                  <ImagePreviewGrid>
                    {images.map(image => (
                      <ImagePreview key={image.id}>
                        <PreviewImage src={image.url} alt={image.name} />
                        <RemoveImageButton
                          onClick={e => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                        >
                          <FaTimes />
                        </RemoveImageButton>
                      </ImagePreview>
                    ))}
                  </ImagePreviewGrid>
                )}

                <HelpText>
                  Upload high-quality images from multiple angles. The first
                  image will be used as the main listing photo.
                </HelpText>
              </FormSection>
            </div>
          </FormGrid>
        </FormContainer>

        <ActionButtons>
          {submitStatus === 'success' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                color: theme.colors.success,
                fontWeight: 600,
              }}
            >
              <FaCheck />
              Vehicle saved successfully!
            </div>
          )}

          {submitStatus === 'error' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                color: theme.colors.error,
                fontWeight: 600,
              }}
            >
              <FaExclamationTriangle />
              Please fix the errors above
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            <FaSave />
            Save Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            onClick={handlePublish}
          >
            {isSubmitting ? (
              <>
                <FaClock />
                Publishing...
              </>
            ) : (
              <>
                <FaCheck />
                Publish Vehicle
              </>
            )}
          </Button>
        </ActionButtons>
      </form>
    </Container>
  );
};

export default AddVehicleTab;
