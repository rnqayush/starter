import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaRing,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaClock,
  FaUser,
  FaComment,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import { getVendorById } from '../data/vendors';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const NavHeader = styled.div`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  border-bottom: 1px solid ${theme.colors.gray200};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FormSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
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
  min-height: 120px;
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

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${theme.colors.primary};
`;

const CheckboxLabel = styled.span`
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  margin-top: ${theme.spacing.xl};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const VendorCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 2px solid ${theme.colors.primary}20;
`;

const VendorImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
`;

const VendorName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const VendorMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const SpecialtiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const SpecialtyTag = styled.span`
  background: ${theme.colors.primary}15;
  color: ${theme.colors.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
`;

const InfoCard = styled.div`
  background: ${theme.colors.info}10;
  border: 2px solid ${theme.colors.info}30;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
`;

const InfoTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  line-height: 1.4;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckIcon = styled.div`
  color: ${theme.colors.success};
  font-size: 0.8rem;
  margin-top: 2px;
  flex-shrink: 0;
`;

const SuccessMessage = styled.div`
  background: ${theme.colors.success}10;
  border: 2px solid ${theme.colors.success}30;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.success};
  margin-bottom: ${theme.spacing.md};
`;

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
`;

const SuccessText = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.lg};
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  color: ${theme.colors.gray600};
  font-size: 1.2rem;
`;

const BookingPage = () => {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Event Details
    eventDate: '',
    eventTime: '',
    guestCount: '',
    eventType: 'wedding',
    venue: '',
    budget: '',

    // Services
    services: [],

    // Additional Information
    message: '',
    contactPreference: 'email',
    timeline: '',
  });

  const serviceOptions = [
    'Wedding Planning',
    'Venue Decoration',
    'Floral Arrangements',
    'Photography',
    'Videography',
    'Catering',
    'Music & DJ',
    'Transportation',
    'Cake & Desserts',
    'Hair & Makeup',
  ];

  useEffect(() => {
    const vendorData = getVendorById(vendorSlug);
    setVendor(vendorData);
    setLoading(false);
  }, [vendorSlug]);

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

  const handleCheckboxChange = service => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'eventDate',
      'guestCount',
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (formData.eventDate) {
      const eventDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (eventDate < today) {
        newErrors.eventDate = 'Event date must be in the future';
      }
    }

    // Guest count validation
    if (
      formData.guestCount &&
      (formData.guestCount < 1 || formData.guestCount > 1000)
    ) {
      newErrors.guestCount = 'Guest count must be between 1 and 1000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate booking ID and redirect to confirmation
      const bookingId = 'WED-' + Date.now().toString().slice(-6);
      const confirmationParams = new URLSearchParams({
        booking: bookingId,
        vendor: vendor.id,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        date: formData.eventDate,
        time: formData.eventTime,
        guests: formData.guestCount,
        type: formData.eventType,
        services: formData.services.join(','),
        message: formData.message,
      });

      navigate(
        `/weddings/booking-confirmation?${confirmationParams.toString()}`
      );
    } catch (error) {
    // alert('Failed to submit booking request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingState>Loading booking form...</LoadingState>
      </PageContainer>
    );
  }

  if (!vendor) {
    return (
      <PageContainer>
        <NavHeader>
          <NavContent>
            <BackButton onClick={() => navigate('/weddings')}>
              <FaArrowLeft />
              Back to Vendors
            </BackButton>
          </NavContent>
        </NavHeader>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>Vendor not found</h2>
            <p>The vendor you're trying to book doesn't exist.</p>
          </div>
        </Container>
      </PageContainer>
    );
  }

  if (submitted) {
    return (
      <PageContainer>
        <NavHeader>
          <NavContent>
            <BackButton onClick={() => navigate(`/${vendor.id}`)}>
              <FaArrowLeft />
              Back to Vendor
            </BackButton>
            <PageTitle>
              <FaRing />
              Booking Request Submitted
            </PageTitle>
          </NavContent>
        </NavHeader>
        <Container>
          <SuccessMessage>
            <SuccessIcon>
              <FaCheck />
            </SuccessIcon>
            <SuccessTitle>Request Sent Successfully!</SuccessTitle>
            <SuccessText>
              Thank you for your booking request with {vendor.name}. They will
              review your information and get back to you within 24 hours to
              discuss your wedding plans and check availability.
            </SuccessText>
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.md,
                justifyContent: 'center',
              }}
            >
              <SubmitButton onClick={() => navigate(`/${vendor.id}`)}>
                Back to Vendor
              </SubmitButton>
              <SubmitButton
                onClick={() => navigate('/weddings')}
                style={{
                  background: theme.colors.white,
                  color: theme.colors.primary,
                  border: `2px solid ${theme.colors.primary}`,
                }}
              >
                Browse More Vendors
              </SubmitButton>
            </div>
          </SuccessMessage>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <NavHeader>
        <NavContent>
          <BackButton onClick={() => navigate(`/${vendor.id}`)}>
            <FaArrowLeft />
            Back to Vendor
          </BackButton>
          <PageTitle>
            <FaCalendarAlt />
            Book Consultation
          </PageTitle>
        </NavContent>
      </NavHeader>

      <Container>
        <ContentGrid>
          <FormSection>
            <SectionTitle>
              <FaUser />
              Consultation Request
            </SectionTitle>

            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <div style={{ marginBottom: theme.spacing.xl }}>
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.gray900,
                  }}
                >
                  Contact Information
                </h3>
                <FormRow>
                  <FormGroup>
                    <Label>
                      First Name <span className="required">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      hasError={!!errors.firstName}
                    />
                    {errors.firstName && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.firstName}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Last Name <span className="required">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      hasError={!!errors.lastName}
                    />
                    {errors.lastName && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.lastName}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Email Address <span className="required">*</span>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      hasError={!!errors.email}
                    />
                    {errors.email && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.email}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Phone Number <span className="required">*</span>
                    </Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      hasError={!!errors.phone}
                    />
                    {errors.phone && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.phone}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormRow>
              </div>

              {/* Event Details */}
              <div style={{ marginBottom: theme.spacing.xl }}>
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.gray900,
                  }}
                >
                  Event Details
                </h3>
                <FormRow>
                  <FormGroup>
                    <Label>
                      Event Date <span className="required">*</span>
                    </Label>
                    <Input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      hasError={!!errors.eventDate}
                    />
                    {errors.eventDate && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.eventDate}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Event Time</Label>
                    <Input
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Number of Guests <span className="required">*</span>
                    </Label>
                    <Input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      placeholder="150"
                      min="1"
                      max="1000"
                      hasError={!!errors.guestCount}
                    />
                    {errors.guestCount && (
                      <ErrorMessage>
                        <FaExclamationTriangle />
                        {errors.guestCount}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Event Type</Label>
                    <Select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                    >
                      <option value="wedding">Wedding</option>
                      <option value="engagement">Engagement Party</option>
                      <option value="reception">Reception</option>
                      <option value="rehearsal">Rehearsal Dinner</option>
                      <option value="bridal-shower">Bridal Shower</option>
                      <option value="bachelor-party">
                        Bachelor/Bachelorette Party
                      </option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Venue Location</Label>
                    <Input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Enter venue name or location"
                    />
                    <HelpText>
                      If you already have a venue, please provide the name and
                      address
                    </HelpText>
                  </FormGroup>

                  <FormGroup>
                    <Label>Estimated Budget</Label>
                    <Select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-20k">$10,000 - $20,000</option>
                      <option value="20k-50k">$20,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                    </Select>
                  </FormGroup>
                </FormRow>
              </div>

              {/* Services Needed */}
              <div style={{ marginBottom: theme.spacing.xl }}>
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.gray900,
                  }}
                >
                  Services Needed
                </h3>
                <CheckboxGroup>
                  {serviceOptions.map(service => (
                    <CheckboxItem key={service}>
                      <Checkbox
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleCheckboxChange(service)}
                      />
                      <CheckboxLabel>{service}</CheckboxLabel>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              </div>

              {/* Additional Information */}
              <div style={{ marginBottom: theme.spacing.xl }}>
                <h3
                  style={{
                    marginBottom: theme.spacing.lg,
                    color: theme.colors.gray900,
                  }}
                >
                  Additional Information
                </h3>
                <FormRow className="single">
                  <FormGroup>
                    <Label>
                      <FaComment />
                      Tell us about your vision
                    </Label>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your dream wedding, style preferences, special requirements, or any questions you have..."
                    />
                    <HelpText>
                      Share any specific ideas, themes, or requirements to help
                      us understand your vision better
                    </HelpText>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Preferred Contact Method</Label>
                    <Select
                      name="contactPreference"
                      value={formData.contactPreference}
                      onChange={handleInputChange}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Planning Timeline</Label>
                    <Select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="over-1-year">Over 1 year</option>
                    </Select>
                  </FormGroup>
                </FormRow>
              </div>

              <SubmitButton type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <FaClock />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <FaCalendarAlt />
                    Request Consultation
                  </>
                )}
              </SubmitButton>
            </form>
          </FormSection>

          <Sidebar>
            <VendorCard>
              <VendorImage src={vendor.image} alt={vendor.name} />
              <VendorName>{vendor.name}</VendorName>
              <VendorMeta>
                <MetaItem>
                  <FaMapMarkerAlt />
                  {vendor.city}, {vendor.state}
                </MetaItem>
                <MetaItem>
                  <FaPhoneAlt />
                  {vendor.phone}
                </MetaItem>
                <MetaItem>
                  <FaEnvelope />
                  {vendor.email}
                </MetaItem>
              </VendorMeta>
              <SpecialtiesGrid>
                {vendor.specialties.map((specialty, index) => (
                  <SpecialtyTag key={index}>{specialty}</SpecialtyTag>
                ))}
              </SpecialtiesGrid>
            </VendorCard>

            <InfoCard>
              <InfoTitle>
                <FaInfoCircle />
                What to Expect
              </InfoTitle>
              <InfoList>
                <InfoItem>
                  <CheckIcon>
                    <FaCheck />
                  </CheckIcon>
                  We'll review your request within 24 hours
                </InfoItem>
                <InfoItem>
                  <CheckIcon>
                    <FaCheck />
                  </CheckIcon>
                  Schedule a consultation at your convenience
                </InfoItem>
                <InfoItem>
                  <CheckIcon>
                    <FaCheck />
                  </CheckIcon>
                  Discuss your vision and requirements in detail
                </InfoItem>
                <InfoItem>
                  <CheckIcon>
                    <FaCheck />
                  </CheckIcon>
                  Receive a customized proposal and quote
                </InfoItem>
                <InfoItem>
                  <CheckIcon>
                    <FaCheck />
                  </CheckIcon>
                  No obligation - free consultation
                </InfoItem>
              </InfoList>
            </InfoCard>
          </Sidebar>
        </ContentGrid>
      </Container>
    </PageContainer>
  );
};

export default BookingPage;
