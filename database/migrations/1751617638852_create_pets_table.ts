import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Pets extends BaseSchema {
  protected tableName = 'pets'

  async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('p_id')          // Primary key
      table.string('b_name')            // Breed name
      table.string('o_country')         // Origin country
      table.date('buy_date')            // Date of purchase
      table.decimal('buy_price', 10, 2) // Price of pet
      table.timestamps(true)
    })
  }

  async down () {
    this.schema.dropTable(this.tableName)
  }
}
