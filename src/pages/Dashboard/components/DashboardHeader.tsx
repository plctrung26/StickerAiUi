import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useAppStore } from '../../../store/appStore';
import AppLogo from './atoms/AppLogo';
import AppTitle from './atoms/AppTitle';
import NotificationBell from './atoms/NotificationBell';
import SettingsButton from './atoms/SettingsButton';
import UserAvatar from './atoms/UserAvatar';
import LogoutButton from './atoms/LogoutButton';
import NotificationModal from './modals/NotificationModal';
import SettingsModal from './modals/SettingsModal';

const DashboardHeader: React.FC = () => {
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();
    const {
        isNotificationModalOpen,
        isSettingsModalOpen,
        openNotificationModal,
        closeNotificationModal,
        openSettingsModal,
        closeSettingsModal
    } = useAppStore();

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

    const handleNotificationClick = () => {
        openNotificationModal();
    };

    const handleSettingsClick = () => {
        openSettingsModal();
    };

    return (
        <>
            <AppBar position="static" elevation={0} sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>
                <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <AppLogo />
                        <AppTitle title="Dashboard" />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NotificationBell
                            onClick={handleNotificationClick}
                        />
                        <SettingsButton onClick={handleSettingsClick} />
                        <UserAvatar
                            profilePictureUrl={user?.profile_picture_url}
                            onClick={() => navigate('/profile')}
                        />
                        <LogoutButton onClick={handleLogout} />
                    </Box>
                </Toolbar>
            </AppBar>

            <NotificationModal
                open={isNotificationModalOpen}
                onClose={closeNotificationModal}
            />
            <SettingsModal
                open={isSettingsModalOpen}
                onClose={closeSettingsModal}
            />
        </>
    );
};

export default DashboardHeader;
