import React, { useState, useRef } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    Card,
    AppBar,
    Toolbar,
    Avatar,
    TextField,
    CircularProgress,
    IconButton,
    Stepper,
    Step,
    StepLabel,
    Dialog,
    DialogContent,
    DialogTitle,
    CardContent,
    Badge,
} from '@mui/material';
import {
    CloudUpload,
    AutoAwesome,
    Download,
    Share,
    Close,
    Architecture,
    Psychology,
    SmartToy,
    Language,
    ArrowBack,
    Logout,
    Settings,
    NotificationsNone,
    Refresh,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface Character {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

interface Emotion {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
}

const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeStep, setActiveStep] = useState(0);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [selectedCharacter, setSelectedCharacter] = useState<string>('');
    const [selectedEmotion, setSelectedEmotion] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [selectedGenerated, setSelectedGenerated] = useState<string>('');
    const [previewOpen, setPreviewOpen] = useState(false);

    const steps = ['Chọn phong cách', 'Upload ảnh', 'Tạo sticker', 'Kết quả'];

    const characters: Character[] = [
        {
            id: 'cute-animal',
            name: 'Động vật dễ thương',
            description: 'Tạo sticker động vật ngộ nghĩnh',
            icon: <SmartToy />,
            color: '#667eea',
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            id: 'cartoon-person',
            name: 'Nhân vật hoạt hình',
            description: 'Tạo sticker nhân vật cartoon',
            icon: <Psychology />,
            color: '#f093fb',
            bgColor: 'rgba(240, 147, 251, 0.1)'
        },
        {
            id: 'architecture',
            name: 'Kiến trúc AWS',
            description: 'Tạo sơ đồ kiến trúc hệ thống',
            icon: <Architecture />,
            color: '#4facfe',
            bgColor: 'rgba(79, 172, 254, 0.1)'
        },
        {
            id: 'emoji',
            name: 'Emoji cảm xúc',
            description: 'Tạo emoji biểu cảm',
            icon: <Language />,
            color: '#fa709a',
            bgColor: 'rgba(250, 112, 154, 0.1)'
        },
    ];

    const emotions: Emotion[] = [
        { id: 'happy', name: 'Vui vẻ', description: '😊', icon: '😊', color: '#10b981' },
        { id: 'sad', name: 'Buồn', description: '😢', icon: '😢', color: '#3b82f6' },
        { id: 'angry', name: 'Tức giận', description: '😠', icon: '😠', color: '#ef4444' },
        { id: 'surprised', name: 'Ngạc nhiên', description: '😮', icon: '😮', color: '#f59e0b' },
        { id: 'love', name: 'Yêu thương', description: '🥰', icon: '🥰', color: '#ec4899' },
        { id: 'thinking', name: 'Suy nghĩ', description: '🤔', icon: '🤔', color: '#8b5cf6' },
    ];

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            setUploadedImages(prev => [...prev, ...files].slice(0, 5)); // Limit to 5 images
        }
    };

    const removeImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setActiveStep(3);

        // Simulate API call
        setTimeout(() => {
            const mockImages = [
                '/api/placeholder/300/300',
                '/api/placeholder/300/300',
                '/api/placeholder/300/300',
                '/api/placeholder/300/300',
            ];
            setGeneratedImages(mockImages);
            setIsGenerating(false);
        }, 3000);
    };

    const canProceed = () => {
        switch (activeStep) {
            case 0:
                return selectedCharacter !== '';
            case 1:
                return uploadedImages.length > 0 || prompt.trim() !== '';
            case 2:
                return selectedEmotion !== '';
            default:
                return true;
        }
    };

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

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
                {/* Header */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
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
                        Tạo Sticker AI của bạn
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                        Chỉ cần vài bước đơn giản để tạo ra sticker độc đáo
                    </Typography>
                </Box>

                {/* Progress Stepper */}
                <Paper sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}>
                    <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel sx={{
                                    '& .MuiStepLabel-label': {
                                        fontWeight: 600,
                                        fontSize: { xs: '0.875rem', md: '1rem' }
                                    },
                                    '& .MuiStepIcon-root': {
                                        '&.Mui-active': {
                                            color: '#667eea',
                                        },
                                        '&.Mui-completed': {
                                            color: '#667eea',
                                        }
                                    }
                                }}>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                {/* Step Content */}
                <Paper sx={{
                    p: 4,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    minHeight: '500px',
                }}>
                    {/* Step 0: Choose Character Style */}
                    {activeStep === 0 && (
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                Chọn phong cách sticker
                            </Typography>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                                gap: 3
                            }}>
                                {characters.map((character) => (
                                    <Card
                                        key={character.id}
                                        sx={{
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            border: selectedCharacter === character.id ? '3px solid #667eea' : '1px solid rgba(0, 0, 0, 0.1)',
                                            transform: selectedCharacter === character.id ? 'scale(1.05)' : 'scale(1)',
                                            boxShadow: selectedCharacter === character.id ? '0 12px 48px rgba(102, 126, 234, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
                                            }
                                        }}
                                        onClick={() => setSelectedCharacter(character.id)}
                                    >
                                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                            <Box sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: '20px',
                                                background: character.bgColor,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                                mb: 2,
                                                color: character.color,
                                                fontSize: 40
                                            }}>
                                                {character.icon}
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                                {character.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {character.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Step 1: Upload Images */}
                    {activeStep === 1 && (
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                Upload ảnh hoặc nhập mô tả
                            </Typography>

                            {/* Upload Section */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Upload ảnh (tối đa 5 ảnh)
                                </Typography>
                                <Box
                                    onClick={() => fileInputRef.current?.click()}
                                    sx={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '16px',
                                        p: 4,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(248, 250, 252, 0.5)',
                                        '&:hover': {
                                            borderColor: '#667eea',
                                            background: 'rgba(102, 126, 234, 0.05)',
                                        }
                                    }}
                                >
                                    <CloudUpload sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        Kéo thả ảnh vào đây hoặc click để chọn
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hỗ trợ JPG, PNG, WebP (tối đa 10MB mỗi ảnh)
                                    </Typography>
                                </Box>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />

                                {/* Preview uploaded images */}
                                {uploadedImages.length > 0 && (
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                        gap: 2,
                                        mt: 3
                                    }}>
                                        {uploadedImages.map((file, index) => (
                                            <Box key={index} sx={{ position: 'relative' }}>
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Upload ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '120px',
                                                        objectFit: 'cover',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0'
                                                    }}
                                                />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeImage(index)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -8,
                                                        right: -8,
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        '&:hover': {
                                                            background: '#dc2626',
                                                        },
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                >
                                                    <Close sx={{ fontSize: 16 }} />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            {/* Text Prompt Section */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Hoặc mô tả bằng văn bản
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Ví dụ: Một chú mèo nhỏ màu vàng đang cười vui vẻ, phong cách hoạt hình..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            background: 'rgba(248, 250, 252, 0.8)',
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    )}

                    {/* Step 2: Choose Emotion */}
                    {activeStep === 2 && (
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                Chọn cảm xúc cho sticker
                            </Typography>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
                                gap: 2
                            }}>
                                {emotions.map((emotion) => (
                                    <Card
                                        key={emotion.id}
                                        sx={{
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            border: selectedEmotion === emotion.id ? `3px solid ${emotion.color}` : '1px solid rgba(0, 0, 0, 0.1)',
                                            transform: selectedEmotion === emotion.id ? 'scale(1.1)' : 'scale(1)',
                                            boxShadow: selectedEmotion === emotion.id ? `0 8px 32px ${emotion.color}40` : '0 4px 20px rgba(0, 0, 0, 0.1)',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                            }
                                        }}
                                        onClick={() => setSelectedEmotion(emotion.id)}
                                    >
                                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                            <Typography variant="h3" sx={{ mb: 1 }}>
                                                {emotion.icon}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {emotion.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Step 3: Results */}
                    {activeStep === 3 && (
                        <Box sx={{ textAlign: 'center' }}>
                            {isGenerating ? (
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                        Đang tạo sticker cho bạn...
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 3,
                                        my: 6
                                    }}>
                                        <Box sx={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                        }}>
                                            <AutoAwesome sx={{ color: 'white', fontSize: 48 }} />
                                            <CircularProgress
                                                size={140}
                                                thickness={3}
                                                sx={{
                                                    position: 'absolute',
                                                    color: '#667eea',
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="h6" color="text.secondary">
                                            AI đang phân tích và tạo sticker...
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                        Sticker của bạn đã sẵn sàng! 🎉
                                    </Typography>
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                                        gap: 3,
                                        mb: 4
                                    }}>
                                        {generatedImages.map((imageUrl, index) => (
                                            <Card
                                                key={index}
                                                sx={{
                                                    borderRadius: '16px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    border: selectedGenerated === imageUrl ? '3px solid #667eea' : '1px solid rgba(0, 0, 0, 0.1)',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                                    }
                                                }}
                                                onClick={() => setSelectedGenerated(imageUrl)}
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt={`Generated ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        objectFit: 'cover',
                                                        borderRadius: '16px',
                                                    }}
                                                />
                                            </Card>
                                        ))}
                                    </Box>

                                    {selectedGenerated && (
                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                            <Button
                                                variant="contained"
                                                startIcon={<Download />}
                                                sx={{
                                                    borderRadius: '12px',
                                                    textTransform: 'none',
                                                    fontWeight: 700,
                                                    px: 4,
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                }}
                                            >
                                                Tải về
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<Share />}
                                                sx={{
                                                    borderRadius: '12px',
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    px: 4,
                                                }}
                                            >
                                                Chia sẻ
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<Refresh />}
                                                onClick={() => {
                                                    setActiveStep(0);
                                                    setSelectedCharacter('');
                                                    setSelectedEmotion('');
                                                    setUploadedImages([]);
                                                    setPrompt('');
                                                    setGeneratedImages([]);
                                                    setSelectedGenerated('');
                                                }}
                                                sx={{
                                                    borderRadius: '12px',
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    px: 4,
                                                }}
                                            >
                                                Tạo mới
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Navigation Buttons */}
                    {activeStep < 3 && (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 4,
                            pt: 3,
                            borderTop: '1px solid rgba(0, 0, 0, 0.1)'
                        }}>
                            <Button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 4,
                                    visibility: activeStep === 0 ? 'hidden' : 'visible'
                                }}
                            >
                                Quay lại
                            </Button>

                            <Button
                                variant="contained"
                                onClick={activeStep === 2 ? handleGenerate : handleNext}
                                disabled={!canProceed()}
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    px: 6,
                                    py: 1.5,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                    '&:hover': {
                                        boxShadow: '0 12px 48px rgba(102, 126, 234, 0.4)',
                                    },
                                    '&:disabled': {
                                        background: '#e2e8f0',
                                        color: '#94a3b8',
                                        boxShadow: 'none',
                                    }
                                }}
                            >
                                {activeStep === 2 ? 'Tạo sticker' : 'Tiếp tục'}
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Container>

            {/* Preview Dialog */}
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        maxHeight: '90vh',
                    }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 1
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Xem trước sticker
                    </Typography>
                    <IconButton onClick={() => setPreviewOpen(false)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    {selectedGenerated && (
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                                src={selectedGenerated}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '400px',
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CreatePage;
