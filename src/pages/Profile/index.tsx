import React, { useState } from 'react';
import {
    Container,
    Box,
    Paper,
    Tabs,
    Tab,
} from '@mui/material';
import ProfileHeader from './components/ProfileHeader';
import ProfileCard from './components/ProfileCard';
import TabPanel from './components/TabPanel';
import PersonalInfoTab from './components/PersonalInfoTab';
import SecurityTab from './components/SecurityTab';
import NotificationsTab from './components/NotificationsTab';
import ThemeTab from './components/ThemeTab';
import { useAuthStore } from '../../store/authStore';
import {
    Person,
    Security,
    Notifications,
    Palette,
} from '@mui/icons-material';

const ProfilePage: React.FC = () => {
    const { user } = useAuthStore();
    const [currentTab, setCurrentTab] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.full_name || '',
        email: user?.email || '',
    });

    const handleDeleteAccount = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
            // TODO: Implement delete account
            alert('Chức năng xóa tài khoản sẽ được triển khai sau');
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleSave = () => {
        // TODO: Implement save profile
        setEditMode(false);
        alert('Thông tin đã được cập nhật!');
    };

    const handleEditToggle = () => {
        if (editMode) {
            handleSave();
        } else {
            setEditMode(true);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            <ProfileHeader />

            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
                <ProfileCard editMode={editMode} onEditToggle={handleEditToggle} />

                {/* Profile Tabs */}
                <Paper sx={{
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden'
                }}>
                    <Tabs
                        value={currentTab}
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

                    <TabPanel value={currentTab} index={0}>
                        <PersonalInfoTab
                            editMode={editMode}
                            formData={formData}
                            setFormData={setFormData}
                            onSave={handleSave}
                            setEditMode={setEditMode}
                        />
                    </TabPanel>

                    <TabPanel value={currentTab} index={1}>
                        <SecurityTab onDeleteAccount={handleDeleteAccount} />
                    </TabPanel>

                    <TabPanel value={currentTab} index={2}>
                        <NotificationsTab />
                    </TabPanel>

                    <TabPanel value={currentTab} index={3}>
                        <ThemeTab />
                    </TabPanel>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;
