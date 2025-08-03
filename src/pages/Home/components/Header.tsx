import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Stack,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../../../components/atoms/BrandLogo';
import BrandName from '../../../components/atoms/BrandName';
import SearchButton from './atoms/SearchButton';
import NotificationBell from '../../Dashboard/components/atoms/NotificationBell';
import LoginButton from './atoms/LoginButton';
import CreateButton from './atoms/CreateButton';
import SearchModal from '../../../components/SearchModal';
import QuickActionsModal from '../../../components/QuickActionsModal';
import NotificationModal from '../../Dashboard/components/modals/NotificationModal';
import { useAppStore } from '../../../store/appStore';
import { useTheme } from '../../../contexts/ThemeContext';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [quickActionsOpen, setQuickActionsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useTheme();
    const {
        homeSearchModalOpen,
        openHomeSearchModal,
        closeHomeSearchModal,
        isNotificationModalOpen,
        openNotificationModal,
        closeNotificationModal
    } = useAppStore();

    const handleBrandClick = () => {
        setQuickActionsOpen(true);
    };

    return (
        <AppBar position="static" elevation={0} sx={{
            background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(13, 17, 23, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: (theme) => theme.palette.mode === 'dark'
                ? '1px solid #30363d'
                : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 1px 3px rgba(0, 0, 0, 0.3)'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
            <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        cursor: 'pointer',
                        borderRadius: 2,
                        p: 1,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(177, 186, 196, 0.12)'
                                : 'rgba(0, 0, 0, 0.05)',
                            transform: 'scale(1.02)',
                        }
                    }}
                    onClick={handleBrandClick}
                >
                    <BrandLogo />
                    <BrandName name="StickerAI Pro" />
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                    <SearchButton onClick={openHomeSearchModal} />
                    <NotificationBell onClick={openNotificationModal} />
                    <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                        <IconButton
                            onClick={toggleDarkMode}
                            sx={{
                                color: 'text.primary',
                                borderRadius: 2,
                                p: 1.5,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(177, 186, 196, 0.12)'
                                        : 'rgba(0, 0, 0, 0.05)',
                                    transform: 'scale(1.05)',
                                }
                            }}
                        >
                            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>
                    <LoginButton onClick={() => navigate('/login')} />
                    <CreateButton onClick={() => navigate('/create')} />
                </Stack>
            </Toolbar>

            {/* Search Modal */}
            <SearchModal
                open={homeSearchModalOpen}
                onClose={closeHomeSearchModal}
            />

            {/* Quick Actions Modal */}
            <QuickActionsModal
                open={quickActionsOpen}
                onClose={() => setQuickActionsOpen(false)}
            />

            {/* Notification Modal */}
            <NotificationModal
                open={isNotificationModalOpen}
                onClose={closeNotificationModal}
            />
        </AppBar>
    );
};

export default Header;
