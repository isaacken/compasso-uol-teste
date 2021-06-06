import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../entities/Customer';

export interface IFindCustomerData {
  _id?: string;
  name: string;
}

@injectable()
export default class FindCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {
    this.customersRepository = customersRepository;
  }

  public async execute({ _id, name }: IFindCustomerData): Promise<Customer[]> {
    const customerToFind = new Customer(name);
    customerToFind._id = _id;

    let customers: Customer[] = await this.customersRepository.find(customerToFind);

    return customers;
  }
}