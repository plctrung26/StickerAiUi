import React from 'react';
import { Typography } from '@mui/material';

interface StatValueProps {
    value: string;
    color: string;
}

const StatValue: React.FC<StatValueProps> = ({ value, color }) => {
    return (
        <Typography variant="h4" sx={{
            fontWeight: 800,
            color: color,
            mb: 0.5
        }}>
            {value}
        </Typography>
    );
};

export default StatValue;
