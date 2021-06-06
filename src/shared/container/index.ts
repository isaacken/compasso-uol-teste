import { container } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/mongodb/repositories/CitiesRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/mongodb/repositories/CustomersRepository';

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
);