import { ReservationModel } from '@/models/reservation.model'
import BaseDataService from './base-data.service'

export class ReservationService extends BaseDataService {
  postReservation(reservation: ReservationModel) {
    return this.post('reservation/create', reservation, ReservationModel)
  }
}

const service = new ReservationService()
export default service
