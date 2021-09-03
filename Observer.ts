/**
 * This is a example of Observer Design Pattern
 * Simulating Weather Station system with mutiple screens, when
 * one of three parameter (temp, humidity, presure) change,
 * all screens will be notified to updated.
 */

interface Observer {
  update(temp: number, humidity: number, pressure: number): void
}

interface Subject {
  registerObserver(o: Observer): void
  removeObserver(o: Observer): void
  notifyObservers(): void
}

interface DisplayElement {
  display(): void
}

class WeatherData implements Subject {
  private observers: Observer[]
  private temperature: number = 0
  private humidity: number = 0
  private pressure: number = 0

  constructor() {
    this.observers = []
  }

  setMeasurements(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp
    this.humidity = humidity
    this.pressure = pressure
    this.notifyObservers() // send notification measurements is changed
  }

  registerObserver(o: Observer): void {
    this.observers.push(o)
  }
  removeObserver(o: Observer): void {
    this.observers = this.observers.filter((os) => os !== o)
  }
  notifyObservers(): void {
    this.observers.forEach((observer: Observer) => {
      observer.update(this.temperature, this.humidity, this.pressure)
    })
  }
}

/* DISPLAY ELEMENTS */
class CurrentConditionDisplay implements Observer, DisplayElement {
  private temperature: number = 0
  private humidity: number = 0
  private weatherData: Subject

  constructor(weatherData: Subject) {
    this.weatherData = weatherData
    this.weatherData.registerObserver(this)
  }

  update(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp
    this.humidity = humidity
    this.display()
  }

  display() {
    const msg = `Current conditions: 
    ${this.temperature}°F degrees 
    ${this.humidity}% humidity
    `
    console.log(msg)
  }
}

class StatisticsDisplay implements Observer, DisplayElement {
  private temperature: number = 0
  private humidity: number = 0
  private pressure: number = 0
  private weatherData: Subject

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData
    this.weatherData.registerObserver(this)
  }

  update(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp
    this.humidity = humidity
    this.pressure = pressure
    this.display()
  }

  display(): void {
    const msg = `Statistics conditions: 
    ${this.temperature}°F degrees
    ${this.humidity}% humidity 
    pressure is ${this.pressure}
    `

    console.log(msg)
  }
}

class ForecastDisplay implements Observer, DisplayElement {
  private temperature: number = 0
  private humidity: number = 0
  private pressure: number = 0
  private weatherData: Subject

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData
    this.weatherData.registerObserver(this)
  }

  update(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp
    this.humidity = humidity
    this.pressure = pressure
    this.display()
  }

  display(): void {
    const msg = `Forecast conditions: 
    ${this.temperature}°F degrees
    ${this.humidity}% humidity 
    pressure is ${this.pressure}
    `

    console.log(msg)
  }
}

class ThirdPartyDisplay implements Observer, DisplayElement {
  private temperature: number = 0
  private humidity: number = 0
  private pressure: number = 0
  private weatherData: Subject

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData
    this.weatherData.registerObserver(this)
  }

  update(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp
    this.humidity = humidity
    this.pressure = pressure
    this.display()
  }

  display(): void {
    const msg = `Third party conditions: 
    ${this.temperature}°F degrees
    ${this.humidity}% humidity 
    pressure is ${this.pressure}
    `

    console.log(msg)
  }
}

const sleep = (time: number) => new Promise((res) => setTimeout(res, time))

async function main(): Promise<void> {
  console.clear()
  const sleepTime = 1000

  const weatherData = new WeatherData()

  // initial and subscribe
  const currentDisplay = new CurrentConditionDisplay(weatherData)
  const statisticsDisplay = new StatisticsDisplay(weatherData)
  const forcastDisplay = new ForecastDisplay(weatherData)

  /* runtime simulation */
  weatherData.setMeasurements(80, 65, 30.4)
  console.log('--------------------------')
  await sleep(sleepTime)
  weatherData.setMeasurements(82, 70, 29.2)
  console.log('--------------------------')
  await sleep(sleepTime)
  weatherData.setMeasurements(78, 90, 28.2)
  console.log('--------------------------')

  weatherData.removeObserver(statisticsDisplay)
  await sleep(sleepTime)
  console.log('After remove statistics display')
  weatherData.setMeasurements(80, 79, 28.2)
  console.log('--------------------------')

  const thirdPartyDisplay = new ThirdPartyDisplay(weatherData)
  await sleep(sleepTime)
  console.log('Add new third party display')
  weatherData.setMeasurements(80, 79, 28.2)
}
main()
