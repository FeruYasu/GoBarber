import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
  NotificationHeader,
} from './styles';

interface Notification {
  id: string;
  content: string;
  read: boolean;
  created_at: string;
  timeDistance: Date;
}

interface NotificationsProps {
  socket: SocketIOClient.Socket;
}

const Notifications: React.FC<NotificationsProps> = ({ socket }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on('newnotification', async () => {
      const response = await api.get('notifications');

      const data = response.data.map((notification: Notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.created_at),
          new Date(),
          { addSuffix: true, locale: pt },
        ),
      }));
      data.reverse();

      setNotifications(data);
    });
  }, [socket]);

  const hasUnread = useMemo(
    () =>
      !!notifications.find(
        (notification: Notification) => notification.read === false,
      ),
    [notifications],
  );

  useEffect(() => {
    async function loadNotifications(): Promise<void> {
      const response = await api.get('notifications');

      const data = response.data.map((notification: Notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.created_at),
          new Date(),
          { addSuffix: true, locale: pt },
        ),
      }));

      data.reverse();

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  const handleToggleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleMarkAsRead = useCallback(
    async (id: string) => {
      await api.put(`notifications/${id}`);

      setNotifications(
        notifications.map((notification: Notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    },
    [notifications],
  );

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#fff" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <NotificationHeader>
          <h4>Notificações</h4>
        </NotificationHeader>
        <Scroll>
          {notifications.map((notification) => (
            <Notification key={notification.id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
};

export default Notifications;
