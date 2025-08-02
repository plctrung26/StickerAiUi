import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
} from '@mui/material';

const RecentActivity: React.FC = () => {
    const recentActivity = [
        { title: 'Tạo sticker "Cute Cat"', time: '2 phút trước', type: 'create' },
        { title: 'Tải về sticker "Happy Dog"', time: '15 phút trước', type: 'download' },
        { title: 'Chia sẻ "AWS Diagram"', time: '1 giờ trước', type: 'share' },
        { title: 'Tạo bộ sưu tập mới', time: '2 giờ trước', type: 'collection' },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Hoạt động gần đây
            </Typography>
            <Paper sx={{
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}>
                {recentActivity.map((activity, index) => (
                    <Box key={index} sx={{
                        p: 3,
                        borderBottom: index < recentActivity.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
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
