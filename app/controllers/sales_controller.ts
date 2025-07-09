// ✅ Controller - SalesController.ts
import { HttpContext } from '@adonisjs/core/http'
import {
  validateSaleStore,
  validateSalePut,
  validateSalePatch,
  validateSaleShow,
  validateSaleDestroy
} from '#validators/sale_validator'
import SaleRepo from '../Repository/sale_repo.js' // 👈 use relative import for .ts files

export default class SalesController {
  async index({}: HttpContext) {
    try {
      return await SaleRepo.index()
    } catch (error) {
      throw error
    }
  }

  async store({ request }: HttpContext) {
    try {
      const validator = await validateSaleStore(request.all())
      const data = await request.validateUsing(validator)
      return await SaleRepo.store(data)
    } catch (error) {
      throw error
    }
  }

  async show({ params }: HttpContext) {
    try {
      await validateSaleShow(Number(params.id))
      return await SaleRepo.show(Number(params.id))
    } catch (error) {
      throw error
    }
  }

  async update({ request, params }: HttpContext) {
    try {
      const id = Number(params.id)
      const data = request.all()
      const validator = request.method() === 'PATCH'
        ? await validateSalePatch(id, data)
        : await validateSalePut(id, data)

      const validated = await request.validateUsing(validator)
      return await SaleRepo.update(id, validated)
    } catch (error) {
      throw error
    }
  }

  async destroy({ params }: HttpContext) {
    try {
      await validateSaleDestroy(Number(params.id))
      return await SaleRepo.destroy(Number(params.id))
    } catch (error) {
      throw error
    }
  }

  async hello({}: HttpContext) {
    return 'helllloooo sale'
  }
}
