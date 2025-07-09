import Pet from '#models/pet'
// import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'


export default class PetRepo {
  static async index() {
    // try {
    //   return await Pet.all()
    // } catch {
    //   throw new Exception('Failed to fetch pets', { status: 500 })
    // }
    return await Pet.all() // If DB fails, Adonis handles the error
  }

 static async store(data: any) {
  const dateInput = data.buy_date

  // Convert from JavaScript Date object
  const parsedDate = DateTime.fromJSDate(new Date(dateInput))

  if (!parsedDate.isValid) {
    throw new Error(`Invalid buy_date: ${dateInput}`)
  }

  data.buy_date = parsedDate
  return await Pet.create(data)
}



  static async show(id: number) {
    // const pet = await Pet.find(id)
    // if (!pet) {
    //   throw new Exception('Pet not found', { status: 404 })
    // }
    // return pet
    return await Pet.findOrFail(id) // Throws 404 automatically
  }


static async update(id: number, data: any) {
  const pet = await Pet.findOrFail(id)

  // Only process buy_date if it's present
  if ('buy_date' in data) {
    const dateInput = data.buy_date

    const parsedDate = DateTime.fromJSDate(new Date(dateInput))

    if (!parsedDate.isValid) {
      throw new Error(`Invalid buy_date: ${dateInput}`)
    }

    data.buy_date = parsedDate
  }

  pet.merge(data)
  await pet.save()
  return pet
}
  // static async update(id: number, data: any) {
  //   // const pet = await Pet.find(id)
  //   const pet = await Pet.findOrFail(id)
  //   // if (!pet) {
  //   //   throw new Exception('Pet not found', { status: 404 })
  //   // }
  //   // try {
  //      const dateInput = data.buy_date

  //      // Convert from JavaScript Date object
  //      const parsedDate = DateTime.fromJSDate(new Date(dateInput))

  //      if (!parsedDate.isValid) {
  //      throw new Error(`Invalid buy_date: ${dateInput}`)
  //     }

  //     data.buy_date = parsedDate
  //     pet.merge(data)
  //     await pet.save()
  //     return pet
  //   // } catch {
  //   //   throw new Exception('Failed to update pet', { status: 500 })
  //   // }
  // }

  // static async update(id: number, data: any) {
  // const pet = await Pet.findOrFail(id)

  // if (data.buy_date !== undefined) {
  //   const parsed = new Date(data.buy_date)
  //   if (isNaN(parsed.getTime())) {
  //     throw new Error(`Invalid buy_date: ${data.buy_date}`)
  //   }
  //   data.buy_date = parsed
  // }


  static async destroy(id: number) {
    // const pet = await Pet.find(id)
    const pet = await Pet.findOrFail(id)
    // if (!pet) {
    //   throw new Exception('Pet not found', { status: 404 })
    // }
    // try {
      await pet.delete()
      return { message: 'Pet deleted successfully' }
    // } catch {
    //   throw new Exception('Failed to delete pet', { status: 500 })
    // }
  }
}





// {
//   "b_name": "Beagle",
//   "o_country": "UK",
//   "buy_date": "2024-12-01",
//   "buy_price": 14500.00
// }
