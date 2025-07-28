import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSave,
  FaGlobe,
  FaAlignLeft,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectVendor,
  selectLoading,
  updatePageSections,
  publishPageContent,
} from '../../store/slices/automobileManagementSlice';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.indigo500}20;
  color: ${theme.colors.indigo500};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`;

const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['filled', 'color'].includes(prop),
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${props => props.color || theme.colors.primary};
  background: ${props => props.filled ? (props.color || theme.colors.primary) : theme.colors.white};
  color: ${props => props.filled ? theme.colors.white : (props.color || theme.colors.primary)};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${props => props.color || theme.colors.primary};
    color: ${theme.colors.white};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Content = styled.div`
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const Section = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const SectionContent = styled.div`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['enabled'].includes(prop),
})`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.enabled ? theme.colors.success : theme.colors.gray300};
  color: ${props => props.enabled ? theme.colors.white : theme.colors.gray600};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.enabled ? theme.colors.successDark : theme.colors.gray400};
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
`;

const ListItemContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
`;

const AddButton = styled.button`
  padding: ${theme.spacing.md};
  border: 2px dashed ${theme.colors.gray300};
  background: ${theme.colors.gray50};
  color: ${theme.colors.gray600};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const RemoveButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.errorDark};
  }
`;

const FooterSectionEdit = ({ dealer }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectPageSections);
  const vendor = useSelector(selectVendor);
  const loading = useSelector(selectLoading);
  
  const [sectionContent, setSectionContent] = useState({
    // Social Media
    showSocialMedia: true,
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
    
    // Business Hours
    showHours: true,
    businessHours: [
      { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    
    // Quick Links
    showQuickLinks: true,
    quickLinks: [
      { name: 'Home', url: '/', visible: true },
      { name: 'Vehicles', url: '/vehicles', visible: true },
      { name: 'About Us', url: '/about', visible: true },
      { name: 'Contact', url: '/contact', visible: true },
    ],
    
    // Support & Contact
    showSupport: true,
    supportInfo: {
      email: '',
      phone: '',
      address: '',
      supportHours: 'Mon-Fri 9AM-6PM',
    },
    
    customText: '',
  });
  
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize with data from Redux state and vendor
  useEffect(() => {
    const footerSection = sections.find(s => s.id === 'footer');
    if (footerSection?.content && Object.keys(footerSection.content).length > 0) {
      setSectionContent({
        ...sectionContent,
        ...footerSection.content,
      });
    } else if (vendor) {
      // Initialize with vendor data
      setSectionContent(prev => ({
        ...prev,
        supportInfo: {
          ...prev.supportInfo,
          email: vendor.contactInfo?.email || '',
          phone: vendor.contactInfo?.phone || '',
          address: vendor.contactInfo?.address || '',
        },
        customText: vendor.businessInfo?.description || '',
      }));
    }
  }, [sections, vendor]);

  const updateContent = (field, value) => {
    setSectionContent(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const updateNestedContent = (parent, field, value) => {
    setSectionContent(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateBusinessHours = (index, field, value) => {
    const newHours = [...sectionContent.businessHours];
    newHours[index] = { ...newHours[index], [field]: value };
    updateContent('businessHours', newHours);
  };

  const updateQuickLink = (index, field, value) => {
    const newLinks = [...sectionContent.quickLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateContent('quickLinks', newLinks);
  };

  const addQuickLink = () => {
    const newLinks = [...sectionContent.quickLinks, { name: '', url: '', visible: true }];
    updateContent('quickLinks', newLinks);
  };

  const removeQuickLink = (index) => {
    const newLinks = sectionContent.quickLinks.filter((_, i) => i !== index);
    updateContent('quickLinks', newLinks);
  };

  const saveChanges = () => {
    const updatedSections = sections.map(section => 
      section.id === 'footer' 
        ? { ...section, content: { ...section.content, ...sectionContent } }
        : section
    );
    
    dispatch(updatePageSections(updatedSections));
    setHasChanges(false);
    alert('Footer section saved successfully!');
  };

  const publishChanges = () => {
    const updatedSections = sections.map(section => 
      section.id === 'footer' 
        ? { ...section, content: { ...section.content, ...sectionContent } }
        : section
    );
    
    dispatch(publishPageContent(updatedSections));
    setHasChanges(false);
    alert('Footer section published successfully! Changes are now live.');
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Loading Footer Section...</HeaderTitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <SectionIcon>
            <FaAlignLeft />
          </SectionIcon>
          <HeaderTitle>Footer Section</HeaderTitle>
        </HeaderLeft>
        <HeaderActions>
          <ActionButton 
            onClick={saveChanges}
            disabled={!hasChanges}
            color={theme.colors.blue500}
          >
            <FaSave />
            Save Changes
          </ActionButton>
          <ActionButton 
            onClick={publishChanges}
            disabled={!hasChanges}
            filled
            color={theme.colors.success}
          >
            <FaGlobe />
            Save & Go Public
          </ActionButton>
        </HeaderActions>
      </Header>

      <Content>
        {/* Social Media Links */}
        <Section>
          <SectionHeader>
            <SectionTitle>Social Media Links</SectionTitle>
            <ToggleButton
              enabled={sectionContent.showSocialMedia}
              onClick={() => updateContent('showSocialMedia', !sectionContent.showSocialMedia)}
            >
              {sectionContent.showSocialMedia ? <FaEye /> : <FaEyeSlash />}
            </ToggleButton>
          </SectionHeader>
          {sectionContent.showSocialMedia && (
            <SectionContent>
              <FormRow>
                <FormGroup>
                  <Label>Facebook URL</Label>
                  <Input
                    type="url"
                    value={sectionContent.socialMediaLinks.facebook}
                    onChange={(e) => updateNestedContent('socialMediaLinks', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Twitter URL</Label>
                  <Input
                    type="url"
                    value={sectionContent.socialMediaLinks.twitter}
                    onChange={(e) => updateNestedContent('socialMediaLinks', 'twitter', e.target.value)}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Instagram URL</Label>
                  <Input
                    type="url"
                    value={sectionContent.socialMediaLinks.instagram}
                    onChange={(e) => updateNestedContent('socialMediaLinks', 'instagram', e.target.value)}
                    placeholder="https://instagram.com/yourprofile"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>LinkedIn URL</Label>
                  <Input
                    type="url"
                    value={sectionContent.socialMediaLinks.linkedin}
                    onChange={(e) => updateNestedContent('socialMediaLinks', 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>YouTube URL</Label>
                <Input
                  type="url"
                  value={sectionContent.socialMediaLinks.youtube}
                  onChange={(e) => updateNestedContent('socialMediaLinks', 'youtube', e.target.value)}
                  placeholder="https://youtube.com/channel/yourchannel"
                />
              </FormGroup>
            </SectionContent>
          )}
        </Section>

        {/* Business Hours */}
        <Section>
          <SectionHeader>
            <SectionTitle>Business Hours</SectionTitle>
            <ToggleButton
              enabled={sectionContent.showHours}
              onClick={() => updateContent('showHours', !sectionContent.showHours)}
            >
              {sectionContent.showHours ? <FaEye /> : <FaEyeSlash />}
            </ToggleButton>
          </SectionHeader>
          {sectionContent.showHours && (
            <SectionContent>
              {sectionContent.businessHours.map((dayInfo, index) => (
                <FormRow key={dayInfo.day}>
                  <FormGroup>
                    <Label>{dayInfo.day}</Label>
                    <Input
                      type="text"
                      value={dayInfo.hours}
                      onChange={(e) => updateBusinessHours(index, 'hours', e.target.value)}
                      placeholder="9:00 AM - 6:00 PM"
                    />
                  </FormGroup>
                </FormRow>
              ))}
            </SectionContent>
          )}
        </Section>

        {/* Quick Links */}
        <Section>
          <SectionHeader>
            <SectionTitle>Quick Links</SectionTitle>
            <ToggleButton
              enabled={sectionContent.showQuickLinks}
              onClick={() => updateContent('showQuickLinks', !sectionContent.showQuickLinks)}
            >
              {sectionContent.showQuickLinks ? <FaEye /> : <FaEyeSlash />}
            </ToggleButton>
          </SectionHeader>
          {sectionContent.showQuickLinks && (
            <SectionContent>
              {sectionContent.quickLinks.map((link, index) => (
                <ListItem key={index}>
                  <ToggleButton
                    enabled={link.visible}
                    onClick={() => updateQuickLink(index, 'visible', !link.visible)}
                  >
                    {link.visible ? <FaEye /> : <FaEyeSlash />}
                  </ToggleButton>
                  <ListItemContent>
                    <Input
                      type="text"
                      value={link.name}
                      onChange={(e) => updateQuickLink(index, 'name', e.target.value)}
                      placeholder="Link Name"
                    />
                    <Input
                      type="text"
                      value={link.url}
                      onChange={(e) => updateQuickLink(index, 'url', e.target.value)}
                      placeholder="/page-url"
                    />
                  </ListItemContent>
                  <RemoveButton onClick={() => removeQuickLink(index)}>
                    <FaTrash />
                  </RemoveButton>
                </ListItem>
              ))}
              <AddButton onClick={addQuickLink}>
                <FaPlus />
                Add Quick Link
              </AddButton>
            </SectionContent>
          )}
        </Section>

        {/* Support & Contact */}
        <Section>
          <SectionHeader>
            <SectionTitle>Support & Contact</SectionTitle>
            <ToggleButton
              enabled={sectionContent.showSupport}
              onClick={() => updateContent('showSupport', !sectionContent.showSupport)}
            >
              {sectionContent.showSupport ? <FaEye /> : <FaEyeSlash />}
            </ToggleButton>
          </SectionHeader>
          {sectionContent.showSupport && (
            <SectionContent>
              <FormRow>
                <FormGroup>
                  <Label>Contact Email</Label>
                  <Input
                    type="email"
                    value={sectionContent.supportInfo.email}
                    onChange={(e) => updateNestedContent('supportInfo', 'email', e.target.value)}
                    placeholder="contact@dealership.com"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Contact Phone</Label>
                  <Input
                    type="tel"
                    value={sectionContent.supportInfo.phone}
                    onChange={(e) => updateNestedContent('supportInfo', 'phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>Address</Label>
                <TextArea
                  value={sectionContent.supportInfo.address}
                  onChange={(e) => updateNestedContent('supportInfo', 'address', e.target.value)}
                  placeholder="123 Main Street, City, State 12345"
                />
              </FormGroup>
              <FormGroup>
                <Label>Support Hours</Label>
                <Input
                  type="text"
                  value={sectionContent.supportInfo.supportHours}
                  onChange={(e) => updateNestedContent('supportInfo', 'supportHours', e.target.value)}
                  placeholder="Mon-Fri 9AM-6PM"
                />
              </FormGroup>
            </SectionContent>
          )}
        </Section>

        {/* Custom Text */}
        <Section>
          <SectionHeader>
            <SectionTitle>Custom Footer Text</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <FormGroup>
              <Label>Additional Information</Label>
              <TextArea
                value={sectionContent.customText}
                onChange={(e) => updateContent('customText', e.target.value)}
                placeholder="Add any additional text for your footer..."
              />
            </FormGroup>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default FooterSectionEdit;
