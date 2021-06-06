import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../entities/Customer';

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

    await this.customersRepository.update(customerToUpdate);
  }
}