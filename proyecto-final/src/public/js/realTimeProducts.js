const socket = io();

const form = document.getElementById('product-form');

const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');

const productsDiv = document.getElementById('products-container')

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if( title.value.length && description.value.length && code.value.length && price.value.length && stock.value.length &&category.value.length) {
    const {data} = await axios.post('http://localhost:8080/api/products', {
        title: title.value,
        description: description.value,
        code: code.value,
        price: parseFloat(price.value),
        stock: parseInt(stock.value),
        category: category.value,
    });
  
    console.log(data);
  
    title.value = "";
    description.value = "";
    code.value = "";
    price.value = "";
    stock.value = "";
    category.value = "";
  } else {
    window.alert('Debes completar todos los campos')
  }
})

// Función asincrónica para obtener los productos
const getProducts = async () => {
  try {
    const {data} = await axios.get('http://localhost:8080/api/products');
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

// Función para renderizar la lista de productos en la página
const renderProducts = async (products) => {
  const productsDiv = document.getElementById('products-container');

  // Crea un elemento <ul> para la lista de productos
  const productList = document.createElement('ul');

  // Recorre los productos y crea un elemento <li> para cada uno
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = product.title;
    productList.appendChild(listItem);
  });

  // Agrega la lista de productos al elemento con el id "index"
  productsDiv.appendChild(productList);
}

// Función principal para obtener y renderizar los productos
async function main() {
  try {
    const products = await getProducts();
    renderProducts(products);
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
}


window.addEventListener('DOMContentLoaded', main);

socket.on('updatedProduct', data => {
  const productList = document.querySelector('ul');
  const listItem = document.createElement('li');
  listItem.textContent = data.title;
  productList.appendChild(listItem);
})
