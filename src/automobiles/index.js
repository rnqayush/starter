import React from 'react';
import { useLocation } from 'react-router-dom';
import AutomobileMain from './pages/AutomobileMain';

const AutomobileModule = ({ websiteData }) => {
  return <AutomobileMain websiteData={websiteData} />;
};

export default AutomobileModule;
