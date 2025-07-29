import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
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

const FeaturedSectionEdit = () => {
  return (
    <SectionContainer>
      <SectionTitle>
        <FaStar />
        Featured Products Section
      </SectionTitle>
      <PlaceholderText>
        Featured products section management will be implemented here. This will
        allow you to select specific products to feature and configure the
        section appearance.
      </PlaceholderText>
    </SectionContainer>
  );
};

export default FeaturedSectionEdit;
