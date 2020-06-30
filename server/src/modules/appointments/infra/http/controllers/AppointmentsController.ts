import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    const { io, connectedUsers } = request;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    const ownerSocket = connectedUsers[provider_id];

    if (ownerSocket === connectedUsers[provider_id]) {
      io.to(ownerSocket).emit('newappointment', date);
      io.to(ownerSocket).emit('newnotification');
    }

    return response.json(appointment);
  }
}
