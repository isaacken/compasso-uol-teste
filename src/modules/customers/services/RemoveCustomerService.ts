import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../entities/Customer';
import AppError from '@shared/errors/AppError';

export interface IRemoveCustomerData {
  _id: string;
}

@injectable()
export default class RemoveCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {
    this.customersRepository = customersRepository;
  }

  public async execute({ _id }: IRemoveCustomerData): Promise<void> {
    const customerToRemove = new Customer;
    customerToRemove._id = _id;

    if (!_id) throw new AppError('Customer id is required', 400);

    await this.customersRepository.remove(customerToRemove);
  }
}