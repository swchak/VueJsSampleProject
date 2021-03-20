export class BaseModel {
  id: number
  createdDate: Date
  updatedDate: Date

  constructor(data) {
    const d = data || {}
    this.id = d.id
    this.createdDate = d.createdDate
    this.updatedDate = d.updatedDate
  }

  toJSON() {
    return { id: this.id }
  }
}
