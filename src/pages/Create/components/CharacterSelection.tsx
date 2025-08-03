import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Fade,
    Tooltip,
    Chip,
} from '@mui/material';
import {
    SmartToy,
    Psychology,
    Architecture,
    Language,
    CheckCircle,
} from '@mui/icons-material';

interface Character {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    examples: string[];
    difficulty: string;
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
            bgColor: 'rgba(102, 126, 234, 0.1)',
            examples: ['Mèo con đáng yêu', 'Chó cún vui vẻ', 'Thỏ nhảy múa'],
            difficulty: 'Dễ'
        },
        {
            id: 'cartoon-person',
            name: 'Nhân vật hoạt hình',
            description: 'Tạo sticker nhân vật cartoon',
            icon: <Psychology />,
            color: '#f093fb',
            bgColor: 'rgba(240, 147, 251, 0.1)',
            examples: ['Chibi kawaii', 'Anime character', 'Mascot dễ thương'],
            difficulty: 'Trung bình'
        },
        {
            id: 'architecture',
            name: 'Kiến trúc AWS',
            description: 'Tạo sơ đồ kiến trúc hệ thống',
            icon: <Architecture />,
            color: '#4facfe',
            bgColor: 'rgba(79, 172, 254, 0.1)',
            examples: ['Serverless architecture', 'Microservices', 'CI/CD pipeline'],
            difficulty: 'Nâng cao'
        },
        {
            id: 'emoji',
            name: 'Emoji cảm xúc',
            description: 'Tạo emoji biểu cảm',
            icon: <Language />,
            color: '#fa709a',
            bgColor: 'rgba(250, 112, 154, 0.1)',
            examples: ['Mặt cười', 'Tim yêu', 'Ngón tay cái'],
            difficulty: 'Dễ'
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
                gap: 3,
                p: 1 // Add padding to accommodate scale effects
            }}>
                {characters.map((character, index) => (
                    <Fade in timeout={300 + index * 100} key={character.id}>
                        <Tooltip
                            title={
                                <Box>
                                    <Typography variant="body2" fontWeight={600} mb={1}>
                                        Ví dụ: {character.examples.join(', ')}
                                    </Typography>
                                    <Typography variant="caption">
                                        Độ khó: {character.difficulty}
                                    </Typography>
                                </Box>
                            }
                            arrow
                            placement="top"
                        >
                            <Card
                                sx={{
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: selectedCharacter === character.id ? '3px solid #667eea' : '1px solid rgba(0, 0, 0, 0.1)',
                                    transform: selectedCharacter === character.id ? 'scale(1.08)' : 'scale(1)',
                                    boxShadow: selectedCharacter === character.id ? '0 16px 64px rgba(102, 126, 234, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
                                    position: 'relative',
                                    overflow: 'visible',
                                    '&:hover': {
                                        transform: selectedCharacter === character.id ? 'scale(1.1)' : 'scale(1.05)',
                                        boxShadow: '0 20px 80px rgba(0, 0, 0, 0.2)',
                                        '& .character-icon': {
                                            transform: 'rotate(10deg) scale(1.1)',
                                        }
                                    }
                                }}
                                onClick={() => onCharacterSelect(character.id)}
                            >
                                {selectedCharacter === character.id && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -8,
                                            right: -8,
                                            backgroundColor: '#667eea',
                                            borderRadius: '50%',
                                            width: 32,
                                            height: 32,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.5)',
                                            zIndex: 10,
                                        }}
                                    >
                                        <CheckCircle sx={{ color: 'white', fontSize: 20 }} />
                                    </Box>
                                )}

                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Box
                                        className="character-icon"
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '20px',
                                            background: selectedCharacter === character.id
                                                ? `linear-gradient(135deg, ${character.color}20, ${character.color}40)`
                                                : character.bgColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2,
                                            color: character.color,
                                            fontSize: 40,
                                            transition: 'all 0.3s ease',
                                            border: selectedCharacter === character.id ? `2px solid ${character.color}` : 'none',
                                        }}
                                    >
                                        {character.icon}
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1,
                                            color: selectedCharacter === character.id ? character.color : 'inherit'
                                        }}
                                    >
                                        {character.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {character.description}
                                    </Typography>

                                    <Chip
                                        label={character.difficulty}
                                        size="small"
                                        sx={{
                                            backgroundColor: character.bgColor,
                                            color: character.color,
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Fade>
                ))}
            </Box>
        </Box>
    );
};

export default CharacterSelection;
