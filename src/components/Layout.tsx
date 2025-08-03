import React from 'react';
import { Box } from '@mui/material';
import Header from '../pages/Home/components/Header';

interface LayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {showHeader && <Header />}
            <Box sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
