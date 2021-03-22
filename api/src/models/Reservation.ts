import {
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey, Table,
  UpdatedAt,
  AutoIncrement,
  BelongsTo,
  HasOne
} from 'sequelize-typescript'
import { UsedInventory } from './UsedInventory';
import { User } from './User';


@Table({ tableName: 'reservations' })
export class Reservation extends Model<Reservation> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @Column
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User, 'userId')
  user: User

  @Column
  partySize: number

  @Column
  @ForeignKey(() => UsedInventory)
  usedInventoryId: number

  @BelongsTo(() => UsedInventory, 'usedInventoryId')
  usedInventory: UsedInventory

  @CreatedAt
  createTime: Date

  @UpdatedAt
  updateTime: Date
}
