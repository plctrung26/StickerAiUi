import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    AppBar,
    Toolbar,
    Avatar,
    Card,
    CardContent,
    Chip,
    IconButton,
    Badge,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    PhotoCamera,
    Collections,
    AccountCircle,
    Logout,
    AutoAwesome,
    TrendingUp,
    Architecture,
    NotificationsNone,
    Settings,
    Star,
} from '@mui/icons-material';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

    const stats = [
        { icon: <PhotoCamera />, title: 'Sticker đã tạo', value: '12', color: '#667eea', bgColor: 'rgba(102, 126, 234, 0.1)' },
        { icon: <Collections />, title: 'Bộ sưu tập', value: '3', color: '#f093fb', bgColor: 'rgba(240, 147, 251, 0.1)' },
        { icon: <TrendingUp />, title: 'Lượt tải về', value: '89', color: '#4facfe', bgColor: 'rgba(79, 172, 254, 0.1)' },
        { icon: <Star />, title: 'Điểm đánh giá', value: '4.8', color: '#fa709a', bgColor: 'rgba(250, 112, 154, 0.1)' },
    ];

    const quickActions = [
        {
            icon: <AutoAwesome />,
            title: 'Tạo Sticker AI',
            description: 'Tạo sticker từ mô tả văn bản',
            action: () => navigate('/create'),
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            icon: <Collections />,
            title: 'Thư viện',
            description: 'Xem tất cả sticker đã tạo',
            action: () => navigate('/gallery'),
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            bgColor: 'rgba(240, 147, 251, 0.1)'
        },
        {
            icon: <Architecture />,
            title: 'AWS Architecture',
            description: 'Tạo sơ đồ kiến trúc AWS',
            action: () => navigate('/create?type=aws'),
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            bgColor: 'rgba(79, 172, 254, 0.1)'
        },
        {
            icon: <AccountCircle />,
            title: 'Hồ sơ',
            description: 'Quản lý thông tin cá nhân',
            action: () => navigate('/profile'),
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            bgColor: 'rgba(250, 112, 154, 0.1)'
        },
    ];

    const recentActivity = [
        { title: 'Tạo sticker "Cute Cat"', time: '2 phút trước', type: 'create' },
        { title: 'Tải về sticker "Happy Dog"', time: '15 phút trước', type: 'download' },
        { title: 'Chia sẻ "AWS Diagram"', time: '1 giờ trước', type: 'share' },
        { title: 'Tạo bộ sưu tập mới', time: '2 giờ trước', type: 'collection' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            {/* Modern Header */}
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
                            Dashboard
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

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
                {/* Welcome Section */}
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

                {/* Stats Cards */}
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
                        <Paper key={index} sx={{
                            p: 3,
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                            }
                        }}>
                            <Box sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '16px',
                                background: stat.bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                            }}>
                                {React.cloneElement(stat.icon, { sx: { fontSize: 32, color: stat.color } })}
                            </Box>
                            <Typography variant="h4" sx={{
                                fontWeight: 800,
                                color: stat.color,
                                mb: 0.5
                            }}>
                                {stat.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {stat.title}
                            </Typography>
                        </Paper>
                    ))}
                </Box>

                {/* Quick Actions */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                        Hành động nhanh
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(4, 1fr)'
                        },
                        gap: 3
                    }}>
                        {quickActions.map((action, index) => (
                            <Card key={index} sx={{
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                }
                            }} onClick={action.action}>
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Box sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '16px',
                                        background: action.bgColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2,
                                    }}>
                                        {React.cloneElement(action.icon, {
                                            sx: { fontSize: 32, background: action.color, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
                                        })}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        {action.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {action.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>

                {/* Recent Activity */}
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
            </Container>
        </Box>
    );
};

export default DashboardPage;
