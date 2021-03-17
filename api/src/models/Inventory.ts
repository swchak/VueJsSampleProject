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
inv_date: Date

@Column
inv_total_reservations: number

@Column
inv_used_reservations: number

@CreatedAt
create_time: Date;

@UpdatedAt
update_time: Date;
}
