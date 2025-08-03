import React from 'react';
import {
    Container,
    Box,
    Paper,
    Tabs,
    Tab,
} from '@mui/material';
import ProfileCard from './components/ProfileCard';
import TabPanel from './components/TabPanel';
import PersonalInfoTab from './components/PersonalInfoTab';
import SecurityTab from './components/SecurityTab';
import NotificationsTab from './components/NotificationsTab';
import ThemeTab from './components/ThemeTab';
import { useAppStore } from '../../store/appStore';
import {
    Person,
    Security,
    Notifications,
    Palette,
} from '@mui/icons-material';

const ProfilePage: React.FC = () => {
    const {
        profileCurrentTab,
        profileEditMode,
        profileFormData,
        setProfileCurrentTab,
        setProfileEditMode,
        setProfileFormData,
    } = useAppStore();

    const handleDeleteAccount = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
            // TODO: Implement delete account
            alert('Chức năng xóa tài khoản sẽ được triển khai sau');
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setProfileCurrentTab(newValue);
    };

    const handleSave = () => {
        // TODO: Implement save profile
        setProfileEditMode(false);
        alert('Thông tin đã được cập nhật!');
    };

    const handleEditToggle = () => {
        if (profileEditMode) {
            handleSave();
        } else {
            setProfileEditMode(true);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)'
                : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
        }}>
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
                <ProfileCard editMode={profileEditMode} onEditToggle={handleEditToggle} />

                {/* Profile Tabs */}
                <Paper sx={{
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
                    overflow: 'hidden'
                }}>
                    <Tabs
                        value={profileCurrentTab}
                        onChange={handleTabChange}
                        sx={{
                            px: 3,
                            pt: 2,
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                borderRadius: '12px',
                                mx: 0.5,
                                minHeight: 48,
                            },
                            '& .Mui-selected': {
                                background: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea !important',
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            }
                        }}
                    >
                        <Tab icon={<Person />} label="Thông tin cá nhân" />
                        <Tab icon={<Security />} label="Bảo mật" />
                        <Tab icon={<Notifications />} label="Thông báo" />
                        <Tab icon={<Palette />} label="Giao diện" />
                    </Tabs>

                    <TabPanel value={profileCurrentTab} index={0}>
                        <PersonalInfoTab
                            editMode={profileEditMode}
                            formData={profileFormData}
                            setFormData={setProfileFormData}
                            onSave={handleSave}
                            setEditMode={setProfileEditMode}
                        />
                    </TabPanel>

                    <TabPanel value={profileCurrentTab} index={1}>
                        <SecurityTab onDeleteAccount={handleDeleteAccount} />
                    </TabPanel>

                    <TabPanel value={profileCurrentTab} index={2}>
                        <NotificationsTab />
                    </TabPanel>

                    <TabPanel value={profileCurrentTab} index={3}>
                        <ThemeTab />
                    </TabPanel>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;
