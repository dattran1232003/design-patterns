/* FACTORY METHOD DESIGN PATTERN */

// Interface: là một interface để defines các thuộc tính của các lớp chính (các sản phẩm mà Factory tạo ra)
// Abstract Creator Class: abstract class có hàm abstract create để tạo đối tượng, do create là abstract nên lớp này tập trung vào việc sử dụng đối tượng mà ko cần quan tâm việc tạo hay logic bên trong đối tượng.
// Classes: các classes mục tiêu sẽ được tạo ra.
// Concrete Class: Sẽ có nhiều Concrete class được tạo ra trong ứng dụng, class này sẽ implement Creator,
// cụ thể hơn là implement hàm abstract create() của creator, lớp này chuyên tạo đối tượng chính, logic tập trung vào tạo đối tượng.

// Interface
enum ECarModel { Vinfast='Vinfast', Ford='Ford', Honda='Honda' }
enum EEnergySource { Electricity ='Electricity', Gasoline='Gas', Diesel='Diesel', Hybrid='Hybrid' }

interface ICar {
    readonly model: ECarModel
    readonly energySource: EEnergySource
    sound(): string
    
}

// Abstract Creator Class
abstract class CarFactory {
    abstract createCar(): ICar

    public startCar(): void {
        const car = this.createCar()

        console.log(`This is ${car.model} car.`)
        console.log(`${car.model} sounds like: "${car.sound()}"`)
        console.log(`And it uses ${car.energySource} as the energy source.`)
    }
}

// Phần dưới này sẽ là phần mở rộng về sau này, chỉ thêm code chứ ko sửa đổi
// lập trình viên làm việc trực tiếp với các phần này

// Classes
class VinfastCar implements ICar {
    constructor(
        readonly model = ECarModel.Vinfast,
        readonly energySource = EEnergySource.Electricity
    ) { }

    public sound(): string {
        return "whirr whirr"
    }
}
class FordCar implements ICar {
    constructor(
        readonly model = ECarModel.Ford,
        readonly energySource = EEnergySource.Diesel
    ) { }

    public sound(): string {
        return "brrrr"
    }
}
class HondaCityCar implements ICar {
    constructor(
        readonly model = ECarModel.Honda,
        readonly energySource = EEnergySource.Gasoline
    ) { }

    public sound(): string {
        return "vroom vroom"
    }
}

// Concrete Class
class VinSpeedFactory extends CarFactory {
    override createCar(): ICar { 
        return new VinfastCar()
    }
}
class FordFactory extends CarFactory {
    override createCar(): ICar { 
        return new FordCar()
    }
}
class HondaFactory extends CarFactory {
    override createCar(): ICar { 
        return new HondaCityCar()
    }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function main(): Promise<void> {
    const vinSpeedFactory = new VinSpeedFactory()
    const fordFactory = new FordFactory()
    const hondaFactory = new HondaFactory()

    vinSpeedFactory.startCar()
    await sleep(1000)
    fordFactory.startCar()
    await sleep(1000)
    hondaFactory.startCar()

}
main()

export {}