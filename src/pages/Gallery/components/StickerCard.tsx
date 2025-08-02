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
}

const StickerCard: React.FC<StickerCardProps> = ({ sticker }) => {
    return (
        <Card sx={{
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }
        }}>
            <CardMedia
                component="img"
                height="200"
                image={sticker.imageUrl}
                alt={sticker.title}
                sx={{
                    background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
            />
            <CardContent sx={{ p: 2 }}>
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
                            sx={{ color: sticker.isLiked ? '#ef4444' : '#64748b' }}
                        >
                            {sticker.isLiked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {sticker.likes}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    size="small"
                    startIcon={<Download />}
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        flexGrow: 1,
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        '&:hover': {
                            background: 'rgba(102, 126, 234, 0.2)',
                        }
                    }}
                >
                    Tải về
                </Button>
                <IconButton size="small">
                    <Share sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton size="small">
                    <MoreVert sx={{ fontSize: 18 }} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default StickerCard;
