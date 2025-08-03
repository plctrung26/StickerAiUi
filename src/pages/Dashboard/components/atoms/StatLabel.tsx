import React from 'react';
import { Typography } from '@mui/material';

interface StatLabelProps {
    label: string;
}

const StatLabel: React.FC<StatLabelProps> = ({ label }) => {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {label}
        </Typography>
    );
};

export default StatLabel;
