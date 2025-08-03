import React from 'react';
import { Search } from '@mui/icons-material';
import { BaseIconButton } from '../../../../components/patterns';

interface SearchButtonProps {
    onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
    return (
        <BaseIconButton
            icon={<Search />}
            onClick={onClick}
        />
    );
};

export default SearchButton;
