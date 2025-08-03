import React from 'react';
import { Box } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

interface BrandLogoProps {
    size?: number;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ size = 40 }) => {
    return (
        <Box sx={{
            width: size,
            height: size,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2
        }}>
            <AutoAwesome sx={{ color: 'white', fontSize: size * 0.6 }} />
        </Box>
    );
};

export default BrandLogo;
