import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    IconButton,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Divider,
    Alert,
} from '@mui/material';
import {
    Close,
    Facebook,
    Twitter,
    Telegram,
    ContentCopy,
    Link,
    QrCode,
} from '@mui/icons-material';
import { useAppStore } from '../../../store/appStore';

const StickerShareModal: React.FC = () => {
    const {
        isShareModalOpen,
        sharedSticker,
        closeShareModal,
        shareSticker,
    } = useAppStore();

    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    if (!sharedSticker) return null;

    const shareUrl = `${window.location.origin}/gallery/${sharedSticker.id}`;

    const handlePlatformShare = (platform: string) => {
        shareSticker(sharedSticker, platform);
        if (platform === 'copy') {
            setCopied(true);
        }
    };

    const shareOptions = [
        {
            platform: 'facebook',
            label: 'Facebook',
            icon: <Facebook />,
            color: '#1877F2',
            bgColor: 'rgba(24, 119, 242, 0.1)',
        },
        {
            platform: 'twitter',
            label: 'Twitter',
            icon: <Twitter />,
            color: '#1DA1F2',
            bgColor: 'rgba(29, 161, 242, 0.1)',
        },
        {
            platform: 'telegram',
            label: 'Telegram',
            icon: <Telegram />,
            color: '#0088CC',
            bgColor: 'rgba(0, 136, 204, 0.1)',
        },
    ];

    return (
        <Dialog
            open={isShareModalOpen}
            onClose={closeShareModal}
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
                            <Link sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                Chia sẻ sticker
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Chia sẻ sticker này với bạn bè
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={closeShareModal} sx={{ color: 'text.secondary' }}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pb: 3 }}>
                {/* Sticker Preview */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
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
                        width: 60,
                        height: 60,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                        backgroundSize: '10px 10px',
                        backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                    }}>
                        <img
                            src={sharedSticker.file_url}
                            alt="Sticker"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Sticker ID: {sharedSticker.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Được tạo vào {new Date(sharedSticker.created_at).toLocaleDateString('vi-VN')}
                        </Typography>
                    </Box>
                </Box>

                {/* Share Platforms */}
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                    Chia sẻ qua mạng xã hội
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
                    {shareOptions.map((option) => (
                        <Button
                            key={option.platform}
                            variant="outlined"
                            onClick={() => handlePlatformShare(option.platform)}
                            sx={{
                                borderRadius: '16px',
                                p: 2,
                                flexDirection: 'column',
                                gap: 1,
                                borderColor: option.color,
                                color: option.color,
                                background: option.bgColor,
                                '&:hover': {
                                    background: option.bgColor,
                                    borderColor: option.color,
                                    transform: 'translateY(-2px)',
                                }
                            }}
                        >
                            {option.icon}
                            <Typography variant="caption" sx={{ textTransform: 'none', fontWeight: 600 }}>
                                {option.label}
                            </Typography>
                        </Button>
                    ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Copy Link */}
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                    Sao chép liên kết
                </Typography>

                {copied && (
                    <Alert severity="success" sx={{ mb: 2, borderRadius: '12px' }}>
                        Đã sao chép liên kết vào clipboard!
                    </Alert>
                )}

                <TextField
                    fullWidth
                    value={shareUrl}
                    InputProps={{
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Link sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handlePlatformShare('copy')}
                                    sx={{
                                        color: copied ? '#10b981' : 'text.secondary',
                                        '&:hover': {
                                            color: '#10b981',
                                            transform: 'scale(1.1)',
                                        }
                                    }}
                                >
                                    <ContentCopy />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(22, 27, 34, 0.5)'
                                : 'rgba(248, 250, 252, 0.8)',
                        }
                    }}
                />

                {/* QR Code Option */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Button
                        variant="text"
                        startIcon={<QrCode />}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            color: 'text.secondary',
                            '&:hover': {
                                background: 'rgba(102, 126, 234, 0.05)',
                                color: '#667eea',
                            }
                        }}
                    >
                        Tạo mã QR (Sắp có)
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default StickerShareModal;
