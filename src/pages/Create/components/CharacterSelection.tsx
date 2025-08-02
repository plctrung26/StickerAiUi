import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import {
    SmartToy,
    Psychology,
    Architecture,
    Language,
} from '@mui/icons-material';

interface Character {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

interface CharacterSelectionProps {
    selectedCharacter: string;
    onCharacterSelect: (characterId: string) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
    selectedCharacter,
    onCharacterSelect,
}) => {
    const characters: Character[] = [
        {
            id: 'cute-animal',
            name: 'Động vật dễ thương',
            description: 'Tạo sticker động vật ngộ nghĩnh',
            icon: <SmartToy />,
            color: '#667eea',
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            id: 'cartoon-person',
            name: 'Nhân vật hoạt hình',
            description: 'Tạo sticker nhân vật cartoon',
            icon: <Psychology />,
            color: '#f093fb',
            bgColor: 'rgba(240, 147, 251, 0.1)'
        },
        {
            id: 'architecture',
            name: 'Kiến trúc AWS',
            description: 'Tạo sơ đồ kiến trúc hệ thống',
            icon: <Architecture />,
            color: '#4facfe',
            bgColor: 'rgba(79, 172, 254, 0.1)'
        },
        {
            id: 'emoji',
            name: 'Emoji cảm xúc',
            description: 'Tạo emoji biểu cảm',
            icon: <Language />,
            color: '#fa709a',
            bgColor: 'rgba(250, 112, 154, 0.1)'
        },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                Chọn phong cách sticker
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: 3
            }}>
                {characters.map((character) => (
                    <Card
                        key={character.id}
                        sx={{
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: selectedCharacter === character.id ? '3px solid #667eea' : '1px solid rgba(0, 0, 0, 0.1)',
                            transform: selectedCharacter === character.id ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: selectedCharacter === character.id ? '0 12px 48px rgba(102, 126, 234, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
                            }
                        }}
                        onClick={() => onCharacterSelect(character.id)}
                    >
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '20px',
                                background: character.bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                                color: character.color,
                                fontSize: 40
                            }}>
                                {character.icon}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {character.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {character.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default CharacterSelection;
