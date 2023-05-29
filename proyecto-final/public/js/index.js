// Función asincrónica para obtener los productos
const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

// Función para renderizar la lista de productos en la página
const renderProducts = async (products) => {
  const indexElement = document.getElementById('index');

  // Crea un elemento <ul> para la lista de productos
  const productList = document.createElement('ul');

  // Recorre los productos y crea un elemento <li> para cada uno
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = product.title;
    productList.appendChild(listItem);
  });

  // Agrega la lista de productos al elemento con el id "index"
  indexElement.appendChild(productList);
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
