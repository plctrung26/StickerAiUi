import React from 'react';
import { IconButton } from '@mui/material';
import { ViewList, GridView } from '@mui/icons-material';

interface ViewToggleProps {
    viewMode: 'grid' | 'list';
    onToggle: (mode: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
    return (
        <>
            <IconButton
                onClick={() => onToggle('grid')}
                sx={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    color: viewMode === 'grid' ? '#667eea' : '#64748b',
                    background: viewMode === 'grid' ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                    '&:hover': {
                        background: 'rgba(102, 126, 234, 0.05)',
                        borderColor: '#667eea',
                        color: '#667eea',
                    }
                }}
            >
                <GridView />
            </IconButton>
            <IconButton
                onClick={() => onToggle('list')}
                sx={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    color: viewMode === 'list' ? '#667eea' : '#64748b',
                    background: viewMode === 'list' ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                    '&:hover': {
                        background: 'rgba(102, 126, 234, 0.05)',
                        borderColor: '#667eea',
                        color: '#667eea',
                    }
                }}
            >
                <ViewList />
            </IconButton>
        </>
    );
};

export default ViewToggle;
