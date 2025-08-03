import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    Fade,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Palette,
    Language,
    Architecture,
    Rocket,
    Star,
    Security,
    Close,
    Check,
    ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeaturesSection: React.FC = () => {
    const navigate = useNavigate();
    const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

    const features = [
        {
            icon: <Palette sx={{ fontSize: 48, color: '#667eea' }} />,
            title: 'AI Tạo Sticker Thông Minh',
            description: 'Sử dụng công nghệ AI tiên tiến để tạo ra những sticker độc đáo và sáng tạo chỉ từ mô tả văn bản',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            bgColor: 'rgba(102, 126, 234, 0.08)',
            details: [
                'Nhận dạng ngôn ngữ tự nhiên thông minh',
                'Xử lý hình ảnh độ phân giải cao',
                'Tích hợp neural network tiên tiến',
                'Hỗ trợ nhiều phong cách nghệ thuật'
            ],
            action: 'Thử tạo sticker ngay',
            route: '/create'
        },
        {
            icon: <Language sx={{ fontSize: 48, color: '#f093fb' }} />,
            title: 'Ngôn Ngữ Tự Nhiên',
            description: 'Mô tả sticker bằng tiếng Việt hoặc tiếng Anh, AI sẽ hiểu và tạo ra đúng ý tưởng của bạn',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            bgColor: 'rgba(240, 147, 251, 0.08)',
            details: [
                'Hỗ trợ tiếng Việt và tiếng Anh',
                'Phân tích ngữ cảnh thông minh',
                'Nhận dạng cảm xúc trong văn bản',
                'Xử lý từ đồng nghĩa và biến thể'
            ],
            action: 'Khám phá ngay',
            route: '/create'
        },
        {
            icon: <Architecture sx={{ fontSize: 48, color: '#4facfe' }} />,
            title: 'Kiến Trúc AWS',
            description: 'Tạo sơ đồ kiến trúc AWS chuyên nghiệp từ mô tả hệ thống của bạn',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            bgColor: 'rgba(79, 172, 254, 0.08)',
            details: [
                'Hỗ trợ đầy đủ dịch vụ AWS',
                'Tự động tối ưu kiến trúc',
                'Tuân thủ best practices',
                'Export diagram chất lượng cao'
            ],
            action: 'Tạo diagram AWS',
            route: '/create'
        },
        {
            icon: <Rocket sx={{ fontSize: 48, color: '#fa709a' }} />,
            title: 'Tốc Độ Nhanh Chóng',
            description: 'Xử lý và tạo ra kết quả chỉ trong vài giây với hiệu suất cao',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            bgColor: 'rgba(250, 112, 154, 0.08)',
            details: [
                'Xử lý song song đa luồng',
                'Cache thông minh tối ưu',
                'CDN toàn cầu nhanh chóng',
                'Kiến trúc microservices hiệu quả'
            ],
            action: 'Trải nghiệm tốc độ',
            route: '/create'
        },
        {
            icon: <Star sx={{ fontSize: 48, color: '#a8edea' }} />,
            title: 'Chất Lượng Cao',
            description: 'Sticker độ phân giải cao, chi tiết sắc nét, phù hợp cho mọi mục đích sử dụng',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            bgColor: 'rgba(168, 237, 234, 0.08)',
            details: [
                'Độ phân giải lên đến 4K',
                'Format xuất đa dạng (PNG, SVG, PDF)',
                'Chất lượng in ấn chuyên nghiệp',
                'Tối ưu cho web và mobile'
            ],
            action: 'Xem gallery',
            route: '/gallery'
        },
        {
            icon: <Security sx={{ fontSize: 48, color: '#ffecd2' }} />,
            title: 'Bảo Mật Tuyệt Đối',
            description: 'Dữ liệu được mã hóa và bảo vệ theo tiêu chuẩn enterprise',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            bgColor: 'rgba(255, 236, 210, 0.08)',
            details: [
                'Mã hóa AES-256 end-to-end',
                'Tuân thủ GDPR và SOC 2',
                'Backup tự động và disaster recovery',
                'Audit log và monitoring 24/7'
            ],
            action: 'Tìm hiểu thêm',
            route: '/profile'
        }
    ];

    const handleFeatureClick = (index: number) => {
        setSelectedFeature(index);
    };

    const handleCloseModal = () => {
        setSelectedFeature(null);
    };

    const handleActionClick = (route: string) => {
        navigate(route);
        handleCloseModal();
    };

    return (
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
                    <Card
                        key={index}
                        onClick={() => handleFeatureClick(index)}
                        sx={{
                            height: '100%',
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(22, 27, 34, 0.7)'
                                : 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: (theme) => theme.palette.mode === 'dark'
                                ? '1px solid rgba(48, 54, 61, 0.3)'
                                : '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '24px',
                            boxShadow: (theme) => theme.palette.mode === 'dark'
                                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                                : '0 8px 32px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                boxShadow: (theme) => theme.palette.mode === 'dark'
                                    ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                                    : '0 20px 60px rgba(0, 0, 0, 0.15)',
                                borderColor: 'rgba(102, 126, 234, 0.3)',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(33, 38, 45, 0.85)'
                                    : 'rgba(255, 255, 255, 0.85)',
                            }
                        }}
                    >
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
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1) rotate(5deg)',
                                }
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

            {/* Feature Detail Modal */}
            {selectedFeature !== null && (
                <Dialog
                    open={selectedFeature !== null}
                    onClose={handleCloseModal}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            background: features[selectedFeature].gradient,
                            backdropFilter: 'blur(10px)',
                        }
                    }}
                >
                    <DialogTitle sx={{
                        pb: 1,
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box sx={{
                                width: 50,
                                height: 50,
                                borderRadius: 2,
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(48, 54, 61, 0.5)'
                                    : 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {React.cloneElement(features[selectedFeature].icon, {
                                    sx: { fontSize: 30, color: 'white' }
                                })}
                            </Box>
                            <Typography variant="h5" color="white" fontWeight={700}>
                                {features[selectedFeature].title}
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={handleCloseModal}
                            sx={{ color: 'white' }}
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ pt: 2, color: 'white' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 4,
                                fontSize: '1.1rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                                lineHeight: 1.6
                            }}
                        >
                            {features[selectedFeature].description}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                color: 'white',
                                fontWeight: 600
                            }}
                        >
                            Tính năng chi tiết:
                        </Typography>

                        <List>
                            {features[selectedFeature].details.map((detail, index) => (
                                <Fade in timeout={300 + index * 100} key={index}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Check sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={detail}
                                            primaryTypographyProps={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontSize: '1rem'
                                            }}
                                        />
                                    </ListItem>
                                </Fade>
                            ))}
                        </List>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                onClick={() => handleActionClick(features[selectedFeature].route)}
                                sx={{
                                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(48, 54, 61, 0.5)'
                                        : 'rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    border: (theme) => theme.palette.mode === 'dark'
                                        ? '2px solid rgba(48, 54, 61, 0.6)'
                                        : '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                                            ? 'rgba(58, 65, 73, 0.7)'
                                            : 'rgba(255, 255, 255, 0.3)',
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {features[selectedFeature].action}
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            )}
        </Container>
    );
};

export default FeaturesSection;
