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
  
  const {data} = await axios.post('http://localhost:8080/api/products', {
      title: title.value,
      description: description.value,
      code: code.value,
      price: parseFloat(price.value),
      stock: parseInt(stock.value),
      category: category.value,
  })

  console.log(data);

  title.value = "";
  description.value = "";
  code.value = "";
  price.value = "";
  stock.value = "";
  category.value = "";

})

socket.on('updatedProduct', data => console.log(data))
