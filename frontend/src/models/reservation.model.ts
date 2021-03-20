import { BaseModel } from './base.model'

export class ReservationModel extends BaseModel {
  reservationDateTime: string
  partySize: string
  usedId: number

  constructor(data) {
    super(data)
    const d = data || {}
    this.reservationDateTime = d.reservationDateTime
    this.partySize = d.partySize
  }

  toJSON() {
    return {
      ...super.toJSON(),
      reservationDateTime: this.reservationDateTime
        ? this.reservationDateTime
        : null,
      partySize: this.partySize ? this.partySize : null
    }
  }
}
