import React from 'react';
import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginFooter: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    lineHeight: 1.6,
                    mb: 2,
                }}
            >
                Bằng cách đăng nhập, bạn đồng ý với{' '}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Điều khoản sử dụng
                </Box>{' '}
                và{' '}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Chính sách bảo mật
                </Box>{' '}
                của chúng tôi.
            </Typography>

            <Button
                variant="text"
                startIcon={<ArrowBack />}
                onClick={() => navigate('/')}
                sx={{
                    color: 'text.secondary',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    '&:hover': {
                        background: 'rgba(102, 126, 234, 0.05)',
                        color: 'primary.main',
                    }
                }}
            >
                Quay lại trang chủ
            </Button>
        </Box>
    );
};

export default LoginFooter;
