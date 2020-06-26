import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserThemeService from '@modules/users/services/UpdateUserThemeService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserThemeService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
    });

    return response.json(classToClass(user));
  }
}
