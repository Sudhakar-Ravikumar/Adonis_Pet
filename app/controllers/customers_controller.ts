import type { HttpContext } from '@adonisjs/core/http'
import CustomerRepo from '#repositories/customer_repo'

export default class CustomersController {
  async index() {
    return await CustomerRepo.index()
  }

  async store({ request }: HttpContext) {
    return await CustomerRepo.store(request)
  }

  async show({ params, response }: HttpContext) {
    return await CustomerRepo.show(params.id, response)
  }

  async update({ params, request, response }: HttpContext) {
    return await CustomerRepo.update(params.id, request, response)
  }

  async destroy({ params, response }: HttpContext) {
    return await CustomerRepo.destroy(params.id, response)
  }
}
