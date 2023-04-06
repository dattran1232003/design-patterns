 interface Product  {
    name: string
    price: number
}

class ConcreateProduct implements Product{
    name = ''
    price = 0
}

class PricedProduct extends ConcreateProduct {
    public order(amount:number):number{
        return this.price * amount
    }
}
 class FreeProduct extends ConcreateProduct {
    public order(amount: number) :number{
        return 0
    }
 }

class ProductFactory  {
    public newProduct(name: string, price: number): Product {
        let product: Product
        if (price ===0) {
            product = new FreeProduct()
            product.name = name + ' FREE'
        } else {
            product = new PricedProduct()
            product.name = name
            product.price = price
        }
        return product
    }
}

// @ts-ignore
  function main(): void {
    const factory = new ProductFactory()
      const freeProduct =  factory.newProduct('Product A', 0)
      const pricedProduct  = factory.newProduct('Product B', 1000)
      console.log(freeProduct)
      console.log(pricedProduct)
}
 main()
