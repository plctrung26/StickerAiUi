import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

const HomePage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <CallToActionSection />
            <Footer />
        </Box>
    );
};

export default HomePage;
