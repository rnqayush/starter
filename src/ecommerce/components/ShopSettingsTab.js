import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaStore,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaClock,
  FaSave,
  FaEdit,
  FaUpload,
  FaCamera,
  FaBell,
  FaToggleOn,
  FaToggleOff,
  FaShieldAlt,
  FaTimes,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const SettingsSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.primary}20;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.primary};
  font-size: 1.2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: ${theme.spacing.xs} 0 0 0;
`;

const SectionContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.gray900};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
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

  &:disabled {
    background: ${theme.colors.gray100};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
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

const Select = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ImagePreview = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  border: 2px solid ${theme.colors.gray200};
`;

const ImagePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  background: ${theme.colors.gray100};
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray500};
  font-size: 2rem;
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  input {
    display: none;
  }
`;

const ToggleSwitch = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'enabled',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  cursor: pointer;

  .toggle-icon {
    font-size: 1.5rem;
    color: ${props =>
      props.enabled ? theme.colors.success : theme.colors.gray400};
    transition: color 0.2s ease;
  }

  .toggle-label {
    font-weight: 500;
    color: ${theme.colors.gray700};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
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

const PrimaryButton = styled(Button)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.primary};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    border-color: ${theme.colors.primaryDark};
  }
`;

const SecondaryButton = styled(Button)`
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  border: 2px solid ${theme.colors.gray200};

  &:hover:not(:disabled) {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray300};
  }
`;

const HoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const DayRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 1fr auto;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm};
    background: ${theme.colors.gray50};
    border-radius: ${theme.borderRadius.sm};
  }
`;

const DayLabel = styled.span`
  font-weight: 500;
  color: ${theme.colors.gray700};
`;

const TimeInput = styled(Input)`
  padding: ${theme.spacing.sm};
`;

const AlertBox = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'type',
})`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};

  ${props => {
    switch (props.type) {
      case 'warning':
        return `
          background: ${theme.colors.warning}20;
          border: 1px solid ${theme.colors.warning}40;
          color: ${theme.colors.warning};
        `;
      case 'error':
        return `
          background: ${theme.colors.error}20;
          border: 1px solid ${theme.colors.error}40;
          color: ${theme.colors.error};
        `;
      default:
        return `
          background: ${theme.colors.info}20;
          border: 1px solid ${theme.colors.info}40;
          color: ${theme.colors.info};
        `;
    }
  }}
`;

const ShopSettingsTab = () => {
  const [settings, setSettings] = useState({
    // Basic Info
    shopName: 'TechMart Downtown',
    description:
      'Your one-stop destination for the latest electronics and gadgets.',
    category: 'Electronics',
    logo: null,
    banner: null,

    // Contact Info
    ownerName: 'John Doe',
    email: 'john@techmart.com',
    phone: '+1 (555) 123-4567',
    website: 'https://techmart.com',

    // Address
    address: '123 Main Street',
    city: 'Downtown',
    state: 'CA',
    zipCode: '90210',
    country: 'United States',

    // Business Hours
    businessHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '12:00', close: '16:00', closed: false },
    },

    // Notification Settings
    notifications: {
      newEnquiries: true,
      orderUpdates: true,
      emailNotifications: true,
      smsNotifications: false,
      weeklyReports: true,
    },

    // Shop Settings
    autoRespond: true,
    showLocation: true,
    allowReviews: true,
    requireApproval: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('shopSettings');
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleImageUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setSettings(prev => ({
          ...prev,
          [field]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to localStorage (in real app, this would be API call)
      localStorage.setItem('shopSettings', JSON.stringify(settings));

      setIsEditing(false);
    // alert('Settings saved successfully!');
    } catch (error) {
    // alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reload settings from localStorage
    const savedSettings = localStorage.getItem('shopSettings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  };

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Automotive',
    'Health & Beauty',
    'Food & Beverages',
  ];

  return (
    <Container>
      <SettingsSection>
        <SectionHeader>
          <SectionIcon>
            <FaStore />
          </SectionIcon>
          <div>
            <SectionTitle>Basic Information</SectionTitle>
            <SectionSubtitle>
              Manage your shop's basic details and branding
            </SectionSubtitle>
          </div>
        </SectionHeader>

        <SectionContent>
          <ImageUploadSection>
            <Label>Shop Logo & Banner</Label>
            <ImagePreview>
              <div>
                <Label>Logo</Label>
                <ImageContainer>
                  {settings.logo ? (
                    <Image src={settings.logo} alt="Shop Logo" />
                  ) : (
                    <ImagePlaceholder>
                      <FaCamera />
                    </ImagePlaceholder>
                  )}
                </ImageContainer>
                <UploadButton>
                  <FaUpload />
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload('logo', e.target.files[0])}
                    disabled={!isEditing}
                  />
                </UploadButton>
              </div>

              <div>
                <Label>Banner</Label>
                <ImageContainer>
                  {settings.banner ? (
                    <Image
                      src={settings.banner}
                      alt="Shop Banner"
                      style={{ width: '240px', height: '120px' }}
                    />
                  ) : (
                    <ImagePlaceholder
                      style={{ width: '240px', height: '120px' }}
                    >
                      <FaCamera />
                    </ImagePlaceholder>
                  )}
                </ImageContainer>
                <UploadButton>
                  <FaUpload />
                  Upload Banner
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      handleImageUpload('banner', e.target.files[0])
                    }
                    disabled={!isEditing}
                  />
                </UploadButton>
              </div>
            </ImagePreview>
          </ImageUploadSection>

          <FormGrid>
            <FormGroup>
              <Label>
                <FaStore />
                Shop Name
              </Label>
              <Input
                type="text"
                value={settings.shopName}
                onChange={e => handleInputChange('shopName', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your shop name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Select
                value={settings.category}
                onChange={e => handleInputChange('category', e.target.value)}
                disabled={!isEditing}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <Label>Description</Label>
              <TextArea
                value={settings.description}
                onChange={e => handleInputChange('description', e.target.value)}
                disabled={!isEditing}
                placeholder="Describe your shop and what you offer"
              />
            </FormGroup>
          </FormGrid>
        </SectionContent>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <SectionIcon>
            <FaUser />
          </SectionIcon>
          <div>
            <SectionTitle>Contact Information</SectionTitle>
            <SectionSubtitle>
              Your contact details for customers
            </SectionSubtitle>
          </div>
        </SectionHeader>

        <SectionContent>
          <FormGrid>
            <FormGroup>
              <Label>
                <FaUser />
                Owner Name
              </Label>
              <Input
                type="text"
                value={settings.ownerName}
                onChange={e => handleInputChange('ownerName', e.target.value)}
                disabled={!isEditing}
                placeholder="Your full name"
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FaEnvelope />
                Email Address
              </Label>
              <Input
                type="email"
                value={settings.email}
                onChange={e => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                placeholder="your@email.com"
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FaPhone />
                Phone Number
              </Label>
              <Input
                type="tel"
                value={settings.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="+1 (555) 123-4567"
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FaGlobe />
                Website (Optional)
              </Label>
              <Input
                type="url"
                value={settings.website}
                onChange={e => handleInputChange('website', e.target.value)}
                disabled={!isEditing}
                placeholder="https://yourwebsite.com"
              />
            </FormGroup>
          </FormGrid>
        </SectionContent>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <SectionIcon>
            <FaMapMarkerAlt />
          </SectionIcon>
          <div>
            <SectionTitle>Address</SectionTitle>
            <SectionSubtitle>Your business location</SectionSubtitle>
          </div>
        </SectionHeader>

        <SectionContent>
          <FormGrid>
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <Label>Street Address</Label>
              <Input
                type="text"
                value={settings.address}
                onChange={e => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                placeholder="123 Main Street"
              />
            </FormGroup>

            <FormGroup>
              <Label>City</Label>
              <Input
                type="text"
                value={settings.city}
                onChange={e => handleInputChange('city', e.target.value)}
                disabled={!isEditing}
                placeholder="City name"
              />
            </FormGroup>

            <FormGroup>
              <Label>State/Province</Label>
              <Input
                type="text"
                value={settings.state}
                onChange={e => handleInputChange('state', e.target.value)}
                disabled={!isEditing}
                placeholder="State or Province"
              />
            </FormGroup>

            <FormGroup>
              <Label>ZIP/Postal Code</Label>
              <Input
                type="text"
                value={settings.zipCode}
                onChange={e => handleInputChange('zipCode', e.target.value)}
                disabled={!isEditing}
                placeholder="12345"
              />
            </FormGroup>

            <FormGroup>
              <Label>Country</Label>
              <Input
                type="text"
                value={settings.country}
                onChange={e => handleInputChange('country', e.target.value)}
                disabled={!isEditing}
                placeholder="Country"
              />
            </FormGroup>
          </FormGrid>
        </SectionContent>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <SectionIcon>
            <FaClock />
          </SectionIcon>
          <div>
            <SectionTitle>Business Hours</SectionTitle>
            <SectionSubtitle>
              Set your operating hours for each day
            </SectionSubtitle>
          </div>
        </SectionHeader>

        <SectionContent>
          <HoursContainer>
            {days.map(day => (
              <DayRow key={day}>
                <DayLabel>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </DayLabel>
                <TimeInput
                  type="time"
                  value={settings.businessHours[day].open}
                  onChange={e => handleHoursChange(day, 'open', e.target.value)}
                  disabled={!isEditing || settings.businessHours[day].closed}
                />
                <TimeInput
                  type="time"
                  value={settings.businessHours[day].close}
                  onChange={e =>
                    handleHoursChange(day, 'close', e.target.value)
                  }
                  disabled={!isEditing || settings.businessHours[day].closed}
                />
                <ToggleSwitch
                  enabled={!settings.businessHours[day].closed}
                  onClick={() =>
                    isEditing &&
                    handleHoursChange(
                      day,
                      'closed',
                      !settings.businessHours[day].closed
                    )
                  }
                >
                  {settings.businessHours[day].closed ? (
                    <FaToggleOff className="toggle-icon" />
                  ) : (
                    <FaToggleOn className="toggle-icon" />
                  )}
                  <span className="toggle-label">
                    {settings.businessHours[day].closed ? 'Closed' : 'Open'}
                  </span>
                </ToggleSwitch>
              </DayRow>
            ))}
          </HoursContainer>
        </SectionContent>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <SectionIcon>
            <FaBell />
          </SectionIcon>
          <div>
            <SectionTitle>Notification Preferences</SectionTitle>
            <SectionSubtitle>Manage how you receive updates</SectionSubtitle>
          </div>
        </SectionHeader>

        <SectionContent>
          <FormGrid>
            <FormGroup>
              <ToggleSwitch
                enabled={settings.notifications.newEnquiries}
                onClick={() =>
                  isEditing &&
                  handleNestedChange(
                    'notifications',
                    'newEnquiries',
                    !settings.notifications.newEnquiries
                  )
                }
              >
                {settings.notifications.newEnquiries ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">New Enquiry Notifications</span>
              </ToggleSwitch>
            </FormGroup>

            <FormGroup>
              <ToggleSwitch
                enabled={settings.notifications.emailNotifications}
                onClick={() =>
                  isEditing &&
                  handleNestedChange(
                    'notifications',
                    'emailNotifications',
                    !settings.notifications.emailNotifications
                  )
                }
              >
                {settings.notifications.emailNotifications ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">Email Notifications</span>
              </ToggleSwitch>
            </FormGroup>

            <FormGroup>
              <ToggleSwitch
                enabled={settings.notifications.smsNotifications}
                onClick={() =>
                  isEditing &&
                  handleNestedChange(
                    'notifications',
                    'smsNotifications',
                    !settings.notifications.smsNotifications
                  )
                }
              >
                {settings.notifications.smsNotifications ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">SMS Notifications</span>
              </ToggleSwitch>
            </FormGroup>

            <FormGroup>
              <ToggleSwitch
                enabled={settings.notifications.weeklyReports}
                onClick={() =>
                  isEditing &&
                  handleNestedChange(
                    'notifications',
                    'weeklyReports',
                    !settings.notifications.weeklyReports
                  )
                }
              >
                {settings.notifications.weeklyReports ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">Weekly Reports</span>
              </ToggleSwitch>
            </FormGroup>
          </FormGrid>
        </SectionContent>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <SectionIcon>
            <FaShieldAlt />
          </SectionIcon>
          <div>
            <SectionTitle>Privacy & Security</SectionTitle>
            <SectionSubtitle>
              Control your shop's privacy settings
            </SectionSubtitle>
          </div>
        </SectionHeader>

        <SectionContent>
          <AlertBox type="warning">
            <FaExclamationTriangle />
            <span>
              Changes to privacy settings will affect how customers can interact
              with your shop.
            </span>
          </AlertBox>

          <FormGrid>
            <FormGroup>
              <ToggleSwitch
                enabled={settings.showLocation}
                onClick={() =>
                  isEditing &&
                  handleInputChange('showLocation', !settings.showLocation)
                }
              >
                {settings.showLocation ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">Show Location to Customers</span>
              </ToggleSwitch>
            </FormGroup>

            <FormGroup>
              <ToggleSwitch
                enabled={settings.allowReviews}
                onClick={() =>
                  isEditing &&
                  handleInputChange('allowReviews', !settings.allowReviews)
                }
              >
                {settings.allowReviews ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">Allow Customer Reviews</span>
              </ToggleSwitch>
            </FormGroup>

            <FormGroup>
              <ToggleSwitch
                enabled={settings.autoRespond}
                onClick={() =>
                  isEditing &&
                  handleInputChange('autoRespond', !settings.autoRespond)
                }
              >
                {settings.autoRespond ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">Auto-respond to Enquiries</span>
              </ToggleSwitch>
            </FormGroup>

            <FormGroup>
              <ToggleSwitch
                enabled={settings.requireApproval}
                onClick={() =>
                  isEditing &&
                  handleInputChange(
                    'requireApproval',
                    !settings.requireApproval
                  )
                }
              >
                {settings.requireApproval ? (
                  <FaToggleOn className="toggle-icon" />
                ) : (
                  <FaToggleOff className="toggle-icon" />
                )}
                <span className="toggle-label">
                  Require Admin Approval for Products
                </span>
              </ToggleSwitch>
            </FormGroup>
          </FormGrid>
        </SectionContent>
      </SettingsSection>

      <ButtonGroup>
        {isEditing ? (
          <>
            <SecondaryButton onClick={handleCancel}>
              <FaTimes />
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={handleSave} disabled={isSaving}>
              <FaSave />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </PrimaryButton>
          </>
        ) : (
          <PrimaryButton onClick={() => setIsEditing(true)}>
            <FaEdit />
            Edit Settings
          </PrimaryButton>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default ShopSettingsTab;
