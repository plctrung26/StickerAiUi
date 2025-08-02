import React from 'react';
import {
    Box,
    Paper,
    Typography,
} from '@mui/material';
import {
    PhotoCamera,
    Collections,
    TrendingUp,
    Star,
} from '@mui/icons-material';

const StatsCards: React.FC = () => {
    const stats = [
        { icon: <PhotoCamera />, title: 'Sticker đã tạo', value: '12', color: '#667eea', bgColor: 'rgba(102, 126, 234, 0.1)' },
        { icon: <Collections />, title: 'Bộ sưu tập', value: '3', color: '#f093fb', bgColor: 'rgba(240, 147, 251, 0.1)' },
        { icon: <TrendingUp />, title: 'Lượt tải về', value: '89', color: '#4facfe', bgColor: 'rgba(79, 172, 254, 0.1)' },
        { icon: <Star />, title: 'Điểm đánh giá', value: '4.8', color: '#fa709a', bgColor: 'rgba(250, 112, 154, 0.1)' },
    ];

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)'
            },
            gap: 3,
            mb: 4
        }}>
            {stats.map((stat, index) => (
                <Paper key={index} sx={{
                    p: 3,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                    }
                }}>
                    <Box sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '16px',
                        background: stat.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                    }}>
                        {React.cloneElement(stat.icon, { sx: { fontSize: 32, color: stat.color } })}
                    </Box>
                    <Typography variant="h4" sx={{
                        fontWeight: 800,
                        color: stat.color,
                        mb: 0.5
                    }}>
                        {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {stat.title}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default StatsCards;
