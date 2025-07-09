import { HttpContext } from '@adonisjs/core/http'
import {
  storeCustomerValidator,
  validateCustomerShow,
  validateCustomerPut,
  validateCustomerPatch,
  validateCustomerDestroy
} from '#validators/customer_validator'
import CustomerRepo from '../Repository/customer_repo.js'

export default class CustomersController {
  async index({}: HttpContext) {
    try {
      return await CustomerRepo.index()
    } catch (error) {
      throw error
    }
  }

  async store({ request }: HttpContext) {
    try {
      const data = await request.validateUsing(storeCustomerValidator)
      return await CustomerRepo.store(data)
    } catch (error) {
      throw error
    }
  }

  async show({ params }: HttpContext) {
    try {
      await validateCustomerShow(Number(params.id))
      return await CustomerRepo.show(Number(params.id))
    } catch (error) {
      throw error
    }
  }

  async update({ request, params }: HttpContext) {
    try {
      const id = Number(params.id)
      const data = request.all()
      const validator = request.method() === 'PATCH'
        ? await validateCustomerPatch(id, data)
        : await validateCustomerPut(id, data)

      const validated = await request.validateUsing(validator)
      return await CustomerRepo.update(id, validated)
    } catch (error) {
      throw error
    }
  }

  async destroy({ params }: HttpContext) {
    try {
      await validateCustomerDestroy(Number(params.id))
      return await CustomerRepo.destroy(Number(params.id))
    } catch (error) {
      throw error
    }
  }
}



// import { HttpContext } from '@adonisjs/core/http'
// import {
//   storeCustomerValidator,
//   validateCustomerShow,
//   validateCustomerPut,
//   validateCustomerPatch,
//   validateCustomerDestroy,
//   customerMessages
// } from '#validators/customer_validator'
// import CustomerRepo from '../Repository/customer_repo.js'

// export default class CustomersController {
//   async index({}: HttpContext) {
//     try {
//       return await CustomerRepo.index()
//     } catch (error) {
//       throw error
//     }
//   }

// async store({ request }: HttpContext) {
//   try {
//     const data = await request.validateUsing(storeCustomerValidator, {
//       messages: customerMessages, // ✅ attach messages here
//     })

//     return await CustomerRepo.store(data)
//   } catch (error) {
//     throw error
//   }
// }

//   async show({ params }: HttpContext) {
//     try {
//       await validateCustomerShow(Number(params.id))
//       return await CustomerRepo.show(Number(params.id))
//     } catch (error) {
//       throw error
//     }
//   }

//   async update({ request, params }: HttpContext) {
//     try {
//       const id = Number(params.id)
//       const data = request.all()
//       const validator = request.method() === 'PATCH'
//         ? await validateCustomerPatch(id, data)
//         : await validateCustomerPut(id, data)

//       const validated = await request.validateUsing(validator, customerMessages)
//       return await CustomerRepo.update(id, validated)
//     } catch (error) {
//       throw error
//     }
//   }

//   async destroy({ params }: HttpContext) {
//     try {
//       await validateCustomerDestroy(Number(params.id))
//       return await CustomerRepo.destroy(Number(params.id))
//     } catch (error) {
//       throw error
//     }
//   }
// }
