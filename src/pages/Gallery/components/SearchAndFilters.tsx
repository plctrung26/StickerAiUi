import React, { useState, useEffect } from 'react';
import {
    Paper,
    Box,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    Chip,
    Typography,
    Divider,
    Fade,
    Badge,
} from '@mui/material';
import {
    Search,
    ViewList,
    GridView,
    Clear,
    Tune,
    TrendingUp,
} from '@mui/icons-material';

interface SearchFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    onFilterClick: (event: React.MouseEvent<HTMLElement>) => void;
    categories: string[];
}

const SearchAndFilters: React.FC<SearchFiltersProps> = ({
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    selectedCategory,
    setSelectedCategory,
    onFilterClick,
    categories,
}) => {
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Mock search suggestions
    const allSuggestions = [
        'cute animals', 'funny cats', 'happy dogs', 'cartoon characters',
        'anime style', 'kawaii', 'emoji faces', 'love hearts',
        'christmas themes', 'holiday stickers', 'birthday party',
        'motivational quotes', 'nature scenes', 'food items'
    ];

    const trendingSearches = ['christmas', 'cute cats', 'anime', 'hearts'];

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filtered = allSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchSuggestions(filtered.slice(0, 5));
            setShowSuggestions(true);
        } else {
            setSearchSuggestions(trendingSearches);
            setShowSuggestions(isSearchFocused);
        }
    }, [searchQuery, isSearchFocused]);

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
        setShowSuggestions(true);
    };

    const handleSearchBlur = () => {
        // Delay hiding suggestions to allow clicking on them
        setTimeout(() => {
            setIsSearchFocused(false);
            setShowSuggestions(false);
        }, 200);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (selectedCategory && selectedCategory !== 'All') count++;
        return count;
    };
    return (
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
            position: 'relative',
            zIndex: 5,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                alignItems: { xs: 'stretch', md: 'center' }
            }}>
                <Box sx={{ position: 'relative', flexGrow: 1, zIndex: 10 }}>
                    <TextField
                        fullWidth
                        placeholder="Tìm kiếm sticker..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: '#64748b' }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={clearSearch}
                                        size="small"
                                        sx={{
                                            color: '#64748b',
                                            '&:hover': {
                                                backgroundColor: 'rgba(100, 116, 139, 0.1)'
                                            }
                                        }}
                                    >
                                        <Clear fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                background: 'rgba(248, 250, 252, 0.8)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'rgba(248, 250, 252, 1)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                },
                                '&.Mui-focused': {
                                    background: 'rgba(248, 250, 252, 1)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                }
                            }
                        }}
                    />

                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && (
                        <Fade in>
                            <Paper
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    mt: 1,
                                    borderRadius: 2,
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.95)'
                                        : 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 9999,
                                    overflow: 'hidden',
                                    border: (theme) => theme.palette.mode === 'dark'
                                        ? '1px solid rgba(48, 54, 61, 0.3)'
                                        : '1px solid rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {searchQuery.length === 0 && (
                                    <>
                                        <Box sx={{ p: 2, pb: 1 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#64748b',
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1
                                                }}
                                            >
                                                <TrendingUp fontSize="small" />
                                                Tìm kiếm thịnh hành
                                            </Typography>
                                        </Box>
                                        <Divider />
                                    </>
                                )}

                                <Box sx={{ p: 1 }}>
                                    {searchSuggestions.map((suggestion, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            sx={{
                                                p: 2,
                                                cursor: 'pointer',
                                                borderRadius: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(102, 126, 234, 0.08)',
                                                    transform: 'translateX(4px)',
                                                }
                                            }}
                                        >
                                            <Search sx={{ color: '#94a3b8', fontSize: 16 }} />
                                            <Typography variant="body2">
                                                {suggestion}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </Fade>
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                    <Badge badgeContent={getActiveFiltersCount()} color="primary">
                        <Button
                            variant="outlined"
                            startIcon={<Tune />}
                            onClick={onFilterClick}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 600,
                                minWidth: 120,
                                px: 3,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                }
                            }}
                        >
                            Bộ lọc
                        </Button>
                    </Badge>

                    <IconButton
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        sx={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            width: 48,
                            height: 48,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px) scale(1.05)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                borderColor: '#667eea',
                            }
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
    );
};

export default SearchAndFilters;
