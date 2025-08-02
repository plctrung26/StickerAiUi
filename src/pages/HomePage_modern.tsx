import React from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Stack,
    IconButton,
    Badge,
    Chip,
    Paper,
    Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    AutoAwesome,
    PhotoCamera,
    Collections,
    Language,
    Architecture,
    Rocket,
    Star,
    Security,
    PlayArrow,
    Palette,
    TrendingUp,
    AccountCircle,
    NotificationsNone,
    Search,
    Speed,
    CloudQueue,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Palette sx={{ fontSize: 48, color: '#667eea' }} />,
            title: 'AI Tạo Sticker Thông Minh',
            description: 'Sử dụng công nghệ AI tiên tiến để tạo ra những sticker độc đáo và sáng tạo chỉ từ mô tả văn bản',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            bgColor: 'rgba(102, 126, 234, 0.08)'
        },
        {
            icon: <Language sx={{ fontSize: 48, color: '#f093fb' }} />,
            title: 'Ngôn Ngữ Tự Nhiên',
            description: 'Mô tả sticker bằng tiếng Việt hoặc tiếng Anh, AI sẽ hiểu và tạo ra đúng ý tưởng của bạn',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            bgColor: 'rgba(240, 147, 251, 0.08)'
        },
        {
            icon: <Architecture sx={{ fontSize: 48, color: '#4facfe' }} />,
            title: 'Kiến Trúc AWS',
            description: 'Tạo sơ đồ kiến trúc AWS chuyên nghiệp từ mô tả hệ thống của bạn',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            bgColor: 'rgba(79, 172, 254, 0.08)'
        },
        {
            icon: <Rocket sx={{ fontSize: 48, color: '#fa709a' }} />,
            title: 'Tốc Độ Nhanh Chóng',
            description: 'Xử lý và tạo ra kết quả chỉ trong vài giây với hiệu suất cao',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            bgColor: 'rgba(250, 112, 154, 0.08)'
        },
        {
            icon: <Star sx={{ fontSize: 48, color: '#a8edea' }} />,
            title: 'Chất Lượng Cao',
            description: 'Sticker độ phân giải cao, chi tiết sắc nét, phù hợp cho mọi mục đích sử dụng',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            bgColor: 'rgba(168, 237, 234, 0.08)'
        },
        {
            icon: <Security sx={{ fontSize: 48, color: '#ffecd2' }} />,
            title: 'Bảo Mật Tuyệt Đối',
            description: 'Dữ liệu được mã hóa và bảo vệ theo tiêu chuẩn enterprise',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            bgColor: 'rgba(255, 236, 210, 0.08)'
        }
    ];

    const stats = [
        { icon: <TrendingUp />, number: '10K+', label: 'Sticker đã tạo', color: '#667eea' },
        { icon: <Star />, number: '99.9%', label: 'Độ chính xác', color: '#f093fb' },
        { icon: <Speed />, number: '< 30s', label: 'Thời gian xử lý', color: '#4facfe' },
        { icon: <CloudQueue />, number: '24/7', label: 'Hỗ trợ', color: '#fa709a' }
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

            {/* Hero Section */}
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

            {/* Features Section */}
            <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '3rem' },
                            fontWeight: 800,
                            mb: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Tính Năng Nổi Bật
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#64748b',
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontWeight: 400,
                        }}
                    >
                        Khám phá những công nghệ tiên tiến và tính năng độc đáo của StickerAI Pro
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)'
                    },
                    gap: 4
                }}>
                    {features.map((feature, index) => (
                        <Card key={index} sx={{
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '24px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                borderColor: 'rgba(102, 126, 234, 0.3)',
                            }
                        }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '20px',
                                    background: feature.bgColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3,
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        background: feature.gradient,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#64748b',
                                        lineHeight: 1.6,
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>

            {/* CTA Section */}
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
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '16px',
                                py: 2,
                                px: 5,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                textTransform: 'none',
                                color: 'white',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.3)',
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
                                    background: 'rgba(255, 255, 255, 0.1)',
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

            {/* Footer */}
            <Box sx={{ py: 4, background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © 2024 StickerAI Pro. Được phát triển với ❤️ bởi đội ngũ AI Vietnam
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
