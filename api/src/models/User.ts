import {
  AutoIncrement,
  BelongsToAssociation,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey, Table,
  UpdatedAt
} from 'sequelize-typescript'
import { BelongsTo } from 'sequelize/types'
import { NoSubstitutionTemplateLiteral } from 'typescript'
import { Reservation } from './Reservation'

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