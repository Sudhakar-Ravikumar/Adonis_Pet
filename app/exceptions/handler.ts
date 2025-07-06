import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}


// import HttpContext from '@adonisjs/core/http'
// import { Exception } from '@adonisjs/core/exceptions'

// export default class ExceptionHandler {
//   async handle(error: any, ctx: HttpContext) {
//     const { response } = ctx

//     // 🔹 Validation Errors
//     if (error.messages) {
//       return response.status(400).json({
//         status: 'validation_error',
//         message: 'Validation failed',
//         errors: error.messages
//       })
//     }

//     // 🔹 Explicit Exceptions (from repo or validator)
//     if (error instanceof Exception && error.status) {
//       return response.status(error.status).json({
//         status: 'error',
//         message: error.message
//       })
//     }

//     // 🔹 Fallback for unexpected errors
//     console.error(error)
//     return response.status(500).json({
//       status: 'error',
//       message: 'Something went wrong'
//     })
//   }
// }
