import supertest from 'supertest';
import { expect } from 'chai';
import { BASE_URL } from '../src/config/config.js';

const PRODUCT_ROUTE = '/api/products';
const CART_ROUTE = '/api/carts';
const SESSION_ROUTE = '/api/session';

describe('Functional tests for all endpoints', () => {
    let requester;

    describe('Functional tests for /api/products endpoints', () => {
        
        it('Should get all products all products', async () => {
            requester = supertest(`${BASE_URL}`)

            const response = await supertest(`${'localhost:8080'}`).get(`/api/products`)

            console.log(response)
        })

        // it('Should get all mocked products', async () => {
        //     requester = supertest(`${BASE_URL}`)

        //     const {body} = await supertest(`${BASE_URL}`).get(`${PRODUCT_ROUTE}/mockingproducts`)

        //     console.log(body)
        // })

    })

    // describe('Functional tests for /api/products endpoints', () => {
        
    //     it('Should get all products all products', async () => {
    //         requester = supertest(`${BASE_URL}`)

    //         const response = await supertest(`${BASE_URL}`).get(`${CART_ROUTE}`)

    //         console.log(response)
    //     })

    // })
})