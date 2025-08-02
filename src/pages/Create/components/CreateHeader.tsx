import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
    IconButton,
    Badge,
    Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import {
    ArrowBack,
    AutoAwesome,
    NotificationsNone,
    Settings,
    Logout,
} from '@mui/icons-material';

const CreateHeader: React.FC = () => {
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

    return (
        <AppBar position="static" elevation={0} sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
            <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
                <Button
                    color="inherit"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/dashboard')}
                    sx={{
                        mr: 3,
                        color: '#475569',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '12px',
                        px: 2,
                        '&:hover': {
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                        }
                    }}
                >
                    Dashboard
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                    }}>
                        <AutoAwesome sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontSize: { xs: '1.4rem', md: '1.6rem' },
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Tạo Sticker AI
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton sx={{ color: '#64748b' }}>
                        <Badge badgeContent={3} color="error">
                            <NotificationsNone />
                        </Badge>
                    </IconButton>
                    <IconButton sx={{ color: '#64748b' }}>
                        <Settings />
                    </IconButton>
                    <Avatar
                        src={user?.profile_picture_url}
                        sx={{
                            width: 40,
                            height: 40,
                            border: '2px solid',
                            borderColor: 'primary.main',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/profile')}
                    />
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{
                            ml: 1,
                            borderRadius: '12px',
                            textTransform: 'none',
                            borderColor: '#e2e8f0',
                            color: '#475569',
                            fontWeight: 600,
                            px: 2,
                            '&:hover': {
                                borderColor: '#ef4444',
                                background: 'rgba(239, 68, 68, 0.05)',
                                color: '#ef4444',
                            }
                        }}
                    >
                        Đăng xuất
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default CreateHeader;
