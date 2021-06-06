import 'reflect-metadata';
import '@shared/container';
import mongoose from 'mongoose';
import CityModel from '@modules/cities/infra/mongodb/models/CityModel';
import { mockRequest } from 'jest-mock-req-res';
import httpMocks from 'node-mocks-http';
import CitiesController from '@modules/cities/infra/http/controllers/CitiesController';

describe('Find city', () => {
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

    await mongoose.connection.close();
  });

  it('should be able to find a city by name', async () => {
    const citiesController = new CitiesController;

    const req = mockRequest({
      query: {
        name: 'Cidade Teste'
      }
    });

    const res = httpMocks.createResponse();

    await citiesController.find(req, res);
    const result = JSON.parse(res._getData());

    expect(result).toHaveLength(1);
  });

  it('should be able to find a city by state', async () => {
    const citiesController = new CitiesController;

    const req = mockRequest({
      query: {
        state: 'NA'
      }
    });

    const res = httpMocks.createResponse();

    await citiesController.find(req, res);
    const result = JSON.parse(res._getData());

    expect(result).toHaveLength(1);
  });

  it('should be able to find a city by name and state', async () => {
    const citiesController = new CitiesController;

    const req = mockRequest({
      query: {
        name: 'Cidade Teste',
        state: 'NA'
      }
    });

    const res = httpMocks.createResponse();

    await citiesController.find(req, res);
    const result = JSON.parse(res._getData());

    expect(result).toHaveLength(1);
  });
});