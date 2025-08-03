import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Box,
    IconButton,
    Button,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    Download,
    Share,
    MoreVert,
} from '@mui/icons-material';
import { useAppStore } from '../../../store/appStore';

interface StickerItem {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    downloads: number;
    likes: number;
    isLiked: boolean;
    createdAt: string;
}

interface StickerCardProps {
    sticker: StickerItem;
    viewMode: 'grid' | 'list';
}

const StickerCard: React.FC<StickerCardProps> = ({ sticker, viewMode }) => {
    const {
        likedStickers,
        toggleStickerLike,
        downloadSticker,
        openShareModal,
        openMoreMenu,
        openPreviewModal
    } = useAppStore();

    const isLiked = likedStickers.includes(sticker.id);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleStickerLike(sticker.id);
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Convert StickerItem to Sticker format for download
        downloadSticker({
            id: sticker.id,
            file_url: sticker.imageUrl,
            upload_session_id: '',
            is_public: true,
            created_at: sticker.createdAt,
            updated_at: sticker.createdAt
        });
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        openShareModal({
            id: sticker.id,
            file_url: sticker.imageUrl,
            upload_session_id: '',
            is_public: true,
            created_at: sticker.createdAt,
            updated_at: sticker.createdAt
        });
    };

    const handleMore = (e: React.MouseEvent) => {
        e.stopPropagation();
        openMoreMenu({
            id: sticker.id,
            file_url: sticker.imageUrl,
            upload_session_id: '',
            is_public: true,
            created_at: sticker.createdAt,
            updated_at: sticker.createdAt
        }, e.currentTarget as HTMLElement);
    };

    const handlePreview = () => {
        openPreviewModal({
            id: sticker.id,
            file_url: sticker.imageUrl,
            upload_session_id: '',
            is_public: true,
            created_at: sticker.createdAt,
            updated_at: sticker.createdAt
        });
    };

    if (viewMode === 'list') {
        return (
            <Card sx={{
                borderRadius: '16px',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(22, 27, 34, 0.9)'
                    : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: (theme) => theme.palette.mode === 'dark'
                    ? '1px solid rgba(48, 54, 61, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 4px 16px rgba(0, 0, 0, 0.3)'
                    : '0 4px 16px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                mb: 1,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                height: 120,
                '&:hover': {
                    transform: 'translateX(4px)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                        : '0 8px 24px rgba(0, 0, 0, 0.15)',
                    ml: '4px', // Compensate for translateX movement
                }
            }}>
                {/* List View - Image on the left */}
                <Box sx={{
                    width: 120,
                    height: 120,
                    flexShrink: 0,
                    background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onClick={handlePreview}>
                    <img
                        src={sticker.imageUrl}
                        alt={sticker.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                {/* List View - Content on the right */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    p: 2,
                    justifyContent: 'space-between'
                }}>
                    <Box onClick={handlePreview} sx={{ cursor: 'pointer', flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>
                            {sticker.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip
                                label={sticker.category}
                                size="small"
                                sx={{
                                    background: 'rgba(102, 126, 234, 0.1)',
                                    color: '#667eea',
                                    fontWeight: 600,
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {new Date(sticker.createdAt).toLocaleDateString('vi-VN')}
                            </Typography>
                        </Box>
                    </Box>

                    {/* List View - Actions */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {/* Downloads count */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Download sx={{ fontSize: 16, color: '#64748b' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {sticker.downloads}
                                </Typography>
                            </Box>

                            {/* Likes count */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <IconButton
                                    size="small"
                                    onClick={handleLike}
                                    sx={{
                                        color: isLiked ? '#ef4444' : '#64748b',
                                        p: 0.5,
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            color: '#ef4444'
                                        }
                                    }}
                                >
                                    {isLiked ? <Favorite sx={{ fontSize: 16 }} /> : <FavoriteBorder sx={{ fontSize: 16 }} />}
                                </IconButton>
                                <Typography variant="body2" color="text.secondary">
                                    {sticker.likes + (isLiked ? 1 : 0) - (sticker.isLiked ? 1 : 0)}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Action buttons */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                size="small"
                                onClick={handleDownload}
                                sx={{
                                    color: '#64748b',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#10b981'
                                    }
                                }}
                            >
                                <Download sx={{ fontSize: 18 }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={handleShare}
                                sx={{
                                    color: '#64748b',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#3b82f6'
                                    }
                                }}
                            >
                                <Share sx={{ fontSize: 18 }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={handleMore}
                                sx={{
                                    color: '#64748b',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#8b5cf6'
                                    }
                                }}
                            >
                                <MoreVert sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Card>
        );
    }

    // Grid View (existing layout)
    return (
        <Card sx={{
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
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            mb: 1, // Add margin to prevent layout shift
            cursor: 'pointer', // Make card clickable for preview
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                    : '0 20px 60px rgba(0, 0, 0, 0.15)',
                mb: '12px', // Compensate for translateY movement
            }
        }}>
            <CardMedia
                component="img"
                height="200"
                image={sticker.imageUrl}
                alt={sticker.title}
                onClick={handlePreview}
                sx={{
                    background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    cursor: 'pointer',
                }}
            />
            <CardContent sx={{ p: 2 }} onClick={handlePreview}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                    {sticker.title}
                </Typography>
                <Chip
                    label={sticker.category}
                    size="small"
                    sx={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        fontWeight: 600,
                        mb: 2
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        {sticker.downloads} tải về
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                            size="small"
                            onClick={handleLike}
                            sx={{
                                color: isLiked ? '#ef4444' : '#64748b',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    color: '#ef4444'
                                }
                            }}
                        >
                            {isLiked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {sticker.likes + (isLiked ? 1 : 0) - (sticker.isLiked ? 1 : 0)}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    size="small"
                    startIcon={<Download />}
                    onClick={handleDownload}
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        flexGrow: 1,
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        '&:hover': {
                            background: 'rgba(102, 126, 234, 0.2)',
                            transform: 'scale(1.02)'
                        }
                    }}
                >
                    Tải về
                </Button>
                <IconButton
                    size="small"
                    onClick={handleShare}
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: '#667eea'
                        }
                    }}
                >
                    <Share sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={handleMore}
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: '#667eea'
                        }
                    }}
                >
                    <MoreVert sx={{ fontSize: 18 }} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default StickerCard;
