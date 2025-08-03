import React from 'react';
import { Avatar } from '@mui/material';

interface UserAvatarProps {
    profilePictureUrl?: string;
    onClick?: () => void;
    size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    profilePictureUrl,
    onClick,
    size = 40
}) => {
    return (
        <Avatar
            src={profilePictureUrl}
            sx={{
                width: size,
                height: size,
                border: '2px solid',
                borderColor: 'primary.main',
                cursor: onClick ? 'pointer' : 'default'
            }}
            onClick={onClick}
        />
    );
};

export default UserAvatar;
