import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon/src/luxon.js'

// BaseModel: The base class that provides DB functionality (querying, saving, etc.)
export default class Pet extends BaseModel {
  @column({ isPrimary: true })
  public p_id!: number
  // p_id is the Primary Key in 'pets' table

  @column()
  public b_name!: string
  // b_name: Breed name of the pet

  @column()
  public o_country!: string
  // o_country: Origin country of the pet

  @column.date()
  public buy_date!: DateTime
  // buy_date: Purchase date

  @column()
  public buy_price!: number
  // buy_price: Purchase price
}
