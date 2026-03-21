export interface NewReservationEvent {
  id: number
  customerName: string
  tableNumber: number
  startTime: Date
  endTime: Date
}
