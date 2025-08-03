import React from 'react';
import {
    Container,
    Typography,
    Box,
} from '@mui/material';
import { useAppStore } from '../../store/appStore';
import SearchAndFilters from './components/SearchAndFilters';
import StickerGrid from './components/StickerGrid';
import FloatingActionButton from './components/FloatingActionButton';
import StickerPreviewModal from './components/StickerPreviewModal';
import StickerShareModal from './components/StickerShareModal';
import StickerMoreMenuModal from './components/StickerMoreMenuModal';

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

const GalleryPage: React.FC = () => {
    const {
        gallerySearchQuery,
        galleryViewMode,
        galleryFilterAnchor,
        gallerySelectedCategory,
        gallerySortBy,
        setGallerySearchQuery,
        setGalleryViewMode,
        setGalleryFilterAnchor,
        setGallerySelectedCategory,
        setGallerySortBy
    } = useAppStore();

    // Mock data - replace with actual API call
    const stickerData: StickerItem[] = [
        {
            id: '1',
            title: 'Cute Cat Sticker',
            imageUrl: '/api/placeholder/300/300',
            category: 'Animals',
            downloads: 45,
            likes: 12,
            isLiked: true,
            createdAt: '2024-01-15'
        },
        {
            id: '2',
            title: 'Happy Dog',
            imageUrl: '/api/placeholder/300/300',
            category: 'Animals',
            downloads: 32,
            likes: 8,
            isLiked: false,
            createdAt: '2024-01-14'
        },
        {
            id: '3',
            title: 'AWS Architecture',
            imageUrl: '/api/placeholder/300/300',
            category: 'Tech',
            downloads: 67,
            likes: 25,
            isLiked: true,
            createdAt: '2024-01-13'
        },
        {
            id: '4',
            title: 'Funny Emoji',
            imageUrl: '/api/placeholder/300/300',
            category: 'Emoji',
            downloads: 89,
            likes: 34,
            isLiked: false,
            createdAt: '2024-01-12'
        },
        {
            id: '5',
            title: 'Nature Scene',
            imageUrl: '/api/placeholder/300/300',
            category: 'Nature',
            downloads: 23,
            likes: 7,
            isLiked: true,
            createdAt: '2024-01-11'
        },
        {
            id: '6',
            title: 'Space Galaxy',
            imageUrl: '/api/placeholder/300/300',
            category: 'Space',
            downloads: 56,
            likes: 19,
            isLiked: false,
            createdAt: '2024-01-10'
        },
    ];

    const categories = ['all', 'Animals', 'Tech', 'Emoji', 'Nature', 'Space'];

    const filteredStickers = stickerData
        .filter(sticker => {
            const matchesSearch = sticker.title.toLowerCase().includes(gallerySearchQuery.toLowerCase());
            const matchesCategory = gallerySelectedCategory === 'all' || sticker.category === gallerySelectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (gallerySortBy) {
                case 'downloads':
                    return b.downloads - a.downloads;
                case 'likes':
                    return b.likes - a.likes;
                case 'date':
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setGalleryFilterAnchor(event.currentTarget);
    };

    const handleFilterClose = () => {
        setGalleryFilterAnchor(null);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)'
                : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
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
                        Bộ sưu tập Sticker của bạn
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                        {filteredStickers.length} sticker đã tạo
                    </Typography>
                </Box>

                <SearchAndFilters
                    searchQuery={gallerySearchQuery}
                    setSearchQuery={setGallerySearchQuery}
                    viewMode={galleryViewMode}
                    setViewMode={setGalleryViewMode}
                    selectedCategory={gallerySelectedCategory}
                    setSelectedCategory={setGallerySelectedCategory}
                    onFilterClick={handleFilterClick}
                    categories={categories}
                />

                <StickerGrid stickers={filteredStickers} viewMode={galleryViewMode} />
            </Container>

            <FloatingActionButton
                filterAnchor={galleryFilterAnchor}
                onFilterClose={handleFilterClose}
                gallerySortBy={gallerySortBy}
                setGallerySortBy={setGallerySortBy}
            />

            {/* Modals */}
            <StickerPreviewModal />
            <StickerShareModal />
            <StickerMoreMenuModal />
        </Box>
    );
};

export default GalleryPage;
