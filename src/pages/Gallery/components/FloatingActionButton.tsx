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
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    filterAnchor,
    onFilterClose,
}) => {
    const navigate = useNavigate();

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
                onClose={onFilterClose}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        mt: 1,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <MenuItem onClick={onFilterClose} sx={{ fontWeight: 600, color: '#64748b' }}>
                    Sắp xếp theo ngày
                </MenuItem>
                <MenuItem onClick={onFilterClose} sx={{ fontWeight: 600, color: '#64748b' }}>
                    Sắp xếp theo lượt tải
                </MenuItem>
                <MenuItem onClick={onFilterClose} sx={{ fontWeight: 600, color: '#64748b' }}>
                    Sắp xếp theo lượt thích
                </MenuItem>
            </Menu>
        </>
    );
};

export default FloatingActionButton;
