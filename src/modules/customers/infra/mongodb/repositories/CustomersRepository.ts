import '@shared/infra/mongodb/database';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Customer from '@modules/customers/entities/Customer';
import CustomerModel from '../models/CustomerModel';

interface IQueryParams {
  _id?: string;
  name?: string | RegExp;
}

export default class CustomersRepository implements ICustomersRepository {
  public async create({ name, gender, birthDate, city }: Customer): Promise<Customer> {
    const customer: Customer = new Customer(name, gender, birthDate, city);

    const insertCustomer = new CustomerModel(customer);
    await insertCustomer.save();

    return insertCustomer as Customer;
  }

  public async find({ _id, name }: Customer): Promise<Customer[]> {
    let params: IQueryParams = {};
    if (_id) params._id = _id;
    if (name) params.name = new RegExp(name, 'i');

    const customers = await CustomerModel.find(params);

    return customers;
  }

  public async remove({ _id }: Customer): Promise<void> {
    await CustomerModel.deleteOne({ _id });

    return;
  }

  public async update({ _id, name }: Customer): Promise<void> {
    await CustomerModel.updateOne({ _id }, { name });
  }
}