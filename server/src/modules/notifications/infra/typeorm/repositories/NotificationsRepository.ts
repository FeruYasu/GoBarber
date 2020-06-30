import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }

  public async findFromUser(user_id: string): Promise<Notification[]> {
    const notifications = this.ormRepository.find({
      where: { recipient_id: user_id },
    });

    return notifications;
  }

  public async markAsReadById(
    id: string,
    user_id: string,
  ): Promise<Notification[]> {
    const updateNotification = await this.ormRepository.findOne(id);

    if (updateNotification) {
      updateNotification.read = true;

      await this.ormRepository.update(id, updateNotification);
    }

    const notifications = await this.ormRepository.find({
      where: { recipient_id: user_id },
    });

    return notifications;
  }
}

export default NotificationRepository;
