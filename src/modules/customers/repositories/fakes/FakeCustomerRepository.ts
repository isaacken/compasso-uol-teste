import Customer from "@modules/customers/entities/Customer";
import ICustomersRepository from "../ICustomersRepository";
import { v4 as uuid } from "uuid";

export default class FakeCustomersRepository implements ICustomersRepository {
  public customers: Customer[] = [];

  public async create({ name, gender, birthDate, city }: Customer): Promise<Customer> {

    let customer = new Customer(name, gender, birthDate, city);
    customer._id = uuid();
    this.customers.push(customer);

    return customer;
  }

  public async find({ name, _id }: Customer): Promise<Customer[]> {
    const customer = this.customers.filter((el) => {
      return el._id === _id || el.name === name;
    });

    return customer;
  }

  public async remove({ _id }: Customer): Promise<void> {
    this.customers.splice(this.customers.findIndex((el) => {
      el._id === _id
    }));
  }

  public async update({ _id, name }: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex((el) => {
      el._id === _id
    });

    this.customers[customerIndex].name = name;;
  }
}