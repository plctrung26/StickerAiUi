import React from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
} from '@mui/material';
import {
    Palette,
    Language,
    Architecture,
    Rocket,
    Star,
    Security,
} from '@mui/icons-material';

const FeaturesSection: React.FC = () => {
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
    );
};

export default FeaturesSection;
