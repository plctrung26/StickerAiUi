import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Alert,
    CircularProgress,
} from '@mui/material';
import { Facebook, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services';

// Declare global FB type
declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { setAuth, setLoading } = useAuthStore();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFacebookLogin = async () => {
        setIsLoading(true);
        setError(null);
        setLoading(true);

        try {
            // Load Facebook SDK
            if (!window.FB) {
                await loadFacebookSDK();
            }

            // Get Facebook login status
            window.FB.login(async (response: any) => {
                if (response.authResponse) {
                    try {
                        const { user, token } = await authService.loginWithFacebook(
                            response.authResponse.accessToken
                        );

                        setAuth(user, token);
                        navigate('/dashboard');
                    } catch (error: any) {
                        console.error('Login error:', error);
                        setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
                    }
                } else {
                    setError('Đăng nhập Facebook bị hủy.');
                }
                setIsLoading(false);
                setLoading(false);
            }, { scope: 'email,public_profile' });

        } catch (error: any) {
            console.error('Facebook SDK error:', error);
            setError('Không thể kết nối với Facebook. Vui lòng thử lại.');
            setIsLoading(false);
            setLoading(false);
        }
    };

    const loadFacebookSDK = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            // Facebook SDK configuration
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: import.meta.env.VITE_FACEBOOK_APP_ID || 'your-facebook-app-id',
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0'
                });
                resolve();
            };

            // Load the SDK
            const script = document.createElement('script');
            script.id = 'facebook-jssdk';
            script.src = 'https://connect.facebook.net/vi_VN/sdk.js';
            script.async = true;
            script.defer = true;
            script.crossOrigin = 'anonymous';

            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Không thể tải Facebook SDK'));

            document.head.appendChild(script);
        });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                width: '100%',
                background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
                alignItems: 'center',
                py: { xs: 3, md: 0 },
                px: { xs: 2, sm: 3 },
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, sm: 5, md: 6 },
                        borderRadius: '24px',
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Box sx={{ mb: { xs: 4, md: 5 } }}>
                        <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
                        }}>
                            <Typography variant="h3" sx={{ fontSize: '2.5rem' }}>
                                🎭
                            </Typography>
                        </Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Chào mừng trở lại!
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                fontWeight: 400,
                                lineHeight: 1.6,
                            }}
                        >
                            Đăng nhập để tiếp tục tạo những sticker tuyệt vời với AI
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 4,
                                borderRadius: '12px',
                                border: '1px solid rgba(244, 67, 54, 0.2)',
                                background: 'rgba(244, 67, 54, 0.05)',
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ mb: { xs: 4, md: 5 } }}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Facebook />}
                            onClick={handleFacebookLogin}
                            disabled={isLoading}
                            sx={{
                                py: { xs: 2, md: 2.5 },
                                fontSize: { xs: '1.1rem', md: '1.2rem' },
                                fontWeight: 700,
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #1877F2 0%, #0C63D4 100%)',
                                boxShadow: '0 8px 32px rgba(24, 119, 242, 0.3)',
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #0C63D4 0%, #084CB8 100%)',
                                    boxShadow: '0 12px 40px rgba(24, 119, 242, 0.4)',
                                    transform: 'translateY(-2px)',
                                },
                                '&:disabled': {
                                    background: 'rgba(24, 119, 242, 0.5)',
                                    boxShadow: 'none',
                                    transform: 'none',
                                },
                            }}
                        >
                            {isLoading ? 'Đang đăng nhập...' : 'Tiếp tục với Facebook'}
                        </Button>
                    </Box>

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
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
