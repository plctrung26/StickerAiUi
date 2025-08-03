import React from 'react';
import {
    Box,
    Container,
    Typography,
} from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{
            py: 4,
            background: (theme) => theme.palette.mode === 'dark'
                ? '#161b22'
                : '#f8fafc',
            borderTop: (theme) => theme.palette.mode === 'dark'
                ? '1px solid #30363d'
                : '1px solid #e2e8f0'
        }}>
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary" align="center">
                    © 2024 StickerAI Pro. Được phát triển với ❤️ bởi đội ngũ AI Vietnam
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
