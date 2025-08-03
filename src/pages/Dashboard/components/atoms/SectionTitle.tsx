import React from 'react';
import { BaseTypography } from '../../../../components/patterns';

interface SectionTitleProps {
    title: string;
    marginBottom?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    marginBottom = 3
}) => {
    return (
        <BaseTypography
            variant="h5"
            weight={700}
            marginBottom={marginBottom}
        >
            {title}
        </BaseTypography>
    );
};

export default SectionTitle;