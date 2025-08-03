import React from 'react';
import { Typography } from '@mui/material';

interface ActionTitleProps {
    title: string;
}

const ActionTitle: React.FC<ActionTitleProps> = ({ title }) => {
    return (
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {title}
        </Typography>
    );
};

export default ActionTitle;
