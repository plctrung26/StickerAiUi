import React from 'react';
import { Box, Chip } from '@mui/material';

interface CategoryChipsProps {
    categories: string[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
    categories,
    selectedCategory,
    onCategorySelect
}) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            <Chip
                label="Tất cả"
                clickable
                variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                onClick={() => onCategorySelect('all')}
                sx={{
                    borderRadius: '12px',
                    fontWeight: 600,
                    ...(selectedCategory === 'all' && {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                    })
                }}
            />
            {categories.map((category) => (
                <Chip
                    key={category}
                    label={category}
                    clickable
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    onClick={() => onCategorySelect(category)}
                    sx={{
                        borderRadius: '12px',
                        fontWeight: 600,
                        ...(selectedCategory === category && {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                        })
                    }}
                />
            ))}
        </Box>
    );
};

export default CategoryChips;
