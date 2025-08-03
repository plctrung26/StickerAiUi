import React from 'react';
import { FilterList } from '@mui/icons-material';
import { BaseIconButton } from '../../../../components/patterns';

interface FilterButtonProps {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
    return (
        <BaseIconButton
            icon={<FilterList />}
            onClick={() => onClick({} as React.MouseEvent<HTMLElement>)}
            variant="bordered"
        />
    );
};

export default FilterButton;
