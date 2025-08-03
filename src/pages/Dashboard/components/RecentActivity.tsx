import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecentActivity: React.FC = () => {
    const navigate = useNavigate();

    const recentActivity = [
        { id: 1, title: 'Tạo sticker "Cute Cat"', time: '2 phút trước', type: 'create', stickerId: 'cute-cat-123' },
        { id: 2, title: 'Tải về sticker "Happy Dog"', time: '15 phút trước', type: 'download', stickerId: 'happy-dog-456' },
        { id: 3, title: 'Chia sẻ "AWS Diagram"', time: '1 giờ trước', type: 'share', stickerId: 'aws-diagram-789' },
        { id: 4, title: 'Tạo bộ sưu tập mới', time: '2 giờ trước', type: 'collection', collectionId: 'new-collection-101' },
    ];

    const handleActivityClick = (activity: typeof recentActivity[0]) => {
        switch (activity.type) {
            case 'create':
            case 'download':
            case 'share':
                if (activity.stickerId) {
                    navigate(`/gallery/sticker/${activity.stickerId}`);
                }
                break;
            case 'collection':
                if (activity.collectionId) {
                    navigate(`/gallery/collection/${activity.collectionId}`);
                }
                break;
            default:
                navigate('/gallery');
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Hoạt động gần đây
            </Typography>
            <Paper sx={{
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
                overflow: 'hidden'
            }}>
                {recentActivity.map((activity, index) => (
                    <Box
                        key={activity.id}
                        onClick={() => handleActivityClick(activity)}
                        sx={{
                            p: 3,
                            borderBottom: index < recentActivity.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                transform: 'translateX(4px)'
                            }
                        }}
                    >
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: '#667eea'
                            }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {activity.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {activity.time}
                            </Typography>
                        </Box>
                        <Chip
                            label={activity.type}
                            size="small"
                            sx={{
                                background: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                                fontWeight: 600,
                                textTransform: 'capitalize'
                            }}
                        />
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};

export default RecentActivity;
