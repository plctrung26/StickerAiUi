import React, { useState } from 'react';
import {
    Paper,
    Box,
    Avatar,
    Typography,
    Chip,
    IconButton,
    Button,
    Card,
    Tooltip,
    Fade,
} from '@mui/material';
import { useAuthStore } from '../../../store/authStore';
import {
    PhotoCamera,
    Edit,
    Save,
    PhotoCamera as PhotoCameraIcon,
    BarChart,
    Settings,
    StarRate,
} from '@mui/icons-material';
import ImageUploadModal from './ImageUploadModal';

interface ProfileCardProps {
    editMode: boolean;
    onEditToggle: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ editMode, onEditToggle }) => {
    const { user } = useAuthStore();
    const [hoveredStat, setHoveredStat] = useState<number | null>(null);
    const [imageUploadOpen, setImageUploadOpen] = useState(false);
    const [profileImage, setProfileImage] = useState<string | undefined>(user?.profile_picture_url);

    const profileStats = [
        { label: 'Sticker đã tạo', value: '12', icon: <PhotoCameraIcon />, color: '#667eea', description: 'Tổng số sticker bạn đã tạo' },
        { label: 'Lượt tải về', value: '89', icon: <BarChart />, color: '#f093fb', description: 'Số lượt người khác tải sticker của bạn' },
        { label: 'Lượt thích', value: '45', icon: <StarRate />, color: '#4facfe', description: 'Số lượt thích từ cộng đồng' },
        { label: 'Chia sẻ', value: '23', icon: <Settings />, color: '#fa709a', description: 'Số lần sticker được chia sẻ' },
    ];

    const handleImageUpdate = (imageFile: File) => {
        // Create a local URL for the uploaded image
        const imageUrl = URL.createObjectURL(imageFile);
        setProfileImage(imageUrl);

        // TODO: Upload to server
        console.log('Uploading image:', imageFile);

        // Here you would typically upload to your server
        // const formData = new FormData();
        // formData.append('profile_image', imageFile);
        // api.uploadProfileImage(formData);
    };

    const handleCameraClick = () => {
        setImageUploadOpen(true);
    };

    return (
        <Paper sx={{
            p: 4,
            mb: 4,
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
                        src={profileImage}
                        sx={{
                            width: { xs: 120, md: 150 },
                            height: { xs: 120, md: 150 },
                            border: '4px solid',
                            borderColor: 'primary.main',
                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        }}
                    />
                    <IconButton
                        onClick={handleCameraClick}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                                transform: 'scale(1.05)', // Reduced scale to minimize layout impact
                            },
                            width: 40,
                            height: 40,
                            transition: 'all 0.2s ease',
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
                gap: 2,
                p: 1 // Add padding to accommodate scale effects
            }}>
                {profileStats.map((stat, index) => (
                    <Fade in timeout={300 + index * 100} key={index}>
                        <Tooltip
                            title={stat.description}
                            arrow
                            placement="top"
                        >
                            <Card
                                sx={{
                                    borderRadius: '16px',
                                    background: hoveredStat === index
                                        ? `linear-gradient(135deg, ${stat.color}10, ${stat.color}20)`
                                        : (theme) => theme.palette.mode === 'dark'
                                            ? 'rgba(22, 27, 34, 0.8)'
                                            : 'rgba(248, 250, 252, 0.8)',
                                    border: hoveredStat === index
                                        ? `2px solid ${stat.color}40`
                                        : (theme) => theme.palette.mode === 'dark'
                                            ? '1px solid rgba(48, 54, 61, 0.3)'
                                            : '1px solid rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center',
                                    p: 2,
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    mb: 1, // Add margin to prevent layout shift
                                    '&:hover': {
                                        transform: 'translateY(-4px) scale(1.05)',
                                        boxShadow: `0 12px 40px ${stat.color}30`,
                                        mb: '8px', // Compensate for translateY movement
                                    },
                                    '&::before': hoveredStat === index ? {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '3px',
                                        background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                                    } : {}
                                }}
                                onMouseEnter={() => setHoveredStat(index)}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '12px',
                                    background: `rgba(${stat.color === '#667eea' ? '102, 126, 234' :
                                        stat.color === '#f093fb' ? '240, 147, 251' :
                                            stat.color === '#4facfe' ? '79, 172, 254' :
                                                '250, 112, 154'
                                        }, ${hoveredStat === index ? '0.2' : '0.1'})`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 1,
                                    transition: 'all 0.3s ease',
                                    transform: hoveredStat === index ? 'scale(1.05) rotate(3deg)' : 'scale(1)', // Reduced scale and rotation
                                }}>
                                    {React.cloneElement(stat.icon, {
                                        sx: {
                                            fontSize: 24,
                                            color: stat.color,
                                            transition: 'all 0.3s ease'
                                        }
                                    })}
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 800,
                                        color: stat.color,
                                        mb: 0.5,
                                        transform: hoveredStat === index ? 'scale(1.05)' : 'scale(1)', // Reduced scale
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.8rem',
                                        opacity: hoveredStat === index ? 0.9 : 0.7,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Card>
                        </Tooltip>
                    </Fade>
                ))}
            </Box>

            {/* Image Upload Modal */}
            <ImageUploadModal
                open={imageUploadOpen}
                onClose={() => setImageUploadOpen(false)}
                onImageUpdate={handleImageUpdate}
            />
        </Paper>
    );
};

export default ProfileCard;
