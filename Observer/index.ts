import { sleep } from '../utils/sleep'
import { EmailReservationObserver } from './observers/email-reservation.observer'
import { KitchenReservationObserver } from './observers/kitchen-reservation.observer'
import { RestaurantSecurityReservationObserver } from './observers/restaurant-security-resrevation.observer'
import { SMSReservationObserver } from './observers/sms-reservation.observer'
import { WaiterReservationObserver } from './observers/waiter-reservation.observer'
import { RestaurantReservation } from './reservation-subject'
import { NewReservationEvent } from './types/reservation-event.type'

const restaurantReservation = new RestaurantReservation()

async function main() {
  console.clear()
  // init reservations
  const emailSubscription = restaurantReservation.subcribe(
    new EmailReservationObserver()
  )
  const kitchenSubscription = restaurantReservation.subcribe(
    new KitchenReservationObserver()
  )
  const securitySubscription = restaurantReservation.subcribe(
    new RestaurantSecurityReservationObserver()
  )
  const smsSubscription = restaurantReservation.subcribe(
    new SMSReservationObserver()
  )
  const waiterSubscription = restaurantReservation.subcribe(
    new WaiterReservationObserver()
  )

  const reservationEvents: NewReservationEvent[] = [
    {
      id: 1,
      customerName: 'John Doe',
      tableNumber: 1,
      startTime: new Date('2026/03/21 12:00+7'),
      endTime: new Date('2026/03/21 13:00+7'),
    },
    {
      id: 2,
      customerName: 'Alice',
      tableNumber: 2,
      startTime: new Date('2026/03/21 12:00+7'),
      endTime: new Date('2026/03/21 13:00+7'),
    },
    {
      id: 3,
      customerName: 'Bob',
      tableNumber: 3,
      startTime: new Date('2026/03/21 12:00+7'),
      endTime: new Date('2026/03/21 13:00+7'),
    },
    {
      id: 4,
      customerName: 'Alex',
      tableNumber: 4,
      startTime: new Date('2026/03/21 12:00+7'),
      endTime: new Date('2026/03/21 13:00+7'),
    },
  ]

  for (const event of reservationEvents) {
    await sleep(1000)
    restaurantReservation.makeReservation(
      event.id,
      event.customerName,
      event.tableNumber,
      event.startTime,
      event.endTime
    )
  }

  emailSubscription.unsubscribe()
  kitchenSubscription.unsubscribe()
  securitySubscription.unsubscribe()
  smsSubscription.unsubscribe()
  waiterSubscription.unsubscribe()
}

main().then()
