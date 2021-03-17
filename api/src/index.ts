require('source-map-support/register')
import { Sequelize } from 'sequelize-typescript'
import { RouterServer } from './RouterServer'
import * as models from './models'

(async () => {
  new RouterServer().start(8080)
  const sequelize = new Sequelize('postgresql://postgres:P@ssw0rd@localhost:5432/wisely_test', {
    dialect: 'postgres',
    logging: process.env.LOG === 'debug' ? console.log : false,
    models: Object.keys(models).map(k => models[k]),
  })

  await sequelize.sync({
    alter: true
  })

})()