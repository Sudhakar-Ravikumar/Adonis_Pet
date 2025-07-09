// ✅ Validator - PetValidator.ts (VineJS - AdonisJS v6)
import vine from '@vinejs/vine'
import Pet from '#models/pet'

// Custom messages used for all validators
const messages = {
  'b_name.string': 'Breed name must be a string!',
  'b_name.minLength': 'Breed name must be at least 2 characters.',
  'b_name.maxLength': 'Breed name must be at most 50 characters.',

  'o_country.string': 'Origin country must be a string!',
  'o_country.minLength': 'Origin country must be at least 2 characters.',
  'o_country.maxLength': 'Origin country must be at most 50 characters.',

  'buy_date.date': 'Purchase date must be a valid date.',

  'buy_price.number': 'Price must be a number.',
  'buy_price.range': 'Price must be between 1 and 100000.',
  
}

export const storeMessages = messages 

// GET /pets/:id => only check if pet exists
// export async function validateShow(id: number) {
//   const pet = await Pet.find(id)
//   if (!pet) throw new Error('Pet not found')
// }
export async function validateShow(id: number) {
  await Pet.findOrFail(id) // This will throw ModelNotFoundException automatically
}



// POST /pets => full validation
export const storePetValidator = vine.compile(
  vine.object({
    b_name: vine.string().minLength(2).maxLength(50),
    o_country: vine.string().minLength(2).maxLength(50),
    buy_date: vine.date(),
    buy_price: vine.number().range([1, 100000]),
  })
)

// What is storePetValidator?
// It is an object — more specifically, a compiled schema object created by VineJS.

//If minlength is not given , It will accept all but wont accept empty , But accept space


// PUT /pets/:id => all fields required, check if pet exists
export async function validatePut(id: number, data: any) {
  // const pet = await Pet.find(id)
  // if (!pet) throw new Error('Pet not found')
  console.log("data:", data)
  await Pet.findOrFail(id) // Auto error if not found

  console.log(Pet)

  const requiredFields = ['b_name', 'o_country', 'buy_date', 'buy_price']
  const missingFields = requiredFields.filter(field => !(field in data))
  if (missingFields.length > 0) throw new Error(`Missing fields: ${missingFields.join(', ')}`)

  return storePetValidator
}

// PATCH /pets/:id => optional fields, check keys match schema
export async function validatePatch(id: number, data: any) {
  // const pet = await Pet.find(id)
  // if (!pet) throw new Error('Pet not found')
  await Pet.findOrFail(id) // Auto error if not found

  const validFields = ['b_name', 'o_country', 'buy_date', 'buy_price']
  const extraFields = Object.keys(data).filter((key) => !validFields.includes(key))
  if (extraFields.length > 0) throw new Error(`Invalid field(s): ${extraFields.join(', ')}`)

  return vine.compile(
    vine.object({
      b_name: vine.string().minLength(2).maxLength(50).optional(),
      o_country: vine.string().minLength(2).maxLength(50).optional(),
      buy_date: vine.date().optional(),
      buy_price: vine.number().range([1, 100000]).optional(),
    })
  )
}
// DELETE /pets/:id => only check if pet exists
export async function validateDestroy(id: number) {
  // const pet = await Pet.find(id)
  // if (!pet) throw new Error('Pet not found')
   await Pet.findOrFail(id) // Auto error if not found
}