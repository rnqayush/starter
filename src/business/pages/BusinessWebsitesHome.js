import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaSearch, FaEye, FaCheck } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import Header from '../../components/shared/Header';
import { businessTemplates } from '../../DummyData';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${theme.spacing.xl};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-4px);
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  max-width: 600px;
  margin: 0 auto ${theme.spacing.lg};
  line-height: 1.6;
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xxl};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  input {
    width: 100%;
    padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
    border: 2px solid ${theme.colors.gray200};
    border-radius: ${theme.borderRadius.lg};
    font-size: 1rem;
    background: ${theme.colors.white};
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }

  svg {
    position: absolute;
    left: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.gray400};
  }
`;

const CategoryFilter = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const TemplateCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray200};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const TemplateImage = styled.div`
  height: 240px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${TemplateCard}:hover &::after {
    opacity: 1;
  }
`;

const TemplateCategory = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background: ${props => props.color};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const TemplateContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const TemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const TemplateInfo = styled.div`
  flex: 1;
`;

const TemplateName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const TemplateDescription = styled.p`
  color: ${theme.colors.gray600};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const FeatureTag = styled.span`
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  svg {
    color: ${theme.colors.success};
  }
`;

const ViewWebsiteButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    transform: translateY(-2px);
  }
`;

const BusinessWebsitesHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Beauty & Wellness', label: 'Beauty & Wellness' },
    { value: 'Health & Fitness', label: 'Health & Fitness' },
    { value: 'Food & Dining', label: 'Food & Dining' },
    { value: 'Professional Services', label: 'Professional Services' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Creative', label: 'Creative' },
    {
      value: 'Construction & Real Estate',
      label: 'Construction & Real Estate',
    },
  ];

  const filteredTemplates = businessTemplates.filter(template => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBackClick = () => {
    navigate('/');
  };

  const handleTemplateClick = template => {
    navigate(`/business/${template.slug}`);
  };

  return (
    <PageContainer>
      <Header />

      <Container>
        <BackButton onClick={handleBackClick}>
          <FaArrowLeft />
          Back to Home
        </BackButton>

        <HeaderSection>
          <PageTitle>Business Presentational Websites</PageTitle>
          <PageSubtitle>
            Choose from our collection of professionally designed website
            templates for various business types. Each template is fully
            customizable and mobile-responsive.
          </PageSubtitle>
        </HeaderSection>

        <FilterSection>
          <SearchBox>
            <FaSearch />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <CategoryFilter
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </CategoryFilter>
        </FilterSection>

        <TemplatesGrid>
          {filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              onClick={() => handleTemplateClick(template)}
            >
              <TemplateImage image={template.image}>
                <TemplateCategory color={template.primaryColor}>
                  {template.category}
                </TemplateCategory>
              </TemplateImage>

              <TemplateContent>
                <TemplateHeader>
                  <TemplateInfo>
                    <TemplateName>{template.name}</TemplateName>
                  </TemplateInfo>
                </TemplateHeader>

                <TemplateDescription>
                  {template.description}
                </TemplateDescription>

                <FeaturesList>
                  {template.features.map((feature, index) => (
                    <FeatureTag key={index}>
                      <FaCheck />
                      {feature}
                    </FeatureTag>
                  ))}
                </FeaturesList>

                <ViewWebsiteButton>
                  <FaEye />
                  View Website
                </ViewWebsiteButton>
              </TemplateContent>
            </TemplateCard>
          ))}
        </TemplatesGrid>
      </Container>
    </PageContainer>
  );
};

export default BusinessWebsitesHome;
