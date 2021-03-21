import { ReservationModel } from '@/models/reservation.model'
import BaseDataService from './base-data.service'

export class ReservationService extends BaseDataService {
  postReservation(reservation: ReservationModel) {
    return this.post('reservation/create', reservation, ReservationModel)
  }
  getReservationsList(queryPayload: any) {
      return this.post('reservation/list', queryPayload, ReservationModel)
  }
}

const service = new ReservationService()
export default service
