import { Controller, Get, Put, Post, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Reservation } from '../models/Reservation'
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import { Inventory } from '../models/Inventory';
import sequelize from 'sequelize';
import { Logger } from '@overnightjs/logger';

@Controller('api/reservation')
export class ReservationsController {
  @Get('')
  private async getAll(req: Request, res: Response) {
    return res.sendStatus(StatusCodes.OK).json(await Reservation.findAll())
  }

  @Get(':id')
  private async getOne(req: Request, res: Response) {
    res.jsonp(await Reservation.findOne({ where: {
          user_id: req.params.id}}
          ))
    return res.sendStatus(StatusCodes.OK)
  }

  @Post('list')
  private async getReservationsByDate(req: Request, res: Response) {
    let statusCode = StatusCodes.OK
    let output
    try{
         await Reservation.findAll({
           include: [
               User
           ],
           where: sequelize.where(
             sequelize.fn('date', sequelize.col('reservationDateTime')),
             req.body.date
           ),
         }).then(reservationItems => {
           output = reservationItems.map(reservationItem => {
             return Object.assign({}, {
               reservationDateTime: reservationItem.reservationDateTime,
               partySize: reservationItem.partySize,
               userName: reservationItem.user.name,
               userEmail: reservationItem.user.email
             })
           })
         })
    }
    catch (error) {
      output = error
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
   res.statusCode = statusCode
   return res.jsonp(output)
  }

  @Post('create')
  private async post(req: Request, res:Response) {
    try {
      
      let users = await User.findOrCreate({ where: { name: req.body.userName, email: req.body.userEmail}})
      const user = users && users[0] ? users[0] : null;
      let inventoryItem = await Inventory.findOne({ where: { id: req.body.inventoryItemId }})
      let recordToInsert = {
        userId: user.id,
        partySize: req.body.partySize,
        reservationDateTime: inventoryItem.inventoryDateTime
      }
      let created = await Reservation.create(recordToInsert)
      await inventoryItem.update({usedReservations: ++inventoryItem.usedReservations})
      .then(() => console.log('updated inventory record'))
      .catch(error => console.log('could not update the user reservations for inventory item'))
      return res.status(StatusCodes.CREATED).json(created);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'create failed',
        });
    }  
  }

  @Delete(':id')
  private async delete(req: Request, res: Response) {
    try {
      let toDelete = await Reservation.findOne({
        where: {id: req.params.id}
      })
      await toDelete.destroy()
      return res.status(StatusCodes.OK).json(toDelete);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'delete failed',
      });
    }
  }
}