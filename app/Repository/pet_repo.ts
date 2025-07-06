import Pet from '#models/pet'
import { Exception } from '@adonisjs/core/exceptions'

export default class PetRepo {
  static async index() {
    try {
      return await Pet.all()
    } catch {
      throw new Exception('Failed to fetch pets', { status: 500 })
    }
  }

  static async store(data: any) {
    try {
      return await Pet.create(data)
    } catch {
      throw new Exception('Failed to store pet', { status: 500 })
    }
  }

  static async show(id: number) {
    const pet = await Pet.find(id)
    if (!pet) {
      throw new Exception('Pet not found', { status: 404 })
    }
    return pet
  }

  static async update(id: number, data: any) {
    const pet = await Pet.find(id)
    if (!pet) {
      throw new Exception('Pet not found', { status: 404 })
    }
    try {
      pet.merge(data)
      await pet.save()
      return pet
    } catch {
      throw new Exception('Failed to update pet', { status: 500 })
    }
  }

  static async destroy(id: number) {
    const pet = await Pet.find(id)
    if (!pet) {
      throw new Exception('Pet not found', { status: 404 })
    }
    try {
      await pet.delete()
      return { message: 'Pet deleted successfully' }
    } catch {
      throw new Exception('Failed to delete pet', { status: 500 })
    }
  }
}
