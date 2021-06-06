import Customer from "@modules/customers/entities/Customer";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import FindCustomerService from "@modules/customers/services/FindCustomerService";
import RemoveCustomerService from "@modules/customers/services/RemoveCustomerService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CustomersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      let { name, gender, birthDate, cityId } = req.body;

      if (!name) throw new AppError('Customer name is required', 400);

      const createCustomerService = container.resolve(CreateCustomerService);
      const customer = await createCustomerService.execute({ name, gender, birthDate, cityId });

      return res.status(201).json(customer);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  public async find(req: Request, res: Response): Promise<Response> {
    try {
      let { name, _id } = req.query as unknown as Customer;

      const findCustomerService = container.resolve(FindCustomerService);

      const customers = await findCustomerService.execute({ name, _id });

      return res.json(customers);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.params;

      if (!_id) throw new AppError('Customer id is required', 400);

      const removeCustomerService = container.resolve(RemoveCustomerService);

      await removeCustomerService.execute({ _id });

      return res.status(204).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.params;
      const { name } = req.body;

      if (!_id) throw new AppError('Customer id is required', 400);
      if (!name) throw new AppError('Customer name is required', 400);

      const updateCustomerService = container.resolve(UpdateCustomerService);

      await updateCustomerService.execute({ _id, name });

      return res.status(204).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }
}