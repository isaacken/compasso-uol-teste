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
      city: (await CityModel.find({
        name: 'Cidade Teste',
        state: 'NA'
      }))[0]
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

    const customerToRemove = (await CustomerModel.find({
      name: 'Cliente Teste'
    }))[0];

    const req = mockRequest({
      params: {
        _id: customerToRemove._id,
      }
    });

    const res = httpMocks.createResponse();

    await customerController.remove(req, res);

    expect(res._getStatusCode()).toBe(204);
  });
});