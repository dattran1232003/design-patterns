import { NewReservationEvent } from '../types/reservation-event.type'
import { ReservationObserver } from '../types/reservation-observer.type'

export class WaiterReservationObserver implements ReservationObserver {
  onNewReservation(event: NewReservationEvent): void {
    console.log(
      `Re-calculating needed waiter for serving order of Mr/Ms ${event.customerName}`
    )
    // TODO: Call Waiter service here
  }
}
