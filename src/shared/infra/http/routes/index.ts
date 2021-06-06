import express, { response } from 'express';
import citiesRoutes from '@modules/cities/infra/http/routes';
import customersRoutes from '@modules/customers/infra/http/routes';

const routes = express.Router();

routes.use('/cities', citiesRoutes);
routes.use('/customers', customersRoutes);

export default routes;
