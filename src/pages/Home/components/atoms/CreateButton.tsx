import React from 'react';
import { BaseButton } from '../../../../components/patterns';

interface CreateButtonProps {
    onClick: () => void;
    text?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({
    onClick,
    text = 'Tạo ngay'
}) => {
    return (
        <BaseButton
            text={text}
            onClick={onClick}
            variant="contained"
            colorScheme="primary"
            customSx={{ px: 3 }}
        />
    );
};

export default CreateButton;