import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';

describe('Update customer', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to update a customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository;
    const updateCustomerService = new UpdateCustomerService(fakeCustomersRepository);

    const customerId = uuid();
    fakeCustomersRepository.customers.push({ _id: customerId, name: 'Isaac' });

    await updateCustomerService.execute({ _id: customerId, name: 'Joe' });

    const customer = (await fakeCustomersRepository.find({ _id: customerId, name: '' }))[0];

    expect(customer.name).toBe('Joe');
  });
});