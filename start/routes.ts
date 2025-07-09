import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'

import PetsController from '#controllers/pets_controller'
import CustomersController from '#controllers/customers_controller'
import SalesController from '#controllers/sales_controller'

/* --------------------  PET ROUTES -------------------- */
router.get('/', [PetsController, 'hello'])
router.get('/pets', [PetsController, 'index'])         // Get all pets
router.post('/pets', [PetsController, 'store'])        // Add new pet
router.get('/pets/:id', [PetsController, 'show']).where('id', /^[0-9]+$/)      // Get one pet by ID
router.put('/pets/:id', [PetsController, 'update']).where('id', /^[0-9]+$/)    // Update pet (PUT)
router.patch('/pets/:id', [PetsController, 'update']).where('id', /^[0-9]+$/)  // Update pet (PATCH)
router.delete('/pets/:id', [PetsController, 'destroy']).where('id', /^[0-9]+$/)// Delete pet

/* --------------------  CUSTOMER ROUTES -------------------- */
router.get('/customers', [CustomersController, 'index'])
router.post('/customers', [CustomersController, 'store'])
router.get('/customers/:id', [CustomersController, 'show']).where('id', /^[0-9]+$/)
router.put('/customers/:id', [CustomersController, 'update']).where('id', /^[0-9]+$/)
router.patch('/customers/:id', [CustomersController, 'update']).where('id', /^[0-9]+$/)
router.delete('/customers/:id', [CustomersController, 'destroy']).where('id', /^[0-9]+$/)

/* --------------------  SALES ROUTES -------------------- */
router.get('/sales', [SalesController, 'index'])
router.post('/sales', [SalesController, 'store'])
router.get('/sales/:id', [SalesController, 'show']).where('id', /^[0-9]+$/)
router.put('/sales/:id', [SalesController, 'update']).where('id', /^[0-9]+$/)
router.patch('/sales/:id', [SalesController, 'update']).where('id', /^[0-9]+$/)
router.delete('/sales/:id', [SalesController, 'destroy']).where('id', /^[0-9]+$/)

/* -------------------- FALLBACK ROUTES -------------------- */
function handleInvalidRoute({ response }: HttpContext) {
  return response.status(404).json({
    error: 'Invalid path',
    available_paths: [
      // Pets
      'GET /pets', 'POST /pets', 'GET /pets/:id',
      'PUT /pets/:id', 'PATCH /pets/:id', 'DELETE /pets/:id',

      // Customers
      'GET /customers', 'POST /customers', 'GET /customers/:id',
      'PUT /customers/:id', 'PATCH /customers/:id', 'DELETE /customers/:id',

      // Sales
      'GET /sales', 'POST /sales', 'GET /sales/:id',
      'PUT /sales/:id', 'PATCH /sales/:id', 'DELETE /sales/:id'
    ]
  })
}

// Catch-all for all unmatched HTTP requests
router.get('*', handleInvalidRoute)
router.post('*', handleInvalidRoute)
router.put('*', handleInvalidRoute)
router.patch('*', handleInvalidRoute)
router.delete('*', handleInvalidRoute)
