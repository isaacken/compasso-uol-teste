import 'reflect-metadata';
import '@shared/container';
import mongoose from 'mongoose';
import CitiesController from '@modules/cities/infra/http/controllers/CitiesController';
import { mockRequest } from 'jest-mock-req-res';
import httpMocks from 'node-mocks-http';
import CityModel from '@modules/cities/infra/mongodb/models/CityModel';

describe('Create city', () => {
  beforeEach(async () => {
    await CityModel.deleteMany({
      name: 'Cidade Teste',
      state: 'NA'
    });
  });

  afterAll(async () => {
    await CityModel.deleteMany({
      name: 'Cidade Teste',
      state: 'NA'
    });

    await mongoose.connection.close();
  });

  it('should be able to create a city in the database', async () => {
    const citiesController = new CitiesController;

    const req = mockRequest({
      body: {
        name: 'Cidade Teste',
        state: 'NA'
      }
    });

    const res = httpMocks.createResponse();

    await citiesController.create(req, res);

    expect(res._getStatusCode()).toBe(201);
  });

  it('should not be able to create a duplicate city in the database', async () => {
    const citiesController = new CitiesController;

    const req = mockRequest({
      body: {
        name: 'Cidade Teste',
        state: 'NA'
      }
    });

    const res = httpMocks.createResponse();

    await citiesController.create(req, res);
    await citiesController.create(req, res);

    expect(res._getStatusCode()).toBe(409);
  });

  it('should not accept empty requests', async () => {
    const citiesController = new CitiesController;

    const req = mockRequest({
      body: {}
    });

    const res = httpMocks.createResponse();

    await citiesController.create(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});