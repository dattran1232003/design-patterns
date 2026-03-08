import { Order } from './order'
import { sleep } from '../utils/sleep'

async function main() {
  const bookOrder = new Order('Human History Book', 2)
  console.log(
    `#${bookOrder.id}:${bookOrder.name}x${bookOrder.quantity} order is placed. Status is ${bookOrder.state.name}`
  )
}

main()
