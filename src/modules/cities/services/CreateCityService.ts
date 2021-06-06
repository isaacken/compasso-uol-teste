import { inject, injectable } from 'tsyringe';
import ICitiesRepository from '../repositories/ICitiesRepository';
import City from '../entities/City';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {
    this.citiesRepository = citiesRepository;
  }

  public async execute({ name, state }: City): Promise<City> {
    const cities = await this.citiesRepository.find({ name, state });

    if (!name || !state) throw new AppError('City name and state are required', 400);
    if (cities.length > 0) throw new AppError('City already exists', 409);

    let city: City = await this.citiesRepository.create({ name, state });

    return city;
  }
}