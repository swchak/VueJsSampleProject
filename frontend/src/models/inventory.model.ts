import { BaseModel } from './base.model'
import { UsedInventoryModel } from './used-inventory.model'

export class InventoryModel extends BaseModel {
  startDateTime: string
  endDateTime: string
  allowedReservations: number
  usedInventories: UsedInventoryModel[]

  constructor(data) {
    super(data)
    const d = data || {}
    this.startDateTime = d.startDateTime
    this.endDateTime = d.endDateTime
    this.allowedReservations = d.allowedReservations
    this.usedInventories = d.usedInventories ? d.usedInventories : null
  }

  toJSON() {
    return {
      ...super.toJSON(),
      startDateTime: this.startDateTime ? this.startDateTime : null,
      endDateTime: this.endDateTime ? this.endDateTime : null,
      allowedReservations: this.allowedReservations
    }
  }
}
