import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
} from '@mui/material';

interface Emotion {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
}

interface EmotionSelectionProps {
    selectedEmotion: string;
    onEmotionSelect: (emotionId: string) => void;
}

const EmotionSelection: React.FC<EmotionSelectionProps> = ({
    selectedEmotion,
    onEmotionSelect,
}) => {
    const emotions: Emotion[] = [
        { id: 'happy', name: 'Vui vẻ', description: '😊', icon: '😊', color: '#10b981' },
        { id: 'sad', name: 'Buồn', description: '😢', icon: '😢', color: '#3b82f6' },
        { id: 'angry', name: 'Tức giận', description: '😠', icon: '😠', color: '#ef4444' },
        { id: 'surprised', name: 'Ngạc nhiên', description: '😮', icon: '😮', color: '#f59e0b' },
        { id: 'love', name: 'Yêu thương', description: '🥰', icon: '🥰', color: '#ec4899' },
        { id: 'thinking', name: 'Suy nghĩ', description: '🤔', icon: '🤔', color: '#8b5cf6' },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                Chọn cảm xúc cho sticker
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
                gap: 2
            }}>
                {emotions.map((emotion) => (
                    <Card
                        key={emotion.id}
                        sx={{
                            borderRadius: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: selectedEmotion === emotion.id ? `3px solid ${emotion.color}` : '1px solid rgba(0, 0, 0, 0.1)',
                            transform: selectedEmotion === emotion.id ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: selectedEmotion === emotion.id ? `0 8px 32px ${emotion.color}40` : '0 4px 20px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                            }
                        }}
                        onClick={() => onEmotionSelect(emotion.id)}
                    >
                        <CardContent sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                {emotion.icon}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {emotion.name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default EmotionSelection;
