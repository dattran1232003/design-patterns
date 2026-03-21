import { NewReservationEvent } from '../types/reservation-event.type'
import { ReservationObserver } from '../types/reservation-observer.type'

export class EmailReservationObserver implements ReservationObserver {
  onNewReservation(event: NewReservationEvent): void {
    console.log(`Sending email to Mr/Ms ${event.customerName}.`)
    // TODO: Call email service here
  }
}
