import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSave,
  FaGlobe,
  FaAlignLeft,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectVendor,
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
  background: ${theme.colors.gray500}20;
  color: ${theme.colors.gray500};
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
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
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
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ComponentsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const ComponentItem = styled.div`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ComponentInfo = styled.div``;

const ComponentName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const ComponentDescription = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
`;

const VisibilityButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  background: none;
  border: none;
  color: ${props => props.visible ? theme.colors.success : theme.colors.gray400};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
  }
`;

const FooterSectionEdit = ({ dealer }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectPageSections);
  const vendor = useSelector(selectVendor);
  
  const [sectionContent, setSectionContent] = useState({
    showSocialMedia: true,
    showHours: true,
    showMap: true,
    showServices: true,
    showCertifications: true,
    customText: '',
    backgroundColor: '#1f2937',
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize with data from Redux state and vendor
  useEffect(() => {
    const footerSection = sections.find(s => s.id === 'footer');
    if (footerSection?.content) {
      setSectionContent({
        showSocialMedia: footerSection.content.showSocialMedia ?? true,
        showHours: footerSection.content.showHours ?? true,
        showMap: footerSection.content.showMap ?? true,
        showServices: footerSection.content.showServices ?? true,
        showCertifications: footerSection.content.showCertifications ?? true,
        customText: footerSection.content.customText || vendor?.businessInfo?.description || '',
        backgroundColor: footerSection.content.backgroundColor || vendor?.theme?.primaryColor || '#1f2937',
      });
    } else if (vendor) {
      // Initialize with vendor data
      setSectionContent(prev => ({
        ...prev,
        customText: vendor.businessInfo?.description || '',
        backgroundColor: vendor.theme?.primaryColor || '#1f2937',
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

  const toggleComponent = (componentName) => {
    updateContent(componentName, !sectionContent[componentName]);
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

  const footerComponents = [
    {
      key: 'showSocialMedia',
      name: 'Social Media Links',
      description: 'Display social media icons and links',
    },
    {
      key: 'showHours',
      name: 'Business Hours',
      description: 'Show opening and closing times',
    },
    {
      key: 'showMap',
      name: 'Quick Links',
      description: 'Display navigation links',
    },
    {
      key: 'showServices',
      name: 'Services List',
      description: 'Show available services',
    },
    {
      key: 'showCertifications',
      name: 'Certifications',
      description: 'Display certifications and awards',
    },
  ];

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
        <FormGroup>
          <Label>Footer Components</Label>
          <ComponentsList>
            {footerComponents.map(component => (
              <ComponentItem key={component.key}>
                <ComponentInfo>
                  <ComponentName>{component.name}</ComponentName>
                  <ComponentDescription>{component.description}</ComponentDescription>
                </ComponentInfo>
                <VisibilityButton
                  visible={sectionContent[component.key]}
                  onClick={() => toggleComponent(component.key)}
                  title={sectionContent[component.key] ? 'Hide component' : 'Show component'}
                >
                  {sectionContent[component.key] ? <FaEye /> : <FaEyeSlash />}
                </VisibilityButton>
              </ComponentItem>
            ))}
          </ComponentsList>
        </FormGroup>

        <FormGroup>
          <Label>Custom Footer Text</Label>
          <TextArea
            value={sectionContent.customText}
            onChange={(e) => updateContent('customText', e.target.value)}
            placeholder="Add any custom text for the footer..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Background Color</Label>
          <Input
            type="color"
            value={sectionContent.backgroundColor}
            onChange={(e) => updateContent('backgroundColor', e.target.value)}
          />
        </FormGroup>
      </Content>
    </Container>
  );
};

export default FooterSectionEdit;
