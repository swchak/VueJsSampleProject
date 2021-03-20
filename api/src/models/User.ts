import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey, Table,
  UpdatedAt
} from 'sequelize-typescript'
import { NoSubstitutionTemplateLiteral } from 'typescript'

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  name: string

  @Column
  emailId: string

  @CreatedAt
  createTime: Date

  @UpdatedAt
  updateTime: Date
}