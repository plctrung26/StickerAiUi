import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';

const LoginHeader: React.FC = () => {
    return (
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
            }}>
                <Typography variant="h3" sx={{ fontSize: '2.5rem' }}>
                    🎭
                </Typography>
            </Box>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2
                }}
            >
                Chào mừng trở lại!
            </Typography>
            <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 400,
                    lineHeight: 1.6,
                }}
            >
                Đăng nhập để tiếp tục tạo những sticker tuyệt vời với AI
            </Typography>
        </Box>
    );
};

export default LoginHeader;
