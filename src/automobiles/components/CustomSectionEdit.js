import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaSearch,
  FaTimes,
  FaEye,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectVehicles,
  selectLoading,
  addCustomSection,
  updatePageSections,
  removeCustomSection,
  updateSectionContent,
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

const Content = styled.div`
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const CreateSection = styled.div`
  border: 2px dashed ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.gray50};
`;

const CreateButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border: none;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const CustomSectionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const CustomSectionItem = styled.div`
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  overflow: hidden;
`;

const CustomSectionHeader = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomSectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const CustomSectionActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: prop => !['variant', 'small'].includes(prop),
})`
  padding: ${props =>
    props.small
      ? theme.spacing.xs + ' ' + theme.spacing.sm
      : theme.spacing.sm + ' ' + theme.spacing.md};
  border: ${props =>
    props.variant === 'danger'
      ? '1px solid ' + theme.colors.error
      : '1px solid ' + theme.colors.gray300};
  background: ${props =>
    props.variant === 'danger' ? theme.colors.error : theme.colors.white};
  color: ${props =>
    props.variant === 'danger' ? theme.colors.white : theme.colors.gray700};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${props => (props.small ? '0.8rem' : '0.9rem')};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.variant === 'danger'
        ? theme.colors.errorDark
        : theme.colors.gray50};
  }
`;

const Modal = styled.div.withConfig({
  shouldForwardProp: prop => !['isOpen'].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0;
`;

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  margin-bottom: ${theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ProductSearch = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.md};
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
`;

const SearchField = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 40px;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
`;

const ProductItem = styled.div.withConfig({
  shouldForwardProp: prop => !['selected'].includes(prop),
})`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  border: 2px solid
    ${props => (props.selected ? theme.colors.primary : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.md};
  background: ${props =>
    props.selected ? theme.colors.primary + '10' : theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-right: ${theme.spacing.md};
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h5`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const ProductPrice = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const SelectedProducts = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const SelectedProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const SelectedProductChip = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.primary}15;
  border: 1px solid ${theme.colors.primary}30;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.85rem;
  color: ${theme.colors.gray700};
`;

const RemoveChip = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 0.8rem;

  &:hover {
    color: ${theme.colors.errorDark};
  }
`;

const ModalFooter = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
`;

const CustomSectionEdit = ({ dealer }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectPageSections);
  const vehicles = useSelector(selectVehicles);
  const loading = useSelector(selectLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [sectionData, setSectionData] = useState({
    title: '',
    description: '',
    vehicleIds: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // Get custom sections
  const customSections = sections.filter(section => section.type === 'custom');

  // Filter vehicles based on search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredVehicles(vehicles || []);
    } else {
      const filtered =
        vehicles?.filter(
          vehicle =>
            vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
      setFilteredVehicles(filtered);
    }
  }, [searchQuery, vehicles]);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingSectionId(null);
    setSectionData({ title: '', description: '', vehicleIds: [] });
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const openEditModal = section => {
    setIsEditing(true);
    setEditingSectionId(section.id);
    setSectionData({
      title: section.name || '',
      description: section.description || '',
      vehicleIds: section.content?.vehicleIds || [],
    });
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingSectionId(null);
    setSectionData({ title: '', description: '', vehicleIds: [] });
    setSearchQuery('');
  };

  const updateLocalContent = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value,
    }));

    // If we're editing an existing section, update Redux state in real-time
    if (isEditing && editingSectionId) {
      dispatch(
        updateSectionContent({
          sectionId: editingSectionId,
          content: { [field]: value },
        })
      );
    }
  };

  const toggleVehicleSelection = vehicleId => {
    const newVehicleIds = sectionData.vehicleIds.includes(vehicleId)
      ? sectionData.vehicleIds.filter(id => id !== vehicleId)
      : [...sectionData.vehicleIds, vehicleId];

    updateLocalContent('vehicleIds', newVehicleIds);
  };

  const removeSelectedVehicle = vehicleId => {
    const newVehicleIds = sectionData.vehicleIds.filter(id => id !== vehicleId);
    updateLocalContent('vehicleIds', newVehicleIds);
  };

  const handleSave = () => {
    if (!sectionData.title.trim()) {
      alert('Please enter a section title');
      return;
    }

    if (isEditing) {
      // Update existing custom section with real-time updates
      dispatch(
        updateSectionContent({
          sectionId: editingSectionId,
          content: {
            title: sectionData.title,
            subtitle: sectionData.description,
            vehicleIds: sectionData.vehicleIds,
          },
        })
      );

      // Also update section metadata
      const updatedSections = sections.map(section =>
        section.id === editingSectionId
          ? {
              ...section,
              name: sectionData.title,
              description: sectionData.description,
              content: {
                ...section.content,
                title: sectionData.title,
                subtitle: sectionData.description,
                vehicleIds: sectionData.vehicleIds,
              },
            }
          : section
      );
      dispatch(updatePageSections(updatedSections));
      alert('Custom section updated successfully!');
    } else {
      // Create new custom section - position it before footer
      const footerSection = sections.find(s => s.id === 'footer');
      const footerOrder = footerSection ? footerSection.order : sections.length + 1;

      const newSection = {
        id: `custom-${Date.now()}`,
        name: sectionData.title,
        description: sectionData.description,
        type: 'custom',
        visible: true,
        order: footerOrder - 0.5, // Place before footer
        content: {
          title: sectionData.title,
          subtitle: sectionData.description,
          vehicleIds: sectionData.vehicleIds,
        },
      };
      dispatch(addCustomSection(newSection));
      alert('Custom section created successfully!');
    }
    closeModal();
  };

  const handleDelete = sectionId => {
    if (
      window.confirm('Are you sure you want to delete this custom section?')
    ) {
      dispatch(removeCustomSection(sectionId));
      alert('Custom section deleted successfully!');
    }
  };

  const getSelectedVehicles = () => {
    return (
      vehicles?.filter(vehicle =>
        sectionData.vehicleIds.includes(vehicle.id)
      ) || []
    );
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Loading Custom Sections...</HeaderTitle>
        </Header>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <HeaderLeft>
            <SectionIcon>
              <FaPlus />
            </SectionIcon>
            <HeaderTitle>Custom Sections</HeaderTitle>
          </HeaderLeft>
        </Header>

        <Content>
          <CreateSection>
            <CreateButton onClick={openCreateModal}>
              <FaPlus />
              Create New Custom Section
            </CreateButton>
          </CreateSection>

          {customSections.length > 0 && (
            <CustomSectionsList>
              {customSections.map(section => (
                <CustomSectionItem key={section.id}>
                  <CustomSectionHeader>
                    <div>
                      <CustomSectionTitle>{section.name}</CustomSectionTitle>
                      <p
                        style={{
                          margin: '4px 0 0 0',
                          fontSize: '0.85rem',
                          color: theme.colors.gray600,
                        }}
                      >
                        {section.description}
                      </p>
                      <p
                        style={{
                          margin: '4px 0 0 0',
                          fontSize: '0.8rem',
                          color: theme.colors.gray500,
                        }}
                      >
                        {section.content?.vehicleIds?.length || 0} vehicles
                        selected
                      </p>
                    </div>
                    <CustomSectionActions>
                      <ActionButton
                        small
                        onClick={() => openEditModal(section)}
                      >
                        <FaEye />
                        Edit
                      </ActionButton>
                      <ActionButton
                        small
                        variant="danger"
                        onClick={() => handleDelete(section.id)}
                      >
                        <FaTrash />
                        Delete
                      </ActionButton>
                    </CustomSectionActions>
                  </CustomSectionHeader>
                </CustomSectionItem>
              ))}
            </CustomSectionsList>
          )}
        </Content>
      </Container>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {isEditing ? 'Edit Custom Section' : 'Create Custom Section'}
            </ModalTitle>
            <ActionButton small onClick={closeModal}>
              <FaTimes />
            </ActionButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label>Section Title</Label>
              <Input
                type="text"
                value={sectionData.title}
                onChange={e => updateLocalContent('title', e.target.value)}
                placeholder="Enter section title"
              />
            </FormGroup>

            <FormGroup>
              <Label>Section Description</Label>
              <TextArea
                value={sectionData.description}
                onChange={e =>
                  setSectionData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter section description"
              />
            </FormGroup>

            <ProductSearch>
              <Label>Select Vehicles</Label>
              <SearchInput>
                <SearchIcon>
                  <FaSearch />
                </SearchIcon>
                <SearchField
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search vehicles by name, make, or model..."
                />
              </SearchInput>

              <ProductsList>
                {filteredVehicles.map(vehicle => (
                  <ProductItem
                    key={vehicle.id}
                    selected={sectionData.vehicleIds.includes(vehicle.id)}
                    onClick={() => toggleVehicleSelection(vehicle.id)}
                  >
                    <ProductImage
                      src={vehicle.media?.mainImage}
                      alt={vehicle.name}
                    />
                    <ProductInfo>
                      <ProductName>{vehicle.name}</ProductName>
                      <ProductPrice>
                        ${vehicle.pricing?.price?.toLocaleString()}
                      </ProductPrice>
                    </ProductInfo>
                  </ProductItem>
                ))}
              </ProductsList>

              <SelectedProducts>
                <Label>
                  Selected Vehicles ({sectionData.vehicleIds.length})
                </Label>
                <SelectedProductsList>
                  {getSelectedVehicles().map(vehicle => (
                    <SelectedProductChip key={vehicle.id}>
                      {vehicle.name}
                      <RemoveChip
                        onClick={() => removeSelectedVehicle(vehicle.id)}
                      >
                        <FaTimes />
                      </RemoveChip>
                    </SelectedProductChip>
                  ))}
                </SelectedProductsList>
              </SelectedProducts>
            </ProductSearch>
          </ModalBody>

          <ModalFooter>
            <ActionButton onClick={closeModal}>Cancel</ActionButton>
            <ActionButton
              style={{
                background: theme.colors.primary,
                color: theme.colors.white,
                border: `1px solid ${theme.colors.primary}`,
              }}
              onClick={handleSave}
            >
              <FaSave />
              {isEditing ? 'Update Section' : 'Create Section'}
            </ActionButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomSectionEdit;
