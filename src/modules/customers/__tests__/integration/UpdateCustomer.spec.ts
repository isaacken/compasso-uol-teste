import 'reflect-metadata';
import '@shared/container';
import mongoose from 'mongoose';
import { mockRequest } from 'jest-mock-req-res';
import httpMocks from 'node-mocks-http';
import CityModel from '@modules/cities/infra/mongodb/models/CityModel';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import CustomerModel from '@modules/customers/infra/mongodb/models/CustomerModel';

describe('Update customer', () => {
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

    await CustomerModel.deleteMany({
      name: 'Cliente Teste 2'
    });

    await mongoose.connection.close();
  });

  it('should be able to update a customer', async () => {
    const customerController = new CustomersController;

    const customerToUpdate = await CustomerModel.findOne({
      name: 'Cliente Teste'
    });

    const req = mockRequest({
      params: {
        _id: customerToUpdate._id,
      },
      body: {
        name: 'Cliente Teste 2'
      }
    });

    const res = httpMocks.createResponse();

    await customerController.update(req, res);

    const customer = await CustomerModel.findOne({ _id: customerToUpdate._id });

    expect(res._getStatusCode()).toBe(204);
    expect(customer.name).toBe('Cliente Teste 2');
  });
});