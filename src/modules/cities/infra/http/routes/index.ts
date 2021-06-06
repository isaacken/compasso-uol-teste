import express, { response } from 'express';
import CitiesController from '../controllers/CitiesController';

const routes = express.Router();

const citiesController = new CitiesController;

routes.post('/', citiesController.create);
routes.get('/', citiesController.find);

export default routes;