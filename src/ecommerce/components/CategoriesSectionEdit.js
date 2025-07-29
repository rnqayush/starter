import React from 'react';
import styled from 'styled-components';
import { FaTags } from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const SectionContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const PlaceholderText = styled.p`
  color: ${theme.colors.gray600};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const CategoriesSectionEdit = () => {
  return (
    <SectionContainer>
      <SectionTitle>
        <FaTags />
        Categories Section Settings
      </SectionTitle>
      <PlaceholderText>
        Categories section management will be implemented here. This will allow you to configure which product categories are displayed, their order, and section content.
      </PlaceholderText>
    </SectionContainer>
  );
};

export default CategoriesSectionEdit;
