import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FaSave,
  FaGlobe,
  FaCar,
  FaSearch,
  FaTrash,
  FaPlus,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';
import {
  selectPageSections,
  selectVehicles,
  selectVendor,
  selectLoading,
  updatePageSections,
  publishPageContent,
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

const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['color', 'hoverColor'].includes(prop),
})`
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

const FeaturedSectionEdit = ({ dealer }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectPageSections);
  const vehicles = useSelector(selectVehicles);
  const vendor = useSelector(selectVendor);
  const loading = useSelector(selectLoading);
  
  const [sectionContent, setSectionContent] = useState({
    title: 'Featured Vehicles',
    subtitle: '',
    vehicleIds: [],
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);

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

  // Initialize with data from Redux state
  useEffect(() => {
    const featuredSection = sections.find(s => s.id === 'featured');
    if (featuredSection?.content) {
      setSectionContent({
        title: featuredSection.content.title || 'Featured Vehicles',
        subtitle: featuredSection.content.subtitle || (vendor?.name ? `Handpicked vehicles from ${vendor.name} that customers love the most` : ''),
        vehicleIds: featuredSection.content.vehicleIds || [],
      });
    } else {
      // Initialize with featured vehicles from data
      const featuredVehicleIds = vehicles?.filter(v => v.featured).map(v => v.id).slice(0, 4) || [];
      setSectionContent(prev => ({
        ...prev,
        subtitle: vendor?.name ? `Handpicked vehicles from ${vendor.name} that customers love the most` : '',
        vehicleIds: featuredVehicleIds,
      }));
    }
  }, [sections, vehicles, vendor]);

  const updateContent = (field, value) => {
    setSectionContent(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const addVehicleToSection = (vehicleId) => {
    const currentVehicles = sectionContent.vehicleIds || [];
    if (!currentVehicles.includes(vehicleId)) {
      updateContent('vehicleIds', [...currentVehicles, vehicleId]);
    }
  };

  const removeVehicleFromSection = (vehicleId) => {
    const currentVehicles = sectionContent.vehicleIds || [];
    updateContent('vehicleIds', currentVehicles.filter(id => id !== vehicleId));
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

  const saveChanges = () => {
    const updatedSections = sections.map(section => 
      section.id === 'featured' 
        ? { ...section, content: { ...section.content, ...sectionContent } }
        : section
    );
    
    dispatch(updatePageSections(updatedSections));
    setHasChanges(false);
    alert('Featured vehicles section saved successfully!');
  };

  const publishChanges = () => {
    const updatedSections = sections.map(section => 
      section.id === 'featured' 
        ? { ...section, content: { ...section.content, ...sectionContent } }
        : section
    );
    
    dispatch(publishPageContent(updatedSections));
    setHasChanges(false);
    alert('Featured vehicles section published successfully! Changes are now live.');
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <SectionIcon>
            <FaCar />
          </SectionIcon>
          <HeaderTitle>Featured Vehicles</HeaderTitle>
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
        <FormGroup>
          <Label>Section Title</Label>
          <Input
            type="text"
            value={sectionContent.title}
            onChange={(e) => updateContent('title', e.target.value)}
            placeholder="Featured Vehicles"
          />
        </FormGroup>

        <FormGroup>
          <Label>Section Subtitle</Label>
          <TextArea
            value={sectionContent.subtitle}
            onChange={(e) => updateContent('subtitle', e.target.value)}
            placeholder="Section description"
          />
        </FormGroup>

        <FormGroup>
          <Label>Current Featured Vehicles</Label>
          <VehicleList>
            {sectionContent.vehicleIds?.map(vehicleId => {
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
              ?.filter(vehicle => !sectionContent.vehicleIds?.includes(vehicle.id))
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
      </Content>
    </Container>
  );
};

export default FeaturedSectionEdit;
