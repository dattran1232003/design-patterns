import { NewReservationEvent } from './types/reservation-event.type'
import { ReservationObserver } from './types/reservation-observer.type'
import { Reservation } from './types/reservation.type'
import { Subscription } from './types/subscription'

export class RestaurantReservation {
  private observers = new Set<ReservationObserver>()
  private reservations: Reservation[] = []

  subcribe(observer: ReservationObserver): Subscription {
    this.observers.add(observer)

    const subscription = {
      unsubscribe: () => this.unsubcribe(observer),
    }

    return subscription
  }

  unsubcribe(observer: ReservationObserver): void {
    this.observers.delete(observer)
  }

  private notifyNew(event: NewReservationEvent) {
    for (const observer of this.observers) {
      observer.onNewReservation?.(event)
    }
  }

  makeReservation(
    id: number,
    customerName: string,
    tableNumber: number,
    startTime: Date,
    endTime: Date
  ) {
    const event: NewReservationEvent = {
      id,
      customerName,
      tableNumber,
      startTime,
      endTime,
    }
    const reservation: Reservation = {
      id,
      customerName,
      tableNumber,
      startTime,
      endTime,
    }
    this.reservations.push(reservation)
    this.notifyNew(event)
  }
}
