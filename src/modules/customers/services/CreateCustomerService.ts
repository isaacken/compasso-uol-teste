import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../entities/Customer';
import City from '@modules/cities/entities/City';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import AppError from '@shared/errors/AppError';

export interface ICreateCustomerData {
  _id?: string;
  name: string;
  gender?: 'M' | 'F' | '';
  birthDate?: string;
  cityId?: string;
}

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {
    this.customersRepository = customersRepository;
    this.citiesRepository = citiesRepository;
  }

  public async execute({ name, gender, birthDate, cityId }: ICreateCustomerData): Promise<Customer> {
    let city: City = new City;
    if (cityId) {
      const cities = await this.citiesRepository.find({ _id: cityId, name: '', state: '' });
      if (cities.length <= 0) throw new AppError('City not found', 404);
      city = cities[0];
    }

    if (!name) throw new AppError('Customer name is required', 400);
    if (gender !== 'M' && gender !== 'F' && !!gender)
      throw new AppError('Invalid gender format. Expected M or F.', 400);

    let parsedBirthDate: Date | undefined;

    if (birthDate) {
      if (!birthDate.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)) throw new AppError('Invalid date format', 400);
      parsedBirthDate = new Date(birthDate);
    }

    let customer: Customer = await this.customersRepository.create(new Customer(name, gender, parsedBirthDate, city));

    return customer;
  }
}