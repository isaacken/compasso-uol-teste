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

  it('should be able to retrieve a customer from database by id', async () => {
    const customerController = new CustomersController;

    const customerToFind = (await CustomerModel.find({
      name: 'Cliente Teste'
    }))[0];

    const req = mockRequest({
      query: {
        _id: customerToFind._id,
      }
    });

    const res = httpMocks.createResponse();

    await customerController.find(req, res);

    const result = JSON.parse(res._getData());

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe('Cliente Teste');
    expect(result[0].birthDate).toContain('1998-10-01');
    expect(result[0].gender).toBe('M');
  });

  it('should be able to retrieve a customer from database by name', async () => {
    const customerController = new CustomersController;

    const req = mockRequest({
      query: {
        name: 'cliente teste',
      }
    });

    const res = httpMocks.createResponse();

    await customerController.find(req, res);

    const result = JSON.parse(res._getData());

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe('Cliente Teste');
    expect(result[0].birthDate).toContain('1998-10-01');
    expect(result[0].gender).toBe('M');
  });

  it('should calculate the age properly', async () => {
    const customerController = new CustomersController;

    const req = mockRequest({
      query: {
        name: 'cliente teste',
      }
    });

    const res = httpMocks.createResponse();

    await customerController.find(req, res);

    const result = JSON.parse(res._getData());

    const age = Math.floor(((new Date).getTime() - (new Date('1998-10-01')).getTime()) / (24 * 60 * 60 * 1000 * 365));

    expect(result[0].age).toBe(age);
  });
});