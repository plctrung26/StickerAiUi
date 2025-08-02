import React from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Stack,
    Chip,
    Paper,
    Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    PlayArrow,
    Collections,
    TrendingUp,
    Star,
    Speed,
    CloudQueue,
} from '@mui/icons-material';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        { icon: <TrendingUp />, number: '10K+', label: 'Sticker đã tạo', color: '#667eea' },
        { icon: <Star />, number: '99.9%', label: 'Độ chính xác', color: '#f093fb' },
        { icon: <Speed />, number: '< 30s', label: 'Thời gian xử lý', color: '#4facfe' },
        { icon: <CloudQueue />, number: '24/7', label: 'Hỗ trợ', color: '#fa709a' }
    ];

    return (
        <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 8, md: 10 } }}>
            <Box sx={{ textAlign: 'center', mb: 10 }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
                        fontWeight: 900,
                        mb: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1.1,
                    }}
                >
                    Tạo Sticker AI
                    <br />
                    <Box component="span" sx={{
                        fontSize: { xs: '2rem', sm: '2.8rem', md: '3.6rem', lg: '4.5rem' },
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Thông Minh & Sáng Tạo
                    </Box>
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: '1.1rem', md: '1.4rem' },
                        color: '#64748b',
                        mb: 6,
                        maxWidth: 700,
                        mx: 'auto',
                        lineHeight: 1.6,
                        fontWeight: 400,
                    }}
                >
                    Nền tảng AI tiên tiến với khả năng tạo sticker từ ngôn ngữ tự nhiên,
                    kiến trúc AWS và hệ thống lưu trữ thông minh
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    justifyContent="center"
                    sx={{ mb: 8 }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrow />}
                        onClick={() => navigate('/create')}
                        sx={{
                            borderRadius: '16px',
                            py: 2,
                            px: 5,
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
                            '&:hover': {
                                boxShadow: '0 16px 50px rgba(102, 126, 234, 0.4)',
                                transform: 'translateY(-3px)',
                            }
                        }}
                    >
                        Bắt đầu tạo ngay
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Collections />}
                        onClick={() => navigate('/gallery')}
                        sx={{
                            borderRadius: '16px',
                            py: 2,
                            px: 5,
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderColor: '#e2e8f0',
                            color: '#475569',
                            borderWidth: 2,
                            '&:hover': {
                                borderColor: '#667eea',
                                background: 'rgba(102, 126, 234, 0.05)',
                                transform: 'translateY(-2px)',
                                borderWidth: 2,
                            }
                        }}
                    >
                        Xem thư viện
                    </Button>
                </Stack>

                {/* Statistics */}
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                    mb: 8
                }}>
                    {stats.map((stat, index) => (
                        <Paper key={index} sx={{
                            p: 3,
                            textAlign: 'center',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            minWidth: 160,
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                            }
                        }}>
                            <Avatar sx={{
                                bgcolor: stat.color,
                                width: 60,
                                height: 60,
                                mx: 'auto',
                                mb: 2,
                                fontSize: 30
                            }}>
                                {stat.icon}
                            </Avatar>
                            <Typography variant="h3" sx={{
                                fontWeight: 800,
                                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}80 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                mb: 1
                            }}>
                                {stat.number}
                            </Typography>
                            <Typography variant="body1" sx={{
                                color: '#64748b',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}>
                                {stat.label}
                            </Typography>
                        </Paper>
                    ))}
                </Box>

                {/* Feature Tags */}
                <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
                    <Chip
                        label="🤖 AI-Powered"
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 600,
                            py: 1,
                            px: 2,
                            fontSize: '0.9rem'
                        }}
                    />
                    <Chip
                        label="🌐 Multi-Language"
                        sx={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            fontWeight: 600,
                            py: 1,
                            px: 2,
                            fontSize: '0.9rem'
                        }}
                    />
                    <Chip
                        label="☁️ AWS Integration"
                        sx={{
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: 'white',
                            fontWeight: 600,
                            py: 1,
                            px: 2,
                            fontSize: '0.9rem'
                        }}
                    />
                    <Chip
                        label="⚡ Real-time"
                        sx={{
                            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                            color: 'white',
                            fontWeight: 600,
                            py: 1,
                            px: 2,
                            fontSize: '0.9rem'
                        }}
                    />
                </Stack>
            </Box>
        </Container>
    );
};

export default HeroSection;
