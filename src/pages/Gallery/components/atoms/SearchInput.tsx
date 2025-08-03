import React from 'react';
import { Search } from '@mui/icons-material';
import { BaseInput } from '../../../../components/patterns';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = 'Tìm kiếm sticker...'
}) => {
    return (
        <BaseInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            variant="filled"
            startIcon={<Search sx={{ color: '#94a3b8' }} />}
        />
    );
};

export default SearchInput;