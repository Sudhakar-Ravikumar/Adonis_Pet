import type { HttpContext } from '@adonisjs/core/http'
//imports the HttpContext type from AdonisJS. HttpContext includes information about the request, response, params, session, etc., for each incoming HTTP request.

import env from '#start/env'

export default class ApiKeyAuth {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    // In AdonisJS middleware, next() is a callback function you must call when you're done with your logic — like validating an API key — to pass control to the next middleware or controller action.
    // () → This means the function takes no parameters.
    // Promise<void> → It returns a promise that doesn’t return any data. It's just used for async flow control.
    // next: NextFn ,we can give as here , it means the same as () => Promise<void>

    const apiKey = request.header('Authorization') // Check header
    // This line extracts the value of the Authorization header from the incoming request.
    // If the client sends Authorization: my-secret-key, it will be stored in apiKey.
    const serverKey = env.get('APP_KEY')
    // Reads the server’s valid key from .env
    if (!apiKey || apiKey !== serverKey) {
      return response.unauthorized({ error: 'Invalid or missing API key' })
      // unauthorized() is a helper method provided by AdonisJS to send a 401 Unauthorized HTTP response
    }

    await next()
    //If next not used , Then the request will be stuck in that middleware — Adonis won’t move to the controller or send a response, and the request will hang or timeout.
  }
}
