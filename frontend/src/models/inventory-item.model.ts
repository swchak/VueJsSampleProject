import { BaseModel } from './base.model'

export class InventoryItemModel extends BaseModel {
  inventoryDateTime: string
  allowedReservations: number
  usedReservations: number

  constructor(data) {
    super(data)
    const d = data || {}
    this.inventoryDateTime = d.inventoryDateTime
    this.allowedReservations = d.allowedReservations
    this.usedReservations = d.usedReservations
  }

  toJSON() {
    return {
      ...super.toJSON(),
      inventoryDateTime: this.inventoryDateTime ? this.inventoryDateTime : null,
      allowedReservations: this.allowedReservations
        ? this.allowedReservations
        : 0,
      usedReservations: this.usedReservations ? this.usedReservations : 0
    }
  }
}
