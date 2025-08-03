import React, { type ReactElement } from 'react';
import { Box } from '@mui/material';

interface StatIconProps {
    icon: ReactElement;
    bgColor: string;
    size?: number;
}

const StatIcon: React.FC<StatIconProps> = ({
    icon,
    bgColor,
    size = 60
}) => {
    return (
        <Box sx={{
            width: size,
            height: size,
            borderRadius: '16px',
            background: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
        }}>
            {icon}
        </Box>
    );
};

export default StatIcon;
