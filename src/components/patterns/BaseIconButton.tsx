import React, { type ReactElement } from 'react';
import { IconButton, type SxProps, type Theme } from '@mui/material';

interface BaseIconButtonProps {
    icon: ReactElement;
    onClick?: () => void;
    color?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'bordered' | 'active';
    customSx?: SxProps<Theme>;
}

const BaseIconButton: React.FC<BaseIconButtonProps> = ({
    icon,
    onClick,
    color = '#64748b',
    size = 'medium',
    variant = 'default',
    customSx = {}
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'bordered':
                return {
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    '&:hover': {
                        background: 'rgba(102, 126, 234, 0.05)',
                        borderColor: '#667eea',
                        color: '#667eea',
                    }
                };
            case 'active':
                return {
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: 'rgba(102, 126, 234, 0.1)',
                    color: '#667eea',
                    '&:hover': {
                        background: 'rgba(102, 126, 234, 0.15)',
                    }
                };
            default:
                return {
                    '&:hover': {
                        background: 'rgba(102, 126, 234, 0.05)',
                        color: '#667eea',
                    }
                };
        }
    };

    return (
        <IconButton
            onClick={onClick}
            size={size}
            sx={{
                color,
                ...getVariantStyles(),
                ...customSx
            }}
        >
            {icon}
        </IconButton>
    );
};

export default BaseIconButton;
