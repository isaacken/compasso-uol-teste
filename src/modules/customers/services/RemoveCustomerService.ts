import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../entities/Customer';

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

    await this.customersRepository.remove(customerToRemove);
  }
}