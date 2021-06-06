import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import FindCustomerService from '@modules/customers/services/FindCustomerService';

describe('Find customer', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to find a customer by name', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository;
    const findCustomerService = new FindCustomerService(fakeCustomersRepository);

    const customerId = uuid();
    fakeCustomersRepository.customers.push({ _id: customerId, name: 'Isaac' });

    const customer = (await findCustomerService.execute({ name: 'Isaac' }))[0];

    expect(customer).toHaveProperty('_id');
    expect(customer.name).toBe('Isaac');
  });

  it('should be able to find a customer by id', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository;
    const findCustomerService = new FindCustomerService(fakeCustomersRepository);

    const customerId = uuid();
    fakeCustomersRepository.customers.push({ _id: customerId, name: 'Isaac' });

    const customer = (await findCustomerService.execute({ _id: customerId, name: '' }))[0];

    expect(customer).toHaveProperty('_id');
    expect(customer.name).toBe('Isaac');
  });
});