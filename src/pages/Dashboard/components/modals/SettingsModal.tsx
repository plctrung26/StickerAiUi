import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Switch,
    Typography,
    IconButton,
    Box,
    Divider,
    Button,
} from '@mui/material';
import {
    Close,
    Notifications,
    Security,
    Palette,
    Email,
    Save,
} from '@mui/icons-material';
import { useAppStore } from '../../../../store/appStore';

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
    const { userSettings, updateUserSettings } = useAppStore();

    const handleSettingChange = (setting: keyof typeof userSettings) => {
        updateUserSettings({
            [setting]: setting === 'theme' ?
                (userSettings.theme === 'light' ? 'dark' : 'light') :
                !userSettings[setting]
        });
    };

    const handleSave = () => {
        // TODO: Implement settings save to backend
        console.log('Saving settings:', userSettings);
        onClose();
    };

    const settingsItems = [
        {
            key: 'notifications' as keyof typeof userSettings,
            icon: <Notifications />,
            title: 'Thông báo trình duyệt',
            description: 'Nhận thông báo khi có cập nhật mới',
        },
        {
            key: 'emailUpdates' as keyof typeof userSettings,
            icon: <Email />,
            title: 'Thông báo email',
            description: 'Gửi thông báo quan trọng qua email',
        },
        {
            key: 'theme' as keyof typeof userSettings,
            icon: <Palette />,
            title: 'Chế độ tối',
            description: 'Sử dụng giao diện tối để bảo vệ mắt',
        },
        {
            key: 'autoSave' as keyof typeof userSettings,
            icon: <Save />,
            title: 'Tự động lưu',
            description: 'Tự động lưu tiến trình làm việc',
        },
        {
            key: 'publicProfile' as keyof typeof userSettings,
            icon: <Security />,
            title: 'Hồ sơ công khai',
            description: 'Cho phép người khác xem hồ sơ của bạn',
        },
        {
            key: 'dataSharing' as keyof typeof userSettings,
            icon: <Security />,
            title: 'Chia sẻ dữ liệu',
            description: 'Chia sẻ dữ liệu để cải thiện dịch vụ',
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    maxHeight: '80vh',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? '#161b22'
                        : '#ffffff',
                }
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1
            }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Cài đặt
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <List>
                    {settingsItems.map((item, index) => (
                        <React.Fragment key={item.key}>
                            <ListItem
                                sx={{
                                    px: 3,
                                    py: 2,
                                }}
                            >
                                <ListItemIcon sx={{ color: '#667eea', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {item.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    }
                                />
                                <Switch
                                    checked={
                                        item.key === 'theme' ?
                                            userSettings.theme === 'dark' :
                                            Boolean(userSettings[item.key])
                                    }
                                    onChange={() => handleSettingChange(item.key)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#667eea',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#667eea',
                                        },
                                    }}
                                />
                            </ListItem>
                            {index < settingsItems.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
                <Box sx={{ p: 3, pt: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                            }
                        }}
                    >
                        Lưu cài đặt
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
