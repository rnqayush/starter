import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../../components/auth/AuthModal";
import UserProfile from "../../components/user/UserProfile";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
    FaHome,
  FaEnvelope,
  FaStore,
  FaChevronDown,
  FaHeart,
  FaBell,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const NavbarContainer = styled.nav`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${theme.colors.gray100};
  backdrop-filter: blur(10px);
`;

const NavbarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 70px;
    padding: 0 ${theme.spacing.xs};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 ${theme.spacing.sm};
  }

  @media (min-width: 1025px) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Logo = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.lg};
  object-fit: cover;
  border: 2px solid ${theme.colors.gray200};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-shrink: 1;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    gap: ${theme.spacing.sm};
  }

  @media (min-width: 1201px) {
    gap: ${theme.spacing.lg};
  }
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  color: ${theme.colors.gray700};
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.95rem;

  &:hover {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
    background: ${(props) => props.theme?.primaryColor || theme.colors.primary}10;
    transform: translateY(-1px);
  }

  &.active {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
    background: ${(props) => props.theme?.primaryColor || theme.colors.primary}15;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background: ${(props) =>
        props.theme?.primaryColor || theme.colors.primary};
      border-radius: 50%;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  min-width: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SearchInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 2.5rem;
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: 280px;
  min-width: 200px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${(props) =>
      props.theme?.primaryColor || theme.colors.primary};
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    max-width: 220px;
    min-width: 180px;
  }

  @media (min-width: 1201px) {
    max-width: 300px;
    min-width: 240px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: ${theme.spacing.md};
  color: ${theme.colors.gray400};
  font-size: 0.9rem;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;

  @media (min-width: 1025px) and (max-width: 1200px) {
    gap: ${theme.spacing.xs};
  }

  @media (min-width: 1201px) {
    gap: ${theme.spacing.md};
  }
`;

const CartButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  position: relative;
  background: none;
  color: ${theme.colors.gray700};
  font-size: 1.2rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
  }
`;

const CartBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${(props) => props.theme?.primaryColor || theme.colors.error};
  color: ${theme.colors.white};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

const UserButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "theme" && prop !== "hideOnTablet" && prop !== "hideOnSmallDesktop",
})`
  background: none;
  color: ${theme.colors.gray700};
  font-size: 1.1rem;
  transition: color 0.2s ease;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;

  &:hover {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
    background: ${theme.colors.gray50};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
    min-width: 1.8rem;
    height: 1.8rem;
    ${(props) => props.hideOnTablet && 'display: none;'}
  }

  @media (max-width: 1200px) {
    ${(props) => props.hideOnSmallDesktop && 'display: none;'}
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${theme.colors.gray700};
  font-size: 1.2rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.lg};
  flex-direction: column;
  gap: ${theme.spacing.md};

  &.open {
    display: flex;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

const MobileNavLink = styled(Link)`
  color: ${theme.colors.gray700};
  font-weight: 500;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.gray200};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MobileSearchInput = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  margin-top: ${theme.spacing.md};

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const UserDropdownButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  background: none;
  color: ${theme.colors.gray700};
  font-size: 1rem;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};

  &:hover {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
    background: ${theme.colors.gray50};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const DropdownMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  min-width: 200px;
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  overflow: hidden;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  color: ${theme.colors.gray700};
  transition: all 0.2s ease;
  border-bottom: 1px solid ${theme.colors.gray100};

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${theme.colors.gray200};
  margin: ${theme.spacing.xs} 0;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  color: ${theme.colors.gray700};
  transition: all 0.2s ease;
  border-bottom: 1px solid ${theme.colors.gray100};
  width: 100%;
  text-align: left;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.gray50};
    color: ${theme.colors.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.gray200};
`;

const UserInfo = styled.div`
  .name {
    font-weight: 600;
    color: ${theme.colors.gray900};
    font-size: 0.9rem;
  }

  .role {
    font-size: 0.75rem;
    color: ${theme.colors.gray500};
    text-transform: capitalize;
  }
`;

const LoginButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 0.875rem;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.8rem;
  }

  @media (max-width: 1200px) {
    padding: ${theme.spacing.sm};
  }
`;

const Modal = styled.div`
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
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.gray500};
  cursor: pointer;
  border-radius: 8px;
  padding: 0.5rem;
  z-index: 1;

  &:hover {
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
  }
`;

const Navbar = ({
  cartItemsCount = 0,
  storeName = "",
  storeLogo = "",
  storeSlug = "",
  theme: vendorTheme = {},
}) => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user, isAuthenticated, logout, canAccessSeller } = useAuth();

  const getBaseUrl = () => (storeSlug ? `/${storeSlug}` : "/ecommerce");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const baseUrl = storeSlug ? `/${storeSlug}` : "/ecommerce";
      navigate(
        `${baseUrl}/products?search=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (e.target.value.trim()) {
      navigate(
        `/ecommerce/products?search=${encodeURIComponent(e.target.value.trim())}`,
      );
      setIsMenuOpen(false);
    }
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo to="/ecommerce" theme={vendorTheme}>
          {storeLogo ? (
            <LogoImage src={storeLogo} alt={`${storeName} logo`} />
          ) : (
            <FaShoppingCart />
          )}
          {storeName || "ShopMart"}
        </Logo>

        <NavLinks>
          <NavLink to={getBaseUrl()} theme={vendorTheme}>
            Home
          </NavLink>
          <NavLink to={`${getBaseUrl()}/products`} theme={vendorTheme}>
            Products
          </NavLink>
          <NavLink
            to={`${getBaseUrl()}/products?category=electronics`}
            theme={vendorTheme}
          >
            Electronics
          </NavLink>
          <NavLink
            to={`${getBaseUrl()}/products?category=fashion`}
            theme={vendorTheme}
          >
            Fashion
          </NavLink>
          <NavLink
            to={`${getBaseUrl()}/products?category=home-garden`}
            theme={vendorTheme}
          >
            Home & Garden
          </NavLink>
          <NavLink
            to={`${getBaseUrl()}/products?category=sports`}
            theme={vendorTheme}
          >
            Sports
          </NavLink>
        </NavLinks>

        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              theme={vendorTheme}
            />
          </form>
        </SearchContainer>

                        <NavActions>
          <Link to="/">
            <UserButton title="Back to Main Site" theme={vendorTheme}>
              <FaHome />
            </UserButton>
          </Link>

          <UserButton title="Wishlist" theme={vendorTheme} hideOnTablet>
            <FaHeart />
          </UserButton>

          <UserButton title="Notifications" theme={vendorTheme} hideOnSmallDesktop>
            <FaBell />
          </UserButton>

                              {isAuthenticated ? (
            <UserDropdown ref={dropdownRef}>
              <UserDropdownButton
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                theme={vendorTheme}
              >
                <UserAvatar src={user.avatar} alt={user.name} />
                <UserInfo>
                  <div className="name">{user.name}</div>
                  <div className="role">{user.role}</div>
                </UserInfo>
                <FaChevronDown />
              </UserDropdownButton>

              <DropdownMenu isOpen={isUserDropdownOpen}>
                <DropdownButton
                  onClick={() => {
                    setShowProfile(true);
                    setIsUserDropdownOpen(false);
                  }}
                >
                  <FaUser />
                  My Profile
                </DropdownButton>

                <DropdownItem
                  to={`${getBaseUrl()}/my-enquiries`}
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <FaEnvelope />
                  My Enquiries
                </DropdownItem>

                {canAccessSeller() && (
                  <>
                    <DropdownDivider />
                    <DropdownItem
                      to={`${getBaseUrl()}/seller-dashboard`}
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <FaStore />
                      Seller Dashboard
                    </DropdownItem>
                  </>
                )}

                <DropdownDivider />

                <DropdownButton
                  onClick={() => {
                    logout();
                    setIsUserDropdownOpen(false);
                  }}
                >
                  <FaTimes />
                  Sign Out
                </DropdownButton>
              </DropdownMenu>
            </UserDropdown>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <LoginButton
                onClick={() => {
                  setAuthModalTab("login");
                  setShowAuthModal(true);
                }}
              >
                Sign In
              </LoginButton>
              <LoginButton
                style={{ background: "transparent", color: vendorTheme?.primaryColor || theme.colors.primary, border: `2px solid ${vendorTheme?.primaryColor || theme.colors.primary}` }}
                onClick={() => {
                  setAuthModalTab("register");
                  setShowAuthModal(true);
                }}
              >
                Sign Up
              </LoginButton>
            </div>
          )}

          <Link to={`${getBaseUrl()}/cart`}>
            <CartButton theme={vendorTheme}>
              <FaShoppingCart />
              {cartItemsCount > 0 && (
                <CartBadge theme={vendorTheme}>{cartItemsCount}</CartBadge>
              )}
            </CartButton>
          </Link>

          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavActions>
      </NavbarContent>

      <MobileMenu isOpen={isMenuOpen}>
        <MobileNavLink to={getBaseUrl()} onClick={() => setIsMenuOpen(false)}>
          Home
        </MobileNavLink>
        <MobileNavLink
          to={`${getBaseUrl()}/products`}
          onClick={() => setIsMenuOpen(false)}
        >
          All Products
        </MobileNavLink>
        <MobileNavLink
          to={`${getBaseUrl()}/products?category=electronics`}
          onClick={() => setIsMenuOpen(false)}
        >
          Electronics
        </MobileNavLink>
        <MobileNavLink
          to={`${getBaseUrl()}/products?category=fashion`}
          onClick={() => setIsMenuOpen(false)}
        >
          Fashion
        </MobileNavLink>
        <MobileNavLink
          to="/ecommerce/products?category=home-garden"
          onClick={() => setIsMenuOpen(false)}
        >
          Home & Garden
        </MobileNavLink>
                <MobileNavLink
          to="/ecommerce/products?category=sports"
          onClick={() => setIsMenuOpen(false)}
        >
          Sports
        </MobileNavLink>

                {isAuthenticated ? (
          <>
            <MobileNavLink
              to="#"
              onClick={() => {
                setShowProfile(true);
                setIsMenuOpen(false);
              }}
            >
              👤 My Profile
            </MobileNavLink>

            <MobileNavLink
              to={`${getBaseUrl()}/my-enquiries`}
              onClick={() => setIsMenuOpen(false)}
            >
              📧 My Enquiries
            </MobileNavLink>

            {canAccessSeller() && (
              <MobileNavLink
                to={`${getBaseUrl()}/seller-dashboard`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏪 Seller Dashboard
              </MobileNavLink>
            )}

            <MobileNavLink
              to="#"
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
            >
              🚪 Sign Out
            </MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink
              to="#"
              onClick={() => {
                setAuthModalTab("login");
                setShowAuthModal(true);
                setIsMenuOpen(false);
              }}
            >
              🔑 Sign In
            </MobileNavLink>

            <MobileNavLink
              to="#"
              onClick={() => {
                setAuthModalTab("register");
                setShowAuthModal(true);
                setIsMenuOpen(false);
              }}
            >
              📝 Sign Up
            </MobileNavLink>
          </>
        )}

                <form onSubmit={handleSearch}>
          <MobileSearchInput
            type="text"
            placeholder="Search products..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleMobileSearch(e);
              }
            }}
          />
        </form>
      </MobileMenu>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />

      {/* Profile Modal */}
      {showProfile && (
        <Modal onClick={() => setShowProfile(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setShowProfile(false)}>
              <FaTimes />
            </ModalCloseButton>
            <UserProfile onClose={() => setShowProfile(false)} />
          </ModalContent>
        </Modal>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
