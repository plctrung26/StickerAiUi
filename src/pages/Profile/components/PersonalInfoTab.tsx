import React from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Chip,
    InputAdornment,
} from '@mui/material';
import { useAuthStore } from '../../../store/authStore';
import {
    Save,
    Person,
    Email,
    Info,
    LocationOn,
    Language,
    Phone,
    Cake,
    Work,
    Facebook,
    CalendarToday
} from '@mui/icons-material';

interface PersonalInfoTabProps {
    editMode: boolean;
    formData: {
        fullName: string;
        email: string;
        bio: string;
        location: string;
        website: string;
        phoneNumber: string;
        dateOfBirth: string;
        occupation: string;
    };
    setFormData: (data: PersonalInfoTabProps['formData']) => void;
    onSave: () => void;
    setEditMode: (mode: boolean) => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
    editMode,
    formData,
    setFormData,
    onSave,
    setEditMode,
}) => {
    const { user } = useAuthStore();

    const handleFieldChange = (field: keyof PersonalInfoTabProps['formData'], value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Container maxWidth="md" sx={{ pb: 4 }}>
            {/* Basic Information Section */}
            <Card sx={{
                borderRadius: '20px',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(22, 27, 34, 0.8)'
                    : 'rgba(248, 250, 252, 0.8)',
                border: (theme) => theme.palette.mode === 'dark'
                    ? '1px solid rgba(48, 54, 61, 0.3)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                mb: 3,
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Person sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                Thông tin cơ bản
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cập nhật thông tin cá nhân của bạn
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 3
                    }}>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            value={formData.fullName}
                            onChange={(e) => handleFieldChange('fullName', e.target.value)}
                            disabled={!editMode}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.5)'
                                        : 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            disabled={!editMode}
                            type="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.5)'
                                        : 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            value={formData.phoneNumber}
                            onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                            disabled={!editMode}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.5)'
                                        : 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Ngày sinh"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                            disabled={!editMode}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Cake sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.5)'
                                        : 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        label="Giới thiệu bản thân"
                        value={formData.bio}
                        onChange={(e) => handleFieldChange('bio', e.target.value)}
                        disabled={!editMode}
                        multiline
                        rows={3}
                        placeholder="Viết vài dòng về bản thân bạn..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                                    <Info sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(22, 27, 34, 0.5)'
                                    : 'rgba(255, 255, 255, 0.8)',
                            }
                        }}
                    />
                </CardContent>
            </Card>

            {/* Professional Information Section */}
            <Card sx={{
                borderRadius: '20px',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(22, 27, 34, 0.8)'
                    : 'rgba(248, 250, 252, 0.8)',
                border: (theme) => theme.palette.mode === 'dark'
                    ? '1px solid rgba(48, 54, 61, 0.3)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                mb: 3,
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Work sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                Thông tin nghề nghiệp
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Thông tin về công việc và địa chỉ
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 3
                    }}>
                        <TextField
                            fullWidth
                            label="Nghề nghiệp"
                            value={formData.occupation}
                            onChange={(e) => handleFieldChange('occupation', e.target.value)}
                            disabled={!editMode}
                            placeholder="VD: Nhà thiết kế, Lập trình viên..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Work sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.5)'
                                        : 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Địa chỉ"
                            value={formData.location}
                            onChange={(e) => handleFieldChange('location', e.target.value)}
                            disabled={!editMode}
                            placeholder="VD: Hà Nội, Việt Nam"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOn sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.5)'
                                        : 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        label="Website cá nhân"
                        value={formData.website}
                        onChange={(e) => handleFieldChange('website', e.target.value)}
                        disabled={!editMode}
                        placeholder="https://yourwebsite.com"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Language sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(22, 27, 34, 0.5)'
                                    : 'rgba(255, 255, 255, 0.8)',
                            }
                        }}
                    />
                </CardContent>
            </Card>

            {/* Account Information Section */}
            <Card sx={{
                borderRadius: '20px',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(22, 27, 34, 0.8)'
                    : 'rgba(248, 250, 252, 0.8)',
                border: (theme) => theme.palette.mode === 'dark'
                    ? '1px solid rgba(48, 54, 61, 0.3)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                mb: 3,
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CalendarToday sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                Thông tin tài khoản
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Thông tin hệ thống và liên kết
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 3
                    }}>
                        <TextField
                            fullWidth
                            label="Facebook ID"
                            value={user?.facebook_id || 'Chưa liên kết'}
                            disabled
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Facebook sx={{ color: '#1877F2' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.3)'
                                        : 'rgba(248, 250, 252, 0.5)',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Ngày tạo tài khoản"
                            value={user?.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : ''}
                            disabled
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarToday sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(22, 27, 34, 0.3)'
                                        : 'rgba(248, 250, 252, 0.5)',
                                }
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="body2" color="text.secondary">
                            Trạng thái tài khoản:
                        </Typography>
                        <Chip
                            label={user?.is_active ? 'Đang hoạt động' : 'Không hoạt động'}
                            size="small"
                            sx={{
                                background: user?.is_active
                                    ? 'rgba(34, 197, 94, 0.1)'
                                    : 'rgba(239, 68, 68, 0.1)',
                                color: user?.is_active ? '#22c55e' : '#ef4444',
                                fontWeight: 600,
                                border: 'none'
                            }}
                        />
                        <Chip
                            label={`Thành viên từ ${new Date(user?.created_at || '').getFullYear()}`}
                            size="small"
                            sx={{
                                background: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                                fontWeight: 600,
                                border: 'none'
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            {editMode && (
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    pt: 2
                }}>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={onSave}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                            mb: 0.5, // Add margin to prevent layout shift
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                                mb: '6px', // Compensate for translateY movement
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Lưu thay đổi
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setEditMode(false)}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderColor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(139, 148, 158, 0.3)'
                                : 'rgba(0, 0, 0, 0.2)',
                            color: 'text.primary',
                            mb: 0.5, // Add margin to prevent layout shift
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                borderColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(139, 148, 158, 0.5)'
                                    : 'rgba(0, 0, 0, 0.3)',
                                mb: '6px', // Compensate for translateY movement
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Hủy bỏ
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default PersonalInfoTab;
