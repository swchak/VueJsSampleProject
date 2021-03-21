import { BaseModel } from './base.model'

export class ReservationModel extends BaseModel {
  partySize: string
  userName: string
  userEmail: string
  inventoryItemId: number
  reservationDateTime: string

  constructor(data) {
    super(data)
    const d = data || {}
    this.userName = d.userName
    this.userEmail = d.userEmail
    this.partySize = d.partySize
    this.inventoryItemId = d.inventoryItemId
    this.reservationDateTime = d.reservationDateTime
  }

  toJSON() {
    return {
      ...super.toJSON(),
      inventoryItemId: this.inventoryItemId ? this.inventoryItemId : null,
      partySize: this.partySize ? this.partySize : null,
      userName: this.userName ? this.userName : null,
      userEmail: this.userEmail ? this.userEmail : null
    }
  }

  public static dataValidators() {
    return {
      userName: [
        value => !!value || 'User name is required.',
        value => (value && value.length >= 0) || 'Min 0 characters',
        value => (value && value.length < 25) || 'Max 25 characters'
      ],
      userEmail: [
        value => !!value || 'Email is Required.',
        value => (value && value.length >= 0) || 'Min 0 characters',
        value => (value && value.length < 50) || 'Max 50 characters'
      ],
      partySize: [
        value => !!value || 'Required.',
        value => !isNaN(value) || 'Party size must be a number.',
        value => value && value > 0 || 'Party size must be > 0'
      ]
    }
  }
}
