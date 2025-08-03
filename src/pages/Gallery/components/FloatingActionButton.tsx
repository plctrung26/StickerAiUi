import React from 'react';
import {
    Fab,
    Menu,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';

interface FloatingActionButtonProps {
    filterAnchor: HTMLElement | null;
    onFilterClose: () => void;
    gallerySortBy: 'date' | 'downloads' | 'likes';
    setGallerySortBy: (sortBy: 'date' | 'downloads' | 'likes') => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    filterAnchor,
    onFilterClose,
    gallerySortBy,
    setGallerySortBy,
}) => {
    const navigate = useNavigate();

    const handleSortChange = (sortBy: 'date' | 'downloads' | 'likes') => {
        setGallerySortBy(sortBy);
        onFilterClose();
    };

    const getSortLabel = (sortBy: 'date' | 'downloads' | 'likes') => {
        switch (sortBy) {
            case 'date': return 'Sắp xếp theo ngày';
            case 'downloads': return 'Sắp xếp theo lượt tải';
            case 'likes': return 'Sắp xếp theo lượt thích';
        }
    };

    return (
        <>
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
                        transform: 'scale(1.02)', // Reduced scale to minimize layout impact
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
                onClose={onFilterClose}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        mt: 1,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                {(['date', 'downloads', 'likes'] as const).map((sortOption) => (
                    <MenuItem
                        key={sortOption}
                        onClick={() => handleSortChange(sortOption)}
                        sx={{
                            fontWeight: gallerySortBy === sortOption ? 700 : 600,
                            color: gallerySortBy === sortOption ? '#667eea' : '#64748b',
                            backgroundColor: gallerySortBy === sortOption ? 'rgba(102, 126, 234, 0.05)' : 'transparent'
                        }}
                    >
                        {getSortLabel(sortOption)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default FloatingActionButton;
