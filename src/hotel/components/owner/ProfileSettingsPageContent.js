import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaUser,
  FaLock,
  FaSave,
  FaSignOutAlt,
  FaTrashAlt,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { Card, CardContent } from '../../../components/shared/Card';
import { Button } from '../../../components/shared/Button';
import { Input, FormGroup, Label, InputGroup } from '../../../components/shared/Input';
import { theme } from '../../../styles/GlobalStyle';
// import { useAppContext } from '../../context/AppContext'; // Removed - needs Redux migration

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xxl};
  color: ${theme.colors.gray900};
`;

const SettingsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
  max-width: 800px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const LogoutSection = styled.div`
  padding: ${theme.spacing.lg};
  text-align: center;
  border-top: 1px solid ${theme.colors.gray200};
`;

const LogoutText = styled.p`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
`;

const DeleteModal = styled.div`
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
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const ModalIcon = styled.div`
  color: ${theme.colors.error};
  font-size: 3rem;
  margin-bottom: ${theme.spacing.lg};
`;

const ModalTitle = styled.h2`
  color: ${theme.colors.error};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
`;

const ModalText = styled.p`
  color: ${theme.colors.gray700};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
`;

const ConfirmationInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.error};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg} 0;
  font-size: 1rem;
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${theme.colors.errorDark};
  }
`;

const ProfileSettingsPageContent = () => {
  const navigate = useNavigate();
  // TODO: Replace with Redux selectors and actions
  const user = null;
  const setUser = () => {};
  const setUserType = () => {};

  const [profileData, setProfileData] = useState({
    name: user?.name || 'Hotel Owner',
    email: user?.email || 'owner@example.com',
    phone: '+91 9876543210',
    licenseNumber: 'HL123456789',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleProfileChange = e => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = e => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user context
      setUser(prev => ({
        ...prev,
        name: profileData.name,
        email: profileData.email,
      }));

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    setIsUpdating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() === 'delete account') {
      alert(
        'Account deleted successfully. You will be redirected to the homepage.'
      );
      setUser(null);
      setUserType(null);
      navigate('/');
    } else {
      alert('Please type "DELETE ACCOUNT" exactly to confirm deletion.');
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
    setDeleteConfirmation('');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setUser(null);
      setUserType('customer');
      navigate('/');
    }
  };

  return (
    <>
      <PageTitle>Profile Settings</PageTitle>

      <SettingsGrid>
        <Card>
          <CardContent>
            <SectionTitle>
              <FaUser />
              Personal Information
            </SectionTitle>

            <ProfileForm onSubmit={handleProfileSubmit}>
              <InputGroup>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                  />
                </FormGroup>
              </InputGroup>

              <InputGroup>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Hotel License Number</Label>
                  <Input
                    type="text"
                    name="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={handleProfileChange}
                    placeholder="Optional"
                  />
                </FormGroup>
              </InputGroup>

              <FormActions>
                <Button type="submit" disabled={isUpdating} size="large">
                  <FaSave />
                  {isUpdating ? 'Updating...' : 'Save Changes'}
                </Button>
              </FormActions>
            </ProfileForm>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <SectionTitle>
              <FaLock />
              Change Password
            </SectionTitle>

            <ProfileForm onSubmit={handlePasswordSubmit}>
              <FormGroup>
                <Label>Current Password *</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </FormGroup>

              <InputGroup>
                <FormGroup>
                  <Label>New Password *</Label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm New Password *</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </FormGroup>
              </InputGroup>

              <FormActions>
                <Button type="submit" disabled={isUpdating} size="large">
                  <FaLock />
                  {isUpdating ? 'Updating...' : 'Update Password'}
                </Button>
              </FormActions>
            </ProfileForm>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <SectionTitle>
              <FaSignOutAlt />
              Account Actions
            </SectionTitle>

            <LogoutSection>
              <LogoutText>
                Ready to sign out? Click the button below to logout from your
                account.
              </LogoutText>
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing.md,
                  justifyContent: 'center',
                }}
              >
                <Button variant="danger" onClick={handleLogout} size="large">
                  <FaSignOutAlt />
                  Logout
                </Button>
                <Button
                  variant="error"
                  onClick={handleDeleteAccount}
                  size="large"
                >
                  <FaTrashAlt />
                  Delete Account
                </Button>
              </div>
            </LogoutSection>
          </CardContent>
        </Card>
      </SettingsGrid>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal onClick={cancelDeleteAccount}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalIcon>
              <FaExclamationTriangle />
            </ModalIcon>
            <ModalTitle>Delete Account</ModalTitle>
            <ModalText>
              <strong>This action cannot be undone!</strong>
              <br />
              <br />
              Deleting your account will permanently remove:
              <br />
              • All your hotel data and information
              <br />
              • All room listings and details
              <br />
              • All booking history
              <br />
              • Your personal profile and settings
              <br />
              <br />
              To confirm deletion, please type <strong>
                "DELETE ACCOUNT"
              </strong>{' '}
              below:
            </ModalText>
            <ConfirmationInput
              type="text"
              value={deleteConfirmation}
              onChange={e => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE ACCOUNT to confirm"
            />
            <ModalActions>
              <Button
                variant="outline"
                onClick={cancelDeleteAccount}
                size="large"
              >
                Cancel
              </Button>
              <Button
                variant="error"
                onClick={confirmDeleteAccount}
                size="large"
                disabled={deleteConfirmation.toLowerCase() !== 'delete account'}
              >
                <FaTrashAlt />
                Delete Account
              </Button>
            </ModalActions>
          </ModalContent>
        </DeleteModal>
      )}
    </>
  );
};

export default ProfileSettingsPageContent;
