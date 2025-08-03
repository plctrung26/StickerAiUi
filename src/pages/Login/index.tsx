import React from 'react';
import {
    Container,
    Paper,
    Box,
    Alert,
} from '@mui/material';
import { useAppStore } from '../../store/appStore';
import LoginHeader from './components/LoginHeader';
import FacebookLogin from './components/FacebookLogin';
import LoginFooter from './components/LoginFooter';

const LoginPage: React.FC = () => {
    const { loginError, setLoginError } = useAppStore();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                width: '100%',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)'
                    : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
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
                        background: (theme) => theme.palette.mode === 'dark'
                            ? 'rgba(22, 27, 34, 0.9)'
                            : 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: (theme) => theme.palette.mode === 'dark'
                            ? '1px solid rgba(48, 54, 61, 0.5)'
                            : '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                            : '0 20px 60px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <LoginHeader />

                    {loginError && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 4,
                                borderRadius: '12px',
                                border: '1px solid rgba(244, 67, 54, 0.2)',
                                background: 'rgba(244, 67, 54, 0.05)',
                            }}
                        >
                            {loginError}
                        </Alert>
                    )}

                    <FacebookLogin onError={setLoginError} />
                    <LoginFooter />
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
