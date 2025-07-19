import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

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
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
  text-align: center;
`;

const CategoryDescription = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.4;
`;

const CategoryCard = ({ category }) => {
  return (
    <Card to={`/ecommerce/products?category=${category.slug}`}>
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
