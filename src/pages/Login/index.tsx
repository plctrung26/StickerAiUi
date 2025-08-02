import React, { useState } from 'react';
import {
    Container,
    Paper,
    Box,
    Alert,
} from '@mui/material';
import LoginHeader from './components/LoginHeader';
import FacebookLogin from './components/FacebookLogin';
import LoginFooter from './components/LoginFooter';

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

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
                    <LoginHeader />

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

                    <FacebookLogin onError={setError} />
                    <LoginFooter />
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
