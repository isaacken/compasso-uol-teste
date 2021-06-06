import { inject, injectable } from 'tsyringe';
import ICitiesRepository from '../repositories/ICitiesRepository';
import City from '../entities/City';

@injectable()
export default class FindCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {
    this.citiesRepository = citiesRepository;
  }

  public async execute({ _id, name, state }: City): Promise<City[]> {
    const foundCities = await this.citiesRepository.find({ _id, name, state });

    return foundCities;
  }
}