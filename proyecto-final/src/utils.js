import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { faker } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateProducts = () => {
  let products = [];

  for (let i = 0; i < 100; i++) {
    products.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric(6),
      price: faker.number.int(1000),
      status: faker.datatype.boolean(),
      stock: faker.number.int(1000),
      category: faker.commerce.department(),
      thumbnails: faker.helpers.arrayElement([faker.internet.avatar()]),
    })
  }

  return products;
}

export default __dirname