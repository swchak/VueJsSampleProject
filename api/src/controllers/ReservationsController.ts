import { Controller, Get, Put, Post, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Reservation } from '../models/Reservation'
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import moment from 'moment';

@Controller('api/reservations')
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

  @Post()
  private async post(req: Request, res:Response) {
    try {
      
      let users = await User.findOrCreate({ where: { name: req.body.name, email_id: req.body.email_id}})
      const user = users && users[0] ? users[0] : null;
      let recordToInsert = {
        user_id: user.id,
        party_size: req.body.party_size,
        reservation_date: moment(req.body.reservation_date, 'MM-DD-YYYY h:mm a').format('MM-DD-YYYY HH:mm')
      }
      let created = await Reservation.create(recordToInsert)
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