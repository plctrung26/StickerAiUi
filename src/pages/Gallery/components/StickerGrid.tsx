import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    Collections,
    Add,
} from '@mui/icons-material';
import StickerCard from './StickerCard';

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

interface StickerGridProps {
    stickers: StickerItem[];
    viewMode: 'grid' | 'list';
}

const StickerGrid: React.FC<StickerGridProps> = ({ stickers, viewMode }) => {
    const navigate = useNavigate();

    if (stickers.length === 0) {
        return (
            <Paper sx={{
                p: 6,
                textAlign: 'center',
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
                <Collections sx={{ fontSize: 64, color: '#64748b', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#64748b' }}>
                    Không tìm thấy sticker nào
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/create')}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        '&:hover': {
                            boxShadow: '0 12px 48px rgba(102, 126, 234, 0.4)',
                        }
                    }}
                >
                    Tạo sticker mới
                </Button>
            </Paper>
        );
    }

    return (
        <Box sx={{
            display: viewMode === 'list' ? 'flex' : 'grid',
            flexDirection: viewMode === 'list' ? 'column' : undefined,
            gridTemplateColumns: viewMode === 'grid' ? {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
            } : undefined,
            gap: viewMode === 'grid' ? 3 : 2,
            mb: 4
        }}>
            {stickers.map((sticker) => (
                <StickerCard key={sticker.id} sticker={sticker} viewMode={viewMode} />
            ))}
        </Box>
    );
};

export default StickerGrid;
