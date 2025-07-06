import Customer from '#models/customer'
import { Request, Response } from '@adonisjs/core/http'

export default class CustomerRepo {
  static async index() {
    return await Customer.all()
  }

  static async store(request: Request) {
    const data = request.only(['name', 'place', 'phone_no'])
    return await Customer.create(data)
  }

  static async show(idParam: string, response: Response) {
    const id = Number(idParam)
    if (isNaN(id) || id <= 0) {
      return response.status(400).json({ error: 'Invalid customer ID' })
    }

    const customer = await Customer.find(id)
    return customer ?? { message: 'Customer not found' }
  }

  static async update(idParam: string, request: Request, response: Response) {
    const id = Number(idParam)
    const customer = await Customer.find(id)
    if (!customer) {
      return response.status(404).json({ message: 'Customer not found' })
    }

    const data = request.only(['name', 'place', 'phone_no'])
    customer.merge(data)
    await customer.save()
    return customer
  }

  static async destroy(idParam: string, response: Response) {
    const id = Number(idParam)
    const customer = await Customer.find(id)
    if (!customer) {
      return response.status(404).json({ message: 'Customer not found' })
    }

    await customer.delete()
    return { message: 'Customer deleted successfully' }
  }
}
