import React, { type ReactNode } from 'react';
import { Typography, type SxProps, type Theme } from '@mui/material';

interface BaseTypographyProps {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
    color?: 'primary' | 'secondary' | 'text.primary' | 'text.secondary' | 'error' | 'warning' | 'info' | 'success';
    weight?: 400 | 500 | 600 | 700 | 800 | 900;
    align?: 'left' | 'center' | 'right' | 'justify';
    gradient?: boolean;
    marginBottom?: number;
    customSx?: SxProps<Theme>;
}

const BaseTypography: React.FC<BaseTypographyProps> = ({
    children,
    variant = 'body1',
    color = 'text.primary',
    weight,
    align = 'left',
    gradient = false,
    marginBottom,
    customSx = {}
}) => {
    const getGradientStyles = () => {
        if (!gradient) return {};

        return {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        };
    };

    const getWeightStyles = () => {
        if (!weight) return {};
        return { fontWeight: weight };
    };

    return (
        <Typography
            variant={variant}
            color={gradient ? undefined : color}
            align={align}
            sx={{
                ...getGradientStyles(),
                ...getWeightStyles(),
                ...(marginBottom && { mb: marginBottom }),
                ...customSx
            }}
        >
            {children}
        </Typography>
    );
};

export default BaseTypography;
