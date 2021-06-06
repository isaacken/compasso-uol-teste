import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../entities/Customer';
import AppError from '@shared/errors/AppError';

export interface IUpdateCustomerData {
  _id: string;
  name: string;
}

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {
    this.customersRepository = customersRepository;
  }

  public async execute({ _id, name }: IUpdateCustomerData): Promise<void> {
    const customerToUpdate = new Customer(name);
    customerToUpdate._id = _id;

    if (!_id) throw new AppError('Customer id is required', 400);
    if (!name) throw new AppError('Customer name is required', 400);

    await this.customersRepository.update(customerToUpdate);
  }
}