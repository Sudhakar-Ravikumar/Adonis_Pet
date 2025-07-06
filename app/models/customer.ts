import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public c_id!: number
  // c_id is the Primary Key

  @column()
  public name!: string
  // name of the customer

  @column()
  public place!: string
  // place or city of the customer

  @column()
  public phone_no!: string
  // phone number of the customer
}
