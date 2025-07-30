import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaCog,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaTrash,
  FaLink,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import FormField from './shared/FormField';
import {
  selectSectionById,
  updateSectionContent,
  selectVendor,
} from '../store/ecommerceManagementSlice';

const SectionContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} ${theme.spacing.xl} 0;
  border-bottom: 1px solid ${theme.colors.gray200};
  padding-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0;
`;

const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ContentWrapper = styled.div`
  padding: 0 ${theme.spacing.xl} ${theme.spacing.xl};
`;

const VisibilityToggle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
`;

const ToggleLabel = styled.span`
  font-weight: 500;
  color: ${theme.colors.gray700};
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props =>
    props.active ? theme.colors.success : theme.colors.gray300};
  color: ${props => (props.active ? theme.colors.white : theme.colors.gray600)};

  &:hover {
    background: ${props =>
      props.active ? theme.colors.successDark : theme.colors.gray400};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background: ${props => (props.active ? theme.colors.primary : 'transparent')};
  color: ${props => (props.active ? theme.colors.white : theme.colors.gray600)};
  border-radius: ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.active ? theme.colors.primaryDark : theme.colors.gray100};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const SocialLinksContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const SocialLinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const SocialLinkItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.color || theme.colors.primary};
  color: ${theme.colors.white};
`;

const SocialLinkInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.success};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.successDark};
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${theme.colors.red500};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.red600};
  }
`;

const FooterLinksContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const FooterLinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FooterLinkItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray200};
`;

const FooterSectionEdit = () => {
  const dispatch = useDispatch();
  const vendor = useSelector(selectVendor);
  const section = useSelector(selectSectionById('footer'));

  const [activeTab, setActiveTab] = useState('basic');
  const [sectionData, setSectionData] = useState({
    visible: true,
    companyName: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialLinks: [],
    footerLinks: [],
    copyrightText: '',
  });

  useEffect(() => {
    if (section) {
      setSectionData({
        visible: section.visible !== false,
        companyName: section.content?.companyName || vendor?.name || '',
        description: section.content?.description || '',
        contactEmail:
          section.content?.contactEmail || vendor?.businessInfo?.email || '',
        contactPhone:
          section.content?.contactPhone || vendor?.businessInfo?.phone || '',
        address:
          section.content?.address || vendor?.businessInfo?.address || '',
        socialLinks: section.content?.socialLinks || [],
        footerLinks: section.content?.footerLinks || [],
        copyrightText:
          section.content?.copyrightText ||
          `© ${new Date().getFullYear()} ${vendor?.name || 'Your Store'}. All rights reserved.`,
      });
    }
  }, [section, vendor]);

  const handleInputChange = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Update Redux state immediately for change tracking
    dispatch(
      updateSectionContent({
        sectionId: 'footer',
        contentUpdates: {
          [field]: value,
        },
      })
    );
  };

  const handlePreview = () => {
    if (vendor?.slug) {
      window.open(`/${vendor.slug}`, '_blank');
    }
  };

  const addSocialLink = () => {
    const newSocialLinks = [
      ...sectionData.socialLinks,
      { platform: 'facebook', url: '', icon: 'FaFacebook' },
    ];
    handleInputChange('socialLinks', newSocialLinks);
  };

  const updateSocialLink = (index, field, value) => {
    const newSocialLinks = [...sectionData.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    handleInputChange('socialLinks', newSocialLinks);
  };

  const removeSocialLink = index => {
    const newSocialLinks = sectionData.socialLinks.filter(
      (_, i) => i !== index
    );
    handleInputChange('socialLinks', newSocialLinks);
  };

  const addFooterLink = () => {
    const newFooterLinks = [...sectionData.footerLinks, { title: '', url: '' }];
    handleInputChange('footerLinks', newFooterLinks);
  };

  const updateFooterLink = (index, field, value) => {
    const newFooterLinks = [...sectionData.footerLinks];
    newFooterLinks[index] = { ...newFooterLinks[index], [field]: value };
    handleInputChange('footerLinks', newFooterLinks);
  };

  const removeFooterLink = index => {
    const newFooterLinks = sectionData.footerLinks.filter(
      (_, i) => i !== index
    );
    handleInputChange('footerLinks', newFooterLinks);
  };

  const getSocialIcon = platform => {
    const icons = {
      facebook: { icon: FaFacebook, color: '#1877F2' },
      twitter: { icon: FaTwitter, color: '#1DA1F2' },
      instagram: { icon: FaInstagram, color: '#E4405F' },
      linkedin: { icon: FaLinkedin, color: '#0A66C2' },
      youtube: { icon: FaYoutube, color: '#FF0000' },
    };
    return icons[platform] || { icon: FaLink, color: theme.colors.primary };
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FaCog />
          Footer Section
        </SectionTitle>
        <PreviewButton onClick={handlePreview}>
          <FaEye />
          Preview Store
        </PreviewButton>
      </SectionHeader>

      <ContentWrapper>
        <VisibilityToggle>
          <ToggleLabel>Section Visibility:</ToggleLabel>
          <ToggleButton
            active={sectionData.visible}
            onClick={() => handleInputChange('visible', !sectionData.visible)}
          >
            {sectionData.visible ? <FaToggleOn /> : <FaToggleOff />}
            {sectionData.visible ? 'Visible' : 'Hidden'}
          </ToggleButton>
        </VisibilityToggle>

        <TabsContainer>
          <Tab
            active={activeTab === 'basic'}
            onClick={() => setActiveTab('basic')}
          >
            Basic Information
          </Tab>
          <Tab
            active={activeTab === 'social'}
            onClick={() => setActiveTab('social')}
          >
            Social Links
          </Tab>
          <Tab
            active={activeTab === 'links'}
            onClick={() => setActiveTab('links')}
          >
            Footer Links
          </Tab>
        </TabsContainer>

        {activeTab === 'basic' && (
          <>
            <FormGrid>
              <FormField
                label="Company Name"
                value={sectionData.companyName}
                onChange={value => handleInputChange('companyName', value)}
                placeholder="Your Store Name"
              />

              <FormField
                label="Contact Email"
                type="email"
                value={sectionData.contactEmail}
                onChange={value => handleInputChange('contactEmail', value)}
                placeholder="contact@yourstore.com"
              />

              <FormField
                label="Contact Phone"
                value={sectionData.contactPhone}
                onChange={value => handleInputChange('contactPhone', value)}
                placeholder="+1 (555) 123-4567"
              />

              <FullWidthField>
                <FormField
                  label="Store Description"
                  value={sectionData.description}
                  onChange={value => handleInputChange('description', value)}
                  placeholder="Brief description of your store..."
                  multiline
                  rows={3}
                />
              </FullWidthField>

              <FullWidthField>
                <FormField
                  label="Address"
                  value={sectionData.address}
                  onChange={value => handleInputChange('address', value)}
                  placeholder="123 Main St, City, State 12345"
                  multiline
                  rows={2}
                />
              </FullWidthField>

              <FullWidthField>
                <FormField
                  label="Copyright Text"
                  value={sectionData.copyrightText}
                  onChange={value => handleInputChange('copyrightText', value)}
                  placeholder={`© ${new Date().getFullYear()} Your Store. All rights reserved.`}
                />
              </FullWidthField>
            </FormGrid>
          </>
        )}

        {activeTab === 'social' && (
          <SocialLinksContainer>
            <SectionSubtitle>Social Media Links</SectionSubtitle>
            <SocialLinksList>
              {sectionData.socialLinks.map((link, index) => {
                const iconData = getSocialIcon(link.platform);
                const IconComponent = iconData.icon;
                return (
                  <SocialLinkItem key={index}>
                    <SocialIcon color={iconData.color}>
                      <IconComponent />
                    </SocialIcon>
                    <select
                      value={link.platform}
                      onChange={e =>
                        updateSocialLink(index, 'platform', e.target.value)
                      }
                      style={{
                        padding: theme.spacing.sm,
                        border: `1px solid ${theme.colors.gray300}`,
                        borderRadius: theme.borderRadius.sm,
                        marginRight: theme.spacing.sm,
                      }}
                    >
                      <option value="facebook">Facebook</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="youtube">YouTube</option>
                    </select>
                    <SocialLinkInput
                      type="url"
                      placeholder={`Enter ${link.platform} URL`}
                      value={link.url}
                      onChange={e =>
                        updateSocialLink(index, 'url', e.target.value)
                      }
                    />
                    <RemoveButton onClick={() => removeSocialLink(index)}>
                      <FaTrash />
                    </RemoveButton>
                  </SocialLinkItem>
                );
              })}
            </SocialLinksList>
            <div style={{ marginTop: theme.spacing.md }}>
              <AddButton onClick={addSocialLink}>
                <FaPlus />
                Add Social Link
              </AddButton>
            </div>
          </SocialLinksContainer>
        )}

        {activeTab === 'links' && (
          <FooterLinksContainer>
            <SectionSubtitle>Footer Links</SectionSubtitle>
            <FooterLinksList>
              {sectionData.footerLinks.map((link, index) => (
                <FooterLinkItem key={index}>
                  <FormField
                    placeholder="Link Title"
                    value={link.title}
                    onChange={value => updateFooterLink(index, 'title', value)}
                    style={{ marginRight: theme.spacing.md, flex: 1 }}
                  />
                  <FormField
                    placeholder="Link URL"
                    value={link.url}
                    onChange={value => updateFooterLink(index, 'url', value)}
                    style={{ flex: 2 }}
                  />
                  <RemoveButton onClick={() => removeFooterLink(index)}>
                    <FaTrash />
                  </RemoveButton>
                </FooterLinkItem>
              ))}
            </FooterLinksList>
            <div style={{ marginTop: theme.spacing.md }}>
              <AddButton onClick={addFooterLink}>
                <FaPlus />
                Add Footer Link
              </AddButton>
            </div>
          </FooterLinksContainer>
        )}
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FooterSectionEdit;
