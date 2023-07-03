import { BASE_URL } from "../config/config.js";

export const generateUrlLink = (query, options, page) => {

  let url = `${BASE_URL}/api/products?limit=${options.limit}&page=${page}`;

  if(options.sort?.price) {
    url += `&sort=${options.sort.price}`;
  }

  if(Object.keys(query).length > 0) {
    url += `&query=${query.category}`;
  }

  return url;
}