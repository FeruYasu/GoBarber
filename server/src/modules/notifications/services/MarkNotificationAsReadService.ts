import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

interface IRequest {
  notification_id: string;
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    notification_id,
    user_id,
  }: IRequest): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.markAsReadById(
      notification_id,
      user_id,
    );

    await this.cacheProvider.invalidate(`notifications-list:${user_id}`);

    return notifications;
  }
}

export default ListProvidersService;
