import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    AutoAwesome,
    Collections,
    Architecture,
    AccountCircle,
} from '@mui/icons-material';
import SectionTitle from './atoms/SectionTitle';
import ActionCard from './atoms/ActionCard';

const QuickActions: React.FC = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            icon: <AutoAwesome sx={{ fontSize: 32, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />,
            title: 'Tạo Sticker AI',
            description: 'Tạo sticker từ mô tả văn bản',
            action: () => navigate('/create'),
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            icon: <Collections sx={{ fontSize: 32, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />,
            title: 'Thư viện',
            description: 'Xem tất cả sticker đã tạo',
            action: () => navigate('/gallery'),
            bgColor: 'rgba(240, 147, 251, 0.1)'
        },
        {
            icon: <Architecture sx={{ fontSize: 32, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />,
            title: 'AWS Architecture',
            description: 'Tạo sơ đồ kiến trúc AWS',
            action: () => navigate('/create?type=aws'),
            bgColor: 'rgba(79, 172, 254, 0.1)'
        },
        {
            icon: <AccountCircle sx={{ fontSize: 32, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />,
            title: 'Hồ sơ',
            description: 'Quản lý thông tin cá nhân',
            action: () => navigate('/profile'),
            bgColor: 'rgba(250, 112, 154, 0.1)'
        },
    ];

    return (
        <Box sx={{ mb: 4 }}>
            <SectionTitle title="Hành động nhanh" />
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
                    <ActionCard
                        key={index}
                        icon={action.icon}
                        title={action.title}
                        description={action.description}
                        bgColor={action.bgColor}
                        onClick={action.action}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default QuickActions;
