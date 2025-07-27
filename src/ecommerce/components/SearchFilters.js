import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaSlidersH,
  FaStar,
  FaTag,
} from 'react-icons/fa';
import { theme } from '../../styles/GlobalStyle';

const FilterContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.xl};
  overflow: hidden;
`;

const SearchSection = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray200};
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.md};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}
    ${theme.spacing.xxl};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  z-index: 1;
`;

const QuickFilters = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const QuickFilterButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'active',
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid
    ${props => (props.active ? theme.colors.primary : theme.colors.gray200)};
  background: ${props =>
    props.active ? theme.colors.primary + '10' : theme.colors.white};
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.gray700};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const AdvancedFiltersToggle = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.gray50};
  border: none;
  border-top: 1px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }
`;

const AdvancedFiltersContent = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'expanded',
})`
  display: ${props => (props.expanded ? 'block' : 'none')};
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray200};
  background: ${theme.colors.gray50};
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FilterGroup = styled.div``;

const FilterLabel = styled.label`
  display: block;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${theme.colors.gray200};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${theme.colors.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${theme.colors.primary};
    cursor: pointer;
    border: none;
  }
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.sm};
  font-size: 0.8rem;
  color: ${theme.colors.gray600};
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
  cursor: pointer;
`;

const Star = styled(FaStar).withConfig({
  shouldForwardProp: prop => !['filled', 'hovered'].includes(prop),
})`
  color: ${props =>
    props.filled || props.hovered ? '#fbbf24' : theme.colors.gray300};
  font-size: 1rem;
  transition: color 0.2s ease;
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const ActiveFilter = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 500;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

const ClearAllButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const SearchFilters = ({
  onFiltersChange,
  categories = [],
  brands = [],
  locations = [],
  maxPrice = 1000,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [minRating, setMinRating] = useState(0);
  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const quickFilters = [
    { key: 'featured', label: 'Featured', icon: FaStar },
    { key: 'new', label: 'New Arrivals', icon: FaTag },
    { key: 'sale', label: 'On Sale', icon: FaTag },
    { key: 'high_rated', label: 'Top Rated', icon: FaStar },
  ];

  const [activeQuickFilters, setActiveQuickFilters] = useState(new Set());

  useEffect(() => {
    const filters = {
      searchTerm,
      category: selectedCategory,
      brand: selectedBrand,
      location: selectedLocation,
      priceRange,
      minRating,
      availability,
      sortBy,
      quickFilters: Array.from(activeQuickFilters),
    };

    onFiltersChange(filters);
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedLocation,
    priceRange,
    minRating,
    availability,
    sortBy,
    activeQuickFilters,
    onFiltersChange,
  ]);

  const handleQuickFilterToggle = filterKey => {
    const newFilters = new Set(activeQuickFilters);
    if (newFilters.has(filterKey)) {
      newFilters.delete(filterKey);
    } else {
      newFilters.add(filterKey);
    }
    setActiveQuickFilters(newFilters);
  };

  const handleStarClick = rating => {
    setMinRating(rating === minRating ? 0 : rating);
  };

  const getActiveFilters = () => {
    const filters = [];

    if (searchTerm) filters.push({ key: 'search', label: `"${searchTerm}"` });
    if (selectedCategory)
      filters.push({ key: 'category', label: selectedCategory });
    if (selectedBrand) filters.push({ key: 'brand', label: selectedBrand });
    if (selectedLocation)
      filters.push({ key: 'location', label: selectedLocation });
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
      filters.push({
        key: 'price',
        label: `$${priceRange[0]} - $${priceRange[1]}`,
      });
    }
    if (minRating > 0)
      filters.push({ key: 'rating', label: `${minRating}+ stars` });
    if (availability !== 'all')
      filters.push({ key: 'availability', label: availability });

    activeQuickFilters.forEach(filter => {
      const quickFilter = quickFilters.find(f => f.key === filter);
      if (quickFilter) filters.push({ key: filter, label: quickFilter.label });
    });

    return filters;
  };

  const removeFilter = filterKey => {
    switch (filterKey) {
      case 'search':
        setSearchTerm('');
        break;
      case 'category':
        setSelectedCategory('');
        break;
      case 'brand':
        setSelectedBrand('');
        break;
      case 'location':
        setSelectedLocation('');
        break;
      case 'price':
        setPriceRange([0, maxPrice]);
        break;
      case 'rating':
        setMinRating(0);
        break;
      case 'availability':
        setAvailability('all');
        break;
      default:
        // Handle quick filters
        const newFilters = new Set(activeQuickFilters);
        newFilters.delete(filterKey);
        setActiveQuickFilters(newFilters);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedLocation('');
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setAvailability('all');
    setSortBy('relevance');
    setActiveQuickFilters(new Set());
  };

  const activeFilters = getActiveFilters();

  return (
    <FilterContainer>
      <SearchSection>
        <SearchWrapper>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search products, brands, or descriptions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <QuickFilters>
          {quickFilters.map(filter => (
            <QuickFilterButton
              key={filter.key}
              active={activeQuickFilters.has(filter.key)}
              onClick={() => handleQuickFilterToggle(filter.key)}
            >
              <filter.icon />
              {filter.label}
            </QuickFilterButton>
          ))}
        </QuickFilters>

        {activeFilters.length > 0 && (
          <ActiveFilters>
            {activeFilters.map((filter, index) => (
              <ActiveFilter key={index}>
                {filter.label}
                <RemoveFilterButton onClick={() => removeFilter(filter.key)}>
                  <FaTimes />
                </RemoveFilterButton>
              </ActiveFilter>
            ))}
            <ClearAllButton onClick={clearAllFilters}>Clear All</ClearAllButton>
          </ActiveFilters>
        )}
      </SearchSection>

      <AdvancedFiltersToggle onClick={() => setShowAdvanced(!showAdvanced)}>
        <span>
          <FaSlidersH style={{ marginRight: theme.spacing.sm }} />
          Advanced Filters
        </span>
        {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
      </AdvancedFiltersToggle>

      <AdvancedFiltersContent expanded={showAdvanced}>
        <FilterRow>
          <FilterGroup>
            <FilterLabel>Category</FilterLabel>
            <FilterSelect
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.slug} value={category.name}>
                  {category.name}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Brand</FilterLabel>
            <FilterSelect
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Location</FilterLabel>
            <FilterSelect
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Sort By</FilterLabel>
            <FilterSelect
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>

        <FilterRow>
          <FilterGroup>
            <FilterLabel>Price Range</FilterLabel>
            <RangeSlider
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={e =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
            />
            <RangeValues>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </RangeValues>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Minimum Rating</FilterLabel>
            <StarRating>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  filled={star <= minRating}
                  hovered={star <= hoveredStar}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                />
              ))}
            </StarRating>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Availability</FilterLabel>
            <FilterSelect
              value={availability}
              onChange={e => setAvailability(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
      </AdvancedFiltersContent>
    </FilterContainer>
  );
};

export default SearchFilters;
