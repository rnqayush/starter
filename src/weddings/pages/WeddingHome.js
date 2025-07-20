import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaLocationArrow,
  FaHome,
  FaRing,
  FaHeart,
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaUsers,
  FaCamera,
    FaBirthdayCake,
  FaMusic,
  FaLeaf,
    FaGem,
  FaCheck,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { weddingVendors } from "../data/vendors";
import {
  getCurrentLocation,
  getLocationFromZip,
  searchLocationByCity,
  updateVendorsWithDistance,
  getDefaultLocation,
} from "../../utils/location";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.gray50};
`;

const NavHeader = styled.div`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  border-bottom: 1px solid ${theme.colors.gray200};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.gray700};
  font-size: 1.5rem;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavActions = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.white};
    flex-direction: column;
    justify-content: center;
    gap: ${theme.spacing.xl};
    z-index: 1001;
    transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
    transition: transform 0.3s ease;
    padding: ${theme.spacing.xl};
    box-shadow: ${theme.shadows.xl};
  }
`;

const BackButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: 1.1rem;
    justify-content: center;
    min-width: 200px;
  }
`;

const MobileMenuOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
    transition: all 0.3s ease;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  flex: 1;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.xxl} 0;
  background: linear-gradient(135deg, ${theme.colors.primary}10 0%, ${theme.colors.secondary}10 100%);
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const LocationDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;

const SearchSection = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: ${theme.spacing.md};
  align-items: end;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.gray500};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 1.1rem;
`;

const LocationButton = styled.button`
  background: ${theme.colors.gray100};
  border: 2px solid ${theme.colors.gray200};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.gray200};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SearchButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const CategorySection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const CategoryCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "selected",
})`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${(props) => props.selected ? theme.colors.primary : 'transparent'};
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.primary};
  }

  ${(props) => props.selected && `
    background: ${theme.colors.primary}10;
    transform: translateY(-2px);
  `}
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const CategoryName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.sm};
`;

const CategoryCount = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
`;

const CategoryCheckbox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "checked",
})`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => props.checked ? theme.colors.primary : theme.colors.gray300};
  border-radius: 4px;
  background: ${(props) => props.checked ? theme.colors.primary : theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    color: ${theme.colors.white};
    font-size: 0.8rem;
    opacity: ${(props) => props.checked ? 1 : 0};
        transition: opacity 0.2s ease;
  }
`;

const ActionButton = styled.button`
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray300};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.primary}05;
  }
`;

const VendorsSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const FiltersRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.white};
  color: ${(props) =>
    props.active ? theme.colors.white : theme.colors.gray700};
  border: 2px solid
    ${(props) => (props.active ? theme.colors.primary : theme.colors.gray200)};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const SortSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const VendorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const VendorCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary};
  }
`;

const VendorImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const VendorContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const VendorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const VendorInfo = styled.div`
  flex: 1;
`;

const VendorName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin-bottom: ${theme.spacing.xs};
`;

const VendorLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.sm};
`;

const VendorRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.warning};
  font-weight: 600;
`;

const VendorBadge = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
`;

const VendorDescription = styled.p`
  color: ${theme.colors.gray600};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
`;

const SpecialtiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const SpecialtyTag = styled.span`
  background: ${theme.colors.gray100};
  color: ${theme.colors.gray700};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
`;

const VendorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.gray200};
`;

const ContactInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const ViewButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  .spinner {
    margin-bottom: ${theme.spacing.lg};
    font-size: 3rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray600};

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray900};
  }

  p {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const WeddingHome = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
    const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [locationLoading, setLocationLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(["venue"]); // Default to venues checked
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Venues", icon: FaLeaf, count: 15, filter: "venue" },
    { name: "Photography", icon: FaCamera, count: 25, filter: "photography" },
        { name: "Catering", icon: FaBirthdayCake, count: 18, filter: "catering" },
    { name: "Music & DJ", icon: FaMusic, count: 12, filter: "music" },
    { name: "Floral", icon: FaLeaf, count: 20, filter: "floral" },
    { name: "Jewelry", icon: FaGem, count: 8, filter: "jewelry" },
  ];

  const loadVendorsForLocation = useCallback((location) => {
    const vendorsWithDistance = updateVendorsWithDistance(
      weddingVendors,
      location,
    );
    setVendors(vendorsWithDistance);
    setFilteredVendors(vendorsWithDistance);
    setLoading(false);
  }, []);

  const initializeLocation = useCallback(async () => {
    setLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      loadVendorsForLocation(location);
    } catch (error) {
      console.error("Failed to get location:", error);
      const defaultLocation = getDefaultLocation();
      setCurrentLocation(defaultLocation);
      loadVendorsForLocation(defaultLocation);
    }
  }, [loadVendorsForLocation]);

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLocationLoading(true);
    try {
      let newLocation;

      if (/^\d{5}$/.test(searchTerm.trim())) {
        newLocation = await getLocationFromZip(searchTerm.trim());
      } else {
        newLocation = await searchLocationByCity(searchTerm.trim());
      }

      setCurrentLocation(newLocation);
      loadVendorsForLocation(newLocation);
      setSearchTerm("");
    } catch (error) {
      alert("Location not found. Please try a different city or ZIP code.");
    } finally {
      setLocationLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      loadVendorsForLocation(location);
    } catch (error) {
      alert(
        "Unable to get your current location. Please check your browser settings.",
      );
    } finally {
      setLocationLoading(false);
    }
  };

    const applyFilters = useCallback(() => {
    let filtered = [...vendors];

        // Filter by selected categories (only if categories are selected)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((vendor) =>
        vendor.specialties.some(specialty =>
          selectedCategories.some(category => {
            const categoryMap = {
              "venue": ["venue", "wedding venue", "reception venue", "wedding planning"],
              "photography": ["photography", "photographer", "wedding photography"],
              "catering": ["catering", "food", "wedding catering", "reception catering"],
              "music": ["music", "dj", "band", "entertainment"],
              "floral": ["floral", "flowers", "floral arrangements", "bouquet"],
              "jewelry": ["jewelry", "rings", "wedding rings", "engagement rings"]
            };

            const categoryTerms = categoryMap[category] || [category];
            return categoryTerms.some(term =>
              specialty.toLowerCase().includes(term.toLowerCase())
            );
          })
        )
      );
    }

    // Filter by featured status
    if (activeFilter === "featured") {
      filtered = filtered.filter((vendor) => vendor.featured);
    }

    // Sort vendors
    switch (sortBy) {
      case "distance":
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredVendors(filtered);
  }, [vendors, activeFilter, sortBy, selectedCategories]);

  const handleVendorClick = (vendor) => {
    navigate(`/${vendor.id}`);
  };

      const handleCategoryClick = (category) => {
    const categoryFilter = category.filter;
    setSelectedCategories(prev => {
      if (prev.includes(categoryFilter)) {
        // If already selected, remove it (uncheck)
        return prev.filter(cat => cat !== categoryFilter);
      } else {
        // If not selected, add it (check)
        return [...prev, categoryFilter];
      }
    });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    initializeLocation();
  }, [initializeLocation]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (loading) {
    return (
      <PageContainer>
                <NavHeader>
          <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
          <NavContent>
            <Logo>
              <FaRing /> Wedding Vendors
            </Logo>
            <NavActions isOpen={mobileMenuOpen}>
              <BackButton onClick={() => { navigate("/"); closeMobileMenu(); }}>
                <FaHome />
                Back to Home
              </BackButton>
            </NavActions>
            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </MobileMenuButton>
          </NavContent>
        </NavHeader>
        <LoadingState>
          <div className="spinner">💍</div>
          <h3>Finding wedding vendors near you...</h3>
          <p>Please wait while we locate nearby wedding services.</p>
        </LoadingState>
      </PageContainer>
    );
  }

  return (
        <PageContainer>
      <NavHeader>
        <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
        <NavContent>
          <Logo>
            <FaRing /> Wedding Vendors
          </Logo>
          <NavActions isOpen={mobileMenuOpen}>
            <BackButton onClick={() => { navigate("/"); closeMobileMenu(); }}>
              <FaHome />
              Back to Home
            </BackButton>
          </NavActions>
          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContent>
      </NavHeader>

      <Container>
        <HeroSection>
          <HeroTitle>
            <FaHeart color={theme.colors.primary} />
            Find Your Perfect Wedding Vendors
            <FaRing color={theme.colors.secondary || theme.colors.primary} />
          </HeroTitle>
          <HeroSubtitle>
            Discover amazing wedding professionals near you to make your special day unforgettable.
            From venues to photography, catering to music - we've got you covered.
          </HeroSubtitle>
          {currentLocation && (
            <LocationDisplay>
              <FaMapMarkerAlt />
              <span>
                {currentLocation.city}, {currentLocation.state}
                {currentLocation.isDefault && " (Default Location)"}
              </span>
            </LocationDisplay>
          )}
        </HeroSection>

        <SearchSection>
          <SearchForm onSubmit={handleLocationSearch}>
            <SearchInputContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Enter city name or ZIP code to find vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputContainer>

            <LocationButton
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locationLoading}
            >
              <FaLocationArrow />
              Use My Location
            </LocationButton>

            <SearchButton type="submit" disabled={locationLoading}>
              {locationLoading ? "Searching..." : "Search"}
            </SearchButton>
          </SearchForm>
        </SearchSection>

                <CategorySection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <SectionTitle>Wedding Services</SectionTitle>
            <ActionButton onClick={() => setSelectedCategories([])}>
              Clear All
            </ActionButton>
          </div>
          <CategoryGrid>
                        {categories.map((category, index) => {
              const isSelected = selectedCategories.includes(category.filter);
              return (
                <CategoryCard
                  key={index}
                  selected={isSelected}
                  onClick={() => handleCategoryClick(category)}
                >
                  <CategoryCheckbox checked={isSelected}>
                    <FaCheck />
                  </CategoryCheckbox>
                  <CategoryIcon>
                    <category.icon />
                  </CategoryIcon>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryCount>{category.count} vendors available</CategoryCount>
                </CategoryCard>
              );
            })}
          </CategoryGrid>
        </CategorySection>

        <VendorsSection>
                    <SectionTitle>
            {selectedCategories.length > 0
              ? `${selectedCategories.map(cat => {
                  const category = categories.find(c => c.filter === cat);
                  return category ? category.name : cat;
                }).join(', ')} Vendors Near You`
              : 'Wedding Vendors Near You'
            }
          </SectionTitle>
          
          <FiltersRow>
            <FilterGroup>
              <FilterButton
                active={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
              >
                All Vendors
              </FilterButton>
              <FilterButton
                active={activeFilter === "featured"}
                onClick={() => setActiveFilter("featured")}
              >
                Featured
              </FilterButton>
            </FilterGroup>

            <FilterGroup>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="distance">Sort by Distance</option>
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
              </SortSelect>
            </FilterGroup>
          </FiltersRow>

          {filteredVendors.length > 0 ? (
            <VendorsGrid>
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} onClick={() => handleVendorClick(vendor)}>
                  <VendorImage src={vendor.image} alt={vendor.name} />
                  <VendorContent>
                    <VendorHeader>
                      <VendorInfo>
                        <VendorName>{vendor.name}</VendorName>
                        <VendorLocation>
                          <FaMapMarkerAlt />
                          {vendor.distance}mi • {vendor.city}, {vendor.state}
                        </VendorLocation>
                        <VendorRating>
                          <FaStar />
                          {vendor.rating} ({vendor.reviewCount} reviews)
                        </VendorRating>
                      </VendorInfo>
                      {vendor.featured && (
                        <VendorBadge>Featured</VendorBadge>
                      )}
                    </VendorHeader>

                    <VendorDescription>{vendor.description}</VendorDescription>

                    <SpecialtiesGrid>
                      {vendor.specialties.slice(0, 4).map((specialty, index) => (
                        <SpecialtyTag key={index}>{specialty}</SpecialtyTag>
                      ))}
                    </SpecialtiesGrid>

                    <VendorFooter>
                      <ContactInfo>
                        <ContactItem>
                          <FaPhoneAlt />
                          Call
                        </ContactItem>
                        <ContactItem>
                          <FaEnvelope />
                          Email
                        </ContactItem>
                      </ContactInfo>
                      <ViewButton>View Details</ViewButton>
                    </VendorFooter>
                  </VendorContent>
                </VendorCard>
              ))}
            </VendorsGrid>
          ) : (
            <EmptyState>
              <h3>No vendors found</h3>
              <p>
                Try searching for a different location or adjusting your filters.
              </p>
            </EmptyState>
          )}
        </VendorsSection>
      </Container>
    </PageContainer>
  );
};

export default WeddingHome;
