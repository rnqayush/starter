import React from 'react';

import HotelDetail from './pages/HotelDetail';

const HotelModule = ({ websiteData, hotelData }) => {
  return <HotelDetail websiteData={websiteData} hotelData={hotelData} />;
};

export default HotelModule;
