import City from '@modules/cities/entities/City';
import CreateCityService from '@modules/cities/services/CreateCityService';
import FindCityService from '@modules/cities/services/FindCityService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CitiesController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      let { name, state } = req.body;

      const createCityService = container.resolve(CreateCityService);
      const city = await createCityService.execute({ name, state });

      return res.status(201).json(city);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  public async find(req: Request, res: Response): Promise<Response> {
    try {
      let { name, state } = req.query as unknown as City;

      const findCityService = container.resolve(FindCityService);
      const cities = await findCityService.execute({ name, state });

      return res.status(200).json(cities);
    } catch (error) {
      return res.status(error.statusCode || 500).json({})
    }
  }
}