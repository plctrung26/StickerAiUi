import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    List,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Chip,
    Fade,
    IconButton,
    InputAdornment,
    Divider,
    ListItemButton,
} from '@mui/material';
import { Search, Close, TrendingUp, History, Tag, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { homeSearchQuery, setHomeSearchQuery } = useAppStore();

    const [localQuery, setLocalQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);

    // Mock data for suggestions
    const recentSearches = [
        'funny cats',
        'anime stickers',
        'meme faces',
        'cute animals'
    ];

    const trendingSearches = [
        'Christmas stickers',
        'holiday emojis',
        'winter themes',
        'new year 2024'
    ];

    const popularTags = [
        'cute', 'funny', 'anime', 'animals', 'memes', 'emoji',
        'holiday', 'love', 'happy', 'cool', 'kawaii', 'cartoon'
    ];

    useEffect(() => {
        if (open) {
            setLocalQuery(homeSearchQuery);
            setShowSuggestions(true);
        }
    }, [open, homeSearchQuery]);

    const handleSearch = (query: string) => {
        setHomeSearchQuery(query);
        if (query.trim()) {
            navigate(`/gallery?search=${encodeURIComponent(query)}`);
            onClose();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setLocalQuery(suggestion);
        handleSearch(suggestion);
    };

    const handleTagClick = (tag: string) => {
        setLocalQuery(tag);
        handleSearch(tag);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLocalQuery(value);
        setShowSuggestions(value.length === 0);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch(localQuery);
        }
    };

    const clearInput = () => {
        setLocalQuery('');
        setShowSuggestions(true);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    minHeight: '60vh',
                    maxHeight: '80vh',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #161b22 0%, #21262d 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid #30363d'
                        : '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                        : '0 20px 60px rgba(0, 0, 0, 0.15)',
                }
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                }
            }}
        >
            <DialogTitle sx={{
                pb: 1,
                color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Search sx={{
                        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary'
                    }} />
                    <Typography variant="h6" sx={{
                        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary'
                    }}>
                        Search Stickers
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary'
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2, color: 'white' }}>
                {/* Search Input */}
                <TextField
                    fullWidth
                    autoFocus
                    placeholder="Search for stickers, characters, emotions..."
                    value={localQuery}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(48, 54, 61, 0.3)'
                                : 'rgba(248, 250, 252, 0.8)',
                            borderRadius: 2,
                            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'text.primary',
                            '& fieldset': {
                                borderColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(139, 148, 158, 0.3)'
                                    : 'rgba(0, 0, 0, 0.2)',
                            },
                            '&:hover fieldset': {
                                borderColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(139, 148, 158, 0.5)'
                                    : 'rgba(102, 126, 234, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'white'
                                    : '#667eea',
                            },
                        },
                        '& .MuiOutlinedInput-input::placeholder': {
                            color: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.7)'
                                : 'rgba(0, 0, 0, 0.6)',
                            opacity: 1,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{
                                    color: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.7)'
                                        : 'rgba(0, 0, 0, 0.6)'
                                }} />
                            </InputAdornment>
                        ),
                        endAdornment: localQuery && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={clearInput}
                                    sx={{
                                        color: (theme) => theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.7)'
                                            : 'rgba(0, 0, 0, 0.6)'
                                    }}
                                    size="small"
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Search Suggestions */}
                <Fade in={showSuggestions}>
                    <Box>
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <Box mb={3}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <History sx={{
                                        color: (theme) => theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.8)'
                                            : 'rgba(0, 0, 0, 0.7)',
                                        fontSize: 20
                                    }} />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: (theme) => theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.8)'
                                                : 'text.primary'
                                        }}
                                    >
                                        Recent Searches
                                    </Typography>
                                </Box>
                                <List disablePadding>
                                    {recentSearches.map((search, index) => (
                                        <ListItemButton
                                            key={index}
                                            onClick={() => handleSuggestionClick(search)}
                                            sx={{
                                                borderRadius: 1,
                                                mb: 0.5,
                                                backgroundColor: theme => theme.palette.mode === 'dark'
                                                    ? 'rgba(255, 255, 255, 0.05)'
                                                    : 'rgba(0, 0, 0, 0.02)',
                                                '&:hover': {
                                                    backgroundColor: theme => theme.palette.mode === 'dark'
                                                        ? 'rgba(255, 255, 255, 0.15)'
                                                        : 'rgba(0, 0, 0, 0.08)',
                                                    transform: 'translateX(8px)',
                                                },
                                                transition: 'all 0.2s ease-in-out',
                                            }}
                                        >
                                            <ListItemIcon>
                                                <History sx={{
                                                    color: theme => theme.palette.mode === 'dark'
                                                        ? 'rgba(255, 255, 255, 0.6)'
                                                        : 'rgba(0, 0, 0, 0.6)'
                                                }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={search}
                                                primaryTypographyProps={{
                                                    color: 'text.primary',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                        )}

                        <Divider sx={{
                            backgroundColor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(139, 148, 158, 0.2)'
                                : 'rgba(255, 255, 255, 0.2)',
                            mb: 3
                        }} />

                        {/* Trending Searches */}
                        <Box mb={3}>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <TrendingUp sx={{
                                    color: theme => theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.8)'
                                        : 'rgba(0, 0, 0, 0.7)',
                                    fontSize: 20
                                }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: theme => theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.8)'
                                            : 'rgba(0, 0, 0, 0.7)'
                                    }}
                                >
                                    Trending Now
                                </Typography>
                            </Box>
                            <List disablePadding>
                                {trendingSearches.map((search, index) => (
                                    <ListItemButton
                                        key={index}
                                        onClick={() => handleSuggestionClick(search)}
                                        sx={{
                                            borderRadius: 1,
                                            mb: 0.5,
                                            backgroundColor: theme => theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.05)'
                                                : 'rgba(0, 0, 0, 0.02)',
                                            '&:hover': {
                                                backgroundColor: theme => theme.palette.mode === 'dark'
                                                    ? 'rgba(255, 255, 255, 0.15)'
                                                    : 'rgba(0, 0, 0, 0.08)',
                                                transform: 'translateX(8px)',
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        <ListItemIcon>
                                            <TrendingUp sx={{ color: '#FF6B6B' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={search}
                                            primaryTypographyProps={{
                                                color: 'text.primary',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                        <Star sx={{ color: '#FFD93D', fontSize: 18 }} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Box>

                        <Divider sx={{
                            backgroundColor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(139, 148, 158, 0.2)'
                                : 'rgba(255, 255, 255, 0.2)',
                            mb: 3
                        }} />

                        {/* Popular Tags */}
                        <Box>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <Tag sx={{
                                    color: theme => theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.8)'
                                        : 'rgba(0, 0, 0, 0.7)',
                                    fontSize: 20
                                }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: theme => theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.8)'
                                            : 'rgba(0, 0, 0, 0.7)'
                                    }}
                                >
                                    Popular Tags
                                </Typography>
                            </Box>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {popularTags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={`#${tag}`}
                                        onClick={() => handleTagClick(tag)}
                                        sx={{
                                            backgroundColor: theme => theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.15)'
                                                : 'rgba(0, 0, 0, 0.08)',
                                            color: theme => theme.palette.mode === 'dark'
                                                ? 'white'
                                                : 'text.primary',
                                            border: theme => theme.palette.mode === 'dark'
                                                ? '1px solid rgba(255, 255, 255, 0.3)'
                                                : '1px solid rgba(0, 0, 0, 0.2)',
                                            '&:hover': {
                                                backgroundColor: theme => theme.palette.mode === 'dark'
                                                    ? 'rgba(255, 255, 255, 0.25)'
                                                    : 'rgba(0, 0, 0, 0.15)',
                                                transform: 'scale(1.05)',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </DialogContent>
        </Dialog>
    );
};

export default SearchModal;
