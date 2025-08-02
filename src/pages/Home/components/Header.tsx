import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Stack,
    IconButton,
    Badge,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    AutoAwesome,
    Search,
    NotificationsNone,
    AccountCircle,
} from '@mui/icons-material';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" elevation={0} sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
            <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
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
                        StickerAI Pro
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton sx={{ color: '#64748b' }}>
                        <Search />
                    </IconButton>
                    <IconButton sx={{ color: '#64748b' }}>
                        <Badge badgeContent={3} color="error">
                            <NotificationsNone />
                        </Badge>
                    </IconButton>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AccountCircle />}
                        onClick={() => navigate('/login')}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            borderColor: '#e2e8f0',
                            color: '#475569',
                            fontWeight: 600,
                            px: 2,
                            '&:hover': {
                                borderColor: '#667eea',
                                background: 'rgba(102, 126, 234, 0.05)',
                            }
                        }}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate('/create')}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            fontWeight: 600,
                            px: 3,
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                                transform: 'translateY(-1px)',
                            }
                        }}
                    >
                        Tạo ngay
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
