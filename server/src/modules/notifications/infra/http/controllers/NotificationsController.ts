import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListNotificationsService from '@modules/notifications/services/ListUserNotificationsService';
import MarkNotificationAsReadService from '@modules/notifications/services/MarkNotificationAsReadService';

export default class NotificationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listNotifications = container.resolve(ListNotificationsService);

    const notifications = await listNotifications.execute({
      user_id,
    });

    return response.json(notifications);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const markAsRead = container.resolve(MarkNotificationAsReadService);

    const notifications = await markAsRead.execute({
      notification_id: id,
      user_id,
    });

    return response.json(notifications);
  }
}
