import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Inventory } from "./Inventory";

@Table({ tableName: 'used_inventory' })
export class UsedInventory extends Model<UsedInventory> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  @ForeignKey(() => Inventory)
  inventoryId: number

  @BelongsTo(() => Inventory, 'inventoryId')
  inventory: Inventory

  @Column
  reservationDateTime: Date

  @Column
  usedReservations: number

  @CreatedAt
  createTime: Date

  @UpdatedAt
  updateTime: Date
}