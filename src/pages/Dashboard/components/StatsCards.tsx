import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    PhotoCamera,
    Collections,
    TrendingUp,
    Star,
} from '@mui/icons-material';
import { useAppStore } from '../../../store/appStore';
import StatCard from './atoms/StatCard';

const StatsCards: React.FC = () => {
    const navigate = useNavigate();
    const { dashboardStats } = useAppStore();

    const handleStatClick = (statType: string) => {
        switch (statType) {
            case 'created':
                navigate('/gallery?filter=my-stickers');
                break;
            case 'collections':
                navigate('/gallery?view=collections');
                break;
            case 'downloads':
                // Open analytics modal or navigate to analytics page
                console.log('Opening download analytics...');
                break;
            case 'rating':
                // Open reviews modal or navigate to reviews page
                console.log('Opening rating details...');
                break;
            default:
                break;
        }
    };

    const stats = [
        {
            id: 'created',
            icon: <PhotoCamera sx={{ fontSize: 32, color: '#667eea' }} />,
            title: 'Sticker đã tạo',
            value: dashboardStats.totalStickers.toString(),
            color: '#667eea',
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            id: 'collections',
            icon: <Collections sx={{ fontSize: 32, color: '#f093fb' }} />,
            title: 'Bộ sưu tập',
            value: dashboardStats.totalCollections.toString(),
            color: '#f093fb',
            bgColor: 'rgba(240, 147, 251, 0.1)'
        },
        {
            id: 'downloads',
            icon: <TrendingUp sx={{ fontSize: 32, color: '#4facfe' }} />,
            title: 'Lượt tải về',
            value: dashboardStats.totalDownloads.toString(),
            color: '#4facfe',
            bgColor: 'rgba(79, 172, 254, 0.1)'
        },
        {
            id: 'rating',
            icon: <Star sx={{ fontSize: 32, color: '#fa709a' }} />,
            title: 'Điểm đánh giá',
            value: dashboardStats.averageRating.toString(),
            color: '#fa709a',
            bgColor: 'rgba(250, 112, 154, 0.1)'
        },
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
                <StatCard
                    key={index}
                    icon={stat.icon}
                    title={stat.title}
                    value={stat.value}
                    color={stat.color}
                    bgColor={stat.bgColor}
                    onClick={() => handleStatClick(stat.id)}
                />
            ))}
        </Box>
    );
};

export default StatsCards;
