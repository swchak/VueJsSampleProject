import { Controller, Get, Post, Put, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Inventory } from '../models/Inventory';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import sequelize from 'sequelize'

@Controller('api/inventory')
export class InventoryController {
  @Get('')
  private async get(req: Request, res: Response) {
    res.jsonp(await Inventory.findAll())
    return res.sendStatus(StatusCodes.OK)
  }

  @Post()
  private async getByDate(req: Request, res: Response) {
    console.log(req.body.date)
    let statusCode = StatusCodes.OK
    let output
    try{
    output = await Inventory.findAll({ 
      where: sequelize.where(sequelize.fn('date', sequelize.col('inventoryDateTime')), req.body.date)});
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
      "inv_date" : "2021-03-24",
      "from_time": "01:00 PM",
      "to_time": "03:00 PM",
      "inv_total_reservations": 2
    }   
  check the time range from_time < to_time and there are no other conflicting existing inventory records
  **/
   let entries = []
   console.log(req) 
   var start_day_time = moment(req.body.inventoryDate + ' ' + req.body.startTime, 'YYYY-MM-DD HH:mm')
   console.log(start_day_time)
   var end_day_time = moment(req.body.inventoryDate+ ' ' + req.body.endTime, 'YYYY-MM-DD h:mm')
   console.log(end_day_time)
   var timeCounter = moment(start_day_time)
   while(end_day_time.diff(timeCounter) > 0) {
    console.log(timeCounter)
     entries.push({
       "inventoryDateTime": timeCounter.format('MM-DD-YYYY HH:mm'),
       "allowedReservations": req.body.allowedReservations,
       "usedReservations": 0
     })
     //increment timeCounter by 15 min
     timeCounter.add(15, 'm')
     console.log(end_day_time.diff(timeCounter))
   }

   console.log(entries)
   var result;
   try {
    var created = await Inventory.bulkCreate(entries)
    result = res.status(StatusCodes.CREATED).json(created)
   }
   catch(error){
    result = res.status(StatusCodes.INTERNAL_SERVER_ERROR)
   }
    
  return result
  }

 @Put(':id')
  private async put(req: Request, res: Response) {
     /*** sample payload 
    {
      "inv_used_reservations": 1
    } 
    **/
   let whereOptions = {}
    whereOptions['id'] = req.params.id

    try {
      let toUpdate = await Inventory.findOne({ where: { id: req.params.id }})
      let updated = toUpdate.update(req.body)
      return res.status(StatusCodes.CREATED).json({message: 'update_called'});
      }  
     catch(error) {
        return res.status(StatusCodes.NOT_FOUND).json({
        message: 'could not find entity with the id'
      })
    }
  }

  @Delete(':id')
  private async delete(req: Request, res: Response) {
    try {
      console.log(req.params.id)
      let toDelete = await Inventory.findOne({ where: { id: req.params.id }})
      console.log(toDelete)
      await toDelete.destroy()
      return res.status(StatusCodes.OK).json(toDelete);
    } catch(error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  }
 
}
