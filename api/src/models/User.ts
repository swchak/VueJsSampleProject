import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey, Table,
  UpdatedAt
} from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  name: string

  @Column
  email: string

  @CreatedAt
  createTime: Date

  @UpdatedAt
  updateTime: Date

}