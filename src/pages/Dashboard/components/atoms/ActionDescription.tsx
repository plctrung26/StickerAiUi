import React from 'react';
import { Typography } from '@mui/material';

interface ActionDescriptionProps {
    description: string;
}

const ActionDescription: React.FC<ActionDescriptionProps> = ({ description }) => {
    return (
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
    );
};

export default ActionDescription;
