import { BaseModel } from "./base.model"

export class UserModel extends BaseModel {
  name: string
  email: string

  constructor(data) {
    super(data)
    const d = data || {}
    this.name = d.name
    this.email = d.email
  }
}
