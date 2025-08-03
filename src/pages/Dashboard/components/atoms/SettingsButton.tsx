import React from 'react';
import { Settings } from '@mui/icons-material';
import { BaseIconButton } from '../../../../components/patterns';

interface SettingsButtonProps {
    onClick?: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
    return (
        <BaseIconButton
            icon={<Settings />}
            onClick={onClick}
        />
    );
};

export default SettingsButton;
