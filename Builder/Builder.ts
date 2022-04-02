export {}

interface ICarBuilder {
  addWheel(numberOfWheel: number): CarBuilder
  addSeatBelt(seatbelt: SeatBelt): CarBuilder
  paint(color: string): CarBuilder
  addWindscreen(windscreen: Windscreen): CarBuilder
  addEngine(engine: Engine): CarBuilder

  build(): Car
}

class CarBuilder implements ICarBuilder {
  private name = ''
  private numberOfWheel = 4
  private seatbelt = new SeatBelt()
  private color = 'white'
  private windscreen = new Windscreen()
  private engine = new Engine()

  setName(name: string): CarBuilder {
    this.name = name
    return this
  }

  addWheel(numberOfWheel: number): CarBuilder {
    this.numberOfWheel = numberOfWheel
    return this
  }

  addSeatBelt(seatBelt: SeatBelt): CarBuilder {
    this.seatbelt = seatBelt
    return this
  }

  paint(color: string): CarBuilder {
    this.color = color
    return this
  }

  addWindscreen(windscreen: Windscreen): CarBuilder {
    this.windscreen = windscreen
    return this
  }

  addEngine(engine: Engine): CarBuilder {
    this.engine = engine
    return this
  }

  build(): Car {
    return new Car(
      this.name,
      this.numberOfWheel,
      this.seatbelt,
      this.color,
      this.windscreen,
      this.engine
    )
  }
}

class Windscreen {}
class Engine {}
class SeatBelt {}

class Car {
  constructor(
    private name: string,
    private numberOfWheel: number,
    private seatbelt: SeatBelt,
    private color: string,
    private windscreen: Windscreen,
    private engine: Engine
  ) {}

  startEngine(): void {
    console.log(`Car ${this.name} is started`)
  }
}

function main(): void {
  const car = new CarBuilder()
    .setName('BMW')
    .addEngine(new Engine())
    .addWindscreen(new Windscreen())
    .addWheel(4)
    .addSeatBelt(new SeatBelt())
    .build()

  car.startEngine()
}
main()
