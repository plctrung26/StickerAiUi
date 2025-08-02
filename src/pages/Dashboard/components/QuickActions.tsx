import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    AutoAwesome,
    Collections,
    Architecture,
    AccountCircle,
} from '@mui/icons-material';

const QuickActions: React.FC = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            icon: <AutoAwesome />,
            title: 'Tạo Sticker AI',
            description: 'Tạo sticker từ mô tả văn bản',
            action: () => navigate('/create'),
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            icon: <Collections />,
            title: 'Thư viện',
            description: 'Xem tất cả sticker đã tạo',
            action: () => navigate('/gallery'),
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            bgColor: 'rgba(240, 147, 251, 0.1)'
        },
        {
            icon: <Architecture />,
            title: 'AWS Architecture',
            description: 'Tạo sơ đồ kiến trúc AWS',
            action: () => navigate('/create?type=aws'),
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            bgColor: 'rgba(79, 172, 254, 0.1)'
        },
        {
            icon: <AccountCircle />,
            title: 'Hồ sơ',
            description: 'Quản lý thông tin cá nhân',
            action: () => navigate('/profile'),
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            bgColor: 'rgba(250, 112, 154, 0.1)'
        },
    ];

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Hành động nhanh
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)'
                },
                gap: 3
            }}>
                {quickActions.map((action, index) => (
                    <Card key={index} sx={{
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                        }
                    }} onClick={action.action}>
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Box sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '16px',
                                background: action.bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                            }}>
                                {React.cloneElement(action.icon, {
                                    sx: { fontSize: 32, background: action.color, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
                                })}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {action.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {action.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default QuickActions;
