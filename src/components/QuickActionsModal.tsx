import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    Card,
    CardActionArea,
    CardContent,
    IconButton,
    Fade,
} from '@mui/material';
import {
    Close,
    AddCircle,
    PhotoLibrary,
    Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

interface QuickActionsModalProps {
    open: boolean;
    onClose: () => void;
}

const QuickActionsModal: React.FC<QuickActionsModalProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { homeQuickActions } = useAppStore();

    const handleActionClick = (action: any) => {
        switch (action.action) {
            case 'navigate-create':
                navigate('/create');
                break;
            case 'navigate-gallery':
                navigate('/gallery');
                break;
            case 'navigate-profile':
                navigate('/profile');
                break;
            default:
                break;
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    background: (theme) => theme.palette.mode === 'dark'
                        ? '#161b22'
                        : 'white',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                        : '0 20px 60px rgba(0, 0, 0, 0.15)',
                }
            }}
        >
            <DialogTitle sx={{
                pb: 1,
                color: 'text.primary',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: (theme) => theme.palette.mode === 'dark'
                    ? '1px solid #30363d'
                    : '1px solid #f1f5f9'
            }}>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700 }}>
                    Quick Actions
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(177, 186, 196, 0.12)'
                                : '#f8fafc'
                        }
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3, pb: 3 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    {homeQuickActions.map((action, index) => {
                        // Map the icon names to actual Material-UI components
                        const getIcon = (iconName: string) => {
                            switch (iconName) {
                                case 'add_circle':
                                    return <AddCircle />;
                                case 'photo_library':
                                    return <PhotoLibrary />;
                                case 'person':
                                    return <Person />;
                                default:
                                    return <AddCircle />;
                            }
                        };

                        return (
                            <Fade in timeout={300 + index * 100} key={action.id}>
                                <Card
                                    sx={{
                                        background: (theme) => theme.palette.mode === 'dark'
                                            ? '#21262d'
                                            : 'white',
                                        border: (theme) => theme.palette.mode === 'dark'
                                            ? '1px solid #30363d'
                                            : '1px solid #e2e8f0',
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: (theme) => theme.palette.mode === 'dark'
                                                ? '0 12px 40px rgba(0, 0, 0, 0.3)'
                                                : '0 12px 40px rgba(0, 0, 0, 0.1)',
                                            borderColor: action.color,
                                        },
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() => handleActionClick(action)}
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                backgroundColor: action.bgColor,
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mr: 3,
                                                border: `2px solid ${action.color}20`,
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        >
                                            {React.cloneElement(getIcon(action.icon), {
                                                sx: {
                                                    fontSize: 28,
                                                    color: action.color,
                                                }
                                            })}
                                        </Box>
                                        <CardContent sx={{ flex: 1, p: 0, '&:last-child': { pb: 0 } }}>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    color: 'text.primary',
                                                    fontWeight: 700,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {action.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {action.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Fade>
                        );
                    })}
                </Box>

                <Box mt={3} textAlign="center">
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                        }}
                    >
                        Click any action to get started quickly!
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default QuickActionsModal;
