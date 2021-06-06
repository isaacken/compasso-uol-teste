import express from 'express';
import CustomersController from '../controllers/CustomersController';

const routes = express.Router();

const customersController = new CustomersController;

routes.post('/', customersController.create);
routes.get('/', customersController.find);
routes.delete('/:_id', customersController.remove);
routes.put('/:_id', customersController.update);

export default routes;