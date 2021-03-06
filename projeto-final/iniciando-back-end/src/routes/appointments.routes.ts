import {Router} from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const {provider, date} = request.body();

    const parserDate = parseISO(date);

    const createAppoiment = new CreateAppointmentService();

    const appoiment = await createAppoiment.execute({
      date: parserDate,
      provider,
    });

    return response.json(appoiment);
  } catch (err) {
    return response.status(404).json({ error: err.message });
  }
});

export default appointmentsRouter;
