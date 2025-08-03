import React from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    IconButton,
    Typography,
    Button,
    Chip,
    Divider,
} from '@mui/material';
import {
    Close,
    Download,
    Share,
    Favorite,
    FavoriteBorder,
    ZoomIn,
    ZoomOut,
} from '@mui/icons-material';
import { useAppStore } from '../../../store/appStore';

const StickerPreviewModal: React.FC = () => {
    const {
        isPreviewModalOpen,
        previewedSticker,
        likedStickers,
        closePreviewModal,
        toggleStickerLike,
        downloadSticker,
        openShareModal,
    } = useAppStore();

    const [zoom, setZoom] = React.useState(1);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        if (isPreviewModalOpen) {
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [isPreviewModalOpen]);

    if (!previewedSticker) return null;

    const isLiked = likedStickers.includes(previewedSticker.id);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoom > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleLike = () => {
        toggleStickerLike(previewedSticker.id);
    };

    const handleDownload = () => {
        downloadSticker(previewedSticker);
    };

    const handleShare = () => {
        openShareModal(previewedSticker);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Dialog
            open={isPreviewModalOpen}
            onClose={closePreviewModal}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? '#161b22'
                        : '#ffffff',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                    maxHeight: '90vh',
                }
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                }
            }}
        >
            <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                            Xem trước sticker
                        </Typography>
                        <Chip
                            label={`ID: ${previewedSticker.id}`}
                            size="small"
                            sx={{
                                background: 'rgba(102, 126, 234, 0.2)',
                                color: 'white',
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            onClick={handleZoomOut}
                            disabled={zoom <= 0.5}
                            sx={{ color: 'white', '&:hover': { background: 'rgba(255, 255, 255, 0.1)' } }}
                        >
                            <ZoomOut />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: 'white', minWidth: 60, textAlign: 'center' }}>
                            {Math.round(zoom * 100)}%
                        </Typography>
                        <IconButton
                            onClick={handleZoomIn}
                            disabled={zoom >= 3}
                            sx={{ color: 'white', '&:hover': { background: 'rgba(255, 255, 255, 0.1)' } }}
                        >
                            <ZoomIn />
                        </IconButton>
                        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)', mx: 1 }} />
                        <IconButton
                            onClick={closePreviewModal}
                            sx={{ color: 'white', '&:hover': { background: 'rgba(255, 255, 255, 0.1)' } }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                </Box>

                {/* Image Container */}
                <Box
                    sx={{
                        height: '70vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                        overflow: 'hidden',
                        cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <img
                        src={previewedSticker.file_url}
                        alt="Sticker Preview"
                        style={{
                            maxWidth: zoom > 1 ? 'none' : '100%',
                            maxHeight: zoom > 1 ? 'none' : '100%',
                            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                            transition: isDragging ? 'none' : 'transform 0.2s ease',
                            userSelect: 'none',
                            pointerEvents: 'none',
                        }}
                    />
                </Box>

                {/* Footer */}
                <Box sx={{
                    p: 3,
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(22, 27, 34, 0.9)'
                        : 'rgba(248, 250, 252, 0.9)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Được tạo vào {formatDate(previewedSticker.created_at)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ID: {previewedSticker.id}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            onClick={handleDownload}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 700,
                                flexGrow: 1,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            Tải xuống
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={isLiked ? <Favorite /> : <FavoriteBorder />}
                            onClick={handleLike}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 600,
                                color: isLiked ? '#ef4444' : 'text.primary',
                                borderColor: isLiked ? '#ef4444' : 'divider',
                                '&:hover': {
                                    borderColor: '#ef4444',
                                    color: '#ef4444',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            {isLiked ? 'Đã thích' : 'Thích'}
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Share />}
                            onClick={handleShare}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                }
                            }}
                        >
                            Chia sẻ
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default StickerPreviewModal;
