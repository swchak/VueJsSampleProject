import { Controller, Get, Put, Post, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Reservation } from '../models/Reservation'
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import sequelize from 'sequelize';
import { Inventory, UsedInventory } from '../models';

@Controller('api/reservation')
export class ReservationsController {
  @Post('list')
  private async getReservationsByDate(req: Request, res: Response) {
    let statusCode = StatusCodes.OK
    let output
    try {
       output = await Reservation.findAll({
         include: [
           { model: User },
           { model: UsedInventory, as: 'usedInventory', include: [Inventory] },
         ],
         where: sequelize.where(
           sequelize.fn('date', sequelize.col('usedInventory.reservationDateTime')),
           req.body.date
         ),
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
      let usedInventoryItem = await UsedInventory.findOne({ where: { id: req.body.usedInventoryId }})

      // create reservation record
      let recordToInsert = {
        userId: user.id,
        partySize: req.body.partySize,
        usedInventoryId: usedInventoryItem.id,
      }
      let created = await Reservation.create(recordToInsert)

      // update used inventory record's used reservations count
      await usedInventoryItem
        .update({ usedReservations: ++usedInventoryItem.usedReservations })
        
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