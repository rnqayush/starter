import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSave,
  FaGlobe,
  FaSort,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectLoading,
  updatePageSections,
  publishPageContent,
  updateSectionVisibility,
  reorderSections,
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
  background: ${theme.colors.purple500}20;
  color: ${theme.colors.purple500};
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

const SectionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  transition: all 0.2s ease;
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.sm};
  }
`;

const ArrowControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-right: ${theme.spacing.md};
`;

const ArrowButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['disabled'].includes(prop),
})`
  width: 32px;
  height: 24px;
  border: 1px solid ${theme.colors.gray300};
  background: ${props => props.disabled ? theme.colors.gray100 : theme.colors.white};
  color: ${props => props.disabled ? theme.colors.gray400 : theme.colors.gray600};
  border-radius: ${theme.borderRadius.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.disabled ? theme.colors.gray100 : theme.colors.gray50};
  }
`;

const SectionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const SectionName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const SectionDescription = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const SectionOrder = styled.div`
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: ${theme.spacing.md};
  min-width: 40px;
  text-align: center;
`;

const VisibilityButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['visible'].includes(prop),
})`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.visible ? theme.colors.success : theme.colors.gray300};
  color: ${props => props.visible ? theme.colors.white : theme.colors.gray600};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.visible ? theme.colors.successDark : theme.colors.gray400};
  }
`;

const Instructions = styled.div`
  background: ${theme.colors.blue50};
  border: 1px solid ${theme.colors.blue200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const InstructionsTitle = styled.h4`
  color: ${theme.colors.blue700};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-size: 0.9rem;
`;

const InstructionsList = styled.ul`
  color: ${theme.colors.blue600};
  margin: 0;
  padding-left: ${theme.spacing.md};
  font-size: 0.85rem;
`;

const SectionOrderEdit = ({ dealer }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectPageSections);
  const loading = useSelector(selectLoading);
  
  const [orderedSections, setOrderedSections] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize with data from Redux state
  useEffect(() => {
    if (sections && sections.length > 0) {
      // Sort sections by order
      const sorted = [...sections].sort((a, b) => a.order - b.order);
      setOrderedSections(sorted);
    }
  }, [sections]);

  const moveSection = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= orderedSections.length) return;

    const newSections = [...orderedSections];
    const [movedSection] = newSections.splice(index, 1);
    newSections.splice(newIndex, 0, movedSection);

    // Update order numbers
    const updatedSections = newSections.map((section, idx) => ({
      ...section,
      order: idx + 1,
    }));

    setOrderedSections(updatedSections);
    setHasChanges(true);
  };

  const handleVisibilityToggle = (sectionId) => {
    const updatedSections = orderedSections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    );
    
    setOrderedSections(updatedSections);
    setHasChanges(true);
  };

  const saveChanges = () => {
    dispatch(updatePageSections(orderedSections));
    setHasChanges(false);
    alert('Section order saved successfully!');
  };

  const publishChanges = () => {
    dispatch(publishPageContent(orderedSections));
    setHasChanges(false);
    alert('Section order published successfully! Changes are now live.');
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Loading Section Order...</HeaderTitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <SectionIcon>
            <FaSort />
          </SectionIcon>
          <HeaderTitle>Section Order Management</HeaderTitle>
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
        <Instructions>
          <InstructionsTitle>How to use Section Order Management:</InstructionsTitle>
          <InstructionsList>
            <li>Use the up/down arrows to reorder sections on your website</li>
            <li>Click the eye icon to show/hide sections</li>
            <li>The order number shows the current position</li>
            <li>Don't forget to "Save & Go Public" to make changes live</li>
          </InstructionsList>
        </Instructions>

        <SectionsList>
          {orderedSections.map((section, index) => (
            <SectionItem key={section.id}>
              <ArrowControls>
                <ArrowButton
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  title="Move up"
                >
                  <FaArrowUp />
                </ArrowButton>
                <ArrowButton
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === orderedSections.length - 1}
                  title="Move down"
                >
                  <FaArrowDown />
                </ArrowButton>
              </ArrowControls>
              
              <SectionOrder>
                #{section.order}
              </SectionOrder>
              
              <SectionInfo>
                <SectionName>{section.name}</SectionName>
                <SectionDescription>{section.description}</SectionDescription>
              </SectionInfo>
              
              <VisibilityButton
                visible={section.visible}
                onClick={() => handleVisibilityToggle(section.id)}
                title={section.visible ? 'Hide section' : 'Show section'}
              >
                {section.visible ? <FaEye /> : <FaEyeSlash />}
              </VisibilityButton>
            </SectionItem>
          ))}
        </SectionsList>
      </Content>
    </Container>
  );
};

export default SectionOrderEdit;
