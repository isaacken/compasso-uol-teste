import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import mongoose from 'mongoose';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import { v4 as uuid } from 'uuid';

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
});