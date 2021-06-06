import 'reflect-metadata';
import '@shared/container';
import mongoose from 'mongoose';
import CitiesController from '@modules/cities/infra/http/controllers/CitiesController';
import { mockRequest } from 'jest-mock-req-res';
import httpMocks from 'node-mocks-http';
import CityModel from '@modules/cities/infra/mongodb/models/CityModel';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import CustomerModel from '@modules/customers/infra/mongodb/models/CustomerModel';

describe('Create customer', () => {
  beforeEach(async () => {
    await CityModel.deleteMany({
      name: 'Cidade Teste',
      state: 'NA'
    });

    await CityModel.create({
      name: 'Cidade Teste',
      state: 'NA'
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

  it('should be able to create a customer in the database', async () => {
    const customersController = new CustomersController;

    const req = mockRequest({
      body: {
        name: 'Cliente Teste',
        gender: 'M',
        birthDate: '1998-10-01',
        cityId: (await CityModel.findOne({ name: 'Cidade Teste' }))._id,
      }
    });

    const res = httpMocks.createResponse();

    await customersController.create(req, res);

    const result = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(201);
    expect(result).toHaveProperty('_id');
    expect(result.name).toBe('Cliente Teste');
    expect(result.gender).toBe('M');
    expect(result.birthDate).toContain('1998-10-01');
    expect(result.city).toHaveProperty('_id');
    expect(result.city).toHaveProperty('name');
    expect(result.city).toHaveProperty('state');
  });
});