import Sale from '#models/sale'
import { DateTime } from 'luxon'

export default class SaleRepo {
  static async index() {
    return await Sale.all()
  }

  static async store(data: any) {
    const dateInput = data.sale_date

    // Convert from JS Date (or string) to Luxon DateTime
    const parsedDate = DateTime.fromJSDate(new Date(dateInput))
    if (!parsedDate.isValid) {
      throw new Error(`Invalid sale_date: ${dateInput}`)
    }

    data.sale_date = parsedDate
    return await Sale.create(data)
  }

  static async show(id: number) {
    return await Sale.findOrFail(id)
  }

  static async update(id: number, data: any) {
    const sale = await Sale.findOrFail(id)

    if ('sale_date' in data) {
      const dateInput = data.sale_date
      const parsedDate = DateTime.fromJSDate(new Date(dateInput))
      if (!parsedDate.isValid) {
        throw new Error(`Invalid sale_date: ${dateInput}`)
      }
      data.sale_date = parsedDate
    }

    sale.merge(data)
    await sale.save()
    return sale
  }

  static async destroy(id: number) {
    const sale = await Sale.findOrFail(id)
    await sale.delete()
    return { message: 'Sale deleted successfully' }
  }
}


// {
//   "c_id": 1,
//   "p_id": 1,
//   "sale_date": "2025-07-08",
//   "sale_price": 12000
// }