import type { HttpContext } from '@adonisjs/core/http'
import SaleRepo from '#repositories/sale_repo'

export default class SalesController {
  async index() {
    return await SaleRepo.index()
  }

  async store({ request }: HttpContext) {
    return await SaleRepo.store(request)
  }

  async show({ params, response }: HttpContext) {
    return await SaleRepo.show(params.id, response)
  }

  async update({ params, request, response }: HttpContext) {
    return await SaleRepo.update(params.id, request, response)
  }

  async destroy({ params, response }: HttpContext) {
    return await SaleRepo.destroy(params.id, response)
  }
}
