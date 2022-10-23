interface OfferRecipient {
  receiveRequest(offer: string): void
}

class Leader implements OfferRecipient {
  receiveRequest(offer: string) {
    console.log(`Leader received an offer:::${offer}`)
  }
}
class Secretary implements OfferRecipient {
  public leader: Leader
  constructor() {
    this.leader = new Leader()
  }

  receiveRequest(offer: string) {
    // date..
    setTimeout(() => {
      this.leader.receiveRequest(offer)
    }, 3000)
  }
}

class Developer {
  constructor(private offer: string) {}

  applyFor(target: OfferRecipient) {
    console.log(`Dat wants: ${this.offer}`)
    target.receiveRequest(this.offer)
  }
}

const dev = new Developer(`upto 10k USD`)
dev.applyFor(new Secretary())
