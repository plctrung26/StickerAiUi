import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    IconButton,
    Box,
    Chip,
    Divider,
} from '@mui/material';
import {
    Close,
    AutoAwesome,
    CheckCircle,
    Info,
    Warning,
} from '@mui/icons-material';
import { useAppStore } from '../../../../store/appStore';

interface NotificationModalProps {
    open: boolean;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose }) => {
    const { notifications, markNotificationAsRead } = useAppStore();

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle sx={{ color: '#10b981' }} />;
            case 'info':
                return <Info sx={{ color: '#3b82f6' }} />;
            case 'warning':
                return <Warning sx={{ color: '#f59e0b' }} />;
            case 'error':
                return <Warning sx={{ color: '#ef4444' }} />;
            default:
                return <AutoAwesome sx={{ color: '#667eea' }} />;
        }
    };

    const handleNotificationClick = (notification: typeof notifications[0]) => {
        if (!notification.isRead) {
            markNotificationAsRead(notification.id);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    maxHeight: '70vh',
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
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Thông báo
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {notifications.filter(n => !n.isRead).length} thông báo chưa đọc
                    </Typography>
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <List>
                    {notifications.map((notification, index) => (
                        <React.Fragment key={notification.id}>
                            <ListItem
                                onClick={() => handleNotificationClick(notification)}
                                sx={{
                                    px: 3,
                                    py: 2,
                                    cursor: 'pointer',
                                    backgroundColor: !notification.isRead ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                    }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{
                                        bgcolor: 'transparent',
                                        border: '2px solid #e2e8f0',
                                    }}>
                                        {getNotificationIcon(notification.type)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {notification.title}
                                            </Typography>
                                            {!notification.isRead && (
                                                <Chip
                                                    label="Mới"
                                                    size="small"
                                                    sx={{
                                                        height: 20,
                                                        fontSize: '0.7rem',
                                                        backgroundColor: '#667eea',
                                                        color: 'white'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    }
                                    secondary={
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                {notification.message}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {notification.time}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < notifications.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default NotificationModal;
