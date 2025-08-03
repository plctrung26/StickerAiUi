import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Chip,
} from '@mui/material';
import {
    Close,
    Report,
    Bookmark,
    Info,
    Edit,
    Delete,
    GetApp,
    Star,
    Category,
    ColorLens,
    AccessTime,
} from '@mui/icons-material';
import { useAppStore } from '../../../store/appStore';

const StickerMoreMenuModal: React.FC = () => {
    const {
        isMoreMenuOpen,
        moreMenuSticker,
        closeMoreMenu,
        toggleStickerBookmark,
        bookmarkedStickers,
        downloadSticker,
        reportSticker,
    } = useAppStore();

    if (!moreMenuSticker) return null;

    const isBookmarked = bookmarkedStickers.includes(moreMenuSticker.id);

    const menuActions = [
        {
            icon: <GetApp />,
            label: 'Tải xuống',
            color: '#667eea',
            action: () => downloadSticker(moreMenuSticker),
            description: 'Lưu sticker về máy',
        },
        {
            icon: isBookmarked ? <Star /> : <Bookmark />,
            label: isBookmarked ? 'Bỏ bookmark' : 'Bookmark',
            color: isBookmarked ? '#f59e0b' : '#10b981',
            action: () => toggleStickerBookmark(moreMenuSticker.id),
            description: isBookmarked ? 'Xóa khỏi bookmark' : 'Lưu vào bookmark',
        },
        {
            icon: <Edit />,
            label: 'Chỉnh sửa',
            color: '#8b5cf6',
            action: () => console.log('Edit sticker'),
            description: 'Chỉnh sửa sticker này',
            disabled: true, // Will be enabled when edit feature is implemented
        },
        {
            icon: <Report />,
            label: 'Báo cáo',
            color: '#ef4444',
            action: () => reportSticker(moreMenuSticker.id, 'inappropriate'),
            description: 'Báo cáo nội dung không phù hợp',
        },
    ];

    const adminActions = [
        {
            icon: <Delete />,
            label: 'Xóa sticker',
            color: '#ef4444',
            action: () => console.log('Delete sticker'),
            description: 'Xóa vĩnh viễn',
            disabled: true, // Only for admin users
        },
    ];

    const getStickerCategory = (sticker: any) => {
        // Mock category detection based on file name or metadata
        if (sticker.prompt?.toLowerCase().includes('emoji')) return 'Emoji';
        if (sticker.prompt?.toLowerCase().includes('animal')) return 'Animals';
        if (sticker.prompt?.toLowerCase().includes('food')) return 'Food';
        return 'General';
    };

    const getStickerColors = () => {
        // Mock color detection
        return ['#667eea', '#764ba2', '#f093fb'];
    };

    return (
        <Dialog
            open={isMoreMenuOpen}
            onClose={closeMoreMenu}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? '#161b22'
                        : '#ffffff',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                }
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                }
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Info sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                Chi tiết sticker
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Thông tin và hành động
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={closeMoreMenu} sx={{ color: 'text.secondary' }}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pb: 3 }}>
                {/* Sticker Preview */}
                <Box sx={{
                    display: 'flex',
                    gap: 3,
                    p: 3,
                    mb: 3,
                    borderRadius: '16px',
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(48, 54, 61, 0.3)'
                        : 'rgba(248, 250, 252, 0.8)',
                    border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(48, 54, 61, 0.3)'
                        : '1px solid rgba(0, 0, 0, 0.05)',
                }}>
                    <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                        backgroundSize: '10px 10px',
                        backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                    }}>
                        <img
                            src={moreMenuSticker.file_url}
                            alt="Sticker"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            Sticker #{moreMenuSticker.id}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Category sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Chip
                                label={getStickerCategory(moreMenuSticker)}
                                size="small"
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {new Date(moreMenuSticker.created_at).toLocaleDateString('vi-VN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ColorLens sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                {getStickerColors().map((color, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            borderRadius: '50%',
                                            background: color,
                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Actions */}
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                    Hành động
                </Typography>

                <List sx={{ p: 0 }}>
                    {menuActions.map((action, index) => (
                        <ListItem
                            key={index}
                            onClick={action.disabled ? undefined : action.action}
                            sx={{
                                borderRadius: '12px',
                                mb: 1,
                                cursor: action.disabled ? 'not-allowed' : 'pointer',
                                opacity: action.disabled ? 0.5 : 1,
                                '&:hover': action.disabled ? {} : {
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(48, 54, 61, 0.3)'
                                        : 'rgba(248, 250, 252, 0.8)',
                                    transform: 'translateX(4px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 48 }}>
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '10px',
                                    background: `${action.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {React.cloneElement(action.icon, {
                                        sx: { color: action.color, fontSize: 20 }
                                    })}
                                </Box>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {action.label}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.secondary">
                                        {action.description}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>

                {/* Prompt Information */}
                {moreMenuSticker.ai_prompt_used && (
                    <>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Prompt sử dụng
                        </Typography>
                        <Box sx={{
                            p: 2,
                            borderRadius: '12px',
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(48, 54, 61, 0.3)'
                                : 'rgba(248, 250, 252, 0.8)',
                            border: (theme) => theme.palette.mode === 'dark'
                                ? '1px solid rgba(48, 54, 61, 0.3)'
                                : '1px solid rgba(0, 0, 0, 0.05)',
                        }}>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                "{moreMenuSticker.ai_prompt_used}"
                            </Typography>
                        </Box>
                    </>
                )}

                {/* Admin Actions (Hidden for now) */}
                {false && ( // Will be shown for admin users
                    <>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'error.main' }}>
                            Quản trị viên
                        </Typography>
                        <List sx={{ p: 0 }}>
                            {adminActions.map((action, index) => (
                                <ListItem
                                    key={index}
                                    onClick={action.disabled ? undefined : action.action}
                                    sx={{
                                        borderRadius: '12px',
                                        mb: 1,
                                        cursor: action.disabled ? 'not-allowed' : 'pointer',
                                        opacity: action.disabled ? 0.5 : 1,
                                        '&:hover': action.disabled ? {} : {
                                            background: 'rgba(239, 68, 68, 0.05)',
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 48 }}>
                                        <Box sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '10px',
                                            background: `${action.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {React.cloneElement(action.icon, {
                                                sx: { color: action.color, fontSize: 20 }
                                            })}
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {action.label}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                {action.description}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default StickerMoreMenuModal;
