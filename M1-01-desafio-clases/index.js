class ProductManager {

    constructor () {
        this.products = [];
    }

    getProducts(){
        return this.products
    }

    addProduct( title, description, price, thumbnail, code, stock ){
        let codeIsRepeated = this.products.find(product => product.code === code)

        if(codeIsRepeated) {
            return console.error('Código ya existente')
        }
        
        let newProduct = {
            id: this.products.length + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }

        this.products.push(newProduct)
    }

    getProductById(id){
        const productFound = this.products.find(product => product.id === id)
        if(!productFound) return console.error('Producto no encontrado') 
        return productFound
    }
}


const productosLacteos = new ProductManager()

productosLacteos.addProduct(
    'producto prueba', 
    'Este es un producto prueba', 
    200, 
    'Sin imagen', 
    'abc123', 
    25
)

productosLacteos.addProduct(
    'producto prueba', 
    'Este es un producto prueba', 
    200, 
    'Sin imagen', 
    'abc124', 
    25
)

productosLacteos.addProduct(
    'producto prueba', 
    'Este es un producto prueba', 
    200, 
    'Sin imagen', 
    'abc125', 
    25
)

console.log(productosLacteos.getProductById(2))

console.log(productosLacteos.getProducts())
