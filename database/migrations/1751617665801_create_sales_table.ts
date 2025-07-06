import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Sales extends BaseSchema {
  protected tableName = 'sales'

  async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('sid')             // Primary key
      table
        .integer('c_id')
        .unsigned()
        .references('c_id')
        .inTable('customers')
        .onDelete('CASCADE')              // Optional: delete sales if customer is deleted

      table
        .integer('p_id')
        .unsigned()
        .references('p_id')
        .inTable('pets')
        .onDelete('CASCADE')              // Optional: delete sales if pet is deleted

      table.date('sale_date')             // Date of sale
      table.decimal('sale_price', 10, 2)  // Sale price
      table.timestamps(true)
    })
  }

  async down () {
    this.schema.dropTable(this.tableName)
  }
}
