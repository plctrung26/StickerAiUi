import React from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useAppStore } from '../../store/appStore';
import CharacterSelection from './components/CharacterSelection';
import ImageUpload from './components/ImageUpload';
import EmotionSelection from './components/EmotionSelection';
import ResultsStep from './components/ResultsStep';

const CreatePage: React.FC = () => {
    const {
        createStep,
        uploadedImages,
        selectedCharacterId,
        selectedEmotionId,
        textPrompt,
        isGenerating,
        generatedImages,
        selectedGeneratedImage,
        isPreviewOpen,
        nextCreateStep,
        prevCreateStep,
        setIsGenerating,
        setGeneratedImages,
        setSelectedCharacterId,
        setSelectedEmotionId,
        setTextPrompt,
        setUploadedImages,
        setSelectedGeneratedImage,
        closePreview,
        resetCreateState
    } = useAppStore();

    const steps = ['Chọn phong cách', 'Upload ảnh', 'Tạo sticker', 'Kết quả'];

    const handleNext = () => {
        if (createStep < steps.length - 1) {
            nextCreateStep();
        }
    };

    const handleBack = () => {
        if (createStep > 0) {
            prevCreateStep();
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        nextCreateStep(); // Move to results step

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

    const handleRestart = () => {
        resetCreateState();
    };

    const canProceed = () => {
        switch (createStep) {
            case 0:
                return selectedCharacterId !== '';
            case 1:
                return uploadedImages.length > 0 || textPrompt.trim() !== '';
            case 2:
                return selectedEmotionId !== '';
            default:
                return true;
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)'
                : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
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
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(22, 27, 34, 0.9)'
                        : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                        : '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}>
                    <Stepper activeStep={createStep} sx={{ mb: 2 }}>
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
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(22, 27, 34, 0.9)'
                        : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                        : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    minHeight: '500px',
                }}>
                    {createStep === 0 && (
                        <CharacterSelection
                            selectedCharacter={selectedCharacterId}
                            onCharacterSelect={setSelectedCharacterId}
                        />
                    )}

                    {createStep === 1 && (
                        <ImageUpload
                            uploadedImages={uploadedImages}
                            setUploadedImages={setUploadedImages}
                            prompt={textPrompt}
                            setPrompt={setTextPrompt}
                        />
                    )}

                    {createStep === 2 && (
                        <EmotionSelection
                            selectedEmotion={selectedEmotionId}
                            onEmotionSelect={setSelectedEmotionId}
                        />
                    )}

                    {createStep === 3 && (
                        <ResultsStep
                            isGenerating={isGenerating}
                            generatedImages={generatedImages}
                            selectedGenerated={selectedGeneratedImage}
                            onImageSelect={setSelectedGeneratedImage}
                            onRestart={handleRestart}
                        />
                    )}

                    {/* Navigation Buttons */}
                    {createStep < 3 && (
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
                                disabled={createStep === 0}
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 4,
                                    visibility: createStep === 0 ? 'hidden' : 'visible'
                                }}
                            >
                                Quay lại
                            </Button>

                            <Button
                                variant="contained"
                                onClick={createStep === 2 ? handleGenerate : handleNext}
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
                                {createStep === 2 ? 'Tạo sticker' : 'Tiếp tục'}
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Container>

            {/* Preview Dialog */}
            <Dialog
                open={isPreviewOpen}
                onClose={closePreview}
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
                    <IconButton onClick={closePreview}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    {selectedGeneratedImage && (
                        <Box sx={{ textAlign: 'center' }}>
                            <img
                                src={selectedGeneratedImage}
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
