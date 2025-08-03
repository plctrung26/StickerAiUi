import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

const HomePage: React.FC = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)'
                : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
            <HeroSection />
            <FeaturesSection />
            <CallToActionSection />
            <Footer />
        </Box>
    );
};

export default HomePage;
