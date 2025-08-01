import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';
import { selectUser, updateUserProfileAPI } from '../../store/slices/authSlice';
import Header from '../shared/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50 || '#f9fafb'};
  padding-top: 4rem;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

const ProfileCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary || theme.colors.primary} 100%
  );
  padding: ${theme.spacing.xxl};
  text-align: center;
  color: ${theme.colors.white};

  ${media.mobile} {
    padding: ${theme.spacing.xl};
  }
`;

const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid ${theme.colors.white};
  margin-bottom: ${theme.spacing.lg};
  object-fit: cover;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};

  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

const ProfileRole = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  text-transform: capitalize;
`;

const ProfileContent = styled.div`
  padding: ${theme.spacing.xxl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EditButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50 || '#f9fafb'};
  border-radius: ${theme.borderRadius.lg};
`;

const InfoIcon = styled.div`
  color: ${theme.colors.primary};
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xs};
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: ${theme.colors.gray900};
  font-weight: 500;
`;

const EditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  ${media.mobile} {
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
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.gray700};
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
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.lg};
`;

const SaveButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const CancelButton = styled.button`
  background: ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.gray300};
  }
`;

const UserProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    website: user?.website || '',
    businessName: user?.businessName || '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async e => {
    e.preventDefault();

    try {
      const result = await dispatch(updateUserProfileAPI(user.id, formData));

      if (result.success) {
        setIsEditing(false);
      } else {
        console.error('Profile update failed:', result.error);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error('Profile update error:', error);
      // You could show an error message to the user here
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      address: user?.address || '',
      website: user?.website || '',
      businessName: user?.businessName || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ProfileCard>
          <ProfileHeader>
            <ProfileAvatar
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <ProfileName>
              {user.firstName} {user.lastName}
            </ProfileName>
            <ProfileRole>
              {user.role === 'admin'
                ? 'Administrator'
                : user.role === 'business_owner'
                  ? 'Business Owner'
                  : 'Customer'}
            </ProfileRole>
          </ProfileHeader>

          <ProfileContent>
            <SectionTitle>
              Personal Information
              <EditButton onClick={() => setIsEditing(!isEditing)}>
                <FaEdit />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </EditButton>
            </SectionTitle>

            {isEditing ? (
              <EditForm onSubmit={handleSave}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                {user.role === 'business_owner' && (
                  <>
                    <FormGroup>
                      <Label>Business Name</Label>
                      <Input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Website</Label>
                      <Input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </>
                )}

                <ButtonGroup>
                  <CancelButton type="button" onClick={handleCancel}>
                    <FaTimes />
                    Cancel
                  </CancelButton>
                  <SaveButton type="submit">
                    <FaSave />
                    Save Changes
                  </SaveButton>
                </ButtonGroup>
              </EditForm>
            ) : (
              <InfoGrid>
                <InfoItem>
                  <InfoIcon>
                    <FaEnvelope />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Email</InfoLabel>
                    <InfoValue>{user.email}</InfoValue>
                  </InfoContent>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <FaPhone />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Phone</InfoLabel>
                    <InfoValue>{user.phone || 'Not provided'}</InfoValue>
                  </InfoContent>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <FaMapMarkerAlt />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Address</InfoLabel>
                    <InfoValue>{user.address || 'Not provided'}</InfoValue>
                  </InfoContent>
                </InfoItem>

                {user.role === 'business_owner' && (
                  <>
                    <InfoItem>
                      <InfoIcon>
                        <FaUser />
                      </InfoIcon>
                      <InfoContent>
                        <InfoLabel>Business Name</InfoLabel>
                        <InfoValue>
                          {user.businessName || 'Not provided'}
                        </InfoValue>
                      </InfoContent>
                    </InfoItem>

                    <InfoItem>
                      <InfoIcon>
                        <FaGlobe />
                      </InfoIcon>
                      <InfoContent>
                        <InfoLabel>Website</InfoLabel>
                        <InfoValue>
                          {user.website ? (
                            <a
                              href={user.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {user.website}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </InfoValue>
                      </InfoContent>
                    </InfoItem>

                    <InfoItem>
                      <InfoIcon>
                        <FaUser />
                      </InfoIcon>
                      <InfoContent>
                        <InfoLabel>Business Category</InfoLabel>
                        <InfoValue style={{ textTransform: 'capitalize' }}>
                          {user.businessCategory || 'Not specified'}
                        </InfoValue>
                      </InfoContent>
                    </InfoItem>
                  </>
                )}
              </InfoGrid>
            )}
          </ProfileContent>
        </ProfileCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default UserProfilePage;
