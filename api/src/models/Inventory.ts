import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey, Table,
  UpdatedAt
} from 'sequelize-typescript'
import { UsedInventory } from './UsedInventory'

@Table({ tableName: 'inventory' })
export class Inventory extends Model<Inventory> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  startDateTime: Date

  @Column
  endDateTime: Date

  @Column
  allowedReservations: number

  @HasMany(() => UsedInventory)
  usedInventories: UsedInventory[]

  @CreatedAt
  createTime: Date

  @UpdatedAt
  updateTime: Date
}
