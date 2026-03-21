import { NewReservationEvent } from '../types/reservation-event.type'
import { ReservationObserver } from '../types/reservation-observer.type'

export class KitchenReservationObserver implements ReservationObserver {
  onNewReservation(event: NewReservationEvent): void {
    console.log(`Checking kitchen for serving Mr/Ms ${event.customerName}.`)
    // TODO: Call email service here
  }
}
