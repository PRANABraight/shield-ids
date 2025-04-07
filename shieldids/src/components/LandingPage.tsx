import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeroSection from './Hero';
import Navbar from './Navbar';
import FeaturesSection from './FeatureSection';
// import FeaturesSection from './FeatureSection';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCTAClick = () => {
        navigate('/register'); 
    };

    return (
      <>
            <div className="App">
              
              <HeroSection />
              <FeaturesSection />
              
            </div>
        </ >
    );
};

export default LandingPage;
