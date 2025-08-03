import React from 'react';
import {
    Container,
    Box,
} from '@mui/material';
import WelcomeSection from './components/WelcomeSection';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const DashboardPage: React.FC = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)'
                : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
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
