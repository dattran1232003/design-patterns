import { NewReservationEvent } from '../types/reservation-event.type'
import { ReservationObserver } from '../types/reservation-observer.type'

export class SMSReservationObserver implements ReservationObserver {
  onNewReservation(event: NewReservationEvent): void {
    console.log(`Sending SMS to Mr/Ms ${event.customerName}.`)
    // TODO: Call sms service here
  }
}
