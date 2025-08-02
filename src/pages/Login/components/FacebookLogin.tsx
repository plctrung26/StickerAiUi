import React, { useState } from 'react';
import {
    Button,
    CircularProgress,
    Box,
} from '@mui/material';
import { Facebook } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { authService } from '../../../services';

// Declare global FB type
declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

interface FacebookLoginProps {
    onError: (error: string) => void;
}

const FacebookLogin: React.FC<FacebookLoginProps> = ({ onError }) => {
    const navigate = useNavigate();
    const { setAuth, setLoading } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleFacebookLogin = async () => {
        setIsLoading(true);
        onError('');
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
                        onError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
                    }
                } else {
                    onError('Đăng nhập Facebook bị hủy.');
                }
                setIsLoading(false);
                setLoading(false);
            }, { scope: 'email,public_profile' });

        } catch (error: any) {
            console.error('Facebook SDK error:', error);
            onError('Không thể kết nối với Facebook. Vui lòng thử lại.');
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
    );
};

export default FacebookLogin;
