import React, { type ReactNode } from 'react';
import { Paper, type SxProps, type Theme } from '@mui/material';

interface BaseCardProps {
    children: ReactNode;
    variant?: 'glass' | 'elevated' | 'flat' | 'bordered';
    padding?: number | string;
    borderRadius?: number | string;
    onClick?: () => void;
    hover?: boolean;
    customSx?: SxProps<Theme>;
}

const BaseCard: React.FC<BaseCardProps> = ({
    children,
    variant = 'glass',
    padding = 3,
    borderRadius = '20px',
    onClick,
    hover = false,
    customSx = {}
}) => {
    const getVariantStyles = () => {
        const baseHoverStyles = hover ? {
            transition: 'all 0.3s ease',
            cursor: onClick ? 'pointer' : 'default',
            mb: 1, // Add margin to prevent layout shift
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                mb: '9px', // Compensate for translateY movement
            }
        } : {};

        switch (variant) {
            case 'glass':
                return {
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    ...baseHoverStyles
                };
            case 'elevated':
                return {
                    background: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    ...baseHoverStyles
                };
            case 'bordered':
                return {
                    background: '#ffffff',
                    border: '2px solid #e2e8f0',
                    boxShadow: 'none',
                    ...baseHoverStyles
                };
            case 'flat':
                return {
                    background: '#f8fafc',
                    border: 'none',
                    boxShadow: 'none',
                    ...baseHoverStyles
                };
            default:
                return baseHoverStyles;
        }
    };

    return (
        <Paper
            onClick={onClick}
            sx={{
                p: padding,
                borderRadius,
                ...getVariantStyles(),
                ...customSx
            }}
        >
            {children}
        </Paper>
    );
};

export default BaseCard;
