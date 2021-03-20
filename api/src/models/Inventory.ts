import {
  AllowNull,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey, Table,
  UpdatedAt,
  DataType,
  HasOne,
  AutoIncrement
} from 'sequelize-typescript'

@Table({ tableName: 'inventory' })
export class Inventory extends Model<Inventory> {
@PrimaryKey
@Column({ autoIncrement: true })
id: number

@Column
inventoryDateTime: Date

@Column
allowedReservations: number

@Column
usedReservations: number

@CreatedAt
createTime: Date;

@UpdatedAt
updateTime: Date;
}
