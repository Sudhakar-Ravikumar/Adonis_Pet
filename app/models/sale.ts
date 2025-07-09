import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public sid!: number
  // sid is the Primary Key

  @column()
  public c_id!: number
  // Foreign key: refers to customer

  @column()
  public p_id!: number
  // Foreign key: refers to pet

  @column.date()
  public sale_date!: DateTime
  // Date of sale

  @column()
  public sale_price!: number
  // Price of sale
}
