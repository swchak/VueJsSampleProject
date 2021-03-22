import { BaseModel } from './base.model'

export class UsedInventoryModel extends BaseModel {
  reservationDateTime: string
  usedReservations: number

  constructor(data) {
    super(data)
    const d = data || {}
    this.reservationDateTime = d.inventoryDateTime
    this.usedReservations = d.usedReservations
  }
}
