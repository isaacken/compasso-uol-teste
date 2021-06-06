import 'reflect-metadata';
import '@shared/container';
import CreateCityService from '@modules/cities/services/CreateCityService';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import FindCityService from '@modules/cities/services/FindCityService';
import City from '@modules/cities/entities/City';
import mongoose from 'mongoose';

describe('Find city', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to find a city by name', async () => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const createCityService = new CreateCityService(fakeCitiesRepository);
    const findCityService = new FindCityService(fakeCitiesRepository);

    await createCityService.execute({ name: 'Ouro Fino', state: 'MG' });

    const city = new City;
    city.name = 'Ouro Fino';
    const foundCity = (await findCityService.execute(city))[0];

    expect(foundCity).toHaveProperty('_id');
    expect(foundCity.name).toBe('Ouro Fino');
    expect(foundCity.state).toBe('MG');
  });

  it('should be able to find a city by state', async () => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const createCityService = new CreateCityService(fakeCitiesRepository);
    const findCityService = new FindCityService(fakeCitiesRepository);

    await createCityService.execute({ name: 'Poços de Caldas', state: 'MG' });

    const city = new City;
    city.state = 'MG';
    const foundCity = (await findCityService.execute(city))[0];

    expect(foundCity).toHaveProperty('_id');
    expect(foundCity.state).toBe('MG');
  });

  it('should be able to find a city by name and state', async () => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const createCityService = new CreateCityService(fakeCitiesRepository);
    const findCityService = new FindCityService(fakeCitiesRepository);

    await createCityService.execute({ name: 'Pouso Alegre', state: 'MG' });
    await createCityService.execute({ name: 'Pouso Alegre', state: 'SP' });

    const city = new City;
    city.name = 'Pouso Alegre';
    city.state = 'MG';
    const foundCity = (await findCityService.execute(city))[0];

    expect(foundCity).toHaveProperty('_id');
    expect(foundCity.state).toBe('MG');
  });
});