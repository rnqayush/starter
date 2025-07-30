import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaUser,
  FaCamera,
  FaSave,
  FaEdit,
  FaBell,
  FaLock,
  FaStore,
  FaToggleOn,
  FaToggleOff,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e5e7eb;
`;

const AvatarUpload = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: scale(1.1);
  }

  input {
    display: none;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const UserRole = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #eff6ff;
  color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const UserStats = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;

  .number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }

  .label {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${props => (props.active ? '#3b82f6' : 'transparent')};
  color: ${props => (props.active ? '#3b82f6' : '#6b7280')};
  font-weight: ${props => (props.active ? '600' : '500')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
  }
`;

const TabContent = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  display: ${props => (props.active ? 'block' : 'none')};
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

const ToggleLabel = styled.div`
  .title {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
  }

  .desc {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

const ToggleIcon = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'enabled',
})`
  font-size: 1.5rem;
  color: ${props => (props.enabled ? '#10b981' : '#9ca3af')};
`;

const SocialLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SocialInput = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .icon {
    padding: 0.75rem;
    background: #f9fafb;
    color: #6b7280;
    border-right: 1px solid #e5e7eb;
  }

  input {
    flex: 1;
    padding: 0.75rem;
    border: none;
    outline: none;
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: white;
  border: 2px solid #3b82f6;

  &:hover:not(:disabled) {
    background: #2563eb;
    border-color: #2563eb;
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;

  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const UserProfile = ({ onClose }) => {
  const { user, updateProfile, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    website: user?.profile?.website || '',
    socialLinks: {
      linkedin: user?.profile?.socialLinks?.linkedin || '',
      twitter: user?.profile?.socialLinks?.twitter || '',
      instagram: user?.profile?.socialLinks?.instagram || '',
      facebook: user?.profile?.socialLinks?.facebook || '',
    },
    preferences: {
      notifications: {
        email: user?.preferences?.notifications?.email ?? true,
        sms: user?.preferences?.notifications?.sms ?? false,
        push: user?.preferences?.notifications?.push ?? true,
      },
      language: user?.preferences?.language || 'en',
      currency: user?.preferences?.currency || 'USD',
    },
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleToggle = (section, setting) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [section]: {
          ...prev.preferences[section],
          [setting]: !prev.preferences[section][setting],
        },
      },
    }));
  };

  const handleSave = async () => {
    const result = await updateProfile({
      name: formData.name,
      phone: formData.phone,
      profile: {
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        socialLinks: formData.socialLinks,
      },
      preferences: formData.preferences,
    });

    if (result.success) {
      setIsEditing(false);
      // Show success message
    }
  };

  const getUserStats = () => {
    if (user?.role === 'seller') {
      return [
        { number: user.seller?.totalProducts || 0, label: 'Products' },
        { number: user.seller?.totalSales || 0, label: 'Sales' },
        { number: user.seller?.rating || 0, label: 'Rating' },
      ];
    } else {
      return [
        {
          number: JSON.parse(localStorage.getItem('userEnquiries') || '[]')
            .length,
          label: 'Enquiries',
        },
        {
          number: JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
            .length,
          label: 'Viewed',
        },
        { number: '4.8', label: 'Rating' },
      ];
    }
  };

  if (!user) return null;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <AvatarContainer>
          <Avatar src={user.avatar} alt={user.name} />
          {isEditing && (
            <AvatarUpload>
              <FaCamera />
              <input type="file" accept="image/*" />
            </AvatarUpload>
          )}
        </AvatarContainer>

        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserRole>
            {user.role === 'seller' ? <FaStore /> : <FaUser />}
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            {user.seller?.verified && ' • Verified'}
          </UserRole>
          <UserStats>
            {getUserStats().map((stat, index) => (
              <StatItem key={index}>
                <div className="number">{stat.number}</div>
                <div className="label">{stat.label}</div>
              </StatItem>
            ))}
          </UserStats>
        </UserInfo>
      </ProfileHeader>

      <TabContainer>
        <Tab
          active={activeTab === 'personal'}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </Tab>
        <Tab
          active={activeTab === 'preferences'}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </Tab>
        <Tab
          active={activeTab === 'security'}
          onClick={() => setActiveTab('security')}
        >
          Security
        </Tab>
        {user.role === 'customer' && (
          <Tab
            active={activeTab === 'seller'}
            onClick={() => setActiveTab('seller')}
          >
            Become Seller
          </Tab>
        )}
      </TabContainer>

      <TabContent active={activeTab === 'personal'}>
        <FormSection>
          <SectionTitle>
            <FaUser />
            Basic Information
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Full Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email Address</Label>
              <Input name="email" value={formData.email} disabled />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            <FormGroup>
              <Label>Location</Label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="City, Country"
              />
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <FaGlobe />
            About & Links
          </SectionTitle>
          <FormGroup>
            <Label>Bio</Label>
            <TextArea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
            />
          </FormGroup>
          <FormGroup>
            <Label>Website</Label>
            <Input
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="https://yourwebsite.com"
            />
          </FormGroup>
          <Label>Social Links</Label>
          <SocialLinksGrid>
            <SocialInput>
              <div className="icon">
                <FaLinkedin />
              </div>
              <input
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="LinkedIn profile URL"
              />
            </SocialInput>
            <SocialInput>
              <div className="icon">
                <FaTwitter />
              </div>
              <input
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Twitter profile URL"
              />
            </SocialInput>
            <SocialInput>
              <div className="icon">
                <FaInstagram />
              </div>
              <input
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Instagram profile URL"
              />
            </SocialInput>
            <SocialInput>
              <div className="icon">
                <FaFacebook />
              </div>
              <input
                name="socialLinks.facebook"
                value={formData.socialLinks.facebook}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Facebook profile URL"
              />
            </SocialInput>
          </SocialLinksGrid>
        </FormSection>
      </TabContent>

      <TabContent active={activeTab === 'preferences'}>
        <FormSection>
          <SectionTitle>
            <FaBell />
            Notifications
          </SectionTitle>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <ToggleSwitch
              onClick={() => handleToggle('notifications', 'email')}
            >
              <ToggleLabel>
                <div className="title">Email Notifications</div>
                <div className="desc">Receive updates via email</div>
              </ToggleLabel>
              <ToggleIcon enabled={formData.preferences.notifications.email}>
                {formData.preferences.notifications.email ? (
                  <FaToggleOn />
                ) : (
                  <FaToggleOff />
                )}
              </ToggleIcon>
            </ToggleSwitch>

            <ToggleSwitch onClick={() => handleToggle('notifications', 'sms')}>
              <ToggleLabel>
                <div className="title">SMS Notifications</div>
                <div className="desc">Receive updates via SMS</div>
              </ToggleLabel>
              <ToggleIcon enabled={formData.preferences.notifications.sms}>
                {formData.preferences.notifications.sms ? (
                  <FaToggleOn />
                ) : (
                  <FaToggleOff />
                )}
              </ToggleIcon>
            </ToggleSwitch>

            <ToggleSwitch onClick={() => handleToggle('notifications', 'push')}>
              <ToggleLabel>
                <div className="title">Push Notifications</div>
                <div className="desc">Receive browser notifications</div>
              </ToggleLabel>
              <ToggleIcon enabled={formData.preferences.notifications.push}>
                {formData.preferences.notifications.push ? (
                  <FaToggleOn />
                ) : (
                  <FaToggleOff />
                )}
              </ToggleIcon>
            </ToggleSwitch>
          </div>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <FaGlobe />
            Regional Settings
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Language</Label>
              <Select
                name="preferences.language"
                value={formData.preferences.language}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Currency</Label>
              <Select
                name="preferences.currency"
                value={formData.preferences.currency}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
                <option value="JPY">JPY (¥)</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>
      </TabContent>

      <TabContent active={activeTab === 'security'}>
        <FormSection>
          <SectionTitle>
            <FaLock />
            Security Settings
          </SectionTitle>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Security features are coming soon. For now, you can update your
            basic information above.
          </p>
        </FormSection>
      </TabContent>

      {user.role === 'customer' && (
        <TabContent active={activeTab === 'seller'}>
          <FormSection>
            <SectionTitle>
              <FaStore />
              Become a Seller
            </SectionTitle>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Join thousands of sellers on our platform and start selling your
              products today!
            </p>
            <PrimaryButton onClick={() => switchRole('seller')}>
              <FaStore />
              Switch to Seller Account
            </PrimaryButton>
          </FormSection>
        </TabContent>
      )}

      <ButtonGroup>
        {isEditing ? (
          <>
            <SecondaryButton onClick={() => setIsEditing(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={handleSave}>
              <FaSave />
              Save Changes
            </PrimaryButton>
          </>
        ) : (
          <PrimaryButton onClick={() => setIsEditing(true)}>
            <FaEdit />
            Edit Profile
          </PrimaryButton>
        )}
      </ButtonGroup>
    </ProfileContainer>
  );
};

export default UserProfile;
