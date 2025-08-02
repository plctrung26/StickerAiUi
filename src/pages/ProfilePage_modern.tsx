import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    AppBar,
    Toolbar,
    Avatar,
    TextField,
    Card,
    CardContent,
    IconButton,
    Chip,
    Tab,
    Tabs,
    Badge,
    Alert,
    Switch,
    FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    ArrowBack,
    Delete,
    Save,
    Person,
    Logout,
    Edit,
    PhotoCamera,
    Notifications,
    Security,
    Palette,
    BarChart,
    Settings,
    NotificationsNone,
    AccountCircle,
} from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();
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

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleSave = () => {
        // TODO: Implement save profile
        setEditMode(false);
        alert('Thông tin đã được cập nhật!');
    };

    const profileStats = [
        { label: 'Sticker đã tạo', value: '12', icon: <PhotoCamera />, color: '#667eea' },
        { label: 'Lượt tải về', value: '89', icon: <BarChart />, color: '#f093fb' },
        { label: 'Lượt thích', value: '45', icon: <AccountCircle />, color: '#4facfe' },
        { label: 'Chia sẻ', value: '23', icon: <Settings />, color: '#fa709a' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            {/* Modern Header */}
            <AppBar position="static" elevation={0} sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>
                <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
                    <Button
                        color="inherit"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/dashboard')}
                        sx={{
                            mr: 3,
                            color: '#475569',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: '12px',
                            px: 2,
                            '&:hover': {
                                background: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                            }
                        }}
                    >
                        Dashboard
                    </Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2
                        }}>
                            <Person sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1.4rem', md: '1.6rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Hồ sơ cá nhân
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton sx={{ color: '#64748b' }}>
                            <Badge badgeContent={3} color="error">
                                <NotificationsNone />
                            </Badge>
                        </IconButton>
                        <IconButton sx={{ color: '#64748b' }}>
                            <Settings />
                        </IconButton>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Logout />}
                            onClick={handleLogout}
                            sx={{
                                ml: 1,
                                borderRadius: '12px',
                                textTransform: 'none',
                                borderColor: '#e2e8f0',
                                color: '#475569',
                                fontWeight: 600,
                                px: 2,
                                '&:hover': {
                                    borderColor: '#ef4444',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    color: '#ef4444',
                                }
                            }}
                        >
                            Đăng xuất
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
                {/* Profile Header */}
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
                            onClick={() => setEditMode(!editMode)}
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

                    {/* Personal Info Tab */}
                    <TabPanel value={currentTab} index={0}>
                        <Container maxWidth="md" sx={{ pb: 4 }}>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                                gap: 3
                            }}>
                                <TextField
                                    fullWidth
                                    label="Họ và tên"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    disabled={!editMode}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!editMode}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Facebook ID"
                                    value={user?.facebook_id || ''}
                                    disabled
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Ngày tạo tài khoản"
                                    value={user?.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : ''}
                                    disabled
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                        }
                                    }}
                                />
                            </Box>

                            {editMode && (
                                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={handleSave}
                                        sx={{
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            px: 4,
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </Box>
                            )}
                        </Container>
                    </TabPanel>

                    {/* Security Tab */}
                    <TabPanel value={currentTab} index={1}>
                        <Container maxWidth="md" sx={{ pb: 4 }}>
                            <Alert severity="info" sx={{ mb: 3, borderRadius: '12px' }}>
                                Tài khoản của bạn được bảo mật thông qua Facebook Login. Để thay đổi mật khẩu, vui lòng truy cập Facebook.
                            </Alert>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#ef4444' }}>
                                    Vùng nguy hiểm
                                </Typography>
                                <Card sx={{
                                    border: '2px solid #fee2e2',
                                    borderRadius: '16px',
                                    background: 'rgba(254, 226, 226, 0.3)'
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                            Xóa tài khoản
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Sau khi xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn và không thể khôi phục.
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<Delete />}
                                            onClick={handleDeleteAccount}
                                            sx={{
                                                borderRadius: '12px',
                                                textTransform: 'none',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Xóa tài khoản
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Container>
                    </TabPanel>

                    {/* Notifications Tab */}
                    <TabPanel value={currentTab} index={2}>
                        <Container maxWidth="md" sx={{ pb: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Thông báo email khi có sticker mới"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontWeight: 600
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Thông báo khi có cập nhật tính năng"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontWeight: 600
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Thông báo marketing"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontWeight: 600
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Thông báo bảo mật"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontWeight: 600
                                        }
                                    }}
                                />
                            </Box>
                        </Container>
                    </TabPanel>

                    {/* Theme Tab */}
                    <TabPanel value={currentTab} index={3}>
                        <Container maxWidth="md" sx={{ pb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                Tùy chọn giao diện
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Chế độ tối"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontWeight: 600
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Hiệu ứng chuyển động"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontWeight: 600
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Hiệu ứng mờ nền"
                                    sx={{
                                        '& .MuiFormControlLabel-label': {
                                            fontWeight: 600
                                        }
                                    }}
                                />
                            </Box>
                        </Container>
                    </TabPanel>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage;
