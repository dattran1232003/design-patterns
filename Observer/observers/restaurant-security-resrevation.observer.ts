import { NewReservationEvent } from '../types/reservation-event.type'
import { ReservationObserver } from '../types/reservation-observer.type'

export class RestaurantSecurityReservationObserver
  implements ReservationObserver
{
  onNewReservation(event: NewReservationEvent): void {
    console.log(`Preparing car parking for Mr/Ms ${event.customerName}`)
    // TODO: Call sercurity service here
  }
}
