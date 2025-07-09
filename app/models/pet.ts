import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Pet extends BaseModel {
  public static primaryKey = 'p_id'
  public static table = 'pets' // Only if your table is not `pets`

  @column({ isPrimary: true })
  public p_id!: number

  @column()
  public b_name!: string

  @column()
  public o_country!: string

  @column.date()
  public buy_date!: DateTime

  @column()
  public buy_price!: number
}
