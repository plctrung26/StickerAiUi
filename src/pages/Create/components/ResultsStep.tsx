import React from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    Button,
} from '@mui/material';
import {
    AutoAwesome,
    Download,
    Share,
    Refresh,
} from '@mui/icons-material';

interface ResultsStepProps {
    isGenerating: boolean;
    generatedImages: string[];
    selectedGenerated: string;
    onImageSelect: (imageUrl: string) => void;
    onRestart: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({
    isGenerating,
    generatedImages,
    selectedGenerated,
    onImageSelect,
    onRestart,
}) => {
    if (isGenerating) {
        return (
            <Box sx={{ textAlign: 'center' }}>
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
        );
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
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
                        onClick={() => onImageSelect(imageUrl)}
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
                        onClick={onRestart}
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
    );
};

export default ResultsStep;
