import { Order } from './order'
import { sleep } from '../utils/sleep'

const logOrder = (order: Order) => {
  console.log(
    `#${order.id}:${order.name}x${order.quantity} order is placed. Status is: "${order.state.name}"`
  )
}

async function main() {
  console.clear()
  try {
    const bookOrder = new Order('Human History Book', 2)
    logOrder(bookOrder)

    // fail case
    // console.log('Employee preparing order...')
    // sleep(1500)
    // bookOrder.prepare() // <= throw error, need to confirm first
    // logOrder(bookOrder)

    console.log('User confirming order...')
    await sleep(1500)
    bookOrder.confirm() // <= no fail
    logOrder(bookOrder)
    console.log('-----------------------------------------')

    console.log('User confirmed, now preparing...')
    bookOrder.prepare()
    await sleep(1500)
    logOrder(bookOrder)
    console.log('-----------------------------------------')

    console.log('Prepared, now shipping...')
    bookOrder.ship()
    await sleep(1500)
    logOrder(bookOrder)
    console.log('-----------------------------------------')

    console.log('Shiped, user pressing completed...')
    bookOrder.complete()
    await sleep(1500)
    logOrder(bookOrder)
    console.log('-----------------------------------------')

    console.log('Ater completed, modify to any status will be failed')
    bookOrder.prepare() // <= Cannot prepare, order completed
  } catch (e: any) {
    console.log(e.message)
  }
}
main()
