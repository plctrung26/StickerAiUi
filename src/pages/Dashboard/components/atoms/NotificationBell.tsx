import React from 'react';
import { Badge } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import { BaseIconButton } from '../../../../components/patterns';
import { useAppStore } from '../../../../store/appStore';

interface NotificationBellProps {
    onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
    onClick
}) => {
    const { notifications } = useAppStore();
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <BaseIconButton
            icon={
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsNone />
                </Badge>
            }
            onClick={onClick}
        />
    );
};

export default NotificationBell;
