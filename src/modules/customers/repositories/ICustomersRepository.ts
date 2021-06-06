import Customer from "../entities/Customer";

export default interface ICustomersRepository {
  create(params: Customer): Promise<Customer>;
  find(params: Customer): Promise<Customer[]>;
  remove(params: Customer): Promise<void>;
  update(params: Customer): Promise<void>;
}