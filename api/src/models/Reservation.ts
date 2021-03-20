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
  userId: number

  @Column
  partySize: number

  @Column
  reservationDateTime: Date

  @CreatedAt
  createTime: Date;

  @UpdatedAt
  updateTime: Date;
}
