// ✅ Controller - PetsController.ts
import type { HttpContext } from '@adonisjs/core/http'
import {
  storePetValidator,
  validatePut,
  validatePatch,
  validateShow,
  validateDestroy
} from '#validators/pet_validator'
// import { PetRepo } from '#app/repositories/pet_repo'
import {PetRepo} from '#Repository/pet_repo'

export default class PetsController {
  async index({}: HttpContext) {
    try {
      return await PetRepo.index()
    } catch (error) {
      throw error
    }
  }

  async store({ request }: HttpContext) {
    try {
      const data = await request.validateUsing(storePetValidator)
      return await PetRepo.store(data)
    } catch (error) {
      throw error
    }
  }

  async show({ params }: HttpContext) {
    try {
      await validateShow(Number(params.id))
      return await PetRepo.show(Number(params.id))
    } catch (error) {
      throw error
    }
  }

  async update({ request, params }: HttpContext) {
    try {
      const id = Number(params.id)
      const data = request.all()
      const validator = request.method() === 'PATCH' ? await validatePatch(id, data) : await validatePut(id, data)
      const validated = await request.validateUsing(validator)
      return await PetRepo.update(id, validated)
    } catch (error) {
      throw error
    }
  }

  async destroy({ params }: HttpContext) {
    try {
      await validateDestroy(Number(params.id))
      return await PetRepo.destroy(Number(params.id))
    } catch (error) {
      throw error
    }
  }
}
