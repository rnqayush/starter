import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaCar,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSortAmountUp,
  FaSortAmountDown,
} from 'react-icons/fa';
import { theme } from '../../../styles/GlobalStyle';
import {
  automobileVehicles as vehicles,
  getVehicleAvailabilityStatus as getAvailabilityStatus,
  getVehicleAvailabilityLabel as getAvailabilityLabel,
  getVehicleAvailabilityColor as getAvailabilityColor,
} from '../../../DummyData';

const InventoryContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const InventoryHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
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
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 2.5rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1rem;
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SortButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${theme.colors.gray50};
  border-bottom: 2px solid ${theme.colors.gray200};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray200};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const TableHeaderCell = styled.th`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-align: left;
  font-weight: 600;
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: 0.9rem;
  color: ${theme.colors.gray700};
  vertical-align: middle;
`;

const VehicleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const VehicleImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

const VehicleDetails = styled.div``;

const VehicleName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VehicleSpec = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: prop => prop !== 'color',
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.white};
  background: ${props => props.color || theme.colors.gray500};
`;

const Price = styled.div`
  font-weight: 700;
  color: ${theme.colors.gray900};
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${theme.colors.gray500};

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }

  &.edit:hover {
    color: ${theme.colors.warning};
  }

  &.delete:hover {
    color: ${theme.colors.error};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray500};

  .icon {
    font-size: 3rem;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.gray400};
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray700};
  }
`;

const VehicleInventoryTab = ({ dealer }) => {
  const [vehicleList, setVehicleList] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    // In a real app, this would fetch vehicles for the specific dealer
    setVehicleList(vehicles);
    setFilteredVehicles(vehicles);
  }, []);

  useEffect(() => {
    let filtered = [...vehicleList];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        vehicle =>
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(
        vehicle =>
          (vehicle.category?.slug || vehicle.category) === categoryFilter
      );
    }

    // Condition filter
    if (conditionFilter) {
      filtered = filtered.filter(
        vehicle => vehicle.condition === conditionFilter
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case 'price':
          aVal = a.price;
          bVal = b.price;
          break;
        case 'year':
          aVal = a.year;
          bVal = b.year;
          break;
        case 'mileage':
          aVal = a.mileage;
          bVal = b.mileage;
          break;
        case 'name':
        default:
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredVehicles(filtered);
  }, [
    vehicleList,
    searchTerm,
    categoryFilter,
    conditionFilter,
    sortBy,
    sortDirection,
  ]);

  const handleSort = field => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const stats = {
    total: vehicleList.length,
    available: vehicleList.filter(v => getAvailabilityStatus(v) === 'in_stock')
      .length,
    sold: vehicleList.filter(v => getAvailabilityStatus(v) === 'out_of_stock')
      .length,
    newVehicles: vehicleList.filter(v => v.condition === 'new').length,
  };

  const categories = [
    ...new Set(vehicleList.map(v => v.category?.slug || v.category)),
  ];
  const conditions = [...new Set(vehicleList.map(v => v.condition))];

  return (
    <InventoryContainer>
      <InventoryHeader>
        <HeaderTop>
          <HeaderTitle>
            <FaCar />
            Vehicle Inventory ({filteredVehicles.length})
          </HeaderTitle>
          <AddButton>
            <FaPlus />
            Add New Vehicle
          </AddButton>
        </HeaderTop>

        <FiltersRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search vehicles by name, make, or model..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSelect
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {(typeof category === 'string'
                  ? category
                  : category?.name || category?.slug || 'Unknown'
                )
                  .replace('-', ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            value={conditionFilter}
            onChange={e => setConditionFilter(e.target.value)}
          >
            <option value="">All Conditions</option>
            {conditions.map(condition => (
              <option key={condition} value={condition}>
                {condition.charAt(0).toUpperCase() + condition.slice(1)}
              </option>
            ))}
          </FilterSelect>

          <SortButton onClick={() => handleSort('price')}>
            {sortBy === 'price' && sortDirection === 'desc' ? (
              <FaSortAmountDown />
            ) : (
              <FaSortAmountUp />
            )}
            Sort by Price
          </SortButton>
        </FiltersRow>
      </InventoryHeader>

      <StatsRow>
        <StatItem>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Vehicles</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.available}</StatValue>
          <StatLabel>Available</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.sold}</StatValue>
          <StatLabel>Sold</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.newVehicles}</StatValue>
          <StatLabel>New Vehicles</StatLabel>
        </StatItem>
      </StatsRow>

      <TableContainer>
        {filteredVehicles.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Vehicle</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Condition</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Stock</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {filteredVehicles.map(vehicle => {
                const status = getAvailabilityStatus(vehicle);
                const statusLabel = getAvailabilityLabel(status);
                const statusColor = getAvailabilityColor(status);

                return (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <VehicleInfo>
                        <VehicleImage src={vehicle.image} alt={vehicle.name} />
                        <VehicleDetails>
                          <VehicleName>
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </VehicleName>
                          <VehicleSpec>
                            {vehicle.trim} •{' '}
                            {vehicle.mileage === 0
                              ? 'New'
                              : `${vehicle.mileage.toLocaleString()} mi`}
                          </VehicleSpec>
                        </VehicleDetails>
                      </VehicleInfo>
                    </TableCell>
                    <TableCell>
                      {(
                        vehicle.category?.name ||
                        vehicle.category?.slug ||
                        vehicle.category ||
                        'Unknown'
                      )
                        .replace('-', ' ')
                        .replace(/\b\w/g, l => l.toUpperCase())}
                    </TableCell>
                    <TableCell>
                      {vehicle.condition.charAt(0).toUpperCase() +
                        vehicle.condition.slice(1)}
                    </TableCell>
                    <TableCell>
                      <Price>{formatPrice(vehicle.price)}</Price>
                    </TableCell>
                    <TableCell>
                      <StatusBadge color={statusColor}>
                        {statusLabel}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>{vehicle.stock}</TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton title="View Details">
                          <FaEye />
                        </ActionButton>
                        <ActionButton className="edit" title="Edit Vehicle">
                          <FaEdit />
                        </ActionButton>
                        <ActionButton className="delete" title="Delete Vehicle">
                          <FaTrash />
                        </ActionButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            <FaCar className="icon" />
            <h3>No vehicles found</h3>
            <p>
              Try adjusting your search criteria or add new vehicles to your
              inventory.
            </p>
          </EmptyState>
        )}
      </TableContainer>
    </InventoryContainer>
  );
};

export default VehicleInventoryTab;
