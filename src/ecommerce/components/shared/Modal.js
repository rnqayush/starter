import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { theme, media } from "../../../styles/GlobalStyle";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: ${theme.spacing.lg};

  ${media.mobile} {
    padding: ${theme.spacing.sm};
    align-items: flex-start;
    padding-top: ${theme.spacing.lg};
  }

  ${media.tablet} {
    padding: ${theme.spacing.md};
    align-items: center;
  }
`;

const ModalContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "size",
})`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  width: 100%;
  max-width: ${(props) => {
    switch (props.size) {
      case "sm":
        return "400px";
      case "lg":
        return "800px";
      case "xl":
        return "1200px";
      default:
        return "600px";
    }
  }};

  ${media.mobile} {
    max-width: 100%;
    max-height: 95vh;
    border-radius: ${theme.borderRadius.md};
    margin: ${theme.spacing.sm};
  }

  ${media.tablet} {
    max-width: 90vw;
    max-height: 90vh;
  }

  ${media.desktop} {
    max-height: 85vh;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray100};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray300};
    border-radius: ${theme.borderRadius.sm};
  }
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }

  ${media.tablet} {
    padding: ${theme.spacing.xl};
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
  flex: 1;

  ${media.mobile} {
    font-size: 1.25rem;
  }

  ${media.tablet} {
    font-size: 1.375rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;
  min-width: 2.5rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
  }

  ${media.mobile} {
    padding: ${theme.spacing.xs};
    min-width: 2.25rem;
    min-height: 2.25rem;
    font-size: 0.875rem;
  }

  ${media.tablet} {
    min-width: 2.375rem;
    min-height: 2.375rem;
  }
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
  }

  ${media.tablet} {
    padding: ${theme.spacing.xl};
  }
`;

const ModalFooter = styled.div`
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.spacing.md};

  ${media.mobile} {
    padding: ${theme.spacing.lg};
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.sm};
  }

  ${media.tablet} {
    padding: ${theme.spacing.xl};
    flex-direction: row;
    align-items: center;
    gap: ${theme.spacing.md};
  }
`;

const Modal = ({ isOpen, onClose, title, children, footer, size = "md" }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent size={size}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
