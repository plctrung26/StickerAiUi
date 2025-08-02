import React from 'react';
import {
    Container,
    Box,
    FormControlLabel,
    Switch,
} from '@mui/material';

const NotificationsTab: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Thông báo email khi có sticker mới"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontWeight: 600
                        }
                    }}
                />
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Thông báo khi có cập nhật tính năng"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontWeight: 600
                        }
                    }}
                />
                <FormControlLabel
                    control={<Switch />}
                    label="Thông báo marketing"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontWeight: 600
                        }
                    }}
                />
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Thông báo bảo mật"
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

export default NotificationsTab;
