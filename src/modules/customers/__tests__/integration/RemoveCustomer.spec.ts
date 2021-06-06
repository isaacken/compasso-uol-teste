import 'reflect-metadata';
import '@shared/container';
import mongoose from 'mongoose';
import { mockRequest } from 'jest-mock-req-res';
import httpMocks from 'node-mocks-http';
import CityModel from '@modules/cities/infra/mongodb/models/CityModel';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import CustomerModel from '@modules/customers/infra/mongodb/models/CustomerModel';

describe('Remove customer', () => {
  beforeEach(async () => {
    await CityModel.deleteMany({
      name: 'Cidade Teste',
      state: 'NA'
    });

    await CustomerModel.deleteMany({
      name: 'Cliente Teste'
    });

    await CityModel.create({
      name: 'Cidade Teste',
      state: 'NA'
    });

    await CustomerModel.create({
      name: 'Cliente Teste',
      birthDate: new Date('1998-10-01'),
      gender: 'M',
      city: await CityModel.findOne({
        name: 'Cidade Teste',
        state: 'NA'
      })
    });
  });

  afterAll(async () => {
    await CityModel.deleteMany({
      name: 'Cidade Teste',
      state: 'NA'
    });

    await CustomerModel.deleteMany({
      name: 'Cliente Teste'
    });

    await mongoose.connection.close();
  });

  it('should be able to remove a customer', async () => {
    const customerController = new CustomersController;

    const customerToRemove = await CustomerModel.findOne({
      name: 'Cliente Teste'
    });

    const req = mockRequest({
      params: {
        _id: customerToRemove._id,
      }
    });

    const res = httpMocks.createResponse();

    await customerController.remove(req, res);

    const checkCustomer = await CustomerModel.find({ name: 'Cliente Teste' });

    expect(res._getStatusCode()).toBe(204);
    expect(checkCustomer).toHaveLength(0);
  });
});