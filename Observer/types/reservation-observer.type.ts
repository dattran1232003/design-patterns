import { NewReservationEvent } from './reservation-event.type'

// Restaurant Reservation
export interface ReservationObserver {
  onNewReservation(event: NewReservationEvent): void
}
