import React, { useState } from "react";
import styled from "styled-components";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
} from "react-icons/fa";
import { theme } from "../../styles/GlobalStyle";
import { sellerProducts } from "../data/sellerData";

const ProductsContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray200};
  overflow: hidden;
`;

const ProductsHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: between;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  flex: 1;
  min-width: 200px;
`;

const HeaderTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray600};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  position: relative;
  min-width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}
    ${theme.spacing.xxl};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  background: ${theme.colors.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray400};
  font-size: 0.9rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.gray700};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
    border-color: ${theme.colors.gray400};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.white};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ProductsTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${theme.colors.gray50};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray200};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.gray50};
  }
`;

const TableHeaderCell = styled.th`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${theme.colors.gray700};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 0.9rem;
  color: ${theme.colors.gray900};
  vertical-align: middle;
`;

const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
  border: 1px solid ${theme.colors.gray200};
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h4`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${theme.colors.gray900};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const ProductCategory = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.gray500};
  margin: 0;
`;

const Price = styled.span`
  font-weight: 600;
  color: ${theme.colors.gray900};
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "status",
})`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    switch (props.status) {
      case "active":
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case "out_of_stock":
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      case "draft":
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      default:
        return `
          background: ${theme.colors.gray200};
          color: ${theme.colors.gray600};
        `;
    }
  }}
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const StockNumber = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "low",
})`
  font-weight: 500;
  color: ${(props) =>
    props.low ? theme.colors.warning : theme.colors.gray900};
`;

const StockLabel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.gray500};
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "color",
})`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.gray300};
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.white};
  color: ${theme.colors.gray600};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.color || theme.colors.primary};
    color: ${(props) => props.color || theme.colors.primary};
    background: ${(props) => (props.color || theme.colors.primary) + "10"};
  }

  &.danger:hover {
    border-color: ${theme.colors.error};
    color: ${theme.colors.error};
    background: ${theme.colors.error}10;
  }
`;

const ProductsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState(sellerProducts);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "out_of_stock":
        return "Out of Stock";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  return (
    <ProductsContainer>
      <ProductsHeader>
        <HeaderLeft>
          <HeaderTitle>Products</HeaderTitle>
          <HeaderSubtitle>
            Manage your product catalog and inventory
          </HeaderSubtitle>
        </HeaderLeft>

        <HeaderActions>
          <SearchBox>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <FilterButton>
            <FaFilter />
            Filter
          </FilterButton>

          <AddButton>
            <FaPlus />
            Add Product
          </AddButton>
        </HeaderActions>
      </ProductsHeader>

      <ProductsTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Sold</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Revenue</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <ProductInfo>
                    <ProductImage src={product.image} alt={product.name} />
                    <ProductDetails>
                      <ProductName>{product.name}</ProductName>
                      <ProductCategory>{product.category}</ProductCategory>
                    </ProductDetails>
                  </ProductInfo>
                </TableCell>
                <TableCell>
                  <Price>{formatCurrency(product.price)}</Price>
                </TableCell>
                <TableCell>
                  <StockInfo>
                    <StockNumber low={product.stock < 10}>
                      {product.stock}
                    </StockNumber>
                    <StockLabel>in stock</StockLabel>
                  </StockInfo>
                </TableCell>
                <TableCell>{product.sold}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status}>
                    {getStatusText(product.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <Price>{formatCurrency(product.revenue)}</Price>
                </TableCell>
                <TableCell>
                  <ActionButtons>
                    <ActionButton title="View">
                      <FaEye />
                    </ActionButton>
                    <ActionButton title="Edit">
                      <FaEdit />
                    </ActionButton>
                    <ActionButton className="danger" title="Delete">
                      <FaTrash />
                    </ActionButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ProductsTable>
    </ProductsContainer>
  );
};

export default ProductsTab;
