import Customer from '#models/customer'

export default class CustomerRepo {
  static async index() {
    return await Customer.all()
  }

  static async store(data: any) {
    return await Customer.create(data)
  }

  static async show(id: number) {
    return await Customer.findOrFail(id)
  }

  static async update(id: number, data: any) {
    const customer = await Customer.findOrFail(id)
    customer.merge(data)
    await customer.save()
    return customer
  }

  static async destroy(id: number) {
    const customer = await Customer.findOrFail(id)
    await customer.delete()
    return { message: 'Customer deleted successfully' }
  }
}




// {
//   "name": "Sudhakar",
//   "place": "Chennai",
//   "phone_no": "9876543210"
// }