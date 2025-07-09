import vine from '@vinejs/vine'
import Customer from '#models/customer'

export const customerMessages = {
  'name.string': 'Customer name must be a string.',
  'name.minLength': 'Customer name must be at least 2 characters.',
  'name.maxLength': 'Customer name must be at most 100 characters.',

  'place.string': 'Place must be a string.',
  'place.minLength': 'Place must be at least 2 characters.',
  'place.maxLength': 'Place must be at most 100 characters.',

  'phone_no.string': 'Phone number must be a string.',
  'phone_no.regex': 'Phone number must be a valid 10-digit number.',
}

export const storeCustomerValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100),
    place: vine.string().minLength(2).maxLength(100),
    phone_no: vine.string().regex(/^\d{10}$/),
  })
)

export async function validateCustomerShow(id: number) {
  await Customer.findOrFail(id)
}

export async function validateCustomerPut(id: number, data: any) {
  await Customer.findOrFail(id)

  const required = ['name', 'place', 'phone_no']
  const missing = required.filter(f => !(f in data))
  if (missing.length > 0) throw new Error(`Missing fields: ${missing.join(', ')}`)

  return storeCustomerValidator
}

export async function validateCustomerPatch(id: number, data: any) {
  await Customer.findOrFail(id)

  const valid = ['name', 'place', 'phone_no']
  const extra = Object.keys(data).filter(k => !valid.includes(k))
  if (extra.length > 0) throw new Error(`Invalid field(s): ${extra.join(', ')}`)

  return vine.compile(
    vine.object({
      name: vine.string().minLength(2).maxLength(100).optional(),
      place: vine.string().minLength(2).maxLength(100).optional(),
      phone_no: vine.string().regex(/^\d{10}$/).optional(),
    })
  )
}

export async function validateCustomerDestroy(id: number) {
  await Customer.findOrFail(id)
}






// import vine from '@vinejs/vine'
// import Customer from '#models/customer'

// // ✅ Custom error messages used when passed into request.validateUsing()
// // export const customerMessages = {
// //   'name.string': 'Customer name must be a string.',
// //   'name.minLength': 'Customer name must be at least 2 characters.',
// //   'name.maxLength': 'Customer name must be at most 100 characters.',

// //   'place.string': 'Place must be a string.',
// //   'place.minLength': 'Place must be at least 2 characters.',
// //   'place.maxLength': 'Place must be at most 100 characters.',

// //   'phone_no.string': 'Phone number must be a string.',
// //   'phone_no.regex': 'Phone number must be a valid 10-digit number.',
// // }

// // ✅ Used for both store and full PUT updates
// export const customerMessages = {
//   'name.string': 'Customer name must be a string.',
//   'name.minLength': 'Customer name must be at least 2 characters.',
//   'name.maxLength': 'Customer name must be at most 100 characters.',
//   'place.string': 'Place must be a string.',
//   'place.minLength': 'Place must be at least 2 characters.',
//   'place.maxLength': 'Place must be at most 100 characters.',
//   'phone_no.string': 'Phone number must be a string.',
//   'phone_no.regex': 'Phone number must be a valid 10-digit number.',
// }

// // ✅ NO messages here
// export const storeCustomerValidator = vine.compile(
//   vine.object({
//     name: vine.string().minLength(2).maxLength(100),
//     place: vine.string().minLength(2).maxLength(100),
//     phone_no: vine.string().regex(/^\d{10}$/),
//   })
// )




// // ✅ ID check only
// export async function validateCustomerShow(id: number) {
//   await Customer.findOrFail(id)
// }

// // ✅ PUT method: ensure record exists and all required fields are present
// export async function validateCustomerPut(id: number, data: any) {
//   await Customer.findOrFail(id)

//   const required = ['name', 'place', 'phone_no']
//   const missing = required.filter(f => !(f in data))
//   if (missing.length > 0) {
//     throw new Error(`Missing fields: ${missing.join(', ')}`)
//   }

//   return storeCustomerValidator
// }

// // ✅ PATCH method: validate only provided fields, and allow partial update
// export async function validateCustomerPatch(id: number, data: any) {
//   await Customer.findOrFail(id)

//   const valid = ['name', 'place', 'phone_no']
//   const extra = Object.keys(data).filter(k => !valid.includes(k))
//   if (extra.length > 0) {
//     throw new Error(`Invalid field(s): ${extra.join(', ')}`)
//   }

//   return vine.compile(
//   vine.object({
//     name: vine.string().minLength(2).maxLength(100).optional(),
//     place: vine.string().minLength(2).maxLength(100).optional(),
//     phone_no: vine.string().regex(/^\d{10}$/).optional(),
//   })
// )

// }

// // ✅ DELETE method: just ensure record exists
// export async function validateCustomerDestroy(id: number) {
//   await Customer.findOrFail(id)
// }
