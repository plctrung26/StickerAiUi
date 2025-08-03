import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    PhotoCamera,
    Collections,
} from '@mui/icons-material';

const CallToActionSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3,
            },
        }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: '2rem', md: '3rem' },
                        fontWeight: 800,
                        color: 'white',
                        mb: 3,
                    }}
                >
                    Sẵn sàng tạo Sticker AI?
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        mb: 5,
                        lineHeight: 1.6,
                        fontWeight: 400,
                    }}
                >
                    Tham gia cùng hàng nghìn người dùng đã tin tưởng StickerAI Pro
                    để tạo ra những tác phẩm nghệ thuật tuyệt vời
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<PhotoCamera />}
                        onClick={() => navigate('/create')}
                        sx={{
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(48, 54, 61, 0.5)'
                                : 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: (theme) => theme.palette.mode === 'dark'
                                ? '1px solid rgba(48, 54, 61, 0.6)'
                                : '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '16px',
                            py: 2,
                            px: 5,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            color: 'white',
                            '&:hover': {
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(58, 65, 73, 0.7)'
                                    : 'rgba(255, 255, 255, 0.3)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                            }
                        }}
                    >
                        Tạo Sticker Ngay
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Collections />}
                        onClick={() => navigate('/gallery')}
                        sx={{
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            color: 'white',
                            borderRadius: '16px',
                            py: 2,
                            px: 5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderWidth: 2,
                            '&:hover': {
                                borderColor: 'rgba(255, 255, 255, 0.6)',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(48, 54, 61, 0.3)'
                                    : 'rgba(255, 255, 255, 0.1)',
                                transform: 'translateY(-2px)',
                                borderWidth: 2,
                            }
                        }}
                    >
                        Khám Phá Gallery
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default CallToActionSection;
