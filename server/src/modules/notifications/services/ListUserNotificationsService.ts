import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import { classToClass } from 'class-transformer';

interface IRequest {
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

  public async execute({ user_id }: IRequest): Promise<Notification[]> {
    let notifications = await this.cacheProvider.recover<Notification[]>(
      `notifications-list:${user_id}`,
    );

    if (!notifications) {
      notifications = await this.notificationsRepository.findFromUser(user_id);

      await this.cacheProvider.save(
        `notifications-list:${user_id}`,
        classToClass(notifications),
      );
    }

    return notifications;
  }
}

export default ListProvidersService;
