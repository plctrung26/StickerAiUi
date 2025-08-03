import React, { type ReactElement } from 'react';
import { Paper } from '@mui/material';
import StatIcon from './StatIcon';
import StatValue from './StatValue';
import StatLabel from './StatLabel';

interface StatCardProps {
    icon: ReactElement;
    title: string;
    value: string;
    color: string;
    bgColor: string;
    onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    title,
    value,
    color,
    bgColor,
    onClick
}) => {
    return (
        <Paper
            onClick={onClick}
            sx={{
                p: 3,
                borderRadius: '20px',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(22, 27, 34, 0.9)'
                    : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: (theme) => theme.palette.mode === 'dark'
                    ? '1px solid rgba(48, 54, 61, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: onClick ? 'pointer' : 'default',
                mb: 1, // Add margin to prevent layout shift
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                        : '0 20px 60px rgba(0, 0, 0, 0.15)',
                    mb: '9px', // Compensate for translateY movement
                }
            }}>
            <StatIcon
                icon={icon}
                bgColor={bgColor}
            />
            <StatValue value={value} color={color} />
            <StatLabel label={title} />
        </Paper>
    );
};

export default StatCard;
