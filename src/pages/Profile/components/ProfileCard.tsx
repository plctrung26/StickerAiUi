import React from 'react';
import {
    Paper,
    Box,
    Avatar,
    Typography,
    Chip,
    IconButton,
    Button,
    Card,
} from '@mui/material';
import { useAuthStore } from '../../../store/authStore';
import {
    PhotoCamera,
    Edit,
    Save,
    PhotoCamera as PhotoCameraIcon,
    BarChart,
    AccountCircle,
    Settings,
} from '@mui/icons-material';

interface ProfileCardProps {
    editMode: boolean;
    onEditToggle: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ editMode, onEditToggle }) => {
    const { user } = useAuthStore();

    const profileStats = [
        { label: 'Sticker đã tạo', value: '12', icon: <PhotoCameraIcon />, color: '#667eea' },
        { label: 'Lượt tải về', value: '89', icon: <BarChart />, color: '#f093fb' },
        { label: 'Lượt thích', value: '45', icon: <AccountCircle />, color: '#4facfe' },
        { label: 'Chia sẻ', value: '23', icon: <Settings />, color: '#fa709a' },
    ];

    return (
        <Paper sx={{
            p: 4,
            mb: 4,
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 3,
                mb: 3
            }}>
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        src={user?.profile_picture_url}
                        sx={{
                            width: { xs: 120, md: 150 },
                            height: { xs: 120, md: 150 },
                            border: '4px solid',
                            borderColor: 'primary.main',
                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        }}
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                            },
                            width: 40,
                            height: 40,
                        }}
                    >
                        <PhotoCamera sx={{ fontSize: 20 }} />
                    </IconButton>
                </Box>

                <Box sx={{
                    flexGrow: 1,
                    textAlign: { xs: 'center', md: 'left' },
                    minWidth: 0
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            mb: 1
                        }}
                    >
                        {user?.full_name || 'Người dùng'}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        {user?.email}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <Chip
                            label={`Thành viên từ ${new Date(user?.created_at || '').getFullYear()}`}
                            sx={{
                                background: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                                fontWeight: 600,
                            }}
                        />
                        <Chip
                            label={user?.is_active ? 'Đang hoạt động' : 'Không hoạt động'}
                            sx={{
                                background: user?.is_active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: user?.is_active ? '#22c55e' : '#ef4444',
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>

                <Button
                    variant={editMode ? "contained" : "outlined"}
                    startIcon={editMode ? <Save /> : <Edit />}
                    onClick={onEditToggle}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 3,
                        py: 1.5,
                        ...(editMode ? {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        } : {
                            borderColor: '#667eea',
                            color: '#667eea',
                        })
                    }}
                >
                    {editMode ? 'Lưu thay đổi' : 'Chỉnh sửa'}
                </Button>
            </Box>

            {/* Stats */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 2
            }}>
                {profileStats.map((stat, index) => (
                    <Card key={index} sx={{
                        borderRadius: '16px',
                        background: 'rgba(248, 250, 252, 0.8)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        textAlign: 'center',
                        p: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }
                    }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: `rgba(${stat.color === '#667eea' ? '102, 126, 234' : stat.color === '#f093fb' ? '240, 147, 251' : stat.color === '#4facfe' ? '79, 172, 254' : '250, 112, 154'}, 0.1)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1,
                        }}>
                            {React.cloneElement(stat.icon, { sx: { fontSize: 24, color: stat.color } })}
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: stat.color, mb: 0.5 }}>
                            {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                            {stat.label}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Paper>
    );
};

export default ProfileCard;
