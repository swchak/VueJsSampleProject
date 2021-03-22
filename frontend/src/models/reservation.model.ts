import { BaseModel } from './base.model'
import { UsedInventoryModel } from './used-inventory.model'
import { UserModel } from './user.model'

export class ReservationModel extends BaseModel {
  // fields required for create entity
  partySize: string
  userName: string
  userEmail: string
  usedInventoryId: string

  //fields required for parsing api response
  user: UserModel
  usedInventory: UsedInventoryModel

  constructor(data) {
    super(data)
    const d = data || {}
    this.userName = d.userName ? d.userName : null
    this.userEmail = d.userEmail ? d.userEmail : null
    this.partySize = d.partySize
    this.usedInventoryId = d.usedInventoryId ? d.usedInventoryId : null
    // for parsing api response
    this.usedInventory = d.usedInventory ? d.usedInventory : null
    this.user = d.user ? d.user : null
  }

  toJSON() {
    return {
      ...super.toJSON(),
      usedInventoryId: this.usedInventoryId ? this.usedInventoryId : null,
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
        value => (value && value > 0) || 'Party size must be > 0'
      ]
    }
  }
}
