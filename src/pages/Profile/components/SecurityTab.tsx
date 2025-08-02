import React from 'react';
import {
    Container,
    Alert,
    Box,
    Typography,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface SecurityTabProps {
    onDeleteAccount: () => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ onDeleteAccount }) => {
    return (
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
                            onClick={onDeleteAccount}
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
    );
};

export default SecurityTab;
