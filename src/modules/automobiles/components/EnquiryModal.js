import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaComment,
  FaCheck,
  FaCar,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};
`;

const ModalContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
  }
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
`;

const VehicleInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const VehicleImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const VehicleDetails = styled.div`
  flex: 1;
`;

const VehicleName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const VehiclePrice = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const VehicleYear = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.gray700};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  color: ${theme.colors.gray400};
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}
    ${theme.spacing.xxl};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}
    ${theme.spacing.xxl};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const InterestGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const InterestOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InterestOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }

  input:checked + & {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
`;

const Checkbox = styled.input`
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.lg};
`;

const Button = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  border: 2px solid ${theme.colors.gray200};

  &:hover:not(:disabled) {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray300};
  }
`;

const SubmitButton = styled(Button)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.primary};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    border-color: ${theme.colors.primaryDark};
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg} auto;
  color: ${theme.colors.white};
  font-size: 2rem;
`;

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const SuccessText = styled.p`
  color: ${theme.colors.gray600};
  margin: 0 0 ${theme.spacing.xl} 0;
`;

const EnquiryModal = ({ isOpen, onClose, vehicle, userInfo = {} }) => {
  const [formData, setFormData] = useState({
    name: userInfo.name || '',
    phone: userInfo.phone || '',
    email: userInfo.email || '',
    message: '',
    interestType: 'purchase',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would typically send the enquiry to your backend
      const enquiryData = {
        ...formData,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        vehiclePrice: vehicle.price,
        vehicleYear: vehicle.year,
        vehicleMake: vehicle.make,
        vehicleModel: vehicle.model,
        timestamp: new Date().toISOString(),
        status: 'pending',
      };

      // Store in localStorage for demo (in real app, this would be in your database)
      const existingEnquiries = JSON.parse(
        localStorage.getItem('vehicleEnquiries') || '[]'
      );
      const newEnquiry = {
        id: Date.now(),
        ...enquiryData,
      };
      localStorage.setItem(
        'vehicleEnquiries',
        JSON.stringify([...existingEnquiries, newEnquiry])
      );

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false);
      setFormData({
        name: userInfo.name || '',
        phone: userInfo.phone || '',
        email: userInfo.email || '',
        message: '',
        interestType: 'purchase',
        agreeToTerms: false,
      });
      setErrors({});
    }
    onClose();
  };

  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {isSuccess ? 'Enquiry Submitted!' : 'Vehicle Enquiry'}
          </ModalTitle>
          <CloseButton onClick={handleClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {isSuccess ? (
            <SuccessMessage>
              <SuccessIcon>
                <FaCheck />
              </SuccessIcon>
              <SuccessTitle>Enquiry Sent Successfully!</SuccessTitle>
              <SuccessText>
                Thank you for your interest in the {vehicle.year} {vehicle.make}{' '}
                {vehicle.model}. The dealer will contact you soon via phone or
                email with pricing details and availability.
              </SuccessText>
              <SubmitButton onClick={handleClose}>
                Continue Browsing
              </SubmitButton>
            </SuccessMessage>
          ) : (
            <>
              <VehicleInfo>
                <VehicleImage src={vehicle.image} alt={vehicle.name} />
                <VehicleDetails>
                  <VehicleName>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </VehicleName>
                  <VehiclePrice>{formatPrice(vehicle.price)}</VehiclePrice>
                  <VehicleYear>
                    {vehicle.trim} •{' '}
                    {vehicle.condition === 'new' ? 'New' : 'Used'}
                  </VehicleYear>
                </VehicleDetails>
              </VehicleInfo>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>
                    <FaUser />
                    Full Name *
                  </Label>
                  <InputWrapper>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      style={{
                        borderColor: errors.name
                          ? theme.colors.error
                          : undefined,
                      }}
                    />
                  </InputWrapper>
                  {errors.name && (
                    <span
                      style={{ color: theme.colors.error, fontSize: '0.9rem' }}
                    >
                      {errors.name}
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FaPhone />
                    Phone Number *
                  </Label>
                  <InputWrapper>
                    <InputIcon>
                      <FaPhone />
                    </InputIcon>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      style={{
                        borderColor: errors.phone
                          ? theme.colors.error
                          : undefined,
                      }}
                    />
                  </InputWrapper>
                  {errors.phone && (
                    <span
                      style={{ color: theme.colors.error, fontSize: '0.9rem' }}
                    >
                      {errors.phone}
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FaEnvelope />
                    Email Address *
                  </Label>
                  <InputWrapper>
                    <InputIcon>
                      <FaEnvelope />
                    </InputIcon>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      style={{
                        borderColor: errors.email
                          ? theme.colors.error
                          : undefined,
                      }}
                    />
                  </InputWrapper>
                  {errors.email && (
                    <span
                      style={{ color: theme.colors.error, fontSize: '0.9rem' }}
                    >
                      {errors.email}
                    </span>
                  )}
                </FormGroup>

                <InterestGroup>
                  <Label>
                    <FaCar />
                    I'm interested in *
                  </Label>
                  <InterestOptions>
                    <InterestOption>
                      <input
                        type="radio"
                        name="interestType"
                        value="purchase"
                        checked={formData.interestType === 'purchase'}
                        onChange={handleInputChange}
                      />
                      Purchasing this vehicle
                    </InterestOption>
                    <InterestOption>
                      <input
                        type="radio"
                        name="interestType"
                        value="financing"
                        checked={formData.interestType === 'financing'}
                        onChange={handleInputChange}
                      />
                      Financing options
                    </InterestOption>
                    <InterestOption>
                      <input
                        type="radio"
                        name="interestType"
                        value="trade"
                        checked={formData.interestType === 'trade'}
                        onChange={handleInputChange}
                      />
                      Trade-in value
                    </InterestOption>
                    <InterestOption>
                      <input
                        type="radio"
                        name="interestType"
                        value="test-drive"
                        checked={formData.interestType === 'test-drive'}
                        onChange={handleInputChange}
                      />
                      Scheduling test drive
                    </InterestOption>
                  </InterestOptions>
                </InterestGroup>

                <FormGroup>
                  <Label>
                    <FaComment />
                    Message (Optional)
                  </Label>
                  <InputWrapper>
                    <InputIcon>
                      <FaComment />
                    </InputIcon>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your preferences, trade-in vehicle, financing needs, or any specific questions..."
                    />
                  </InputWrapper>
                </FormGroup>

                <CheckboxWrapper>
                  <Checkbox
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                  />
                  <CheckboxLabel htmlFor="agreeToTerms">
                    I agree to share my contact information with the dealer and
                    receive communications about this vehicle. By submitting
                    this enquiry, I consent to the processing of my personal
                    data.
                  </CheckboxLabel>
                </CheckboxWrapper>
                {errors.agreeToTerms && (
                  <span
                    style={{ color: theme.colors.error, fontSize: '0.9rem' }}
                  >
                    {errors.agreeToTerms}
                  </span>
                )}

                <ButtonGroup>
                  <CancelButton type="button" onClick={handleClose}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  </SubmitButton>
                </ButtonGroup>
              </Form>
            </>
          )}
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EnquiryModal;
