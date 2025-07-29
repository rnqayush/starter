import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { theme, media } from '../../styles/GlobalStyle';

const Card = styled(Link)`
  display: block;
  background: linear-gradient(
    145deg,
    ${theme.colors.white} 0%,
    rgba(255, 255, 255, 0.95) 100%
  );
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  height: 280px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(30, 64, 175, 0.03) 0%,
      transparent 50%,
      rgba(59, 130, 246, 0.03) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(30, 64, 175, 0.1);
    border-color: rgba(30, 64, 175, 0.2);

    &::before {
      opacity: 1;
    }
  }

  ${media.mobile} {
    height: 220px;
    border-radius: ${theme.borderRadius.lg};

    &:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }
  }

  ${media.tablet} {
    height: 250px;

    &:hover {
      transform: translateY(-10px) scale(1.015);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 70%;
  overflow: hidden;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }

  ${media.mobile} {
    opacity: 0.7;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
`;

const ViewButton = styled.div`
  background: linear-gradient(
    135deg,
    ${theme.colors.white} 0%,
    rgba(255, 255, 255, 0.95) 100%
  );
  color: ${theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transform: translateY(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(30, 64, 175, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(30, 64, 175, 0.1),
      transparent
    );
    transition: left 0.4s ease;
  }

  ${Card}:hover & {
    transform: translateY(0) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: rgba(30, 64, 175, 0.2);

    &::before {
      left: 100%;
    }
  }

  ${media.mobile} {
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: 0.875rem;
    border-radius: ${theme.borderRadius.md};
    transform: translateY(0);
    gap: ${theme.spacing.xs};

    ${Card}:hover & {
      transform: scale(1.02);
    }
  }

  ${media.tablet} {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.mobile} {
    padding: ${theme.spacing.md};
    height: 35%;
  }

  ${media.tablet} {
    padding: ${theme.spacing.lg};
    height: 32%;
  }
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
  text-align: center;

  ${media.mobile} {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.xs};
  }

  ${media.tablet} {
    font-size: 1.125rem;
  }
`;

const CategoryDescription = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.4;

  ${media.mobile} {
    font-size: 0.8rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  ${media.tablet} {
    font-size: 0.875rem;
  }
`;

const CategoryCard = ({ category, dealerSlug = '' }) => {
  const getBaseUrl = () => (dealerSlug ? `/${dealerSlug}` : '/automobiles');

  return (
    <Card to={`${getBaseUrl()}/vehicles?category=${category.slug}`}>
      <ImageContainer>
        <CategoryImage src={category.image} alt={category.name} />
        <Overlay>
          <ViewButton>
            Browse Vehicles
            <FaArrowRight />
          </ViewButton>
        </Overlay>
      </ImageContainer>

      <CardContent>
        <CategoryName>{category.name}</CategoryName>
        <CategoryDescription>{category.description}</CategoryDescription>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
