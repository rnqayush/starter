import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";

const NavbarContainer = styled.nav`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
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
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "theme",
})`
  color: ${theme.colors.gray700};
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
  }

  &.active {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${(props) =>
        props.theme?.primaryColor || theme.colors.primary};
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
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
  width: 300px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${(props) =>
      props.theme?.primaryColor || theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 200px;
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
  gap: ${theme.spacing.lg};
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
  shouldForwardProp: (prop) => prop !== "theme",
})`
  background: none;
  color: ${theme.colors.gray700};
  font-size: 1.2rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme?.primaryColor || theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
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

const Navbar = ({
  cartItemsCount = 0,
  storeName = "",
  storeLogo = "",
  storeSlug = "",
  theme: vendorTheme = {},
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getBaseUrl = () => (storeSlug ? `/${storeSlug}` : "/ecommerce");

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

          <UserButton theme={vendorTheme}>
            <FaUser />
          </UserButton>

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
    </NavbarContainer>
  );
};

export default Navbar;
