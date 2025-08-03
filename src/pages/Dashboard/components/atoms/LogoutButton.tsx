import React from 'react';
import { Logout } from '@mui/icons-material';
import { BaseButton } from '../../../../components/patterns';

interface LogoutButtonProps {
    onClick: () => void;
    text?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
    onClick,
    text = 'Đăng xuất'
}) => {
    return (
        <BaseButton
            text={text}
            onClick={onClick}
            variant="outlined"
            colorScheme="danger"
            startIcon={<Logout />}
            customSx={{ ml: 1 }}
        />
    );
};

export default LogoutButton;
