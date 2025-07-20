import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const BackToTopButton = styled.button`
  position: fixed;
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: ${theme.shadows.xl};
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(100px)'};

  &:hover {
    transform: ${props => props.visible ? 'translateY(-5px)' : 'translateY(100px)'};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    bottom: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    font-size: 1rem;
  }
`;

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <BackToTopButton
      visible={isVisible}
      onClick={scrollToTop}
      title="Back to top"
    >
      <FaArrowUp />
    </BackToTopButton>
  );
};

export default BackToTop;
