import React, { type ReactElement } from 'react';
import { Box } from '@mui/material';

interface ActionIconProps {
    icon: ReactElement;
    bgColor: string;
    size?: number;
}

const ActionIcon: React.FC<ActionIconProps> = ({
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

export default ActionIcon;
