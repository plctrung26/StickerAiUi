import React from 'react';
import { Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BaseTypography, BaseButton } from '../../../components/patterns';

const LoginFooter: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center' }}>
            <BaseTypography
                variant="body2"
                color="text.secondary"
                customSx={{
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
            </BaseTypography>

            <BaseButton
                text="Quay lại trang chủ"
                onClick={() => navigate('/')}
                variant="text"
                colorScheme="neutral"
                startIcon={<ArrowBack />}
                customSx={{
                    fontSize: { xs: '0.9rem', md: '1rem' },
                }}
            />
        </Box>
    );
};

export default LoginFooter;
