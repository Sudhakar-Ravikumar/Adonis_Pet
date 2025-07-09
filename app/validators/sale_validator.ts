import vine from '@vinejs/vine'
import Sale from '#models/sale'
import Pet from '#models/pet'
import Customer from '#models/customer'

// 🔔 Custom error messages for validator
export const saleMessages = {
  'c_id.number': 'Customer ID must be a number.',
  'p_id.number': 'Pet ID must be a number.',
  'sale_date.date': 'Sale date must be a valid date.',
  'sale_price.number': 'Sale price must be a number.',
  'sale_price.range': 'Sale price must be between 1 and 100000.',
}

// 🔵 Validate GET /sales/:id
export async function validateSaleShow(id: number) {
  await Sale.findOrFail(id)
}

// 🔵 Validate DELETE /sales/:id
export async function validateSaleDestroy(id: number) {
  await Sale.findOrFail(id)
}

// ✅ POST /sales — full validation + foreign key check
export async function validateSaleStore(data: any) {
  await Customer.findOrFail(data.c_id)
  await Pet.findOrFail(data.p_id)

  return vine.compile(
    vine.object({
      c_id: vine.number(),
      p_id: vine.number(),
      sale_date: vine.date(),
      sale_price: vine.number().range([1, 100000]),
    })
  )
}

// ✅ PUT /sales/:id — all fields required + FK check + reuse POST schema
export async function validateSalePut(id: number, data: any) {
  await Sale.findOrFail(id)

  const requiredFields = ['c_id', 'p_id', 'sale_date', 'sale_price']
  const missingFields = requiredFields.filter((field) => !(field in data))
  if (missingFields.length > 0) {
    throw new Error(`Missing fields: ${missingFields.join(', ')}`)
  }

  return validateSaleStore(data) // ✅ Reuse POST logic
}

// ✅ PATCH /sales/:id — optional fields + FK check if provided
export async function validateSalePatch(id: number, data: any) {
  await Sale.findOrFail(id)

  const validFields = ['c_id', 'p_id', 'sale_date', 'sale_price']
  const extraFields = Object.keys(data).filter((key) => !validFields.includes(key))
  if (extraFields.length > 0) {
    throw new Error(`Invalid field(s): ${extraFields.join(', ')}`)
  }

  // Foreign key checks only if present
  if ('c_id' in data) await Customer.findOrFail(data.c_id)
  if ('p_id' in data) await Pet.findOrFail(data.p_id)

  return vine.compile(
    vine.object({
      c_id: vine.number().optional(),
      p_id: vine.number().optional(),
      sale_date: vine.date().optional(),
      sale_price: vine.number().range([1, 100000]).optional(),
    })
  )
}
