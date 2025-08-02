import React from 'react';
import {
    Container,
    Typography,
    Box,
    FormControlLabel,
    Switch,
} from '@mui/material';

const ThemeTab: React.FC = () => {
    return (
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
    );
};

export default ThemeTab;
