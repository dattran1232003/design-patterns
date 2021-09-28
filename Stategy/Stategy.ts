interface PromoStrategy {
  doDiscount(price: number): number
}

class Ticket {
  private _price: number = 0
  private _name: string = ''
  private _promoteStategy!: PromoStrategy

  constructor(promoteStategy?: PromoStrategy) {
    if (promoteStategy) {
      this._promoteStategy = promoteStategy
    }
  }

  get price() {
    return this._price
  }
  setPrice(price: number) {
    this._price = price
    return this
  }

  get name() {
    return this._name
  }
  setName(name: string) {
    this._name = name
    return this
  }

  setPromoteStategy(promoteStategy: PromoStrategy) {
    this._promoteStategy = promoteStategy
    return this
  }

  get promotedPrice() {
    return this._promoteStategy.doDiscount(this._price)
  }
}

// Stategies
class NoDiscountStategy implements PromoStrategy {
  public doDiscount(price: number): number {
    console.log('discount percentarget: 0%')
    return price * 1
  }
}

class HalfDiscountStategy implements PromoStrategy {
  public doDiscount(price: number): number {
    console.log('discount percentarget: 50%')
    return price * 0.5
  }
}

class QuarterDiscountStategy implements PromoStrategy {
  public doDiscount(price: number): number {
    console.log('discount percentarget: 25%')
    return price * 0.75
  }
}

function getStategy(idx: number): PromoStrategy {
  let promoStategy: PromoStrategy

  switch (idx) {
    case 0:
      promoStategy = new QuarterDiscountStategy()
      break
    case 1:
      promoStategy = new HalfDiscountStategy()
      break
    default:
      promoStategy = new NoDiscountStategy()
      break
  }

  return promoStategy
}

// test pattern
function main() {
  const MAX_RANDOM = 3

  const ticket = new Ticket().setName('Movie Ticket').setPrice(600)

  console.log('-----------------------------------------')
  for (let i = 0; i < 6; i++) {
    const stategyIndex = getRandomInt(MAX_RANDOM)
    ticket.setPromoteStategy(getStategy(stategyIndex))

    console.log('before discount:', ticket.price)
    console.log('after discount:', ticket.promotedPrice)
    console.log('-----------------------------------------')
  }
}
main()

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
