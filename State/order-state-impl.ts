import { Order } from './order'
import { OrderState } from './order-state'
import { EOrderState } from './order-state.const'

export class PendingState extends OrderState {
  get name() {
    return EOrderState.PENDING
  }

  confirm(order: Order) {
    order.setState(new ConfirmState())
  }
}

export class ConfirmState extends OrderState {
  get name() {
    return EOrderState.CONFIRMED
  }

  public prepare(order: Order): void {
    order.setState(new PrepareState())
  }
}

export class PrepareState extends OrderState {
  get name() {
    return EOrderState.PREPARED
  }

  ship(order: Order): void {
    order.setState(new ShipState())
  }
}

export class ShipState extends OrderState {
  get name() {
    return EOrderState.SHIPPED
  }

  complete(order: Order) {
    order.setState(new CompletedState())
  }
}

export class CompletedState extends OrderState {
  get name() {
    return EOrderState.COMPLETED
  }

  public confirm(order: Order): void {
    throw new Error('Order is completed')
  }
  public ship(order: Order): void {}
  public prepare(order: Order) {}
  public complete(order: Order): void {}
}
