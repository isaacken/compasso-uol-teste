import '@shared/infra/mongodb/database';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import City from '@modules/cities/entities/City';
import CityModel from '../models/CityModel';

interface IQueryParams {
  _id?: string;
  name?: string | RegExp;
  state?: string;
}

export default class CitiesRepository implements ICitiesRepository {
  public async create({ name, state }: City): Promise<City> {
    const city: City = { name, state };

    const insertCity = new CityModel(city);
    await insertCity.save();

    return insertCity as City;
  }

  public async find({ _id, name, state }: City): Promise<City[]> {
    let params: IQueryParams = {};
    if (name) params.name = new RegExp(name, 'i');
    if (state) params.state = state;
    if (_id) params._id = _id;

    const foundCities = await CityModel.find(params);

    return foundCities;
  }
}