import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import mongoose from 'mongoose';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import { v4 as uuid } from 'uuid';
import AppError from '@shared/errors/AppError';

describe('Create customer', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository;
    const fakeCitiesRepository = new FakeCitiesRepository;
    const createCustomerService = new CreateCustomerService(fakeCustomersRepository, fakeCitiesRepository);

    const cityId = uuid();
    fakeCitiesRepository.cities.push({ _id: cityId, name: 'Ouro Fino', state: 'MG' });

    const customer = await createCustomerService.execute({ name: 'Isaac', gender: 'M', birthDate: '1998-10-01', cityId });

    expect(customer).toHaveProperty('_id');
    expect(customer.name).toBe('Isaac');
    expect(customer.gender).toBe('M');
  });

  it('should not allow to create a new customer without a name', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository;
    const fakeCitiesRepository = new FakeCitiesRepository;
    const createCustomerService = new CreateCustomerService(fakeCustomersRepository, fakeCitiesRepository);

    const cityId = uuid();
    fakeCitiesRepository.cities.push({ _id: cityId, name: 'Ouro Fino', state: 'MG' });

    let exception;
    try {
      await createCustomerService.execute({ name: '', gender: 'M', birthDate: '1998-10-01', cityId });
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(AppError);
    expect(exception.statusCode).toBe(400);
  });

  it('should not allow to create a new customer if the city is invalid', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository;
    const fakeCitiesRepository = new FakeCitiesRepository;
    const createCustomerService = new CreateCustomerService(fakeCustomersRepository, fakeCitiesRepository);

    const cityId = uuid();
    fakeCitiesRepository.cities.push({ _id: cityId, name: 'Ouro Fino', state: 'MG' });

    let exception;
    try {
      let a = await createCustomerService.execute({ name: 'Isaac Kennedy', gender: 'M', birthDate: '1998-10-01', cityId: 'teste123' });
      console.log(a);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(AppError);
    expect(exception.statusCode).toBe(404);
  });
});