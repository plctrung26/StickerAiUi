import React from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
} from '@mui/material';
import { useAuthStore } from '../../../store/authStore';
import { Save } from '@mui/icons-material';

interface PersonalInfoTabProps {
    editMode: boolean;
    formData: {
        fullName: string;
        email: string;
    };
    setFormData: (data: { fullName: string; email: string }) => void;
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

    return (
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
                        onClick={onSave}
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
    );
};

export default PersonalInfoTab;
