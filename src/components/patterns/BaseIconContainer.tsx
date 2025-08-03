import React, { type ReactElement } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

interface BaseIconContainerProps {
    icon: ReactElement;
    size?: number;
    borderRadius?: number | string;
    background?: string;
    color?: string;
    customSx?: SxProps<Theme>;
}

const BaseIconContainer: React.FC<BaseIconContainerProps> = ({
    icon,
    size = 60,
    borderRadius = '16px',
    background = 'rgba(102, 126, 234, 0.1)',
    color = '#667eea',
    customSx = {}
}) => {
    return (
        <Box
            sx={{
                width: size,
                height: size,
                borderRadius,
                background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                '& svg': {
                    fontSize: size * 0.5,
                    color,
                },
                ...customSx
            }}
        >
            {icon}
        </Box>
    );
};

export default BaseIconContainer;
