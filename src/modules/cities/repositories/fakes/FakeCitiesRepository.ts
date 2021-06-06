import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import City from "@modules/cities/entities/City";
import { v4 as uuid } from "uuid";

export default class FakeCitiesRepository implements ICitiesRepository {
  public cities: City[] = [];

  public async create({ name, state }: City): Promise<City> {
    const city: City = { name, state };

    city._id = uuid();

    this.cities.push(city);

    return city;
  }

  public async find({ _id, name, state }: City): Promise<City[]> {
    const foundCities = this.cities.filter((c) => {
      return (c.name === name || !name) && (c.state === state || !state) && (c._id === _id || !_id);
    });

    return foundCities;
  }
}