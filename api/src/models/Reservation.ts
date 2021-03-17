import {
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey, Table,
  UpdatedAt,
  AutoIncrement
} from 'sequelize-typescript'
import { User } from './User';


@Table({ tableName: 'reservations' })
export class Reservation extends Model<Reservation> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @Column
  @ForeignKey(() => User)
  user_id: number

  @Column
  party_size: number

  @Column
  reservation_date: Date

  @CreatedAt
  create_time: Date;

  @UpdatedAt
  update_time: Date;
}
