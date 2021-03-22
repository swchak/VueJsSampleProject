import { Controller, Get, Post, Put, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Inventory } from '../models/Inventory';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import sequelize from 'sequelize'
import { UsedInventory } from '../models';

@Controller('api/inventory')
export class InventoryController {
  @Post('list')
  private async getByDate(req: Request, res: Response) {
    let statusCode = StatusCodes.OK
    let output
    try{
    output = await Inventory.findAll({ 
      include: [
        UsedInventory
      ],
      where: sequelize.where(sequelize.fn('date', sequelize.col('startDateTime')), req.body.date)
    });
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
    /*** sample payload 
    {
      "inventoryDate" : "2021-03-24",
      "startTime": "01:00",
      "endTime": "03:00",
      "allowedReservations": 2
    }   
  check the time range from_time < to_time and there are no other conflicting existing inventory records
  **/
    let entries = []
    const startDateTime = moment(req.body.startDateTime)
    const endDateTime = moment(req.body.endDateTime)
    // const startDateTime = moment(
    //   req.body.inventoryDate + ' ' + req.body.startDateTime,
    //   'YYYY-MM-DD HH:mm'
    // )
    // const endDateTime = moment(
    //   req.body.inventoryDate + ' ' + req.body.startDateTime,
    //   'YYYY-MM-DD h:mm'
    // )
    let timeCounter = moment(startDateTime)
    while (endDateTime.diff(timeCounter) > 0) {
      entries.push({
        reservationDateTime: timeCounter.format('MM-DD-YYYY HH:mm'),
        usedReservations: 0,
      })
      timeCounter.add(15, 'm')
    }
    let result
    try {
      let response = {}
      const created = await Inventory.create({
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        allowedReservations: req.body.allowedReservations,
      })
      console.log('inserted record in inventory table' + created)
      let usedInventoryRecords = entries.map(entry => {
        entry.inventoryId = created.id
        return entry
      })
      const createdList = await UsedInventory.bulkCreate(usedInventoryRecords)
      console.log('inserted records in used inventory table' + createdList)
      response = {
        inventory: created,
        usedInventory: createdList,
      }
      result = res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      result = res.status(StatusCodes.INTERNAL_SERVER_ERROR).jsonp(error)
    }

    // var result
    // try {
    //   var created = await Inventory.bulkCreate(entries)
    //   result = res.status(StatusCodes.CREATED).json(created)
    // } catch (error) {
    //   result = res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    // }

    return result
  }

//  @Put(':id')
//   private async put(req: Request, res: Response) {
//      /*** sample payload 
//     {
//       "inv_used_reservations": 1
//     } 
//     **/
//    let whereOptions = {}
//     whereOptions['id'] = req.params.id

//     try {
//       let toUpdate = await Inventory.findOne({ where: { id: req.params.id }})
//       let updated = toUpdate.update(req.body)
//       return res.status(StatusCodes.CREATED).json({message: 'update_called'});
//       }  
//      catch(error) {
//         return res.status(StatusCodes.NOT_FOUND).json({
//         message: 'could not find entity with the id'
//       })
//     }
//   }

//   @Delete(':id')
//   private async delete(req: Request, res: Response) {
//     try {
//       let toDelete = await Inventory.findOne({ where: { id: req.params.id }})
//       await toDelete.destroy()
//       return res.status(StatusCodes.OK).json(toDelete);
//     } catch(error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
//     }
//   }
 
}
