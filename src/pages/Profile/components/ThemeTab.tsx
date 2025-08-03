import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Switch,
    Card,
    CardContent,
    Alert,
    Chip,
} from '@mui/material';
import { useTheme } from '../../../contexts/ThemeContext';
import {
    DarkMode,
    LightMode,
    Animation,
    BlurOn,
    CheckCircle,
} from '@mui/icons-material';

const ThemeTab: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [animationsEnabled, setAnimationsEnabled] = useState(() => {
        const stored = localStorage.getItem('animationsEnabled');
        return stored ? JSON.parse(stored) : true;
    });
    const [blurEffectsEnabled, setBlurEffectsEnabled] = useState(() => {
        const stored = localStorage.getItem('blurEffectsEnabled');
        return stored ? JSON.parse(stored) : true;
    });
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    useEffect(() => {
        localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
        // Apply global CSS variables for animations
        const root = document.documentElement;
        root.style.setProperty('--animation-duration', animationsEnabled ? '0.3s' : '0s');
        root.style.setProperty('--hover-transform', animationsEnabled ? 'translateY(-2px)' : 'none');
    }, [animationsEnabled]);

    useEffect(() => {
        localStorage.setItem('blurEffectsEnabled', JSON.stringify(blurEffectsEnabled));
        // Apply global CSS variables for blur effects
        const root = document.documentElement;
        root.style.setProperty('--backdrop-filter', blurEffectsEnabled ? 'blur(10px)' : 'none');
        root.style.setProperty('--glass-bg-opacity', blurEffectsEnabled ? '0.9' : '1');
    }, [blurEffectsEnabled]);

    const handleAnimationToggle = () => {
        setAnimationsEnabled(!animationsEnabled);
        setShowSaveAlert(true);
        setTimeout(() => setShowSaveAlert(false), 3000);
    };

    const handleBlurToggle = () => {
        setBlurEffectsEnabled(!blurEffectsEnabled);
        setShowSaveAlert(true);
        setTimeout(() => setShowSaveAlert(false), 3000);
    };

    const handleDarkModeToggle = () => {
        toggleDarkMode();
        setShowSaveAlert(true);
        setTimeout(() => setShowSaveAlert(false), 3000);
    };

    return (
        <Container maxWidth="md" sx={{ pb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                Tùy chọn giao diện
            </Typography>

            {showSaveAlert && (
                <Alert
                    icon={<CheckCircle />}
                    severity="success"
                    sx={{
                        mb: 3,
                        borderRadius: '12px',
                        '& .MuiAlert-message': {
                            fontWeight: 600
                        }
                    }}
                >
                    Cài đặt đã được lưu thành công!
                </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Dark Mode Setting */}
                <Card sx={{
                    borderRadius: '16px',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(22, 27, 34, 0.8)'
                        : 'rgba(248, 250, 252, 0.8)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    mb: animationsEnabled ? 0.5 : 0, // Add margin when animations enabled
                    '&:hover': {
                        transform: animationsEnabled ? 'translateY(-2px)' : 'none',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                            : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        mb: animationsEnabled ? '6px' : 0, // Compensate for translateY movement
                    }
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '12px',
                                    background: isDarkMode
                                        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                                        : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {isDarkMode ? (
                                        <DarkMode sx={{ color: '#fff', fontSize: 24 }} />
                                    ) : (
                                        <LightMode sx={{ color: '#fff', fontSize: 24 }} />
                                    )}
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        Chế độ tối
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {isDarkMode ? 'Đang sử dụng giao diện tối' : 'Đang sử dụng giao diện sáng'}
                                    </Typography>
                                    <Chip
                                        label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
                                        size="small"
                                        sx={{
                                            mt: 1,
                                            background: isDarkMode
                                                ? 'rgba(102, 126, 234, 0.2)'
                                                : 'rgba(251, 191, 36, 0.2)',
                                            color: isDarkMode ? '#667eea' : '#f59e0b',
                                            border: 'none',
                                            fontWeight: 600
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Switch
                                checked={isDarkMode}
                                onChange={handleDarkModeToggle}
                                sx={{
                                    '& .MuiSwitch-thumb': {
                                        background: isDarkMode
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    }
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* Animation Setting */}
                <Card sx={{
                    borderRadius: '16px',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(22, 27, 34, 0.8)'
                        : 'rgba(248, 250, 252, 0.8)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    mb: animationsEnabled ? 0.5 : 0, // Add margin when animations enabled
                    '&:hover': {
                        transform: animationsEnabled ? 'translateY(-2px)' : 'none',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                            : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        mb: animationsEnabled ? '6px' : 0, // Compensate for translateY movement
                    }
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: animationsEnabled ? 'pulse 2s infinite' : 'none',
                                    '@keyframes pulse': {
                                        '0%, 100%': {
                                            opacity: 1,
                                        },
                                        '50%': {
                                            opacity: 0.7,
                                        },
                                    }
                                }}>
                                    <Animation sx={{ color: '#fff', fontSize: 24 }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        Hiệu ứng chuyển động
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {animationsEnabled ? 'Hiệu ứng hoạt động đang bật' : 'Hiệu ứng hoạt động đã tắt'}
                                    </Typography>
                                    <Chip
                                        label={animationsEnabled ? 'Enabled' : 'Disabled'}
                                        size="small"
                                        sx={{
                                            mt: 1,
                                            background: animationsEnabled
                                                ? 'rgba(16, 185, 129, 0.2)'
                                                : 'rgba(156, 163, 175, 0.2)',
                                            color: animationsEnabled ? '#10b981' : '#9ca3af',
                                            border: 'none',
                                            fontWeight: 600
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Switch
                                checked={animationsEnabled}
                                onChange={handleAnimationToggle}
                                sx={{
                                    '& .MuiSwitch-thumb': {
                                        background: animationsEnabled
                                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                            : 'rgba(156, 163, 175, 1)',
                                    }
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* Blur Effects Setting */}
                <Card sx={{
                    borderRadius: '16px',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(22, 27, 34, 0.8)'
                        : 'rgba(248, 250, 252, 0.8)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                    backdropFilter: blurEffectsEnabled ? 'blur(10px)' : 'none',
                    transition: 'all 0.3s ease',
                    mb: animationsEnabled ? 0.5 : 0, // Add margin when animations enabled
                    '&:hover': {
                        transform: animationsEnabled ? 'translateY(-2px)' : 'none',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                            : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        mb: animationsEnabled ? '6px' : 0, // Compensate for translateY movement
                    }
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    filter: blurEffectsEnabled ? 'none' : 'blur(1px)',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <BlurOn sx={{ color: '#fff', fontSize: 24 }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        Hiệu ứng mờ nền
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {blurEffectsEnabled ? 'Hiệu ứng mờ đang hoạt động' : 'Hiệu ứng mờ đã tắt'}
                                    </Typography>
                                    <Chip
                                        label={blurEffectsEnabled ? 'Glass Effect' : 'Solid Background'}
                                        size="small"
                                        sx={{
                                            mt: 1,
                                            background: blurEffectsEnabled
                                                ? 'rgba(139, 92, 246, 0.2)'
                                                : 'rgba(156, 163, 175, 0.2)',
                                            color: blurEffectsEnabled ? '#8b5cf6' : '#9ca3af',
                                            border: 'none',
                                            fontWeight: 600
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Switch
                                checked={blurEffectsEnabled}
                                onChange={handleBlurToggle}
                                sx={{
                                    '& .MuiSwitch-thumb': {
                                        background: blurEffectsEnabled
                                            ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                                            : 'rgba(156, 163, 175, 1)',
                                    }
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default ThemeTab;
