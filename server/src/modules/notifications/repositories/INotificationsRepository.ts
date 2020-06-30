import ICreationNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreationNotificationDTO): Promise<Notification>;
  findFromUser(user_id: string): Promise<Notification[]>;
  markAsReadById(id: string, user_id: string): Promise<Notification[]>;
}
