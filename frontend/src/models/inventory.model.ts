import { BaseModel } from './base.model'

export class InventoryModel extends BaseModel {
  inventoryDate: string
  startTime: string
  endTime: string
  allowedReservations: number
  usedReservations: number

  constructor(data) {
    super(data)
    const d = data || {}
    this.inventoryDate = d.inventoryDate
    this.startTime = d.startTime
    this.endTime = d.endTime
    this.allowedReservations = d.allowedReservations
    this.usedReservations = d.usedReservations
  }

  toJSON() {
    return {
      ...super.toJSON(),
      inventoryDate: this.inventoryDate ? this.inventoryDate : null,
      startTime: this.startTime ? this.startTime : null,
      endTime: this.endTime ? this.endTime : null,
      allowedReservations: this.allowedReservations
        ? this.allowedReservations
        : 0,
      usedReservations: this.usedReservations ? this.usedReservations : 0
    }
  }
}
