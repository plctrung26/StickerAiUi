import React, { type ReactElement } from 'react';
import { Card, CardContent } from '@mui/material';
import ActionIcon from './ActionIcon';
import ActionTitle from './ActionTitle';
import ActionDescription from './ActionDescription';

interface ActionCardProps {
    icon: ReactElement;
    title: string;
    description: string;
    bgColor: string;
    onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
    icon,
    title,
    description,
    bgColor,
    onClick
}) => {
    return (
        <Card sx={{
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
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            mb: 1, // Add margin to prevent layout shift
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                    : '0 20px 60px rgba(0, 0, 0, 0.15)',
                mb: '12px', // Compensate for translateY movement
            }
        }} onClick={onClick}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <ActionIcon icon={icon} bgColor={bgColor} />
                <ActionTitle title={title} />
                <ActionDescription description={description} />
            </CardContent>
        </Card>
    );
};

export default ActionCard;
