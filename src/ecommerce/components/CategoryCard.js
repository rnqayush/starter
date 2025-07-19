import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { theme, media } from "../../styles/GlobalStyle";

const Card = styled(Link)`
  display: block;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  position: relative;
  height: 250px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
  }

  ${media.mobile} {
    height: 200px;
    border-radius: ${theme.borderRadius.lg};

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  }

  ${media.tablet} {
    height: 225px;

    &:hover {
      transform: translateY(-6px);
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
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transform: translateY(20px);
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: translateY(0);
  }

  ${media.mobile} {
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: 0.875rem;
    border-radius: ${theme.borderRadius.md};
    transform: translateY(0);
    gap: ${theme.spacing.xs};
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

const CategoryCard = ({ category, storeSlug = "" }) => {
  const getBaseUrl = () => (storeSlug ? `/${storeSlug}` : "/ecommerce");

  return (
    <Card to={`${getBaseUrl()}/products?category=${category.slug}`}>
      <ImageContainer>
        <CategoryImage src={category.image} alt={category.name} />
        <Overlay>
          <ViewButton>
            Shop Now
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
