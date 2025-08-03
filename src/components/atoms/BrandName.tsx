import React from 'react';
import { Typography } from '@mui/material';

interface BrandNameProps {
    name: string;
    variant?: 'h6' | 'h5' | 'h4';
}

const BrandName: React.FC<BrandNameProps> = ({ name, variant = 'h6' }) => {
    return (
        <Typography
            variant={variant}
            component="div"
            sx={{
                fontSize: { xs: '1.4rem', md: '1.6rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}
        >
            {name}
        </Typography>
    );
};

export default BrandName;
