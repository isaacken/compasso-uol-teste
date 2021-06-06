import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import RemoveCustomerService from '@modules/customers/services/RemoveCustomerService';

describe('Remove customer', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to remove a customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository;
    const removeCustomerService = new RemoveCustomerService(fakeCustomersRepository);

    const customerId = uuid();
    fakeCustomersRepository.customers.push({ _id: customerId, name: 'Isaac' });

    await removeCustomerService.execute({ _id: customerId });

    expect(fakeCustomersRepository.customers).toHaveLength(0);
  });
});