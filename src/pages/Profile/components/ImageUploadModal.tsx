import React, { useState, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Avatar,
    IconButton,
    Typography,
    Tabs,
    Tab,
    styled,
    Alert,
    LinearProgress,
} from '@mui/material';
import {
    PhotoCamera,
    CloudUpload,
    Close,
    Delete,
} from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface ImageUploadModalProps {
    open: boolean;
    onClose: () => void;
    onImageUpdate: (imageFile: File) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
    open,
    onClose,
    onImageUpdate
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setError(null);
        if (newValue === 0) {
            stopCamera();
        } else if (newValue === 1) {
            startCamera();
        }
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                setIsCameraActive(true);
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setError('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraActive(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            if (ctx) {
                ctx.drawImage(video, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
                        setSelectedFile(file);
                        setPreviewImage(canvas.toDataURL());
                        stopCamera();
                    }
                }, 'image/jpeg', 0.9);
            }
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Kích thước file không được vượt quá 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                setError('Vui lòng chọn file hình ảnh');
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            onImageUpdate(selectedFile);
            handleClose();
        } catch (error) {
            setError('Có lỗi xảy ra khi tải ảnh lên');
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        stopCamera();
        setPreviewImage(null);
        setSelectedFile(null);
        setError(null);
        setActiveTab(0);
        onClose();
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(22, 27, 34, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 2,
                color: 'text.primary'
            }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                    Cập nhật ảnh đại diện
                </Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)'
                        }
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        mb: 3,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            color: 'text.secondary',
                        },
                        '& .Mui-selected': {
                            color: 'primary.main !important',
                        },
                    }}
                >
                    <Tab icon={<CloudUpload />} label="Tải lên từ thiết bị" />
                    <Tab icon={<PhotoCamera />} label="Chụp ảnh" />
                </Tabs>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {isUploading && (
                    <Box sx={{ mb: 2 }}>
                        <LinearProgress />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                            Đang tải ảnh lên...
                        </Typography>
                    </Box>
                )}

                {/* Upload Tab */}
                {activeTab === 0 && (
                    <Box sx={{ textAlign: 'center' }}>
                        {previewImage ? (
                            <Box sx={{ mb: 3 }}>
                                <Avatar
                                    src={previewImage}
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        mx: 'auto',
                                        mb: 2,
                                        border: '4px solid',
                                        borderColor: 'primary.main',
                                    }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <IconButton
                                        onClick={handleRemoveImage}
                                        sx={{
                                            color: 'error.main',
                                            '&:hover': {
                                                backgroundColor: 'rgba(244, 67, 54, 0.1)'
                                            }
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{
                                p: 4,
                                border: '2px dashed',
                                borderColor: 'primary.main',
                                borderRadius: '16px',
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(102, 126, 234, 0.05)'
                                    : 'rgba(102, 126, 234, 0.02)',
                                mb: 3
                            }}>
                                <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                                    Kéo thả hoặc nhấp để chọn ảnh
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hỗ trợ JPG, PNG. Tối đa 5MB
                                </Typography>
                            </Box>
                        )}

                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUpload />}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                                }
                            }}
                        >
                            Chọn ảnh từ thiết bị
                            <VisuallyHiddenInput
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                        </Button>
                    </Box>
                )}

                {/* Camera Tab */}
                {activeTab === 1 && (
                    <Box sx={{ textAlign: 'center' }}>
                        {previewImage ? (
                            <Box sx={{ mb: 3 }}>
                                <Avatar
                                    src={previewImage}
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        mx: 'auto',
                                        mb: 2,
                                        border: '4px solid',
                                        borderColor: 'primary.main',
                                    }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PhotoCamera />}
                                        onClick={() => {
                                            setPreviewImage(null);
                                            setSelectedFile(null);
                                            startCamera();
                                        }}
                                        sx={{
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            borderColor: 'primary.main',
                                            color: 'primary.main'
                                        }}
                                    >
                                        Chụp lại
                                    </Button>
                                    <IconButton
                                        onClick={handleRemoveImage}
                                        sx={{
                                            color: 'error.main',
                                            '&:hover': {
                                                backgroundColor: 'rgba(244, 67, 54, 0.1)'
                                            }
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Box>
                        ) : (
                            <Box>
                                {isCameraActive ? (
                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{
                                            position: 'relative',
                                            display: 'inline-block',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            border: '4px solid',
                                            borderColor: 'primary.main',
                                        }}>
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                muted
                                                style={{
                                                    width: '400px',
                                                    height: '300px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <canvas
                                                ref={canvasRef}
                                                style={{ display: 'none' }}
                                            />
                                        </Box>
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={capturePhoto}
                                                sx={{
                                                    borderRadius: '50%',
                                                    width: 60,
                                                    height: 60,
                                                    minWidth: 60,
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <PhotoCamera />
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box sx={{
                                        p: 4,
                                        border: '2px dashed',
                                        borderColor: 'primary.main',
                                        borderRadius: '16px',
                                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                                            ? 'rgba(102, 126, 234, 0.05)'
                                            : 'rgba(102, 126, 234, 0.02)',
                                        mb: 3
                                    }}>
                                        <PhotoCamera sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                                            Sử dụng camera để chụp ảnh
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                            Nhấp vào nút bên dưới để bắt đầu
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<PhotoCamera />}
                                            onClick={startCamera}
                                            sx={{
                                                borderRadius: '12px',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                                                }
                                            }}
                                        >
                                            Bật camera
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        color: 'text.secondary'
                    }}
                >
                    Hủy
                </Button>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    disabled={!selectedFile || isUploading}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                        }
                    }}
                >
                    {isUploading ? 'Đang tải lên...' : 'Cập nhật ảnh'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageUploadModal;
