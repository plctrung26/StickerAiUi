import React, { type ReactElement } from 'react';
import { Button, type SxProps, type Theme } from '@mui/material';

interface BaseButtonProps {
    text: string;
    onClick: () => void;
    variant?: 'outlined' | 'contained' | 'text';
    size?: 'small' | 'medium' | 'large';
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    colorScheme?: 'primary' | 'secondary' | 'danger' | 'neutral';
    customSx?: SxProps<Theme>;
    fullWidth?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
    text,
    onClick,
    variant = 'outlined',
    size = 'small',
    startIcon,
    endIcon,
    colorScheme = 'neutral',
    customSx = {},
    fullWidth = false
}) => {
    const getColorSchemeStyles = () => {
        const baseStyles = {
            borderRadius: '12px',
            textTransform: 'none' as const,
            fontWeight: 600,
            px: 2,
        };

        switch (colorScheme) {
            case 'primary':
                return {
                    ...baseStyles,
                    background: variant === 'contained'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'transparent',
                    borderColor: variant === 'outlined' ? '#667eea' : 'transparent',
                    color: variant === 'contained' ? 'white' : '#667eea',
                    boxShadow: variant === 'contained'
                        ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                        : 'none',
                    '&:hover': {
                        boxShadow: variant === 'contained'
                            ? '0 6px 16px rgba(102, 126, 234, 0.4)'
                            : 'none',
                        transform: variant === 'contained' ? 'translateY(-1px)' : 'none',
                        background: variant === 'outlined'
                            ? 'rgba(102, 126, 234, 0.05)'
                            : undefined,
                        borderColor: '#667eea',
                    }
                };
            case 'danger':
                return {
                    ...baseStyles,
                    borderColor: variant === 'outlined' ? '#e2e8f0' : 'transparent',
                    color: '#475569',
                    '&:hover': {
                        borderColor: '#ef4444',
                        background: 'rgba(239, 68, 68, 0.05)',
                        color: '#ef4444',
                    }
                };
            case 'secondary':
                return {
                    ...baseStyles,
                    background: variant === 'contained'
                        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                        : 'transparent',
                    borderColor: variant === 'outlined' ? '#f093fb' : 'transparent',
                    color: variant === 'contained' ? 'white' : '#f093fb',
                    '&:hover': {
                        background: variant === 'outlined'
                            ? 'rgba(240, 147, 251, 0.05)'
                            : undefined,
                        borderColor: '#f093fb',
                    }
                };
            default: // neutral
                return {
                    ...baseStyles,
                    borderColor: '#e2e8f0',
                    color: '#475569',
                    '&:hover': {
                        borderColor: '#667eea',
                        background: 'rgba(102, 126, 234, 0.05)',
                        color: '#667eea',
                    }
                };
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            fullWidth={fullWidth}
            sx={{
                ...getColorSchemeStyles(),
                ...customSx
            }}
        >
            {text}
        </Button>
    );
};

export default BaseButton;
