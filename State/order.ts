import { OrderState } from './order-state'
import { PendingState } from './order-state-impl'

let ordId = 0
export class Order {
  id: number
  name: string
  quantity: number
  state: OrderState

  constructor(name: string, quantity: number) {
    this.id = ++ordId
    this.name = name
    this.quantity = quantity
    this.state = new PendingState()
  }

  setState(newState: OrderState) {
    this.state = newState
  }

  /** Make the methods easier to use */
  confirm() {
    this.state.confirm(this)
  }
  prepare() {
    this.state.prepare(this)
  }
  ship() {
    this.state.ship(this)
  }
  complete() {
    this.state.complete(this)
  }
}
