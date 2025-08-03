import React from 'react';
import BrandName from '../../../../components/atoms/BrandName';

interface AppTitleProps {
    title: string;
}

const AppTitle: React.FC<AppTitleProps> = ({ title }) => {
    return <BrandName name={title} />;
};

export default AppTitle;
