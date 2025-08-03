import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import { BaseButton } from '../../../../components/patterns';

interface LoginButtonProps {
    onClick: () => void;
    text?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
    onClick,
    text = 'Đăng nhập'
}) => {
    return (
        <BaseButton
            text={text}
            onClick={onClick}
            variant="outlined"
            colorScheme="neutral"
            startIcon={<AccountCircle />}
        />
    );
};

export default LoginButton;
