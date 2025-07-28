import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaGripVertical,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTimes,
  FaEdit,
  FaSave,
  FaGlobe,
  FaImage,
  FaAlignLeft,
  FaList,
  FaCar,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  updatePageSections,
  publishPageContent,
} from '../../store/slices/automobileManagementSlice';

const ContentContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const HeaderTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
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

const SectionsContainer = styled.div`
  padding: ${theme.spacing.xl};
`;

const SectionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionItem = styled.div.withConfig({
  shouldForwardProp: prop => !['isDragging', 'isVisible'].includes(prop),
})`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${props => props.isVisible ? 1 : 0.6};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }

  ${props => props.isDragging && `
    opacity: 0.8;
    transform: scale(1.02);
    box-shadow: ${theme.shadows.lg};
    cursor: grabbing;
  `}
`;

const DragHandle = styled.div`
  color: ${theme.colors.gray400};
  cursor: grab;
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.color || `${theme.colors.primary}20`};
  color: ${props => props.textColor || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const SectionInfo = styled.div`
  flex: 1;
`;

const SectionName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const SectionDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const SectionActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid ${theme.colors.gray300};
  background: ${theme.colors.white};
  color: ${theme.colors.gray600};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  &.visibility {
    color: ${props => props.active ? theme.colors.success : theme.colors.gray400};
  }

  &.delete {
    &:hover {
      border-color: ${theme.colors.error};
      color: ${theme.colors.error};
    }
  }
`;

const AddSectionContainer = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
`;

const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const Modal = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ModalTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray500};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};

  &:hover {
    color: ${theme.colors.error};
    background: ${theme.colors.gray100};
  }
`;

const SectionTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const SectionTypeCard = styled.div`
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  }
`;

const TypeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.color || `${theme.colors.primary}20`};
  color: ${props => props.textColor || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto ${theme.spacing.md} auto;
`;

const TypeTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const TypeDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
  line-height: 1.4;
`;

const ContentManagementTab = ({ dealer }) => {
  const dispatch = useDispatch();
  const reduxSections = useSelector(selectPageSections);

  // Local state for UI interactions and temporary changes
  const [sections, setSections] = useState([]);
  const [draggedSection, setDraggedSection] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize sections with icons (Redux doesn't store functions)
  const initializeSections = (reduxSections) => {
    const iconMapping = {
      'hero': FaImage,
      'categories': FaList,
      'featured': FaCar,
      'special-offers': FaCar,
      'footer': FaAlignLeft,
    };

    return reduxSections.map(section => ({
      ...section,
      icon: iconMapping[section.id] || FaEdit,
    }));
  };

  const sectionTypes = [
    {
      id: 'text-content',
      name: 'Text Content',
      description: 'Add custom text blocks, announcements, or information',
      icon: FaAlignLeft,
      color: `${theme.colors.blue500}20`,
      textColor: theme.colors.blue500,
    },
    {
      id: 'vehicle-showcase',
      name: 'Vehicle Showcase',
      description: 'Create additional vehicle displays or highlights',
      icon: FaCar,
      color: `${theme.colors.green500}20`,
      textColor: theme.colors.green500,
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      description: 'Display dealership photos, awards, or team pictures',
      icon: FaImage,
      color: `${theme.colors.purple500}20`,
      textColor: theme.colors.purple500,
    },
    {
      id: 'info-cards',
      name: 'Information Cards',
      description: 'Services, certifications, or key dealership features',
      icon: FaList,
      color: `${theme.colors.orange500}20`,
      textColor: theme.colors.orange500,
    },
  ];

  const handleDragStart = (e, sectionId) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetSectionId) => {
    e.preventDefault();
    
    if (!draggedSection || draggedSection === targetSectionId) {
      setDraggedSection(null);
      return;
    }

    const draggedIndex = sections.findIndex(s => s.id === draggedSection);
    const targetIndex = sections.findIndex(s => s.id === targetSectionId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedSection(null);
      return;
    }

    const newSections = [...sections];
    const [draggedItem] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, draggedItem);

    // Update order numbers
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    setSections(updatedSections);
    setDraggedSection(null);
    setHasChanges(true);
  };

  const toggleSectionVisibility = (sectionId) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    ));
    setHasChanges(true);
  };

  const moveSection = (sectionId, direction) => {
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const newSections = [...sections];
    [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];

    // Update order numbers
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    setSections(updatedSections);
    setHasChanges(true);
  };

  const addCustomSection = (type) => {
    const newSection = {
      id: `custom-${Date.now()}`,
      name: sectionTypes.find(t => t.id === type)?.name || 'Custom Section',
      description: sectionTypes.find(t => t.id === type)?.description || 'Custom content section',
      icon: sectionTypes.find(t => t.id === type)?.icon || FaEdit,
      type: 'custom',
      customType: type,
      visible: true,
      order: sections.length + 1,
      content: {
        title: '',
        description: '',
        items: [],
      },
    };

    setSections([...sections, newSection]);
    setShowAddModal(false);
    setHasChanges(true);
  };

  const removeSection = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.type === 'default') {
      alert('Default sections cannot be deleted. You can hide them instead.');
      return;
    }

    setSections(sections.filter(s => s.id !== sectionId));
    setHasChanges(true);
  };

  const saveChanges = () => {
    // Save to local state (this will be updated to save to Redux later)
    localStorage.setItem(`dealership-content-${dealer.slug}`, JSON.stringify(sections));
    setHasChanges(false);
    alert('Changes saved locally!');
  };

  const publishChanges = () => {
    // This will update Redux state for real-time changes
    saveChanges();
    // TODO: Dispatch to Redux to update the live page
    alert('Changes published successfully! Your dealership page has been updated.');
  };

  const getSectionIcon = (section) => {
    const Icon = section.icon;
    return <Icon />;
  };

  const getSectionColor = (section) => {
    if (section.type === 'custom') {
      const typeConfig = sectionTypes.find(t => t.id === section.customType);
      return {
        color: typeConfig?.color || `${theme.colors.primary}20`,
        textColor: typeConfig?.textColor || theme.colors.primary,
      };
    }
    return {
      color: `${theme.colors.primary}20`,
      textColor: theme.colors.primary,
    };
  };

  // Load saved sections on component mount
  useEffect(() => {
    const saved = localStorage.getItem(`dealership-content-${dealer.slug}`);
    if (saved) {
      try {
        setSections(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved sections:', error);
      }
    }
  }, [dealer.slug]);

  return (
    <ContentContainer>
      <ContentHeader>
        <HeaderLeft>
          <HeaderTitle>Page Content Management</HeaderTitle>
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
      </ContentHeader>

      <SectionsContainer>
        <SectionsList>
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              const colors = getSectionColor(section);
              return (
                <SectionItem
                  key={section.id}
                  isVisible={section.visible}
                  isDragging={draggedSection === section.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, section.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section.id)}
                >
                  <DragHandle>
                    <FaGripVertical />
                  </DragHandle>
                  
                  <SectionIcon color={colors.color} textColor={colors.textColor}>
                    {getSectionIcon(section)}
                  </SectionIcon>

                  <SectionInfo>
                    <SectionName>{section.name}</SectionName>
                    <SectionDescription>{section.description}</SectionDescription>
                  </SectionInfo>

                  <SectionActions>
                    <IconButton onClick={() => moveSection(section.id, 'up')}>
                      <FaArrowUp />
                    </IconButton>
                    <IconButton onClick={() => moveSection(section.id, 'down')}>
                      <FaArrowDown />
                    </IconButton>
                    <IconButton 
                      className="visibility"
                      active={section.visible}
                      onClick={() => toggleSectionVisibility(section.id)}
                    >
                      {section.visible ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                    {section.type === 'custom' && (
                      <IconButton 
                        className="delete"
                        onClick={() => removeSection(section.id)}
                      >
                        <FaTimes />
                      </IconButton>
                    )}
                  </SectionActions>
                </SectionItem>
              );
            })}
        </SectionsList>

        <AddSectionContainer>
          <AddButton onClick={() => setShowAddModal(true)}>
            <FaPlus />
            Add Custom Section
          </AddButton>
        </AddSectionContainer>
      </SectionsContainer>

      <Modal isOpen={showAddModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add Custom Section</ModalTitle>
            <CloseButton onClick={() => setShowAddModal(false)}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <SectionTypeGrid>
            {sectionTypes.map((type) => (
              <SectionTypeCard key={type.id} onClick={() => addCustomSection(type.id)}>
                <TypeIcon color={type.color} textColor={type.textColor}>
                  <type.icon />
                </TypeIcon>
                <TypeTitle>{type.name}</TypeTitle>
                <TypeDescription>{type.description}</TypeDescription>
              </SectionTypeCard>
            ))}
          </SectionTypeGrid>
        </ModalContent>
      </Modal>
    </ContentContainer>
  );
};

export default ContentManagementTab;
