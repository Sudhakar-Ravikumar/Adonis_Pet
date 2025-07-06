import Sale from '#models/sale'
import { Request, Response } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class SaleRepo {
  static async index() {
    return await Sale.all()
  }

  static async store(request: Request) {
    const data = request.only(['c_id', 'p_id', 'sale_price'])
    return await Sale.create({
      ...data,
      sale_date: DateTime.now(),
    })
  }

  static async show(idParam: string, response: Response) {
    const id = Number(idParam)
    if (isNaN(id) || id <= 0) {
      return response.status(400).json({ error: 'Invalid sale ID' })
    }

    const sale = await Sale.find(id)
    return sale ?? { message: 'Sale not found' }
  }

  static async update(idParam: string, request: Request, response: Response) {
    const id = Number(idParam)
    const sale = await Sale.find(id)
    if (!sale) {
      return response.status(404).json({ message: 'Sale not found' })
    }

    const data = request.only(['c_id', 'p_id', 'sale_price'])
    sale.merge(data)
    await sale.save()
    return sale
  }

  static async destroy(idParam: string, response: Response) {
    const id = Number(idParam)
    const sale = await Sale.find(id)
    if (!sale) {
      return response.status(404).json({ message: 'Sale not found' })
    }

    await sale.delete()
    return { message: 'Sale deleted successfully' }
  }
}
