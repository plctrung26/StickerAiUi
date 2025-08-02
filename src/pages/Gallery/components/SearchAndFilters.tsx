import React from 'react';
import {
    Paper,
    Box,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    Chip,
} from '@mui/material';
import {
    Search,
    FilterList,
    ViewList,
    GridView,
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
    return (
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
                        onClick={onFilterClick}
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
    );
};

export default SearchAndFilters;
