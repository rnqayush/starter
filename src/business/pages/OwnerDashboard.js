import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaEye,
  FaImage,
  FaPlus,
  FaTrash,
  FaCog,
  FaUsers,
  FaChartBar,
  FaPalette,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { getBusinessTemplate } from "../data/businessTemplates";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const DashboardHeader = styled.div`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.spacing.lg} 0;
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: transparent;
  border: 1px solid ${theme.colors.gray300};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const DashboardTitle = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    color: ${theme.colors.gray600};
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'primaryColor',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: ${props.primaryColor || theme.colors.primary};
    color: ${theme.colors.white};
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  ` : `
    background: ${theme.colors.white};
    color: ${theme.colors.gray700};
    border: 1px solid ${theme.colors.gray300};
    
    &:hover {
      background: ${theme.colors.gray50};
    }
  `}
`;

const DashboardLayout = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const Sidebar = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  height: fit-content;
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const MenuItem = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'primaryColor',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.active ? (props.primaryColor + '15') : 'transparent'};
  color: ${props => props.active ? (props.primaryColor || theme.colors.primary) : theme.colors.gray700};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${props => props.primaryColor + '10' || theme.colors.gray50};
  }

  svg {
    font-size: 1.1rem;
  }
`;

const MainContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  min-height: 600px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray900};
  }
`;

const EditableField = styled.div`
  margin-bottom: ${theme.spacing.lg};

  label {
    display: block;
    font-weight: 600;
    color: ${theme.colors.gray900};
    margin-bottom: ${theme.spacing.sm};
  }

  input, textarea {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 2px solid ${theme.colors.gray200};
    border-radius: ${theme.borderRadius.md};
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.primaryColor || theme.colors.primary};
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.primaryColor || theme.colors.primary};
    background: ${props => props.primaryColor + '05' || theme.colors.gray50};
  }

  .icon {
    font-size: 2rem;
    color: ${theme.colors.gray400};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.gray600};
    font-weight: 500;
  }
`;

const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gray50};

  .section-info {
    h4 {
      font-weight: 600;
      color: ${theme.colors.gray900};
      margin-bottom: ${theme.spacing.xs};
    }

    p {
      color: ${theme.colors.gray600};
      font-size: 0.9rem;
    }
  }

  .section-actions {
    display: flex;
    gap: ${theme.spacing.sm};
  }
`;

const OwnerDashboard = () => {
  const { businessSlug } = useParams();
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState(null);
  const [activeSection, setActiveSection] = useState('content');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const template = getBusinessTemplate(businessSlug);
    if (template) {
      setBusinessData(template);
    }
  }, [businessSlug]);

  if (!businessData) {
    return (
      <DashboardContainer>
        <div style={{ padding: "4rem", textAlign: "center" }}>
          <h2>Business Not Found</h2>
          <p>The business you're trying to edit doesn't exist.</p>
        </div>
      </DashboardContainer>
    );
  }

  const handleBackToWebsite = () => {
    navigate(`/business/${businessData.slug}`);
  };

  const handlePreview = () => {
    window.open(`/business/${businessData.slug}`, '_blank');
  };

    const menuItems = businessData?.slug === 'freelancer' ? [
    { id: 'content', label: 'Content Editor', icon: FaEdit },
    { id: 'portfolio', label: 'Portfolio Manager', icon: FaImage },
    { id: 'skills', label: 'Skills & Experience', icon: FaUsers },
    { id: 'design', label: 'Design & Theme', icon: FaPalette },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ] : [
    { id: 'content', label: 'Content Editor', icon: FaEdit },
    { id: 'design', label: 'Design & Theme', icon: FaPalette },
    { id: 'images', label: 'Media Library', icon: FaImage },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'content':
        return (
          <div>
            <ContentHeader>
              <h2>Content Editor</h2>
              <Button 
                variant="primary" 
                primaryColor={businessData.primaryColor}
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaEdit />
                {isEditing ? 'Save Changes' : 'Edit Content'}
              </Button>
            </ContentHeader>

            <SectionList>
              <SectionItem>
                <div className="section-info">
                  <h4>Hero Section</h4>
                  <p>Main headline, subtitle, and call-to-action buttons</p>
                </div>
                <div className="section-actions">
                  <Button>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>

              <SectionItem>
                <div className="section-info">
                  <h4>About Section</h4>
                  <p>Business story, values, and statistics</p>
                </div>
                <div className="section-actions">
                  <Button>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>

              <SectionItem>
                <div className="section-info">
                  <h4>Services Section</h4>
                  <p>List of services, pricing, and descriptions</p>
                </div>
                <div className="section-actions">
                  <Button>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>

              <SectionItem>
                <div className="section-info">
                  <h4>Team Section</h4>
                  <p>Staff profiles, photos, and bios</p>
                </div>
                <div className="section-actions">
                  <Button>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>

              <SectionItem>
                <div className="section-info">
                  <h4>Contact Section</h4>
                  <p>Contact form, address, and business hours</p>
                </div>
                <div className="section-actions">
                  <Button>
                    <FaEdit />
                    Edit
                  </Button>
                </div>
              </SectionItem>
            </SectionList>
          </div>
        );

      case 'design':
        return (
          <div>
            <ContentHeader>
              <h2>Design & Theme</h2>
            </ContentHeader>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Primary Color</label>
              <input type="color" defaultValue={businessData.primaryColor} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Business Name</label>
              <input type="text" defaultValue={businessData.name} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Logo Upload</label>
              <ImageUpload primaryColor={businessData.primaryColor}>
                <FaImage className="icon" />
                <p>Click to upload logo or drag and drop</p>
              </ImageUpload>
            </EditableField>
          </div>
        );

      case 'images':
        return (
          <div>
            <ContentHeader>
              <h2>Media Library</h2>
              <Button variant="primary" primaryColor={businessData.primaryColor}>
                <FaPlus />
                Upload Images
              </Button>
            </ContentHeader>
            <ImageUpload primaryColor={businessData.primaryColor}>
              <FaImage className="icon" />
              <p>Upload images for your website sections</p>
            </ImageUpload>
          </div>
        );

      case 'analytics':
        return (
          <div>
            <ContentHeader>
              <h2>Analytics</h2>
            </ContentHeader>
            <p style={{ color: theme.colors.gray600, textAlign: 'center', padding: '2rem' }}>
              Analytics dashboard coming soon. Track your website visitors, popular pages, and engagement metrics.
            </p>
          </div>
        );

      case 'settings':
        return (
          <div>
            <ContentHeader>
              <h2>Website Settings</h2>
            </ContentHeader>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Website URL</label>
              <input type="text" defaultValue={`yourdomain.com/business/${businessData.slug}`} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>SEO Meta Description</label>
              <textarea defaultValue={businessData.description} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Contact Email</label>
              <input type="email" defaultValue={`info@${businessData.slug}.com`} />
            </EditableField>
            <EditableField primaryColor={businessData.primaryColor}>
              <label>Phone Number</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" />
            </EditableField>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
            <BackButton onClick={handleBackToWebsite}>
              <FaArrowLeft />
              Back to Website
            </BackButton>
            <DashboardTitle>
              <h1>{businessData.name} - Owner Dashboard</h1>
              <p>Manage your website content, design, and settings</p>
            </DashboardTitle>
          </div>
          <ActionButtons>
            <Button onClick={handlePreview}>
              <FaEye />
              Preview Website
            </Button>
            <Button variant="primary" primaryColor={businessData.primaryColor}>
              <FaSave />
              Save Changes
            </Button>
          </ActionButtons>
        </HeaderContent>
      </DashboardHeader>

      <DashboardLayout>
        <Sidebar>
          <SidebarTitle>
            <FaCog />
            Dashboard Menu
          </SidebarTitle>
          <SidebarMenu>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <MenuItem
                  key={item.id}
                  active={activeSection === item.id}
                  primaryColor={businessData.primaryColor}
                  onClick={() => setActiveSection(item.id)}
                >
                  <IconComponent />
                  {item.label}
                </MenuItem>
              );
            })}
          </SidebarMenu>
        </Sidebar>

        <MainContent>
          {renderContent()}
        </MainContent>
      </DashboardLayout>
    </DashboardContainer>
  );
};

export default OwnerDashboard;
