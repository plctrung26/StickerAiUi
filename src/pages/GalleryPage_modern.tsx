import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    AppBar,
    Toolbar,
    Avatar,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    Fab,
    Menu,
    MenuItem,
    Badge,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    ArrowBack,
    Add,
    FilterList,
    PhotoLibrary,
    Logout,
    Search,
    MoreVert,
    Download,
    Share,
    Favorite,
    FavoriteBorder,
    Collections,
    ViewList,
    NotificationsNone,
    Settings,
    GridView,
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

const GalleryPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

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

    const filteredStickers = stickerData.filter(sticker => {
        const matchesSearch = sticker.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || sticker.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setFilterAnchor(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchor(null);
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
                            <PhotoLibrary sx={{ color: 'white', fontSize: 24 }} />
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
                            Thư viện Sticker
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

                {/* Search and Filter Section */}
                <Paper sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                        alignItems: { xs: 'stretch', md: 'center' }
                    }}>
                        <TextField
                            fullWidth
                            placeholder="Tìm kiếm sticker..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: '#64748b' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: 'rgba(248, 250, 252, 0.8)',
                                    '&:hover': {
                                        background: 'rgba(248, 250, 252, 1)',
                                    }
                                }
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                            <Button
                                variant="outlined"
                                startIcon={<FilterList />}
                                onClick={handleFilterClick}
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    minWidth: 120,
                                    px: 3
                                }}
                            >
                                Lọc
                            </Button>

                            <IconButton
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                sx={{
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    width: 48,
                                    height: 48,
                                }}
                            >
                                {viewMode === 'grid' ? <ViewList /> : <GridView />}
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Category Chips */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                        {categories.map((category) => (
                            <Chip
                                key={category}
                                label={category === 'all' ? 'Tất cả' : category}
                                onClick={() => setSelectedCategory(category)}
                                variant={selectedCategory === category ? 'filled' : 'outlined'}
                                sx={{
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    ...(selectedCategory === category && {
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none',
                                    })
                                }}
                            />
                        ))}
                    </Box>
                </Paper>

                {/* Gallery Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                        xl: 'repeat(5, 1fr)'
                    },
                    gap: 3,
                    mb: 4
                }}>
                    {filteredStickers.map((sticker) => (
                        <Card key={sticker.id} sx={{
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
                    ))}
                </Box>

                {/* Empty State */}
                {filteredStickers.length === 0 && (
                    <Paper sx={{
                        p: 6,
                        textAlign: 'center',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
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
                )}
            </Container>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: { xs: 20, md: 32 },
                    right: { xs: 20, md: 32 },
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                        boxShadow: '0 12px 48px rgba(102, 126, 234, 0.4)',
                        transform: 'scale(1.05)',
                    }
                }}
                onClick={() => navigate('/create')}
            >
                <Add />
            </Fab>

            {/* Filter Menu */}
            <Menu
                anchorEl={filterAnchor}
                open={Boolean(filterAnchor)}
                onClose={handleFilterClose}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        mt: 1,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <MenuItem onClick={handleFilterClose} sx={{ fontWeight: 600, color: '#64748b' }}>
                    Sắp xếp theo ngày
                </MenuItem>
                <MenuItem onClick={handleFilterClose} sx={{ fontWeight: 600, color: '#64748b' }}>
                    Sắp xếp theo lượt tải
                </MenuItem>
                <MenuItem onClick={handleFilterClose} sx={{ fontWeight: 600, color: '#64748b' }}>
                    Sắp xếp theo lượt thích
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default GalleryPage;
