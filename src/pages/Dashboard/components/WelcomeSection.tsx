import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import { useAuthStore } from '../../../store/authStore';

const WelcomeSection: React.FC = () => {
    const { user } = useAuthStore();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1
                }}
            >
                Chào mừng trở lại, {user?.full_name || 'User'}! 👋
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                Sẵn sàng tạo ra những sticker tuyệt vời hôm nay?
            </Typography>
        </Box>
    );
};

export default WelcomeSection;
