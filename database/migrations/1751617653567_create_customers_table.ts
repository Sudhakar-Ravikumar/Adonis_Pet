import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Customers extends BaseSchema {
  protected tableName = 'customers'

  async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('c_id')   // Primary key
      table.string('name')       // Customer name
      table.string('place')      // Location
      table.string('phone_no')   // Contact number
      table.timestamps(true)
    })
  }

  async down () {
    this.schema.dropTable(this.tableName)
  }
}
