import 'reflect-metadata';
import '@shared/container';
import CreateCityService from '@modules/cities/services/CreateCityService';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import AppError from '@shared/errors/AppError';
import mongoose from 'mongoose';

describe('Create city', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to create a city', async () => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const createCityService = new CreateCityService(fakeCitiesRepository);

    const city = await createCityService.execute({ name: "Ouro Fino", state: "MG" });

    expect(city).toHaveProperty('_id');
    expect(city.name).toBe("Ouro Fino");
    expect(city.state).toBe("MG");
    expect(fakeCitiesRepository.cities.length === 1);
  });

  it('should not be able to create a duplicate city', async () => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const createCityService = new CreateCityService(fakeCitiesRepository);

    await createCityService.execute({ name: "Ouro Fino", state: "MG" });

    let exception;
    try {
      await createCityService.execute({ name: "Ouro Fino", state: "MG" });
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(AppError);
    expect(exception.statusCode).toBe(409);
  });
});