import React from 'react';
import {
    Container,
    Box,
} from '@mui/material';
import DashboardHeader from './components/DashboardHeader';
import WelcomeSection from './components/WelcomeSection';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const DashboardPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            <DashboardHeader />

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
                <WelcomeSection />
                <StatsCards />
                <QuickActions />
                <RecentActivity />
            </Container>
        </Box>
    );
};

export default DashboardPage;
