import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Card, CardContent } from "../shared/Card";
import { Button } from "../shared/Button";
import {
  Input,
  FormGroup,
  Label,
  TextArea,
  Select,
  InputGroup,
  CheckboxGroup,
  CheckboxItem,
} from "../shared/Input";
import { theme } from "../../styles/GlobalStyle";

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.gray50};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 17.5rem;
  padding: ${theme.spacing.xxl};
  background: white;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    padding-top: 80px;
  }
`;

const AddHotelPageSimple = () => {
  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <h1>Add New Hotel</h1>
        <p>This is the simplified Add Hotel page.</p>
      </MainContent>
    </PageContainer>
  );
};

export default AddHotelPageSimple;
