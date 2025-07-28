import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTimes,
  FaSave,
  FaGlobe,
  FaImage,
  FaAlignLeft,
  FaList,
  FaCar,
  FaSearch,
  FaTrash,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectVendor,
  selectCategories,
  selectVehicles,
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

const SectionsContainer = styled.div`
  padding: ${theme.spacing.xl};
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionCard = styled.div.withConfig({
  shouldForwardProp: prop => !['isVisible', 'isActive'].includes(prop),
})`
  background: ${theme.colors.white};
  border: 2px solid ${props => props.isActive ? theme.colors.primary : theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.isVisible ? 1 : 0.6};
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || theme.colors.primary};
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.color || `${theme.colors.primary}20`};
  color: ${props => props.textColor || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0 0 ${theme.spacing.md} 0;
  line-height: 1.4;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.gray100};
`;

const CardBadge = styled.span`
  background: ${props => props.color || theme.colors.gray100};
  color: ${props => props.textColor || theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
`;

const VisibilityButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  background: none;
  border: none;
  color: ${props => props.visible ? theme.colors.success : theme.colors.gray400};
  font-size: 1.1rem;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
  }
`;

// Modal Styles
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
  padding: ${theme.spacing.lg};
`;

const ModalContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'maxWidth',
})`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: ${props => props.maxWidth || '600px'};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
`;

const ModalHeader = styled.div`
  padding: ${theme.spacing.xl};
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

const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
`;

const ModalFooter = styled.div`
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.gray200};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
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

  &:disabled {
    background: ${theme.colors.gray100};
    cursor: not-allowed;
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

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.lg};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 2.5rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
`;

const VehicleList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

const VehicleItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.gray100};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const VehicleImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-right: ${theme.spacing.md};
`;

const VehicleInfo = styled.div`
  flex: 1;
`;

const VehicleName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VehicleDetails = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
`;

const VehiclePrice = styled.div`
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-right: ${theme.spacing.md};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || theme.colors.gray500};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${props => props.hoverColor || theme.colors.primary};
  }
`;

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const CategoryImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-right: ${theme.spacing.md};
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const CategoryDescription = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
`;

const FooterComponentsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const FooterComponent = styled.div`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
`;

const ComponentName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const ComponentDescription = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.md};
`;

const ContentManagementTab = ({ dealer }) => {
  const dispatch = useDispatch();
  const reduxSections = useSelector(selectPageSections);
  const vendor = useSelector(selectVendor);
  const categories = useSelector(selectCategories);
  const vehicles = useSelector(selectVehicles);
  
  // Local state for UI and modal management
  const [sections, setSections] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  
  // Search and filter states
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // Initialize sections from Redux
  useEffect(() => {
    if (reduxSections && reduxSections.length > 0) {
      setSections([...reduxSections]);
    } else {
      // Initialize with default sections
      const defaultSections = [
        {
          id: 'hero',
          name: 'Hero Section',
          type: 'default',
          visible: true,
          order: 1,
          content: {
            title: vendor?.name ? `Welcome to ${vendor.name}` : 'Welcome to Our Dealership',
            subtitle: vendor?.businessInfo?.description || 'Your trusted automotive partner',
            backgroundImage: vendor?.businessInfo?.coverImage || '',
          }
        },
        {
          id: 'categories',
          name: 'Browse by Category',
          type: 'default',
          visible: true,
          order: 2,
          content: {
            title: 'Browse by Category',
            subtitle: 'Explore our diverse range of vehicles across different categories',
            visibleCategories: categories?.map(cat => cat.id) || [],
          }
        },
        {
          id: 'featured',
          name: 'Featured Vehicles',
          type: 'default',
          visible: true,
          order: 3,
          content: {
            title: 'Featured Vehicles',
            subtitle: `Handpicked vehicles from ${vendor?.name || 'our dealership'} that customers love the most`,
            vehicleIds: vehicles?.filter(v => v.featured).map(v => v.id).slice(0, 4) || [],
          }
        },
        {
          id: 'special-offers',
          name: 'Special Offers',
          type: 'default',
          visible: true,
          order: 4,
          content: {
            title: '🔥 Special Offers',
            subtitle: `Limited time deals from ${vendor?.name || 'our dealership'} you don't want to miss`,
            vehicleIds: vehicles?.filter(v => v.pricing?.onSale).map(v => v.id) || [],
          }
        },
        {
          id: 'footer',
          name: 'Footer',
          type: 'default',
          visible: true,
          order: 5,
          content: {
            showSocialMedia: true,
            showHours: true,
            showMap: true,
            showServices: true,
            showCertifications: true,
            customText: vendor?.businessInfo?.description || '',
            backgroundColor: vendor?.theme?.primaryColor || '#1f2937',
          }
        },
      ];
      setSections(defaultSections);
    }
  }, [reduxSections, vendor, categories, vehicles]);

  // Filter vehicles based on search
  useEffect(() => {
    if (!vehicleSearch) {
      setFilteredVehicles(vehicles || []);
    } else {
      const filtered = vehicles?.filter(vehicle => 
        vehicle.name.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(vehicleSearch.toLowerCase())
      ) || [];
      setFilteredVehicles(filtered);
    }
  }, [vehicleSearch, vehicles]);

  const handleSectionClick = (section) => {
    setEditingSection({ ...section });
    setActiveModal(section.id);
  };

  const toggleSectionVisibility = (sectionId, event) => {
    event.stopPropagation();
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    ));
    setHasChanges(true);
  };

  const toggleCategoryVisibility = (categoryId) => {
    const currentCategories = editingSection.content.visibleCategories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    setEditingSection({
      ...editingSection,
      content: {
        ...editingSection.content,
        visibleCategories: newCategories,
      }
    });
  };

  const addVehicleToSection = (vehicleId) => {
    const currentVehicles = editingSection.content.vehicleIds || [];
    if (!currentVehicles.includes(vehicleId)) {
      setEditingSection({
        ...editingSection,
        content: {
          ...editingSection.content,
          vehicleIds: [...currentVehicles, vehicleId],
        }
      });
    }
  };

  const removeVehicleFromSection = (vehicleId) => {
    const currentVehicles = editingSection.content.vehicleIds || [];
    setEditingSection({
      ...editingSection,
      content: {
        ...editingSection.content,
        vehicleIds: currentVehicles.filter(id => id !== vehicleId),
      }
    });
  };

  const toggleFooterComponent = (componentName) => {
    setEditingSection({
      ...editingSection,
      content: {
        ...editingSection.content,
        [componentName]: !editingSection.content[componentName],
      }
    });
  };

  const updateSectionContent = (field, value) => {
    setEditingSection({
      ...editingSection,
      content: {
        ...editingSection.content,
        [field]: value,
      }
    });
  };

  const saveSection = () => {
    setSections(sections.map(section => 
      section.id === editingSection.id ? editingSection : section
    ));
    setHasChanges(true);
    setActiveModal(null);
    setEditingSection(null);
  };

  const saveChanges = () => {
    dispatch(updatePageSections(sections));
    localStorage.setItem(`dealership-content-${dealer.slug}`, JSON.stringify(sections));
    setHasChanges(false);
    alert('Changes saved successfully!');
  };

  const publishChanges = () => {
    dispatch(publishPageContent(sections));
    localStorage.setItem(`dealership-content-${dealer.slug}`, JSON.stringify(sections));
    setHasChanges(false);
    alert('Changes published successfully! Your dealership page has been updated and is now live.');
  };

  const getVehicleById = (id) => vehicles?.find(v => v.id === id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderHeroModal = () => (
    <Modal isOpen={activeModal === 'hero'}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Hero Section</ModalTitle>
          <CloseButton onClick={() => setActiveModal(null)}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Background Image URL</Label>
            <Input
              type="url"
              value={editingSection?.content?.backgroundImage || ''}
              onChange={(e) => updateSectionContent('backgroundImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={editingSection?.content?.title || ''}
              onChange={(e) => updateSectionContent('title', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={editingSection?.content?.subtitle || ''}
              onChange={(e) => updateSectionContent('subtitle', e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ActionButton onClick={() => setActiveModal(null)}>Cancel</ActionButton>
          <ActionButton filled onClick={saveSection}>Save Section</ActionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const renderCategoriesModal = () => (
    <Modal isOpen={activeModal === 'categories'}>
      <ModalContent maxWidth="700px">
        <ModalHeader>
          <ModalTitle>Edit Browse by Category</ModalTitle>
          <CloseButton onClick={() => setActiveModal(null)}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Title (Disabled)</Label>
            <Input
              type="text"
              value="Browse by Category"
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>Category Visibility</Label>
            <CategoryList>
              {categories?.map(category => (
                <CategoryItem key={category.id}>
                  <CategoryImage src={category.image} alt={category.name} />
                  <CategoryInfo>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryDescription>{category.description}</CategoryDescription>
                  </CategoryInfo>
                  <VisibilityButton
                    visible={editingSection?.content?.visibleCategories?.includes(category.id)}
                    onClick={() => toggleCategoryVisibility(category.id)}
                  >
                    {editingSection?.content?.visibleCategories?.includes(category.id) ? <FaEye /> : <FaEyeSlash />}
                  </VisibilityButton>
                </CategoryItem>
              ))}
            </CategoryList>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ActionButton onClick={() => setActiveModal(null)}>Cancel</ActionButton>
          <ActionButton filled onClick={saveSection}>Save Section</ActionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const renderVehicleModal = (sectionId, title) => (
    <Modal isOpen={activeModal === sectionId}>
      <ModalContent maxWidth="800px">
        <ModalHeader>
          <ModalTitle>Edit {title}</ModalTitle>
          <CloseButton onClick={() => setActiveModal(null)}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Section Title</Label>
            <Input
              type="text"
              value={editingSection?.content?.title || ''}
              onChange={(e) => updateSectionContent('title', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Section Subtitle</Label>
            <TextArea
              value={editingSection?.content?.subtitle || ''}
              onChange={(e) => updateSectionContent('subtitle', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Current {title} Vehicles</Label>
            <VehicleList>
              {editingSection?.content?.vehicleIds?.map(vehicleId => {
                const vehicle = getVehicleById(vehicleId);
                if (!vehicle) return null;
                return (
                  <VehicleItem key={vehicleId}>
                    <VehicleImage src={vehicle.media?.mainImage} alt={vehicle.name} />
                    <VehicleInfo>
                      <VehicleName>{vehicle.name}</VehicleName>
                      <VehicleDetails>{vehicle.year} {vehicle.make} {vehicle.model}</VehicleDetails>
                    </VehicleInfo>
                    <VehiclePrice>{formatPrice(vehicle.pricing?.price)}</VehiclePrice>
                    <IconButton 
                      color={theme.colors.error}
                      hoverColor={theme.colors.error}
                      onClick={() => removeVehicleFromSection(vehicleId)}
                    >
                      <FaTrash />
                    </IconButton>
                  </VehicleItem>
                );
              })}
            </VehicleList>
          </FormGroup>

          <FormGroup>
            <Label>Search Vehicles to Add</Label>
            <SearchContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search vehicles by name, make, or model..."
                value={vehicleSearch}
                onChange={(e) => setVehicleSearch(e.target.value)}
              />
            </SearchContainer>
            <VehicleList>
              {filteredVehicles
                ?.filter(vehicle => !editingSection?.content?.vehicleIds?.includes(vehicle.id))
                ?.slice(0, 10)
                ?.map(vehicle => (
                <VehicleItem key={vehicle.id}>
                  <VehicleImage src={vehicle.media?.mainImage} alt={vehicle.name} />
                  <VehicleInfo>
                    <VehicleName>{vehicle.name}</VehicleName>
                    <VehicleDetails>{vehicle.year} {vehicle.make} {vehicle.model}</VehicleDetails>
                  </VehicleInfo>
                  <VehiclePrice>{formatPrice(vehicle.pricing?.price)}</VehiclePrice>
                  <IconButton 
                    color={theme.colors.success}
                    hoverColor={theme.colors.success}
                    onClick={() => addVehicleToSection(vehicle.id)}
                  >
                    <FaPlus />
                  </IconButton>
                </VehicleItem>
              ))}
            </VehicleList>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ActionButton onClick={() => setActiveModal(null)}>Cancel</ActionButton>
          <ActionButton filled onClick={saveSection}>Save Section</ActionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const renderFooterModal = () => (
    <Modal isOpen={activeModal === 'footer'}>
      <ModalContent maxWidth="700px">
        <ModalHeader>
          <ModalTitle>Edit Footer</ModalTitle>
          <CloseButton onClick={() => setActiveModal(null)}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Footer Components</Label>
            <FooterComponentsList>
              <FooterComponent>
                <ComponentName>Social Media Links</ComponentName>
                <ComponentDescription>Display social media icons and links</ComponentDescription>
                <VisibilityButton
                  visible={editingSection?.content?.showSocialMedia}
                  onClick={() => toggleFooterComponent('showSocialMedia')}
                >
                  {editingSection?.content?.showSocialMedia ? <FaEye /> : <FaEyeSlash />}
                </VisibilityButton>
              </FooterComponent>
              
              <FooterComponent>
                <ComponentName>Business Hours</ComponentName>
                <ComponentDescription>Show opening and closing times</ComponentDescription>
                <VisibilityButton
                  visible={editingSection?.content?.showHours}
                  onClick={() => toggleFooterComponent('showHours')}
                >
                  {editingSection?.content?.showHours ? <FaEye /> : <FaEyeSlash />}
                </VisibilityButton>
              </FooterComponent>
              
              <FooterComponent>
                <ComponentName>Location Map</ComponentName>
                <ComponentDescription>Display dealership location</ComponentDescription>
                <VisibilityButton
                  visible={editingSection?.content?.showMap}
                  onClick={() => toggleFooterComponent('showMap')}
                >
                  {editingSection?.content?.showMap ? <FaEye /> : <FaEyeSlash />}
                </VisibilityButton>
              </FooterComponent>
              
              <FooterComponent>
                <ComponentName>Services List</ComponentName>
                <ComponentDescription>Show available services</ComponentDescription>
                <VisibilityButton
                  visible={editingSection?.content?.showServices}
                  onClick={() => toggleFooterComponent('showServices')}
                >
                  {editingSection?.content?.showServices ? <FaEye /> : <FaEyeSlash />}
                </VisibilityButton>
              </FooterComponent>
              
              <FooterComponent>
                <ComponentName>Certifications</ComponentName>
                <ComponentDescription>Display certifications and awards</ComponentDescription>
                <VisibilityButton
                  visible={editingSection?.content?.showCertifications}
                  onClick={() => toggleFooterComponent('showCertifications')}
                >
                  {editingSection?.content?.showCertifications ? <FaEye /> : <FaEyeSlash />}
                </VisibilityButton>
              </FooterComponent>
            </FooterComponentsList>
          </FormGroup>
          
          <FormGroup>
            <Label>Custom Footer Text</Label>
            <TextArea
              value={editingSection?.content?.customText || ''}
              onChange={(e) => updateSectionContent('customText', e.target.value)}
              placeholder="Add any custom text for the footer..."
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={editingSection?.content?.backgroundColor || '#1f2937'}
              onChange={(e) => updateSectionContent('backgroundColor', e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ActionButton onClick={() => setActiveModal(null)}>Cancel</ActionButton>
          <ActionButton filled onClick={saveSection}>Save Section</ActionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const sectionConfigs = {
    hero: {
      name: 'Hero Section',
      description: 'Main banner with dealer branding and call-to-action',
      icon: FaImage,
      color: `${theme.colors.blue500}20`,
      textColor: theme.colors.blue500,
    },
    categories: {
      name: 'Browse by Category',
      description: 'Display vehicle categories for easy browsing',
      icon: FaList,
      color: `${theme.colors.green500}20`,
      textColor: theme.colors.green500,
    },
    featured: {
      name: 'Featured Vehicles',
      description: 'Showcase handpicked vehicles from your inventory',
      icon: FaCar,
      color: `${theme.colors.purple500}20`,
      textColor: theme.colors.purple500,
    },
    'special-offers': {
      name: 'Special Offers',
      description: 'Highlight vehicles with special pricing or promotions',
      icon: FaCar,
      color: `${theme.colors.red500}20`,
      textColor: theme.colors.red500,
    },
    footer: {
      name: 'Footer',
      description: 'Contact information and dealership details',
      icon: FaAlignLeft,
      color: `${theme.colors.gray500}20`,
      textColor: theme.colors.gray500,
    },
  };

  return (
    <>
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
          <SectionsGrid>
            {[...sections]
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const config = sectionConfigs[section.id];
                if (!config) return null;

                return (
                  <SectionCard
                    key={section.id}
                    isVisible={section.visible}
                    color={config.textColor}
                    onClick={() => handleSectionClick(section)}
                  >
                    <CardIcon color={config.color} textColor={config.textColor}>
                      <config.icon />
                    </CardIcon>
                    <CardTitle>{config.name}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                    <CardFooter>
                      <CardBadge color={config.color} textColor={config.textColor}>
                        Default
                      </CardBadge>
                      <VisibilityButton
                        visible={section.visible}
                        onClick={(e) => toggleSectionVisibility(section.id, e)}
                      >
                        {section.visible ? <FaEye /> : <FaEyeSlash />}
                      </VisibilityButton>
                    </CardFooter>
                  </SectionCard>
                );
              })}
          </SectionsGrid>
        </SectionsContainer>
      </ContentContainer>

      {/* Render modals */}
      {renderHeroModal()}
      {renderCategoriesModal()}
      {renderVehicleModal('featured', 'Featured Vehicles')}
      {renderVehicleModal('special-offers', 'Special Offers')}
      {renderFooterModal()}
    </>
  );
};

export default ContentManagementTab;
