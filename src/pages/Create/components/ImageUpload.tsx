import React, { useRef } from 'react';
import {
    Box,
    Typography,
    TextField,
    IconButton,
} from '@mui/material';
import {
    CloudUpload,
    Close,
} from '@mui/icons-material';

interface ImageUploadProps {
    uploadedImages: File[];
    setUploadedImages: (images: File[]) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    uploadedImages,
    setUploadedImages,
    prompt,
    setPrompt,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            const newImages = [...uploadedImages, ...files].slice(0, 5);
            setUploadedImages(newImages);
        }
    };

    const removeImage = (index: number) => {
        const newImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(newImages);
    };

    return (
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
                        border: (theme) => theme.palette.mode === 'dark'
                            ? '2px dashed #30363d'
                            : '2px dashed #cbd5e1',
                        borderRadius: '16px',
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: (theme) => theme.palette.mode === 'dark'
                            ? 'rgba(22, 27, 34, 0.5)'
                            : 'rgba(248, 250, 252, 0.5)',
                        '&:hover': {
                            borderColor: '#667eea',
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(88, 166, 255, 0.1)'
                                : 'rgba(102, 126, 234, 0.05)',
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
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(22, 27, 34, 0.8)'
                                : 'rgba(248, 250, 252, 0.8)',
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default ImageUpload;
