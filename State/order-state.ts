import { Order } from './order'
import { EOrderState } from './order-state.const'

// all method of base class will throw an error by default
export abstract class OrderState {
  get name(): EOrderState {
    throw new Error('Subclass must implement name')
  }

  public confirm(order: Order) {
    throw new Error(`Cannot confirm when order state is [${this.name}]`)
  }

  public prepare(order: Order) {
    throw new Error(`Cannot prepare when order state is [${this.name}]`)
  }

  public ship(order: Order) {
    throw new Error(`Cannot ship when order state is [${this.name}]`)
  }

  public complete(order: Order) {
    throw new Error(`Cannot complete when order state is [${this.name}]`)
  }
}
