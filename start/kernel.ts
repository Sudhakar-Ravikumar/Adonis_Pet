/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/


import server from '@adonisjs/core/services/server'

/** 
 * The error handler is used to convert an exception
 * to an HTTP response.
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
  () => import('@adonisjs/core/bodyparser_middleware'), // ✅ ADD THIS LINE
  () => import('#middleware/api_key_auth_middleware')
])

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */

